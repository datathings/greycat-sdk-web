import { highlight, truncateText } from '../../utils.js';
import { css } from '../common.js';
import { GuiElement } from '../element.js';
import style from './logs.css?inline';

const LOG_LEVELS = ['error', 'warn', 'info', 'perf', 'trace'] as const;
const HEADERS = ['Level', 'Time', 'User', 'Task', 'Job', 'Source', 'Data'] as const;
const COL_COUNT = HEADERS.length;
const BUFFER_ROWS = 5;
const MIN_COL_WIDTH = 24;

/**
 * Most characters of a record shown in its detail. Laying out text can take tens of
 * milliseconds per kilobyte when it mixes scripts (CJK, emoji) that need font fallback, so a
 * whole record of unknown content could freeze the page. The full record is one Copy or
 * Download away.
 */
const DETAIL_MAX_CHARS = 16 * 1024;
/** Most characters of a record's data in its row, which shows a single line anyway. */
const CELL_MAX_CHARS = 512;
/**
 * Most bytes read backwards to fill the view without finding a row to show (a filter that
 * matches nothing), before the view asks the user whether to read on.
 */
const FILL_BUDGET = 16 * 1024 * 1024;
/** Most bytes of records held at once, the side away from the view being dropped past it. */
const MAX_LOADED_BYTES = 64 * 1024 * 1024;
/** Longest stretch of the main thread a filter run takes before it yields. */
const FILTER_SLICE_MS = 8;

/** A loaded record and what the view keeps about it. */
interface Row {
  rec: gc.sdk.LogRecordRef;
  /** The start of `rec.data`, for its cell. */
  cell: string;
  /** The text filter `matched` was computed for. */
  filter: string | null;
  matched: boolean;
}

function toRow(rec: gc.sdk.LogRecordRef): Row {
  return { rec, cell: truncateText(rec.data, CELL_MAX_CHARS), filter: null, matched: false };
}

/** A column's value, as a number for the numeric columns so they sort as numbers. */
function sortValue(row: Row, col: number): string | number | null {
  const r = row.rec;
  switch (col) {
    case 0:
      return r.level;
    case 1:
      return r.time;
    case 2:
      return r.user_id;
    case 3:
      return r.task_id;
    case 4:
      return r.job_id;
    case 5:
      return r.src;
    default:
      return r.data;
  }
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function idCell(v: number | null): string {
  return v === null ? '' : String(v);
}

export class GuiLogs extends GuiElement {
  static override styles = [css(style)];

  private _filepath = 'root/streams/log.ndjson';
  private _chunkSize = 64 * 1024;
  private _greycat: gc.sdk.GreyCat = gc.$.default;
  private _reader!: gc.sdk.LogStreamReader;

  // Data state, `_allRows` in file order (oldest first)
  private _allRows: Row[] = [];
  private _filteredIndices: number[] = [];
  private _isLoading = false;
  private _totalFileSize = 0;
  private _loadHeadOffset = 0;
  private _loadTailOffset = 0;
  /** Bumped by each `_init`, so the loads of a previous file are dropped. */
  private _generation = 0;
  private _filling = false;
  /** Set when a fill is asked for while one runs, which then starts over. */
  private _fillAgain = false;
  /** Bytes read backwards since the last load that brought a row to show. */
  private _fillScanned = 0;

  // Filter/sort state
  private _levelFilter = new Set<string>(LOG_LEVELS);
  private _textFilter = '';
  private _textRegExp: RegExp | null = null;
  /** Bumped by each change of the text filter, so a sliced run of an older one stops. */
  private _filterRun = 0;
  /** Set while a sliced run tests the loaded rows against a new text filter. */
  private _filterPending = false;
  private _sortColumn = -1;
  private _sortAsc = true;

  // Virtual scroll state
  private _rowHeight = 0;
  private _prevFromRowIdx = -1;
  private _expandedRow: Row | null = null;
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
  private _moreEl!: HTMLDivElement;
  private _moreText!: HTMLSpanElement;
  private _scrubberBar!: HTMLDivElement;
  private _scrubberLoaded!: HTMLDivElement;
  private _scrubberThumb!: HTMLDivElement;
  private _rowPool: HTMLDivElement[] = [];
  /** The row each element of `_rowPool` shows. */
  private _poolRows: (Row | null)[] = [];
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
      void this._fill();
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
    const generation = ++this._generation;
    this._reader = new gc.sdk.LogStreamReader(this._greycat, this._filepath, { chunkBytes: this._chunkSize });
    this._clearRows();

    const size = await this._reader.size();
    if (generation !== this._generation) return;
    this._totalFileSize = size;
    this._loadHeadOffset = size;
    this._loadTailOffset = size;

    await this._fill(true);
  }

  private _clearRows(): void {
    this._allRows = [];
    this._filteredIndices = [];
    this._expandedRow = null;
    this._expandedFi = -1;
    this._expandedExtraHeight = 0;
    this._fillScanned = 0;
  }

  // --- Filling the view ---

  /** Whether fewer loaded rows lie below the viewport than it takes to fill it. */
  private _needsOlderRows(): boolean {
    const rowHeight = this._rowHeight || 24;
    const wanted = Math.ceil((this._logContainer.clientHeight || 600) / rowHeight) + 2 * BUFFER_ROWS;
    const from = this._rowHeight > 0 ? this._fiFromScrollTop(this._logContainer.scrollTop) : 0;
    return this._filteredIndices.length - from < wanted;
  }

  /**
   * Loads older records until the view is full, the start of the file is reached, or
   * `FILL_BUDGET` bytes were read without a row to show. `fresh` starts a new budget, as an
   * explicit request of the user does.
   */
  private async _fill(fresh = false): Promise<void> {
    if (fresh) this._fillScanned = 0;
    if (this._filling) {
      this._fillAgain = true;
      return;
    }
    this._filling = true;
    try {
      do {
        this._fillAgain = false;
        while (this._loadHeadOffset > 0 && this._fillScanned < FILL_BUDGET && this._needsOlderRows()) {
          if (!(await this._loadPreviousChunk())) break;
        }
      } while (this._fillAgain);
    } finally {
      this._filling = false;
      this._renderVisible();
    }
  }

  // --- Backward chunk loading ---
  private async _loadPreviousChunk(): Promise<boolean> {
    if (this._isLoading || this._loadHeadOffset <= 0) return false;
    this._isLoading = true;
    const generation = this._generation;
    try {
      const head = this._loadHeadOffset;
      const page = await this._reader.before(head, { maxBytes: this._chunkSize });
      if (generation !== this._generation) return false;

      const rows = page.records.map(toRow);
      if (head === this._loadTailOffset) {
        // nothing loaded yet: what follows the last complete record is left out
        this._loadTailOffset = page.end;
      }
      this._loadHeadOffset = page.start;
      this._allRows = rows.concat(this._allRows);

      const shown = rows.filter((r) => this._isShown(r)).length;
      this._fillScanned = shown > 0 ? 0 : this._fillScanned + (head - page.start);
      this._dropNewest();
      this._afterRowsChanged();
      return true;
    } finally {
      this._isLoading = false;
    }
  }

  // --- Forward chunk loading ---
  private async _loadNextChunk(): Promise<boolean> {
    if (this._isLoading || this._loadTailOffset >= this._totalFileSize) return false;
    this._isLoading = true;
    const generation = this._generation;
    try {
      const page = await this._reader.after(this._loadTailOffset, {
        maxBytes: this._chunkSize,
        size: this._totalFileSize,
      });
      if (generation !== this._generation || page.records.length === 0) return false;

      this._allRows = this._allRows.concat(page.records.map(toRow));
      this._loadTailOffset = page.end;
      this._dropOldest();
      this._afterRowsChanged();
      return true;
    } finally {
      this._isLoading = false;
    }
  }

  // --- Jump to arbitrary offset ---
  private async _jumpToOffset(targetByteOffset: number): Promise<void> {
    this._generation++;
    this._isLoading = false;
    this._clearRows();
    this._loadHeadOffset = Math.min(this._totalFileSize, Math.floor(targetByteOffset));
    this._loadTailOffset = this._loadHeadOffset;
    this._logContainer.scrollTop = 0;
    await this._fill(true);
    this._logContainer.scrollTop = this._getRowTop(0);
  }

  // --- Loaded window ---

  /**
   * Drops the newest rows past `MAX_LOADED_BYTES`, never one shown in or near the viewport. Only
   * in file order: a sorted view has no side away from the view.
   */
  private _dropNewest(): void {
    if (this._sortColumn >= 0 || this._loadTailOffset - this._loadHeadOffset <= MAX_LOADED_BYTES) return;
    // newest-first, the rows above the viewport are the first filtered ones
    const keepAbove = Math.max(0, this._fiFromScrollTop(this._logContainer.scrollTop) - 2 * BUFFER_ROWS);
    let shownDropped = 0;
    let n = 0;
    let tail = this._loadTailOffset;
    while (n < this._allRows.length - 1 && tail - this._loadHeadOffset > MAX_LOADED_BYTES) {
      const row = this._allRows[this._allRows.length - 1 - n];
      if (this._isShown(row)) {
        if (shownDropped + 1 > keepAbove) break;
        shownDropped++;
      }
      tail = row.rec.start;
      n++;
    }
    if (n === 0) return;
    this._keepScrollAnchor(() => {
      this._allRows = this._allRows.slice(0, this._allRows.length - n);
      this._loadTailOffset = tail;
    });
  }

  /** Drops the oldest rows past `MAX_LOADED_BYTES`, never one shown in or near the viewport. */
  private _dropOldest(): void {
    if (this._sortColumn >= 0 || this._loadTailOffset - this._loadHeadOffset <= MAX_LOADED_BYTES) return;
    const rowHeight = this._rowHeight || 24;
    const keepBelow =
      this._fiFromScrollTop(this._logContainer.scrollTop) +
      Math.ceil(this._logContainer.clientHeight / rowHeight) +
      2 * BUFFER_ROWS;
    const shownTotal = this._filteredIndices.length;
    let shownDropped = 0;
    let n = 0;
    let head = this._loadHeadOffset;
    while (n < this._allRows.length - 1 && this._loadTailOffset - head > MAX_LOADED_BYTES) {
      const row = this._allRows[n];
      if (this._isShown(row)) {
        if (shownTotal - (shownDropped + 1) < keepBelow) break;
        shownDropped++;
      }
      head = this._allRows[n + 1].rec.start;
      n++;
    }
    if (n === 0) return;
    this._keepScrollAnchor(() => {
      this._allRows = this._allRows.slice(n);
      this._loadHeadOffset = head;
    });
  }

  /** Runs `change` on the loaded rows, keeping the first visible row where it was on screen. */
  private _keepScrollAnchor(change: () => void): void {
    const from = this._rowHeight > 0 ? this._fiFromScrollTop(this._logContainer.scrollTop) : 0;
    const anchorIdx = this._filteredIndices[from];
    const anchor = anchorIdx === undefined ? null : this._allRows[anchorIdx];
    const delta = this._logContainer.scrollTop - this._getRowTop(from);
    change();
    this._rebuildFilteredIndices();
    if (anchor === null) return;
    const fi = this._filteredIndices.findIndex((i) => this._allRows[i] === anchor);
    if (fi >= 0) {
      this._scroller.style.height = `${this._getTotalHeight()}px`;
      this._logContainer.scrollTop = this._getRowTop(fi) + delta;
    }
  }

  // --- Filtering ---

  /** Whether `row` passes the level and text filters. */
  private _isShown(row: Row): boolean {
    // a line that is not a record has no level and is never filtered out by one
    if (row.rec.level !== '' && !this._levelFilter.has(row.rec.level)) return false;
    return this._matchesText(row);
  }

  /**
   * Whether `row` matches the text filter, remembered per row until the filter changes. While a
   * sliced run is testing the loaded rows, a row it has not reached yet counts as not matching,
   * so that no load tests them all at once in the meantime.
   */
  private _matchesText(row: Row, testNow = false): boolean {
    const re = this._textRegExp;
    if (re === null) return true;
    if (row.filter !== this._textFilter) {
      if (this._filterPending && !testNow) return false;
      const r = row.rec;
      row.matched =
        re.test(r.data) ||
        re.test(r.level) ||
        (r.src !== null && re.test(r.src)) ||
        re.test(idCell(r.user_id)) ||
        re.test(idCell(r.task_id)) ||
        re.test(idCell(r.job_id));
      row.filter = this._textFilter;
    }
    return row.matched;
  }

  /**
   * Applies a new text filter. Testing every loaded row may take a while on large logs, so it
   * runs in slices that yield to the browser, and a newer filter stops it.
   */
  private async _setTextFilter(text: string): Promise<void> {
    const run = ++this._filterRun;
    this._textFilter = text;
    this._textRegExp = text.length > 0 ? new RegExp(escapeRegExp(text), 'i') : null;
    this._filterPending = true;
    const rows = this._allRows;
    let i = 0;
    while (i < rows.length) {
      const until = performance.now() + FILTER_SLICE_MS;
      while (i < rows.length && performance.now() < until) {
        this._matchesText(rows[i], true);
        i++;
      }
      if (i < rows.length) {
        await new Promise((r) => setTimeout(r, 0));
        if (run !== this._filterRun) return;
      }
    }
    // the rows loaded during the run are few, the rebuild tests them at once
    this._filterPending = false;
    this._onFilterChanged();
  }

  private _onFilterChanged(): void {
    this._expandedRow = null;
    this._expandedExtraHeight = 0;
    this._rebuildFilteredIndices();
    this._prevFromRowIdx = -1;
    this._updateStatus();
    this._renderVisible();
    void this._fill(true);
  }

  private _afterRowsChanged(): void {
    this._rebuildFilteredIndices();
    this._updateStatus();
    this._prevFromRowIdx = -1;
    this._renderVisible();
  }

  private _rebuildFilteredIndices(): void {
    this._filteredIndices = [];
    for (let i = 0; i < this._allRows.length; i++) {
      if (this._isShown(this._allRows[i])) this._filteredIndices.push(i);
    }
    if (this._sortColumn >= 0) {
      this._applySortToFiltered();
    } else {
      this._filteredIndices.reverse();
    }
    this._expandedFi =
      this._expandedRow === null ? -1 : this._filteredIndices.findIndex((i) => this._allRows[i] === this._expandedRow);
    if (this._expandedFi < 0) {
      this._expandedRow = null;
      this._expandedExtraHeight = 0;
    }
  }

  private _applySortToFiltered(): void {
    const col = this._sortColumn;
    const asc = this._sortAsc;
    this._filteredIndices.sort((a, b) => {
      const va = sortValue(this._allRows[a], col);
      const vb = sortValue(this._allRows[b], col);
      let cmp: number;
      if (typeof va === 'number' && typeof vb === 'number') {
        cmp = va - vb;
      } else if (va === null || vb === null) {
        cmp = va === vb ? 0 : va === null ? -1 : 1;
      } else {
        cmp = String(va).localeCompare(String(vb));
      }
      return asc ? cmp : -cmp;
    });
  }

  // --- Helpers ---
  private _isFullyLoaded(): boolean {
    return this._loadHeadOffset <= 0 && this._loadTailOffset >= this._totalFileSize;
  }

  private _formatTime(micros: number | null): string {
    if (micros === null) return '';
    try {
      return this._greycat.printTime(gc.core.time.create(micros));
    } catch {
      return String(micros);
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
    this._updateStatus();
    this._renderMore();
  }

  /**
   * Tells why no more rows show below the loaded ones: the whole file was read, or the fill
   * stopped after `FILL_BUDGET` bytes without a match and waits for the user.
   */
  private _renderMore(): void {
    const stalled = this._loadHeadOffset > 0 && this._fillScanned >= FILL_BUDGET && !this._filling;
    const none = this._filteredIndices.length === 0 && !this._filling && !this._isLoading;
    this._emptyState.style.display = none && !stalled && this._loadHeadOffset <= 0 ? '' : 'none';
    if (stalled) {
      this._moreText.textContent = `No row to show in the last ${gc.sdk.humanSize(this._fillScanned, 0)} read.`;
      this._moreEl.style.top = `${this._getRowTop(this._filteredIndices.length)}px`;
      this._moreEl.style.display = '';
    } else {
      this._moreEl.style.display = 'none';
    }
  }

  private _renderRows(fromRowIdx: number): void {
    if (this._rowHeight <= 0) return;
    const maxVisible = Math.ceil(this._logContainer.clientHeight / this._rowHeight) + 2 * BUFFER_ROWS;
    const start = Math.max(0, fromRowIdx - BUFFER_ROWS);
    const end = Math.min(this._filteredIndices.length, start + maxVisible);

    let rendered = 0;
    for (let fi = start; fi < end; fi++) {
      const el = this._getOrCreateRow(rendered);
      const row = this._allRows[this._filteredIndices[fi]];
      const rec = row.rec;
      el.style.top = `${this._getRowTop(fi)}px`;
      el.style.display = '';

      const lvl = rec.level;
      const isExpanded = fi === this._expandedFi;
      el.className = `log-row level-${lvl}${fi % 2 === 0 ? ' even' : ''}${isExpanded ? ' expanded' : ''}`;

      const cellRow = el.children[0] as HTMLDivElement;
      const detailWrap = el.children[1] as HTMLDivElement;
      const detail = detailWrap.querySelector('.log-row-detail') as HTMLPreElement;
      const note = detailWrap.querySelector('.log-row-detail-note') as HTMLDivElement;

      const cells = cellRow.children;
      const values = [
        lvl,
        this._formatTime(rec.time),
        idCell(rec.user_id),
        idCell(rec.task_id),
        idCell(rec.job_id),
        rec.src ?? '',
        row.cell,
      ];
      for (let c = 0; c < COL_COUNT; c++) {
        const cell = cells[c] as HTMLSpanElement;
        cell.textContent = values[c];
        cell.className =
          c === 0
            ? `log-cell level-${lvl}`
            : c === 1
              ? 'log-cell col-time'
              : c === 5
                ? 'log-cell col-tag'
                : c === COL_COUNT - 1
                  ? 'log-cell col-data'
                  : 'log-cell';
      }

      // the detail is rebuilt only when the row it shows changes, as it may hold 16 KiB of text
      const shownBefore = this._poolRows[rendered];
      this._poolRows[rendered] = row;
      if (isExpanded) {
        if (shownBefore !== row || detail.childNodes.length === 0) {
          detail.replaceChildren(highlight(rec.data, DETAIL_MAX_CHARS));
          const cut = rec.partial || rec.data.length > DETAIL_MAX_CHARS;
          note.textContent = cut
            ? `Showing the start of this ${gc.sdk.humanSize(rec.end - rec.start)} record. Copy or download it whole.`
            : '';
          note.style.display = cut ? '' : 'none';
        }
        detailWrap.style.display = '';
        el.style.height = '';
      } else {
        detailWrap.style.display = 'none';
        detail.replaceChildren();
        el.style.height = `${this._rowHeight}px`;
      }

      // Only the summary line toggles, so the detail stays open while its text is selected.
      cellRow.onclick = () => {
        // a drag that selects text ends with a click, which must not toggle the row
        if (!(getSelection()?.isCollapsed ?? true)) return;
        this._expandedRow = this._expandedRow === row ? null : row;
        this._expandedExtraHeight = 0;
        this._rebuildFilteredIndices();
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
      this._poolRows[i] = null;
    }
  }

  private _findExpandedRow(): HTMLDivElement | null {
    for (const row of this._rowPool) {
      if (row.style.display !== 'none' && row.classList.contains('expanded')) return row;
    }
    return null;
  }

  /** The whole `data` of the record shown by the `idx`-th element of the pool. */
  private async _fullData(idx: number): Promise<{ rec: gc.sdk.LogRecordRef; data: string } | null> {
    const row = this._poolRows[idx];
    if (!row) return null;
    return { rec: row.rec, data: await this._reader.fullData(row.rec) };
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
    const note = document.createElement('div');
    note.className = 'log-row-detail-note';
    note.style.display = 'none';

    const copyBtn = document.createElement('button');
    copyBtn.className = 'detail-btn';
    copyBtn.title = 'Copy the whole record to the clipboard';
    copyBtn.textContent = 'Copy';
    copyBtn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const full = await this._fullData(idx);
      if (full === null) return;
      await navigator.clipboard.writeText(full.data);
      copyBtn.textContent = 'Copied';
      setTimeout(() => {
        copyBtn.textContent = 'Copy';
      }, 1500);
    });

    const downloadBtn = document.createElement('button');
    downloadBtn.className = 'detail-btn';
    downloadBtn.title = 'Download the whole record';
    downloadBtn.textContent = 'Download';
    downloadBtn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const full = await this._fullData(idx);
      if (full === null) return;
      const url = URL.createObjectURL(new Blob([full.data], { type: 'text/plain;charset=utf-8' }));
      const a = document.createElement('a');
      a.href = url;
      a.download = `log-${full.rec.task_id ?? 'server'}-${full.rec.start}.txt`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    });

    const actions = document.createElement('div');
    actions.className = 'detail-actions';
    actions.append(copyBtn, downloadBtn);
    detailWrap.append(actions, detail, note);
    row.appendChild(detailWrap);
    this._rowPool.push(row);
    this._poolRows.push(null);
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
          void this._setTextFilter('');
        }}
        oninput={() => {
          clearTimeout(this._debounceTimer);
          this._debounceTimer = setTimeout(() => {
            void this._setTextFilter((this._searchInput as unknown as { value: string }).value);
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
            this._onFilterChanged();
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
              this._sortIndicators[j].textContent = j === this._sortColumn ? (this._sortAsc ? '▲' : '▼') : '';
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

    this._emptyState = (<div className="log-empty-state">No matching logs.</div>) as HTMLDivElement;
    this._emptyState.style.display = 'none';

    this._moreText = (<span />) as HTMLSpanElement;
    this._moreEl = (
      <div className="log-more">
        {this._moreText}
        <button className="detail-btn" onclick={() => void this._fill(true)}>
          Read older records
        </button>
      </div>
    ) as HTMLDivElement;
    this._moreEl.style.display = 'none';

    this._viewport = (<div className="log-viewport" />) as HTMLDivElement;
    this._scroller = (
      <div style="visibility:hidden;width:100%;pointer-events:none;position:absolute;top:0;left:0;" />
    ) as HTMLDivElement;
    this._viewport.append(this._scroller, this._moreEl);

    this._logContainer = (
      <div className="log-container">
        {this._headerRow}
        {this._viewport}
        {this._emptyState}
      </div>
    ) as HTMLDivElement;

    this._logContainer.addEventListener('scroll', () => {
      const fromRowIdx = this._rowHeight > 0 ? this._fiFromScrollTop(this._logContainer.scrollTop) : 0;
      if (this._needsOlderRows()) {
        void this._fill();
      }
      if (this._loadTailOffset < this._totalFileSize && fromRowIdx <= BUFFER_ROWS * 2) {
        void this._loadNextChunk();
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
        const row = this._allRows[this._filteredIndices[fi]];
        if (row) {
          this._scrubberBar.title = `${this._formatTime(row.rec.time)}\nRow ${fi + 1} / ${this._filteredIndices.length}\nFile: ${filePct}%`;
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
