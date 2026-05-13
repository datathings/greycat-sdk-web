import { css, GuiElement, highlight } from '../../exports.js';
import style from './logs.css?inline';

const LOG_LEVELS = ['error', 'warn', 'info', 'perf', 'trace'] as const;
const HEADERS = ['Level', 'Time', 'User', 'Task', 'Job', 'Tag', 'Data'] as const;
const COL_COUNT = HEADERS.length;
const SIMPLE_COLS = COL_COUNT - 1;
const BUFFER_ROWS = 5;
const MIN_COL_WIDTH = 24;

/**
 * Custom CSV parser for GreyCat Logs
 *
 * Right now logs have 7 columns, the last could potentially contain commas
 * so we only look for the 6 first columns and then take the rest of the line until '\n'
 */
function parseLine(line: string): string[] {
  const cols: string[] = [];
  let start = 0;
  for (let c = 0; c < SIMPLE_COLS; c++) {
    const idx = line.indexOf(',', start);
    if (idx === -1) {
      cols.push(line.substring(start));
      start = line.length;
      break;
    }
    cols.push(line.substring(start, idx));
    start = idx + 1;
  }
  let remainder = start < line.length ? line.substring(start) : '';
  if (remainder.startsWith(',')) {
    remainder = remainder.substring(1);
  }
  cols.push(remainder);
  while (cols.length < COL_COUNT) cols.push('');
  return cols;
}

export class GuiLogs extends GuiElement {
  static override styles = [css(style)];

  private _filepath = 'root/log.csv';
  private _chunkSize = 64 * 1024;
  private _greycat: gc.sdk.GreyCat = gc.$.default;

  // Data state
  private _allRows: string[][] = [];
  private _filteredIndices: number[] = [];
  private _isLoading = false;
  private _totalFileSize = 0;
  private _loadHeadOffset = 0;
  private _loadTailOffset = 0;
  private _leadingPartialLine = '';
  private _trailingPartialLine = '';

  // Filter/sort state
  private _levelFilter = new Set<string>(LOG_LEVELS);
  private _textFilter = '';
  private _sortColumn = -1;
  private _sortAsc = true;

  // Virtual scroll state
  private _rowHeight = 0;
  private _prevFromRowIdx = -1;
  private _expandedFi = -1;
  private _expandedExtraHeight = 0;

  // DOM refs
  private _statusEl!: HTMLSpanElement;
  private _searchInput!: HTMLElement;
  private _headerRow!: HTMLDivElement;
  private _viewport!: HTMLDivElement;
  private _scroller!: HTMLDivElement;
  private _logContainer!: HTMLDivElement;
  private _emptyState!: HTMLDivElement;
  private _scrubberBar!: HTMLDivElement;
  private _scrubberLoaded!: HTMLDivElement;
  private _scrubberThumb!: HTMLDivElement;
  private _rowPool: HTMLDivElement[] = [];
  private _sortIndicators: HTMLSpanElement[] = [];
  private _debounceTimer: ReturnType<typeof setTimeout> | undefined;
  private _scrubberDragging = false;
  private _scrubberMoved = false;
  private _scrubberDownY = 0;
  private _resizeObserver: ResizeObserver | undefined;

  // Column resize state
  private _colWidths: number[] = [];
  private _resizeColIdx = -1;
  private _resizeStartX = 0;
  private _resizeStartWidth = 0;
  private _resizeRaf = 0;
  private _resizeCx = 0;
  private _resizers: HTMLDivElement[] = [];
  private _didResize = false;

  constructor() {
    super();
    this._buildDOM();
  }

  setAttrs({
    filepath = this._filepath,
    chunkSize = this._chunkSize,
    greycat = this._greycat,
  }: Partial<GuiLogsAttrs>): void {
    this._filepath = filepath;
    this._chunkSize = chunkSize;
    this._greycat = greycat;
  }

  get filepath(): string {
    return this._filepath;
  }

  set filepath(v: string) {
    this._filepath = v;
    this._init();
  }

  connectedCallback(): void {
    this._readColWidths();
    this._computeRowHeight();
    this._resizeObserver = new ResizeObserver(() => {
      this._prevFromRowIdx = -1;
      this._renderVisible();
    });
    this._resizeObserver.observe(this._logContainer);

    // Mouse events on window for scrubber drag
    const onMouseMove = (e: MouseEvent) => {
      if (!this._scrubberDragging) return;
      if (Math.abs(e.clientY - this._scrubberDownY) > 3) this._scrubberMoved = true;
      this._scrollToRatio(this._ratioFromClientY(e.clientY));
      e.preventDefault();
    };
    const onMouseUp = (e: MouseEvent) => {
      if (!this._scrubberDragging) return;
      this._scrubberDragging = false;
      if (!this._scrubberMoved) {
        const ratio = this._ratioFromClientY(e.clientY);
        const target = this._totalFileSize * (1 - ratio);
        if ((target < this._loadHeadOffset || target > this._loadTailOffset) && !this._isFullyLoaded()) {
          this._jumpToOffset(target);
        }
      }
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    this.addDisposable(() => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    });

    this._init();
  }

  override disconnectedCallback(): void {
    this._resizeObserver?.disconnect();
    super.disconnectedCallback();
  }

  private async _init(): Promise<void> {
    this._allRows.length = 0;
    this._filteredIndices = [];
    this._leadingPartialLine = '';
    this._trailingPartialLine = '';
    this._expandedFi = -1;
    this._expandedExtraHeight = 0;

    this._totalFileSize = await this._discoverFileSize();
    this._loadHeadOffset = this._totalFileSize;
    this._loadTailOffset = this._totalFileSize;

    await this._loadPreviousChunk();
  }

  // --- File size discovery ---
  private async _discoverFileSize(): Promise<number> {
    const res = await this._greycat.getFileResponse(this._filepath);
    const cl = res.headers.get('content-length');
    const size = cl ? parseInt(cl, 10) : 0;
    if (size > 0) {
      await res.body?.cancel();
      return size;
    }
    const text = await res.text();
    return new TextEncoder().encode(text).length;
  }

  // --- Backward chunk loading ---
  private async _loadPreviousChunk(): Promise<boolean> {
    if (this._isLoading || this._loadHeadOffset <= 0) return false;
    this._isLoading = true;
    try {
      const chunkStart = Math.max(0, this._loadHeadOffset - this._chunkSize);
      const chunkSize = this._loadHeadOffset - chunkStart;
      const text = (await this._greycat.getFile(this._filepath, chunkStart, chunkSize)) as string;

      if (typeof text !== 'string' || text.length === 0) {
        this._loadHeadOffset = 0;
        return false;
      }

      const fullText = text + this._leadingPartialLine;
      const lines = fullText.split('\n');
      if (chunkStart > 0) {
        this._leadingPartialLine = lines.shift() ?? '';
      } else {
        this._leadingPartialLine = '';
      }

      const newRows: string[][] = [];
      for (const line of lines) {
        if (line.length === 0) continue;
        newRows.push(parseLine(line));
      }

      this._allRows.splice(0, 0, ...newRows);
      this._loadHeadOffset = chunkStart;

      if (chunkStart === 0 && this._leadingPartialLine.length > 0) {
        this._allRows.splice(0, 0, parseLine(this._leadingPartialLine));
        this._leadingPartialLine = '';
      }

      if (this._expandedFi >= 0) {
        this._expandedFi += newRows.length;
      }

      this._rebuildFilteredIndices();
      this._updateStatus();
      this._prevFromRowIdx = -1;
      this._renderVisible();
      return true;
    } finally {
      this._isLoading = false;
    }
  }

  // --- Forward chunk loading ---
  private async _loadNextChunk(): Promise<boolean> {
    if (this._isLoading || this._loadTailOffset >= this._totalFileSize) return false;
    this._isLoading = true;
    try {
      const chunkSize = Math.min(this._chunkSize, this._totalFileSize - this._loadTailOffset);
      const text = (await this._greycat.getFile(this._filepath, this._loadTailOffset, chunkSize)) as string;

      if (typeof text !== 'string' || text.length === 0) {
        this._loadTailOffset = this._totalFileSize;
        return false;
      }

      const fullText = this._trailingPartialLine + text;
      const lines = fullText.split('\n');
      const bytesRead = new TextEncoder().encode(text).length;
      if (this._loadTailOffset + bytesRead < this._totalFileSize) {
        this._trailingPartialLine = lines.pop() ?? '';
      } else {
        this._trailingPartialLine = '';
      }

      const newRows: string[][] = [];
      for (const line of lines) {
        if (line.length === 0) continue;
        newRows.push(parseLine(line));
      }

      this._allRows.push(...newRows);
      this._loadTailOffset += bytesRead;

      this._rebuildFilteredIndices();
      this._updateStatus();
      this._prevFromRowIdx = -1;
      this._renderVisible();
      return true;
    } finally {
      this._isLoading = false;
    }
  }

  // --- Jump to arbitrary offset ---
  private async _jumpToOffset(targetByteOffset: number): Promise<void> {
    this._allRows.length = 0;
    this._filteredIndices = [];
    this._expandedFi = -1;
    this._expandedExtraHeight = 0;
    this._leadingPartialLine = '';
    this._trailingPartialLine = '';

    this._loadHeadOffset = Math.min(this._totalFileSize, Math.floor(targetByteOffset) + this._chunkSize);
    this._loadTailOffset = this._loadHeadOffset;

    await this._loadPreviousChunk();
    this._logContainer.scrollTop = this._getRowTop(0);
  }

  // --- Filtering ---
  private _rebuildFilteredIndices(): void {
    this._filteredIndices = [];
    const lower = this._textFilter.toLowerCase();
    for (let i = 0; i < this._allRows.length; i++) {
      const row = this._allRows[i];
      if (!this._levelFilter.has(row[0])) continue;
      if (lower.length > 0) {
        let match = false;
        for (let c = 0; c < row.length; c++) {
          if (row[c].toLowerCase().includes(lower)) {
            match = true;
            break;
          }
        }
        if (!match) continue;
      }
      this._filteredIndices.push(i);
    }
    if (this._sortColumn >= 0) {
      this._applySortToFiltered();
    } else {
      this._filteredIndices.reverse();
    }
  }

  private _applySortToFiltered(): void {
    const col = this._sortColumn;
    const asc = this._sortAsc;
    this._filteredIndices.sort((a, b) => {
      const va = this._allRows[a][col] ?? '';
      const vb = this._allRows[b][col] ?? '';
      if (col <= 3) {
        const na = Number(va);
        const nb = Number(vb);
        if (!isNaN(na) && !isNaN(nb)) return asc ? na - nb : nb - na;
      }
      const cmp = va.localeCompare(vb);
      return asc ? cmp : -cmp;
    });
  }

  // --- Helpers ---
  private _isFullyLoaded(): boolean {
    return this._loadHeadOffset <= 0 && this._loadTailOffset >= this._totalFileSize;
  }

  private _formatTime(raw: string): string {
    if (!raw) return '';
    const n = Number(raw);
    if (isNaN(n)) return raw;
    try {
      return this._greycat.printTime(gc.core.time.create(n));
    } catch {
      return raw;
    }
  }

  private _estimatedTotalRows(): number {
    const loadedBytes = this._loadTailOffset - this._loadHeadOffset;
    if (loadedBytes <= 0 || this._filteredIndices.length === 0) return this._filteredIndices.length;
    return Math.ceil((this._totalFileSize / loadedBytes) * this._filteredIndices.length);
  }

  private _rowsAboveOffset(): number {
    const loadedBytes = this._loadTailOffset - this._loadHeadOffset;
    if (loadedBytes <= 0 || this._totalFileSize <= 0) return 0;
    return Math.round(((this._totalFileSize - this._loadTailOffset) / loadedBytes) * this._filteredIndices.length);
  }

  private _getTotalHeight(): number {
    return this._estimatedTotalRows() * this._rowHeight + this._expandedExtraHeight;
  }

  private _getRowTop(fi: number): number {
    const offset = this._rowsAboveOffset();
    const base = (offset + fi) * this._rowHeight;
    if (this._expandedFi < 0 || fi <= this._expandedFi) return base;
    return base + this._expandedExtraHeight;
  }

  private _fiFromScrollTop(st: number): number {
    const offset = this._rowsAboveOffset();
    const adjusted = st - offset * this._rowHeight;
    if (adjusted < 0) return 0;
    if (this._expandedFi < 0) return Math.floor(adjusted / this._rowHeight);
    const expandedTop = this._expandedFi * this._rowHeight;
    if (adjusted <= expandedTop) return Math.floor(adjusted / this._rowHeight);
    const expandedBottom = expandedTop + this._rowHeight + this._expandedExtraHeight;
    if (adjusted < expandedBottom) return this._expandedFi;
    return Math.floor((adjusted - this._expandedExtraHeight) / this._rowHeight);
  }

  // --- Status ---
  private _updateStatus(): void {
    const loadedBytes = this._loadTailOffset - this._loadHeadOffset;
    const status = this._isFullyLoaded()
      ? 'all loaded'
      : `${gc.sdk.humanSize(loadedBytes)} / ${gc.sdk.humanSize(this._totalFileSize)}`;
    this._statusEl.textContent = `${this._filteredIndices.length} / ~${this._estimatedTotalRows()} rows (${status})`;
  }

  // --- Scrubber ---
  private _updateScrubber(): void {
    if (this._totalFileSize <= 0 || this._rowHeight <= 0) return;
    if (this._scrubberBar.clientHeight <= 0) return;

    const loadedStart = 1 - this._loadTailOffset / this._totalFileSize;
    const loadedEnd = 1 - this._loadHeadOffset / this._totalFileSize;
    this._scrubberLoaded.style.top = `${loadedStart * 100}%`;
    this._scrubberLoaded.style.height = `${(loadedEnd - loadedStart) * 100}%`;
    const loadedFraction = loadedEnd - loadedStart;

    const totalRows = this._filteredIndices.length;
    if (totalRows <= 0) return;
    const fromRowIdx = this._fiFromScrollTop(this._logContainer.scrollTop);
    const visibleRows = Math.ceil(this._logContainer.clientHeight / this._rowHeight);
    const thumbTopInLoaded = fromRowIdx / totalRows;
    const thumbHeightInLoaded = Math.max(0.02, visibleRows / totalRows);
    this._scrubberThumb.style.top = `${(loadedStart + thumbTopInLoaded * loadedFraction) * 100}%`;
    this._scrubberThumb.style.height = `${thumbHeightInLoaded * loadedFraction * 100}%`;
  }

  private _ratioFromClientY(clientY: number): number {
    const rect = this._scrubberBar.getBoundingClientRect();
    return Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
  }

  private _scrollToRatio(ratio: number): void {
    const loadedStart = this._totalFileSize > 0 ? 1 - this._loadTailOffset / this._totalFileSize : 0;
    const loadedEnd = this._totalFileSize > 0 ? 1 - this._loadHeadOffset / this._totalFileSize : 1;
    const loadedFraction = loadedEnd - loadedStart;
    const clamped = Math.max(loadedStart, Math.min(ratio, loadedEnd));
    const totalRows = this._filteredIndices.length;
    if (totalRows <= 0 || loadedFraction <= 0) return;
    const posInLoaded = (clamped - loadedStart) / loadedFraction;
    const targetFi = Math.floor(posInLoaded * totalRows);
    this._logContainer.scrollTop = this._getRowTop(Math.max(0, Math.min(totalRows - 1, targetFi)));
  }

  // --- Rendering ---
  private _renderVisible(): void {
    this._scroller.style.height = `${this._getTotalHeight()}px`;
    const fromRowIdx = this._rowHeight > 0 ? this._fiFromScrollTop(this._logContainer.scrollTop) : 0;
    this._renderRows(fromRowIdx);
    this._updateScrubber();
    this._emptyState.style.display = this._filteredIndices.length === 0 && !this._isFullyLoaded() ? '' : 'none';
  }

  private _renderRows(fromRowIdx: number): void {
    if (this._rowHeight <= 0) return;
    const maxVisible = Math.ceil(this._logContainer.clientHeight / this._rowHeight) + 2 * BUFFER_ROWS;
    const start = Math.max(0, fromRowIdx - BUFFER_ROWS);
    const end = Math.min(this._filteredIndices.length, start + maxVisible);

    let rendered = 0;
    for (let fi = start; fi < end; fi++) {
      const row = this._getOrCreateRow(rendered);
      const entry = this._allRows[this._filteredIndices[fi]];
      row.style.top = `${this._getRowTop(fi)}px`;
      row.style.display = '';

      const lvl = entry[0] || '';
      const isExpanded = fi === this._expandedFi;
      row.className = `log-row level-${lvl}${fi % 2 === 0 ? ' even' : ''}${isExpanded ? ' expanded' : ''}`;

      const cellRow = row.children[0] as HTMLDivElement;
      const detailWrap = row.children[1] as HTMLDivElement;
      const detail = detailWrap.querySelector('.log-row-detail') as HTMLPreElement;

      const cells = cellRow.children;
      const levelCell = cells[0] as HTMLSpanElement;
      levelCell.textContent = lvl;
      levelCell.className = `log-cell level-${lvl}`;
      const timeCell = cells[1] as HTMLSpanElement;
      timeCell.textContent = this._formatTime(entry[1]);
      timeCell.className = 'log-cell col-time';
      for (let c = 2; c < COL_COUNT; c++) {
        const cell = cells[c] as HTMLSpanElement;
        cell.textContent = entry[c] || '';
        cell.className = c === 5 ? 'log-cell col-tag' : c === COL_COUNT - 1 ? 'log-cell col-data' : 'log-cell';
      }

      if (isExpanded) {
        detail.innerHTML = '';
        detail.appendChild(highlight(entry[COL_COUNT - 1]));
        detailWrap.style.display = '';
        row.style.height = '';
      } else {
        detailWrap.style.display = 'none';
        detail.innerHTML = '';
        row.style.height = `${this._rowHeight}px`;
      }

      const capturedFi = fi;
      row.onclick = () => {
        if (this._expandedFi === capturedFi) {
          this._expandedFi = -1;
          this._expandedExtraHeight = 0;
        } else {
          this._expandedFi = capturedFi;
          this._expandedExtraHeight = 0;
        }
        this._prevFromRowIdx = -1;
        this._renderVisible();
        if (this._expandedFi >= 0) {
          requestAnimationFrame(() => {
            const expRow = this._findExpandedRow();
            if (expRow) {
              const extra = expRow.offsetHeight - this._rowHeight;
              if (extra !== this._expandedExtraHeight) {
                this._expandedExtraHeight = Math.max(0, extra);
                this._scroller.style.height = `${this._getTotalHeight()}px`;
                this._prevFromRowIdx = -1;
                this._renderRows(this._fiFromScrollTop(this._logContainer.scrollTop));
              }
            }
          });
        }
      };
      rendered++;
    }

    for (let i = rendered; i < this._rowPool.length; i++) {
      this._rowPool[i].style.display = 'none';
    }
  }

  private _findExpandedRow(): HTMLDivElement | null {
    for (const row of this._rowPool) {
      if (row.style.display !== 'none' && row.classList.contains('expanded')) return row;
    }
    return null;
  }

  private _getOrCreateRow(idx: number): HTMLDivElement {
    if (idx < this._rowPool.length) return this._rowPool[idx];
    const row = document.createElement('div');
    row.className = 'log-row';
    const cellRow = document.createElement('div');
    cellRow.className = 'log-row-cells';
    for (let c = 0; c < COL_COUNT; c++) {
      const cell = document.createElement('span');
      cell.className = 'log-cell';
      cellRow.appendChild(cell);
    }
    row.appendChild(cellRow);
    const detailWrap = document.createElement('div');
    detailWrap.className = 'log-row-detail-wrap';
    detailWrap.style.display = 'none';
    const detail = document.createElement('pre');
    detail.className = 'log-row-detail';
    const copyBtn = document.createElement('button');
    copyBtn.className = 'detail-copy-btn';
    copyBtn.title = 'Copy to clipboard';
    copyBtn.textContent = 'Copy';
    copyBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navigator.clipboard.writeText(detail.textContent ?? '').then(() => {
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
          copyBtn.textContent = 'Copy';
        }, 1500);
      });
    });
    detailWrap.appendChild(copyBtn);
    detailWrap.appendChild(detail);
    row.appendChild(detailWrap);
    this._rowPool.push(row);
    this._viewport.appendChild(row);
    return row;
  }

  private _computeRowHeight(): void {
    const tmp = this._getOrCreateRow(0);
    tmp.style.position = 'relative';
    tmp.style.visibility = 'hidden';
    const cells = (tmp.children[0] as HTMLDivElement).children;
    (cells[0] as HTMLSpanElement).textContent = 'info';
    (cells[1] as HTMLSpanElement).textContent = '2025-01-09T10:41:47.000+00:00';
    this._viewport.appendChild(tmp);
    this._rowHeight = tmp.offsetHeight || 24;
    tmp.style.position = '';
    tmp.style.visibility = '';
    tmp.style.display = 'none';
  }

  // --- Column resize ---
  private _readColWidths(): void {
    const styles = getComputedStyle(this);
    this._colWidths = [];
    for (let i = 0; i < COL_COUNT - 1; i++) {
      this._colWidths.push(parseInt(styles.getPropertyValue(`--col-${i}-width`)) || MIN_COL_WIDTH);
    }
  }

  private _startColResize(colIdx: number, startX: number): void {
    this._resizeColIdx = colIdx;
    this._resizeStartX = startX;
    this._resizeCx = startX;
    this._resizeStartWidth = this._colWidths[colIdx];
    this._didResize = true;
    this.classList.add('log-resizing');
    this._resizers[colIdx].classList.add('active');
    const headerCell = this._resizers[colIdx].parentElement!;
    headerCell.classList.add('resizing');

    const onMove = (e: MouseEvent) => {
      this._resizeCx = e.clientX;
    };
    const tick = () => {
      if (this._resizeColIdx < 0) return;
      const dx = this._resizeCx - this._resizeStartX;
      const newWidth = Math.max(MIN_COL_WIDTH, this._resizeStartWidth + dx);
      if (newWidth !== this._colWidths[this._resizeColIdx]) {
        this._colWidths[this._resizeColIdx] = newWidth;
        this.style.setProperty(`--col-${this._resizeColIdx}-width`, `${newWidth}px`);
      }
      this._resizeRaf = requestAnimationFrame(tick);
    };
    this._resizeRaf = requestAnimationFrame(tick);

    const stop = () => {
      cancelAnimationFrame(this._resizeRaf);
      this._resizers[this._resizeColIdx]?.classList.remove('active');
      headerCell.classList.remove('resizing');
      this._resizeColIdx = -1;
      this.classList.remove('log-resizing');
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', stop);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', stop);
  }

  // --- DOM construction ---
  private _buildDOM(): void {
    this._statusEl = (<span className="log-status">Loading...</span>) as HTMLSpanElement;

    this._searchInput = (
      <sl-input
        placeholder="Search logs..."
        size="small"
        clearable
        onsl-clear={() => {
          clearTimeout(this._debounceTimer);
          this._textFilter = '';
          this._rebuildFilteredIndices();
          this._expandedFi = -1;
          this._expandedExtraHeight = 0;
          this._prevFromRowIdx = -1;
          this._updateStatus();
          this._renderVisible();
        }}
        oninput={() => {
          clearTimeout(this._debounceTimer);
          this._debounceTimer = setTimeout(() => {
            this._textFilter = (this._searchInput as unknown as { value: string }).value;
            this._rebuildFilteredIndices();
            this._expandedFi = -1;
            this._expandedExtraHeight = 0;
            this._prevFromRowIdx = -1;
            this._updateStatus();
            this._renderVisible();
          }, 200);
        }}
      />
    ) as HTMLElement;

    const levelBtns = LOG_LEVELS.map((name) => {
      const btn = (
        <button
          className={['level-btn', name, 'active']}
          onclick={() => {
            if (this._levelFilter.has(name)) {
              this._levelFilter.delete(name);
              btn.classList.remove('active');
            } else {
              this._levelFilter.add(name);
              btn.classList.add('active');
            }
            this._rebuildFilteredIndices();
            this._expandedFi = -1;
            this._expandedExtraHeight = 0;
            this._prevFromRowIdx = -1;
            this._updateStatus();
            this._renderVisible();
          }}
        >
          {name}
        </button>
      ) as HTMLButtonElement;
      return btn;
    });

    this._headerRow = (<div className="log-header" />) as HTMLDivElement;
    for (let i = 0; i < HEADERS.length; i++) {
      const indicator = (<span className="sort-indicator" />) as HTMLSpanElement;
      this._sortIndicators.push(indicator);
      const colIdx = i;
      const cell = (
        <div
          className="log-header-cell"
          onclick={() => {
            if (this._didResize) {
              this._didResize = false;
              return;
            }
            if (this._sortColumn === colIdx) {
              this._sortAsc = !this._sortAsc;
            } else {
              this._sortColumn = colIdx;
              this._sortAsc = true;
            }
            for (let j = 0; j < this._sortIndicators.length; j++) {
              this._sortIndicators[j].textContent = j === this._sortColumn ? (this._sortAsc ? '\u25B2' : '\u25BC') : '';
            }
            this._rebuildFilteredIndices();
            this._prevFromRowIdx = -1;
            this._renderVisible();
          }}
        >
          {HEADERS[i]}
          {indicator}
        </div>
      ) as HTMLDivElement;

      // Add resizer handle to all columns except the last (1fr)
      if (i < HEADERS.length - 1) {
        const resizer = (<div className="log-header-resizer" />) as HTMLDivElement;
        resizer.addEventListener('mousedown', (e) => {
          e.stopPropagation();
          this._startColResize(colIdx, e.clientX);
        });
        this._resizers[i] = resizer;
        cell.appendChild(resizer);
      }

      this._headerRow.appendChild(cell);
    }

    this._emptyState = (
      <div className="log-empty-state">
        No matching logs in the loaded portion of the file. Try scrolling or clicking the scrubber to load more data.
      </div>
    ) as HTMLDivElement;
    this._emptyState.style.display = 'none';

    this._viewport = (<div className="log-viewport" />) as HTMLDivElement;
    this._scroller = (
      <div style="visibility:hidden;width:100%;pointer-events:none;position:absolute;top:0;left:0;" />
    ) as HTMLDivElement;
    this._viewport.appendChild(this._scroller);

    this._logContainer = (
      <div className="log-container">
        {this._headerRow}
        {this._viewport}
        {this._emptyState}
      </div>
    ) as HTMLDivElement;

    this._logContainer.addEventListener('scroll', () => {
      const fromRowIdx = this._rowHeight > 0 ? this._fiFromScrollTop(this._logContainer.scrollTop) : 0;
      if (this._loadHeadOffset > 0 && this._filteredIndices.length > 0) {
        const visibleEnd = fromRowIdx + Math.ceil(this._logContainer.clientHeight / (this._rowHeight || 30));
        if (visibleEnd >= this._filteredIndices.length - BUFFER_ROWS * 2) {
          this._loadPreviousChunk();
        }
      }
      if (this._loadTailOffset < this._totalFileSize && this._filteredIndices.length > 0) {
        if (fromRowIdx <= BUFFER_ROWS * 2) {
          this._loadNextChunk();
        }
      }
      if (fromRowIdx !== this._prevFromRowIdx) {
        this._prevFromRowIdx = fromRowIdx;
        this._renderRows(fromRowIdx);
      }
      this._updateScrubber();
    });

    // Scrubber
    this._scrubberThumb = (<div className="scrubber-thumb" />) as HTMLDivElement;
    this._scrubberLoaded = (<div className="scrubber-loaded" />) as HTMLDivElement;
    this._scrubberBar = (
      <div className="file-scrubber">
        {this._scrubberLoaded}
        {this._scrubberThumb}
      </div>
    ) as HTMLDivElement;

    this._scrubberBar.addEventListener('mousemove', (e) => {
      if (this._scrubberDragging) return;
      const ratio = this._ratioFromClientY(e.clientY);
      const target = this._totalFileSize * (1 - ratio);
      const loadedBytes = this._loadTailOffset - this._loadHeadOffset;
      const filePct = Math.round((1 - ratio) * 100);
      if (loadedBytes > 0 && target >= this._loadHeadOffset && target <= this._loadTailOffset) {
        const posInLoaded = (this._loadTailOffset - target) / loadedBytes;
        const fi = Math.min(
          this._filteredIndices.length - 1,
          Math.max(0, Math.floor(posInLoaded * this._filteredIndices.length)),
        );
        const entry = this._allRows[this._filteredIndices[fi]];
        if (entry) {
          this._scrubberBar.title = `${this._formatTime(entry[1])}\nRow ${fi + 1} / ${this._filteredIndices.length}\nFile: ${filePct}%`;
        }
      } else {
        this._scrubberBar.title = `Not loaded yet\nFile: ${filePct}%\nClick to load`;
      }
    });

    this._scrubberBar.addEventListener('mousedown', (e) => {
      this._scrubberDragging = true;
      this._scrubberMoved = false;
      this._scrubberDownY = e.clientY;
      this._scrollToRatio(this._ratioFromClientY(e.clientY));
      e.preventDefault();
    });

    // Assemble
    this.shadowRoot.appendChild(
      <div className="log-toolbar">
        {this._searchInput}
        <div className="log-levels">{...levelBtns}</div>
        {this._statusEl}
      </div>,
    );
    this.shadowRoot.appendChild(
      <div className="log-content">
        {this._logContainer}
        {this._scrubberBar}
      </div>,
    );
  }
}

export interface GuiLogsAttrs {
  filepath: string;
  chunkSize: number;
  greycat: gc.sdk.GreyCat;
}

declare global {
  interface HTMLElementTagNameMap {
    /** @see {@link GuiLogs} */
    'gui-logs': GuiLogs;
  }

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        /** @see {@link GuiLogs} */
        'gui-logs': GreyCat.Element<GuiLogs>;
      }
    }
  }
}
