import '~/common';
import './index.css';

const greycat = await gc.sdk.init({ debug: true });

// --- Types ---
const LOG_LEVELS = ['error', 'warn', 'info', 'perf', 'trace'] as const;

const HEADERS = ['Level', 'Time', 'Type', 'User', 'Task/Req', 'Tag', 'Data'] as const;
const COL_COUNT = HEADERS.length;

// --- State ---
const allRows: string[][] = []; // each row is an array of raw string values
let filteredIndices: number[] = [];
let isLoading = false;
// true only when the entire file is covered: head=0 AND tail=totalFileSize
function isFullyLoaded(): boolean {
  return loadHeadOffset <= 0 && loadTailOffset >= totalFileSize;
}

// Loading state — loaded range is loadHeadOffset..loadTailOffset within the file
let totalFileSize = 0;
let loadHeadOffset = 0; // oldest loaded byte (decreases as we load backwards)
let loadTailOffset = 0; // newest loaded byte (usually totalFileSize, but changes on jump)
let leadingPartialLine = ''; // partial first line from the previously loaded chunk

const levelFilter = new Set<string>(LOG_LEVELS);
let textFilter = '';
let sortColumn = -1;
let sortAsc = true;

let rowHeight = 0;
let prevFromRowIdx = -1;

// Inline expand state (one row at a time)
let expandedFi = -1;
let expandedExtraHeight = 0;

const CHUNK_SIZE = 64 * 1024;
const BUFFER_ROWS = 5;

// --- Time formatting via GreyCat WASM ---
function formatTime(raw: string): string {
  if (!raw) return '';
  const n = Number(raw);
  if (isNaN(n)) return raw;
  try {
    const t = gc.core.time.create(n);
    return greycat.printTime(t);
  } catch {
    return raw;
  }
}

function levelName(raw: string): string {
  return raw || '';
}

// --- Syntax highlighting helpers ---
function span(cls: string, text: string): HTMLSpanElement {
  const el = document.createElement('span');
  el.className = cls;
  el.textContent = text;
  return el;
}

function highlightJSON(obj: unknown, depth: number, frag: DocumentFragment): void {
  const indent = '  '.repeat(depth);
  const indent1 = '  '.repeat(depth + 1);
  if (obj === null) {
    frag.appendChild(span('tok-null', 'null'));
  } else if (typeof obj === 'boolean') {
    frag.appendChild(span('tok-bool', String(obj)));
  } else if (typeof obj === 'number') {
    frag.appendChild(span('tok-num', String(obj)));
  } else if (typeof obj === 'string') {
    frag.appendChild(span('tok-str', `"${obj}"`));
  } else if (Array.isArray(obj)) {
    frag.appendChild(span('tok-brace', '['));
    if (obj.length === 0) {
      frag.appendChild(span('tok-brace', ']'));
    } else {
      frag.appendChild(document.createTextNode('\n'));
      for (let i = 0; i < obj.length; i++) {
        frag.appendChild(document.createTextNode(indent1));
        highlightJSON(obj[i], depth + 1, frag);
        if (i < obj.length - 1) frag.appendChild(span('tok-brace', ','));
        frag.appendChild(document.createTextNode('\n'));
      }
      frag.appendChild(document.createTextNode(indent));
      frag.appendChild(span('tok-brace', ']'));
    }
  } else if (typeof obj === 'object') {
    const keys = Object.keys(obj as Record<string, unknown>);
    frag.appendChild(span('tok-brace', '{'));
    if (keys.length === 0) {
      frag.appendChild(span('tok-brace', '}'));
    } else {
      frag.appendChild(document.createTextNode('\n'));
      for (let i = 0; i < keys.length; i++) {
        frag.appendChild(document.createTextNode(indent1));
        frag.appendChild(span('tok-key', `"${keys[i]}"`));
        frag.appendChild(span('tok-brace', ': '));
        highlightJSON((obj as Record<string, unknown>)[keys[i]], depth + 1, frag);
        if (i < keys.length - 1) frag.appendChild(span('tok-brace', ','));
        frag.appendChild(document.createTextNode('\n'));
      }
      frag.appendChild(document.createTextNode(indent));
      frag.appendChild(span('tok-brace', '}'));
    }
  }
}

function highlightGreyCat(raw: string): DocumentFragment {
  const frag = document.createDocumentFragment();
  let depth = 0;
  let i = 0;
  const len = raw.length;

  while (i < len) {
    const ch = raw[i];
    if (ch === '{' || ch === '[') {
      frag.appendChild(span('tok-brace', ch));
      depth++;
      frag.appendChild(document.createTextNode('\n' + '  '.repeat(depth)));
      i++;
    } else if (ch === '}' || ch === ']') {
      depth = Math.max(0, depth - 1);
      frag.appendChild(document.createTextNode('\n' + '  '.repeat(depth)));
      frag.appendChild(span('tok-brace', ch));
      i++;
    } else if (ch === ',') {
      frag.appendChild(span('tok-brace', ','));
      frag.appendChild(document.createTextNode('\n' + '  '.repeat(depth)));
      i++;
    } else if (ch === '"') {
      let end = i + 1;
      while (end < len && raw[end] !== '"') {
        if (raw[end] === '\\') end++;
        end++;
      }
      end++;
      frag.appendChild(span('tok-str', raw.substring(i, end)));
      i = end;
    } else if (ch === ':') {
      frag.appendChild(span('tok-brace', ':'));
      i++;
    } else if (ch === '-' || (ch >= '0' && ch <= '9')) {
      let end = i + 1;
      while (end < len && /[\d.eE+-]/.test(raw[end])) end++;
      frag.appendChild(span('tok-num', raw.substring(i, end)));
      i = end;
    } else if (raw.substring(i, i + 4) === 'null') {
      frag.appendChild(span('tok-null', 'null'));
      i += 4;
    } else if (raw.substring(i, i + 4) === 'true') {
      frag.appendChild(span('tok-bool', 'true'));
      i += 4;
    } else if (raw.substring(i, i + 5) === 'false') {
      frag.appendChild(span('tok-bool', 'false'));
      i += 5;
    } else if (/[A-Z]/.test(ch)) {
      let end = i + 1;
      while (end < len && raw[end] !== '{' && raw[end] !== ',' && raw[end] !== '}' && raw[end] !== ']') {
        end++;
      }
      frag.appendChild(span('tok-type', raw.substring(i, end)));
      i = end;
    } else if (/[a-z_]/.test(ch)) {
      let end = i + 1;
      while (end < len && /[a-zA-Z0-9_]/.test(raw[end])) end++;
      frag.appendChild(span('tok-key', raw.substring(i, end)));
      i = end;
    } else {
      frag.appendChild(document.createTextNode(ch));
      i++;
    }
  }
  return frag;
}

function formatDataToDOM(raw: string): DocumentFragment {
  const frag = document.createDocumentFragment();
  if (!raw) return frag;
  try {
    const parsed = JSON.parse(raw);
    highlightJSON(parsed, 0, frag);
    return frag;
  } catch {
    if (raw.includes('{') || raw.includes('[')) {
      return highlightGreyCat(raw);
    }
    frag.appendChild(document.createTextNode(raw));
    return frag;
  }
}

// --- CSV Parsing ---
const SIMPLE_COLS = COL_COUNT - 1; // 6 simple columns before Data

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
  // remainder is Data column; skip leading comma (empty context separator)
  let remainder = start < line.length ? line.substring(start) : '';
  if (remainder.startsWith(',')) {
    remainder = remainder.substring(1);
  }
  cols.push(remainder);
  while (cols.length < COL_COUNT) cols.push('');
  return cols;
}

// --- Backward Chunk Loading ---
async function discoverFileSize(): Promise<number> {
  // GET without offset/max, read Content-Length header, cancel body
  const res = await greycat.getFileResponse('1/log.csv');
  const cl = res.headers.get('content-length');
  const size = cl ? parseInt(cl, 10) : 0;
  if (size > 0) {
    // cancel the body to avoid downloading the whole file
    await res.body?.cancel();
    return size;
  }
  // fallback: read entire body and measure
  const text = await res.text();
  return new TextEncoder().encode(text).length;
}

async function loadPreviousChunk(): Promise<boolean> {
  if (isLoading || loadHeadOffset <= 0) return false;
  isLoading = true;
  try {
    const chunkStart = Math.max(0, loadHeadOffset - CHUNK_SIZE);
    const chunkSize = loadHeadOffset - chunkStart;
    const text = (await greycat.getFile('1/log.csv', chunkStart, chunkSize)) as string;

    if (typeof text !== 'string' || text.length === 0) {
      loadHeadOffset = 0;
      // reached edge
      return false;
    }

    // Append the leading partial from the more recent (previously loaded) chunk
    const fullText = text + leadingPartialLine;
    const lines = fullText.split('\n');

    // If not at file start, first line might be partial
    if (chunkStart > 0) {
      leadingPartialLine = lines.shift() ?? '';
    } else {
      leadingPartialLine = '';
    }

    // Parse complete lines
    const newRows: string[][] = [];
    for (const line of lines) {
      if (line.length === 0) continue;
      newRows.push(parseLine(line));
    }

    // Prepend older rows to the beginning
    allRows.splice(0, 0, ...newRows);

    loadHeadOffset = chunkStart;
    if (chunkStart === 0) {
      // reached edge
      // flush any remaining leading partial
      if (leadingPartialLine.length > 0) {
        allRows.splice(0, 0, parseLine(leadingPartialLine));
        leadingPartialLine = '';
      }
    }

    // Adjust expandedFi since rows were prepended
    if (expandedFi >= 0) {
      expandedFi += newRows.length;
    }

    rebuildFilteredIndices();
    updateStatus();

    prevFromRowIdx = -1;
    renderVisible();
    return true;
  } finally {
    isLoading = false;
  }
}

// Forward loading: load newer data (when loadTailOffset < totalFileSize, after a jump)
let trailingPartialLine = '';

async function loadNextChunk(): Promise<boolean> {
  if (isLoading || loadTailOffset >= totalFileSize) return false;
  isLoading = true;
  try {
    const chunkSize = Math.min(CHUNK_SIZE, totalFileSize - loadTailOffset);
    const text = (await greycat.getFile('1/log.csv', loadTailOffset, chunkSize)) as string;

    if (typeof text !== 'string' || text.length === 0) {
      loadTailOffset = totalFileSize;
      return false;
    }

    const fullText = trailingPartialLine + text;
    const lines = fullText.split('\n');

    // Last line might be partial if not at end of file
    const bytesRead = new TextEncoder().encode(text).length;
    if (loadTailOffset + bytesRead < totalFileSize) {
      trailingPartialLine = lines.pop() ?? '';
    } else {
      trailingPartialLine = '';
    }

    const newRows: string[][] = [];
    for (const line of lines) {
      if (line.length === 0) continue;
      newRows.push(parseLine(line));
    }

    // Append newer rows at the end (they come after current data chronologically)
    // In reversed display, these appear BEFORE (above) current rows
    allRows.push(...newRows);

    loadTailOffset += bytesRead;

    rebuildFilteredIndices();
    updateStatus();
    prevFromRowIdx = -1;
    renderVisible();
    return true;
  } finally {
    isLoading = false;
  }
}

// --- Filtering ---
function rebuildFilteredIndices(): void {
  filteredIndices = [];
  const lower = textFilter.toLowerCase();
  for (let i = 0; i < allRows.length; i++) {
    const row = allRows[i];
    if (!levelFilter.has(row[0])) continue;
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
    filteredIndices.push(i);
  }
  if (sortColumn >= 0) {
    applySortToFiltered();
  } else {
    // default: newest first (reverse chronological)
    filteredIndices.reverse();
  }
}

function applySortToFiltered(): void {
  const col = sortColumn;
  filteredIndices.sort((a, b) => {
    const va = allRows[a][col] ?? '';
    const vb = allRows[b][col] ?? '';
    if (col <= 3) {
      const na = Number(va);
      const nb = Number(vb);
      if (!isNaN(na) && !isNaN(nb)) {
        return sortAsc ? na - nb : nb - na;
      }
    }
    const cmp = va.localeCompare(vb);
    return sortAsc ? cmp : -cmp;
  });
}

// --- DOM ---
const statusEl = (<span className="log-status">Loading...</span>) as HTMLSpanElement;

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

function updateStatus(): void {
  const loadedBytes = loadTailOffset - loadHeadOffset;
  const status = isFullyLoaded() ? 'all loaded' : `${formatBytes(loadedBytes)} / ${formatBytes(totalFileSize)}`;
  statusEl.textContent = `${filteredIndices.length} / ~${estimatedTotalRows()} rows (${status})`;
}

let debounceTimer: ReturnType<typeof setTimeout>;
const searchInput = (
  <sl-input
    placeholder="Search logs..."
    size="small"
    clearable
    onsl-clear={() => {
      clearTimeout(debounceTimer);
      textFilter = '';
      rebuildFilteredIndices();
      expandedFi = -1;
      expandedExtraHeight = 0;
      prevFromRowIdx = -1;
      updateStatus();
      renderVisible();
    }}
    oninput={() => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        textFilter = (searchInput as unknown as { value: string }).value;
        rebuildFilteredIndices();
        expandedFi = -1;
        expandedExtraHeight = 0;
        prevFromRowIdx = -1;
        updateStatus();
        renderVisible();
      }, 200);
    }}
  />
) as HTMLElement;

const levelBtns = LOG_LEVELS.map((name) => {
  const btn = (
    <button
      className={['level-btn', name, 'active']}
      onclick={() => {
        if (levelFilter.has(name)) {
          levelFilter.delete(name);
          btn.classList.remove('active');
        } else {
          levelFilter.add(name);
          btn.classList.add('active');
        }
        rebuildFilteredIndices();
        expandedFi = -1;
        expandedExtraHeight = 0;
        prevFromRowIdx = -1;
        updateStatus();
        renderVisible();
      }}
    >
      {name}
    </button>
  ) as HTMLButtonElement;
  return btn;
});

const sortIndicators: HTMLSpanElement[] = [];

function updateSortIndicators(): void {
  for (let i = 0; i < sortIndicators.length; i++) {
    sortIndicators[i].textContent = i === sortColumn ? (sortAsc ? '\u25B2' : '\u25BC') : '';
  }
}

const headerRow = (<div className="log-header" />) as HTMLDivElement;
for (let i = 0; i < HEADERS.length; i++) {
  const indicator = (<span className="sort-indicator" />) as HTMLSpanElement;
  sortIndicators.push(indicator);
  const colIdx = i;
  const cell = (
    <div
      className="log-header-cell"
      onclick={() => {
        if (sortColumn === colIdx) {
          sortAsc = !sortAsc;
        } else {
          sortColumn = colIdx;
          sortAsc = true;
        }
        updateSortIndicators();
        rebuildFilteredIndices();
        prevFromRowIdx = -1;
        renderVisible();
      }}
    >
      {HEADERS[i]}
      {indicator}
    </div>
  ) as HTMLDivElement;
  headerRow.appendChild(cell);
}

// Empty state disclaimer
const emptyState = (<div className="log-empty-state">No matching logs in the loaded portion of the file. Try scrolling or clicking the scrubber to load more data.</div>) as HTMLDivElement;

// Virtual scroll viewport
const viewport = (<div className="log-viewport" />) as HTMLDivElement;
const scroller = (<div style="visibility:hidden;width:100%;pointer-events:none;position:absolute;top:0;left:0;" />) as HTMLDivElement;
viewport.appendChild(scroller);

const rowPool: HTMLDivElement[] = [];

function getOrCreateRow(idx: number): HTMLDivElement {
  if (idx < rowPool.length) return rowPool[idx];
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
  // detail wrapper: pre + copy button
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
    e.stopPropagation(); // don't toggle row expand
    const text = detail.textContent ?? '';
    navigator.clipboard.writeText(text).then(() => {
      copyBtn.textContent = 'Copied!';
      setTimeout(() => { copyBtn.textContent = 'Copy'; }, 1500);
    });
  });
  detailWrap.appendChild(copyBtn);
  detailWrap.appendChild(detail);
  row.appendChild(detailWrap);
  rowPool.push(row);
  viewport.appendChild(row);
  return row;
}

// --- Scroll position helpers ---
// When loaded data is in the middle of the file, we estimate the total row count
// and offset loaded rows so they sit at the correct position in the virtual space.
// In reversed display: top = newest (end of file), bottom = oldest (start of file).
// Space above loaded rows = unloaded newer data (totalFileSize - loadTailOffset).
// Space below loaded rows = unloaded older data (loadHeadOffset - 0).

function estimatedTotalRows(): number {
  const loadedBytes = loadTailOffset - loadHeadOffset;
  if (loadedBytes <= 0 || filteredIndices.length === 0) return filteredIndices.length;
  return Math.ceil((totalFileSize / loadedBytes) * filteredIndices.length);
}

function rowsAboveOffset(): number {
  // Estimate how many rows exist above (newer than) our loaded range
  const loadedBytes = loadTailOffset - loadHeadOffset;
  if (loadedBytes <= 0 || totalFileSize <= 0) return 0;
  const bytesAbove = totalFileSize - loadTailOffset;
  return Math.round((bytesAbove / loadedBytes) * filteredIndices.length);
}

function getTotalHeight(): number {
  return estimatedTotalRows() * rowHeight + expandedExtraHeight;
}

function getRowTop(fi: number): number {
  const offset = rowsAboveOffset();
  const base = (offset + fi) * rowHeight;
  if (expandedFi < 0 || fi <= expandedFi) return base;
  return base + expandedExtraHeight;
}

function fiFromScrollTop(st: number): number {
  const offset = rowsAboveOffset();
  const adjusted = st - offset * rowHeight;
  if (adjusted < 0) return 0;
  if (expandedFi < 0) return Math.floor(adjusted / rowHeight);
  const expandedTop = expandedFi * rowHeight;
  if (adjusted <= expandedTop) return Math.floor(adjusted / rowHeight);
  const expandedBottom = expandedTop + rowHeight + expandedExtraHeight;
  if (adjusted < expandedBottom) return expandedFi;
  return Math.floor((adjusted - expandedExtraHeight) / rowHeight);
}

// --- File scrubber (minimap bar) ---
// Represents the entire file. Top = newest (end of file), bottom = oldest (start of file).
// Loaded region is highlighted. Thumb shows current viewport position.
const scrubberThumb = (<div className="scrubber-thumb" />) as HTMLDivElement;
const scrubberLoaded = (<div className="scrubber-loaded" />) as HTMLDivElement;
const scrubberBar = (
  <div className="file-scrubber">
    {scrubberLoaded}
    {scrubberThumb}
  </div>
) as HTMLDivElement;

function updateScrubber(): void {
  if (totalFileSize <= 0 || rowHeight <= 0) return;
  const barHeight = scrubberBar.clientHeight;
  if (barHeight <= 0) return;

  // Loaded range: loadHeadOffset..loadTailOffset (reversed: top = newest = end of file)
  const loadedStart = 1 - loadTailOffset / totalFileSize; // top edge (newest end)
  const loadedEnd = 1 - loadHeadOffset / totalFileSize;   // bottom edge (oldest end)
  scrubberLoaded.style.top = `${loadedStart * 100}%`;
  scrubberLoaded.style.height = `${(loadedEnd - loadedStart) * 100}%`;
  const loadedFraction = loadedEnd - loadedStart;

  // Thumb: viewport position within the full file
  // Current viewport maps to a range within loaded rows
  const totalRows = filteredIndices.length;
  if (totalRows <= 0) return;

  const fromRowIdx = fiFromScrollTop(logContainer.scrollTop);
  const visibleRows = Math.ceil(logContainer.clientHeight / rowHeight);

  // Map viewport rows to position within the loaded region on the scrubber
  const thumbTopInLoaded = fromRowIdx / totalRows;
  const thumbHeightInLoaded = Math.max(0.02, visibleRows / totalRows);

  const thumbTop = loadedStart + thumbTopInLoaded * loadedFraction;
  const thumbHeight = thumbHeightInLoaded * loadedFraction;

  scrubberThumb.style.top = `${thumbTop * 100}%`;
  scrubberThumb.style.height = `${thumbHeight * 100}%`;
}

// Scrubber helpers
function ratioFromClientY(clientY: number): number {
  const rect = scrubberBar.getBoundingClientRect();
  return Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
}

function scrollToRatio(ratio: number): void {
  // Clamp to loaded range
  const loadedStart = totalFileSize > 0 ? 1 - loadTailOffset / totalFileSize : 0;
  const loadedEnd = totalFileSize > 0 ? 1 - loadHeadOffset / totalFileSize : 1;
  const loadedFraction = loadedEnd - loadedStart;
  const clampedRatio = Math.max(loadedStart, Math.min(ratio, loadedEnd));

  const totalRows = filteredIndices.length;
  if (totalRows <= 0 || loadedFraction <= 0) return;

  // Map clamped ratio to a row index within loaded data
  const posInLoaded = (clampedRatio - loadedStart) / loadedFraction; // 0..1 within loaded rows
  const targetFi = Math.floor(posInLoaded * totalRows);
  const scrollTo = getRowTop(Math.max(0, Math.min(totalRows - 1, targetFi)));
  logContainer.scrollTop = scrollTo;
}

// Jump to unloaded area: clear current data, load a chunk at the target position
async function jumpToOffset(targetByteOffset: number): Promise<void> {
  // Reset all state
  allRows.length = 0;
  filteredIndices = [];
  expandedFi = -1;
  expandedExtraHeight = 0;
  leadingPartialLine = '';
  trailingPartialLine = '';
  // reset for new position

  // Position loadHeadOffset so the next loadPreviousChunk loads around the target
  // Load one chunk centered on the target: from target to target + CHUNK_SIZE
  loadHeadOffset = Math.min(totalFileSize, Math.floor(targetByteOffset) + CHUNK_SIZE);
  loadTailOffset = loadHeadOffset;

  await loadPreviousChunk();

  // If we're at the very start of the file, mark fully loaded backwards
  if (loadHeadOffset <= 0) {
    // reached start of file
  }

  // Scroll to the start of the loaded region (accounting for virtual offset above)
  logContainer.scrollTop = getRowTop(0);
}

// Tooltip on hover
scrubberBar.addEventListener('mousemove', (e) => {
  if (scrubberDragging) return;
  const ratio = ratioFromClientY(e.clientY);
  const targetByteOffset = totalFileSize * (1 - ratio);
  const loadedBytes = loadTailOffset - loadHeadOffset;
  const filePct = Math.round((1 - ratio) * 100);

  if (loadedBytes > 0 && targetByteOffset >= loadHeadOffset && targetByteOffset <= loadTailOffset) {
    const posInLoaded = (loadTailOffset - targetByteOffset) / loadedBytes;
    const fi = Math.min(filteredIndices.length - 1, Math.max(0, Math.floor(posInLoaded * filteredIndices.length)));
    const entry = allRows[filteredIndices[fi]];
    if (entry) {
      const time = formatTime(entry[1]);
      scrubberBar.title = `${time}\nRow ${fi + 1} / ${filteredIndices.length}\nFile: ${filePct}%`;
    }
  } else {
    scrubberBar.title = `Not loaded yet\nFile: ${filePct}%\nClick to load`;
  }
});

// Drag: clamp to loaded range only (no async loading)
// Click (mousedown+mouseup without move): allow jump to unloaded area
let scrubberDragging = false;
let scrubberMoved = false;
let scrubberDownY = 0;

scrubberBar.addEventListener('mousedown', (e) => {
  scrubberDragging = true;
  scrubberMoved = false;
  scrubberDownY = e.clientY;
  scrollToRatio(ratioFromClientY(e.clientY));
  e.preventDefault();
});

window.addEventListener('mousemove', (e) => {
  if (!scrubberDragging) return;
  if (Math.abs(e.clientY - scrubberDownY) > 3) {
    scrubberMoved = true;
  }
  scrollToRatio(ratioFromClientY(e.clientY));
  e.preventDefault();
});

window.addEventListener('mouseup', (e) => {
  if (!scrubberDragging) return;
  scrubberDragging = false;

  // If it was a click (not a drag), allow jumping to unloaded area
  if (!scrubberMoved) {
    const ratio = ratioFromClientY(e.clientY);
    const targetByteOffset = totalFileSize * (1 - ratio);
    if ((targetByteOffset < loadHeadOffset || targetByteOffset > loadTailOffset) && !isFullyLoaded()) {
      jumpToOffset(targetByteOffset);
    }
  }
});

// Scroll container
const logContainer = (
  <div className="log-container">
    {headerRow}
    {viewport}
    {emptyState}
  </div>
) as HTMLDivElement;

logContainer.addEventListener('scroll', () => {
  const fromRowIdx = rowHeight > 0 ? fiFromScrollTop(logContainer.scrollTop) : 0;
  // Load older entries when scrolling DOWN near the bottom of loaded data
  if (loadHeadOffset > 0 && filteredIndices.length > 0) {
    const visibleEnd = fromRowIdx + Math.ceil(logContainer.clientHeight / (rowHeight || 30));
    if (visibleEnd >= filteredIndices.length - BUFFER_ROWS * 2) {
      loadPreviousChunk();
    }
  }
  // Load newer entries when scrolling UP into the empty space above loaded data
  if (loadTailOffset < totalFileSize && filteredIndices.length > 0) {
    if (fromRowIdx <= BUFFER_ROWS * 2) {
      loadNextChunk();
    }
  }
  if (fromRowIdx !== prevFromRowIdx) {
    prevFromRowIdx = fromRowIdx;
    renderRows(fromRowIdx);
  }
  updateScrubber();
});

function renderVisible(): void {
  scroller.style.height = `${getTotalHeight()}px`;
  const fromRowIdx = rowHeight > 0 ? fiFromScrollTop(logContainer.scrollTop) : 0;
  renderRows(fromRowIdx);
  updateScrubber();
  // Show empty state only when filters yield nothing and file isn't fully loaded
  emptyState.style.display = filteredIndices.length === 0 && !isFullyLoaded() ? '' : 'none';
}

function renderRows(fromRowIdx: number): void {
  if (rowHeight <= 0) return;
  const maxVisible = Math.ceil(logContainer.clientHeight / rowHeight) + 2 * BUFFER_ROWS;
  const start = Math.max(0, fromRowIdx - BUFFER_ROWS);
  const end = Math.min(filteredIndices.length, start + maxVisible);

  let rendered = 0;
  for (let fi = start; fi < end; fi++) {
    const row = getOrCreateRow(rendered);
    const entry = allRows[filteredIndices[fi]];
    const top = getRowTop(fi);
    row.style.top = `${top}px`;
    row.style.display = '';

    const lvl = levelName(entry[0]);
    const isExpanded = fi === expandedFi;
    row.className = `log-row level-${lvl}${fi % 2 === 0 ? ' even' : ''}${isExpanded ? ' expanded' : ''}`;

    const cellRow = row.children[0] as HTMLDivElement;
    const detailWrap = row.children[1] as HTMLDivElement;
    const detail = detailWrap.querySelector('.log-row-detail') as HTMLPreElement;

    const cells = cellRow.children;
    const levelCell = cells[0] as HTMLSpanElement;
    levelCell.textContent = lvl;
    levelCell.className = `log-cell level-${lvl}`;
    const timeCell = cells[1] as HTMLSpanElement;
    timeCell.textContent = formatTime(entry[1]);
    timeCell.className = 'log-cell col-time';
    for (let c = 2; c < COL_COUNT; c++) {
      const cell = cells[c] as HTMLSpanElement;
      cell.textContent = entry[c] || '';
      cell.className = c === 5 ? 'log-cell col-tag' : c === COL_COUNT - 1 ? 'log-cell col-data' : 'log-cell';
    }

    if (isExpanded) {
      const data = entry[COL_COUNT - 1];
      detail.innerHTML = '';
      detail.appendChild(formatDataToDOM(data));
      detailWrap.style.display = '';
      row.style.height = '';
    } else {
      detailWrap.style.display = 'none';
      detail.innerHTML = '';
      row.style.height = `${rowHeight}px`;
    }

    const capturedFi = fi;
    row.onclick = () => {
      if (expandedFi === capturedFi) {
        expandedFi = -1;
        expandedExtraHeight = 0;
      } else {
        expandedFi = capturedFi;
        expandedExtraHeight = 0;
      }
      prevFromRowIdx = -1;
      renderVisible();
      if (expandedFi >= 0) {
        requestAnimationFrame(() => {
          const expRow = findRenderedRow();
          if (expRow) {
            const extra = expRow.offsetHeight - rowHeight;
            if (extra !== expandedExtraHeight) {
              expandedExtraHeight = Math.max(0, extra);
              scroller.style.height = `${getTotalHeight()}px`;
              prevFromRowIdx = -1;
              renderRows(fiFromScrollTop(logContainer.scrollTop));
            }
          }
        });
      }
    };
    rendered++;
  }

  for (let i = rendered; i < rowPool.length; i++) {
    rowPool[i].style.display = 'none';
  }
}

function findRenderedRow(): HTMLDivElement | null {
  for (const row of rowPool) {
    if (row.style.display !== 'none' && row.classList.contains('expanded')) return row;
  }
  return null;
}

// --- Compute row height ---
function computeRowHeight(): void {
  const tmp = getOrCreateRow(0);
  tmp.style.position = 'relative';
  tmp.style.visibility = 'hidden';
  const cellRow = tmp.children[0] as HTMLDivElement;
  const cells = cellRow.children;
  (cells[0] as HTMLSpanElement).textContent = 'info';
  (cells[1] as HTMLSpanElement).textContent = '2025-01-09T10:41:47.000+00:00';
  viewport.appendChild(tmp);
  rowHeight = tmp.offsetHeight || 24;
  tmp.style.position = '';
  tmp.style.visibility = '';
  tmp.style.display = 'none';
}

// --- Mount & Init ---
const wrapper = (
  <div className="log-wrapper">
    <div className="log-toolbar">
      {searchInput}
      <div className="log-levels">{...levelBtns}</div>
      {statusEl}
    </div>
    <div className="log-content">
      {logContainer}
      {scrubberBar}
    </div>
  </div>
) as HTMLDivElement;

document.body.appendChild(
  <app-layout title="Logs">
    {wrapper}
  </app-layout>,
);

computeRowHeight();

new ResizeObserver(() => {
  prevFromRowIdx = -1;
  renderVisible();
}).observe(logContainer);

// --- Init: discover file size, load from the end ---
totalFileSize = await discoverFileSize();
loadHeadOffset = totalFileSize;
loadTailOffset = totalFileSize;

// Load the last chunk (newest entries) — displayed at the top
await loadPreviousChunk();
