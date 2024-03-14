// import { core } from '@greycat/sdk';

// const dateAndTimeStyles = `
// :host {
//   display: flex;
//   gap: calc(var(--spacing) * 0.5);
// }

// input {
//   width: 22px;
//   border-width: 0;
//   appearance: textfield;
//   outline: none;
//   background: transparent;
// }`;

// export class GuiDateTimeInput extends HTMLElement {
//   private _date: GuiDateInput;
//   private _time: GuiTimeInput;

//   constructor() {
//     super();

//     this._date = document.createElement('gui-date-input');
//     this._time = document.createElement('gui-time-input');
//   }

//   connectedCallback() {
//     const shadow = this.attachShadow({ mode: 'open' });
//     shadow.appendChild(
//       <style>{`
//       :host {
//         display: inline-flex;
//         gap: calc(var(--spacing) * 0.5);
//         background-color: var(--bg-1);
//         border: var(--border-width) solid var(--form-element-border-color);
//         padding: calc(var(--spacing) * 0.5);
//       }
//       `}</style>,
//     );
//     shadow.append(this._date, <>T</>, this._time);
//   }

//   disconnectedCallback() {
//     this.replaceChildren();
//   }

//   set value(value: Date | number | core.time | core.Date) {
//     let date: Date;
//     if (value instanceof Date) {
//       date = value;
//     } else if (value instanceof core.time) {
//       date = value.toDate();
//     } else if (value instanceof core.Date) {
//       date = value.toDate();
//     } else {
//       date = new Date(value);
//     }

//     this._date.value = date;
//     this._time.value = date;
//   }
// }

// export class GuiDateInput extends HTMLElement {
//   private _year: HTMLInputElement;
//   private _month: HTMLInputElement;
//   private _day: HTMLInputElement;

//   constructor() {
//     super();

//     this._year = (<input className="year" placeholder="yyyy" />) as HTMLInputElement;
//     this._month = (<input className="month" placeholder="mm" />) as HTMLInputElement;
//     this._day = (<input className="day" placeholder="dd" />) as HTMLInputElement;
//   }

//   connectedCallback() {
//     const shadow = this.attachShadow({ mode: 'open' });
//     shadow.appendChild(
//       <style>{`
//       ${dateAndTimeStyles}
    
//       input.year {
//         width: 40px;
//         text-align: right;
//       }
//       `}</style>,
//     );
//     shadow.appendChild(
//       <>
//         {this._year}:{this._month}:{this._day}
//       </>,
//     );
//   }

//   disconnectedCallback() {
//     this.replaceChildren();
//   }

//   set value(value: Date | number | core.time | core.Date) {
//     let date: Date;
//     if (value instanceof Date) {
//       date = value;
//     } else if (value instanceof core.time) {
//       date = value.toDate();
//     } else if (value instanceof core.Date) {
//       date = value.toDate();
//     } else {
//       date = new Date(value);
//     }

//     this._year.value = `${date.getFullYear()}`;
//     this._month.value = (date.getMonth() + 1).toString().padStart(2, '0');
//     this._day.value = date.getDate().toString().padStart(2, '0');
//   }
// }

// export class GuiTimeInput extends HTMLElement {
//   private _hour: HTMLInputElement;
//   private _minute: HTMLInputElement;
//   private _second: HTMLInputElement;

//   constructor() {
//     super();

//     this._hour = (<input className="hour" placeholder="HH" />) as HTMLInputElement;
//     this._minute = (<input className="minute" placeholder="MM" />) as HTMLInputElement;
//     this._second = (<input className="second" placeholder="ss" />) as HTMLInputElement;
//   }

//   connectedCallback() {
//     const shadow = this.attachShadow({ mode: 'open' });
//     shadow.appendChild(
//       <>
//         <style>{dateAndTimeStyles}</style>
//         {this._hour}:{this._minute}:{this._second}
//       </>,
//     );
//   }

//   disconnectedCallback() {
//     this.replaceChildren();
//   }

//   set value(value: Date | number | core.time | core.Date) {
//     let date: Date;
//     if (value instanceof Date) {
//       date = value;
//     } else if (value instanceof core.time) {
//       date = value.toDate();
//     } else if (value instanceof core.Date) {
//       date = value.toDate();
//     } else {
//       date = new Date(value);
//     }

//     this._hour.value = date.getHours().toString().padStart(2, '0');
//     this._minute.value = date.getMinutes().toString().padStart(2, '0');
//     this._second.value = date.getSeconds().toString().padStart(2, '0');
//   }
// }

// declare global {
//   interface HTMLElementTagNameMap {
//     'gui-datetime-input': GuiDateTimeInput;
//     'gui-date-input': GuiDateInput;
//     'gui-time-input': GuiTimeInput;
//   }

//   namespace JSX {
//     interface IntrinsicElements {
//       'gui-datetime-input': GreyCat.Element<GuiDateTimeInput>;
//       'gui-date-input': GreyCat.Element<GuiDateInput>;
//       'gui-time-input': GreyCat.Element<GuiTimeInput>;
//     }
//   }
// }

// if (!customElements.get('gui-datetime-input')) {
//   customElements.define('gui-datetime-input', GuiDateTimeInput);
// }
// if (!customElements.get('gui-date-input')) {
//   customElements.define('gui-date-input', GuiDateInput);
// }
// if (!customElements.get('gui-time-input')) {
//   customElements.define('gui-time-input', GuiTimeInput);
// }
