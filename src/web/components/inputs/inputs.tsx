import {
  sl,
  GuiInputFactory,
  getIndexInParent,
  GuiChangeEvent,
  GuiInputEvent,
} from '../../exports.js';
import { css, GuiElement, registerCustomElement } from '../common.js';
import '../searchable-select/index.js';
import type { GuiSearchableSelect, SearchableOption } from '../searchable-select/index.js';

import InputStyle from './input.css?inline';
import ArrayStyle from './input-array.css?inline';
import MapStyle from './input-map.css?inline';
import ObjectStyle from './input-object.css?inline';
import AbstractStyle from './input-abstract.css?inline';
import AnyStyle from './input-any.css?inline';
import DurationStyle from './input-duration.css?inline';
import GeoStyle from './input-geo.css?inline';
import UnsupportedStyle from './input-unsupported.css?inline';

export abstract class GuiInputElement<T> extends GuiElement {
  static override styles = [css(InputStyle)];

  connectedCallback() {
    this.classList.add('gui-input');
  }

  abstract get value(): T;
  abstract set value(value: T);

  update(): void {}

  get name() {
    return '';
  }
  set name(_name: string) {}
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
  get required() {
    return true;
  }
  set required(_required: boolean) {}
  get disabled() {
    return false;
  }
  set disabled(_disabled: boolean) {}
  get size() {
    return 'medium';
  }
  set size(_size: sl.SlInput['size']) {}
}

export class GuiInput extends GuiInputElement<unknown> {
  input: GuiInputElement<unknown>;

  constructor() {
    super();

    this.input = document.createElement('gui-input-string');
  }

  get value() {
    return this.input.value;
  }

  set value(value: unknown) {
    this.input = GuiInputFactory.closest(this).createElement(value);
    this.shadowRoot.replaceChildren(this.input);
  }

  override get name() {
    return this.input.name;
  }
  override set name(name: string) {
    this.input.name = name;
  }
  override get autocomplete() {
    return this.input.autocomplete;
  }
  override set autocomplete(value: string) {
    this.input.autocomplete = value;
  }
  override get placeholder(): string {
    return this.input.placeholder;
  }
  override set placeholder(value: string) {
    this.input.placeholder = value;
  }
  override get label() {
    return this.input.label;
  }
  override set label(label: string) {
    this.input.label = label;
  }
  override get helpText() {
    return this.input.helpText;
  }
  override set helpText(helpText: string) {
    this.input.helpText = helpText;
  }
  override get required() {
    return this.input.required;
  }
  override set required(required: boolean) {
    this.input.required = required;
  }
  override get disabled() {
    return this.input.disabled;
  }
  override set disabled(disabled: boolean) {
    this.input.disabled = disabled;
  }
  override get size() {
    return this.input.size;
  }
  override set size(size: sl.SlInput['size']) {
    this.input.size = size;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setAttrs(attrs: any) {
    this.input = GuiInputFactory.closest(this).createElement(attrs.value);
    Object.assign(this.input, attrs);
    this.shadowRoot.replaceChildren(this.input);
  }
}

export class GuiInputString extends GuiInputElement<string | greycat.core.String | null> {
  input: sl.SlInput;

  constructor() {
    super();

    this.input = document.createElement('sl-input');
    this.input.setAttribute('exportparts', 'base');
    this.input.addEventListener('sl-input', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiInputEvent(this.value));
    });
    this.input.addEventListener('sl-change', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiChangeEvent(this.value));
    });

    this.shadowRoot.replaceChildren(this.input);
  }

  override get name() {
    return this.input.name;
  }
  override set name(name: string) {
    this.input.name = name;
  }
  override get autocomplete() {
    return this.input.autocomplete;
  }
  override set autocomplete(value: string) {
    this.input.autocomplete = value;
  }
  override get placeholder(): string {
    return this.input.placeholder;
  }
  override set placeholder(value: string) {
    this.input.placeholder = value;
  }
  override get label() {
    return this.input.label;
  }
  override set label(label: string) {
    this.input.label = label;
  }
  override get helpText() {
    return this.input.helpText;
  }
  override set helpText(helpText: string) {
    this.input.helpText = helpText;
  }
  override get required() {
    return this.input.required;
  }
  override set required(required: boolean) {
    this.input.required = required;
  }
  override get disabled() {
    return this.input.disabled;
  }
  override set disabled(disabled: boolean) {
    this.input.disabled = disabled;
  }
  override get size() {
    return this.input.size;
  }
  override set size(size: sl.SlInput['size']) {
    this.input.size = size;
  }

  get value(): string {
    return this.input.value;
  }

  set value(value: string | greycat.core.String | null | undefined) {
    if (value instanceof greycat.core.String) {
      value = value.value;
    }
    if (value === null || value === undefined) {
      this.input.value = '';
    } else {
      this.input.value = value;
    }
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('exportparts', 'base');
  }
}

export class GuiInputStr extends GuiInputElement<string | greycat.core.str | null> {
  input: sl.SlInput;

  constructor() {
    super();

    this.input = document.createElement('sl-input');
    this.input.setAttribute('exportparts', 'base');
    this.input.addEventListener('sl-input', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiInputEvent(this.value));
    });
    this.input.addEventListener('sl-change', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiChangeEvent(this.value));
    });

    this.shadowRoot.replaceChildren(this.input);
  }

  override get name() {
    return this.input.name;
  }
  override set name(name: string) {
    this.input.name = name;
  }
  override get autocomplete() {
    return this.input.autocomplete;
  }
  override set autocomplete(value: string) {
    this.input.autocomplete = value;
  }
  override get placeholder(): string {
    return this.input.placeholder;
  }
  override set placeholder(value: string) {
    this.input.placeholder = value;
  }
  override get label() {
    return this.input.label;
  }
  override set label(label: string) {
    this.input.label = label;
  }
  override get helpText() {
    return this.input.helpText;
  }
  override set helpText(helpText: string) {
    this.input.helpText = helpText;
  }
  override get required() {
    return this.input.required;
  }
  override set required(required: boolean) {
    this.input.required = required;
  }
  override get disabled() {
    return this.input.disabled;
  }
  override set disabled(disabled: boolean) {
    this.input.disabled = disabled;
  }
  override get size() {
    return this.input.size;
  }
  override set size(size: sl.SlInput['size']) {
    this.input.size = size;
  }

  get value(): greycat.core.str {
    return greycat.core.str.fromString(this.input.value);
  }
  set value(value: string | greycat.core.str | null | undefined) {
    if (value instanceof greycat.core.str) {
      value = value.toString();
    }
    if (value === null || value === undefined) {
      this.input.value = '';
    } else {
      this.input.value = value;
    }
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('exportparts', 'base');
  }
}

export class GuiInputNumber extends GuiInputElement<number | bigint | null> {
  input: sl.SlInput;

  constructor() {
    super();

    this.input = document.createElement('sl-input');
    this.input.type = 'number';
    this.input.step = 'any';
    this.input.setAttribute('exportparts', 'base');

    this.input.addEventListener('sl-input', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiInputEvent(this.value));
    });
    this.input.addEventListener('sl-change', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiChangeEvent(this.value));
    });

    this.shadowRoot.replaceChildren(this.input);
  }

  get value(): number | null {
    if (this.input.value.length === 0) {
      return null;
    }
    return this.input.valueAsNumber;
  }

  set value(
    value: number | bigint | greycat.sdk.std_n.core.int | greycat.sdk.std_n.core.float | null | undefined,
  ) {
    if (value === null || value === undefined) {
      this.input.value = '';
    } else {
      this.input.value = `${value}`;
    }
  }

  override get name() {
    return this.input.name;
  }
  override set name(name: string) {
    this.input.name = name;
  }
  override get autocomplete() {
    return this.input.autocomplete;
  }
  override set autocomplete(value: string) {
    this.input.autocomplete = value;
  }
  override get placeholder(): string {
    return this.input.placeholder;
  }
  override set placeholder(value: string) {
    this.input.placeholder = value;
  }
  override get label() {
    return this.input.label;
  }
  override set label(label: string) {
    this.input.label = label;
  }
  override get helpText() {
    return this.input.helpText;
  }
  override set helpText(helpText: string) {
    this.input.helpText = helpText;
  }
  override get required() {
    return this.input.required;
  }
  override set required(required: boolean) {
    this.input.required = required;
  }
  override get disabled() {
    return this.input.disabled;
  }
  override set disabled(disabled: boolean) {
    this.input.disabled = disabled;
  }
  override get size() {
    return this.input.size;
  }
  override set size(size: sl.SlInput['size']) {
    this.input.size = size;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('exportparts', 'base');
  }
}

export class GuiInputBool extends GuiInputElement<boolean | null> {
  input: sl.SlCheckbox;

  constructor() {
    super();

    this.input = document.createElement('sl-checkbox');
    this.input.addEventListener('sl-change', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiChangeEvent(this.value));
    });

    this.shadowRoot.replaceChildren(this.input);
  }

  get value(): boolean {
    return this.input.checked;
  }

  set value(value: boolean | greycat.sdk.std_n.core.bool | null | undefined) {
    if (value instanceof greycat.sdk.std_n.core.bool) {
      this.input.checked = value.value;
    } else {
      this.input.checked = Boolean(value);
    }
  }

  override get name() {
    return this.input.name;
  }
  override set name(name: string) {
    this.input.name = name;
  }
  override get label() {
    return this.input.textContent ?? '';
  }
  override set label(label: string) {
    this.input.textContent = label;
  }
  override get helpText() {
    return this.input.helpText;
  }
  override set helpText(helpText: string) {
    this.input.helpText = helpText;
  }
  override get required() {
    return this.input.required;
  }
  override set required(required: boolean) {
    this.input.required = required;
  }
  override get disabled() {
    return this.input.disabled;
  }
  override set disabled(disabled: boolean) {
    this.input.disabled = disabled;
  }
  override get size() {
    return this.input.size;
  }
  override set size(size: sl.SlInput['size']) {
    this.input.size = size;
  }
}

export class GuiInputTime extends GuiInputElement<greycat.core.time | null> {
  private _value: greycat.core.time | null = null;
  input: sl.SlInput;

  constructor() {
    super();

    this.input = document.createElement('sl-input');
    this.input.type = 'datetime-local';
    this.input.step = 1;

    this.input.addEventListener('sl-input', (ev) => {
      ev.stopPropagation();
      const epochMs = this.input.valueAsNumber;
      if (isNaN(epochMs)) {
        this._value = null;
      } else {
        this._value = greycat.core.time.fromMs(epochMs);
      }
      this.dispatchEvent(new GuiInputEvent(this.value));
    });
    this.input.addEventListener('sl-change', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiChangeEvent(this.value));
    });

    this.shadowRoot.replaceChildren(this.input);
  }

  get value(): greycat.core.time | null {
    return this._value;
  }

  set value(value: greycat.core.time | null | undefined) {
    this._value = value ?? null;
    this.update();
  }

  override get name() {
    return this.input.name;
  }
  override set name(name: string) {
    this.input.name = name;
  }
  override get autocomplete() {
    return this.input.autocomplete;
  }
  override set autocomplete(value: string) {
    this.input.autocomplete = value;
  }
  override get placeholder(): string {
    return this.input.placeholder;
  }
  override set placeholder(value: string) {
    this.input.placeholder = value;
  }
  override get label() {
    return this.input.label;
  }
  override set label(label: string) {
    this.input.label = label;
  }
  override get helpText() {
    return this.input.helpText;
  }
  override set helpText(helpText: string) {
    this.input.helpText = helpText;
  }
  override get required() {
    return this.input.required;
  }
  override set required(required: boolean) {
    this.input.required = required;
  }
  override get disabled() {
    return this.input.disabled;
  }
  override set disabled(disabled: boolean) {
    this.input.disabled = disabled;
  }
  override get size() {
    return this.input.size;
  }
  override set size(size: sl.SlInput['size']) {
    this.input.size = size;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.input.updateComplete.then(() => this.update());
  }

  override update(): void {
    if (!this.isConnected) {
      return;
    }

    if (this._value) {
      this.input.input.valueAsNumber = this._value.epochMs;
      this.input.value = this.input.input.value;
    } else {
      this.input.value = '';
    }
  }
}

export class GuiInputType extends GuiInputElement<greycat.core.type | null> {
  private _value: greycat.core.type | null = null;
  input: sl.SlInput;

  constructor() {
    super();

    this.input = document.createElement('sl-input');
    this.input.placeholder = `Specify a type fqn (eg. 'runtime::User')`;
    this.input.addEventListener('sl-input', (ev) => {
      ev.stopPropagation();
      const type = greycat.$.default.findType(this.input.value);
      if (type) {
        this._value = greycat.core.type.create(type.offset);
      } else {
        this._value = null;
      }
      this.dispatchEvent(new GuiInputEvent(this.value));
    });
    this.input.addEventListener('sl-change', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiChangeEvent(this.value));
    });

    this.shadowRoot.replaceChildren(this.input);
  }

  get value(): greycat.core.type | null {
    return this._value;
  }

  set value(value: greycat.core.type | null | undefined) {
    this._value = value ?? null;
    this.update();
  }

  override get name() {
    return this.input.name;
  }
  override set name(name: string) {
    this.input.name = name;
  }
  override get autocomplete() {
    return this.input.autocomplete;
  }
  override set autocomplete(value: string) {
    this.input.autocomplete = value;
  }
  override get placeholder(): string {
    return this.input.placeholder;
  }
  override set placeholder(value: string) {
    this.input.placeholder = value;
  }
  override get label() {
    return this.input.label;
  }
  override set label(label: string) {
    this.input.label = label;
  }
  override get helpText() {
    return this.input.helpText;
  }
  override set helpText(helpText: string) {
    this.input.helpText = helpText;
  }
  override get required() {
    return this.input.required;
  }
  override set required(required: boolean) {
    this.input.required = required;
  }
  override get disabled() {
    return this.input.disabled;
  }
  override set disabled(disabled: boolean) {
    this.input.disabled = disabled;
  }
  override get size() {
    return this.input.size;
  }
  override set size(size: sl.SlInput['size']) {
    this.input.size = size;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('exportparts', 'base');
    this.input.updateComplete.then(() => this.update());
  }

  override update(): void {
    if (!this.isConnected) {
      return;
    }

    if (this._value) {
      this.input.value = this._value.toString();
    } else {
      this.input.value = '';
    }
  }
}

export class GuiInputField extends GuiInputElement<greycat.core.field | null> {
  private _value: greycat.core.field | null = null;
  input: sl.SlInput;

  constructor() {
    super();

    this.input = document.createElement('sl-input');
    this.input.placeholder = `Specify a field fqn (eg. 'runtime::User::name')`;
    this.input.addEventListener('sl-input', (ev) => {
      ev.stopPropagation();
      const index = this.input.value.lastIndexOf('::');
      if (index < 0) {
        this._value = null;
      } else {
        const type_fqn = this.input.value.slice(0, index);
        const field_name = this.input.value.slice(index + 2);
        const type = greycat.$.default.findType(type_fqn);
        if (type) {
          const offset = type.attrs.findIndex((a) => a.name === field_name);
          if (offset >= 0) {
            this._value = greycat.core.field.create(type.offset, offset);
          } else {
            this._value = null;
          }
        } else {
          this._value = null;
        }
      }
      this.dispatchEvent(new GuiInputEvent(this.value));
    });
    this.input.addEventListener('sl-change', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiChangeEvent(this.value));
    });

    this.shadowRoot.replaceChildren(this.input);
  }

  get value(): greycat.core.field | null {
    return this._value;
  }

  set value(value: greycat.core.field | null | undefined) {
    this._value = value ?? null;
    this.update();
  }

  override get name() {
    return this.input.name;
  }
  override set name(name: string) {
    this.input.name = name;
  }
  override get autocomplete() {
    return this.input.autocomplete;
  }
  override set autocomplete(value: string) {
    this.input.autocomplete = value;
  }
  override get placeholder(): string {
    return this.input.placeholder;
  }
  override set placeholder(value: string) {
    this.input.placeholder = value;
  }
  override get label() {
    return this.input.label;
  }
  override set label(label: string) {
    this.input.label = label;
  }
  override get helpText() {
    return this.input.helpText;
  }
  override set helpText(helpText: string) {
    this.input.helpText = helpText;
  }
  override get required() {
    return this.input.required;
  }
  override set required(required: boolean) {
    this.input.required = required;
  }
  override get disabled() {
    return this.input.disabled;
  }
  override set disabled(disabled: boolean) {
    this.input.disabled = disabled;
  }
  override get size() {
    return this.input.size;
  }
  override set size(size: sl.SlInput['size']) {
    this.input.size = size;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.input.updateComplete.then(() => this.update());
  }

  override update(): void {
    if (!this.isConnected) {
      return;
    }

    if (this._value) {
      this.input.value = this._value.toString();
    } else {
      this.input.value = '';
    }
  }
}

export class GuiInputEnum extends GuiInputElement<greycat.sdk.GCEnum | null> {
  input: GuiSearchableSelect;
  private _type: greycat.sdk.AbiType | undefined;

  constructor() {
    super();

    this.input = document.createElement('gui-searchable-select');
    this.input.setAttribute('exportparts', 'base');
    this.input.addEventListener('gui-change', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiChangeEvent(this.value));
    });

    this.shadowRoot.replaceChildren(this.input);
  }

  get type() {
    return this._type;
  }

  set type(type: greycat.sdk.AbiType | string | undefined) {
    if (typeof type === 'string') {
      type = greycat.$.default.findType(type);
    }

    if (type) {
      if (type.name === this._type?.name) {
        return;
      }
      if (!type.is_enum) {
        throw new Error('Type is not an enum');
      }
      this._type = type;
      this.input.placeholder = this._type.name;
      this.input.options = this._type.enum_values!.map((v) => ({
        text: v.key,
        value: v.offset,
      }));
    } else {
      this._type = undefined;
      this.input.placeholder = '';
      this.input.value = undefined;
      this.input.options = [];
    }
  }

  get value(): greycat.sdk.GCEnum | null {
    return this._type?.enum_values?.[this.input.value as number] ?? null;
  }

  set value(value: greycat.sdk.GCEnum | null | undefined) {
    if (value === null || value === undefined) {
      this.input.value = undefined;
      return;
    }

    this.type = value.$type;
    this.input.value = value.offset;
  }

  override get name() {
    return this.input.name;
  }
  override set name(name: string) {
    this.input.name = name;
  }
  override get autocomplete() {
    return this.input.autocomplete;
  }
  override set autocomplete(value: string) {
    this.input.autocomplete = value;
  }
  override get placeholder(): string {
    return this.input.placeholder;
  }
  override set placeholder(value: string) {
    this.input.placeholder = value;
  }
  override get label() {
    return this.input.label;
  }
  override set label(label: string) {
    this.input.label = label;
  }
  override get helpText() {
    return this.input.helpText;
  }
  override set helpText(helpText: string) {
    this.input.helpText = helpText;
  }
  override get required() {
    return this.input.required;
  }
  override set required(required: boolean) {
    this.input.required = required;
  }
  override get disabled() {
    return this.input.disabled;
  }
  override set disabled(disabled: boolean) {
    this.input.disabled = disabled;
  }
  override get size() {
    return this.input.size;
  }
  override set size(size: sl.SlInput['size']) {
    this.input.size = size;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('exportparts', 'base');
  }
}
export class GuiInputAbstract extends GuiInputElement<unknown> {
  static override styles = [...GuiInputElement.styles, css(AbstractStyle)];

  private _select: sl.SlSelect;
  input: GuiInputObject;

  constructor() {
    super();

    this._select = document.createElement('sl-select');
    this._select.placeholder = 'Select a concrete type';
    this._select.setAttribute('exportparts', 'base');
    this._select.addEventListener('sl-change', (ev) => {
      ev.stopPropagation();
      const type = greycat.$.default.findType(this._select.value as string);
      if (!type) {
        throw new Error(`Unable to find type '${this._select.value}' in ABI`);
      }
      this.input.value = new type.ctor();
      this.dispatchEvent(new GuiChangeEvent(this.value));
    });

    this.input = document.createElement('gui-input-object');

    this.shadowRoot.replaceChildren(
      <div className="base">
        {this._select}
        {this.input}
      </div>,
    );
  }

  override get name() {
    return this.input.name;
  }
  override set name(name: string) {
    this.input.name = name;
  }
  override get placeholder(): string {
    return this._select.placeholder;
  }
  override set placeholder(value: string) {
    this._select.placeholder = value;
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
  override get required() {
    return this._select.required;
  }
  override set required(required: boolean) {
    this._select.required = required;
  }
  override get disabled() {
    return this._select.disabled;
  }
  override set disabled(disabled: boolean) {
    this._select.disabled = disabled;
  }
  override get size() {
    return this.input.size;
  }
  override set size(size: sl.SlInput['size']) {
    this.input.size = size;
    this._select.size = size;
  }

  set type(type: greycat.sdk.AbiType | string | null) {
    if (type === null) {
      this._select.placeholder = 'No type';
      this._select.disabled = true;
      this._select.replaceChildren();
      return;
    } else if (typeof type === 'string') {
      const ty = greycat.$.default.findType(type);
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
    this.input.value = undefined;
  }

  get value() {
    return this.input.value;
  }

  set value(value: greycat.sdk.GCObject | undefined) {
    this.input.value = value;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('exportparts', 'base');
  }
}

export class GuiInputObject extends GuiInputElement<greycat.sdk.GCObject | undefined> {
  static override styles = [...GuiInputElement.styles, css(ObjectStyle)];

  protected _value: greycat.sdk.GCObject | undefined;

  get value() {
    return this._value;
  }

  set value(value: greycat.sdk.GCObject | undefined) {
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

  override update(): void {
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
    this.shadowRoot.replaceChildren(
      <div className="root" part="root">
        {fields}
      </div>,
    );
  }

  validate(): boolean {
    if (!this._value) {
      return true;
    }
    for (const attr of this._value.$type.attrs) {
      const value = this._value[attr.name];
      if (!attr.nullable && (value === null || value === undefined)) {
        return false;
      }
    }
    return true;
  }

  private _createAttr(
    abi: greycat.sdk.Abi,
    factory: GuiInputFactory,
    object: greycat.sdk.GCObject,
    type: greycat.sdk.AbiType,
    attr: greycat.sdk.AbiAttribute,
    value: unknown,
  ): [Node, Element | null] {
    const attrType = abi.types[attr.abi_type];
    if (attr.nullable && (value === null || value === undefined)) {
      object[attr.name] = null; // ensures the value is 'null' rather than maybe 'undefined'
      const field = (
        <div className="field" part={`field ${attr.name}`}>
          <label className="label" part="label">
            <span className="field-name" part="field-name">
              {attr.name}
            </span>
            <span className="field-type" part="field-type">
              {this._attrType(attr, abi)}
            </span>
          </label>
          <div>
            <sl-button
              variant="text"
              size="small"
              onclick={() => {
                const value = new attrType.ctor();
                const [node, input] = this._createAttr(abi, factory, object, type, attr, value);
                field.replaceWith(node);
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
      ) as HTMLElement;
      return [field, null];
    }

    const slottedAttr = this.querySelector(`[slot="${attr.name}"]`);
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
      input.name = `${type.name}::${attr.name}`;
      input.required = true;
      object[attr.name] = input.value;
      input.addEventListener('gui-change', () => {
        object[attr.name] = input.value;
        this.validate();
      });
    }
    const field = (
      <div className="field" part={`field ${attr.name}`}>
        <label className="label" part="label">
          <span className="field-name" part="field-name">
            {attr.name}
          </span>
          <span className="field-type" part="field-type">
            {this._attrType(attr, abi)}
          </span>
        </label>
        {attr.nullable && (slottedAttr === null || slottedAttr instanceof GuiInputElement) ? (
          <div className="nullable">
            <sl-tooltip content="Set to null" placement="left">
              <sl-button
                className="del"
                variant="text"
                size="small"
                onclick={() => {
                  const [node] = this._createAttr(abi, factory, object, type, attr, null);
                  object[attr.name] = null;
                  field.replaceWith(node);
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
    ) as HTMLElement;
    return [field, input];
  }

  /**
   * Returns the attribute's type fqn, shortens to only the type symbol if the type is a core type
   */
  private _attrType(attr: greycat.sdk.AbiAttribute, abi: greycat.sdk.Abi): string {
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

  override set value(value: greycat.sdk.GCObject | undefined) {
    super.value = value;
  }

  get args() {
    if (this._value && this._value.$fields) {
      return this._value.$fields;
    }
    return [];
  }
}

export class GuiInputDuration extends GuiInputElement<greycat.core.duration | null> {
  static override styles = [...GuiInputElement.styles, css(DurationStyle)];

  readonly input: sl.SlInput;
  readonly select: sl.SlSelect;
  private readonly _units: greycat.core.DurationUnit[];

  constructor() {
    super();

    this.input = document.createElement('sl-input');
    this.input.placeholder = 'Value';
    this.input.type = 'number';
    this.input.required = true;
    this.input.part.add('value');
    this.input.addEventListener('sl-input', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiInputEvent(this.value));
    });
    this.input.addEventListener('sl-change', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiChangeEvent(this.value));
    });

    this.select = document.createElement('sl-select');
    this.select.placeholder = 'Unit';
    this.select.required = true;
    this.select.part.add('unit');
    this.select.addEventListener('sl-change', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiChangeEvent(this.value));
    });
    const durationUnit = greycat.$.default.findType(greycat.core.DurationUnit._type);
    if (!durationUnit || !durationUnit.enum_values) {
      throw new Error('Unable to find core.DurationUnit in ABI');
    }
    this._units = durationUnit.enum_values as greycat.core.DurationUnit[];
    for (const field of durationUnit.enum_values) {
      this.select.appendChild(<sl-option value={`${field.offset}`}>{field.key}</sl-option>);
    }

    this.shadowRoot.append(this.input, this.select);
  }

  get value(): greycat.core.duration | null {
    const durationValue = Number(this.input.value);
    const durationUnit = this.durationUnit;

    if (isNaN(durationValue) || !durationUnit) {
      return null;
    }

    return greycat.core.duration.from_unit(durationValue, durationUnit);
  }

  set value(value: greycat.core.duration | null | undefined) {
    if (value === null || value === undefined) {
      this.input.value = '';
      this.select.value = '';
    } else {
      const [val, unit] = greycat.sdk.decomposeDuration(value);
      this.input.value = `${val}`;
      this.select.value = unit.key;
    }
  }

  get durationValue() {
    return +this.input.value;
  }

  set durationValue(value: number | bigint | null) {
    this.input.value = `${value}`;
  }

  get durationUnit() {
    return this._units[+(this.select.value as string)];
  }

  set durationUnit(value: greycat.core.DurationUnit | null) {
    if (value) {
      this.select.value = value.key;
    } else {
      this.select.value = '';
    }
  }

  override get name() {
    return this.input.name;
  }
  override set name(name: string) {
    this.input.name = name;
  }
  override get autocomplete() {
    return this.input.autocomplete;
  }
  override set autocomplete(value: string) {
    this.input.autocomplete = value;
  }
  override get placeholder(): string {
    return this.input.placeholder;
  }
  override set placeholder(value: string) {
    this.input.placeholder = value;
    this.select.placeholder = value;
  }
  override get label() {
    return this.input.label;
  }
  override set label(label: string) {
    this.input.label = label;
    this.select.label = label;
  }
  override get helpText() {
    return this.input.helpText;
  }
  override set helpText(helpText: string) {
    this.input.helpText = helpText;
    this.select.helpText = helpText;
  }
  override get required() {
    return this.input.required;
  }
  override set required(required: boolean) {
    this.input.required = required;
    this.select.required = required;
  }
  override get disabled() {
    return this.input.disabled;
  }
  override set disabled(disabled: boolean) {
    this.input.disabled = disabled;
    this.select.disabled = disabled;
  }
}

export class GuiInputAny extends GuiInputElement<unknown> {
  static override styles = [...GuiInputElement.styles, css(AnyStyle)];

  private _value: unknown;
  readonly select: GuiSearchableSelect;
  input: GuiInputElement<unknown>;

  constructor() {
    super();

    this.select = document.createElement('gui-searchable-select');
    this.select.part.add('select');
    this.select.addEventListener('gui-change', (ev) => {
      ev.stopPropagation();
      if (ev.detail === null) {
        this.input.value = null;
      } else {
        const type = greycat.$.default.abi.types[ev.detail];
        this.value = new type.ctor();
      }
      this.dispatchEvent(new GuiChangeEvent(this.value));
    });

    const opts: SearchableOption[] = Array.from({ length: greycat.$.default.abi.types.length - 1 });
    for (let index = 1; index < greycat.$.default.abi.types.length; index++) {
      const t = greycat.$.default.abi.types[index];
      opts[index - 1] = { text: t.name, value: t.offset };
    }

    this.select.options = opts;

    this.input = document.createElement('gui-input-string');
    this.input.part.add('input');
    this.input.value = null;

    this.shadowRoot.replaceChildren(
      <>
        {this.select}
        {this.input}
      </>,
    );
  }

  get value() {
    return this._value;
  }

  set value(value: unknown) {
    this._value = value;
    const factory = GuiInputFactory.closest(this);
    const abi = greycat.$.default.abi;
    let input: GuiInputElement<unknown>;
    switch (typeof value) {
      case 'bigint':
      case 'number': {
        if (Number.isInteger(value)) {
          this.select.value = abi.core.int;
          input = factory.createElement(value, abi.types[abi.core.int]);
        } else {
          this.select.value = abi.core.float;
          input = factory.createElement(value, abi.types[abi.core.float]);
        }
        break;
      }
      case 'boolean':
        this.select.value = abi.core.bool;
        input = factory.createElement(value, abi.types[abi.core.bool]);
        break;
      case 'object': {
        if (Array.isArray(value)) {
          this.select.value = abi.core.array;
          input = factory.createElement(value, abi.types[abi.core.array]);
        } else if (value instanceof Map) {
          this.select.value = greycat.$.default.abi.core.map;
          input = factory.createElement(value, abi.types[abi.core.map]);
        } else if (value instanceof greycat.sdk.GCObject) {
          if (value.$type.offset === 0) {
            this.select.value = abi.core.string;
            input = document.createElement('gui-input-string');
          } else {
            const type = abi.type_by_fqn.get(value.$type.name);
            if (type) {
              this.select.value = type.offset;
              input = factory.createElement(value, type);
            } else {
              this.select.value = undefined;
              const unsupported = document.createElement('gui-input-unsupported');
              unsupported.message = `Unable to find type '${value.$type.name}'`;
              input = unsupported;
            }
          }
        } else {
          this.select.value = undefined;
          const unsupported = document.createElement('gui-input-unsupported');
          unsupported.message = 'Unsupported value';
          input = unsupported;
        }
        break;
      }
      default: {
        this.select.value = abi.core.string;
        input = factory.createElement(value, abi.types[abi.core.string]);
        break;
      }
    }

    this.input.replaceWith(input);
    this.input = input;
    this.input.part.add('input');
    this.input.addEventListener('gui-change', () => {
      this._value = this.input.value;
    });
    if (!(value instanceof greycat.sdk.GCObject && value.$type.offset === 0)) {
      this.input.value = value;
    }
  }

  set options(options: SearchableOption[]) {
    this.select.options = options;
  }

  get options() {
    return this.select.options;
  }

  get type() {
    if (this.select.value === null) {
      return null;
    }
    return greycat.$.default.abi.types[this.select.value];
  }

  set type(value: greycat.sdk.AbiType | null) {
    if (value) {
      this.select.value = value.offset;
      this.input.value = new value.ctor();
    }
  }

  override get autocomplete(): string {
    return this.input.autocomplete;
  }

  override set autocomplete(value: string) {
    this.input.autocomplete = value;
  }

  override get placeholder() {
    return this.input.placeholder;
  }

  override set placeholder(placeholder: string) {
    this.input.placeholder = placeholder;
  }
}

export class GuiInputArray extends GuiInputElement<unknown[] | greycat.core.Array> {
  static override styles = [...GuiInputElement.styles, css(ArrayStyle)];

  private _generic_param: greycat.sdk.AbiType | undefined;
  private _generic_param_nullable = false;
  private _value: unknown[] = [];

  override connectedCallback(): void {
    super.connectedCallback();
    this.update();
  }

  get value(): unknown[] {
    return this._value;
  }

  set value(value: unknown[] | greycat.core.Array | null | undefined) {
    if (value instanceof greycat.core.Array) {
      if (value.$type.generic_abi_type !== 0) {
        this._generic_param = value.$type.abi.types[value.$type.g1()];
        this._generic_param_nullable = value.$type.g1Nullable();
      }
      value = value.values;
    }
    if (value === null || value === undefined) {
      this._value = [];
    } else {
      this._value = value;
    }
    this.update();
  }

  get genericParam() {
    return this._generic_param;
  }

  set genericParam(type: greycat.sdk.AbiType | undefined) {
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

  override update(): void {
    if (!this.isConnected) {
      return;
    }

    const factory = GuiInputFactory.closest(this);
    const items = document.createElement('div');
    items.className = 'items';
    items.part.add('items');
    for (const item of this._value) {
      const [node] = this._createItem(factory, items, item);
      items.appendChild(node);
    }
    this.shadowRoot.replaceChildren(
      <div className="root" part="root">
        <sl-button
          className="add"
          variant="text"
          size="small"
          onclick={() => {
            const [itemEl, input] = this._createItem(factory, items);
            this._value.push(input?.value);
            items.appendChild(itemEl);
            this.dispatchEvent(new GuiChangeEvent(this.value));
          }}
        >
          Add item
        </sl-button>
        {items}
      </div>,
    );
  }

  private _createItem(
    factory: GuiInputFactory,
    items: HTMLElement,
    value?: unknown,
  ): [Node, GuiInputElement<unknown> | null] {
    if (this._generic_param) {
      if (value === undefined && !this._generic_param_nullable) {
        value = new this._generic_param.ctor();
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
        <div className="item" part="item">
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
              const value = new generic_param.ctor();
              const [node, input] = this._createItem(factory, items, value);
              const index = getIndexInParent(item) - 1;
              this._value[index] = input?.value;
              items.replaceChild(node, item);
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
      <div className="item" part="item">
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
                  const [node] = this._createItem(factory, items, null);
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

export class GuiInputMap extends GuiInputElement<Map<unknown, unknown> | greycat.core.Map> {
  static override styles = [...GuiInputElement.styles, css(MapStyle)];

  private _value: Map<unknown, unknown> = new Map();
  private _key_type: greycat.sdk.AbiType | undefined;
  private _key_type_nullable = false;
  private _value_type: greycat.sdk.AbiType | undefined;
  private _value_type_nullable = false;
  private _entries: HTMLElement;

  constructor() {
    super();

    this._entries = document.createElement('div');
    this._entries.className = 'entries';
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.update();
  }

  get value(): Map<unknown, unknown> {
    return this._value;
  }

  set value(value: Map<unknown, unknown> | greycat.core.Map | null | undefined) {
    if (value instanceof greycat.core.Map) {
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

  set keyType(type: greycat.sdk.AbiType | undefined) {
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

  set valueType(type: greycat.sdk.AbiType | undefined) {
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

  override update(): void {
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
        key = new this._key_type.ctor();
      }
    }
    if (this._value_type) {
      if ((value === null || value === undefined) && !this._value_type_nullable) {
        value = new this._value_type.ctor();
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
              const value = new value_type.ctor();
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

export class GuiInputNode extends GuiInputElement<greycat.core.node | null> {
  input: GuiInputString;

  constructor() {
    super();

    this.input = document.createElement('gui-input-string');
    this.input.addEventListener('gui-change', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiChangeEvent(this.value));
    });
    this.input.addEventListener('gui-input', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiInputEvent(this.value));
    });

    this.shadowRoot.appendChild(this.input);
  }

  get value(): greycat.core.node | null {
    if (this.input.value !== null) {
      try {
        return greycat.core.node.fromRef(this.input.value);
      } catch {
        return null;
      }
    }
    return null;
  }

  set value(value: greycat.core.node | null | undefined) {
    if (value === null || value === undefined) {
      this.input.value = null;
    } else {
      this.input.value = value.ref;
    }
  }

  override get name() {
    return this.input.name;
  }
  override set name(name: string) {
    this.input.name = name;
  }
  override get autocomplete() {
    return this.input.autocomplete;
  }
  override set autocomplete(value: string) {
    this.input.autocomplete = value;
  }
  override get placeholder(): string {
    return this.input.placeholder;
  }
  override set placeholder(value: string) {
    this.input.placeholder = value;
  }
  override get label() {
    return this.input.label;
  }
  override set label(label: string) {
    this.input.label = label;
  }
  override get helpText() {
    return this.input.helpText;
  }
  override set helpText(helpText: string) {
    this.input.helpText = helpText;
  }
  override get required() {
    return this.input.required;
  }
  override set required(required: boolean) {
    this.input.required = required;
  }
  override get disabled() {
    return this.input.disabled;
  }
  override set disabled(disabled: boolean) {
    this.input.disabled = disabled;
  }
  override get size() {
    return this.input.size;
  }
  override set size(size: sl.SlInput['size']) {
    this.input.size = size;
  }
}

export class GuiInputNodeIndex extends GuiInputElement<greycat.core.nodeIndex | null> {
  input: GuiInputString;

  constructor() {
    super();

    this.input = document.createElement('gui-input-string');
    this.input.addEventListener('gui-change', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiChangeEvent(this.value));
    });
    this.input.addEventListener('gui-input', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiInputEvent(this.value));
    });

    this.shadowRoot.appendChild(this.input);
  }

  get value(): greycat.core.nodeIndex | null {
    if (this.input.value !== null) {
      try {
        return greycat.core.nodeIndex.fromRef(this.input.value);
      } catch {
        return null;
      }
    }
    return null;
  }

  set value(value: greycat.core.nodeIndex | null | undefined) {
    if (value === null || value === undefined) {
      this.input.value = null;
    } else {
      this.input.value = value.ref;
    }
  }

  override get name() {
    return this.input.name;
  }
  override set name(name: string) {
    this.input.name = name;
  }
  override get autocomplete() {
    return this.input.autocomplete;
  }
  override set autocomplete(value: string) {
    this.input.autocomplete = value;
  }
  override get placeholder(): string {
    return this.input.placeholder;
  }
  override set placeholder(value: string) {
    this.input.placeholder = value;
  }
  override get label() {
    return this.input.label;
  }
  override set label(label: string) {
    this.input.label = label;
  }
  override get helpText() {
    return this.input.helpText;
  }
  override set helpText(helpText: string) {
    this.input.helpText = helpText;
  }
  override get required() {
    return this.input.required;
  }
  override set required(required: boolean) {
    this.input.required = required;
  }
  override get disabled() {
    return this.input.disabled;
  }
  override set disabled(disabled: boolean) {
    this.input.disabled = disabled;
  }
  override get size() {
    return this.input.size;
  }
  override set size(size: sl.SlInput['size']) {
    this.input.size = size;
  }
}

export class GuiInputNodeTime extends GuiInputElement<greycat.core.nodeTime | null> {
  input: GuiInputString;

  constructor() {
    super();

    this.input = document.createElement('gui-input-string');
    this.input.addEventListener('gui-change', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiChangeEvent(this.value));
    });
    this.input.addEventListener('gui-input', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiInputEvent(this.value));
    });

    this.shadowRoot.appendChild(this.input);
  }

  get value(): greycat.core.nodeTime | null {
    if (this.input.value !== null) {
      try {
        return greycat.core.nodeTime.fromRef(this.input.value);
      } catch {
        return null;
      }
    }
    return null;
  }

  set value(value: greycat.core.nodeTime | null | undefined) {
    if (value === null || value === undefined) {
      this.input.value = null;
    } else {
      this.input.value = value.ref;
    }
  }

  override get name() {
    return this.input.name;
  }
  override set name(name: string) {
    this.input.name = name;
  }
  override get autocomplete() {
    return this.input.autocomplete;
  }
  override set autocomplete(value: string) {
    this.input.autocomplete = value;
  }
  override get placeholder(): string {
    return this.input.placeholder;
  }
  override set placeholder(value: string) {
    this.input.placeholder = value;
  }
  override get label() {
    return this.input.label;
  }
  override set label(label: string) {
    this.input.label = label;
  }
  override get helpText() {
    return this.input.helpText;
  }
  override set helpText(helpText: string) {
    this.input.helpText = helpText;
  }
  override get required() {
    return this.input.required;
  }
  override set required(required: boolean) {
    this.input.required = required;
  }
  override get disabled() {
    return this.input.disabled;
  }
  override set disabled(disabled: boolean) {
    this.input.disabled = disabled;
  }
  override get size() {
    return this.input.size;
  }
  override set size(size: sl.SlInput['size']) {
    this.input.size = size;
  }
}

export class GuiInputNodeList extends GuiInputElement<greycat.core.nodeList | null> {
  input: GuiInputString;

  constructor() {
    super();

    this.input = document.createElement('gui-input-string');
    this.input.addEventListener('gui-change', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiChangeEvent(this.value));
    });
    this.input.addEventListener('gui-input', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiInputEvent(this.value));
    });

    this.shadowRoot.appendChild(this.input);
  }

  get value(): greycat.core.nodeList | null {
    if (this.input.value !== null) {
      try {
        return greycat.core.nodeList.fromRef(this.input.value);
      } catch {
        return null;
      }
    }
    return null;
  }

  set value(value: greycat.core.nodeList | null | undefined) {
    if (value === null || value === undefined) {
      this.input.value = null;
    } else {
      this.input.value = value.ref;
    }
  }

  override get name() {
    return this.input.name;
  }
  override set name(name: string) {
    this.input.name = name;
  }
  override get autocomplete() {
    return this.input.autocomplete;
  }
  override set autocomplete(value: string) {
    this.input.autocomplete = value;
  }
  override get placeholder(): string {
    return this.input.placeholder;
  }
  override set placeholder(value: string) {
    this.input.placeholder = value;
  }
  override get label() {
    return this.input.label;
  }
  override set label(label: string) {
    this.input.label = label;
  }
  override get helpText() {
    return this.input.helpText;
  }
  override set helpText(helpText: string) {
    this.input.helpText = helpText;
  }
  override get required() {
    return this.input.required;
  }
  override set required(required: boolean) {
    this.input.required = required;
  }
  override get disabled() {
    return this.input.disabled;
  }
  override set disabled(disabled: boolean) {
    this.input.disabled = disabled;
  }
  override get size() {
    return this.input.size;
  }
  override set size(size: sl.SlInput['size']) {
    this.input.size = size;
  }
}

export class GuiInputNodeGeo extends GuiInputElement<greycat.core.nodeGeo | null> {
  input: GuiInputString;

  constructor() {
    super();

    this.input = document.createElement('gui-input-string');
    this.input.addEventListener('gui-change', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiChangeEvent(this.value));
    });
    this.input.addEventListener('gui-input', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiInputEvent(this.value));
    });

    this.shadowRoot.appendChild(this.input);
  }

  get value(): greycat.core.nodeGeo | null {
    if (this.input.value !== null) {
      try {
        return greycat.core.nodeGeo.fromRef(this.input.value);
      } catch {
        return null;
      }
    }
    return null;
  }

  set value(value: greycat.core.nodeGeo | null | undefined) {
    if (value === null || value === undefined) {
      this.input.value = null;
    } else {
      this.input.value = value.ref;
    }
  }

  override get name() {
    return this.input.name;
  }
  override set name(name: string) {
    this.input.name = name;
  }
  override get autocomplete() {
    return this.input.autocomplete;
  }
  override set autocomplete(value: string) {
    this.input.autocomplete = value;
  }
  override get placeholder(): string {
    return this.input.placeholder;
  }
  override set placeholder(value: string) {
    this.input.placeholder = value;
  }
  override get label() {
    return this.input.label;
  }
  override set label(label: string) {
    this.input.label = label;
  }
  override get helpText() {
    return this.input.helpText;
  }
  override set helpText(helpText: string) {
    this.input.helpText = helpText;
  }
  override get required() {
    return this.input.required;
  }
  override set required(required: boolean) {
    this.input.required = required;
  }
  override get disabled() {
    return this.input.disabled;
  }
  override set disabled(disabled: boolean) {
    this.input.disabled = disabled;
  }
  override get size() {
    return this.input.size;
  }
  override set size(size: sl.SlInput['size']) {
    this.input.size = size;
  }
}

export class GuiInputGeo extends GuiInputElement<greycat.core.geo | null> {
  static override styles = [...GuiInputElement.styles, css(GeoStyle)];

  latInput: GuiInputNumber;
  lngInput: GuiInputNumber;

  constructor() {
    super();

    this.latInput = document.createElement('gui-input-number');
    this.latInput.addEventListener('gui-change', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiChangeEvent(this.value));
    });
    this.latInput.addEventListener('gui-input', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiInputEvent(this.value));
    });

    this.lngInput = document.createElement('gui-input-number');
    this.lngInput.addEventListener('gui-change', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiChangeEvent(this.value));
    });
    this.lngInput.addEventListener('gui-input', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiInputEvent(this.value));
    });

    this.shadowRoot.appendChild(
      <>
        <label className="gui-input-label">Latitude</label>
        {this.latInput}
        <label className="gui-input-label">Longitude</label>
        {this.lngInput}
      </>,
    );
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('part', 'input-geo');
  }

  get value(): greycat.core.geo | null {
    let lat = this.latInput.value;
    let lng = this.lngInput.value;
    if (lat === null || lng === null) {
      return null;
    }
    lat = Number(lat);
    lng = Number(lng);
    if (isNaN(lat) || isNaN(lng)) {
      return null;
    }
    return greycat.core.geo.fromLatLng(lat, lng);
  }

  set value(value: greycat.core.geo | null | undefined) {
    if (value === null || value === undefined) {
      this.latInput.value = null;
      this.lngInput.value = null;
    } else {
      this.latInput.value = value.lat;
      this.lngInput.value = value.lng;
    }
  }
}

export class GuiInputFnPtr extends GuiInputElement<greycat.core.function_ | null> {
  input: sl.SlInput;

  constructor() {
    super();

    this.input = document.createElement('sl-input');
    this.input.placeholder = `Specify a function fqn (eg. 'runtime::User::me')`;
    this.input.clearable = true;
    this.input.addEventListener('input', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiInputEvent(this.value));
    });
    this.input.addEventListener('change', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiChangeEvent(this.value));
    });

    this.shadowRoot.replaceChildren(this.input);
  }

  get value(): greycat.core.function_ | null {
    if (this.input.value.length === 0) {
      return null;
    }
    try {
      return greycat.$.default.createFunctionByFqn(this.input.value) ?? null;
    } catch {
      return null;
    }
  }
  set value(fn: greycat.core.function_ | null | undefined) {
    if (fn) {
      this.input.value = fn.fqn;
    } else {
      this.input.value = '';
    }
  }

  override get name() {
    return this.input.name;
  }
  override set name(name: string) {
    this.input.name = name;
  }
  override get autocomplete() {
    return this.input.autocomplete;
  }
  override set autocomplete(value: string) {
    this.input.autocomplete = value;
  }
  override get placeholder(): string {
    return this.input.placeholder;
  }
  override set placeholder(value: string) {
    this.input.placeholder = value;
  }
  override get label() {
    return this.input.label;
  }
  override set label(label: string) {
    this.input.label = label;
  }
  override get helpText() {
    return this.input.helpText;
  }
  override set helpText(helpText: string) {
    this.input.helpText = helpText;
  }
  override get required() {
    return this.input.required;
  }
  override set required(required: boolean) {
    this.input.required = required;
  }
  override get disabled() {
    return this.input.disabled;
  }
  override set disabled(disabled: boolean) {
    this.input.disabled = disabled;
  }
  override get size() {
    return this.input.size;
  }
  override set size(size: sl.SlInput['size']) {
    this.input.size = size;
  }
}

export class GuiInputNull extends GuiInputElement<null> {
  value = null;

  constructor() {
    super();

    this.shadowRoot.appendChild(<em>null</em>);
  }
}

export class GuiInputUnsupported extends GuiInputElement<undefined> {
  static override styles = [...GuiInputElement.styles, css(UnsupportedStyle)];

  value = undefined;
  private _message = document.createTextNode('');

  constructor() {
    super();

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
    'gui-input-str': GuiInputStr;
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
    'gui-input-null': GuiInputNull;
    'gui-input-type': GuiInputType;
    'gui-input-field': GuiInputField;
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
        'gui-input-str': GreyCat.Element<GuiInputStr, GuiInputEventMap>;
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
        'gui-input-null': GreyCat.Element<GuiInputNull, GuiInputEventMap>;
        'gui-input-type': GreyCat.Element<GuiInputType, GuiInputEventMap>;
        'gui-input-field': GreyCat.Element<GuiInputField, GuiInputEventMap>;
      }
    }
  }
}

registerCustomElement('gui-input', GuiInput);
registerCustomElement('gui-input-string', GuiInputString);
registerCustomElement('gui-input-str', GuiInputStr);
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
registerCustomElement('gui-input-null', GuiInputNull);
registerCustomElement('gui-input-type', GuiInputType);
registerCustomElement('gui-input-field', GuiInputField);
