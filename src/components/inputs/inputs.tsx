import {
  AbiAttribute,
  AbiFunction,
  AbiType,
  GCEnum,
  GCObject,
  std,
  decomposeDuration,
  $,
} from '../../exports.js';
import type { SlInput, SlSelect } from '@shoelace-style/shoelace';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/select/select.js';
import { registerCustomElement } from '../common.js';
import '../searchable-select/index.js';
import type { GuiSearchableSelect, SearchableOption } from '../searchable-select/index.js';
import { GuiChangeEvent, GuiInputEvent } from '../events.js';

import FnStyle from './input-fn.css?inline';
import ArrayStyle from './input-array.css?inline';
import MapStyle from './input-map.css?inline';
import ObjectStyle from './input-object.css?inline';
import AnyStyle from './input-any.css?inline';
import DurationStyle from './input-duration.css?inline';
import GeoStyle from './input-geo.css?inline';

export interface GuiInputConfig {
  nullable?: boolean;
  // TODO
}

export abstract class GuiInputElement<T> extends HTMLElement {
  protected _config: GuiInputConfig = {};
  override shadowRoot!: ShadowRoot;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.classList.add('gui-input');
  }

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

  get autocomplete() {
    return '';
  }
  set autocomplete(_value: string) {}
  get placeholder(): string {
    return '';
  }
  set placeholder(_value: string) {}
  get label() {
    return '';
  }
  set label(_label: string) {}
  get helpText() {
    return '';
  }

  set helpText(_helpText: string) {}
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
    [std.core.int._type]: 'gui-input-number',
    [std.core.float._type]: 'gui-input-number',
    ['core::bool']: 'gui-input-bool',
    [std.core.String._type]: 'gui-input-string',
    ['core::char']: 'gui-input-string',
    [std.core.time._type]: 'gui-input-time',
    [std.core.duration._type]: 'gui-input-duration',
    [std.core.Array._type]: 'gui-input-array',
    [std.core.Map._type]: 'gui-input-map',
    ['core::any']: 'gui-input-any',
    [std.core.geo._type]: 'gui-input-geo',
    [std.core.node._type]: 'gui-input-node',
    [std.core.nodeIndex._type]: 'gui-input-node-index',
    [std.core.nodeTime._type]: 'gui-input-node-time',
    [std.core.nodeList._type]: 'gui-input-node-list',
    [std.core.nodeGeo._type]: 'gui-input-node-geo',
    [std.core.function_._type]: 'gui-input-fnptr',
  };

  private _type: AbiFunction | AbiType | undefined;
  private _value: unknown;
  private _inner: GuiInputElement<unknown> | undefined;

  constructor() {
    super();
  }

  /**
   * - `type` always has priority over `value`
   * - when a string is given we first look for a matching `AbiType` if none found, we look for an `AbiFunction`
   */
  get type() {
    return this._type;
  }

  set type(type: string | AbiFunction | AbiType | undefined) {
    if (typeof type === 'string') {
      this._type = $.default.findType(type);
      if (!this._type) {
        this._type = $.default.findFn(type);
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
    if (value instanceof GCObject) {
      this._type = value.$type;
    }
    this.render();
  }

  override set config(config: GuiInputConfig) {
    this._config = config;
    if (this._inner) {
      this._inner.config = config;
    }
  }

  override get config() {
    return this._config;
  }

  override get label() {
    if (this._inner) {
      return this._inner.label;
    }
    return '';
  }

  override set label(label: string) {
    if (this._inner) {
      this._inner.label = label;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setAttrs(attrs: any) {
    if (attrs.type) {
      this.type = attrs.type;
    }
    if (attrs.config) {
      this.config = attrs.config;
    }
    this.value = attrs.value;
    if (this._inner) {
      Object.assign(this._inner, attrs);
    }
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
        if (this._value instanceof GCEnum) {
          input.value = this._value;
        }
        this._inner = input;
      } else if (this._type.generic_abi_type === this._type.abi.core_array_offset) {
        const input = document.createElement('gui-input-array');
        input.genericParam = this._type.abi.types[this._type.g1_abi_type_desc >> 1];
        input.config.nullable = (this._type.g1_abi_type_desc & 0b00000001) === 1;
        if (this._value instanceof Array) {
          input.value = this._value;
        }
        this._inner = input;
      } else {
        const tagName = GuiInput.factory[this._type.name];
        if (tagName) {
          this._inner = document.createElement(tagName);
          if (this._value !== undefined) {
            this._inner.value = this._value;
          }
        } else {
          const input = document.createElement('gui-input-object');
          input.config = this._config;
          input.type = this._type;
          if (this._value instanceof GCObject) {
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
            this._inner = document.createElement('gui-input-array');
            this._inner.value = this._value;
          } else if (this._value instanceof Map) {
            this._inner = document.createElement('gui-input-map');
            this._inner.value = this._value;
          } else if (this._value === null) {
            // we have a 'null' here, we have neither a type or a value render nothing
            return;
          } else {
            // we have an '{ ... }' here
            this._inner = document.createElement('gui-input-object');
            this._inner.value = this._value;
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

    this.shadowRoot.replaceChildren(this._inner);
  }
}

export class GuiInputString extends GuiInputElement<string | null> {
  private _input: SlInput;

  constructor() {
    super();

    this._input = document.createElement('sl-input');
    this._input.setAttribute('exportparts', 'base');
    this._input.addEventListener('sl-input', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiInputEvent(this.value));
    });
    this._input.addEventListener('sl-change', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiChangeEvent(this.value));
    });

    this.shadowRoot.replaceChildren(this._input);
  }

  override get autocomplete(): string {
    return this._input.autocomplete;
  }

  override set autocomplete(value: string) {
    this._input.autocomplete = value;
  }

  override get placeholder() {
    return this._input.placeholder;
  }

  override set placeholder(placeholder: string) {
    this._input.placeholder = placeholder;
  }

  override get label() {
    return this._input.label;
  }

  override set label(label: string) {
    this._input.label = label;
  }

  override get helpText() {
    return this._input.helpText;
  }

  override set helpText(helpText: string) {
    this._input.helpText = helpText;
  }

  get value() {
    if (this._input.value.length === 0) {
      return this._config.nullable ? null : '';
    }
    return this._input.value;
  }

  set value(value: string | null) {
    if (value === null) {
      this._input.value = '';
    } else {
      this._input.value = value;
    }
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('exportparts', 'base');
  }
}

export class GuiInputNumber extends GuiInputElement<number | bigint | null> {
  private _input: SlInput;

  constructor() {
    super();

    this._input = document.createElement('sl-input');
    this._input.type = 'number';
    this._input.setAttribute('exportparts', 'base');

    this._input.addEventListener('sl-input', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiInputEvent(this.value));
    });
    this._input.addEventListener('sl-change', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiChangeEvent(this.value));
    });

    this.shadowRoot.replaceChildren(this._input);
  }

  get value() {
    if (this._input.value.length === 0) {
      return this._config.nullable ? null : 0;
    }
    return this._input.valueAsNumber;
  }

  set value(value: number | bigint | null) {
    if (value === null) {
      this._input.value = '';
    } else {
      this._input.value = `${value}`;
    }
  }

  override get autocomplete(): string {
    return this._input.autocomplete;
  }

  override set autocomplete(value: string) {
    this._input.autocomplete = value;
  }

  override get placeholder() {
    return this._input.placeholder;
  }

  override set placeholder(placeholder: string) {
    this._input.placeholder = placeholder;
  }

  override get label() {
    return this._input.label;
  }

  override set label(label: string) {
    this._input.label = label;
  }

  override get helpText() {
    return this._input.helpText;
  }

  override set helpText(helpText: string) {
    this._input.helpText = helpText;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('exportparts', 'base');
  }
}

export class GuiInputBool extends GuiInputElement<boolean | null> {
  private _input: SlSelect;

  constructor() {
    super();

    this._input = document.createElement('sl-select');
    this._input.value = 'false';
    this._input.setAttribute('exportparts', 'combobox');
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

    this.shadowRoot.replaceChildren(this._input);
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

  override get helpText() {
    return this._input.helpText;
  }

  override set helpText(helpText: string) {
    this._input.helpText = helpText;
  }

  override get label() {
    return this._input.label;
  }

  override set label(label: string) {
    this._input.label = label;
  }

  override get placeholder() {
    return this._input.placeholder;
  }

  override set placeholder(placeholder: string) {
    this._input.placeholder = placeholder;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('exportparts', 'combobox');
  }

  override render(): void {
    if (this._config.nullable) {
      if (this._input.children.length === 2) {
        this._input.appendChild(<sl-option value="null">null</sl-option>);
      }
    } else {
      if (this._input.children.length === 3) {
        this._input.children[2].remove();
        if (this.value === null) {
          this._input.value = 'false';
        }
      }
    }
  }
}

export class GuiInputTime extends GuiInputElement<std.core.time | null> {
  private _input: SlInput;

  constructor() {
    super();

    this._input = document.createElement('sl-input');
    this._input.type = 'datetime-local';
    this._input.step = 0.1;

    this._input.addEventListener('sl-input', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiInputEvent(this.value));
    });
    this._input.addEventListener('sl-change', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiChangeEvent(this.value));
    });

    this.shadowRoot.replaceChildren(this._input);
  }

  get value() {
    const epochMs = this._input.valueAsNumber;

    if (isNaN(epochMs)) {
      return null;
    }
    return std.core.time.fromMs(this._input.valueAsNumber);
  }

  set value(value: std.core.time | null) {
    if (value === null) {
      this._input.value = '';
    } else {
      this._input.updateComplete.then(() => {
        this._input.input.valueAsNumber = value.epochMs;
        this._input.value = this._input.input.value;
      });
    }
  }

  override get autocomplete(): string {
    return this._input.autocomplete;
  }

  override set autocomplete(value: string) {
    this._input.autocomplete = value;
  }

  override get placeholder() {
    return this._input.placeholder;
  }

  override set placeholder(placeholder: string) {
    this._input.placeholder = placeholder;
  }

  override get helpText() {
    return this._input.helpText;
  }

  override set helpText(helpText: string) {
    this._input.helpText = helpText;
  }

  override get label() {
    return this._input.label;
  }

  override set label(label: string) {
    this._input.label = label;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('exportparts', 'base');
  }
}

export class GuiInputEnum extends GuiInputElement<GCEnum | null> {
  private _input: GuiSearchableSelect;
  private _type: AbiType | undefined;

  constructor() {
    super();

    this._input = document.createElement('gui-searchable-select');
    this._input.setAttribute('exportparts', 'base');
    this._input.addEventListener('gui-change', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiChangeEvent(this.value));
    });

    this.shadowRoot.replaceChildren(this._input);
  }

  set type(type: AbiType | string | undefined) {
    if (typeof type === 'string') {
      type = $.default.findType(type);
    }

    if (type) {
      if (type.name === this._type?.name) {
        return;
      }
      if (!type.is_enum) {
        throw new Error('Type is not an enum');
      }
      this._type = type;
      this._input.placeholder = this._type.name;
      this._input.options = this._type.enum_values!.map((v) => ({
        text: v.key,
        value: v.offset,
      }));
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

  override get label() {
    return this._input.label;
  }

  override set label(label: string) {
    this._input.label = label;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('exportparts', 'base');
  }

  override render(): void {
    this._input.config = this._config;
  }
}

export class GuiInputObject extends GuiInputElement<
  GCObject | null | Record<string | number, unknown>
> {
  private _type: AbiType | undefined;
  private _attrs: Map<string, GuiInputElement<unknown>> = new Map();
  /**
   * whether or not we've initialized this input's form already
   */
  private _initialized = false;

  static STYLE: CSSStyleSheet;
  static {
    this.STYLE = new CSSStyleSheet();
    this.STYLE.replaceSync(ObjectStyle);
  }

  constructor() {
    super();

    this.shadowRoot.adoptedStyleSheets.push(GuiInputObject.STYLE);

    this.render();
  }

  get type() {
    return this._type;
  }

  set type(type: AbiType | string | undefined) {
    if (typeof type === 'string') {
      type = $.default.findType(type);
    }
    if (type === undefined) {
      // no type, noop
    } else if (this._type && type !== this.type) {
      // different types, clear previous attributes
      this._attrs.clear();
      this._initialized = false;
    }
    this._type = type;

    if (!this._type) {
      return;
    }

    if (this.config.nullable && !this._initialized) {
      return;
    }

    this._initializeAttrs(this._type);
    this.render();
  }

  get value() {
    if (this._attrs.size === 0) {
      // TODO is that valid?
      return null;
    }

    let allNull = true;
    if (this._type) {
      let index = 0;
      const attrs: unknown[] = [];
      this._attrs.forEach((input) => {
        const attr = this._type!.attrs[index];
        let value: unknown;
        if (attr.nullable) {
          if (input instanceof GuiInputElement) {
            value = input.value;
          } else {
            value = null;
          }
        } else {
          value = input.value;
        }
        if (value !== null) {
          allNull = false;
        }
        attrs.push(value);
        index++;
      });

      if (this.config.nullable && allNull) {
        return null;
      }

      return $.default.create(this._type.name, attrs) ?? null;
    } else {
      const obj = {} as Record<string, unknown>;
      this._attrs.forEach((input, key) => {
        const value = input.value;
        if (value !== null) {
          allNull = false;
        }
        obj[key] = value;
      });
      return obj;
    }
  }

  set value(value: GCObject | Record<string | number, unknown> | null) {
    if (value === null) {
      this._clearAttrs();
      this.render();
      return;
    }

    if (value instanceof GCObject) {
      if (this._type?.name === value.$type.name && this._initialized) {
        // the value is of the same type and we are already initialized
        // therefore we can just update the value of the inputs
        this._attrs.forEach((input, name) => {
          // SAFETY:
          // we are dealing with the attribute of the type of that 'value'
          // therefore, we have to have the properties defined on 'value'
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          input.value = (value as any)[name as string];
        });
      } else {
        // the value is of another type
        this._type = value.$type;
      }
    }
    this._initializeAttrs(value);
    this.render();
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('part', 'input-object');
  }

  override render(): void {
    if (this._config.nullable) {
      if (this._initialized) {
        this._renderAttrs();
      } else {
        this.shadowRoot.replaceChildren(
          <sl-button
            className={'gui-input-add'}
            variant="text"
            onclick={() => {
              if (this._type) {
                this._initializeAttrs(this._type);
                this.render();
              }
            }}
          >
            Set a value
          </sl-button>,
        );
      }
    } else {
      this._renderAttrs();
    }
  }

  private _clearAttrs(): void {
    this._attrs.clear();
    this._initialized = false;
  }

  private _initializeAttrs(
    valueOrType: GCObject | AbiType | Record<string | number, unknown>,
  ): void {
    if (valueOrType instanceof AbiType) {
      for (const attr of valueOrType.attrs) {
        const input = this._initializeAttr(attr);
        this._attrs.set(attr.name, input);
      }
    } else if (valueOrType instanceof GCObject) {
      for (const attr of valueOrType.$type.attrs) {
        const input = this._initializeAttr(attr);
        if (valueOrType) {
          // SAFETY:
          // we are dealing with the attribute of the type of that 'value'
          // therefore, we have to have the properties defined on 'value'
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          input.value = (valueOrType as any)[attr.name];
        }
        this._attrs.set(attr.name, input);
      }
    } else {
      for (const key in valueOrType) {
        const input = this._initializeAttr();
        input.value = valueOrType[key];
        this._attrs.set(key, input);
      }
    }

    // and we flip the switch
    this._initialized = true;
  }

  private _initializeAttr(attr?: AbiAttribute): GuiInput {
    const input = document.createElement('gui-input');

    input.addEventListener('gui-input', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiInputEvent(this.value));
    });
    input.addEventListener('gui-change', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiChangeEvent(this.value));
    });
    if (attr instanceof AbiAttribute) {
      input.config = { nullable: attr.nullable };
      input.type = $.default.abi.types[attr.abi_type];
    }
    return input;
  }

  private _renderAttrs(): void {
    const attrs = document.createDocumentFragment();

    let index = 0;
    this._attrs.forEach((input, key) => {
      const slot = document.createElement('slot');

      slot.name = key;
      const label = (
        <label className={'gui-input-label'}>
          <span className="gui-input-attr-name">{key}</span>
        </label>
      );

      if (this._type) {
        const attr = this._type.attrs[index];
        const attrTy = $.default.abi.types[attr.abi_type];
        let typeName = attrTy.name;
        if (typeName.startsWith('core::')) {
          typeName = typeName.slice(6);
        }
        label.appendChild(<span className="gui-input-attr-type">{typeName}</span>);
      }
      slot.append(label, input);

      slot.addEventListener('slotchange', (e) => {
        const a = e.target as HTMLSlotElement;

        const assignedElements = a.assignedElements();

        assignedElements.forEach((elem) => {
          if (elem instanceof GuiInputElement) {
            this._attrs.set(key, elem);
            elem.value = input.value;
            return;
          }
          const slotInput = elem.querySelector('.gui-input');
          if (!slotInput || !(slotInput instanceof GuiInputElement)) {
            throw `Element provided to gui-input-fn slot "${key}" has to be an instanceof GuiInputElement`;
          }
          slotInput.value = input.value;
          this._attrs.set(key, slotInput);
        });
      });

      attrs.append(<div className={'gui-input-arg'}>{slot}</div>);

      index++;
    });

    const frag = document.createDocumentFragment();

    if (this.config.nullable) {
      const del = (
        <sl-button
          className={'gui-input-remove'}
          variant="text"
          onclick={() => {
            this.value = null;
            this.dispatchEvent(new GuiChangeEvent(this.value));
          }}
        >
          &#10005;
        </sl-button>
      );
      frag.appendChild(del);
    }
    frag.appendChild(<div className={'gui-input-object-wrapper'}> {attrs} </div>);

    this.shadowRoot.replaceChildren(frag);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class GuiInputFn extends GuiInputElement<any[] | null> {
  private _fn: AbiFunction | undefined;
  private _params: Map<string, GuiInputElement<unknown>> = new Map();

  static checkAbiType(value: unknown, ty: AbiType, nullable: boolean): boolean {
    if (value === null) return nullable;
    else if (ty.name === 'core::any') return true;
    else if (typeof value === 'string' && ty.name === std.core.String._type) return true;
    else if (typeof value === 'boolean' && ty.name === 'core::bool') return true;
    else if (
      (typeof value === 'number' || typeof value === 'bigint') &&
      (ty.name === std.core.int._type || ty.name === std.core.float._type)
    )
      return true;
    else if (typeof value === 'object') {
      if (Array.isArray(value) && ty.name === std.core.Array._type) {
        return true;
      } else if (value instanceof Map && ty.name === std.core.Map._type) {
        return true;
      } else if (value instanceof GCObject && value.$type.offset === ty.offset) {
        return true;
      }
    }
    return false;
  }

  static STYLE: CSSStyleSheet;
  static {
    this.STYLE = new CSSStyleSheet();
    this.STYLE.replaceSync(FnStyle);
  }

  constructor() {
    super();

    this.shadowRoot.adoptedStyleSheets.push(GuiInputFn.STYLE);

    this.render();
  }

  /** A getter to directly access the function's fqn. This cannot be used as a setter. */
  get fqn() {
    return this._fn?.fqn;
  }

  get type() {
    return this._fn;
  }

  set type(fn: AbiFunction | string | undefined) {
    if (typeof fn === 'string') {
      fn = $.default.findFn(fn);
    }

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

    this.shadowRoot.querySelectorAll('.gui-input').forEach((input) => {
      if (input instanceof HTMLElement) {
        input.removeEventListener('gui-input', this._onInput);
        input.removeEventListener('gui-change', this._onChange);
      }
    });

    this.render();

    this.shadowRoot.querySelectorAll('.gui-input').forEach((input) => {
      if (input instanceof HTMLElement) {
        input.addEventListener('gui-input', this._onInput);
        input.addEventListener('gui-change', this._onChange);
      }
    });
  }

  private _onInput = (ev: GuiInputEvent) => {
    ev.stopPropagation();
    this.dispatchEvent(new GuiInputEvent(this.value));
  };
  private _onChange = (ev: GuiChangeEvent) => {
    ev.stopPropagation();
    this.dispatchEvent(new GuiChangeEvent(this.value));
  };

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

  set value(args: unknown[]) {
    //if no function set we skip
    if (this._fn === undefined) {
      return;
    }
    //Validate that arguments length match
    if (args.length !== this._fn.params.length) {
      throw `Function params required (${this._fn.params.length}), arguments provided (${args.length})`;
    }
    for (let i = 0; i < args.length; i++) {
      const arg = args[i];
      const param = this._fn.params[i];
      if (!GuiInputFn.checkAbiType(arg, param.type, param.nullable)) {
        throw `Type for param ${param.name} doesn't match, ${param.type.name} required`;
      }
      this._params.get(param.name)!.value = arg;
    }
  }

  override render(): void {
    const params = document.createDocumentFragment();
    let index = 0;
    this._params.forEach((input, name) => {
      const slot = document.createElement('slot');
      slot.name = name;
      const param = this._fn!.params[index];
      let typeName = param.type.name;
      if (typeName.startsWith('core::')) {
        typeName = typeName.slice(6);
      }
      const label = (
        <label className="gui-input-label">
          <span className="gui-input-param-name">{name}</span>
          <span className="gui-input-param-type">
            {typeName}
            {param.nullable ? '?' : ''}
          </span>
        </label>
      );
      slot.append(label, input);
      params.append(<div className={'gui-input-arg'}>{slot}</div>);

      slot.addEventListener('slotchange', (e) => {
        const a = e.target as HTMLSlotElement;

        const assignedElements = a.assignedElements();

        assignedElements.forEach((elem) => {
          if (elem instanceof GuiInputElement) {
            this._params.set(name, elem);
            elem.value = input.value;
            return;
          }
          const slotInput = elem.querySelector('.gui-input');
          if (!slotInput || !(slotInput instanceof GuiInputElement)) {
            throw new Error(
              `Element provided to gui-input-fn slot "${name}" has to be an instanceof GuiInputElement`,
            );
          }
          this._params.set(name, slotInput);
          slotInput.value = input.value;
        });
      });

      index++;
    });
    this.shadowRoot.replaceChildren(params);
  }
}

export class GuiInputDuration extends GuiInputElement<std.core.duration | null> {
  private _input: GuiInputNumber;
  private _select: GuiInputEnum;

  static STYLE: CSSStyleSheet;
  static {
    this.STYLE = new CSSStyleSheet();
    this.STYLE.replaceSync(DurationStyle);
  }

  constructor() {
    super();

    this.shadowRoot.adoptedStyleSheets.push(GuiInputDuration.STYLE);

    this._input = document.createElement('gui-input-number');
    this._input.part.add('value');
    this._input.addEventListener('gui-input', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiInputEvent(this.value));
    });
    this._input.addEventListener('gui-change', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiChangeEvent(this.value));
    });

    this._select = document.createElement('gui-input-enum');
    this._select.part.add('unit');
    this._select.addEventListener('gui-change', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiChangeEvent(this.value));
    });
    this._select.type = $.default.findType(std.core.DurationUnit._type);

    this.shadowRoot.replaceChildren(this._input, this._select);
  }

  get value() {
    const durationValue = Number(this._input.value);
    const durationUnit = this._select.value as std.core.DurationUnit | null;

    if (isNaN(durationValue) || !durationUnit) {
      return null;
    }

    return std.core.duration.from_unit(durationValue, durationUnit);
  }

  set value(value: std.core.duration | null) {
    if (value === null) {
      this._input.value = null;
      this._select.value = null;
    } else {
      const [val, unit] = decomposeDuration(value);

      this._select.value = unit;
      this._input.value = val;
    }
  }

  get durationValue() {
    return this._input.value;
  }

  set durationValue(value: number | bigint | null) {
    this._input.value = value;
  }

  get durationUnit() {
    return this._select.value as std.core.DurationUnit | null;
  }

  set durationUnit(value: std.core.DurationUnit | null) {
    this._select.value = value;
  }

  override render(): void {
    this._input.config = this.config;
    this._select.config = this.config;
  }

  override get autocomplete(): string {
    return this._input.autocomplete;
  }

  override set autocomplete(value: string) {
    this._input.autocomplete = value;
    this._select.autocomplete = value;
  }

  override get placeholder() {
    return this._input.placeholder;
  }

  override set placeholder(placeholder: string) {
    this._input.placeholder = placeholder;
    this._select.autocomplete = placeholder;
  }
}

export class GuiInputAny extends GuiInputElement<unknown> {
  private _select: GuiSearchableSelect;
  private _input: GuiInput;

  static STYLE: CSSStyleSheet;
  static {
    this.STYLE = new CSSStyleSheet();
    this.STYLE.replaceSync(AnyStyle);
  }

  constructor() {
    super();

    this.shadowRoot.adoptedStyleSheets.push(GuiInputAny.STYLE);

    this._select = document.createElement('gui-searchable-select');
    this._select.addEventListener('gui-change', (ev) => {
      ev.stopPropagation();
      if (ev.detail === null) {
        this._input.value = null;
        this._input.type = undefined;
      } else {
        this._input.type = $.default.abi.types[ev.detail];
      }
      this.dispatchEvent(new GuiChangeEvent(this.value));
    });

    const opts: SearchableOption[] = Array.from({ length: $.default.abi.types.length - 1 });
    for (let index = 1; index < $.default.abi.types.length; index++) {
      const t = $.default.abi.types[index];
      opts[index - 1] = { text: t.name, value: t.offset };
    }

    this._select.options = opts;
    this._select.config = { nullable: this.config.nullable };

    this._input = document.createElement('gui-input');
    this._input.value = null;

    this.shadowRoot.replaceChildren(
      <>
        {this._select}
        {this._input}
      </>,
    );
  }

  get value() {
    return this._input.value;
  }

  set value(val: unknown) {
    this._input.value = val;
    switch (typeof val) {
      case 'bigint':
      case 'number':
        this._select.value = $.default.abi.core_int_offset;
        break;
      case 'boolean':
        this._select.value = $.default.findType('core::bool')?.offset;
        break;
      case 'string':
        this._select.value = $.default.abi.core_string_offset;
        break;
      case 'undefined':
        this._select.value = undefined;
        break;
      case 'object': {
        if (Array.isArray(val)) {
          this._select.value = $.default.abi.core_array_offset;
        } else if (val instanceof Map) {
          this._select.value = $.default.abi.core_map_offset;
        } else if (val instanceof GCObject) {
          this._select.value = $.default.findType(val.$type.name)?.offset;
        } else {
          this._select.value = undefined;
        }
        break;
      }
    }
  }

  set options(options: SearchableOption[]) {
    this._select.options = options;
  }

  get options() {
    return this._select.options;
  }

  get type() {
    if (this._select.value === null) {
      return null;
    }
    return $.default.abi.types[this._select.value];
  }

  set type(value: AbiType | null) {
    if (value) {
      this._select.value = value.offset;
      this._input.type = value;
    }
  }

  override get autocomplete(): string {
    return this._input.autocomplete;
  }

  override set autocomplete(value: string) {
    this._input.autocomplete = value;
  }

  override get placeholder() {
    return this._input.placeholder;
  }

  override set placeholder(placeholder: string) {
    this._input.placeholder = placeholder;
  }

  override render(): void {
    this._input.config = this.config;
    this._select.config = this.config;
  }
}

export class GuiInputArray extends GuiInputElement<unknown[] | null> {
  private _inputs: GuiInputElement<unknown>[] = [];
  private _generic_param: AbiType | undefined;

  static STYLE: CSSStyleSheet;
  static {
    this.STYLE = new CSSStyleSheet();
    this.STYLE.replaceSync(ArrayStyle);
  }

  constructor() {
    super();
    this.shadowRoot.adoptedStyleSheets.push(GuiInputArray.STYLE);

    this._render();
  }

  get value() {
    if (this._inputs.length === 0 && this.config.nullable) {
      return null;
    }
    return this._inputs.map((input) => input.value);
  }

  set value(value: unknown[] | null) {
    this._inputs = [];

    value?.forEach((val) => {
      this._addInput(val);
    });

    this._render();
  }

  get genericParam() {
    return this._generic_param;
  }

  set genericParam(type: AbiType | undefined) {
    this._generic_param = type;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('part', 'input-array');
    this._render();
  }

  _addInput(val?: unknown) {
    let input: GuiInputElement<unknown>;
    if (this._generic_param) {
      const el = document.createElement('gui-input');
      el.type = this._generic_param;
      input = el;
    } else {
      const el = document.createElement('gui-input-any');
      if (val === undefined && this._inputs.length > 0) {
        const prevInput = this._inputs[this._inputs.length - 1];
        if (prevInput instanceof GuiInputAny && prevInput.type) {
          el.type = prevInput.type;
        }
      }
      input = el;
    }
    input.config = this.config;
    input.value = val;

    this._inputs.push(input);
    const elem = (
      <div className="gui-input-array-entry">
        <sl-button
          className={'gui-input-remove'}
          size="small"
          variant="text"
          onclick={() => {
            this._inputs = this._inputs.filter((i) => i !== input);
            this.shadowRoot.removeChild(elem);
            this.dispatchEvent(new GuiChangeEvent(this.value));
          }}
        >
          &#10005;
        </sl-button>
        {input}
      </div>
    );
    this.shadowRoot.appendChild(elem);
  }

  _render() {
    if (!this.isConnected) {
      return;
    }
    this.shadowRoot.replaceChildren();
    this.shadowRoot.appendChild(
      <sl-button
        size="small"
        variant="text"
        className={'gui-input-add'}
        onclick={() => {
          this._addInput();
          this.dispatchEvent(new GuiChangeEvent(this.value));
        }}
      >
        Add
      </sl-button>,
    );
    this._inputs.forEach((input) => {
      const elem = (
        <div className="gui-input-array-entry">
          <sl-button
            size="small"
            variant="text"
            className={'gui-input-remove'}
            onclick={() => {
              this._inputs = this._inputs.filter((i) => i !== input);
              this.shadowRoot.removeChild(elem);
              this.dispatchEvent(new GuiChangeEvent(this.value));
            }}
          >
            &#10005;
          </sl-button>
          {input}
        </div>
      );
      this.shadowRoot.appendChild(elem);
    });
  }
}

export class GuiInputMap extends GuiInputElement<Map<unknown, unknown> | object | null> {
  as_object = false;
  private _inputs: Map<GuiInputAny, GuiInputAny> = new Map();

  static ALLOWED_KEY_OPTIONS: Array<{ text: string; value: number }> = [];

  static STYLE: CSSStyleSheet;
  static {
    this.STYLE = new CSSStyleSheet();
    this.STYLE.replaceSync(MapStyle);
  }

  constructor() {
    super();

    this.shadowRoot.adoptedStyleSheets.push(GuiInputMap.STYLE);

    if (GuiInputMap.ALLOWED_KEY_OPTIONS.length === 0) {
      GuiInputMap.ALLOWED_KEY_OPTIONS = [
        { text: std.core.String._type, value: $.default.abi.core_string_offset },
        { text: std.core.int._type, value: $.default.abi.core_int_offset },
        { text: std.core.float._type, value: $.default.abi.core_float_offset },
        { text: 'core::char', value: $.default.abi.core_char_offset },
        { text: std.core.duration._type, value: $.default.abi.core_duration_offset },
        { text: std.core.time._type, value: $.default.abi.core_time_offset },
        { text: std.core.node._type, value: $.default.abi.core_node_offset },
        { text: std.core.nodeGeo._type, value: $.default.abi.core_node_geo_offset },
        { text: std.core.nodeIndex._type, value: $.default.abi.core_node_index_offset },
        { text: std.core.nodeList._type, value: $.default.abi.core_node_list_offset },
        { text: std.core.nodeTime._type, value: $.default.abi.core_node_time_offset },
      ];
    }

    this.render();
  }

  get value() {
    if (this._inputs.size === 0 && this.config.nullable) {
      return null;
    }
    if (this.as_object) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const value: Record<any, unknown> = {};
      this._inputs.forEach((input, key) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        value[key.value as any] = input.value;
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return value;
    }
    const map = new Map<unknown, unknown>();
    this._inputs.forEach((input, key) => {
      map.set(key.value, input.value);
    });

    return map;
  }

  set value(value: Map<unknown, unknown> | object | null) {
    this._inputs.clear();

    if (value instanceof Map) {
      value.forEach((val, key) => {
        this.addEntry(key, val);
      });
    } else if (value == null) {
      // noop
    } else {
      this.as_object = true;
      for (const name in value) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.addEntry(name, (value as any)[name]);
      }
    }

    this.render();
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('part', 'input-map');
  }

  addEntry(key?: unknown, val?: unknown): [GuiInputAny, GuiInputElement<unknown>] {
    const keyInput = document.createElement('gui-input-any');
    keyInput.value = key;
    const valInput = document.createElement('gui-input-any');
    valInput.value = val;

    valInput.config = this.config;

    if (key === undefined && this._inputs.size > 0) {
      const prevKyeInput = [...this._inputs.keys()][this._inputs.size - 1];
      if (prevKyeInput.type !== null) {
        keyInput.type = prevKyeInput.type;
      }
    }

    if (val === undefined && this._inputs.size > 0) {
      const prevValInput = [...this._inputs.values()][this._inputs.size - 1];
      if (prevValInput.type !== null) {
        valInput.type = prevValInput.type;
      }
    }

    this._inputs.set(keyInput, valInput);

    keyInput.config = { nullable: false };
    keyInput.options = GuiInputMap.ALLOWED_KEY_OPTIONS;

    valInput.addEventListener('gui-change', () => {
      this.dispatchEvent(new GuiChangeEvent(this.value));
    });
    keyInput.addEventListener('gui-change', () => {
      this.dispatchEvent(new GuiChangeEvent(this.value));
    });

    return [keyInput, valInput];
  }

  private _createMapInput(keyInput: GuiInputAny, valInput: GuiInputElement<unknown>) {
    const elem = (
      <div className={'gui-input-map-entry'}>
        <sl-button
          variant="text"
          size="small"
          className={'gui-input-remove'}
          onclick={() => {
            this._inputs.delete(keyInput);
            this.shadowRoot.removeChild(elem);
            this.dispatchEvent(new GuiChangeEvent(this.value));
          }}
        >
          &#10005;
        </sl-button>
        {keyInput}
        {valInput}
      </div>
    );
    return elem;
  }

  override render() {
    this.shadowRoot.replaceChildren();
    this.shadowRoot.appendChild(
      <sl-button
        variant="text"
        size="small"
        className={'gui-input-add'}
        onclick={() => {
          const elems = this.addEntry();
          this.shadowRoot.appendChild(this._createMapInput(elems[0], elems[1]));
          this.dispatchEvent(new GuiChangeEvent(this.value));
        }}
      >
        Add
      </sl-button>,
    );
    this._inputs.forEach((valInput, keyInput) => {
      this.shadowRoot.appendChild(this._createMapInput(keyInput, valInput));
    });
  }
}

export class GuiInputNull extends GuiInputElement<unknown> {
  private _type: AbiType | AbiFunction | undefined;
  private _inner?: GuiInput;

  get value(): unknown {
    if (this._inner) {
      return this._inner.value;
    } else if (this._type instanceof AbiType) {
      return $.default.create(this._type.name, []);
    }
    return null;
  }

  get type() {
    return this._type;
  }

  set type(type: AbiType | AbiFunction | undefined) {
    this._type = type;

    this.render();
  }

  override render(): void {
    if (this.type === undefined) {
      this.shadowRoot.replaceChildren();
      return;
    }
    if (this._inner) {
      this.shadowRoot.replaceChildren(
        <>
          <a
            onclick={() => {
              this._inner = undefined;
              this.dispatchEvent(new GuiChangeEvent(this.value));
              this.render();
            }}
          >
            x
          </a>
          {this._inner}
        </>,
      );
      return;
    }
    this.shadowRoot.replaceChildren(
      <a
        onclick={() => {
          this._inner = document.createElement('gui-input');
          this._inner.type = this._type!;
          this.dispatchEvent(new GuiChangeEvent(this.value));
          this.render();
        }}
      >
        Set
      </a>,
    );
  }
}

export class GuiInputNode extends GuiInputElement<std.core.node | null> {
  private _input: GuiInputString;

  constructor() {
    super();

    this._input = document.createElement('gui-input-string');
    this._input.addEventListener('gui-change', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiChangeEvent(this.value));
    });
    this._input.addEventListener('gui-input', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiInputEvent(this.value));
    });

    this.shadowRoot.appendChild(this._input);
  }

  get value() {
    if (this._input.value !== null) {
      try {
        return std.core.node.fromRef(this._input.value);
      } catch {
        return null;
      }
    }
    return null;
  }

  set value(value: std.core.node | null) {
    if (value === null) {
      this._input.value = null;
    } else {
      this._input.value = value.ref;
    }
  }

  override get autocomplete() {
    return this._input.autocomplete;
  }

  override set autocomplete(autocomplete: string) {
    this._input.autocomplete = autocomplete;
  }

  override get placeholder() {
    return this._input.placeholder;
  }

  override set placeholder(placeholder: string) {
    this._input.placeholder = placeholder;
  }

  override get label() {
    return this._input.label;
  }

  override set label(label: string) {
    this._input.label = label;
  }

  override get helpText() {
    return this._input.helpText;
  }

  override set helpText(helpText: string) {
    this._input.helpText = helpText;
  }

  override render(): void {
    this._input.config = this.config;
  }
}

export class GuiInputNodeIndex extends GuiInputElement<std.core.nodeIndex | null> {
  private _input: GuiInputString;

  constructor() {
    super();

    this._input = document.createElement('gui-input-string');
    this._input.addEventListener('gui-change', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiChangeEvent(this.value));
    });
    this._input.addEventListener('gui-input', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiInputEvent(this.value));
    });

    this.shadowRoot.appendChild(this._input);
  }

  get value() {
    if (this._input.value !== null) {
      try {
        return std.core.nodeIndex.fromRef(this._input.value);
      } catch {
        return null;
      }
    }
    return null;
  }

  set value(value: std.core.nodeIndex | null) {
    if (value === null) {
      this._input.value = null;
    } else {
      this._input.value = value.ref;
    }
  }

  override get autocomplete() {
    return this._input.autocomplete;
  }

  override set autocomplete(autocomplete: string) {
    this._input.autocomplete = autocomplete;
  }

  override get placeholder() {
    return this._input.placeholder;
  }

  override set placeholder(placeholder: string) {
    this._input.placeholder = placeholder;
  }

  override get label() {
    return this._input.label;
  }

  override set label(label: string) {
    this._input.label = label;
  }

  override get helpText() {
    return this._input.helpText;
  }

  override set helpText(helpText: string) {
    this._input.helpText = helpText;
  }

  override render(): void {
    this._input.config = this.config;
  }
}

export class GuiInputNodeTime extends GuiInputElement<std.core.nodeTime | null> {
  private _input: GuiInputString;

  constructor() {
    super();

    this._input = document.createElement('gui-input-string');
    this._input.addEventListener('gui-change', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiChangeEvent(this.value));
    });
    this._input.addEventListener('gui-input', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiInputEvent(this.value));
    });

    this.shadowRoot.appendChild(this._input);
  }

  get value() {
    if (this._input.value !== null) {
      try {
        return std.core.nodeTime.fromRef(this._input.value);
      } catch {
        return null;
      }
    }
    return null;
  }

  set value(value: std.core.nodeTime | null) {
    if (value === null) {
      this._input.value = null;
    } else {
      this._input.value = value.ref;
    }
  }

  override get autocomplete() {
    return this._input.autocomplete;
  }

  override set autocomplete(autocomplete: string) {
    this._input.autocomplete = autocomplete;
  }

  override get placeholder() {
    return this._input.placeholder;
  }

  override set placeholder(placeholder: string) {
    this._input.placeholder = placeholder;
  }

  override get label() {
    return this._input.label;
  }

  override set label(label: string) {
    this._input.label = label;
  }

  override get helpText() {
    return this._input.helpText;
  }

  override set helpText(helpText: string) {
    this._input.helpText = helpText;
  }

  override render(): void {
    this._input.config = this.config;
  }
}

export class GuiInputNodeList extends GuiInputElement<std.core.nodeList | null> {
  private _input: GuiInputString;

  constructor() {
    super();

    this._input = document.createElement('gui-input-string');
    this._input.addEventListener('gui-change', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiChangeEvent(this.value));
    });
    this._input.addEventListener('gui-input', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiInputEvent(this.value));
    });

    this.shadowRoot.appendChild(this._input);
  }

  get value() {
    if (this._input.value !== null) {
      try {
        return std.core.nodeList.fromRef(this._input.value);
      } catch {
        return null;
      }
    }
    return null;
  }

  set value(value: std.core.nodeList | null) {
    if (value === null) {
      this._input.value = null;
    } else {
      this._input.value = value.ref;
    }
  }

  override get autocomplete() {
    return this._input.autocomplete;
  }

  override set autocomplete(autocomplete: string) {
    this._input.autocomplete = autocomplete;
  }

  override get placeholder() {
    return this._input.placeholder;
  }

  override set placeholder(placeholder: string) {
    this._input.placeholder = placeholder;
  }

  override get label() {
    return this._input.label;
  }

  override set label(label: string) {
    this._input.label = label;
  }

  override get helpText() {
    return this._input.helpText;
  }

  override set helpText(helpText: string) {
    this._input.helpText = helpText;
  }

  override render(): void {
    this._input.config = this.config;
  }
}

export class GuiInputNodeGeo extends GuiInputElement<std.core.nodeGeo | null> {
  private _input: GuiInputString;

  constructor() {
    super();

    this._input = document.createElement('gui-input-string');
    this._input.addEventListener('gui-change', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiChangeEvent(this.value));
    });
    this._input.addEventListener('gui-input', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiInputEvent(this.value));
    });

    this.shadowRoot.appendChild(this._input);
  }

  get value() {
    if (this._input.value !== null) {
      try {
        return std.core.nodeGeo.fromRef(this._input.value);
      } catch {
        return null;
      }
    }
    return null;
  }

  set value(value: std.core.nodeGeo | null) {
    if (value === null) {
      this._input.value = null;
    } else {
      this._input.value = value.ref;
    }
  }

  override get autocomplete() {
    return this._input.autocomplete;
  }

  override set autocomplete(autocomplete: string) {
    this._input.autocomplete = autocomplete;
  }

  override get placeholder() {
    return this._input.placeholder;
  }

  override set placeholder(placeholder: string) {
    this._input.placeholder = placeholder;
  }

  override get label() {
    return this._input.label;
  }

  override set label(label: string) {
    this._input.label = label;
  }

  override get helpText() {
    return this._input.helpText;
  }

  override set helpText(helpText: string) {
    this._input.helpText = helpText;
  }

  override render(): void {
    this._input.config = this.config;
  }
}

export class GuiInputGeo extends GuiInputElement<std.core.geo | null> {
  private _latInput: GuiInputNumber;
  private _lngInput: GuiInputNumber;

  static STYLE: CSSStyleSheet;
  static {
    this.STYLE = new CSSStyleSheet();
    this.STYLE.replaceSync(GeoStyle);
  }

  constructor() {
    super();

    this.shadowRoot!.adoptedStyleSheets.push(GuiInputGeo.STYLE);

    this._latInput = document.createElement('gui-input-number');
    this._latInput.addEventListener('gui-change', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiChangeEvent(this.value));
    });
    this._latInput.addEventListener('gui-input', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiInputEvent(this.value));
    });

    this._lngInput = document.createElement('gui-input-number');
    this._lngInput.addEventListener('gui-change', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiChangeEvent(this.value));
    });
    this._lngInput.addEventListener('gui-input', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiInputEvent(this.value));
    });

    this.shadowRoot.appendChild(
      <>
        <label className="gui-input-label">Latitude</label>
        {this._latInput}
        <label className="gui-input-label">Longitude</label>
        {this._lngInput}
      </>,
    );
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('part', 'input-geo');
  }

  get value() {
    if (this._latInput.value === null || this._lngInput.value === null) {
      return null;
    }
    return std.core.geo.fromLatLng(Number(this._latInput.value), Number(this._lngInput.value));
  }

  set value(value: std.core.geo | null) {
    if (value === null) {
      this._latInput.value = null;
      this._lngInput.value = null;
    } else {
      this._latInput.value = value.lat;
      this._lngInput.value = value.lng;
    }
  }
}

export class GuiInputFnPtr extends GuiInputElement<std.core.function_ | null> {
  private _input: SlInput;

  constructor() {
    super();

    this._input = document.createElement('sl-input');
    this._input.placeholder = `Specify a function fqn (eg. 'runtime::User::me')`;
    this._input.clearable = true;
    this._input.addEventListener('input', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiInputEvent(this.value));
    });
    this._input.addEventListener('change', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiChangeEvent(this.value));
    });

    this.shadowRoot.replaceChildren(this._input);
  }

  get value() {
    if (this._input.value.length === 0) {
      return null;
    }
    try {
      return $.default.createFunctionByFqn(this._input.value) ?? null;
    } catch {
      return null;
    }
  }

  override get autocomplete(): string {
    return this._input.autocomplete;
  }

  override set autocomplete(value: string) {
    this._input.autocomplete = value;
  }

  override get placeholder() {
    return this._input.placeholder;
  }

  override set placeholder(placeholder: string) {
    this._input.placeholder = placeholder;
  }

  override get helpText() {
    return this._input.helpText;
  }

  override set helpText(helpText: string) {
    this._input.helpText = helpText;
  }

  override get label() {
    return this._input.label;
  }

  override set label(label: string) {
    this._input.label = label;
  }

  set value(fn: std.core.function_ | null) {
    if (fn) {
      this._input.value = fn.fqn;
    } else {
      this._input.value = '';
    }
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
    'gui-input-duration': GuiInputDuration;
    'gui-input-any': GuiInputAny;
    'gui-input-array': GuiInputArray;
    'gui-input-map': GuiInputMap;
    'gui-input-node': GuiInputNode;
    'gui-input-node-index': GuiInputNodeIndex;
    'gui-input-node-list': GuiInputNodeList;
    'gui-input-node-time': GuiInputNodeTime;
    'gui-input-node-geo': GuiInputNodeGeo;
    'gui-input-geo': GuiInputGeo;
    'gui-input-fnptr': GuiInputFnPtr;
  }

  interface GuiInputEventMap {
    [GuiInputEvent.NAME]: GuiInputEvent;
    [GuiChangeEvent.NAME]: GuiChangeEvent;
  }

  interface HTMLElementEventMap extends GuiInputEventMap {}

  namespace GreyCat {
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
        'gui-input-duration': GreyCat.Element<GuiInputDuration, GuiInputEventMap>;
        'gui-input-any': GreyCat.Element<GuiInputAny, GuiInputEventMap>;
        'gui-input-array': GreyCat.Element<GuiInputArray, GuiInputEventMap>;
        'gui-input-map': GreyCat.Element<GuiInputMap, GuiInputEventMap>;
        'gui-input-node': GreyCat.Element<GuiInputNode, GuiInputEventMap>;
        'gui-input-node-time': GreyCat.Element<GuiInputNodeTime, GuiInputEventMap>;
        'gui-input-node-index': GreyCat.Element<GuiInputNodeIndex, GuiInputEventMap>;
        'gui-input-node-list': GreyCat.Element<GuiInputNodeList, GuiInputEventMap>;
        'gui-input-node-geo': GreyCat.Element<GuiInputNodeGeo, GuiInputEventMap>;
        'gui-input-geo': GreyCat.Element<GuiInputGeo, GuiInputEventMap>;
        'gui-input-fnptr': GreyCat.Element<GuiInputFnPtr, GuiInputEventMap>;
      }
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
registerCustomElement('gui-input-duration', GuiInputDuration);
registerCustomElement('gui-input-any', GuiInputAny);
registerCustomElement('gui-input-array', GuiInputArray);
registerCustomElement('gui-input-map', GuiInputMap);
registerCustomElement('gui-input-node', GuiInputNode);
registerCustomElement('gui-input-node-time', GuiInputNodeTime);
registerCustomElement('gui-input-node-index', GuiInputNodeIndex);
registerCustomElement('gui-input-node-list', GuiInputNodeList);
registerCustomElement('gui-input-node-geo', GuiInputNodeGeo);
registerCustomElement('gui-input-geo', GuiInputGeo);
registerCustomElement('gui-input-fnptr', GuiInputFnPtr);
