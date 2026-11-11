import type { GreyCat } from './greycat.js';

/** What a {@link LogStreamReader} needs from a {@link GreyCat} instance. */
export type LogFileSource = Pick<GreyCat, 'getFileResponse'>;

/**
 * One line of a log file, as read by a {@link LogStreamReader}.
 *
 * A line of the GreyCat log stream is a `runtime::Log` written as JSON. A line that is not one is
 * kept with `unparsed` set, its text in `data`, so that nothing in the file is ever hidden.
 */
export interface LogRecordRef {
  /** Byte offset of the first byte of the line. */
  start: number;
  /** Byte offset past the last byte of the line, its `\n` excluded. */
  end: number;
  /** `''` when the line is not a log record. */
  level: string;
  /** Epoch microseconds, `null` when the line has no readable time. */
  time: number | null;
  user_id: number | null;
  task_id: number | null;
  job_id: number | null;
  src: string | null;
  /**
   * The record's `data`: the string itself when it is one, its JSON otherwise. Only its head
   * when `partial` is set.
   */
  data: string;
  /** Set when the record is larger than `maxRecordBytes` and `data` holds only its head. */
  partial: boolean;
  /** Set when the line is not a log record, `data` then holds the line itself. */
  unparsed: boolean;
}

/** The records read by one call of a {@link LogStreamReader}, in file order. */
export interface LogPage {
  records: LogRecordRef[];
  /** Byte offset of the first byte read into a record, a line boundary. */
  start: number;
  /** Byte offset past the last record read, a line boundary. */
  end: number;
}

export interface LogStreamReaderOptions {
  /** Bytes requested per read. Defaults to 256 KiB. */
  chunkBytes?: number;
  /**
   * Records up to this size are read whole. A larger one is held as its first `headBytes` only,
   * whatever its size, see {@link LogRecordRef.partial}. Defaults to 1 MiB.
   */
  maxRecordBytes?: number;
  /**
   * Bytes kept of a record larger than `maxRecordBytes`, at least 512 so they hold its metadata.
   * Defaults to 64 KiB.
   */
  headBytes?: number;
}

/** `\n` never occurs inside a multi-byte UTF-8 sequence, so lines are split on it as bytes. */
const EOL = 0x0a;
const EMPTY = new Uint8Array(0);
const decoder = new TextDecoder();

/**
 * The fields of a `runtime::Log` in the order the runtime writes them, which is their order in
 * the type. It lets the metadata of a record be read from its first bytes alone.
 */
const LOG_PREFIX =
  /^\{"level":"([^"]*)","time":"([^"]*)","user_id":(null|-?\d+),"task_id":(null|-?\d+),"job_id":(null|-?\d+),"src":(null|"(?:[^"\\]|\\.)*"),"data":/;

/**
 * Reads a log file of NDJSON records (the GreyCat log stream `root/streams/log.ndjson` by default
 * usage) in byte ranges, backwards and forwards, without ever holding more than a bounded amount
 * of any one record.
 *
 * Offsets are byte offsets in the file. Lines are split on bytes and only complete lines are
 * decoded, so a multi-byte character cut by a read never shows up broken. A line still being
 * written, at the end of the file without its `\n`, is left out until it is complete.
 *
 * ```ts
 * const reader = new gc.sdk.LogStreamReader(gc.$.default, 'root/streams/log.ndjson');
 * const size = await reader.size();
 * const page = await reader.before(size, { maxBytes: 1024 * 1024 }); // the newest records
 * const older = await reader.before(page.start, { maxBytes: 1024 * 1024 });
 * ```
 */
export class LogStreamReader {
  readonly filepath: string;
  readonly chunkBytes: number;
  readonly maxRecordBytes: number;
  readonly headBytes: number;
  private readonly _source: LogFileSource;

  constructor(source: LogFileSource, filepath = 'root/streams/log.ndjson', opts: LogStreamReaderOptions = {}) {
    this._source = source;
    this.filepath = filepath;
    this.chunkBytes = Math.max(1, opts.chunkBytes ?? 256 * 1024);
    this.maxRecordBytes = Math.max(1, opts.maxRecordBytes ?? 1024 * 1024);
    this.headBytes = Math.max(512, Math.min(opts.headBytes ?? 64 * 1024, this.maxRecordBytes));
  }

  /** The current size of the file, in bytes. */
  async size(signal?: AbortSignal): Promise<number> {
    const res = await this._source.getFileResponse(this.filepath, undefined, undefined, signal);
    const length = res.headers.get('content-length');
    if (length !== null) {
      await res.body?.cancel();
      return parseInt(length, 10);
    }
    return (await res.arrayBuffer()).byteLength;
  }

  /**
   * The complete records that end at or before `offset`, oldest first.
   *
   * Reads backwards until at least `maxBytes` were read, but always returns at least one record
   * unless it reached the start of the file. A record larger than `maxRecordBytes` comes back as
   * a partial one, read through to find its start without being held whole.
   */
  async before(offset: number, opts: { maxBytes: number; signal?: AbortSignal }): Promise<LogPage> {
    const out: LogRecordRef[] = [];
    let hi = offset;
    let read = 0;
    // Offset of the `\n` that ends the line being gathered, -1 until the first one is found. The
    // bytes after the first `\n` belong to a line not complete before `offset`.
    let lineEnd = -1;
    let end = -1;
    let carry: Uint8Array = EMPTY;
    let carryLen = 0;

    while (hi > 0 && !(out.length > 0 && read >= opts.maxBytes)) {
      const lo = Math.max(0, hi - this.chunkBytes);
      const buf = await this._read(lo, hi - lo, opts.signal);
      read += buf.length;
      let segEnd = buf.length;
      for (let i = buf.length - 1; i >= 0; i--) {
        if (buf[i] !== EOL) continue;
        if (lineEnd < 0) {
          end = lo + i + 1;
        } else {
          [carry, carryLen] = this._prepend(buf.subarray(i + 1, segEnd), carry, carryLen);
          if (carryLen > 0) out.push(this._record(lo + i + 1, lineEnd, carry, carryLen));
          carry = EMPTY;
          carryLen = 0;
        }
        lineEnd = lo + i;
        segEnd = i;
        if (out.length > 0 && read >= opts.maxBytes) break;
      }
      if (out.length > 0 && read >= opts.maxBytes && segEnd > 0) {
        // stopped on a line boundary inside the chunk, what lies before it is left for a next call
        hi = lo + segEnd + 1;
        break;
      }
      if (lineEnd >= 0) {
        [carry, carryLen] = this._prepend(buf.subarray(0, segEnd), carry, carryLen);
      }
      hi = lo;
    }

    if (hi === 0 && lineEnd >= 0 && carryLen > 0) {
      out.push(this._record(0, lineEnd, carry, carryLen));
    }
    out.reverse();
    if (lineEnd < 0) {
      // no complete line at all before `offset`
      return { records: [], start: hi, end: hi };
    }
    return { records: out, start: out.length > 0 ? out[0].start : hi, end };
  }

  /**
   * The complete records that start at or after `offset`, oldest first. `offset` must be a line
   * boundary, such as the `end` of a page.
   *
   * Reads forwards until at least `maxBytes` were read, but always returns at least one record
   * unless it reached the end of the file. `size` saves a request when the caller knows it.
   */
  async after(offset: number, opts: { maxBytes: number; size?: number; signal?: AbortSignal }): Promise<LogPage> {
    const limit = opts.size ?? (await this.size(opts.signal));
    const out: LogRecordRef[] = [];
    let pos = offset;
    let lineStart = offset;
    let read = 0;
    let carry: Uint8Array = EMPTY;
    let carryLen = 0;

    while (pos < limit && !(out.length > 0 && read >= opts.maxBytes)) {
      const buf = await this._read(pos, Math.min(this.chunkBytes, limit - pos), opts.signal);
      if (buf.length === 0) break;
      read += buf.length;
      let segStart = 0;
      for (let i = 0; i < buf.length; i++) {
        if (buf[i] !== EOL) continue;
        [carry, carryLen] = this._append(carry, carryLen, buf.subarray(segStart, i));
        if (carryLen > 0) out.push(this._record(lineStart, pos + i, carry, carryLen));
        carry = EMPTY;
        carryLen = 0;
        lineStart = pos + i + 1;
        segStart = i + 1;
        if (out.length > 0 && read >= opts.maxBytes) break;
      }
      if (out.length > 0 && read >= opts.maxBytes && segStart < buf.length) {
        // stopped on a line boundary inside the chunk, what follows is left for a next call
        break;
      }
      [carry, carryLen] = this._append(carry, carryLen, buf.subarray(segStart));
      pos += buf.length;
    }
    return { records: out, start: offset, end: lineStart };
  }

  /**
   * The offset of the first record whose time is at or after `time` (epoch microseconds), or the
   * size of the file when there is none.
   *
   * A binary search over the file, then a forward scan. Records reach the file in batches, so
   * they are only nearly in time order: subtract an allowance from `time` (the server's log flush
   * step and a margin) to be sure no record of interest comes before the offset found.
   */
  async seek(time: number, signal?: AbortSignal): Promise<number> {
    const size = await this.size(signal);
    let lo = 0;
    let hi = size;
    while (hi - lo > this.chunkBytes) {
      const mid = lo + Math.floor((hi - lo) / 2);
      const head = await this._headAfter(mid, hi, signal);
      if (head !== null && (head.time === null || head.time < time)) {
        lo = head.start;
      } else {
        hi = mid;
      }
    }
    let pos = lo;
    while (pos < size) {
      const page = await this.after(pos, { maxBytes: this.chunkBytes, size, signal });
      if (page.records.length === 0) break;
      for (const r of page.records) {
        if (r.time !== null && r.time >= time) return r.start;
      }
      pos = page.end;
    }
    return size;
  }

  /** The bytes of a record, read whole however large it is, its `\n` excluded. */
  bytes(ref: LogRecordRef, signal?: AbortSignal): Promise<Uint8Array> {
    return this._read(ref.start, ref.end - ref.start, signal);
  }

  /**
   * The record's `data` in full, as {@link LogRecordRef.data} holds it for a record that is not
   * partial. Reads the record again for a partial one.
   */
  async fullData(ref: LogRecordRef, signal?: AbortSignal): Promise<string> {
    if (!ref.partial) return ref.data;
    return this._record(ref.start, ref.end, await this.bytes(ref, signal), ref.end - ref.start, true).data;
  }

  /** Reads `length` bytes from `offset`, in as many requests as the server needs. */
  private async _read(offset: number, length: number, signal?: AbortSignal): Promise<Uint8Array> {
    if (length <= 0) return EMPTY;
    const parts: Uint8Array[] = [];
    let got = 0;
    while (got < length) {
      const res = await this._source.getFileResponse(this.filepath, offset + got, length - got, signal);
      const part = new Uint8Array(await res.arrayBuffer());
      if (part.length === 0) break;
      parts.push(part);
      got += part.length;
    }
    return parts.length === 1 ? parts[0] : concat(parts, got);
  }

  /** Adds `bytes`, read before the line's bytes gathered so far, keeping only a head past the cap. */
  private _prepend(bytes: Uint8Array, carry: Uint8Array, carryLen: number): [Uint8Array, number] {
    if (bytes.length === 0) return [carry, carryLen];
    const len = carryLen + bytes.length;
    const joined = concat([bytes, carry], bytes.length + carry.length);
    // reading backwards, what is kept of an oversized line is its earliest bytes, its head
    return [len > this.maxRecordBytes ? joined.slice(0, this.headBytes) : joined, len];
  }

  /** Adds `bytes`, read after the line's bytes gathered so far, keeping only a head past the cap. */
  private _append(carry: Uint8Array, carryLen: number, bytes: Uint8Array): [Uint8Array, number] {
    if (bytes.length === 0) return [carry, carryLen];
    const len = carryLen + bytes.length;
    if (len <= this.maxRecordBytes) return [concat([carry, bytes], len), len];
    if (carry.length >= this.headBytes) return [carry, len];
    return [concat([carry, bytes.subarray(0, this.headBytes - carry.length)], this.headBytes), len];
  }

  /** The record of the line `[start, end)`, from its bytes (whole, or its head past the cap). */
  private _record(start: number, end: number, bytes: Uint8Array, length: number, whole = false): LogRecordRef {
    if (whole || length <= this.maxRecordBytes) {
      return parseLogLine(decoder.decode(bytes), start, end);
    }
    return parseLogHead(decoder.decode(trimPartialUtf8(bytes)), start, end);
  }

  /** The time of the first record starting after `offset` and before `limit`, null when none does. */
  private async _headAfter(
    offset: number,
    limit: number,
    signal?: AbortSignal,
  ): Promise<{ start: number; time: number | null } | null> {
    let start = offset;
    if (offset > 0) {
      // the record starts past the first `\n` found from `offset - 1`
      let pos = offset - 1;
      start = -1;
      while (start < 0 && pos < limit) {
        const buf = await this._read(pos, Math.min(8 * 1024, limit - pos), signal);
        if (buf.length === 0) return null;
        const i = buf.indexOf(EOL);
        if (i >= 0) start = pos + i + 1;
        pos += buf.length;
      }
      if (start < 0) return null;
    }
    if (start >= limit) return null;
    const head = await this._read(start, Math.min(512, limit - start), signal);
    const m = LOG_PREFIX.exec(decoder.decode(trimPartialUtf8(head)));
    return { start, time: m ? isoToMicros(m[2]) : null };
  }
}

/**
 * Parses one complete line of a log file. A line that is not a JSON object is kept as an
 * `unparsed` record.
 */
export function parseLogLine(line: string, start = 0, end = start + line.length): LogRecordRef {
  let rec: Record<string, unknown> | null = null;
  try {
    const parsed: unknown = JSON.parse(line);
    if (parsed !== null && typeof parsed === 'object' && !Array.isArray(parsed)) {
      rec = parsed as Record<string, unknown>;
    }
  } catch {
    rec = null;
  }
  if (rec === null) {
    return unparsed(line, start, end, false);
  }
  const data = rec['data'];
  return {
    start,
    end,
    level: typeof rec['level'] === 'string' ? rec['level'] : '',
    time: typeof rec['time'] === 'string' ? isoToMicros(rec['time']) : null,
    user_id: intOrNull(rec['user_id']),
    task_id: intOrNull(rec['task_id']),
    job_id: intOrNull(rec['job_id']),
    src: typeof rec['src'] === 'string' ? rec['src'] : null,
    data: typeof data === 'string' ? data : data === null || data === undefined ? '' : JSON.stringify(data),
    partial: false,
    unparsed: false,
  };
}

/** Reads the metadata and the head of `data` from the first bytes of a record too large to hold. */
function parseLogHead(head: string, start: number, end: number): LogRecordRef {
  const m = LOG_PREFIX.exec(head);
  if (m === null) {
    return unparsed(head, start, end, true);
  }
  const rest = head.slice(m[0].length);
  return {
    start,
    end,
    level: m[1],
    time: isoToMicros(m[2]),
    user_id: m[3] === 'null' ? null : Number(m[3]),
    task_id: m[4] === 'null' ? null : Number(m[4]),
    job_id: m[5] === 'null' ? null : Number(m[5]),
    src: m[6] === 'null' ? null : (JSON.parse(m[6]) as string),
    data: rest.startsWith('"') ? unescapeJsonHead(rest.slice(1)) : rest,
    partial: true,
    unparsed: false,
  };
}

function unparsed(text: string, start: number, end: number, partial: boolean): LogRecordRef {
  return {
    start,
    end,
    level: '',
    time: null,
    user_id: null,
    task_id: null,
    job_id: null,
    src: null,
    data: text,
    partial,
    unparsed: true,
  };
}

function intOrNull(v: unknown): number | null {
  return typeof v === 'number' ? v : null;
}

/**
 * Converts an ISO-8601 time to epoch microseconds, keeping the microseconds that `Date.parse`
 * drops. Returns `null` when the string is not a time.
 */
export function isoToMicros(iso: string): number | null {
  const ms = Date.parse(iso);
  if (isNaN(ms)) return null;
  const fraction = /\.(\d+)/.exec(iso)?.[1] ?? '';
  return ms * 1000 + Number(fraction.padEnd(6, '0').slice(3, 6));
}

/**
 * Decodes the start of a JSON string whose end was cut off, up to its closing quote when the cut
 * left it in. An escape cut in its middle is dropped.
 */
function unescapeJsonHead(s: string): string {
  let out = '';
  let from = 0;
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    if (c === 0x22) {
      return out + s.slice(from, i);
    }
    if (c !== 0x5c) continue;
    out += s.slice(from, i);
    const e = s[i + 1];
    if (e === undefined) return out;
    if (e === 'u') {
      const hex = s.slice(i + 2, i + 6);
      if (!/^[0-9a-fA-F]{4}$/.test(hex)) return out;
      out += String.fromCharCode(parseInt(hex, 16));
      i += 5;
    } else {
      out += ESCAPES[e] ?? e;
      i += 1;
    }
    from = i + 1;
  }
  return out + s.slice(from);
}

const ESCAPES: Record<string, string> = { n: '\n', r: '\r', t: '\t', b: '\b', f: '\f' };

/** `bytes` without a UTF-8 sequence cut at its end, which would decode as U+FFFD. */
function trimPartialUtf8(bytes: Uint8Array): Uint8Array {
  const n = bytes.length;
  for (let back = 1; back <= Math.min(3, n); back++) {
    const b = bytes[n - back];
    if ((b & 0xc0) === 0x80) continue; // a continuation byte, the lead is further back
    const need = b >= 0xf0 ? 4 : b >= 0xe0 ? 3 : b >= 0xc0 ? 2 : 1;
    return need > back ? bytes.subarray(0, n - back) : bytes;
  }
  return bytes;
}

function concat(parts: Uint8Array[], length: number): Uint8Array {
  const out = new Uint8Array(length);
  let at = 0;
  for (const p of parts) {
    out.set(p, at);
    at += p.length;
  }
  return out;
}
