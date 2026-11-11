# Files: the /files/ tree

The server serves each user's directory under `/files/<user>/...`; a path
given to the SDK never includes the `/files/` prefix. Requests carry the
instance's credentials like a call, and a 401 runs the same unauthorized path
(see [auth.md](auth.md)); a 403 rejects with `HttpError`. The tree is the
same in every world, and no `world` header goes with these requests.

## Download

```ts
const rows = await greycat.getFile('root/export.gcb');   // Array of GreyCat values
const cfg = await greycat.getFile('root/config.json');   // parsed JSON
const txt = await greycat.getFile('root/notes.txt');     // string
const part = await greycat.getFile('root/big.bin', offset, max);  // a byte range
const res = await greycat.getFileResponse('root/big.bin');       // the raw Response
```

`getFile` decodes by extension: `.gcb` is every value in the file, decoded
with the ABI (an empty file gives `undefined`); `.json` is parsed; anything
else comes back as text. Use `getFileResponse` to read the body yourself, for
binary content or streaming.

## The log stream

The server writes its log to `root/streams/log.ndjson`, one `runtime::Log` per
line as JSON, its fields in the order of the type. The file grows to hundreds
of megabytes and a single record can be megabytes long, so read it in byte
ranges with `LogStreamReader` rather than with `getFile`:

```ts
const reader = new gc.sdk.LogStreamReader(greycat);       // root/streams/log.ndjson by default
const size = await reader.size();
const page = await reader.before(size, { maxBytes: 1 << 20 }); // the newest records
const older = await reader.before(page.start, { maxBytes: 1 << 20 });
const newer = await reader.after(page.end, { maxBytes: 1 << 20, size });
const from = await reader.seek(time);                      // byte offset of the first record at or after `time` (microseconds)
const text = await reader.fullData(record);                // a record's whole `data`
```

- A page holds whole records only. A last line the server is still writing is
  left out, and `page.end` is where the next read starts.
- Each `LogRecordRef` has its byte range (`start`, `end`), its fields, and its
  `time` in microseconds. A line that is not a record comes back with
  `unparsed` set and the line as `data`.
- A record over `maxRecordBytes` (1 MiB by default) is held as its first
  `headBytes` (64 KiB) with `partial` set. `fullData` reads it whole on demand.
- The server writes the log in batches up to `--log_flush_step` (1 s by
  default) late, and records of parallel jobs a few milliseconds out of time
  order. `seek` finds a byte offset close to a time. Look a little before and
  after the times of interest.
- Showing a record: `highlight(data, maxChars)` and `truncateText(data,
  maxChars)` from the `@greycat/web` root entry bound the text they render.
  Laying out a long text that needs font fallback (CJK, emoji) can freeze the
  page.

`gui-logs` is a viewer over the same reader.

## Upload and delete

```ts
await greycat.putFile('root/upload.csv', file);   // a File or Blob, PUT /files/root/upload.csv
await greycat.deleteFile('root/upload.csv');
```

For a progress bar in a browser, `putFileProgress(file, path, onProgress)`
from the `@greycat/web` root entry uploads with an `XMLHttpRequest` and
returns a promise with an `abort()`.
