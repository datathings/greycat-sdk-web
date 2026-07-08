# Migrating to @greycat/web v8

## TL;DR

```ts
// before
import '@greycat/web';
await gc.sdk.init();

// after
import '@greycat/web/components/all.js'; // or cherry-pick, see below
await gc.sdk.init();
```

Install stays `npm install @greycat/web`. Heavy libraries are now peer
dependencies; npm >= 7 and pnpm >= 8 install them automatically.

## Components require an explicit import

Importing `@greycat/web` no longer registers any custom element.

```ts
// everything (previous behavior):
import '@greycat/web/components/all.js';

// or only what you use (thin bundles):
import '@greycat/web/components/table';
import '@greycat/web/components/chart';
```

- Each component import pulls its own dependencies (other gui-\* elements,
  the shoelace elements it renders, echarts/maplibre-gl for
  chart2/map/dashboard).
- Elements are still defined when `gc.sdk.init()`/`initWithAbi()` resolves,
  never before. Auth components (`gui-sign-in`, `gui-auth-gate`,
  `gui-sign-in-button`) define at import so they work pre-init.
- `registerCustomElement()` now queues until init; pass `{ eager: true }`
  to define immediately.
- `gui-factory` mappings follow imports: import `components/table` and
  tables render as `gui-table`; unimported types fall back to
  `gui-object`/`gui-value`.

## Wasm

The wasm bytes are no longer inlined in the JS bundle. `init()` loads the
packaged `dist/greycat.wasm` by default (resolved relative to the module;
works with Vite, Node, Bun) - nothing to do.

```ts
// custom path
await gc.sdk.init({ wasm: new URL('/assets/greycat.wasm', location.href) });

// skip it (parseTime/printTime will throw)
await gc.sdk.init({ wasm: false });
```

`wasm` accepts a `URL` (http or file), a `Response`, a `BufferSource` or a
precompiled `WebAssembly.Module`. If the default load fails, `init()` warns
and continues; an explicit `wasm` source that fails rejects `init()`.

`initWithAbi()` is synchronous and cannot fetch: precompile with
`compileWasm()` (exported by `@greycat/web/sdk`) and pass
`{ module, exports }` as before.

## Vendor re-exports are gone

`sl`, `d3`, `html`, `render` are no longer exported by `@greycat/web`.
Import from the packages (they are peers, present in your node_modules):

```ts
import * as sl from '@shoelace-style/shoelace';
import * as d3 from 'd3';
```

## Peer dependencies

Moved from `dependencies` to `peerDependencies`:
`@shoelace-style/shoelace`, `d3`, `echarts`, `maplibre-gl`.
You can pin your own versions; duplicates with your direct deps are gone.

## gui-map

`maplibre-gl` is imported by the map component itself.
`gc.sdk.init({ maplibregl })` and the `globalThis.maplibregl` injection are
removed:

```ts
// before
import maplibregl from 'maplibre-gl';
await gc.sdk.init({ maplibregl });

// after
import '@greycat/web/components/map';
await gc.sdk.init();
```

## gc.web global

`gc.web` exists only after importing `@greycat/web/components/all.js`.

## Task polling and events

The instance exposes a task poller as `greycat.tasks`. Many tasks share a
single batched poll, driven by whatever is waiting on or observing them.

### Instance events

`task` and `tasks` are replaced by a `task:*` triad:

```ts
// before
greycat.on('task', (task) => {}); // spawned
greycat.on('tasks', (map) => {}); // Map<id, Task>, every poll

// after
greycat.on('task:spawn', (task) => {}); // spawned
greycat.on('task:update', (task) => {}); // fresh snapshot of a tracked task
greycat.on('task:settle', ({ task, error }) => {}); // left the poller; error is null on success
```

`task:update` and `task:settle` only fire for tasks something is waiting on or
subscribed to.

### Waiting on / observing a task

```ts
// resolves the terminal Task, rejects with a TaskError on failure
const done = await greycat.tasks.wait(id);

// every update until it settles; returns an unsubscribe
const off = greycat.tasks.subscribe(id, (task) => {});
```

`task.on(...)` takes two events:

```ts
task.on('update', (task) => {}); // every poll, incl. terminal
task.on('settle', ({ task, error }) => {}); // once, when it completes
```

### Removed / changed

- `greycat.subscribeToTaskPoll(everyMs, cb)` -> `greycat.on('task:update', cb)`
  to observe, or `greycat.tasks.subscribe(id, cb)` to also drive polling.
- `greycat.watchTask(task)` / `greycat.unwatchTask(task)` ->
  `greycat.tasks.subscribe(id, cb)` and the unsubscribe it returns.
- `greycat.getTask(id)` and `greycat.pollTasks()` are gone.
- `task.getProgress()` is gone; read `progress` from a `task:update` snapshot.
- `greycat.await(...)` and `task.result()` reject a cancelled task with a
  `TaskError` instead of resolving `undefined`; failed tasks still throw their
  `core.Error`.

## Distribution

- npm package (tgz) only. The free-standing CDN files
  (`greycat.js`, `<version>.web.esm.js`, IIFE bundles, vendor bundle) are
  no longer published.
- ESM only, no pre-bundling: `dist/web` is a module-per-file tree; your
  bundler resolves dependencies and tree-shakes unused components.
- New export subpaths: `./components/all.js`, `./components/<name>`
  (registers + exports classes), `./components/<path>.js` (raw module).

## Removed

- `WebOptions` / `WebWithoutAbiOptions.maplibregl` (see gui-map above)
- `serialize` re-exports (deprecated in 7.x)
