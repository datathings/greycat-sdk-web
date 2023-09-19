---
potato: import.meta.env.POTATO
---
# Getting Started

## Install

Add the dependency to your project:
```sh
pnpm install https://get.greycat.io/files/sdk/web/6.1/6.1.140-dev.tgz
```

> Update with the latest [version](https://get.greycat.io/files/ui/dev/latest)

## ESM / Bundler
A minimal Vite example:

::: code-group

```html [index.html]
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hello GreyCat</title>
</head>

<body>
  <gui-value></gui-value>
  <script type="module" src="./src/main.ts"></script>
</body>

</html>
```

```ts [src/main.ts]
import { GreyCat } from '@greycat/sdk';

globalThis.greycat.default = await GreyCat.init({
  url: new URL('http://localhost:8080'),
});

// this will make sure '@greycat/ui' is imported AFTER @greycat/sdk
// so that all the component can rely on globalThis.greycat.default
import('./index');
```

```ts [src/index.ts]
import '@greycat/ui';
// for the default styling
import '@greycat/ui/dist/bundle/greycat.ui.css';

const greycat = globalThis.greycat.default;

const el = document.querySelector('gui-value')!;
el.value = await greycat.call('project::hello', ['world!']);
```

```gcl [project.gcl]
@expose
fn hello(name: String): String {
  return "Hello, ${name}";
}
```

:::

::: warning
Failing to initialize `globalThis.greycat.default` prior to importing `@greycat/ui` will lead to unexpected issues
in regards to how some of the WebComponent leverage the default GreyCat instance.
:::


::: code-group

```sh [Terminal 1]
greycat serve --user=1
```

```sh [Terminal 2]
pnpm vite
```

:::

## Vanilla

::: code-group

```html [index.html]
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://get.greycat.io/files/ui/dev/6.1/6.1.140-dev.css">
  <script src="https://get.greycat.io/files/ui/dev/6.1/6.1.136-dev.js"></script>
  <title>Hello GreyCat</title>
</head>

<body>
  <gui-value></gui-value>

  <script type="module">
    const { GreyCat } = globalThis.greycat.sdk;
    const greycat = await GreyCat.init();

    const el = document.querySelector('gui-value');
    el.value = await greycat.call('project::hello', ['world!']);
  </script>
</body>

</html>
```
```gcl [project.gcl]
@expose
fn hello(name: String): String {
  return "Hello, ${name}";
}
```
:::