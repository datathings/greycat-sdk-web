import { utils } from '@greycat/sdk';
import { getGlobalNumberFormat } from '../../globals.js';
import { Disposable } from '../../internals.js';

export type ClickHandler<T = unknown> = (
  e: MouseEvent,
  value: T,
  text: string,
  data?: unknown,
) => void;

const NOOP = () => void 0;
export interface GuiValueProps {
  value: unknown;
  /** overrides the display with this `text` */
  text?: string;
  /** whether or not to display the value as a link */
  linkify: boolean | ((value: unknown) => boolean);
  /** best-effort to make it short */
  tiny: boolean;
  /** overrides references name */
  name: string | undefined;
  dateFmt?: Intl.DateTimeFormat;
  numFmt?: Intl.NumberFormat;
  /** optional user-defined data */
  data?: unknown;
  className?: string;
  /** callback used when `linkify` is `true` */
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
  private _linkify: boolean | ((value: unknown) => boolean) = false;
  private _tiny = false;
  private _text: string | undefined;
  private _data: unknown;
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

  get linkify(): boolean | ((value: unknown) => boolean) {
    return this._linkify;
  }

  set linkify(enable: boolean | ((value: unknown) => boolean)) {
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

  get data() {
    return this._data;
  }

  set data(data: unknown) {
    this._data = data;
    this.render();
  }

  setAttrs({
    value,
    name = this._name,
    linkify = this._linkify,
    tiny = this._tiny,
    onClick = this._onClick,
    dateFmt = this._dateFmt,
    numFmt = this._numFmt,
    text = this._text,
    data = this._data,
    className = this.className,
  }: Partial<GuiValueProps>) {
    if (
      this._value === value &&
      this._name === name &&
      this._tiny === tiny &&
      this._linkify === linkify &&
      this._onClick === onClick &&
      this._dateFmt === dateFmt &&
      this._numFmt === numFmt &&
      this._text === text &&
      this._data === data &&
      this.className === className
    ) {
      // prevent unecessary re-renders
      return;
    }
    this._value = value;
    this._name = name;
    this._linkify = linkify;
    this._tiny = tiny;
    this._onClick = onClick;
    this._dateFmt = dateFmt;
    this._numFmt = numFmt;
    this._text = text;
    this._data = data;
    this.className = className;
    this.render();
  }

  getAttrs(): {
    value: unknown;
    name: string | undefined;
    linkify: boolean | ((value: unknown) => boolean);
    tiny: boolean;
    onClick: ClickHandler;
    dateFmt: Intl.DateTimeFormat | undefined;
    numFmt: Intl.NumberFormat | undefined;
    text: string | undefined;
    data: unknown;
  } {
    return {
      value: this._value,
      name: this._name,
      linkify: this._linkify,
      tiny: this._tiny,
      onClick: this._onClick,
      dateFmt: this._dateFmt,
      numFmt: this._numFmt,
      text: this._text,
      data: this._data,
    };
  }

  deconnectedCallback() {
    this._disposeClickHandler?.();
    this.replaceChildren();
  }

  render() {
    const numFmt = this._numFmt ?? getGlobalNumberFormat();

    if (Array.isArray(this._value)) {
      this._disposeClickHandler?.();
      const children = document.createDocumentFragment();
      children.appendChild(document.createTextNode('['));
      const len = Math.min(this._value.length, 15);
      for (let i = 0; i < len; i++) {
        const value = this._value[i];
        const content = utils.stringify({
          value,
          name: this._name,
          tiny: this._tiny,
          dateFmt: this._dateFmt,
          numFmt,
        });

        let linkify = false;
        if (typeof this._linkify === 'function') {
          linkify = this._linkify(value);
        } else if (this._linkify) {
          linkify = true;
        }

        if (linkify) {
          const link = document.createElement('a');
          const onclick = (e: MouseEvent) => this._onClick?.(e, value, content, this._data);
          link.addEventListener('auxclick', onclick);
          link.addEventListener('click', onclick);
          this._disposeClickHandler = () => {
            link.removeEventListener('click', onclick);
            link.removeEventListener('auxclick', onclick);
          };
          link.textContent = content;
          link.title = utils.stringify({
            value,
            dateFmt: this._dateFmt,
            numFmt,
            pretty: true,
          });
          children.appendChild(link);
        } else {
          children.appendChild(document.createTextNode(content));
        }
        if (i < this._value.length - 1) {
          children.appendChild(document.createTextNode(', '));
        }
      }
      children.appendChild(document.createTextNode(']'));
      this.replaceChildren(children);
      return;
    }

    // reset content
    const content = utils.stringify({
      value: this._value,
      name: this._name,
      tiny: this._tiny,
      text: this._text,
      dateFmt: this._dateFmt,
      numFmt,
    });

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let el: HTMLElement = this;

    // make sure previous handlers are removed
    this._disposeClickHandler?.();
    let linkify = false;
    if (typeof this._linkify === 'boolean') {
      linkify = this._linkify;
    } else {
      linkify = this._linkify(this._value);
    }
    if (linkify) {
      this.textContent = null;
      const link = document.createElement('a');
      const onclick = (e: MouseEvent) => this._onClick?.(e, this._value, content, this._data);
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
    el.title = utils.stringify({
      value: this._value,
      dateFmt: this._dateFmt,
      numFmt,
      pretty: true,
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gui-value': GuiValue;
  }

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        /**
         * Please, don't use this in a React context. Use `WCWrapper`.
         */
        'gui-value': GreyCat.Element<GuiValue>;
      }
    }
  }
}

if (!globalThis.customElements.get('gui-value')) {
  globalThis.customElements.define('gui-value', GuiValue);
}
