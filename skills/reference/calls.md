# Calls: bindings, transport, values

## Through the bindings

```ts
const total = await gc.shop.total(orderId);                   // POST /shop::total
const task = await gc.shop.rebuild_index.spawn();             // same fn, as a task
const order = gc.shop.Order.createFrom({ id: 1, lines: [] });  // typed object
const paid = gc.shop.Status.paid;                              // enum entry
```

Every binding takes an optional instance and `AbortSignal` after its
arguments: `gc.shop.total(orderId, greycat, signal)`.

## The three instance methods

Under the bindings sit three methods, useful for functions the codegen has not
seen or for dynamic names:

| Method | Runs | Resolves to |
| --- | --- | --- |
| `greycat.call(fqn, args)` | in the request, on a req worker | the return value |
| `greycat.spawn(fqn, args)` | as a task on a task worker | the `runtime::Task` at once |
| `greycat.spawnAwait(fqn, args, opts)` | as a task | the result, once the task ended |

`fqn` is `module::fn` or `module::Type::fn`, no leading slash. `args` is an
array serialized with the ABI, or an `ArrayBuffer` sent as is.

`call` is for short work: a request that runs long blocks one of the few req
workers and is cut by the request ttl. Anything slow, anything that reports
progress, anything the caller may want to cancel is a task; see
[tasks.md](tasks.md).

`greycat.rawCall(fqn, args, signal, task, method)` is the transport under all
three: `task: true` adds the `task` header, `method: 'GET'` issues a GET with no
body, for a function that takes no arguments.

## Errors

A non-2xx answer rejects with `HttpError`, whose `status` is the HTTP status
and `body` the decoded error when the server sent one. A 401 also runs the
unauthorized path described in [auth.md](auth.md); a 422 runs
`abiMismatchHandler`; a 404 means the function is not in the ABI or not
exposed.

## The binary transport

Arguments go out and results come back as GCB, the server's binary form, with
`Accept` and `Content-Type: application/octet-stream`. Results are decoded
with the ABI into the generated classes: a `gc.shop.Order` instance, not a
plain object, with `gc.core.time`, `gc.core.duration`, `gc.core.geo`, node
references and enums as their own types.

Responses carry an `ETag`; with a `cache` in the `init` options a repeated
call sends `If-None-Match` and a 304 is served from the cache.

## Building and reading values

```ts
gc.shop.Order.createFrom({ id: 1, lines: [] });   // typed, validated field names
greycat.create('shop::Order', [1, []]);           // by name, positional attributes
gc.core.time.fromMs(Date.now());                  // also: time.now(), time.fromDate(d)
greycat.createTime(epochUs);                      // from microseconds
greycat.parseTime('2026-09-29T10:00:00Z');        // wasm helpers; throws with `wasm: false`
greycat.printTime(t);                             // ISO, in the instance's timezone
greycat.createGeo(lat, lng);
greycat.createNode(id); greycat.createNodeTime(id); // node references from raw ids
```

Codec access when a value must cross something other than a call:

- `greycat.serialize(value)` / `greycat.deserialize(buf)`: one value, no header.
- `greycat.serializeWithHeaders(value)` / `greycat.deserializeWithHeader(buf)`:
  with the ABI header the server puts on every response, which `result.gcb`
  files and task event frames also carry.
- `greycat.deserializeAll(buf)`: every value in a buffer, for `.gcb` files.

`greycat.findType(fqn)`, `findFn(fqn)`, `field(fqn)` look the ABI up by name.
