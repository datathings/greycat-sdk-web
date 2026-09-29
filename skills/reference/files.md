# Files: the /files/ tree

The server serves each user's directory under `/files/<user>/...`; a path
given to the SDK never includes the `/files/` prefix. Requests carry the
instance's credentials like a call, and a 401 runs the same unauthorized path
(see [auth.md](auth.md)); a 403 rejects with `HttpError`.

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

## Upload and delete

```ts
await greycat.putFile('root/upload.csv', file);   // a File or Blob, PUT /files/root/upload.csv
await greycat.deleteFile('root/upload.csv');
```

For a progress bar in a browser, `putFileProgress(file, path, onProgress)`
from the `@greycat/web` root entry uploads with an `XMLHttpRequest` and
returns a promise with an `abort()`.

## Task results

A task's result lives at `<user>/tasks/<id>/result.gcb`, written when the task
ends; `greycat.await(task)` fetches and decodes it. A task that returned
nothing has no result file, and `await` resolves with `undefined`.
