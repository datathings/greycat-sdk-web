import { AbiFunction, AbiType, GCEnum, GCObject, core } from '@greycat/sdk';
import type { SlInput, SlSelect } from '@shoelace-style/shoelace';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/select/select.js';
import { registerCustomElement } from '../common.js';
import '../searchable-select/index.js';
import type { GuiSearchableSelect } from '../searchable-select/index.js';
import { GuiChangeEvent, GuiInputEvent } from '../events.js';

export interface GuiInputConfig {
  nullable?: boolean;
  // TODO
}

export abstract class GuiInputElement<T> extends HTMLElement {
  protected _config: GuiInputConfig = {};

  abstract get value(): T;
  abstract set value(value: T);

  get config(): GuiInputConfig {
    return this._config;
  }

  set config(config: GuiInputConfig) {
    this._config = config;
    this.render();
  }

  render(): void {}
}

type PickGuiInputElement<T> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [K in keyof T]: T[K] extends GuiInputElement<any> ? K : never;
}[keyof T];

export type GuiInputElementMap = PickGuiInputElement<HTMLElementTagNameMap>;

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
  static readonly factory: Record<string, GuiInputElementMap> = {
    ['core::int']: 'gui-input-number',
    ['core::float']: 'gui-input-number',
    ['core::bool']: 'gui-input-bool',
    ['core::String']: 'gui-input-string',
    ['core::char']: 'gui-input-string',
    [core.time._type]: 'gui-input-time',
  };

  private _type: AbiFunction | AbiType | undefined;
  private _value: unknown;
  private _inner: GuiInputElement<unknown> | undefined;

  /**
   * - `type` always has priority over `value`
   * - when a string is given we first look for a matching `AbiType` if none found, we look for an `AbiFunction`
   */
  get type() {
    return this._type;
  }

  set type(type: string | AbiFunction | AbiType | undefined) {
    if (typeof type === 'string') {
      this._type = greycat.default.findType(type);
      if (!this._type) {
        this._type = greycat.default.findFn(type);
      }
    } else {
      this._type = type;
    }
    this.render();
  }

  get value() {
    return this._inner?.value;
  }

  set value(value: unknown) {
    this._value = value;
    this.render();
  }

  override render(): void {
    if (this._type instanceof AbiFunction) {
      // show object form based on params
      const input = document.createElement('gui-input-fn');
      input.type = this._type;
      this._inner = input;
    } else if (this._type instanceof AbiType) {
      // show object form based on attrs
      if (this._type.is_enum) {
        const input = document.createElement('gui-input-enum');
        input.type = this._type;
        if (this._value instanceof GCEnum || this._value === null) {
          input.value = this._value;
        }
        this._inner = input;
      } else {
        const tagName = GuiInput.factory[this._type.name];
        if (tagName) {
          this._inner = document.createElement(tagName);
        } else {
          const input = document.createElement('gui-input-object');
          input.type = this._type;
          if (this._value instanceof GCObject || this._value === null) {
            input.value = this._value;
          }
          this._inner = input;
        }
      }
    } else {
      switch (typeof this._value) {
        case 'bigint': {
          this._inner = document.createElement('gui-input-string'); // TODO replace with proper one
          break;
        }
        case 'boolean': {
          this._inner = document.createElement('gui-input-bool');
          this._inner.value = this._value;
          break;
        }
        case 'function': {
          this._inner = document.createElement('gui-input-string'); // TODO replace with proper one
          break;
        }
        case 'number': {
          this._inner = document.createElement('gui-input-number');
          this._inner.value = this._value;
          break;
        }
        case 'object': {
          if (this._value instanceof GCEnum) {
            this._inner = document.createElement('gui-input-enum');
            this._inner.value = this._value;
          } else if (this._value instanceof GCObject) {
            const tagName = GuiInput.factory[this._value.$type.name];
            if (tagName) {
              this._inner = document.createElement(tagName);
            } else {
              this._inner = document.createElement('gui-input-object');
            }
            this._inner.value = this._value;
          } else if (Array.isArray(this._value)) {
            // we have an 'Array' here, it should be possible to add/delete entries
            this._inner = document.createElement('gui-input-string'); // TODO replace with proper one
          } else if (this._value instanceof Map) {
            // we have a 'Map' here, it should be possible to add/delete entries
            this._inner = document.createElement('gui-input-string'); // TODO replace with proper one
          } else if (this._value === null) {
            // we have a 'null' here
            this._inner = document.createElement('gui-input-string'); // TODO replace with proper one
          } else {
            // we have an '{ ... }' here
            this._inner = document.createElement('gui-input-string'); // TODO replace with proper one
          }
          break;
        }
        case 'string': {
          this._inner = document.createElement('gui-input-string');
          this._inner.value = this._value;
          break;
        }
        case 'symbol': {
          this._inner = document.createElement('gui-input-string');
          this._inner.value = this._value.toString();
          break;
        }
        case 'undefined': {
          this._inner = document.createElement('gui-input-string');
          this._inner.value = '';
          break;
        }
      }
    }

    this._inner.config = this._config;
    this.replaceChildren(this._inner);
  }
}

export class GuiInputString extends GuiInputElement<string | null> {
  private _input: SlInput;

  constructor() {
    super();

    this._input = document.createElement('sl-input');
    this._input.addEventListener('sl-input', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiInputEvent(this.value));
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

  set value(value: string | null) {
    if (value === null) {
      this._input.value = '';
    } else {
      this._input.value = value;
    }
  }
}

export class GuiInputNumber extends GuiInputElement<number | bigint | null> {
  private _input: SlInput;

  constructor() {
    super();

    this._input = document.createElement('sl-input');
    this._input.type = 'number';
    this._input.addEventListener('sl-input', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiInputEvent(this.value));
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

  set value(value: number | bigint | null) {
    if (value === null) {
      this._input.value = '';
    } else {
      this._input.value = `${value}`;
    }
  }
}

export class GuiInputBool extends GuiInputElement<boolean | null> {
  private _input: SlSelect;

  constructor() {
    super();

    this._input = document.createElement('sl-select');
    this._input.value = 'false';
    this._input.appendChild(<sl-option value="true">true</sl-option>);
    this._input.appendChild(<sl-option value="false">false</sl-option>);
    this._input.addEventListener('sl-input', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiInputEvent(this.value));
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
    switch (this._input.value) {
      case 'true':
        return true;
      case 'false':
        return false;
      default:
        return null;
    }
  }

  set value(value: boolean | null) {
    this._input.value = `${value}`;
  }

  override render(): void {
    if (this._config.nullable) {
      if (this._input.children.length === 2) {
        this._input.appendChild(<sl-option value="null">null</sl-option>);
      }
    } else {
      if (this._input.children.length === 3) {
        this._input.children[2].remove();
      }
    }
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
      this.dispatchEvent(new GuiInputEvent(this.value));
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
  // private _label: HTMLLabelElement;
  private _input: GuiSearchableSelect;
  private _type: AbiType | undefined;

  constructor() {
    super();

    // this._label = document.createElement('label');
    // this._label.textContent = '<enum>';

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

  set type(type: AbiType | undefined) {
    if (type) {
      if (this._type !== type) {
        // type changed
        this._type = type;
        this._input.placeholder = this._type.name;
        this._input.options = this._type.enum_values!.map((v) => ({
          text: v.key,
          value: v.offset,
        }));
      }
    } else {
      this._type = undefined;
      this._input.placeholder = '';
      this._input.value = undefined;
      this._input.options = [];
    }
  }

  get type() {
    return this._type;
  }

  get value() {
    return this._type?.enum_values?.[this._input.value as number] ?? null;
  }

  set value(value: GCEnum | null) {
    if (value === null) {
      this._input.value = undefined;
      return;
    }
    this.type = value.$type;
    this._input.value = value.offset;
  }
}

export class GuiInputObject extends GuiInputElement<GCObject | null> {
  private _type: AbiType | undefined;
  private _attrs: Map<string, GuiInput> = new Map();

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {
    this.replaceChildren();
  }

  get type() {
    return this._type;
  }

  set type(type: AbiType | undefined) {
    if (this._type === undefined || this._type === type) {
      // no type or same type, noop
    } else {
      // different type, we need to clear the previous attributes
      this._attrs.clear();
    }
    this._type = type;
    if (this._type) {
      for (const attr of this._type.attrs) {
        const input = document.createElement('gui-input');
        input.addEventListener('gui-update', (ev) => {
          ev.stopPropagation();
          this.dispatchEvent(new GuiInputEvent(this.value));
        });
        input.addEventListener('gui-change', (ev) => {
          ev.stopPropagation();
          this.dispatchEvent(new GuiChangeEvent(this.value));
        });
        input.config = { nullable: attr.nullable };
        input.value = greycat.default.abi.types[attr.abi_type];
        // SAFETY:
        // we are dealing with the attribute of the type of that 'value'
        // therefore, we have to have the properties defined on 'value'
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this._attrs.set(attr.name, input);
      }
    }
    this.render();
  }

  get value() {
    if (this._type) {
      const attrs: unknown[] = [];
      let index = 0;
      this._attrs.forEach((input) => {
        const attr = this._type!.attrs[index];
        if (attr.nullable) {
          if (input instanceof GuiInputElement) {
            attrs.push(input.value);
          } else {
            attrs.push(null);
          }
        } else {
          attrs.push(input.value);
        }
        index++;
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
        input.addEventListener('gui-update', (ev) => {
          ev.stopPropagation();
          this.dispatchEvent(new GuiInputEvent(this.value));
        });
        input.addEventListener('gui-change', (ev) => {
          ev.stopPropagation();
          this.dispatchEvent(new GuiChangeEvent(this.value));
        });
        // SAFETY:
        // we are dealing with the attribute of the type of that 'value'
        // therefore, we have to have the properties defined on 'value'
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        input.value = (value as any)[attr.name];
        this._attrs.set(attr.name, input);
        this.render();
      }
    }
  }

  override render(): void {
    const attrs = document.createDocumentFragment();
    let index = 0;
    this._attrs.forEach((input, name) => {
      const attr = this._type!.attrs[index];
      const attrTy = greycat.default.abi.types[attr.abi_type];
      let typeName = attrTy.name;
      if (typeName.startsWith('core::')) {
        typeName = typeName.slice(6);
      }
      const label = (
        <label>
          <span className="gui-input-attr-name">{name}</span>
          <span className="gui-input-attr-type">{typeName}</span>
        </label>
      );
      if (attr.nullable) {
        attrs.append(
          label,
          <a
            href=""
            onclick={(ev) => {
              ev.preventDefault();
              input.type = attrTy;
              (ev.target as HTMLElement).replaceWith(input);
            }}
          >
            Set
          </a>,
        );
      } else {
        attrs.append(label, input);
      }
      index++;
    });
    this.replaceChildren(attrs);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class GuiInputFn extends GuiInputElement<any[] | null> {
  private _fn: AbiFunction | undefined;
  private _params: Map<string, GuiInput> = new Map();

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {
    this.replaceChildren();
  }

  get type() {
    return this._fn;
  }

  set type(fn: AbiFunction | undefined) {
    if (this._fn) {
      // we already have an AbiFunction defined, lets compare
      if (this._fn === fn) {
        // same function, no need to re-render
      } else {
        // different function, let's clean
        this._params.clear();
        this._fn = fn;
        if (this._fn) {
          for (const param of this._fn.params) {
            const input = document.createElement('gui-input');
            input.type = param.type;
            input.config = { nullable: param.nullable };
            this._params.set(param.name, input);
          }
        }
      }
    } else {
      // no previous fn definition
      this._fn = fn;
      if (this._fn) {
        for (const param of this._fn.params) {
          const input = document.createElement('gui-input');
          input.type = param.type;
          input.config = { nullable: param.nullable };
          this._params.set(param.name, input);
        }
      }
    }
    this.render();
  }

  get value() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const args: any[] = [];
    let index = 0;
    this._params.forEach((input) => {
      const param = this._fn!.params[index];
      if (param.nullable) {
        if (input instanceof GuiInputElement) {
          args[index] = input.value;
        } else {
          args[index] = null;
        }
      } else {
        args[index] = input.value;
      }
      index++;
    });
    return args;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  set value(_args: any[]) {}

  override render(): void {
    const params = document.createDocumentFragment();
    let index = 0;
    this._params.forEach((input, name) => {
      const param = this._fn!.params[index];
      let typeName = param.type.name;
      if (typeName.startsWith('core::')) {
        typeName = typeName.slice(6);
      }
      const label = (
        <label>
          <span className="gui-input-param-name">{name}</span>
          <span className="gui-input-param-type">{typeName}</span>
        </label>
      );
      if (param.nullable) {
        const lazyloadingLink = (
          <a
            href=""
            onclick={(ev) => {
              ev.preventDefault();
              input.type = param.type;
              lazyloadingLink.replaceWith(input);
            }}
          >
            Set
          </a>
        ) as HTMLAnchorElement;
        params.append(label, lazyloadingLink);
      } else {
        params.append(label, input);
      }
      index++;
    });
    this.replaceChildren(params);
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
    'gui-input-fn': GuiInputFn;
  }

  interface GuiInputEventMap {
    [GuiInputEvent.NAME]: GuiInputEvent;
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
      'gui-input-fn': GreyCat.Element<GuiInputFn, GuiInputEventMap>;
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
registerCustomElement('gui-input-fn', GuiInputFn);
