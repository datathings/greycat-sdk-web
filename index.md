# Introduction

`@greycat/web` features:
- Built on top of the Web Components standards.
- Tight integration with GreyCat `std` library.
- Tiny CSS library
- Opt-in "per request" cache leveraging [IndexedDb](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API).

## How it works
When importing `@greycat/web` every Web Component that it defines will then be registered globally
as [customElements](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry). 

Because some of those components communicate with GreyCat internally we need to tell them where
to find the current instance. For this, the `@greycat/sdk` and more generally `@greycat/web` leverages global scope.
All the functions and components that needs to communicate directly with GreyCat will look for a GreyCat instance at `globalThis.greycat.default`.

This implies that the only "initialization" that is needed is the following:

```ts
import { GreyCat, IndexedDbCache } from '@greycat/web';

globalThis.greycat.default = await GreyCat.init({
  // 'cache' is optional
  // if present, it will cache all requests/responses
  // directly in the browser
  cache: new IndexedDbCache('greycat.default', 1),
});

// here you can safely use all of @greycat/web
```
