---
name: greycat-web-sdk
description: "Calls a GreyCat server from TypeScript or JavaScript with @greycat/web, in a browser or in Node. Covers installing the SDK as a GreyCat library, the typed bindings greycat codegen ts generates, init and auth (password, token, OpenID, cookie sessions, login and logout on a live instance, 401 handling), call versus spawn versus spawnAwait, task tracking over the task event stream with polling as fallback, the GCB binary transport, /files/ access, several instances, the gui-* web components (tables, charts, inputs, maps, admin panels) and their factory, the JSX runtime that builds real DOM elements, the CSS themes and the vite plugin. Use when writing a frontend or a script against a GreyCat backend, rendering GreyCat values in a page, following a task's progress, deciding between call and spawn, or working out why a task never settles, why a Node process does not exit, why events stop after a login change, or why a gui-* tag stays an unknown element."
---

# GreyCat web SDK

`@greycat/web/sdk` is a headless client for a GreyCat server: it downloads the
project's ABI, speaks the server's binary form (GCB) for arguments and results,
and exposes every exposed function and type through generated, typed bindings.
`@greycat/web`, the root entry, adds the `gui-*` web components that render
and edit GreyCat values, a JSX runtime producing real DOM elements, CSS
themes and a vite plugin. An app may use the client alone.

## Quick start

```gcl
@library("sdk_web", "<version>");   // project.gcl; greycat install puts it under lib/sdk_web/
```

```sh
greycat install && pnpm install     # package.json: "@greycat/web": "file:./lib/sdk_web"
greycat codegen ts                  # writes project.d.ts, the typed bindings
```

```ts
import '@greycat/web/sdk';          // installs the `gc` global: gc.sdk, gc.$, gc.<module>

const greycat = await gc.sdk.init({ url: new URL('http://localhost:8080'), auth: { token } });
const total = await gc.shop.total(orderId);                  // exposed fn, runs in the request
const task = await gc.shop.rebuild_index.spawn();            // same fn, as a task
const done = await greycat.tasks.wait(task.task_id);         // settles over the event stream
```

## When to read which file

- **[reference/setup.md](reference/setup.md)**: install routes (library pin or
  tarball), `greycat codegen ts` and what lands in `project.d.ts`, `init`
  options, several instances and `gc.$`, `initWithAbi` for tests and workers.
- **[reference/auth.md](reference/auth.md)**: the auth forms of `init`, token
  versus cookie sessions and the `credentials` mode, `login` / `logout` on a
  live instance, what a 401 does, `auth:lost` / `auth:changed`, the handlers.
- **[reference/calls.md](reference/calls.md)**: generated bindings, `call` /
  `spawn` / `spawnAwait` / `rawCall`, the GCB transport, `HttpError`, building
  and reading values (`createFrom`, enums, times, `serialize`).
- **[reference/tasks.md](reference/tasks.md)**: `wait` / `subscribe` / `await`,
  `TaskError`, the task events, how the event stream and the polling fallback
  work, reconnects, credentials, Node and browser constraints.
- **[reference/files.md](reference/files.md)**: `/files/` access, `getFile` and
  its decoding by extension, `putFile`, upload progress, `deleteFile`, task
  results on disk.
- **[reference/components.md](reference/components.md)**: the `gui-*`
  elements by family (value, object, table, charts, inputs, map, admin
  panels, auth), registration after init, the value factory, events, the
  helpers of the root entry (`modal`, `toast`, `IndexedDbCache`, themes).
- **[reference/jsx.md](reference/jsx.md)**: the JSX runtime, what each prop
  does (`className`, `style`, `attr:*`, `on*`, `$ref`), typing your own
  elements, why nothing re-renders.
- **[reference/build.md](reference/build.md)**: every entry point of the
  package, the CSS files and themes, the vite plugin (gzip, sitemap, robots),
  bundling notes and the playground.

## Rules that save a debugging session

- **Short work is a `call`, anything else is a task.** A `call` runs in the
  request on one of a few req workers and is reaped by the request ttl.
- **A task is watched only while something waits on it.** `wait`, `subscribe`,
  `await` and `spawnAwait` track; an untracked task only shows up in
  `task:event`, and only while the stream is open.
- **An open task event stream keeps a Node process alive.** End scripts and
  tests with `greycat.tasks.disconnect()`, or init with `taskEvents: false`.
- **One stream per instance, six connections per origin in a browser over
  HTTP/1.1.** Do not create instances per component.
- **Change the login through the instance.** `greycat.login(auth)` and
  `greycat.logout()` carry the stream and the permissions along; a cookie
  session changed elsewhere needs `greycat.tasks.reconnect()`.
- **`gc` is undefined** until `@greycat/web/sdk` is imported once for its side
  effect.
- **`gc.runtime.Task.events` is in the bindings but is not a call**: it is the
  stream endpoint and answers 400 when invoked. The SDK opens it for you.
- **A `gui-*` tag is an unknown element until `gc.sdk.init` succeeded.** The
  components are defined once the ABI is there; `onComponentsReady` waits.
- **JSX here builds DOM nodes once.** No re-render: keep the element and set
  its properties.
