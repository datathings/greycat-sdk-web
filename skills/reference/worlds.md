# Worlds: running calls in a branch of the store

A world is a named branch of the server's store (`runtime::World`): a call
running in it reads and commits there instead of main. The server picks the
world from the `world` header of each RPC call, and an instance sends the one
in `greycat.world`. By default that is the default world of the logged-in
identity, main when it has none.

## Picking the world

```ts
const greycat = await gc.sdk.init({ world: 'what-if' });   // every call of the instance
greycat.world = 'variant';                                 // from the next call on
greycat.world = undefined;                                 // no header: main ('main' is the same)

const whatIf = greycat.clone('what-if');                   // a second world next to the first
whatIf.world = 'what-if';
await gc.shop.total(orderId, whatIf);                      // `$g` picks the instance, hence the world

await greycat.rawCall('shop::total', [orderId], undefined, false, 'POST', 'main');   // one call elsewhere
```

A clone starts in the world of its original and changes it on its own. It
still shares the task tracker of its original, since tracking is the same in
every world.

## The identity's default world

`Identity.world` is a default world for a client to send. **The server never
applies it**, and a call without a header runs in main. `init` follows it
unless told otherwise:

```ts
await gc.sdk.init({ auth });                          // the identity's default world, else main
await gc.sdk.init({ auth, world: 'main' });           // an explicit world wins, the identity is not read
await gc.sdk.init({ auth, identityWorld: false });    // main, whatever the identity says
await greycat.useIdentityWorld();                     // follow it again on a live instance
```

While followed, it is read again after each `greycat.login(...)`, and
`logout()` goes back to main. Setting `greycat.world` stops following it, so
a later login keeps the world set by hand. An anonymous session cannot read
its identity and runs in main. A clone, and an instance of `initWithAbi`, do
not follow it.

The server does not check a default world against `Identity.worlds`, so an
identity pointed at a world it may not use gets a `403` on every call (see
below).

## What a world changes, and what it does not

- Only RPC calls and the tasks they spawn run in a world. A spawned
  `gc.runtime.Task` names it in `task.world` (`null` when read back from the
  history).
- `/files/` is the same in every world, task results included.
- The SDK makes the calls that concern no world in main, whatever
  `greycat.world` says: `Identity::permissions` and `Identity::current` on
  init and login, and the polls of tracked tasks. Tasks spawned in a world
  are still followed once that world is removed.
- A cached answer (the `cache` option) is keyed by the world for a call
  outside main: `[method, params, world]`.

## Errors

| Status | Cause | `HttpError.body` |
| --- | --- | --- |
| `400` | no world has that name, or the header is empty | `core.Error`, its `message` says which |
| `403` | the caller may not use that world (`Identity.worlds`) | `core.Error` |
| `403` | a missing permission | `undefined` |

The worlds an identity may use besides main are `Identity.worlds` (`null`
for all). An admin and the world's creator use it whatever the list says.

## Creating and removing worlds

The `std` bindings carry them: `gc.runtime.World.list()` (the worlds the
caller may use, main excluded), `create(name, mode, base)` and
`remove(name)`, both behind the `world` permission. `mode` is a
`gc.runtime.WorldMode`:

| Mode | Starts from | Sees what its base commits afterwards |
| --- | --- | --- |
| `snapshot` | a copy of its base | never |
| `overlay` | its base, read through | for every node it has not written |
| `standalone` | nothing | there is no base |

Removing fails while a task still runs in the world, or while another world
is based on it. Nothing merges a world back into main.

`gui-worlds` lists, creates and removes worlds, and `gui-world-select` sets
the world of an instance (see [components.md](components.md)).
