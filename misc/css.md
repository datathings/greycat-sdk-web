# CSS

## Usage
`@greycat/web` comes with 2 stylesheets:
- `greycat.base.css` minimalist styles for greycat and its components
- `greycat.css` the complete style theme for GreyCat

To import GreyCat CSS from your `style.css` entrypoint do:
::: code-group
```css [style.css]
@import '@greycat/web/css/greycat.css';
```
:::

## Themes
By default, the styles are using the **dark** theme. In order to change that default behavior set `data-theme="light"` on `<html>`:
::: code-group
```html [index.html]
<!DOCTYPE html>
<html lang="en" data-theme="light">
  <!-- ... -->
</html>
```
:::

There are only 2 available themes:
- dark
- light

## Fonts
By default, GreyCat comes with `Open Sans` defined as the `--font-family`:
::: code-group
```css [greycat.css]
:root {
  --font-family: 'Open Sans', sans-serif;
}
```
:::

::: warning
That does not mean that it will load the `.ttf` file for you.
If you want to have it use the `Open Sans` font, you'll have to configure the `@font-face` in your stylesheet.
:::

### @font-face
```css
@font-face {
  font-family: 'Open Sans';
  font-weight: normal;
  src: url('@greycat/web/fonts/OpenSans-Regular.ttf');
}

@font-face {
  font-family: 'Open Sans';
  font-weight: bold;
  src: url('@greycat/web/fonts/OpenSans-Bold.ttf');
}

@font-face {
  font-family: 'Open Sans';
  font-style: italic;
  src: url('@greycat/web/fonts/OpenSans-Italic.ttf');
}
```

> Changing the font becomes a matter a redefining `--font-family` and the appropriate `@font-face` for that font.
