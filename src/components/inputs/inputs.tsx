import {
  AbiAttribute,
  AbiType,
  GCEnum,
  GCObject,
  std,
  decomposeDuration,
  $,
  sl,
  GuiInputFactory,
  Abi,
  getIndexInParent,
} from '../../exports.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/select/select.js';
import { registerCustomElement } from '../common.js';
import '../searchable-select/index.js';
import type { GuiSearchableSelect, SearchableOption } from '../searchable-select/index.js';
import { GuiChangeEvent, GuiInputEvent } from '../events.js';

import ArrayStyle from './input-array.css?inline';
import MapStyle from './input-map.css?inline';
import ObjectStyle from './input-object.css?inline';
import AbstractStyle from './input-abstract.css?inline';
import AnyStyle from './input-any.css?inline';
import DurationStyle from './input-duration.css?inline';
import GeoStyle from './input-geo.css?inline';
import UnsupportedStyle from './input-unsupported.css?inline';

export interface GuiInputConfig {
  nullable?: boolean;
  // TODO
}

export interface GuiInputElementElementConstructor {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new (...params: any[]): GuiInputElement<any>;
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
  private _value: unknown;
  private _inner: GuiInputElement<unknown>;

  constructor() {
    super();

    this._inner = document.createElement('gui-input-string');
  }

  get value() {
    return this._value;
  }

  set value(value: unknown) {
    this._value = value;
    this._inner = GuiInputFactory.closest(this).createElement(value);
    this.shadowRoot.replaceChildren(this._inner);
  }

  override get label() {
    return this._inner.label;
  }

  override set label(label: string) {
    this._inner.label = label;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setAttrs(attrs: any) {
    this._value = attrs.value;
    this._inner = GuiInputFactory.closest(this).createElement(attrs.value);
    Object.assign(this._inner, attrs);
    this.shadowRoot.replaceChildren(this._inner);
  }
}

export class GuiInputString extends GuiInputElement<string | std.core.String | null> {
  private _input: sl.SlInput;

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

  get value(): string {
    return this._input.value;
  }

  set value(value: string | std.core.String | null | undefined) {
    if (value instanceof std.core.String) {
      value = value.value;
    }
    if (value === null || value === undefined) {
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
  private _input: sl.SlInput;

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
      return this._config.nullable ? null : NaN;
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
  private _input: sl.SlSelect;

  constructor() {
    super();

    this._input = document.createElement('sl-select');
    this._input.value = 'false';
    this._input.hoist = true;
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
  private _value: std.core.time | null = null;
  private _input: sl.SlInput;

  constructor() {
    super();

    this._input = document.createElement('sl-input');
    this._input.type = 'datetime-local';
    this._input.step = 0.1;

    this._input.addEventListener('sl-input', (ev) => {
      ev.stopPropagation();
      const epochMs = this._input.valueAsNumber;
      if (isNaN(epochMs)) {
        this._value = null;
      } else {
        this._value = std.core.time.fromMs(epochMs);
      }
      this.dispatchEvent(new GuiInputEvent(this.value));
    });
    this._input.addEventListener('sl-change', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiChangeEvent(this.value));
    });

    this.shadowRoot.replaceChildren(this._input);
  }

  get value() {
    return this._value;
  }

  set value(value: std.core.time | null) {
    this._value = value;
    this.update();
    // if (value === null) {
    //   this._input.value = '';
    // } else {
    //   this._input.updateComplete.then(() => {
    //     this._input.input.valueAsNumber = value.epochMs;
    //     this._input.value = this._input.input.value;
    //   });
    // }
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
    this._input.updateComplete.then(() => this.update());
  }

  update(): void {
    if (!this.isConnected) {
      return;
    }

    if (this._value) {
      this._input.input.valueAsNumber = this._value.epochMs;
      this._input.value = this._input.input.value;
    } else {
      this._input.value = '';
    }
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

  get type() {
    return this._type;
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

  get value() {
    return this._type?.enum_values?.[this._input.value as number] ?? null;
  }

  set value(value: GCEnum | null) {
    if (value === null || value === undefined) {
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
export class GuiInputAbstract extends GuiInputElement<unknown> {
  private _select: sl.SlSelect;
  private _input: GuiInputObject;

  static STYLE: CSSStyleSheet;
  static {
    this.STYLE = new CSSStyleSheet();
    this.STYLE.replaceSync(AbstractStyle);
  }

  constructor() {
    super();

    this.shadowRoot.adoptedStyleSheets.push(GuiInputAbstract.STYLE);

    this._select = document.createElement('sl-select');
    this._select.placeholder = 'Select a concrete type';
    this._select.setAttribute('exportparts', 'base');
    this._select.addEventListener('sl-change', (ev) => {
      ev.stopPropagation();
      const type = $.default.findType(this._select.value as string);
      if (!type) {
        throw new Error(`Unable to find type '${this._select.value}' in ABI`);
      }
      this._input.value = new type.factory(type);
      this.dispatchEvent(new GuiChangeEvent(this.value));
    });

    this._input = document.createElement('gui-input-object');

    this.shadowRoot.replaceChildren(
      <div className="base">
        {this._select}
        {this._input}
      </div>,
    );
  }

  override get placeholder() {
    return this._select.placeholder;
  }

  override set placeholder(placeholder: string) {
    this._select.placeholder = placeholder;
  }

  override get label() {
    return this._select.label;
  }

  override set label(label: string) {
    this._select.label = label;
  }

  override get helpText() {
    return this._select.helpText;
  }

  override set helpText(helpText: string) {
    this._select.helpText = helpText;
  }

  set type(type: AbiType | string | null) {
    if (type === null) {
      this._select.placeholder = 'No type';
      this._select.disabled = true;
      this._select.replaceChildren();
      return;
    } else if (typeof type === 'string') {
      const ty = $.default.findType(type);
      if (!ty) {
        this._select.placeholder = `Unknown type '${type}'`;
        this._select.disabled = true;
        this._select.replaceChildren();
        return;
      }
      type = ty;
    }
    if (!type.is_abstract) {
      console.warn(
        `GuiInputAbstract 'type' field must be set with an abstract type ('${type.name}' is not abstract)`,
      );
      return;
    }
    const options: sl.SlOption[] = [];
    for (const ty of type.abi.types) {
      if (ty.super_type === type.offset) {
        options.push((<sl-option value={ty.name}>{ty.name}</sl-option>) as sl.SlOption);
      }
    }
    this._select.placeholder = `Select a concrete type for '${type.name}'`;
    this._select.replaceChildren(...options);
    this._input.value = undefined;
  }

  get value() {
    return this._input.value;
  }

  set value(value: GCObject | undefined) {
    this._input.value = value;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('exportparts', 'base');
  }
}

export class GuiInputObject extends GuiInputElement<GCObject | undefined> {
  static STYLE: CSSStyleSheet;
  static {
    this.STYLE = new CSSStyleSheet();
    this.STYLE.replaceSync(ObjectStyle);
  }

  protected _value: GCObject | undefined;

  constructor() {
    super();

    this.shadowRoot.adoptedStyleSheets.push(GuiInputObject.STYLE);
  }

  get value() {
    return this._value;
  }

  set value(value: GCObject | undefined) {
    if (!value) {
      this.shadowRoot.replaceChildren();
      return;
    }
    this._value = value;
    this.update();
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.update();
  }

  update(): void {
    if (!this.isConnected || !this._value) {
      return;
    }

    const factory = GuiInputFactory.closest(this);
    const fields = document.createDocumentFragment();
    const abi = this._value.$type.abi;
    for (const attr of this._value.$type.attrs) {
      const [attrEl] = this._createAttr(
        abi,
        factory,
        this._value,
        this._value.$type,
        attr,
        this._value[attr.name],
      );
      fields.appendChild(attrEl);
    }
    this.shadowRoot.replaceChildren(fields);
  }

  private _createAttr(
    abi: Abi,
    factory: GuiInputFactory,
    object: GCObject,
    type: AbiType,
    attr: AbiAttribute,
    value: unknown,
  ): [Node, Element | null] {
    const attrType = abi.types[attr.abi_type];
    if (attr.nullable && (value === null || value === undefined)) {
      const field = (
        <div className="field">
          <label className="label">
            <span className="field-name">{attr.name}</span>
            <span className="field-type">{this._attrType(attr, abi)}</span>
          </label>
          <div>
            <sl-button
              variant="text"
              size="small"
              onclick={() => {
                const value = new attrType.factory(attrType);
                const [node, input] = this._createAttr(abi, factory, object, type, attr, value);
                this.shadowRoot.replaceChild(node, field);
                if (input instanceof GuiInputElement) {
                  object[attr.name] = input.value;
                }
                this.dispatchEvent(new GuiChangeEvent(this.value));
              }}
            >
              Set a value
            </sl-button>
          </div>
        </div>
      );
      return [field, null];
    }

    const slottedAttr = this.querySelector(`[slot=${attr.name}]`);
    let input: Element;
    if (slottedAttr) {
      input = slottedAttr;
    } else {
      const tagName = factory.get(`${type.name}::${attr.name}`);
      input = tagName ? document.createElement(tagName) : factory.createElement(value, attrType);
    }
    if ('value' in input) {
      input.value = value;
    } else {
      input.textContent = value?.toString() ?? `${value}`;
    }
    if (input instanceof GuiInputElement) {
      input.addEventListener('gui-change', () => {
        object[attr.name] = input.value;
        // TODO check validatity
      });
    }
    const field = (
      <div className="field">
        <label className="label">
          <span className="field-name">{attr.name}</span>
          <span className="field-type">{this._attrType(attr, abi)}</span>
        </label>
        {attr.nullable && (slottedAttr === null || slottedAttr instanceof GuiInputElement) ? (
          <div className="nullable">
            <sl-tooltip content="Set to null" placement="left">
              <sl-button
                className="del"
                variant="text"
                size="small"
                onclick={() => {
                  const [node, input] = this._createAttr(abi, factory, object, type, attr, null);
                  if (input instanceof GuiInputElement) {
                    object[attr.name] = input.value;
                  }
                  this.shadowRoot.replaceChild(node, field);
                  this.dispatchEvent(new GuiChangeEvent(this.value));
                }}
              >
                {/* &#10005; = ✕ */}
                &#10005;
              </sl-button>
            </sl-tooltip>
            <div className="sep" />
            <slot name={attr.name}>{slottedAttr ? undefined : input}</slot>
          </div>
        ) : (
          <slot name={attr.name}>{slottedAttr ? undefined : input}</slot>
        )}
      </div>
    );
    return [field, input];
  }

  /**
   * Returns the attribute's type fqn, shortens to only the type symbol if the type is a core type
   */
  private _attrType(attr: AbiAttribute, abi: Abi): string {
    const type = abi.types[attr.abi_type];
    const name = type.is_core ? abi.symbols[type.symbol] : type.name;
    return attr.nullable ? `${name}?` : name;
  }
}

export class GuiInputFn extends GuiInputObject {
  /**
   * Give an instance of `'<function_name>_args'` as value, then use `el.args` to retrieve
   * the array of arguments. `el.value` will be the instance, for now it cannot be used
   * for `@expose`d function, an array is expected.
   */
  override get value() {
    return super.value;
  }

  override set value(value: GCObject | undefined) {
    super.value = value;
  }

  get args() {
    if (this._value && this._value.$attrs) {
      return this._value.$attrs;
    }
    return [];
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
      } else {
        const type = $.default.abi.types[ev.detail];
        this._input.value = new type.factory(type);
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
      case 'number': {
        if (Number.isInteger(val)) {
          this._select.value = $.default.abi.core.int;
        } else {
          this._select.value = $.default.abi.core.float;
        }
        break;
      }
      case 'boolean':
        this._select.value = $.default.findType('core::bool')?.offset;
        break;
      case 'string':
        this._select.value = $.default.abi.core.string;
        break;
      case 'undefined':
        this._select.value = undefined;
        break;
      case 'object': {
        if (Array.isArray(val)) {
          this._select.value = $.default.abi.core.array;
        } else if (val instanceof Map) {
          this._select.value = $.default.abi.core.map;
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
      this._input.value = new value.factory(value);
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

export class GuiInputArray extends GuiInputElement<unknown[] | std.core.Array> {
  private _generic_param: AbiType | undefined;
  private _generic_param_nullable = false;
  private _value: unknown[] = [];

  static STYLE: CSSStyleSheet;
  static {
    this.STYLE = new CSSStyleSheet();
    this.STYLE.replaceSync(ArrayStyle);
  }

  constructor() {
    super();

    this.shadowRoot.adoptedStyleSheets.push(GuiInputArray.STYLE);
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.update();
  }

  get value(): unknown[] {
    return this._value;
  }

  set value(value: unknown[] | std.core.Array) {
    if (value instanceof std.core.Array) {
      if (value.$type.generic_abi_type !== 0) {
        this._generic_param = value.$type.abi.types[value.$type.g1()];
        this._generic_param_nullable = value.$type.g1Nullable();
      }
      value = value.values;
    }
    this.update();
  }

  get genericParam() {
    return this._generic_param;
  }

  set genericParam(type: AbiType | undefined) {
    this._generic_param = type;
    this.update();
  }

  get genericParamNullable() {
    return this._generic_param_nullable;
  }

  set genericParamNullable(nullable: boolean) {
    this._generic_param_nullable = nullable;
    this.update();
  }

  update(): void {
    if (!this.isConnected) {
      return;
    }

    const factory = GuiInputFactory.closest(this);
    const items = document.createDocumentFragment();
    for (const item of this._value) {
      const [node] = this._createItem(factory, item);
      items.appendChild(node);
    }
    this.shadowRoot.replaceChildren(
      <>
        <sl-button
          className="add"
          variant="text"
          size="small"
          onclick={() => {
            const [itemEl, input] = this._createItem(factory);
            this._value.push(input?.value);
            this.shadowRoot.appendChild(itemEl);
            this.dispatchEvent(new GuiChangeEvent(this.value));
          }}
        >
          Add item
        </sl-button>
        {items}
      </>,
    );
  }

  private _createItem(
    factory: GuiInputFactory,
    value?: unknown,
  ): [Node, GuiInputElement<unknown> | null] {
    if (this._generic_param) {
      if (value === undefined && !this._generic_param_nullable) {
        value = new this._generic_param.factory(this._generic_param);
      }
    } else if (value === undefined) {
      // we are completely in the dark, the value is not set, and we are not monomorphized
      throw new Error('not implemented yet');
    }

    if (
      this._generic_param &&
      this._generic_param_nullable &&
      (value === null || value === undefined)
    ) {
      const generic_param = this._generic_param;
      const item = (
        <div className="item">
          <sl-tooltip content="Delete item" placement="left">
            <sl-button
              className="del"
              variant="text"
              size="small"
              onclick={() => {
                const index = getIndexInParent(item) - 1; // -1 to account for the "Add" button
                this._value.splice(index, 1);
                item.remove();
                this.dispatchEvent(new GuiChangeEvent(this.value));
              }}
            >
              {/* &#10005; = ✕ */}
              &#10005;
            </sl-button>
          </sl-tooltip>
          <sl-button
            variant="text"
            size="small"
            onclick={() => {
              const value = new generic_param.factory(generic_param);
              const [node, input] = this._createItem(factory, value);
              const index = getIndexInParent(item) - 1;
              this._value[index] = input?.value;
              this.shadowRoot.replaceChild(node, item);
              this.dispatchEvent(new GuiChangeEvent(this.value));
            }}
          >
            Set a value
          </sl-button>
        </div>
      ) as Element;
      return [item, null];
    }

    const input = factory.createElement(value);
    input.value = value;
    input.addEventListener('gui-change', () => {
      const index = getIndexInParent(item) - 1; // -1 to account for the "Add" button
      this._value[index] = input.value;
    });
    const item = (
      <div className="item">
        {this._generic_param_nullable ? (
          <div>
            <sl-tooltip content="Delete item" placement="left">
              <sl-button
                className="del"
                variant="text"
                size="small"
                onclick={() => {
                  const index = getIndexInParent(item) - 1; // -1 to account for the "Add" button
                  this._value.splice(index, 1);
                  item.remove();
                  this.dispatchEvent(new GuiChangeEvent(this.value));
                }}
              >
                {/* &#10005; = ✕ */}
                &#10005;
              </sl-button>
            </sl-tooltip>
            <sl-tooltip content="Set item to null" placement="left">
              <sl-button
                className="del"
                variant="text"
                size="small"
                onclick={() => {
                  const index = getIndexInParent(item) - 1; // -1 to account for the "Add" button
                  this._value[index] = null;
                  const [node] = this._createItem(factory, null);
                  item.replaceWith(node);
                  this.dispatchEvent(new GuiChangeEvent(this.value));
                }}
              >
                Reset
              </sl-button>
            </sl-tooltip>
          </div>
        ) : (
          <sl-tooltip content="Delete item" placement="left">
            <sl-button
              className="del"
              variant="text"
              size="small"
              onclick={() => {
                const index = getIndexInParent(item) - 1; // -1 to account for the "Add" button
                this._value.splice(index, 1);
                item.remove();
                this.dispatchEvent(new GuiChangeEvent(this.value));
              }}
            >
              {/* &#10005; = ✕ */}
              &#10005;
            </sl-button>
          </sl-tooltip>
        )}
        <div className="sep" />
        {input}
      </div>
    ) as Element;
    return [item, input];
  }
}

export class GuiInputMap extends GuiInputElement<Map<unknown, unknown> | std.core.Map> {
  private _value: Map<unknown, unknown> = new Map();
  private _key_type: AbiType | undefined;
  private _key_type_nullable = false;
  private _value_type: AbiType | undefined;
  private _value_type_nullable = false;
  private _entries: HTMLElement;

  static STYLE: CSSStyleSheet;
  static {
    this.STYLE = new CSSStyleSheet();
    this.STYLE.replaceSync(MapStyle);
  }

  constructor() {
    super();

    this._entries = document.createElement('div');
    this._entries.className = 'entries';

    this.shadowRoot.adoptedStyleSheets.push(GuiInputMap.STYLE);
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.update();
  }

  get value(): Map<unknown, unknown> {
    return this._value;
  }

  set value(value: Map<unknown, unknown> | std.core.Map | null | undefined) {
    if (value instanceof std.core.Map) {
      if (value.$type.generic_abi_type != 0) {
        this._key_type = value.$type.abi.types[value.$type.g1()];
        this._key_type_nullable = value.$type.g1Nullable();
        this._value_type = value.$type.abi.types[value.$type.g2()];
        this._value_type_nullable = value.$type.g2Nullable();
      }
      value = value.map;
    }
    if (value === null || value === undefined) {
      this._value.clear();
    } else {
      this._value = value;
    }
    this.update();
  }

  get keyType() {
    return this._key_type;
  }

  set keyType(type: AbiType | undefined) {
    this._key_type = type;
    this.update();
  }

  get keyTypeNullable() {
    return this._key_type_nullable;
  }

  set keyTypeNullable(nullable: boolean) {
    this._key_type_nullable = nullable;
    this.update();
  }

  get valueType() {
    return this._value_type;
  }

  set valueType(type: AbiType | undefined) {
    this._value_type = type;
    this.update();
  }

  get valueTypeNullable() {
    return this._value_type_nullable;
  }

  set valueTypeNullable(nullable: boolean) {
    this._value_type_nullable = nullable;
    this.update();
  }

  update(): void {
    if (!this.isConnected) {
      return;
    }

    const factory = GuiInputFactory.closest(this);
    const entries = document.createDocumentFragment();
    for (const [key, value] of this._value) {
      const [entry] = this._createEntry(factory, key, value);
      entries.appendChild(entry);
    }

    this._entries.replaceChildren(entries);
    this.shadowRoot.replaceChildren(
      <>
        <sl-button
          className="btn"
          variant="text"
          size="small"
          onclick={() => {
            const [node, keyInput, valInput] = this._createEntry(factory);
            if (keyInput) {
              this._value.set(keyInput.value, valInput?.value ?? null);
            }
            this._entries.appendChild(node);
            this.dispatchEvent(new GuiChangeEvent(this.value));
          }}
        >
          Add entry
        </sl-button>
        {this._entries}
      </>,
    );
  }

  private _createEntry(
    factory: GuiInputFactory,
    key?: unknown,
    value?: unknown,
  ): [Node, GuiInputElement<unknown> | null, GuiInputElement<unknown> | null] {
    if (this._key_type) {
      if ((key === null || key === undefined) && !this._key_type_nullable) {
        key = new this._key_type.factory(this._key_type);
      }
    }
    if (this._value_type) {
      if ((value === null || value === undefined) && !this._value_type_nullable) {
        value = new this._value_type.factory(this._value_type);
      }
    }

    const keyInput = factory.createElement(key, this._key_type);
    keyInput.value = key;

    if (this._value_type && this._value_type_nullable && (value === null || value === undefined)) {
      let prevKey = keyInput.value;
      const entryUpdate = () => {
        this._value.delete(prevKey);
        const newKey = keyInput.value;
        this._value.set(newKey, null);
        prevKey = newKey;
      };
      keyInput.addEventListener('gui-change', entryUpdate);

      const value_type = this._value_type;
      const entry = (
        <div className="entry">
          <sl-tooltip content="Delete entry" placement="left">
            <sl-button
              className="btn"
              variant="text"
              size="small"
              onclick={() => {
                this._value.delete(keyInput.value);
                entry.remove();
                this.dispatchEvent(new GuiChangeEvent(this.value));
              }}
            >
              {/* &#10005; = ✕ */}
              &#10005;
            </sl-button>
          </sl-tooltip>
          <div className="sep" />
          {keyInput}
          <div className="sep" />
          <sl-button
            className="btn"
            variant="text"
            size="small"
            onclick={() => {
              const value = new value_type.factory(value_type);
              const [node, keyInputEl, valInput] = this._createEntry(
                factory,
                keyInput.value,
                value,
              );
              if (keyInputEl && valInput) {
                this._value.set(keyInputEl.value, valInput.value);
              }
              this._entries.replaceChild(node, entry);
              this.dispatchEvent(new GuiChangeEvent(this.value));
            }}
          >
            Set a value
          </sl-button>
        </div>
      ) as Element;
      return [entry, keyInput, null];
    }

    let prevKey = keyInput.value;
    const entryUpdate = () => {
      this._value.delete(prevKey);
      const newKey = keyInput.value;
      this._value.set(newKey, valInput.value);
      prevKey = newKey;
    };
    keyInput.addEventListener('gui-change', entryUpdate);

    const valInput = factory.createElement(value, this._value_type);
    valInput.value = value;
    valInput.addEventListener('gui-change', entryUpdate);
    const entry = (
      <div className="entry">
        {this._value_type_nullable ? (
          <div>
            <sl-tooltip content="Delete entry" placement="left">
              <sl-button
                className="btn"
                variant="text"
                size="small"
                onclick={() => {
                  this._value.delete(keyInput.value);
                  entry.remove();
                  this.dispatchEvent(new GuiChangeEvent(this.value));
                }}
              >
                {/* &#10005; = ✕ */}
                &#10005;
              </sl-button>
            </sl-tooltip>
            <sl-tooltip content="Set value to null" placement="left">
              <sl-button
                className="btn"
                variant="text"
                size="small"
                onclick={() => {
                  const [node] = this._createEntry(factory, key, null);
                  this._value.set(keyInput.value, null);
                  this._entries.replaceChild(node, entry);
                  this.dispatchEvent(new GuiChangeEvent(this.value));
                }}
              >
                Reset
              </sl-button>
            </sl-tooltip>
          </div>
        ) : (
          <sl-tooltip content="Delete entry" placement="left">
            <sl-button
              className="btn"
              variant="text"
              size="small"
              onclick={() => {
                this._value.delete(keyInput.value);
                entry.remove();
                this.dispatchEvent(new GuiChangeEvent(this.value));
              }}
            >
              {/* &#10005; = ✕ */}
              &#10005;
            </sl-button>
          </sl-tooltip>
        )}
        <div className="sep" />
        {keyInput}
        <div className="sep" />
        {valInput}
      </div>
    ) as Element;
    return [entry, keyInput, valInput];
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

    this.shadowRoot.adoptedStyleSheets.push(GuiInputGeo.STYLE);

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
    let lat = this._latInput.value;
    let lng = this._lngInput.value;
    if (lat === null || lng === null) {
      return null;
    }
    lat = Number(lat);
    lng = Number(lng);
    if (isNaN(lat) || isNaN(lng)) {
      return null;
    }
    return std.core.geo.fromLatLng(lat, lng);
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
  private _input: sl.SlInput;

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

export class GuiInputUnsupported extends GuiInputElement<undefined> {
  static STYLE: CSSStyleSheet;
  static {
    this.STYLE = new CSSStyleSheet();
    this.STYLE.replaceSync(UnsupportedStyle);
  }

  value = undefined;
  private _message = document.createTextNode('');

  constructor() {
    super();

    this.shadowRoot.adoptedStyleSheets.push(GuiInputUnsupported.STYLE);
    this.shadowRoot.appendChild(<em>This type is not supported{this._message}</em>);
  }

  set message(message: string) {
    this._message.textContent = `: ${message}`;
  }
}

/**
 * Walks the DOM tree upwards in the search of a `GuiInputElement` instance.
 *
 * By default, it will return the first matching parent, but that can be changed by specifying
 * a higher `level` than `1`.
 * @param from
 * @param level
 * @returns
 */
export function findParentInputElement(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  from: GuiInputElement<any>,
  level = 1,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): GuiInputElement<any> {
  let parent: ParentNode | null = from;
  while (parent !== null) {
    if (parent instanceof ShadowRoot) {
      parent = parent.host;
    } else {
      parent = parent.parentNode;
    }
    if (parent instanceof GuiInputElement) {
      if (level === 1) {
        return parent;
      }
      level -= 1;
    }
  }
  throw new Error('Looks like element `from` is not in a DOM');
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
    'gui-input-abstract': GuiInputAbstract;
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
    'gui-input-unsupported': GuiInputUnsupported;
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
        'gui-input-abstract': GreyCat.Element<GuiInputAbstract, GuiInputEventMap>;
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
        'gui-input-unsupported': GreyCat.Element<GuiInputUnsupported, GuiInputEventMap>;
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
registerCustomElement('gui-input-abstract', GuiInputAbstract);
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
registerCustomElement('gui-input-unsupported', GuiInputUnsupported);
