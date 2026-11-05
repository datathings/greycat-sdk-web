# Worlds: running calls in a branch of the store

A world is a named branch of the server's store (`runtime::World`): a call
running in it reads and commits there instead of main. The server picks the
world from the `world` header of each RPC call, and an instance sends the one
in `greycat.world`. By default that is the default world of the logged-in
identity, main when it has none.

## Contents

- Picking the world
- Several worlds side by side
- The root of a world
- The identity's default world
- What a world changes, and what it does not
- Errors
- Creating and removing worlds

## Picking the world

```ts
const greycat = await gc.sdk.init({ world: 'what-if' });   // every call of the instance
greycat.world = 'variant';                                 // from the next call on
greycat.world = 'main';                                    // main (`undefined` is the same)
greycat.world;                                             // always a string, 'main' for main

greycat.on('world:changed', ({ world }) => render(world));  // set, or changed by a login

await greycat.rawCall('shop::total', [orderId], undefined, false, 'POST', 'main');   // one call elsewhere
```

A call in main carries no `world` header. `world:changed` fires whenever the
world of the instance changes: set by hand, read from the identity on `init`
or `login`, or back to main on `logout`. Setting the world the instance is
already in fires nothing.

## Several worlds side by side

`greycat.inWorld(name)` returns an instance of the same login whose calls run
in `name`. It is made on first use and returned again for the same world, so
pass it around rather than keeping your own. Do not change its world.

```ts
const whatIf = greycat.inWorld('what-if');
await gc.shop.total(orderId, whatIf);                      // `$g` picks the instance, hence the world
greycat.inWorld('what-if') === whatIf;                     // true
greycat.inWorld('main');                                   // main next to an instance in a world
```

It is a clone registered as `<name>@<world>` (`gc.$['default@what-if']`), so
it shares the task tracker of its original, since tracking is the same in
every world. `greycat.clone(name)` is still there for an instance whose world
you change yourself.

## The root of a world

Each world has nodes of its own for the module variables, and a standalone
world starts with empty ones. **A node read in one world does not resolve in
another**: the server answers `400 unresolved block` (see Errors). Read the
root through the instance of the world you call in.

```ts
const root = await greycat.root();                         // read once, then kept
const entries = root['project::entries'];                  // a node of greycat.world

const other = await greycat.inWorld('what-if').root();     // the root of another world
greycat.invalidateRoot();                                  // the next root() reads it again
```

`root()` reads nothing until it is first called, then every call shares the
same read, concurrent ones included. Changing the world of the instance, or
its debug session, drops it, and the next call reads the new world's root. A
read still running when the world changes is not kept. A failed read is not
kept either. `signal` aborts the wait of that call only, not the read the
others share.

The nodes of the module variables do not change within a world, except when
the world is removed and created again under the same name. Call
`invalidateRoot()` on its instance then.

The fields of the root, like those of any GreyCat object, live on its
prototype, so `Object.keys(root)` is empty. Walk `greycat.rootType().attrs`:

```ts
for (const attr of greycat.rootType().attrs) {
  console.log(attr.name, root[attr.name as keyof typeof root]);
}
```

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
`logout()` goes back to main, both firing `world:changed` when the world
changes. Setting `greycat.world` stops following it, so a later login keeps
the world set by hand. An anonymous session cannot read its identity and runs
in main. A clone, an `inWorld` instance and an instance of `initWithAbi` do
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
| `400` | a node of another world, such as one of the root of main (`unresolved block <n>`) | `core.Error` |
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
the world of an instance and follows it on `world:changed` (see
[components.md](components.md)).
