import { AbiFunction, AbiType, GCEnum, GCObject, core } from '@greycat/sdk';
import type { SlInput } from '@shoelace-style/shoelace';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import { registerCustomElement } from '../common.js';
import '../searchable-select/index.js';
import type { GuiSearchableSelect } from '../searchable-select/index.js';
import { GuiChangeEvent, GuiUpdateEvent } from '../events.js';

export abstract class GuiInputElement<T> extends HTMLElement {
  abstract get value(): T;
  abstract set value(value: T);
}

type PickGuiInputElement<T> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [K in keyof T]: T[K] extends GuiInputElement<any> ? K : never;
}[keyof T];

export class GuiInput extends GuiInputElement<unknown> {
  /**
   * Long story short, make sure the components you register in this factory actually extend
   * `GuiInputElement`.
   *
   * TypeScript is getting a bit lost here, so the type-safety is not perfect
   * although most of the accepted tagName values are fine some might not actually extend
   * `GuiInputElement` as expected by this factory, which means you might be tempted to
   * register the tagName of a component that do not extend `GuiInputElement` though you must not.
   *
   */
  static readonly factory: Record<string, PickGuiInputElement<HTMLElementTagNameMap>> = {
    ['core::int']: 'gui-input-number',
    ['core::float']: 'gui-input-number',
    ['core::bool']: 'gui-input-bool',
    ['core::String']: 'gui-input-string',
    ['core::char']: 'gui-input-string',
    [core.time._type]: 'gui-input-time',
  };
  private _inner: GuiInputElement<unknown> | undefined;

  get value() {
    return this._inner?.value;
  }

  set value(value: unknown) {
    if (value instanceof AbiFunction) {
      // show object form based on params
      // TODO
    } else if (value instanceof AbiType) {
      // show object form based on attrs
      if (value.is_enum) {
        this._inner = document.createElement('gui-input-enum');
        this._inner.value = value.enum_values?.[0];
      } else {
        const tagName = GuiInput.factory[value.name];
        if (tagName) {
          this._inner = document.createElement(tagName);
        } else {
          const input = document.createElement('gui-input-object');
          input.type = value;
          this._inner = input;
        }
      }
      this.replaceChildren(this._inner);
    } else {
      switch (typeof value) {
        case 'bigint': {
          // TODO
          break;
        }
        case 'boolean': {
          this._inner = document.createElement('gui-input-bool');
          this._inner.value = value;
          this.replaceChildren(this._inner);
          break;
        }
        case 'function': {
          break;
        }
        case 'number': {
          this._inner = document.createElement('gui-input-number');
          this._inner.value = value;
          this.replaceChildren(this._inner);
          break;
        }
        case 'object': {
          if (value instanceof GCEnum) {
            this._inner = document.createElement('gui-input-enum');
            this._inner.value = value;
            this.replaceChildren(this._inner);
          } else if (value instanceof GCObject) {
            const tagName = GuiInput.factory[value.$type.name];
            if (tagName) {
              this._inner = document.createElement(tagName);
            } else {
              this._inner = document.createElement('gui-input-object');
            }
            this._inner.value = value;
            this.replaceChildren(this._inner);
          } else if (Array.isArray(value)) {
            // TODO
            // we have an 'Array' here, it should be possible to add/delete entries
          } else if (value instanceof Map) {
            // TODO
            // we have a 'Map' here, it should be possible to add/delete entries
          } else if (value === null) {
            // TODO
            // we have a 'null' here
          } else {
            // TODO
            // we have an '{ ... }' here
          }
          break;
        }
        case 'string': {
          this._inner = document.createElement('gui-input-string');
          this._inner.value = value;
          this.replaceChildren(this._inner);
          break;
        }
        case 'symbol': {
          this._inner = document.createElement('gui-input-string');
          this._inner.value = value.toString();
          this.replaceChildren(this._inner);
          break;
        }
        case 'undefined': {
          this._inner = document.createElement('gui-input-string');
          this._inner.value = '';
          this.replaceChildren(this._inner);
          break;
        }
      }
    }
  }
}

export class GuiInputString extends GuiInputElement<string> {
  private _input: SlInput;

  constructor() {
    super();

    this._input = document.createElement('sl-input');
    this._input.addEventListener('sl-input', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiUpdateEvent(this.value));
    });
    this._input.addEventListener('sl-change', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiChangeEvent(this.value));
    });
  }

  connectedCallback() {
    this.appendChild(this._input);
  }

  disconnectedCallback() {
    this.replaceChildren();
  }

  get value() {
    return this._input.value;
  }

  set value(value: string) {
    this._input.value = value;
  }
}

export class GuiInputNumber extends GuiInputElement<number | bigint> {
  private _input: SlInput;

  constructor() {
    super();

    this._input = document.createElement('sl-input');
    this._input.type = 'number';
    this._input.addEventListener('sl-input', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiUpdateEvent(this.value));
    });
    this._input.addEventListener('sl-change', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiChangeEvent(this.value));
    });
  }

  connectedCallback() {
    this.appendChild(this._input);
  }

  disconnectedCallback() {
    this.replaceChildren();
  }

  get value() {
    return this._input.valueAsNumber;
  }

  set value(value: number | bigint) {
    this._input.value = `${value}`;
  }
}

export class GuiInputBool extends GuiInputElement<boolean> {
  private _input: HTMLInputElement;

  constructor() {
    super();

    this._input = document.createElement('input');
    this._input.type = 'checkbox';
    this._input.oninput = (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiUpdateEvent(this.value));
    };
    this._input.onchange = (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiChangeEvent(this.value));
    };
  }

  connectedCallback() {
    this.appendChild(this._input);
  }

  disconnectedCallback() {
    this.replaceChildren();
  }

  get value() {
    return this._input.checked;
  }

  set value(value: boolean) {
    this._input.checked = value;
  }
}

export class GuiInputTime extends GuiInputElement<core.time | null> {
  private _input: SlInput;

  constructor() {
    super();

    this._input = document.createElement('sl-input');
    this._input.type = 'datetime-local';
    this._input.step = 1;
    this._input.addEventListener('sl-input', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiUpdateEvent(this.value));
    });
    this._input.addEventListener('sl-change', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiChangeEvent(this.value));
    });
  }

  connectedCallback() {
    this.appendChild(this._input);
  }

  disconnectedCallback() {
    this.replaceChildren();
  }

  get value() {
    const epochMs = this._input.valueAsNumber;
    if (isNaN(epochMs)) {
      return null;
    }
    return core.time.fromMs(this._input.valueAsNumber);
  }

  set value(value: core.time | null) {
    if (value === null) {
      this._input.value = '';
    } else {
      this._input.valueAsNumber = value.epochMs;
    }
  }
}

export class GuiInputEnum extends GuiInputElement<GCEnum | null> {
  private _label: HTMLLabelElement;
  private _input: GuiSearchableSelect;
  private _type: AbiType | undefined;

  constructor() {
    super();

    this._label = document.createElement('label');
    this._label.textContent = '<enum>';

    this._input = document.createElement('gui-searchable-select');
    this._input.addEventListener('gui-change', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiChangeEvent(this.value));
    });
  }

  connectedCallback() {
    // this.appendChild(
    //   <fieldset role="group">
    //     {this._label}
    //     {this._input}
    //   </fieldset>,
    // );
    this.appendChild(this._input);
  }

  disconnectedCallback() {
    this.replaceChildren();
  }

  get value() {
    return this._type?.enum_values?.[this._input.value as number] ?? null;
  }

  set value(value: GCEnum | null) {
    if (value === null) {
      this._input.options = [];
      this._type = undefined;
      return;
    }
    this._type = value.$type;
    this._label.textContent = value.$type.name;
    this._input.options = value.$type.enum_values!.map((v) => ({ text: v.key, value: v.offset }));
    this._input.value = value.offset;
  }
}

export class GuiInputObject extends GuiInputElement<GCObject | null> {
  private _type: AbiType | undefined;
  private _attrs: Map<string, GuiInput> = new Map();

  connectedCallback() {
    this._render();
  }

  disconnectedCallback() {
    this.replaceChildren();
  }

  get type() {
    return this._type;
  }

  set type(type: AbiType | undefined) {
    this._type = type;
    if (type) {
      for (const attr of type.attrs) {
        const input = document.createElement('gui-input');
        input.value = greycat.default.abi.types[attr.abi_type];
        // SAFETY:
        // we are dealing with the attribute of the type of that 'value'
        // therefore, we have to have the properties defined on 'value'
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this._attrs.set(attr.name, input);
        input.addEventListener('gui-update', (ev) => {
          ev.stopPropagation();
          this.dispatchEvent(new GuiUpdateEvent(this.value));
        });
        input.addEventListener('gui-change', (ev) => {
          ev.stopPropagation();
          this.dispatchEvent(new GuiChangeEvent(this.value));
        });
      }
      this._render();
    }
  }

  get value() {
    if (this._type) {
      const attrs: unknown[] = [];
      this._attrs.forEach((input) => {
        attrs.push(input.value);
      });
      return greycat.default.create(this._type.name, attrs) ?? null;
    }
    return null;
  }

  set value(value: GCObject | null) {
    if (value === null) {
      this._type = undefined;
      this._attrs.clear();
    } else {
      if (this._type?.name === value.$type.name) {
        // the value is of the same type, so we can just update the value of the inputs
        this._attrs.forEach((input, name) => {
          // SAFETY:
          // we are dealing with the attribute of the type of that 'value'
          // therefore, we have to have the properties defined on 'value'
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          input.value = (value as any)[name];
        });
        this._type = value.$type;
        return;
      }

      // the value is either of another type or we are not yet initialized
      this._type = value.$type;

      for (const attr of value.$type.attrs) {
        const input = document.createElement('gui-input');
        // SAFETY:
        // we are dealing with the attribute of the type of that 'value'
        // therefore, we have to have the properties defined on 'value'
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        input.value = (value as any)[attr.name];
        this._attrs.set(attr.name, input);
        input.addEventListener('gui-update', (ev) => {
          ev.stopPropagation();
          this.dispatchEvent(new GuiUpdateEvent(this.value));
        });
        input.addEventListener('gui-change', (ev) => {
          ev.stopPropagation();
          this.dispatchEvent(new GuiChangeEvent(this.value));
        });
        this._render();
      }
    }
  }

  private _render(): void {
    const attrs = document.createDocumentFragment();
    this._attrs.forEach((input, name) => {
      attrs.append(<label>{name}</label>, input);
    });
    this.replaceChildren(attrs);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gui-input': GuiInput;
    'gui-input-string': GuiInputString;
    'gui-input-number': GuiInputNumber;
    'gui-input-bool': GuiInputBool;
    'gui-input-time': GuiInputTime;
    'gui-input-enum': GuiInputEnum;
    'gui-input-object': GuiInputObject;
  }

  interface GuiInputEventMap {
    [GuiUpdateEvent.NAME]: GuiUpdateEvent;
    [GuiChangeEvent.NAME]: GuiChangeEvent;
  }

  interface HTMLElementEventMap extends GuiInputEventMap {}

  namespace JSX {
    interface IntrinsicElements {
      'gui-input': GreyCat.Element<GuiInput, GuiInputEventMap>;
      'gui-input-string': GreyCat.Element<GuiInputString, GuiInputEventMap>;
      'gui-input-number': GreyCat.Element<GuiInputNumber, GuiInputEventMap>;
      'gui-input-bool': GreyCat.Element<GuiInputBool, GuiInputEventMap>;
      'gui-input-time': GreyCat.Element<GuiInputTime, GuiInputEventMap>;
      'gui-input-enum': GreyCat.Element<GuiInputEnum, GuiInputEventMap>;
      'gui-input-object': GreyCat.Element<GuiInputObject, GuiInputEventMap>;
    }
  }
}

registerCustomElement('gui-input', GuiInput);
registerCustomElement('gui-input-string', GuiInputString);
registerCustomElement('gui-input-number', GuiInputNumber);
registerCustomElement('gui-input-bool', GuiInputBool);
registerCustomElement('gui-input-time', GuiInputTime);
registerCustomElement('gui-input-enum', GuiInputEnum);
registerCustomElement('gui-input-object', GuiInputObject);
