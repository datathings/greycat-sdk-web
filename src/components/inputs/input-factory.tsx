import { AbiType, GCObject, Value, core } from '@greycat/sdk';
import { GuiEnumSelect, GuiSearchableSelect, SearchableOption, displayType } from '../index.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type InputHandler = (value: any) => void;

export type InputConstructor = new (name: string, oninput: InputHandler) => IInput;

export type InputType = StringInput | CharInput;

export interface IInput {
  value: unknown;
  element: Element;
  disabled: boolean;
  invalid: boolean;
}

export class StringInput implements IInput {
  element: HTMLInputElement;

  constructor(name: string, oninput: InputHandler) {
    this.element = (
      <input
        type="text"
        id={name}
        name={name}
        placeholder="eg. Hello, world"
        oninput={() => {
          this.element.removeAttribute('aria-invalid');
          oninput(this.element.value);
        }}
      />
    ) as HTMLInputElement;

    oninput('');
  }

  set disabled(disabled: boolean) {
    this.element.disabled = disabled;
    if (disabled) {
      this.element.removeAttribute('aria-invalid');
    }
  }

  get disabled() {
    return this.element.disabled;
  }

  get invalid() {
    return this.element.hasAttribute('aria-invalid');
  }

  set invalid(invalid: boolean) {
    if (invalid) {
      this.element.setAttribute('aria-invalid', 'true');
    } else {
      this.element.removeAttribute('aria-invalid');
    }
  }

  get value() {
    return this.element.value;
  }

  set value(value: string) {
    this.element.value = value;
  }

  get name() {
    return this.element.name;
  }

  set name(name: string) {
    this.element.name = name;
  }
}

export class CharInput implements IInput {
  element: HTMLInputElement;

  constructor(name: string, oninput: InputHandler) {
    this.element = (
      <input
        type="text"
        id={name}
        name={name}
        placeholder="eg. c"
        oninput={() => {
          this.element.removeAttribute('aria-invalid');
          oninput(this.element.value);
        }}
      />
    ) as HTMLInputElement;
  }

  set disabled(disabled: boolean) {
    this.element.disabled = disabled;
    if (disabled) {
      this.element.removeAttribute('aria-invalid');
    }
  }

  get disabled() {
    return this.element.disabled;
  }

  get invalid() {
    return this.element.hasAttribute('aria-invalid');
  }

  set invalid(invalid: boolean) {
    if (invalid) {
      this.element.setAttribute('aria-invalid', 'true');
    } else {
      this.element.removeAttribute('aria-invalid');
    }
  }

  get value() {
    return this.element.value;
  }

  set value(value: string) {
    this.element.value = value;
  }

  get name() {
    return this.element.name;
  }

  set name(name: string) {
    this.element.name = name;
  }
}

export class IntInput implements IInput {
  element: HTMLInputElement;

  constructor(name: string, oninput: InputHandler) {
    this.element = (
      <input
        type="number"
        id={name}
        name={name}
        valueAsNumber={0}
        placeholder="eg. 42"
        oninput={() => {
          this.invalid = false;
          oninput(this.element.valueAsNumber);
        }}
      />
    ) as HTMLInputElement;

    oninput(0);
  }

  set disabled(disabled: boolean) {
    this.element.disabled = disabled;
    if (disabled) {
      this.invalid = false;
    }
  }

  get disabled() {
    return this.element.disabled;
  }

  get invalid() {
    return this.element.hasAttribute('aria-invalid');
  }

  set invalid(invalid: boolean) {
    if (invalid) {
      this.element.setAttribute('aria-invalid', 'true');
    } else {
      this.element.removeAttribute('aria-invalid');
    }
  }

  get value() {
    return this.element.valueAsNumber;
  }
}

export class FloatInput implements IInput {
  element: HTMLInputElement;

  constructor(name: string, oninput: InputHandler) {
    this.element = (
      <input
        type="number"
        id={name}
        name={name}
        valueAsNumber={0.0}
        placeholder="eg. 3.1415"
        oninput={() => {
          this.invalid = false;
          oninput(this.element.valueAsNumber);
        }}
      />
    ) as HTMLInputElement;

    oninput(0.0);
  }

  set disabled(disabled: boolean) {
    this.element.disabled = disabled;
    if (disabled) {
      this.invalid = false;
    }
  }

  get disabled() {
    return this.element.disabled;
  }

  get invalid() {
    return this.element.hasAttribute('aria-invalid');
  }

  set invalid(invalid: boolean) {
    if (invalid) {
      this.element.setAttribute('aria-invalid', 'true');
    } else {
      this.element.removeAttribute('aria-invalid');
    }
  }

  get value() {
    return this.element.valueAsNumber;
  }
}

export class BoolInput implements IInput {
  element: HTMLDivElement;
  private _input: HTMLInputElement;

  constructor(name: string, oninput: InputHandler) {
    this._input = (
      <input
        type="checkbox"
        id={name}
        checked={false}
        name={name}
        oninput={() => {
          this.invalid = false;
          oninput(this.value);
        }}
      />
    ) as HTMLInputElement;

    this.element = (<div style={{ width: '100%' }}>{this._input}</div>) as HTMLDivElement;

    oninput(false);
  }

  set disabled(disabled: boolean) {
    this._input.disabled = disabled;
    if (disabled) {
      this.invalid = false;
    }
  }

  get disabled() {
    return this._input.disabled;
  }

  get invalid() {
    return this.element.hasAttribute('aria-invalid');
  }

  set invalid(invalid: boolean) {
    if (invalid) {
      this.element.setAttribute('aria-invalid', 'true');
    } else {
      this.element.removeAttribute('aria-invalid');
    }
  }

  get value() {
    return this._input.checked;
  }
}

export class TimeInput implements IInput {
  element: HTMLInputElement;

  constructor(name: string, oninput: InputHandler) {
    this.element = (
      <input
        type="datetime-local"
        id={name}
        name={name}
        step="0.1"
        oninput={() => {
          this.invalid = false;
          oninput(this.value);
        }}
      />
    ) as HTMLInputElement;
  }

  set disabled(disabled: boolean) {
    this.element.disabled = disabled;
    if (disabled) {
      this.invalid = false;
    }
  }

  get disabled() {
    return this.element.disabled;
  }

  get invalid() {
    return this.element.hasAttribute('aria-invalid');
  }

  set invalid(invalid: boolean) {
    if (invalid) {
      this.element.setAttribute('aria-invalid', 'true');
    } else {
      this.element.removeAttribute('aria-invalid');
    }
  }

  get value() {
    return core.time.fromMs(Date.parse(this.element.value));
  }
}

export class FnInput implements IInput {
  element: HTMLInputElement;

  constructor(name: string, oninput: InputHandler) {
    this.element = (
      <input
        type="text"
        id={name}
        name={name}
        placeholder="eg. runtime::User::me"
        oninput={() => {
          this.invalid = false;
          oninput(this.value);
        }}
      />
    ) as HTMLInputElement;

    oninput(0);
  }

  set disabled(disabled: boolean) {
    this.element.disabled = disabled;
    if (disabled) {
      this.invalid = false;
    }
  }

  get disabled() {
    return this.element.disabled;
  }

  get invalid() {
    return this.element.hasAttribute('aria-invalid');
  }

  set invalid(invalid: boolean) {
    if (invalid) {
      this.element.setAttribute('aria-invalid', 'true');
    } else {
      this.element.removeAttribute('aria-invalid');
    }
  }

  get value() {
    const split = this.element.value.split('::');
    if (split.length === 2) {
      return core.function_.create(split[0], undefined, split[1]);
    } else if (split.length === 3) {
      return core.function_.create(split[0], split[1], split[2]);
    }
    this.invalid = true;
    return null;
  }
}

export class DurationInput implements IInput {
  element: HTMLDivElement;
  private _valueInput: HTMLInputElement;
  private _unitSelect: GuiEnumSelect;

  constructor(name: string, oninput: InputHandler) {
    this._valueInput = (
      <input
        type="number"
        id={name}
        name={name}
        valueAsNumber={0}
        placeholder="eg. 42"
        oninput={() => {
          this.invalid = false;
          oninput(this.value);
        }}
      />
    ) as HTMLInputElement;

    this._unitSelect = (
      <gui-enum-select
        fqn="core::DurationUnit"
        selected={core.DurationUnit.minutes()}
        onenum-change={() => {
          this.invalid = false;
          oninput(this.value);
        }}
      />
    ) as GuiEnumSelect;

    this.element = (
      <div className="grid">
        {this._valueInput}
        {this._unitSelect}
      </div>
    ) as HTMLDivElement;

    // default value
    oninput(this.value);
  }

  set disabled(disabled: boolean) {
    this._valueInput.disabled = disabled;
    this._unitSelect.disabled = disabled;
    if (disabled) {
      this.invalid = false;
    }
  }

  get disabled() {
    // if the first is disabled, then the whole comp is disabled
    return this._valueInput.disabled;
  }

  get invalid() {
    // if the first is invalid, then the whole comp is invalid
    return this._valueInput.hasAttribute('aria-invalid');
  }

  set invalid(invalid: boolean) {
    if (invalid) {
      this._valueInput.setAttribute('aria-invalid', 'true');
      this._unitSelect.querySelector('select')?.setAttribute('aria-invalid', 'true');
    } else {
      this._valueInput.removeAttribute('aria-invalid');
      this._unitSelect.querySelector('select')?.removeAttribute('aria-invalid');
    }
  }

  get value() {
    return core.duration.from_unit(
      this._valueInput.valueAsNumber,
      (this._unitSelect.selected as core.DurationUnit | null) ?? core.DurationUnit.minutes(),
    );
  }
}

export class NodeInput implements IInput {
  element: HTMLInputElement;

  constructor(name: string, oninput: InputHandler) {
    this.element = (
      <input
        type="string"
        id={name}
        name={name}
        defaultValue="0"
        placeholder='Reference in hex eg. "a2c4e6"'
        oninput={() => {
          this.invalid = false;
          oninput(this.value);
        }}
      />
    ) as HTMLInputElement;

    oninput('0');
  }

  set disabled(disabled: boolean) {
    this.element.disabled = disabled;
    if (disabled) {
      this.invalid = false;
    }
  }

  get disabled() {
    return this.element.disabled;
  }

  get invalid() {
    return this.element.hasAttribute('aria-invalid');
  }

  set invalid(invalid: boolean) {
    if (invalid) {
      this.element.setAttribute('aria-invalid', 'true');
    } else {
      this.element.removeAttribute('aria-invalid');
    }
  }

  get value() {
    return new core.node(
      greycat.default.abi.types[greycat.default.abi.core_node_offset],
      BigInt(`0x${this.element.value}`),
    );
  }
}

export class NodeTimeInput implements IInput {
  element: HTMLInputElement;

  constructor(name: string, oninput: InputHandler) {
    this.element = (
      <input
        type="string"
        id={name}
        name={name}
        defaultValue="0"
        placeholder='Reference in hex eg. "a2c4e6"'
        oninput={() => {
          this.invalid = false;
          oninput(this.value);
        }}
      />
    ) as HTMLInputElement;

    oninput('0');
  }

  set disabled(disabled: boolean) {
    this.element.disabled = disabled;
    if (disabled) {
      this.invalid = false;
    }
  }

  get disabled() {
    return this.element.disabled;
  }

  get invalid() {
    return this.element.hasAttribute('aria-invalid');
  }

  set invalid(invalid: boolean) {
    if (invalid) {
      this.element.setAttribute('aria-invalid', 'true');
    } else {
      this.element.removeAttribute('aria-invalid');
    }
  }

  get value() {
    return new core.nodeTime(
      greycat.default.abi.types[greycat.default.abi.core_node_time_offset],
      BigInt(`0x${this.element.value}`),
    );
  }
}

export class NodeGeoInput implements IInput {
  element: HTMLInputElement;

  constructor(name: string, oninput: InputHandler) {
    this.element = (
      <input
        type="string"
        id={name}
        name={name}
        defaultValue="0"
        placeholder='Reference in hex eg. "a2c4e6"'
        oninput={() => {
          this.invalid = false;
          oninput(this.value);
        }}
      />
    ) as HTMLInputElement;

    oninput('0');
  }

  set disabled(disabled: boolean) {
    this.element.disabled = disabled;
    if (disabled) {
      this.element.removeAttribute('aria-invalid');
    }
  }

  get disabled() {
    return this.element.disabled;
  }

  get invalid() {
    return this.element.hasAttribute('aria-invalid');
  }

  set invalid(invalid: boolean) {
    if (invalid) {
      this.element.setAttribute('aria-invalid', 'true');
    } else {
      this.element.removeAttribute('aria-invalid');
    }
  }

  get value() {
    return new core.nodeGeo(
      greycat.default.abi.types[greycat.default.abi.core_node_geo_offset],
      BigInt(`0x${this.element.value}`),
    );
  }
}

export class NodeListInput implements IInput {
  element: HTMLInputElement;

  constructor(name: string, oninput: InputHandler) {
    this.element = (
      <input
        type="string"
        id={name}
        name={name}
        defaultValue="0"
        placeholder='Reference in hex eg. "a2c4e6"'
        oninput={() => {
          this.invalid = false;
          oninput(this.value);
        }}
      />
    ) as HTMLInputElement;

    oninput('0');
  }

  set disabled(disabled: boolean) {
    this.element.disabled = disabled;
    if (disabled) {
      this.element.removeAttribute('aria-invalid');
    }
  }

  get disabled() {
    return this.element.disabled;
  }

  get invalid() {
    return this.element.hasAttribute('aria-invalid');
  }

  set invalid(invalid: boolean) {
    if (invalid) {
      this.element.setAttribute('aria-invalid', 'true');
    } else {
      this.element.removeAttribute('aria-invalid');
    }
  }

  get value() {
    return new core.nodeList(
      greycat.default.abi.types[greycat.default.abi.core_node_list_offset],
      BigInt(`0x${this.element.value}`),
    );
  }
}

export class NodeIndexInput implements IInput {
  element: HTMLInputElement;

  constructor(name: string, oninput: InputHandler) {
    this.element = (
      <input
        type="string"
        id={name}
        name={name}
        defaultValue="0"
        placeholder='Reference in hex eg. "a2c4e6"'
        oninput={() => {
          this.invalid = false;
          oninput(this.value);
        }}
      />
    ) as HTMLInputElement;

    oninput('0');
  }

  set disabled(disabled: boolean) {
    this.element.disabled = disabled;
    if (disabled) {
      this.element.removeAttribute('aria-invalid');
    }
  }

  get disabled() {
    return this.element.disabled;
  }

  get invalid() {
    return this.element.hasAttribute('aria-invalid');
  }

  set invalid(invalid: boolean) {
    if (invalid) {
      this.element.setAttribute('aria-invalid', 'true');
    } else {
      this.element.removeAttribute('aria-invalid');
    }
  }

  get value() {
    return new core.nodeIndex(
      greycat.default.abi.types[greycat.default.abi.core_node_index_offset],
      BigInt(`0x${this.element.value}`),
    );
  }
}

export class UnknownInput implements IInput {
  element: HTMLInputElement;

  constructor(name: string, _oninput: InputHandler) {
    this.element = (
      <input type="text" id={name} name={name} placeholder="Not handled yet" disabled />
    ) as HTMLInputElement;
  }

  get disabled() {
    return this.element.disabled;
  }

  set disabled(disabled: boolean) {
    this.element.disabled = disabled;
  }

  get invalid() {
    return this.element.hasAttribute('aria-invalid');
  }

  set invalid(invalid: boolean) {
    if (invalid) {
      this.element.setAttribute('aria-invalid', 'true');
    } else {
      this.element.removeAttribute('aria-invalid');
    }
  }

  get value() {
    return null;
  }
}

export class ObjectInput implements IInput {
  readonly element: HTMLElement;
  private _values: Value[];
  private _inputs: LabelledInput[];

  constructor(
    name: string,
    readonly type: AbiType,
    oninput: InputHandler,
  ) {
    this._values = new Array(type.attrs.length);

    const inputList = document.createElement('div');
    inputList.classList.add('container-fluid', 'py-1');
    inputList.role = 'list';

    this._inputs = new Array(type.attrs.length);
    for (let i = 0; i < type.attrs.length; i++) {
      const attr = type.attrs[i];
      const input = new LabelledInput(
        `${name}-${attr.name}`,
        attr.name,
        greycat.default.abi.types[attr.abi_type],
        attr.nullable,
        (v) => {
          // update closed arg value
          this._values[i] = v;
          oninput(this.value);
        },
      );

      // append to input list
      this._inputs[i] = input;
      // append to DOM list
      inputList.appendChild(input.element);
    }

    this.element = (<article className="gui-input-object">{inputList}</article>) as HTMLElement;
  }

  get disabled() {
    // they all have the same state
    return this._inputs[0]?.disabled ?? false;
  }

  set disabled(disabled: boolean) {
    for (let i = 0; i < this._inputs.length; i++) {
      this._inputs[i].disabled = disabled;
    }
  }

  get invalid() {
    // they all have the same state
    return this._inputs[0]?.invalid ?? false;
  }

  set invalid(invalid: boolean) {
    for (let i = 0; i < this._inputs.length; i++) {
      this._inputs[i].invalid = invalid;
    }
  }

  get value() {
    return new GCObject(this.type, ...this._values);
  }
}

export class EnumInput implements IInput {
  element: GuiEnumSelect;

  constructor(name: string, type: AbiType, oninput: InputHandler) {
    this.element = (
      <gui-enum-select
        selectId={name}
        fqn={type.name}
        selected={type.enum_values?.[0]}
        onenum-change={() => {
          this.invalid = false;
          oninput(this.value);
        }}
      />
    ) as GuiEnumSelect;

    // default value
    oninput(this.value);
  }

  get disabled() {
    return this.element.disabled;
  }

  set disabled(disabled: boolean) {
    this.element.disabled = disabled;
  }

  get invalid() {
    return this.element.querySelector('select')?.hasAttribute('aria-invalid') ?? false;
  }

  set invalid(invalid: boolean) {
    if (invalid) {
      this.element.querySelector('select')?.setAttribute('aria-invalid', 'true');
    } else {
      this.element.querySelector('select')?.removeAttribute('aria-invalid');
    }
  }

  get value() {
    return this.element.selected;
  }
}

export class ArrayInput implements IInput {
  readonly element: HTMLElement;
  private _inputs: AnyInput[] = [];
  /** used to get unique IDs for inputs, not ideal, but totally fine here */
  private _id = 0;

  constructor(
    readonly name: string,
    readonly oninput: InputHandler,
  ) {
    this.element = (
      <article className={['container-fluid', 'py-1', 'gui-input-array']}>
        <a href="#" onclick={() => this._addInput()}>
          Add a new element
        </a>
      </article>
    ) as HTMLElement;

    // oninput(this.value);
  }

  private _addInput() {
    const index = this._inputs.length;
    const input = new AnyInput(`${this.name}-${this._id++}`, () => this.oninput(this.value));
    const inputWrapper = (
      <div className="gui-input-array-element">
        {input.element}
        <a
          href="#"
          title="Delete element"
          onclick={() => {
            this.element.removeChild(inputWrapper);
            this._inputs.splice(index, 1);
            this.oninput(this.value);
          }}
        >
          X
        </a>
      </div>
    );
    this.element.appendChild(inputWrapper);
    this._inputs.push(input);
    this.oninput(this.value);
  }

  get disabled() {
    // if the first one is disabled, then they all are
    return this._inputs[0]?.disabled ?? false;
  }

  set disabled(disabled: boolean) {
    for (let i = 0; i < this._inputs.length; i++) {
      this._inputs[i].disabled = disabled;
    }
  }

  get invalid() {
    // if the first one is invalid, then they all are
    return this._inputs[0]?.invalid ?? false;
  }

  set invalid(invalid: boolean) {
    for (let i = 0; i < this._inputs.length; i++) {
      this._inputs[i].invalid = invalid;
    }
  }

  get value() {
    return this._inputs.map((input) => input.value);
  }
}

export class AnyInput implements IInput {
  element: HTMLDivElement;
  private _valueInput: IInput;
  private _typeSelect: GuiSearchableSelect;

  constructor(name: string, oninput: InputHandler) {
    this._valueInput = new StringInput(name, oninput);
    this._typeSelect = document.createElement('gui-searchable-select');
    this._typeSelect.placeholder = 'eg. String, int';
    const options: SearchableOption[] = [];
    for (let i = 0; i < greycat.default.abi.types.length; i++) {
      const ty = greycat.default.abi.types[i];
      if (ty.name.startsWith('::')) {
        continue;
      }
      let name = ty.name;
      if (options.find((o) => o.text === ty.name)) {
        name = `${ty.name} (${ty.offset})`;
      }
      options.push({
        value: ty.offset,
        text: name,
      });
    }
    this._typeSelect.options = options;
    this._typeSelect.addEventListener('searchable-select-change', (ev) => {
      const type = greycat.default.abi.types[ev.detail as number];
      const newInput = new TypedInput(name, type, oninput);
      this.element.children[0].remove();
      this.element.prepend(newInput.element);
      newInput.disabled = this._valueInput.disabled;
      newInput.invalid = this._valueInput.invalid;
      this._valueInput = newInput;
    });

    this.element = (
      <div className="gui-input-any">
        {this._valueInput.element}
        {this._typeSelect}
      </div>
    ) as HTMLDivElement;
  }

  get disabled() {
    return this._valueInput.disabled;
  }

  set disabled(disabled: boolean) {
    this._valueInput.disabled = disabled;
  }

  get invalid() {
    return this._valueInput.invalid;
  }

  set invalid(invalid: boolean) {
    this._valueInput.invalid = invalid;
  }

  get value() {
    return this._valueInput.value;
  }
}

export class NullableInput implements IInput {
  element: HTMLElement;
  private _input: IInput | null = null;

  constructor(name: string, type: AbiType, oninput: InputHandler) {
    if (type.is_enum || type.is_native || type.name === 'core::any') {
      // only create input eagerly if the type is not an object
      this._input = new TypedInput(name, type, oninput);
    }

    const nullableName = `${name}-nullable`;
    this.element = (
      <div className="gui-input-nullable">
        {this._input ? this._input.element : <em>Null by default</em>}
        <label htmlFor={nullableName}>
          <input
            type="checkbox"
            id={nullableName}
            name={nullableName}
            checked
            onchange={() => {
              if (this._input === null) {
                this._input = new TypedInput(name, type, oninput);
                this.element.children[0].replaceWith(this._input.element);
                this._input.disabled = true;
              }
              if (this._input.disabled) {
                this._input.disabled = false;
                oninput(this._input.value);
              } else {
                this._input.disabled = true;
                oninput(null);
              }
            }}
          />
          Null?
        </label>
      </div>
    ) as HTMLElement;

    // default to 'null'
    oninput(null);
    if (this._input) {
      this._input.disabled = true;
    }
  }

  get disabled() {
    return this._input?.disabled ?? true;
  }

  set disabled(disabled: boolean) {
    if (this._input) {
      this._input.disabled = disabled;
    }
  }

  get invalid() {
    return this._input?.invalid ?? false;
  }

  set invalid(invalid: boolean) {
    if (this._input) {
      this._input.invalid = invalid;
    }
  }

  get value() {
    return this._input?.value || undefined;
  }
}

export class Input implements IInput {
  private _inner: IInput;

  constructor(id: string, _name: string, type: AbiType, nullable: boolean, oninput: InputHandler) {
    if (nullable) {
      this._inner = new NullableInput(id, type, oninput);
    } else {
      this._inner = new TypedInput(id, type, oninput);
    }
  }

  get element() {
    return this._inner.element;
  }

  get disabled() {
    return this._inner.disabled;
  }

  set disabled(disabled: boolean) {
    this._inner.disabled = disabled;
  }

  get invalid() {
    return this._inner.invalid;
  }

  set invalid(invalid: boolean) {
    this._inner.invalid = invalid;
  }

  get value() {
    return this._inner.value;
  }
}

export class TypedInput implements IInput {
  private _inner: IInput;
  private static PRIMITIVE_FACTORY: Record<string, InputConstructor> = {
    [core.String._type]: StringInput,
    ['core::char']: CharInput,
    ['core::int']: IntInput,
    ['core::float']: FloatInput,
    ['core::bool']: BoolInput,
    [core.time._type]: TimeInput,
    [core.duration._type]: DurationInput,
    [core.node._type]: NodeInput,
    [core.nodeIndex._type]: NodeIndexInput,
    [core.nodeList._type]: NodeListInput,
    [core.nodeGeo._type]: NodeGeoInput,
    [core.nodeTime._type]: NodeTimeInput,
    ['core::any']: AnyInput,
    [core.function_._type]: FnInput,
    [core.Array._type]: ArrayInput,
    unknown: UnknownInput,
  };

  constructor(name: string, type: AbiType, oninput: InputHandler) {
    if (type.is_native || type.name === 'core::any') {
      const inputCtor =
        TypedInput.PRIMITIVE_FACTORY[type.name] ?? TypedInput.PRIMITIVE_FACTORY.unknown;
      this._inner = new inputCtor(name, oninput);
    } else if (type.is_enum) {
      this._inner = new EnumInput(name, type, oninput);
    } else {
      this._inner = new ObjectInput(name, type, oninput);
    }
  }

  get element() {
    return this._inner.element;
  }

  get disabled() {
    return this._inner.disabled;
  }

  set disabled(disabled: boolean) {
    this._inner.disabled = disabled;
  }

  get invalid() {
    return this._inner.invalid;
  }

  set invalid(invalid: boolean) {
    this._inner.invalid = invalid;
  }

  get value() {
    return this._inner.value;
  }
}

export class LabelledInput implements IInput {
  element: HTMLElement;
  private _input: Input;

  constructor(id: string, name: string, type: AbiType, nullable: boolean, oninput: InputHandler) {
    this._input = new Input(id, name, type, nullable, oninput);

    this.element = (
      <fieldset className="gui-input-labelled-fieldset">
        <label htmlFor={name}>
          {name}: {displayType(type, nullable)}
        </label>
        {this._input.element}
      </fieldset>
    ) as HTMLElement;
  }

  get disabled() {
    return this._input.disabled;
  }

  set disabled(disabled: boolean) {
    this._input.disabled = disabled;
  }

  get invalid(): boolean {
    return this._input.invalid;
  }
  set invalid(invalid: boolean) {
    this._input.invalid = invalid;
  }

  get value(): unknown {
    return this._input.value;
  }
}
