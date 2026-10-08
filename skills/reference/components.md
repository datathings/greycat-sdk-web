# Web components: the `gui-*` elements of `@greycat/web`

## Contents

- What the root entry does
- Registration: elements exist after init
- The catalog, by family
- Value display and the factory
- Inputs: editing GreyCat values
- Events
- Helpers exported by the root
- Where the detail is

## What the root entry does

```ts
import '@greycat/web';             // the SDK, every gui-* element, Shoelace, the JSX runtime
import '@greycat/web/css/greycat.css';
```

The root imports `@greycat/web/sdk`, registers every `gui-*` custom element,
loads the Shoelace subset the components rely on (`sl-alert`, `sl-button`,
`sl-button-group`, `sl-card`, `sl-checkbox`, `sl-color-picker`, `sl-details`,
`sl-dialog`, `sl-divider`, `sl-drawer`, `sl-icon`, `sl-icon-button`,
`sl-input`, `sl-option`, `sl-popup`, `sl-select`, `sl-spinner`, `sl-tag`,
`sl-tooltip`, `sl-tree`, `sl-tree-item`), re-exports the JSX runtime, and
adds `Array.prototype.toFeatureCollection` for GeoJSON. `d3` and
`maplibre-gl` come with it; `gui-map` needs the latter at runtime.

The core `greycat` skill's webapp reference prescribes Lit and Web Awesome
with `@greycat/web/sdk` alone for a new app. The explorer and older apps use
these components instead. Both are supported; follow the project's own
convention, and do not mix the two component systems in one page.

## Registration: elements exist after init

Definitions are queued and flushed by the first successful `gc.sdk.init()` or
`initWithAbi()`, because most components need the ABI to render a value. A
`gui-*` tag in the HTML before that is an unknown element until then;
`onComponentsReady(cb)` from the root runs a callback once they are defined.
`registerCustomElement(tag, klass, { eager })` defines at once.

`@greycat/web/components/<family>` (for example
`@greycat/web/components/table`) imports and registers one family only, for
a page that wants a single element without the whole set.

## The catalog, by family

Every element is namespaced `gui-`; the class is `Gui<Name>` and is exported
by the root. Most take their data through a `value` property.

| Family | Tags | Purpose |
| --- | --- | --- |
| value | `gui-value` | one-line textual rendering of any GreyCat or JS value, optionally linkified; the cell renderer of every other component |
| object | `gui-object`, `gui-object-fieldname`, `gui-object-fieldvalue` | a GreyCat object as a field list, with optional node resolution |
| table | `gui-table`, `gui-thead`, `gui-thead-cell`, `gui-tbody`, `gui-tbody-row`, `gui-tbody-cell` | virtualized `core::Table`, sortable and filterable; accepts `TableLike` (Map, arrays of objects, `{ rows }`, `{ cols }`) |
| table mappings | `gui-table-mappings`, `gui-table-mapping` | edit `core::TableColumnMapping` lists, emitting apply and delete events |
| chart | `gui-chart` and its `gui-chart-*-input` config editors, `gui-chart-config` | d3 chart over a table: line, scatter, area, bar, step, stacked bars, time axes, cursor and selection |
| chart2 | `gui-chart2`, `gui-chart2-config` | the newer chart with the same `value` / `config` / `drawerEnabled` surface. The config, its axes and each series take raw ECharts options under `echarts`, markers included (`markLine`, `markArea`, `markPoint`) |
| node-time | `gui-node-time` | one or more `nodeTime` series with adaptive sampling and a full-range overview slider |
| donut, gauge, histogram, gaussian, heatmap | `gui-donut`, `gui-gauge`, `gui-histogram`, `gui-gaussian`, `gui-heatmap`, `gui-heatmap-tooltip` | a table as a doughnut; a value on a gauge; `util::HistogramBin[]` or `HistogramStats`; a `util::Gaussian`; a matrix with color scales and labels |
| tensor | `gui-tensor` | a `core::Tensor` |
| time | `gui-time` | a `core::time` with `format` and `timezone` |
| map | `gui-map`, `gui-map-layer`, `gui-map-source`, `gui-map-markers` | a `maplibre-gl` map with declarative sources, layers and markers; GeoJSON from `toFeatureCollection` |
| csv | `gui-csv-statistics`, `gui-csv-statistics2` | an `io::CsvStatistics` report |
| inputs | `gui-input` and one `gui-input-<type>` per GreyCat type, `gui-input-factory` | editors for values, see below |
| select, search, checkbox | `gui-select`, `gui-search-input`, `gui-multi-select-checkbox`, `gui-fn-select` | a select over arbitrary values, an `sl-input` with a search icon, multi-select as checkboxes, a picker of the ABI's functions |
| tabs, details, dialog, card | `gui-tabs`, `gui-tab`, `gui-panel`, `gui-details`, `gui-dialog`, `gui-card` | tabs built from `gui-tab` / `gui-panel` children on first connect; the last three extend the Shoelace element of the same name |
| layout, nav | `gui-layout`, `gui-nav` | an app shell with a responsive breakpoint; a navigation tree fed by a `nav.json` |
| auth | `gui-auth-gate`, `gui-sign-in`, `gui-sign-in-button` | a landing page handling the OAuth callback, the signed-in and the anonymous states over raw JSON calls, so it works before `init`; the sign-in form with OpenID provider discovery |
| admin | `gui-identities`, `gui-roles`, `gui-role-permissions`, `gui-files`, `gui-logs`, `gui-task` | user, role and permission management; a `/files/` browser at a `path`; the server log viewer; one task's state |
| factory | `gui-factory`, `gui-input-factory` | see below |

## Value display and the factory

`gui-value` is the common denominator: every component that shows a cell or
a field delegates to it, and `GuiFactory` decides which element renders a
given GreyCat type. `GuiFactory.global` maps a type fqn to a tag:

```ts
GuiFactory.global.set(gc.core.Table._type, 'my-table');   // render every Table with my element
```

A `<gui-factory>` placed in the DOM scopes its own mappings to its subtree,
falling back to the closest ancestor factory, then to the global one. The
factory is not reactive: a mapping change affects elements created after it.
`GuiFactory.defineFromClass` and `defineFromFn` register a custom element
and map it in one call.

## Inputs: editing GreyCat values

`gui-input` picks the editor for a value or a type: `gui-input-string`,
`-number`, `-bool`, `-time`, `-duration`, `-geo`, `-enum`, `-array`, `-map`,
`-object`, `-node`, `-node-time`, `-node-list`, `-node-index`, `-node-geo`,
`-fn`, `-fnptr`, `-field`, `-type`, `-any`, `-null`, `-unsupported`.
`gui-input-object` builds a form from the ABI type, so a `createFrom`-shaped
object comes out of it. `GuiInputFactory` maps types to input elements the
way `GuiFactory` maps them to renderers.

## Events

Components dispatch `CustomEvent` subclasses exported by the root, with the
payload in `detail`: `GuiInputEvent`, `GuiChangeEvent`, `GuiSubmitEvent`,
`GuiClickEvent` (`gui-click`), `GuiDblClickEvent`, `GuiUpdateEvent`, and
`GuiRenderEvent` (`render`, with the render time in ms). Tables add
`table-click` and `table-dblclick` with the row and column. In JSX the
handlers are `on<event>` props; see [jsx.md](jsx.md).

## Helpers exported by the root

- `modal.info / confirm / input / select`: promise-based dialogs on
  `sl-dialog`; `toast.notify / error / warning`: `sl-alert` notifications.
- `IndexedDbCache(name)`: a `gc.sdk.Cache` for `init`'s `cache` option.
- `putFileProgress(file, path, onProgress)`: upload with progress and `abort()`.
- `currentTheme()`, `toggleTheme()`; `getColors(el)`, `getHeatmapColors(el)`
  read the palette from CSS variables; `parseCssVar`, `processCssVars`.
- `highlight(gcl)`, `highlightGCL`, `highlightJSON`: syntax-colored nodes.
- `querySelectorAllWithShadow`, `throttle`, `debounce`, `svg`,
  `greycatValueType(value)`.
- `GuiElement`: the base class, open shadow root with adopted stylesheets
  from `static styles`, `addDisposable` and an abort signal released on
  disconnect; `attr()` decorator for properties that re-render on set;
  `css(text)` builds a `CSSStyleSheet`.

## Where the detail is

The package ships its sources: props, events and styles of a family are in
`lib/sdk_web/src/web/components/<family>/` (a `.tsx` per element, a
`register.ts`), and `index.md` files exist for `chart`, `heatmap`, `object`,
`table` and `value`. `src/web/init.ts` lists every class.
