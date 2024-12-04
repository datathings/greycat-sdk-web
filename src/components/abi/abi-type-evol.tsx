// import {
//   registerCustomElement,
//   AbiTypeEvol,
//   GuiElement,
//   attr,
//   Signal,
//   AbiType,
// } from '../../exports.js';

// export class GuiAbiTypeEvol extends GuiElement<AbiTypeEvol | undefined> {
//   @attr()
//   value: AbiTypeEvol | undefined;
//   private _header = new Signal<string>('');
//   private _types = new Signal<AbiType[]>([]);

//   override connectedCallback(): void {
//     this.replaceChildren(
//       <sl-card>
//         <header slot="header">{this._header}</header>
//         <div className="row">
//           {this._types.map((ty, i, arr) => {
//             if (i < arr.length - 1) {
//               return (
//                 <>
//                   <gui-abi-type value={ty} prev={arr[i - 1]} />
//                   <span style={{ minWidth: 'fit-content', alignSelf: 'center' }}>➡</span>
//                 </>
//               );
//             }
//             return <gui-abi-type value={ty} prev={arr[i - 1]} />;
//           })}
//         </div>
//       </sl-card>,
//     );
//     super.connectedCallback();
//   }

//   override update(): void {
//     if (this.value) {
//       this._header.set(
//         `[${this.value.head.data.is_enum ? 'enum' : 'type'}] ${this.value.head.data.name} (${this.value.size} updates)`,
//       );
//       this._types.set(Array.from(this.value.forward()).map((n) => n.data));
//     } else {
//       this._header.set('');
//       this._types.set([]);
//     }
//   }
// }

// declare global {
//   interface HTMLElementTagNameMap {
//     'gui-abi-type-evol': GuiAbiTypeEvol;
//   }

//   namespace GreyCat {
//     namespace JSX {
//       interface IntrinsicElements {
//         'gui-abi-type-evol': GreyCat.Element<GuiAbiTypeEvol>;
//       }
//     }
//   }
// }

// registerCustomElement('gui-abi-type-evol', GuiAbiTypeEvol);
