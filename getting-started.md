# Getting Started

## Install

Add the dependency to your project:
```sh
pnpm install https://get.greycat.io/files/sdk/web/6.4/6.4.10-dev.tgz
```
> Update with the latest [version](https://get.greycat.io/files/sdk/web/dev/latest)

## Minimal setup
::: code-group
```ts [src/index.ts]
import { GreyCat } from '@greycat/web';
import '@greycat/web/css/greycat.css';

globalThis.greycat.default = await GreyCat.init();
```
:::

## Templates
We provide two different Git repositories template to get started:
 - [template/web](https://github.com/datathings/greycat-template-web): HTML/CSS/TypeScript leveraging Vite.js
 - [template/react](https://github.com/datathings/greycat-template-react): contains `template/web` plus a `React` entry-point

::: code-group
```sh [Web]
git clone git@hub.datathings.com:greycat/template/web.git template-web
```

```sh [React]
git clone git@hub.datathings.com:greycat/template/react.git template-react
```
:::


## Vite.js
A minimal example:

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
  <div id="app"></div>
  <script type="module" src="./src/index.ts"></script>
</body>

</html>
```

```ts [src/index.ts]
import { GreyCat } from '@greycat/web';
// for the default styling
import '@greycat/web/css/greycat.css';

const app = document.getElementById('app')!;

try {
  globalThis.greycat.default = await GreyCat.init({
    cache: new IndexedDbCache('greycat.default'),
  });

  const el = document.querySelector('gui-value')!;
  app.appendChild(el);

  el.value = await greycat.call('project::hello', ['world!']);
} catch (err) {
  app.textContent = 'Something went wrong';
}
```

```gcl [project.gcl]
@expose
fn hello(name: String): String {
  return "Hello, ${name}";
}
```


```json [package.json]
{
  "name": "greycat-example",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "devDependencies": {
    "vite": "4.4.9",
    "@greycat/web": "https://get.greycat.io/files/sdk/web/6.4/6.4.10-dev.tgz",
    "typescript": "5.2.2"
  }
}
```
:::

Start this with:

::: code-group
```sh [Terminal 1]
greycat serve --user=1
```

```sh [Terminal 2]
pnpm dev
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
  <link rel="stylesheet" href="https://get.greycat.io/files/sdk/web/dev/6.4/6.4.10-dev.css">
  <script src="https://get.greycat.io/files/sdk/web/dev/6.4/6.4.10-dev.js"></script>
  <title>Hello GreyCat</title>
</head>

<body>
  <div id="app"></div>

  <script type="module">
    const app = document.getElementById('app');

    try {
      greycat.default = await greycat.GreyCat.init();

      const el = document.querySelector('gui-value');
      app.appendChild(el);

      el.value = await greycat.default.call('project::hello', ['world!']);
    } catch (err) {
      app.textContent = 'Something went wrong';
    }
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