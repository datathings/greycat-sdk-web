# Using React.js

## React.js and Web Components
> This is an excerpt from [lit.dev](https://lit.dev/docs/frameworks/react/).

> React can already render web components, since custom elements are just HTML elements and React knows how to render HTML. But React makes some assumptions about HTML elements that don't always hold for custom elements, and it treats lower-case tag names differently from upper-case component names in ways that can make custom elements harder than necessary to use.
> 
> For instance, React assumes that all JSX properties map to HTML element attributes, and provides no way to set properties. This makes it difficult to pass complex data (like objects, arrays, or functions) to web components. React also assumes that all DOM events have corresponding "event properties" (`onclick`, `onmousemove`, etc), and uses those instead of calling `addEventListener()`. This means that to properly use more complex web components you often have to use `ref()` and imperative code. (For more information on the limitations of React's web component integration, see [Custom Elements Everywhere](https://custom-elements-everywhere.com/libraries/react/results/results.html).)
> 
> React is working on fixes to these issues, but in the meantime, our wrappers take care of setting properties and listening to events for you.

## WCWrapper
In order to use Web Component within **React.js** we need to wrap it inside an actual React Component.
Therefore, to ease development, we provide a thin wrapper named `WCWrapper` that does just this:

### React Component
You can copy/paste this and add it to your project in order to use `@greycat/web` Web Components
directly in React.

```tsx
import React from 'react';

export interface WCWrapperProps<K> {
  /** the name of the WebComponent element */
  tag: K;
}

function WCWrapperInner<K extends keyof HTMLElementTagNameMap>(
  { tag, ...props }: WCWrapperProps<K>,
  ref: React.ForwardedRef<HTMLElementTagNameMap[K]>
) {
  const wcRef = React.useRef<HTMLElementTagNameMap[K] | null>(null);

  React.useEffect(() => {
    const r = ref ?? wcRef;
    if (r && 'current' in r && r.current !== null) {
      if ('setAttrs' in r.current && typeof r.current.setAttrs === 'function') {
        r.current.setAttrs(props); // batch rendering in 1 method call
        return;
      }

      for (const [key, value] of Object.entries(props)) {
        // properties take precedence over attributes
        if (key in r.current) {
          // the comparison is '!==' which only works for primitives & references
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          if ((r.current as any)[key] !== value) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (r.current as any)[key] = value;
          }
        }
      }
    }
  }, [props, ref, wcRef]);

  return React.createElement(tag, { ref: ref ?? wcRef });
}

export const WCWrapper = React.memo(React.forwardRef(WCWrapperInner)) as <
  K extends keyof HTMLElementTagNameMap
>(
  props: WCWrapperProps<K> &
    React.RefAttributes<HTMLElementTagNameMap[K]> &
    Omit<Partial<HTMLElementTagNameMap[K]>, 'setAttrs'>
) => React.ReactElement;
```

### Usage
::: code-group
```tsx [src/App.tsx]
import { core } from '@greycat/web';
import { WCWrapper } from './components/WCWrapper';

export default function App({ table }: { table: core.Table }) {
  return <WCWrapper tag="gui-table" table={table} />;
}
```

```tsx [src/components/WCWrapper.tsx]
import React from 'react';

export interface WCWrapperProps<K> {
  /** the name of the WebComponent element */
  tag: K;
}

function WCWrapperInner<K extends keyof HTMLElementTagNameMap>(
  { tag, ...props }: WCWrapperProps<K>,
  ref: React.ForwardedRef<HTMLElementTagNameMap[K]>
) {
  const wcRef = React.useRef<HTMLElementTagNameMap[K] | null>(null);

  React.useEffect(() => {
    const r = ref ?? wcRef;
    if (r && 'current' in r && r.current !== null) {
      if ('setAttrs' in r.current && typeof r.current.setAttrs === 'function') {
        r.current.setAttrs(props); // batch rendering in 1 method call
        return;
      }

      for (const [key, value] of Object.entries(props)) {
        // properties take precedence over attributes
        if (key in r.current) {
          // the comparison is '!==' which only works for primitives & references
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          if ((r.current as any)[key] !== value) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (r.current as any)[key] = value;
          }
        }
      }
    }
  }, [props, ref, wcRef]);

  return React.createElement(tag, { ref: ref ?? wcRef });
}

export const WCWrapper = React.memo(React.forwardRef(WCWrapperInner)) as <
  K extends keyof HTMLElementTagNameMap
>(
  props: WCWrapperProps<K> &
    React.RefAttributes<HTMLElementTagNameMap[K]> &
    Omit<Partial<HTMLElementTagNameMap[K]>, 'setAttrs'>
) => React.ReactElement;
```
:::

> You should get a good DX thanks to TypeScript and the fact that `@greycat/web` components
> do define there `JSX` interfaces globally.

> In the above example, `table` should be appropriately typed as `core.Table<any> | undefined`