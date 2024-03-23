# @greycat/web

[Documentation](https://datathings.github.io/greycat-sdk-web/)

## Install
Add the dependency to your project:
```sh
pnpm install https://get.greycat.io/files/sdk/web/6.4/6.4.10-dev.tgz
```
> Update with the latest [version](https://get.greycat.io/files/sdk/web/dev/latest)

## Usage
```ts [src/index.ts]
import { GreyCat } from '@greycat/web';
import '@greycat/web/css/greycat.css';

globalThis.greycat.default = await GreyCat.init();
```

## Dev
Start the GreyCat demo server:
```sh
cd pages
greycat serve
```

Start the Web dev server:
```sh
pnpm dev
```
Open your browser at `http://localhost:5173/`

## v7 Breaking changes:
- Removed `gui-enum-select`, replaced with `gui-input-enum`
- `gui-searchable-select` no longer trigger `'gui-searchable-change'` events, replaced with the new `'gui-change'` event