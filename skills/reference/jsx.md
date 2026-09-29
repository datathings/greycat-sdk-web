# JSX: real DOM elements, no virtual DOM

## Setup

```json
{ "compilerOptions": { "jsx": "react-jsx", "jsxImportSource": "@greycat/web" } }
```

`@greycat/web/jsx-runtime` turns a JSX expression into the DOM element
itself: `<div />` is an `HTMLDivElement`, `<gui-table />` is a `GuiTable`.
There is no render loop, no diffing and no re-render: assign properties to
update, append to mount. The root `@greycat/web` re-exports the runtime; a
file only needs the `jsx` settings above, not an import, and `createElement`
is available for calls without JSX.

## What a prop does

Props map onto the created element as follows:

| Prop | Effect |
| --- | --- |
| `className` | a string, an array, or `{ name: boolean }`, applied to `classList` |
| `style` | a string for `cssText`, or an object where keys starting with `--` set custom properties |
| `attr:<name>` | `setAttribute(name, String(value))`, for attributes that are not properties |
| `on<event>` | `addEventListener(event, handler)`; `onclick`, `oninput`, and a component's own events such as `ontable-click` |
| `$ref` | called once with the element right after creation, before it is in the DOM |
| `slot`, `part`, `exportparts` | `el.slot`, `el.part.add(...)`, the `exportparts` attribute |
| anything else | assigned as a property, but only if `key in element`: `value={table}` is `el.value = table`; an unknown key is dropped silently |

A prop whose value is `null` or `undefined` is skipped, so nothing is removed
through JSX. Children may be elements, strings, numbers, arrays, node lists,
or `null`; `<></>` is a `DocumentFragment`. An element that implements
`setAttrs(props)` receives all props in one call, which is how the `gui-*`
components batch their updates.

```tsx
const table = (
  <gui-table
    value={await gc.project.orders()}
    className={{ compact: dense }}
    style={{ '--gui-table-min-height': '200px' }}
    ontable-click={(ev) => open(ev.detail.row)}
    $ref={(el) => (this.table = el)}
  />
) as GuiTable;
document.body.appendChild(table);
```

## Typing your own elements

Intrinsic elements are declared under `GreyCat.JSX.IntrinsicElements`, one
entry per tag, typed with `GreyCat.Element<T, EventMap>`: the writable
properties of `T`, minus methods, plus the props above, plus one `on<name>`
handler per entry of `EventMap`. Add a custom element like this:

```ts
declare global {
  interface HTMLElementTagNameMap { 'my-panel': MyPanel; }
  namespace GreyCat.JSX {
    interface IntrinsicElements {
      'my-panel': GreyCat.Element<MyPanel, HTMLElementEventMap & { 'my-change': CustomEvent<number> }>;
    }
  }
}
```

The same declaration is what makes `document.createElement('my-panel')`
return `MyPanel`.

## Pitfalls

- A JSX expression runs once. Wrapping it in a function does not make it
  reactive; keep a reference and set properties, or rebuild and replace.
- `class` is not a prop; use `className`. An attribute with no matching
  property, such as `for` on a label or `data-*`, needs the `attr:` prefix,
  otherwise it is dropped.
- Boolean attributes of Shoelace and `gui-*` elements are properties:
  `<sl-button disabled>` sets `el.disabled = true`, which is what they read.
- Event names keep their case and dashes: `ontable-click`, `onsl-change`.
