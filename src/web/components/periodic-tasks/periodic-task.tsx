// import { GuiInputElement } from '../inputs';

// export class GuiPeriodicTaskInput extends GuiInputElement<gc.runtime.PeriodicTask | null> {
//   private _value: gc.runtime.PeriodicTask | null = null;

//   constructor() {
//     super();

//     this.shadowRoot.appendChild();
//   }

//   get value(): gc.runtime.PeriodicTask | null {
//     return this._value;
//   }

//   set value(value: gc.runtime.PeriodicTask | null | undefined) {
//     if (value === undefined || value === null) {
//       this._value = null;
//     } else {
//       this._value = value;
//     }
//     this.update();
//   }

//   override update(): void {
//     super.update();
//     if (!this.isConnected) {
//       return;
//     }

//     // TODO
//   }
// }

// declare global {
//   interface HTMLElementTagNameMap {
//     'gui-periodic-task-input': GuiPeriodicTaskInput;
//   }

//   namespace GreyCat {
//     namespace JSX {
//       interface IntrinsicElements {
//         'gui-periodic-task-input': GreyCat.Element<GuiPeriodicTaskInput>;
//       }
//     }
//   }
// }
