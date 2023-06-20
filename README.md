# @greycat/ui

## Build
```sh
npm run build
```
Produces:
- `bundle/`:
  - `greycat.ui.js`: minified bundle registering GreyCat UI WebComponents
  - `greycat.ui.css`: an all-in-one CSS style that complies with GreyCat's Brand guidelines. Works class-less and improves on it for the WebComponents.
- `esm/`
  - ES2020 transpiled output with TypeScript declarations
- `fonts/`
  - Raleway TTF file (GreyCat's default font)
- `custom-elements.json`: WebComponents manifest