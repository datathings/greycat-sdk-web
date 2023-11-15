# `<gui-value />`
Displays any value using `@greycat/sdk`'s `utils.stringify()` function.

> This is essentially a way to have a one-liner string for any kind of value.

## Usage
```ts
const value = document.createElement('gui-value');
value.value = "Hello, GreyCat!";
```

## ValueProps
```ts
export interface GuiValueProps {
  value: unknown;
  /** overrides the display with this `text` */
  text?: string;
  /** whether or not to display the value as a link */
  linkify: boolean | ((value: unknown) => boolean);
  /** best-effort to make it short */
  tiny: boolean;
  /** overrides references name */
  name: string | undefined;
  dateFmt: Intl.DateTimeFormat | undefined;
  numFmt: Intl.NumberFormat | undefined;
  /** @deprecated don't use this */
  raw: boolean;
  /** optional user-defined data */
  data?: unknown;
  /** callback used when `linkify` is `true` */
  onClick: ClickHandler<unknown>;
}
```