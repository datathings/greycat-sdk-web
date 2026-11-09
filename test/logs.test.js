import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { LogStreamReader, parseLogLine } from '@greycat/web/sdk';

const encoder = new TextEncoder();

/**
 * A log line as the runtime writes it, its fields in the order of `runtime::Log`.
 * @param {number} i
 * @param {unknown} data
 * @param {Partial<{ level: string; task_id: number | null; job_id: number | null; src: string | null; time: number }>} [o]
 */
function line(i, data, o = {}) {
  const time = new Date(Date.UTC(2026, 10, 9, 10, 0, 0) + (o.time ?? i) * 1000).toISOString();
  return JSON.stringify({
    level: o.level ?? 'info',
    time,
    user_id: 1,
    task_id: o.task_id === undefined ? i : o.task_id,
    job_id: o.job_id ?? null,
    src: o.src === undefined ? 'project::emit' : o.src,
    data,
  });
}

/**
 * A fake `getFileResponse` over `bytes`, recording every range read.
 * @param {Uint8Array} bytes
 * @param {number} [perResponse] the most bytes one response holds, as a server may send less
 */
function source(bytes, perResponse = Infinity) {
  /** @type {Array<[number, number]>} */
  const reads = [];
  return {
    reads,
    /** @param {string} _path @param {number} [offset] @param {number} [max] */
    getFileResponse: async (_path, offset, max) => {
      if (offset === undefined || max === undefined) {
        return new Response(bytes, { headers: { 'content-length': String(bytes.length) } });
      }
      reads.push([offset, max]);
      const end = Math.min(bytes.length, offset + Math.min(max, perResponse));
      return new Response(bytes.slice(offset, end));
    },
  };
}

/** @param {string[]} lines */
function file(lines, trailing = true) {
  return encoder.encode(lines.join('\n') + (trailing ? '\n' : ''));
}

/** Every record of the file, read newest-first in pages as a viewer does. */
async function readBackwards(/** @type {LogStreamReader} */ reader, maxBytes = 1) {
  let offset = await reader.size();
  /** @type {import('@greycat/web/sdk').LogRecordRef[]} */
  const all = [];
  for (;;) {
    const page = await reader.before(offset, { maxBytes });
    all.unshift(...page.records);
    if (page.start === 0 || page.records.length === 0) break;
    offset = page.start;
  }
  return all;
}

async function readForwards(/** @type {LogStreamReader} */ reader, maxBytes = 1) {
  const size = await reader.size();
  /** @type {import('@greycat/web/sdk').LogRecordRef[]} */
  const all = [];
  let offset = 0;
  while (offset < size) {
    const page = await reader.after(offset, { maxBytes, size });
    if (page.records.length === 0) break;
    all.push(...page.records);
    offset = page.end;
  }
  return all;
}

describe('LogStreamReader', () => {
  const texts = ['plain', 'é accent', '漢字 cjk', '🚀 emoji', 'mixé 漢🚀 end', 'line\nbreak "quoted"'];
  const lines = texts.map((t, i) => line(i, t));
  const bytes = file(lines);

  for (const chunkBytes of [1, 2, 3, 5, 7, 64, 4096]) {
    it(`reads every record backwards and forwards with ${chunkBytes}-byte reads, characters intact`, async () => {
      const reader = new LogStreamReader(source(bytes, 3), 'log', { chunkBytes });
      for (const records of [await readBackwards(reader), await readForwards(reader)]) {
        assert.deepEqual(
          records.map((r) => r.data),
          texts,
        );
        assert.ok(records.every((r) => !r.partial && !r.unparsed));
      }
    });
  }

  it('gives each record its byte range', async () => {
    const reader = new LogStreamReader(source(bytes), 'log', { chunkBytes: 5 });
    const records = await readBackwards(reader);
    let at = 0;
    for (let i = 0; i < records.length; i++) {
      const len = encoder.encode(lines[i]).length;
      assert.equal(records[i].start, at);
      assert.equal(records[i].end, at + len);
      at += len + 1;
    }
  });

  it('reads the metadata of a record', async () => {
    const reader = new LogStreamReader(
      source(file([line(3, { a: 1 }, { level: 'warn', task_id: 7, job_id: 2, src: 'm::f' })])),
      'log',
    );
    const [r] = (await reader.before(await reader.size(), { maxBytes: 1 })).records;
    assert.equal(r.level, 'warn');
    assert.equal(r.task_id, 7);
    assert.equal(r.job_id, 2);
    assert.equal(r.user_id, 1);
    assert.equal(r.src, 'm::f');
    assert.equal(r.data, '{"a":1}');
    assert.equal(r.time, Date.UTC(2026, 10, 9, 10, 0, 3) * 1000);
  });

  it('leaves out a last line still being written', async () => {
    const reader = new LogStreamReader(source(file([...lines, '{"level":"info","ti'], false)), 'log', {
      chunkBytes: 4,
    });
    assert.equal((await readBackwards(reader)).length, texts.length);
    assert.equal((await readForwards(reader)).length, texts.length);
  });

  it('keeps a line that is not a record', async () => {
    const reader = new LogStreamReader(source(file([lines[0], 'not json at all', lines[1]])), 'log', {
      chunkBytes: 3,
    });
    const records = await readBackwards(reader);
    assert.equal(records.length, 3);
    assert.equal(records[1].unparsed, true);
    assert.equal(records[1].data, 'not json at all');
    assert.equal(records[1].level, '');
  });

  it('returns at least one record however small maxBytes is', async () => {
    const reader = new LogStreamReader(source(bytes), 'log', { chunkBytes: 4096 });
    const size = await reader.size();
    const page = await reader.before(size, { maxBytes: 1 });
    assert.ok(page.records.length >= 1);
    assert.equal(page.end, size);
  });

  it('stops near maxBytes', async () => {
    const many = Array.from({ length: 200 }, (_, i) => line(i, 'x'.repeat(100)));
    const src = source(file(many));
    const reader = new LogStreamReader(src, 'log', { chunkBytes: 1024 });
    const page = await reader.before(await reader.size(), { maxBytes: 4096 });
    const read = src.reads.reduce((a, [, max]) => a + max, 0);
    assert.ok(read <= 4096 + 1024, `read ${read} bytes`);
    assert.ok(page.records.length > 10);
  });

  describe('a record over maxRecordBytes', () => {
    const big = 'é'.repeat(5000) + '🚀';
    const bigLines = [line(0, 'before'), line(1, big, { task_id: 42, job_id: 3, level: 'error' }), line(2, 'after')];
    const opts = { chunkBytes: 64, maxRecordBytes: 1000, headBytes: 600 };

    it('is held as its head, with its metadata and range', async () => {
      for (const read of [readBackwards, readForwards]) {
        const reader = new LogStreamReader(source(file(bigLines)), 'log', opts);
        const records = await read(reader);
        assert.deepEqual(
          records.map((r) => r.partial),
          [false, true, false],
        );
        const r = records[1];
        assert.equal(r.level, 'error');
        assert.equal(r.task_id, 42);
        assert.equal(r.job_id, 3);
        assert.ok(big.startsWith(r.data), 'the head is the start of the data');
        assert.ok(r.data.length > 0 && !r.data.includes('�'));
        assert.equal(r.end - r.start, encoder.encode(bigLines[1]).length);
        assert.equal(await reader.fullData(r), big);
      }
    });

    it('is returned when the file ends on it', async () => {
      const reader = new LogStreamReader(source(file(bigLines.slice(0, 2))), 'log', opts);
      const page = await reader.before(await reader.size(), { maxBytes: 1 });
      assert.equal(page.records.length, 1);
      assert.equal(page.records[0].partial, true);
    });

    it('decodes the escapes of its head', async () => {
      const data = 'a\nb\t"c" é 🚀 ' + 'z'.repeat(2000);
      const reader = new LogStreamReader(source(file([line(0, data)])), 'log', opts);
      const [r] = (await reader.before(await reader.size(), { maxBytes: 1 })).records;
      assert.ok(data.startsWith(r.data), JSON.stringify(r.data.slice(0, 30)));
      assert.ok(r.data.startsWith('a\nb\t"c" é 🚀 '));
    });
  });

  describe('seek', () => {
    // records one second apart, two of them a little out of order, one very large
    const seekLines = Array.from({ length: 300 }, (_, i) => {
      const time = i === 101 ? 99.5 : i === 200 ? 199.9 : i;
      return line(i, i === 150 ? 'y'.repeat(20000) : `r${i}`, { time });
    });
    const seekBytes = file(seekLines);
    const starts = [];
    let at = 0;
    for (const l of seekLines) {
      starts.push(at);
      at += encoder.encode(l).length + 1;
    }
    const at0 = Date.UTC(2026, 10, 9, 10, 0, 0) * 1000;

    it('finds the first record at or after a time', async () => {
      const reader = new LogStreamReader(source(seekBytes), 'log', { chunkBytes: 512, maxRecordBytes: 4096 });
      for (const i of [0, 1, 50, 99, 102, 149, 150, 151, 250, 299]) {
        assert.equal(await reader.seek(at0 + i * 1e6), starts[i], `record ${i}`);
      }
    });

    it('answers 0 before the first record and the size past the last one', async () => {
      const reader = new LogStreamReader(source(seekBytes), 'log', { chunkBytes: 512 });
      assert.equal(await reader.seek(at0 - 1e9), 0);
      assert.equal(await reader.seek(at0 + 1e12), seekBytes.length);
    });
  });
});

describe('parseLogLine', () => {
  it('keeps the microseconds of the time', () => {
    const r = parseLogLine('{"level":"info","time":"2026-11-09T09:22:22.715415Z","data":"x"}');
    assert.equal(r.time, Date.UTC(2026, 10, 9, 9, 22, 22, 715) * 1000 + 415);
  });
});
