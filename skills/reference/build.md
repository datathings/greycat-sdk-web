# Build: entry points, CSS, the vite plugin

## Entry points of the package

| Import | Content |
| --- | --- |
| `@greycat/web/sdk` | the headless client: `gc.sdk`, bindings, tasks, files. See [calls.md](calls.md) |
| `@greycat/web` | everything above plus the `gui-*` components, the Shoelace subset, the JSX runtime, browser helpers. See [components.md](components.md) |
| `@greycat/web/components/<family>` | registers one component family only |
| `@greycat/web/jsx-runtime` | the JSX factory, set through `jsxImportSource`. See [jsx.md](jsx.md) |
| `@greycat/web/shoelace.js` | the Shoelace component registrations and their types |
| `@greycat/web/vite-plugin` | the build plugin below |
| `@greycat/web/css/<file>.css` | stylesheets, see below |
| `@greycat/web/assets/<name>.svg` | bundled icons |
| `@greycat/web/greycat.wasm` | the wasm helpers, for a custom loader passed as `init`'s `wasm` |

`import '@greycat/web/sdk'` is a side-effect import that installs the `gc`
global; `import '@greycat/web'` does that and registers the components. Both
are safe to repeat.

## CSS

```ts
import '@greycat/web/css/greycat.css';        // theme variables, base, utilities, styled elements
import '@greycat/web/css/greycat-full.css';   // the above plus classless styling of plain HTML
```

`greycat.css` is `_theme.css` (the `greycat_dark` and `greycat_light` themes,
switched by `currentTheme()` / `toggleTheme()` from the root), `_base.css`,
`_utils.css` (spacing and layout utility classes such as `p-1`) and
`_elements.css` (buttons, cards, details, drawers, inputs, tabs, toasts).
`greycat-full.css` adds the classless layer: headings, text, tables, lists,
inputs, code, dialogs, fieldsets, details, progress, anchors, scrollbars and
responsive rules for unclassed HTML. The `gui-*` components carry their own
styles in their shadow roots and read the theme's CSS variables; override a
component through the `--gui-*` custom properties it documents.

## The vite plugin

```ts
import { greycat } from '@greycat/web/vite-plugin';

export default defineConfig({
  plugins: [greycat({ hostname: 'https://app.example.com' })],
});
```

Runs at build only, on `writeBundle`, each step on by default and opt-out:

- `gzip`: writes a `.gz` next to the assets GreyCat serves pre-compressed,
  keeping the originals; `gzip: false` or a `GzipOptions` object.
- `sitemap`: emits `sitemap.xml` from the built HTML pages; needs `hostname`,
  `SitemapOptions.extraRoutes` adds routes.
- `robots`: emits `robots.txt`; needs `hostname`, `RobotsOptions` to tune.

Without `hostname`, `sitemap` and `robots` are skipped silently.

## Bundling notes

- `greycat dev` starts the server and a frontend watcher (`vp`, `vite`, or
  `--with=<cmd>`); the built `webroot/` is what `greycat serve` serves at `/`.
- `project.d.ts` from `greycat codegen ts` is generated: exclude it from the
  formatter, regenerate it on every `.gcl` change.
- The explorer splits `@greycat/web` into its own chunk in
  `build.rollupOptions.output.manualChunks`; the package is large enough to
  warrant it.
- `pnpm build` in this repository builds `dist/sdk`, `dist/web`, `dist/jsx`,
  `dist/vite-plugin` and the CSS; `playground/` is a vite app over every
  component family, started with `pnpm build:playground` after
  `greycat serve` in `playground/`.
