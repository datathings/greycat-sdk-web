# JSX/TSX Runtime

*This is **not** a reactive runtime.*

It is JSX/TSX factory that produces `document.createElement` statements.

## Configuration
`@greycat/web` provides a full-fledged JSX runtime by default. In order to use it you need to tell
TypeScript how to transpile your JSX/TSX:

::: code-group
```json [tsconfig.json]
{
  // ...
  "compilerOptions": {
    // ...
    "jsx": "react-jsx",
    "jsxImportSource": "@greycat/web"
    // ...
  },
  // ...
}
```
:::

> The same logic would apply for other transpilers such as Babel.

## Example

Then in your `.tsx` files, you'll get a `JSX.Element` back from your JSX code:
::: code-group
```tsx [WrappedTable.tsx]
export function WrappedTable(table: core.Table) {
  return (
    <article>
      <header>My Table</header>
      <div className="container-fluid">
        <gui-table table={table} />
      </div>
    </article>
  );
}
```
```tsx [index.ts]
import { WrappedTable } from './WrappedTable';

const table = await fetchTable();
document.body.appendChild(WrappedTable(table));
```
:::

When using JSX/TSX you get exactly the same behavior as if you had written the previous snippet like so:

::: code-group
```tsx [WrappedTable.ts]
export function WrappedTable(table: core.Table) {
  const article = document.createElement('article');

  const header = document.createElement('header');
  header.textContent = 'My Table';

  const div = document.createElement('div');
  div.classList.add('container-fluid');

  const tableEl = document.createElement('gui-table');
  tableEl.table = table;

  article.appendChild(header);
  header.appendChild(div);
  div.appendChild(tableEl);

  return article;
}
```
```tsx [index.ts]
import { WrappedTable } from './WrappedTable';

const table = await fetchTable();
document.body.appendChild(WrappedTable(table));
```
:::

## Trade-offs
Currently, the trade-offs for the JSX/TSX syntax are:
 - slighty more GC work due to the way TypeScript transpiles properties into inlined objects (note that, by default, React.js for instance, always gets this incurred cost)
 - weak typing integration that forces you to cast to the appropriate root element type

::: code-group
```tsx [inferred.tsx]
const div = <div />; // JSX.Element !== HTMLDivElement
```
```tsx [casted.tsx]
const div = <div /> as HTMLDivElement;
```
:::

## Working with React.js
When trying to use `@greycat/web` JSX runtime alongside **React.js** some TypeScript fine-tuning should be made so that
the two different global JSX namespaces do not conflict with each other.

::: info
We provide an already configured [template that work with both](https://github.com/datathings/greycat-template-react).
:::

Mainly, the fine-tuning occurs in `tsconfig.json` where we need to specify the list of types included in the current TypeScript compiler context.

::: code-group
```json [tsconfig.json]
{
  // ...
  "compilerOptions": {
    // ...
    "jsx": "react-jsx",
    "jsxImportSource": "@greycat/web",
    "types": ["@greycat/web"],
    // ...
  },
  "exclude": ["your/react/dir"]
  // ...
}
```
```json [your/react/dir/tsconfig.json]
{
  // ...
  "compilerOptions": {
    // ...
    "jsx": "react-jsx",
    "jsxImportSource": "react",
    "types": ["react"],
    // ...
  },
  // ...
}
```
:::

This way TypeScript will understand that JSX within `your/react/dir` is `React`-related, while the rest will be `@greycat/web`-related.

::: info
Read [Using React.js](using-react.md) for more information about using React.js with `@greycat/web`.
:::