# Theme

## CSS Variables
Theming is heavily centered around the [`:root`](https://developer.mozilla.org/en-US/docs/Web/CSS/:root) selector and [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties).

### Common
```css
:root {
  --font-family: 'Open Sans', sans-serif;
  --font-size: 14px;
  --font-size-sm: 14px;
  --font-size-md: 14px;
  --font-size-lg: 14px;
  --font-size-xl: 14px;
  --font-weight: normal;

  /* keep 'spacing' an even value */
  --spacing: 6px;

  --form-element-active-border-color: var(--primary);
  --form-element-spacing-vertical: calc(var(--spacing) / 2);
  --form-element-spacing-horizontal: var(--spacing);
  --form-element-background-color: var(--bg-1);
  --form-element-disabled-background-color: var(--bg-0);
  --form-element-disabled-border-color: #415462;
  --form-element-disabled-opacity: 0.3;

  --switch-color: var(--primary-inverse);
  --switch-checked-background-color: var(--primary);

  --nav-link-spacing-vertical: calc(var(--spacing) / 2);
  --nav-link-spacing-horizontal: var(--spacing);
  --nav-element-spacing-vertical: calc(var(--spacing) / 2);
  --nav-element-spacing-horizontal: var(--spacing);

  --card-background-color: var(--bg-0);
  --card-sectionning-background-color: var(--bg-1);

  --code-color: var(--primary);
  --code-background-color: var(--bg-1);

  --table-border-color: rgba(var(--text-2), 0.2);

  --block-spacing-vertical: var(--spacing);
  --block-spacing-horizontal: var(--spacing);

  --accordion-border-color: rgba(var(--text-2), 0.2);
  --accordion-open-summary-color: var(--primary);

  --dropdown-background-color: var(--bg-1);
  --dropdown-hover-background-color: var(--bg-0);

  --modal-overlay-background-color: rgba(var(--base-2), 0.35);

  --grid-spacing-vertical: var(--spacing);

  --typography-spacing-vertical: 25px;
}
```

### Dark
```css
/* Dark colors (default) */
:root,
:root:not([data-theme]),
:root:not([data-theme='light']) {
  color-scheme: dark;

  --primary: rgb(var(--accent-0));
  --primary-hover: rgb(148, 224, 17);
  --primary-focus: rgba(205, 249, 127, 0.2);
  --primary-inverse: rgb(var(--text-inverse));

  --secondary: #5684f1;
  --secondary-hover: #3b6ee4;
  --secondary-focus: rgba(205, 249, 127, 0.2);
  --secondary-inverse: #fff;

  --bg-0: #101010;
  --bg-1: #181818;
  --bg-2: #252525;

  --color: #eaeaea;
  --background-color: var(--bg-2);

  --text-0: 255, 255, 255;
  --text-1: 215, 215, 215;
  --text-2: 156, 160, 164;
  --text-inverse: 0, 0, 0;

  --base-0: 20, 20, 20;
  --base-1: 40, 40, 40;
  --base-2: 61, 61, 61;

  --accent-0: 192, 248, 95;
  --accent-1: 198, 249, 111;
  --accent-2: 205, 249, 127;

  --neutral-0: 119, 119, 122;
  --neutral-1: 116, 124, 133;
  --neutral-2: 132, 138, 147;

  --color-0: #c0f85f;
  --color-1: #cb9cf8;
  --color-2: #779ef7;
  --color-3: #37c43e;
  --color-4: #5737c4;
  --color-5: #8c1fab;
  --color-6: #4fc0e8;
  --color-7: #f7458e;
  --color-8: #fe7e6d;
  --color-9: #ffe35b;
  --color-10: #fc7db7;
  --color-11: #2237c4;
  --color-12: #3b254c;

  --color-error: #f74318;

  --border-radius: 4px;
  --shadow: 0px 1px 1px 0px rgb(var(--base-1));
}
```

### Light
```css
/* Light colors */
:root[data-theme='light'] {
  color-scheme: light;

  --primary: #37c43e;
  --primary-hover: #4fd24a;
  --primary-focus: rgba(205, 249, 127, 0.6);
  --primary-inverse: rgb(var(--text-inverse));

  --secondary: #5684f1;
  --secondary-hover: #3b6ee4;
  --secondary-focus: rgba(205, 249, 127, 0.2);
  --secondary-inverse: #fff;

  --bg-0: #efefef;
  --bg-1: #fafafa;
  --bg-2: #fff;

  --color: #151515;
  --background-color: var(--bg-2);

  --text-0: 0, 0, 0;
  --text-1: 20, 20, 20;
  --text-2: 40, 40, 40;
  --text-inverse: 255, 255, 255;

  --base-0: 255, 255, 255;
  --base-1: 240, 240, 240;
  --base-2: 224, 226, 228;

  --accent-0: 55, 196, 62;
  --accent-1: 178, 246, 58;
  --accent-2: 192, 248, 95;

  --neutral-0: 119, 119, 122;
  --neutral-1: 116, 124, 133;
  --neutral-2: 132, 138, 147;

  --color-0: #a2e163;
  --color-5: #d55ef7;
  --color-7: #d74186;
  --color-8: #fe7d3e;
  --color-9: #ffc645;
  --color-10: #ea70bf;
}
```

## Toggle theme
Changing between `'light'` and `'dark'` theme is a matter of updating `html[data-theme]`:
```js
document.documentElement.setAttribute('data-theme', 'light');
```

### Local storage
An example of persistent storage of the theme choice to the localStorage:
```js
function loadTheme(defaultTheme = 'dark', key = 'app.theme') {
  let theme = localStorage.getItem(key);
  if (!theme) {
    // if theme is not stored in local storage, load from `<html />`
    // and fallback to `defaultTheme` if none
    theme = document.documentElement.getAttribute('data-theme')
      ?? defaultTheme;
    // store theme to local storage
    localStorage.setItem(key, theme);
  }
  // update `<html />` theme
  document.documentElement.setAttribute('data-theme', theme);
}
```