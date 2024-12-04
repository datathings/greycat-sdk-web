// import { GuiElement, Signal, attr, customElement } from '../../exports.js';
// import { AbiType } from '../../exports.js';

// @customElement('gui-abi-type')
// export class GuiAbiType extends GuiElement<AbiType | undefined> {
//   private _meta: Signal<Record<string, unknown>>;
//   private _fields: Signal<Record<string, unknown>>;

//   @attr()
//   value: AbiType | undefined;

//   @attr()
//   prev: AbiType | undefined;

//   constructor() {
//     super();

//     this._meta = new Signal({});
//     this._fields = new Signal({});
//   }

//   override connectedCallback(): void {
//     this.replaceChildren(
//       <div className="list">
//         <gui-object header="Type" value={this._meta} />
//         <gui-object header="Fields" value={this._fields} />
//       </div>,
//     );
//     super.connectedCallback();
//   }

//   override update(): void {
//     console.log('AbiType.value', this.value, this.prev);
//     if (this.value) {
//       const ty = this.value;
//       this._meta.update((o) => {
//         o.id = ty.offset;
//         o.mapped_id = ty.mapped_type_off;
//         o.nb_fields = ty.attrs.length;
//         return o;
//       });
//       this._fields.update((o) => {
//         if (ty.is_enum) {
//           for (let i = 0; i < ty.attrs.length; i++) {
//             const attr = ty.attrs[i];
//             o[attr.name] = attr.mapped_att_offset;
//           }
//         } else {
//           for (const attr of ty.attrs) {
//             o[attr.name] = attr.nullable
//               ? `${ty.abi.types[attr.abi_type].name}?`
//               : ty.abi.types[attr.abi_type].name;
//           }
//         }
//         return o;
//       });
//     } else {
//       this._meta.set({});
//     }
//   }
// }

// declare global {
//   interface HTMLElementTagNameMap {
//     'gui-abi-type': GuiAbiType;
//   }

//   namespace GreyCat {
//     namespace JSX {
//       interface IntrinsicElements {
//         'gui-abi-type': GreyCat.Element<GuiAbiType>;
//       }
//     }
//   }
// }
