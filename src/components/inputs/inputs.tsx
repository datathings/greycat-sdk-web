import { AbiFunction, AbiType, GCEnum, GCObject, core, decomposeDuration } from '@greycat/sdk';
import type { SlInput, SlSelect } from '@shoelace-style/shoelace';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/select/select.js';
import { registerCustomElement } from '../common.js';
import '../searchable-select/index.js';
import type { GuiSearchableSelect, SearchableOption } from '../searchable-select/index.js';
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
    [core.int._type]: 'gui-input-number',
    [core.float._type]: 'gui-input-number',
    ['core::bool']: 'gui-input-bool',
    [core.String._type]: 'gui-input-string',
    ['core::char']: 'gui-input-string',
    [core.time._type]: 'gui-input-time',
    [core.duration._type]: 'gui-input-duration',
    [core.Array._type]: 'gui-input-array',
    [core.Map._type]: 'gui-input-map',
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
    if (value instanceof GCObject) {
      this._type = value.$type;
    }
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
          if (this._value !== undefined) {
            this._inner.value = this._value;
          }
        } else {
          if (this.config.nullable && this._value === undefined) {
            const input = document.createElement('gui-input-null');
            input.addEventListener('gui-change', (ev) => {
              ev.stopPropagation();
              this.value = ev.detail;
              this.dispatchEvent(new GuiChangeEvent(this.value));
            });

            input.type = this._type;
            this._inner = input;
          } else {
            const input = document.createElement('gui-input-object');
            input.type = this._type;
            if (this._value instanceof GCObject || this._value === null) {
              input.value = this._value;
            }
            this._inner = input;
          }
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
            // we have a 'null' here
            this._inner = document.createElement('gui-input-string'); // TODO replace with proper one
          } else {
            // we have an '{ ... }' here
            this._inner = document.createElement('gui-input-map');
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
    if (this._input.value.length === 0) {
      return null;
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
    if (this._input.value.length === 0) {
      return null;
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

    this._input = document.createElement('gui-searchable-select');
    this._input.addEventListener('gui-change', (ev) => {
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

  set type(type: AbiType | undefined) {
    if (type) {
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

  override render(): void {
    this._input.config = this._config;
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

  set type(type: AbiType | string | undefined) {
    if (this._type === undefined || this._type === type) {
      // no type or same type, noop
    } else {
      // different type, we need to clear the previous attributes
      this._attrs.clear();
    }
    if (typeof type === 'string') {
      type = greycat.default.findType(type);
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

        input.type = greycat.default.abi.types[attr.abi_type];
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
      if (this._attrs.size === 0) {
        return null;
      }
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
      //this._type = undefined;
      this._attrs.clear();
      this.render();
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
    if (this.value === null) {
      const elem = (
        <a
          onclick={() => {
            this.type = this._type;
            this.dispatchEvent(new GuiChangeEvent(this.value));
          }}
        >
          Set
        </a>
      );
      this.replaceChildren(elem);
      return;
    }

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

      attrs.append(label, input);

      index++;
    });

    this.replaceChildren(attrs);

    if (this.config.nullable) {
      const elem = (
        <a
          onclick={() => {
            this.value = null;
            this.dispatchEvent(new GuiChangeEvent(this.value));
          }}
        >
          Clear
        </a>
      );
      this.append(elem);
    }
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

export class GuiInputDuration extends GuiInputElement<core.duration | null> {
  private _input: GuiInputNumber;
  private _select: GuiInputEnum;

  constructor() {
    super();

    this._input = document.createElement('gui-input-number');
    this._input.addEventListener('gui-input', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiInputEvent(this.value));
    });
    this._input.addEventListener('gui-change', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiChangeEvent(this.value));
    });

    this._select = document.createElement('gui-input-enum');
    this._select.addEventListener('gui-change', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiChangeEvent(this.value));
    });
    this._select.type = greycat.default.findType(core.DurationUnit._type);
  }

  connectedCallback() {
    this.appendChild(this._input);
    this.appendChild(this._select);
  }

  disconnectedCallback() {
    this.replaceChildren();
  }

  get value() {
    const durationValue = Number(this._input.value);
    const durationUnit = this._select.value as core.DurationUnit | null;

    if (isNaN(durationValue) || !durationUnit) {
      return null;
    }

    return core.duration.from_unit(durationValue, durationUnit);
  }

  set value(value: core.duration | null) {
    if (value === null) {
      this._input.value = null;
      this._select.value = null;
    } else {
      const [val, unit] = decomposeDuration(value);

      this._select.value = unit;
      this._input.value = val;
    }
  }

  override render(): void {
    this._input.config = this.config;
    this._select.config = this.config;
  }
}

export class GuiInputAny extends GuiInputElement<unknown> {
  private _input: GuiInput;
  private _select: GuiSearchableSelect;

  private _defaultType: AbiType | undefined;

  constructor() {
    super();

    this._input = document.createElement('gui-input');
    this._input.type = this._defaultType;

    this._select = document.createElement('gui-searchable-select');
    this._select.addEventListener('gui-change', (ev) => {
      ev.stopPropagation();
      this._input.type = greycat.default.abi.types[ev.detail];
      this.dispatchEvent(new GuiChangeEvent(this.value));
    });

    const opts = Array.from(
      { length: greycat.default.abi.types.length - 1 },
      () => ({}) as SearchableOption,
    );
    for (let index = 1; index < greycat.default.abi.types.length; index++) {
      const t = greycat.default.abi.types[index];
      opts[index - 1].text = t.name;
      opts[index - 1].value = t.offset;
    }

    this._select.options = opts;

    this._select.config = { nullable: true };

    if (this._defaultType) {
      this._select.value = this._defaultType?.offset;
    }
  }

  get value() {
    return this._input.value;
  }

  set value(val: unknown) {
    this._input.value = val;
    switch (typeof val) {
      case 'bigint':
      case 'number':
        this._select.value = greycat.default.findType(core.int._type)?.offset;
        break;
      case 'boolean':
        this._select.value = greycat.default.findType('core::bool')?.offset;
        break;
      case 'string':
        this._select.value = greycat.default.findType(core.String._type)?.offset;
        break;
      case 'undefined':
        this._select.value = greycat.default.findType(core.String._type)?.offset;
        break;
      case 'object': {
        if (Array.isArray(val)) {
          this._select.value = greycat.default.findType(core.Array._type)?.offset;
        } else if (val instanceof Map) {
          this._select.value = greycat.default.findType(core.Map._type)?.offset;
        } else if (val instanceof GCObject) {
          this._select.value = greycat.default.findType(val.$type.name)?.offset;
        } else {
          this._select.value = greycat.default.findType(core.String._type)?.offset;
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

  get selectValue() {
    return this._select.value;
  }

  set selectValue(value: number | null) {
    this._select.value = value;
  }

  connectedCallback() {
    this.appendChild(
      <>
        {this._select}
        {this._input}
      </>,
    );
  }

  disconnectedCallback() {
    this.replaceChildren();
  }
}

export class GuiInputArray extends GuiInputElement<unknown[] | null> {
  private _inputs: GuiInputAny[] = [];

  constructor() {
    super();
  }

  get value() {
    return this._inputs.map((input) => input.value);
  }

  set value(value: unknown[] | null) {
    this._inputs = [];

    value?.forEach((val) => {
      this._addInput(val);
    });

    this._render();
  }

  connectedCallback() {
    this._render();
  }

  disconnectedCallback() {
    this.replaceChildren();
  }

  _addInput(val?: unknown) {
    const input = document.createElement('gui-input-any') as GuiInputAny;
    input.value = val;

    const prevSelectedType = this._inputs[this._inputs.length - 1]?.selectValue;
    if (prevSelectedType !== null) {
      input.selectValue = prevSelectedType;
    }

    this._inputs.push(input);
    const elem = (
      <div>
        {input}
        <a
          onclick={() => {
            this._inputs = this._inputs.filter((i) => i !== input);
            this.removeChild(elem);
            this.dispatchEvent(new GuiChangeEvent(this.value));
          }}
        >
          &#10005;
        </a>
      </div>
    );
    this.appendChild(elem);
  }

  _render() {
    this.replaceChildren();
    this.appendChild(<a onclick={() => this._addInput()}>Add</a>);
    this._inputs.forEach((input) => {
      const elem = (
        <div>
          {input}
          <a
            onclick={() => {
              this._inputs = this._inputs.filter((i) => i !== input);
              this.removeChild(elem);
              this.dispatchEvent(new GuiChangeEvent(this.value));
            }}
          >
            &#10005;
          </a>
        </div>
      );
      this.appendChild(elem);
    });
  }
}

export class GuiInputMap extends GuiInputElement<Map<unknown, unknown> | object | null> {
  as_object = false;
  private _inputs: Map<GuiInputAny, GuiInputElement<unknown>> = new Map();

  static ALLOWED_KEY_OPTIONS: Array<{ text: string; value: number }> = [];

  constructor() {
    super();

    if (GuiInputMap.ALLOWED_KEY_OPTIONS.length === 0) {
      GuiInputMap.ALLOWED_KEY_OPTIONS = [
        { text: 'String', value: greycat.default.abi.core_string_offset },
        { text: 'int', value: greycat.default.abi.core_int_offset },
        { text: 'float', value: greycat.default.abi.core_float_offset },
        { text: 'char', value: greycat.default.abi.core_char_offset },
        { text: 'duration', value: greycat.default.abi.core_duration_offset },
        { text: 'time', value: greycat.default.abi.core_time_offset },
        { text: 'node', value: greycat.default.abi.core_node_offset },
        { text: 'nodeGeo', value: greycat.default.abi.core_node_geo_offset },
        { text: 'nodeIndex', value: greycat.default.abi.core_node_index_offset },
        { text: 'nodeList', value: greycat.default.abi.core_node_list_offset },
        { text: 'nodeTime', value: greycat.default.abi.core_node_time_offset },
      ];
    }
  }

  get value() {
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

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {
    this.replaceChildren();
  }

  addEntry(key?: unknown, val?: unknown): [GuiInputAny, GuiInputElement<unknown>] {
    const keyInput = document.createElement('gui-input-any');
    keyInput.value = key;
    const valInput = document.createElement('gui-input-any');
    valInput.value = val;

    this._inputs.set(keyInput, valInput);

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
      <div>
        {keyInput}
        {valInput}
        <a
          onclick={() => {
            this._inputs.delete(keyInput);
            this.removeChild(elem);
            this.dispatchEvent(new GuiChangeEvent(this.value));
          }}
        >
          &#10005;
        </a>
      </div>
    );
    return elem;
  }

  override render() {
    this.replaceChildren();
    this.appendChild(
      <a
        onclick={() => {
          const elems = this.addEntry();
          this.appendChild(this._createMapInput(elems[0], elems[1]));
        }}
      >
        Add
      </a>,
    );
    this._inputs.forEach((valInput, keyInput) => {
      this.appendChild(this._createMapInput(keyInput, valInput));
    });
  }
}

export class GuiInputNull extends GuiInputElement<unknown> {
  private _type: AbiType | AbiFunction | undefined;

  get value(): unknown {
    if (this._type instanceof AbiType) {
      return greycat.default.create(this._type.name, []);
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
    this.replaceChildren(
      <a
        onclick={() => {
          this.dispatchEvent(new GuiChangeEvent(this.value));
        }}
      >
        Set
      </a>,
    );
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
    'gui-input-null': GuiInputNull;
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
      'gui-input-duration': GreyCat.Element<GuiInputDuration, GuiInputEventMap>;
      'gui-input-any': GreyCat.Element<GuiInputAny, GuiInputEventMap>;
      'gui-input-array': GreyCat.Element<GuiInputArray, GuiInputEventMap>;
      'gui-input-map': GreyCat.Element<GuiInputMap, GuiInputEventMap>;
      'gui-input-null': GreyCat.Element<GuiInputNull, GuiInputEventMap>;
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
registerCustomElement('gui-input-null', GuiInputNull);
