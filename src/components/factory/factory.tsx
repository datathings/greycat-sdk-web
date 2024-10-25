// import { GuiElement } from '../common.js';

// export type FnElement = (value: unknown) => Node;
// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export type ElementFactory<T> = keyof HTMLElementTagNameMap | (new (...args: any[]) => GuiElement<T>);
// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export type FactoryMappings = { [fqn: string]: ElementFactory<any> };

// export class GuiFactory extends HTMLElement {
//   private _mappings: { [fqn: string]: ElementFactory<unknown> | undefined } = {};
//   private _fallback: ElementFactory<unknown> = 'gui-object';

//   create(fqn: string, value?: unknown): Node {
//     const factory = this._mappings[fqn];
//     if (factory === undefined) {
//       return createElement(this._fallback, value);
//     }
//     return createElement(factory, value);
//   }

//   get mappings() {
//     return this._mappings as FactoryMappings;
//   }

//   set mappings(mappings: FactoryMappings) {
//     this._mappings = mappings;
//   }

//   get fallback() {
//     return this._fallback;
//   }

//   set fallback(factory: ElementFactory<unknown>) {
//     this._fallback = factory;
//   }
// }

// function createElement(factory: ElementFactory<unknown>, _value?: unknown): Node {
//   switch (typeof factory) {
//     case 'string': {
//       return document.createElement(factory);
//     }
//     case 'function': {
//       //
//     }
//   }
//   throw new Error('not implemented yet');
// }

// declare global {
//   interface HTMLElementTagNameMap {
//     'gui-factory': GuiFactory;
//   }

//   namespace GreyCat {
//     namespace JSX {
//       interface IntrinsicElements {
//         'gui-factory': GreyCat.Element<GuiFactory>;
//       }
//     }
//   }
// }

// if (!customElements.get('gui-factory')) {
//   customElements.define('gui-factory', GuiFactory);
// }
