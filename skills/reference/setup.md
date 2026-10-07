# Setup: install, codegen, init, instances

## Install

The package is not on npm. Two routes:

**As a GreyCat library** (frontend inside a GreyCat project):

```gcl
@library("sdk_web", "<version>");   // project.gcl
```

```json
{ "dependencies": { "@greycat/web": "file:./lib/sdk_web" } }
```

```sh
greycat install     # fetches lib/sdk_web at the pinned version, like any library
pnpm install        # links @greycat/web to it
```

The version sits next to `std` in `project.gcl`, and `greycat install --bump`
moves both at once.

**As a tarball** (frontend outside a GreyCat project):

```sh
pnpm add https://get.greycat.io/files/sdk/web/<major.minor>/<version>.tgz
```

Entry points: `@greycat/web/sdk` is the headless client and the only import a
backend caller needs. `@greycat/web` (the root) adds the web components, the
JSX runtime and browser helpers; the full list, the CSS files and the vite
plugin are in [build.md](build.md).

## Typed bindings

```sh
greycat codegen ts    # reads the compiled project, writes project.d.ts
```

`project.d.ts` is an ambient declaration: it extends the `gc` global with one
namespace per module. Regenerate it whenever a `.gcl` file changes; do not
edit it. It gives:

- `gc.<module>.<fn>(args..., $g?, $signal?)`: calls the exposed function,
  and `gc.<module>.<fn>.spawn(...)` runs it as a task.
- `gc.<module>.<Type>`: a class with typed fields, `createFrom({ ... })`, and
  `<Type>.<method>()` for exposed static methods.
- `gc.<module>.<Enum>.<key>`: enum entries.

The `std` bindings ship with the SDK (`gc.core`, `gc.runtime`, `gc.io`, ...).

## init

```ts
import '@greycat/web/sdk';
const greycat = await gc.sdk.init(options);
```

`init` downloads the ABI, loads the wasm helpers, registers the instance and
resolves to it. Options:

| Option | Meaning |
| --- | --- |
| `url` | server base URL; discovered from the page's origin in a browser, `http://127.0.0.1:8080` in Node |
| `name` | registry key, `'default'` unless several instances coexist |
| `auth`, `credentials` | see [auth.md](auth.md) |
| `taskEvents` | keep a task event stream open, `true` by default; see [tasks.md](tasks.md) |
| `pauseWhenHidden` | close that stream while the page is hidden, `false` by default (see [tasks.md](tasks.md)) |
| `pollFrequency` | cadence of the polling fallback in ms, `100` |
| `unauthorizedHandler`, `abiMismatchHandler` | see [auth.md](auth.md) |
| `cache` | an ETag cache for the ABI and call responses |
| `timezone`, `numFmt` | used by `printTime` / `parseTime` and number formatting |
| `wasm` | a wasm source, or `false` to skip it (`parseTime` / `printTime` then throw) |
| `signal` | aborts the whole init |

With an OpenID `auth`, `init` may resolve to a `Redirecting` value instead of
an instance while the browser navigates away: test with `gc.sdk.isRedirecting`.

`gc.sdk.onInit(hook)` runs a hook on every instance `init` produces;
`gc.sdk.onInitError(hook)` may substitute a result when `init` fails.

## Instances

`gc.$` maps names to instances; `gc.$.default` is what the bindings use unless
an instance is passed as their trailing `$g` argument. `greycat.clone(name)`
makes a second instance on the same server, ABI and credentials. It shares
the task tracker and event stream of its original, so the `task:*` events of
the tasks it spawns are emitted on the original, until a token of its own
gives it a tracker of its own. `setDebugId(id)` on it routes its calls through
the debugger, which is what the explorer does per debugger session.

`gc.sdk.initWithAbi({ abi, module, exports, url, token })` builds an instance
from an ABI already at hand, with no network at construction: tests, workers,
tooling. It opens no task event stream unless `taskEvents: true`.
