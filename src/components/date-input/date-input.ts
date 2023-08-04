// import { core } from '@greycat/sdk';
// import { GuiTimezoneSelect } from '../timezone-select/timezone-select';
// import { parseISO } from './date-parser';

// type ChangeListener = (d: core.Date | undefined) => void;

// /**
//  * Creates a `core.Date` based on the input date time
//  */
// export class GuiDateInput extends HTMLElement {
//   private _timezone: core.TimeZone | undefined;
//   private _input: HTMLInputElement | undefined;
//   private _step: string | undefined = '1'; // default to seconds
//   private _tzSelect: GuiTimezoneSelect | undefined;
//   private _onChange: ChangeListener | undefined;
//   private _onInputChange = () => {
//     if (!this._input) {
//       return;
//     }
//     this._onChange?.(this.date);
//     this.dispatchEvent(new Event('change', { bubbles: true }));
//   };
//   private _onSelectChange = () => {
//     if (this._tzSelect) {
//       this._timezone = this._tzSelect.value;
//       this._onInputChange();
//     }
//   };

//   connectedCallback() {
//     this._input = document.createElement('input');
//     this._input.setAttribute('type', 'datetime-local');
//     if (this._step) {
//       this._input.setAttribute('step', this._step);
//     }
//     this._input.addEventListener('change', this._onInputChange);
//     this._input.addEventListener('input', this._onInputChange);
//     this.appendChild(this._input);

//     if (this.timezone) {
//       this._addTzSelect();
//     }
//   }

//   disconnectedCallback() {
//     if (!this._input) {
//       return;
//     }
//     this._input.removeEventListener('change', this._onInputChange);
//     this._input.removeEventListener('input', this._onInputChange);

//     if (this._tzSelect) {
//       this._removeTzSelect();
//     }
//   }

//   set onChange(cb: ChangeListener) {
//     this._onChange = cb;
//   }

//   get timezone(): boolean {
//     return !!this._tzSelect;
//   }

//   set timezone(b: boolean) {
//     if (b) {
//       this._addTzSelect();
//     } else {
//       this._removeTzSelect();
//     }
//   }

//   render(): void {
//     // noop
//   }

//   get date(): core.Date | undefined {
//     return this._input ? new core.Date({ iso: this._input.value, tz: this._timezone }) : undefined;
//   }

//   set date(d: core.Date | undefined) {
//     if (this._input) {
//       if (d) {
//         const iso = parseISO(d.iso);
//         if (iso) {
//           this._input.value = iso;
//         } else {
//           console.warn(
//             `Invalid ISO, got '${d.iso}' while expecting 'yyyy-MM-ddThh:mm:ss' with optional :ss and optional :SSSSSS`,
//           );
//         }
//       } else {
//         this._input.value = '';
//       }
//     }
//     this._timezone = d?.tz ?? core.TimeZone.UTC;
//   }

//   /**
//    * An helper to construct a `core.time` from the field of the current `core.Date`
//    */
//   get time(): core.time | undefined {
//     const d = this.date;
//     if (!d) {
//       return;
//     }
//     return new core.time({ iso: d.iso, tz: d.tz, epoch: 0, us: 0 });
//   }

//   get step() {
//     return this._step;
//   }

//   set step(s: string | undefined) {
//     this._step = s;
//   }

//   private _addTzSelect() {
//     if (!this._tzSelect) {
//       this._tzSelect = document.createElement('gui-timezone-select');
//       this._tzSelect.addEventListener('change', this._onSelectChange);
//       this.appendChild(this._tzSelect);
//     }
//   }

//   private _removeTzSelect() {
//     if (this._tzSelect) {
//       this._tzSelect.removeEventListener('change', this._onSelectChange);
//       this._tzSelect.remove();
//       this._tzSelect = undefined;
//     }
//   }
// }

// declare global {
//   interface Window {
//     GuiDateInput: typeof GuiDateInput;
//   }

//   interface HTMLElementTagNameMap {
//     'gui-date-input': GuiDateInput;
//   }

//   namespace JSX {
//     interface IntrinsicElements {
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       'gui-date-input': any;
//     }
//   }
// }

// if (!window.customElements.get('gui-date-input')) {
//   window.GuiDateInput = GuiDateInput;
//   window.customElements.define('gui-date-input', GuiDateInput);
// }
