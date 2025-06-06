import { GuiElement, css } from '../../exports.js';
import style from './time.css?inline';

export class GuiTime extends GuiElement {
  static override styles = [css(style)];

  private _value: gc.core.time | null = null;
  private _timezone: gc.core.TimeZone | undefined;
  private _format: string | undefined;
  private _textual_tz: boolean;
  private _datetime_display: HTMLElement;
  private _timezone_display: HTMLElement;

  constructor() {
    super();

    this._textual_tz = false;
    this._datetime_display = document.createElement('span');
    this._timezone_display = document.createElement('span');

    this.shadowRoot.appendChild(this._datetime_display);
  }

  connectedCallback(): void {
    this.update();
  }

  get value() {
    return this._value;
  }

  set value(time: gc.core.time | null) {
    this._value = time;
    this.update();
  }

  get format() {
    return this._format;
  }

  set format(format: string | undefined) {
    this._format = format;
    this.update();
  }

  get timezone() {
    return this._timezone;
  }

  set timezone(tz: gc.core.TimeZone | undefined) {
    this._timezone = tz;
    this.update();
  }

  get textualTimezone() {
    return this._textual_tz;
  }

  set textualTimezone(enable: boolean) {
    this._textual_tz = enable;
    this.update();
  }

  getAttrs() {
    return {
      value: this._value,
      format: this._format,
      timezone: this._timezone,
      textualTimezone: this._textual_tz,
    };
  }

  setAttrs({
    value = this._value,
    format = this._format,
    timezone = this._timezone,
    textualTimezone = this._textual_tz,
  }: {
    value?: gc.core.time | null;
    format?: string;
    timezone?: gc.core.TimeZone;
    textualTimezone?: boolean;
  }) {
    this._value = value;
    this._format = format;
    this._timezone = timezone;
    this._textual_tz = textualTimezone;
    this.update();
  }

  update(): void {
    if (!this.isConnected) {
      return;
    }

    if (this._value === null) {
      this._datetime_display.textContent = '';
      this._timezone_display.textContent = '';
      return;
    }

    this._datetime_display.textContent = gc.$.default.printTime(
      this._value,
      this._timezone,
      this._format,
    );
    if (this._textual_tz) {
      this._timezone_display.textContent = this._timezone?.key ?? '';
      if (!this._timezone_display.isConnected) {
        this.shadowRoot.appendChild(this._timezone_display);
      }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gui-time': GuiTime;
  }

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        /**
         * Please, don't use this in a React context. Use `WCWrapper`.
         */
        'gui-time': GreyCat.Element<GuiTime>;
      }
    }
  }
}
