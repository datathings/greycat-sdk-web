# Get Started

Add the dependency to your project:
```sh
pnpm install @greycat/ui
```

## ESM

Then import `@greycat/ui` in your project.
```ts
import '@greycat/ui';
// for the default styling
import '@greycat/ui/dist/bundle/greycat.ui.css';
```

::: info
Make sure to import `@greycat/ui` in the entrypoint of your application to ensure the components are all registered before you actually use them.
:::

## Bundle

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="path/to/greycat.ui.css">
  <script src="path/to/greycat.ui.js"></script>
  <title>Hello World</title>
</head>

<body>
  <gui-value></gui-value>

  <script type="module">
    const el = document.querySelector('gui-value');
    el.value = 'Hello, world';
  </script>
</body>

</html>
```
