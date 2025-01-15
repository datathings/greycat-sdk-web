import { getGlobalNumberFormat, GuiElement, css } from '../../exports.js';
import { Disposable } from '../../internals.js';
import style from './value.css?inline';

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
  title?: string;
  /** callback used when `linkify` is `true` */
  onClick: ClickHandler<unknown>;
}

/**
 * Tries to give a simple textual representation of any given GreyCat (or vanilla js) value
 */
export class GuiValue extends GuiElement implements GuiValueProps {
  static override styles = [css(style)];

  protected _dateFmt: Intl.DateTimeFormat | undefined;
  protected _numFmt: Intl.NumberFormat | undefined;
  protected _value: unknown;
  protected _name: string | undefined;
  protected _linkify: boolean | ((value: unknown) => boolean) = false;
  protected _tiny = false;
  protected _text: string | undefined;
  protected _data: unknown;
  protected _onClick: ClickHandler = NOOP;
  protected _disposeClickHandler: Disposable | undefined;

  get value(): unknown {
    return this._value;
  }

  set value(value: unknown) {
    if (this._value === value) {
      // prevent unnecessary updates
      return;
    }

    this._value = value;
    this.update();
  }

  get linkify(): boolean | ((value: unknown) => boolean) {
    return this._linkify;
  }

  set linkify(enable: boolean | ((value: unknown) => boolean)) {
    this._linkify = enable;
    this.update();
  }

  get tiny(): boolean {
    return this._tiny;
  }

  set tiny(enable: boolean) {
    this._tiny = enable;
    this.update();
  }

  get name(): string | undefined {
    return this._name;
  }

  set name(name: string | undefined) {
    this._name = name;
    this.update();
  }

  set text(text: string | undefined) {
    this._text = text;
    this.update();
  }

  get text(): string | undefined {
    return this._text;
  }

  get dateFmt() {
    return this._dateFmt;
  }

  set dateFmt(formatter: Intl.DateTimeFormat | undefined) {
    this._dateFmt = formatter;
    this.update();
  }

  get numFmt() {
    return this._numFmt;
  }

  set numFmt(formatter: Intl.NumberFormat | undefined) {
    this._numFmt = formatter;
    this.update();
  }

  set onClick(cb: ClickHandler) {
    this._onClick = cb;
    this.update();
  }

  get data() {
    return this._data;
  }

  set data(data: unknown) {
    this._data = data;
    this.update();
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
    title = this.title,
  }: Partial<GuiValueProps>) {
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
    this.title = title;
    this.update();
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
    className: string;
    title: string;
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
      className: this.className,
      title: this.title,
    };
  }

  connectedCallback() {
    this.update();
  }

  disconnectedCallback() {
    this._disposeClickHandler?.();
  }

  update() {
    if (!this.isConnected) {
      return;
    }

    const numFmt = this._numFmt ?? getGlobalNumberFormat();
    let element: Node;

    if (Array.isArray(this._value)) {
      this._disposeClickHandler?.();
      const children = document.createDocumentFragment();
      children.appendChild(document.createTextNode('['));
      const len = Math.min(this._value.length, 15);
      for (let i = 0; i < len; i++) {
        const value = this._value[i];
        const content = greycat.sdk.stringify({
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
          link.title = greycat.sdk.stringify({
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
      element = children;
    } else if (this._value instanceof greycat.sdk.AbiType) {
      this.shadowRoot.replaceChildren(document.createTextNode(`<${this._value.name}>`));
      this.title = this._value.name;
      return;
    } else {
      const text = greycat.sdk.stringify({
        value: this._value,
        name: this._name,
        tiny: this._tiny,
        text: this._text,
        dateFmt: this._dateFmt,
        numFmt,
      });

      // make sure previous handlers are removed
      this._disposeClickHandler?.();
      let linkify = false;
      if (typeof this._linkify === 'boolean') {
        linkify = this._linkify;
      } else {
        linkify = this._linkify(this._value);
      }
      if (linkify) {
        const link = document.createElement('a');
        const onclick = (e: MouseEvent) => this._onClick?.(e, this._value, text, this._data);
        link.addEventListener('auxclick', onclick);
        link.addEventListener('click', onclick);
        this._disposeClickHandler = () => {
          link.removeEventListener('click', onclick);
          link.removeEventListener('auxclick', onclick);
        };
        link.textContent = text;
        this.shadowRoot.appendChild(link);
        element = link;
      } else {
        element = document.createTextNode(text);
      }
    }

    this.shadowRoot.replaceChildren(element);
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
