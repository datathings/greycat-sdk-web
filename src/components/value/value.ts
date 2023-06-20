import { stringify } from '@greycat/utils';
import { getGlobalDateTimeFormat, getGlobalNumberFormat } from '../../globals';
import { Disposable } from '../../internals';

export type ClickHandler<T = unknown> = (e: MouseEvent, value: T, text: string) => void;

const NOOP = () => void 0;
export interface GuiValueProps {
  value: unknown;
  text?: string;
  linkify: boolean;
  tiny: boolean;
  name: string | undefined;
  dateFmt: Intl.DateTimeFormat | undefined;
  numFmt: Intl.NumberFormat | undefined;
  raw: boolean;
  onClick: ClickHandler<unknown>;
}

/**
 * Tries to give a simple textual representation of any given GreyCat (or vanilla js) value
 */
export class GuiValue extends HTMLElement implements GuiValueProps {
  private _dateFmt: Intl.DateTimeFormat | undefined;
  private _numFmt: Intl.NumberFormat | undefined;
  private _value: unknown;
  private _name: string | undefined;
  private _linkify = false;
  private _raw = false;
  private _tiny = false;
  private _text: string | undefined;
  private _onClick: ClickHandler = NOOP;
  private _disposeClickHandler: Disposable | undefined;

  get value(): unknown {
    return this._value;
  }

  set value(value: unknown) {
    if (this._value === value) {
      // prevent unnecessary updates
      return;
    }

    this._value = value;
    this.render();
  }

  get raw(): boolean {
    return this._raw;
  }

  set raw(b: boolean) {
    this._raw = b;
    this.render();
  }

  get linkify(): boolean {
    return this._linkify;
  }

  set linkify(enable: boolean) {
    this._linkify = enable;
    this.render();
  }

  get tiny(): boolean {
    return this._tiny;
  }

  set tiny(enable: boolean) {
    this._tiny = enable;
    this.render();
  }

  get name(): string | undefined {
    return this._name;
  }

  set name(name: string | undefined) {
    this._name = name;
    this.render();
  }

  set text(text: string | undefined) {
    this._text = text;
    this.render();
  }

  get text(): string | undefined {
    return this._text;
  }

  get dateFmt() {
    return this._dateFmt;
  }

  set dateFmt(formatter: Intl.DateTimeFormat | undefined) {
    this._dateFmt = formatter;
    this.render();
  }

  /**
   * @deprecated use `dateFmt` instead
   */
  set formatter(formatter: Intl.DateTimeFormat) {
    this.dateFmt = formatter;
  }

  get numFmt() {
    return this._numFmt;
  }

  set numFmt(formatter: Intl.NumberFormat | undefined) {
    this._numFmt = formatter;
    this.render();
  }

  set onClick(cb: ClickHandler) {
    this._onClick = cb;
    this.render();
  }

  setAttrs({
    value,
    name = this._name,
    linkify = this._linkify,
    tiny = this._tiny,
    raw = this._raw,
    onClick = this._onClick,
    dateFmt = this._dateFmt,
    numFmt = this._numFmt,
    text = this._text,
  }: Partial<GuiValueProps>) {
    if (
      this._value === value &&
      this._name === name &&
      this._tiny === tiny &&
      this._linkify === linkify &&
      this._raw === raw &&
      this._onClick === onClick &&
      this._dateFmt === dateFmt &&
      this._numFmt === numFmt &&
      this._text === text
    ) {
      // prevent unecessary re-renders
      return;
    }
    this._value = value;
    this._name = name;
    this._linkify = linkify;
    this._raw = raw;
    this._tiny = tiny;
    this._onClick = onClick;
    this._dateFmt = dateFmt;
    this._numFmt = numFmt;
    this._text = text;
    this.render();
  }

  deconnectedCallback() {
    this._disposeClickHandler?.();
  }

  render() {
    const dateFmt = this._dateFmt ?? getGlobalDateTimeFormat();
    const numFmt = this._numFmt ?? getGlobalNumberFormat();

    // reset content
    const content = stringify({
      value: this._value,
      name: this._name,
      tiny: this._tiny,
      raw: this._raw,
      text: this._text,
      dateFmt,
      numFmt,
    });

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let el: HTMLElement = this;

    // make sure previous handlers are removed
    this._disposeClickHandler?.();
    if (this._linkify) {
      this.textContent = null;
      const link = document.createElement('a');
      const onclick = (e: MouseEvent) => this._onClick?.(e, this._value, content);
      link.addEventListener('auxclick', onclick);
      link.addEventListener('click', onclick);
      this._disposeClickHandler = () => {
        link.removeEventListener('click', onclick);
        link.removeEventListener('auxclick', onclick);
      };
      this.appendChild(link);
      el = link;
    }

    el.textContent = content;
    el.title = stringify({
      value: this._value,
      dateFmt,
      numFmt,
      pretty: true,
    });
  }
}

declare global {
  interface Window {
    GuiValue: typeof GuiValue;
  }

  interface HTMLElementTagNameMap {
    'gui-value': GuiValue;
  }

  namespace JSX {
    interface IntrinsicElements {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      'gui-value': any;
    }
  }
}

if (!window.customElements.get('gui-value')) {
  window.GuiValue = GuiValue;
  window.customElements.define('gui-value', GuiValue);
}
