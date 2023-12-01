import { AbiFunction, AbiType, GCEnum, GCObject, Value, core } from '@greycat/sdk';
import { GuiEnumSelect, GuiSearchableSelect, SearchableOption, displayType } from '../index.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type InputHandler = (value: any) => void;

export type InputConstructor = new (name: string, oninput: InputHandler) => IInput;

export interface IInput {
  name: string;
  value: unknown;
  element: Element;
  disabled: boolean;
  invalid: boolean;
}

export class StringInput implements IInput {
  element: HTMLInputElement;

  constructor(name: string, oninput: InputHandler, defaultValue?: string) {
    this.element = (
      <input
        type="text"
        id={name}
        name={name}
        value={defaultValue}
        placeholder="eg. Hello, world"
        oninput={() => {
          this.element.removeAttribute('aria-invalid');
          oninput(this.value);
        }}
      />
    ) as HTMLInputElement;

    if (!defaultValue) {
      oninput('');
    }
  }

  get name() {
    return this.element.name;
  }

  set name(name: string) {
    this.element.name = name;
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
}

export class CharInput implements IInput {
  element: HTMLInputElement;

  constructor(name: string, oninput: InputHandler, defaultValue?: string) {
    this.element = (
      <input
        type="text"
        id={name}
        name={name}
        value={defaultValue}
        placeholder="eg. c"
        oninput={() => {
          this.element.removeAttribute('aria-invalid');
          oninput(this.element.value);
        }}
      />
    ) as HTMLInputElement;
  }

  get name() {
    return this.element.name;
  }

  set name(name: string) {
    this.element.name = name;
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
}

export class IntInput implements IInput {
  element: HTMLInputElement;

  constructor(name: string, oninput: InputHandler, defaultValue?: number) {
    this.element = (
      <input
        type="number"
        id={name}
        name={name}
        valueAsNumber={defaultValue}
        placeholder="eg. 42"
        oninput={() => {
          this.invalid = false;
          oninput(this.element.valueAsNumber);
        }}
      />
    ) as HTMLInputElement;

    if (defaultValue === undefined) {
      oninput(this.value);
    }
  }

  get name() {
    return this.element.name;
  }

  set name(name: string) {
    this.element.name = name;
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

  set value(value: number) {
    this.element.valueAsNumber = value;
  }
}

export class FloatInput implements IInput {
  element: HTMLInputElement;

  constructor(name: string, oninput: InputHandler, defaultValue?: number) {
    this.element = (
      <input
        type="number"
        id={name}
        name={name}
        valueAsNumber={defaultValue}
        placeholder="eg. 3.1415"
        oninput={() => {
          this.invalid = false;
          oninput(this.element.valueAsNumber);
        }}
      />
    ) as HTMLInputElement;

    if (defaultValue === undefined) {
      oninput(0.0);
    }
  }

  get name() {
    return this.element.name;
  }

  set name(name: string) {
    this.element.name = name;
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

  set value(value: number) {
    this.element.valueAsNumber = value;
  }
}

export class BoolInput implements IInput {
  element: HTMLDivElement;
  private _input: HTMLInputElement;

  constructor(name: string, oninput: InputHandler, defaultValue?: boolean) {
    this._input = (
      <input
        type="checkbox"
        id={name}
        checked={defaultValue}
        name={name}
        oninput={() => {
          this.invalid = false;
          oninput(this.value);
        }}
      />
    ) as HTMLInputElement;

    this.element = (<div style={{ width: '100%' }}>{this._input}</div>) as HTMLDivElement;

    if (defaultValue === undefined) {
      oninput(false);
    }
  }

  get name() {
    return this._input.name;
  }

  set name(name: string) {
    this._input.name = name;
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

  set value(value: boolean) {
    this._input.checked = value;
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

  get name() {
    return this.element.name;
  }

  set name(name: string) {
    this.element.name = name;
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

  set value(value: core.time) {
    this.element.valueAsNumber = value.epochMs;
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

  get name() {
    return this.element.name;
  }

  set name(name: string) {
    this.element.name = name;
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

  set value(value: core.function_ | null) {
    if (value === null) {
      this.element.value = '';
    } else {
      this.element.value = value.fqn;
    }
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

  get name() {
    return this._valueInput.name;
  }

  set name(name: string) {
    this._valueInput.name = name;
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

  set value(value: core.duration) {
    let unit = this._unitSelect.selected as core.DurationUnit | null;
    if (unit === null) {
      unit = this._unitSelect.selected = core.DurationUnit.minutes();
    }
    switch (unit.key) {
      case 'microseconds':
        this._valueInput.valueAsNumber = Number(value.us);
        break;
      case 'milliseconds':
        this._valueInput.valueAsNumber = Number(value.ms);
        break;
      case 'seconds':
        this._valueInput.valueAsNumber = Number(value.s);
        break;
      case 'minutes':
        this._valueInput.valueAsNumber = Number(value.min);
        break;
      case 'hours':
        this._valueInput.valueAsNumber = Number(value.hour);
        break;
      case 'days':
        this._valueInput.valueAsNumber = Number(value.day);
        break;
      case 'weeks':
        this._valueInput.valueAsNumber = Number(value.week);
        break;
      case 'months':
        this._valueInput.valueAsNumber = Number(value.month);
        break;
      case 'years':
        this._valueInput.valueAsNumber = Number(value.year);
        break;
    }
  }

  get unit(): core.DurationUnit {
    return this._unitSelect.selected as core.DurationUnit;
  }

  set unit(unit: core.DurationUnit) {
    this._unitSelect.selected = unit;
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

  get name() {
    return this.element.name;
  }

  set name(name: string) {
    this.element.name = name;
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

  set value(value: core.node) {
    this.element.value = value.ref;
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

  get name() {
    return this.element.name;
  }

  set name(name: string) {
    this.element.name = name;
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

  set value(value: core.nodeTime) {
    this.element.value = value.ref;
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

  get name() {
    return this.element.name;
  }

  set name(name: string) {
    this.element.name = name;
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

  set value(value: core.nodeGeo) {
    this.element.value = value.ref;
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

  get name() {
    return this.element.name;
  }

  set name(name: string) {
    this.element.name = name;
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

  set value(value: core.nodeList) {
    this.element.value = value.ref;
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

  get name() {
    return this.element.name;
  }

  set name(name: string) {
    this.element.name = name;
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

  set value(value: core.nodeIndex) {
    this.element.value = value.ref;
  }
}

export class UnknownInput implements IInput {
  element: HTMLInputElement;

  constructor(name: string, _oninput: InputHandler) {
    this.element = (
      <input type="text" id={name} name={name} placeholder="Not handled yet" disabled />
    ) as HTMLInputElement;
  }

  get name() {
    return this.element.name;
  }

  set name(name: string) {
    this.element.name = name;
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

  set value(_value: unknown) {
    // TODO noop for now
  }
}

export class ObjectInput implements IInput {
  readonly element: HTMLElement;
  private _values: Value[];
  private _inputs: LabelledInput[];

  constructor(
    private _name: string,
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
      const attrOnInput: InputHandler = (v) => {
        // update closed arg value
        this._values[i] = v;
        oninput(this.value);
      };
      const attrTy = greycat.default.abi.types[attr.abi_type];
      let input: IInput = new TypedInput(`${_name}-${attr.name}`, attrTy, attrOnInput);
      if (attr.nullable) {
        input = new NullableInput(input, attrOnInput);
      }
      const labelledInput = new LabelledInput(
        document.createTextNode(`${attr.name}: ${displayType(attrTy, attr.nullable)}`),
        input,
      );

      // append to input list
      this._inputs[i] = labelledInput;
      // append to DOM list
      inputList.appendChild(labelledInput.element);
    }

    this.element = (<article className="gui-input-object">{inputList}</article>) as HTMLElement;
  }

  get name() {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
    // TODO update the name for every attributes
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
    return new this.type.factory(this.type, ...this._values);
  }

  set value(value: GCObject) {
    if (value.$type === this.type) {
      for (let i = 0; i < this.type.attrs.length; i++) {
        this._inputs[i].value = value.$attrs![i];
        this._values[i] = value.$attrs![i];
      }
    }
  }
}

export class FnCallInput implements IInput {
  readonly element: HTMLElement;
  private _values: Value[];
  private _inputs: LabelledInput[];

  constructor(
    private _name: string,
    private _fn: AbiFunction,
    public oninput: InputHandler,
  ) {
    this._values = new Array(_fn.params.length);

    const inputList = document.createElement('div');
    inputList.classList.add('container-fluid', 'py-1');
    inputList.role = 'list';

    this._inputs = new Array(_fn.params.length);
    for (let i = 0; i < _fn.params.length; i++) {
      const param = _fn.params[i];
      const paramOnInput: InputHandler = (v) => {
        // update closed arg value
        this._values[i] = v;
        oninput(this.value);
      };
      let input: IInput = new TypedInput(`${_name}-${param.name}`, param.type, paramOnInput);
      if (param.nullable) {
        input = new NullableInput(input, paramOnInput);
      }

      const label = document.createTextNode(
        `${param.name}: ${displayType(param.type, param.nullable)}`,
      );
      const labelledInput = new LabelledInput(label, input);

      // append to input list
      this._inputs[i] = labelledInput;
      // append to DOM list
      inputList.appendChild(input.element);
    }

    this.element = (<article className="gui-input-fn-call">{inputList}</article>) as HTMLElement;
  }

  get name() {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
    // TODO update the name for every arguments
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
    return this._values;
  }

  set value(value: Value[]) {
    this._values = value;
  }

  get fn() {
    return this._fn;
  }

  set fn(fn: AbiFunction) {
    this._fn = fn;
    this.element.replaceChildren();
    this._values = new Array(fn.params.length);
    this._inputs = new Array(fn.params.length);

    for (let i = 0; i < fn.params.length; i++) {
      const param = fn.params[i];
      const paramOnInput: InputHandler = (v) => {
        // update closed arg value
        this._values[i] = v;
        this.oninput(this.value);
      };
      let input: IInput = new TypedInput(`${this._name}-${param.name}`, param.type, paramOnInput);
      if (param.nullable) {
        input = new NullableInput(input, paramOnInput);
      }

      const label = document.createTextNode(
        `${param.name}: ${displayType(param.type, param.nullable)}`,
      );
      const labelledInput = new LabelledInput(label, input);

      // append to input list
      this._inputs[i] = labelledInput;
      // append to DOM list
      this.element.appendChild(input.element);
    }

    this.oninput(this.value);
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

  get name() {
    return (this.element.children[0] as HTMLSelectElement).name;
  }

  set name(name: string) {
    (this.element.children[0] as HTMLSelectElement).name = name;
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

  set value(value: GCEnum | null) {
    this.element.selected = value;
  }
}

export class ArrayInput implements IInput {
  readonly element: HTMLElement;
  private _addElementAnchor: HTMLAnchorElement;
  private _arrElements: Array<{ input: IInput; deleteAnchor: HTMLAnchorElement }> = [];
  /** used to get unique IDs for inputs, not ideal, but totally fine here */
  private _id = 0;

  constructor(
    private _name: string,
    readonly oninput: InputHandler,
  ) {
    this._addElementAnchor = (
      <a
        href="#"
        onclick={() => {
          this._addInput();
          this.oninput(this.value);
        }}
      >
        Add a new element
      </a>
    ) as HTMLAnchorElement;

    this.element = (
      <article className={['container-fluid', 'py-1', 'gui-input-array']}>
        {this._addElementAnchor}
      </article>
    ) as HTMLElement;

    oninput(this.value);
  }

  get name() {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  private _addInput() {
    const index = this._arrElements.length;
    const input = new AnyInput(`${this.name}-${this._id++}`, () => this.oninput(this.value));

    const deleteAnchor = (
      <a
        href="#"
        title="Delete element"
        onclick={() => {
          this.element.removeChild(inputWrapper);
          this._arrElements.splice(index, 1);
          this.oninput(this.value);
        }}
      >
        X
      </a>
    ) as HTMLAnchorElement;

    const inputWrapper = (
      <div className="gui-input-array-element">
        {input.element}
        {deleteAnchor}
      </div>
    );
    this.element.appendChild(inputWrapper);
    this._arrElements.push({ input, deleteAnchor });
    return input;
  }

  get disabled() {
    return !this._addElementAnchor.isConnected;
  }

  set disabled(disabled: boolean) {
    if (disabled) {
      this._addElementAnchor.remove();
    } else {
      if (!this._addElementAnchor.isConnected) {
        this.element.prepend(this._addElementAnchor);
      }
    }
    for (let i = 0; i < this._arrElements.length; i++) {
      this._arrElements[i].input.disabled = disabled;
      if (disabled) {
        this._arrElements[i].deleteAnchor.remove();
      } else {
        this._arrElements[i].input.element.parentElement!.appendChild(
          this._arrElements[i].deleteAnchor,
        );
      }
    }
  }

  get invalid() {
    // if the first one is invalid, then they all are
    return this._arrElements[0]?.input.invalid ?? false;
  }

  set invalid(invalid: boolean) {
    for (let i = 0; i < this._arrElements.length; i++) {
      this._arrElements[i].input.invalid = invalid;
    }
  }

  get value() {
    return this._arrElements.map((input) => input.input.value);
  }

  set value(value: Array<unknown>) {
    // reset input list
    this._arrElements.length = 0;
    // remove all inputs from the DOM
    let lastInput = this.element.lastChild;
    while (this.element.children.length > 1 && lastInput) {
      lastInput.remove();
      lastInput = this.element.lastChild;
    }
    // create an input for each item in value
    for (let i = 0; i < value.length; i++) {
      const input = this._addInput();
      input.value = value[i];
    }
    this.oninput(this.value);
  }
}

export class AnyInput implements IInput {
  element: HTMLDivElement;
  private _valueInput: IInput;
  private _typeSelect: GuiSearchableSelect;

  constructor(
    name: string,
    public oninput: InputHandler,
  ) {
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
      this.oninput(this.value);
    });

    this.element = (
      <div className="gui-input-any">
        {this._valueInput.element}
        {this._typeSelect}
      </div>
    ) as HTMLDivElement;
  }

  get name() {
    return this._valueInput.name;
  }

  set name(name: string) {
    this._valueInput.name = name;
  }

  get disabled() {
    return this._valueInput.disabled;
  }

  set disabled(disabled: boolean) {
    this._valueInput.disabled = disabled;
    this._typeSelect.disabled = disabled;
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

  set value(value: unknown) {
    switch (typeof value) {
      case 'bigint':
      case 'number':
        this._typeSelect.selected = 'core::int';
        this._valueInput = new IntInput(this.name, this.oninput);
        this._valueInput.value = value;
        break;
      case 'boolean':
        this._typeSelect.selected = 'core::bool';
        this._valueInput = new BoolInput(this.name, this.oninput);
        this._valueInput.value = value;
        break;
      case 'string':
        this._typeSelect.selected = 'core::String';
        this._valueInput = new StringInput(this.name, this.oninput);
        this._valueInput.value = value;
        break;
      case 'undefined':
        this._typeSelect.selected = 'core::String';
        this._valueInput = new StringInput(this.name, this.oninput);
        this._valueInput.value = '';
        break;
      case 'object': {
        if (value === null) {
          this._typeSelect.selected = 'core::String';
          this._valueInput = new StringInput(this.name, this.oninput);
          this._valueInput.value = '';
        } else if (Array.isArray(value)) {
          this._typeSelect.selected = 'core::Array';
          this._valueInput = new ArrayInput(this.name, this.oninput);
          this._valueInput.value = value;
        } else if (value instanceof Map) {
          this._typeSelect.selected = 'core::Map';
          this._valueInput = new UnknownInput(this.name, this.oninput);
          this._valueInput.value = value;
        } else if (value instanceof GCObject) {
          this._typeSelect.selected = value.$type.name;
          this._valueInput = new TypedInput(this.name, value.$type, this.oninput);
          this._valueInput.value = value;
        } else {
          this._typeSelect.selected = '';
          this._valueInput = new UnknownInput(this.name, this.oninput);
          this._valueInput.value = value;
        }
        break;
      }
    }
    // update DOM with new input
    this.element.children[0].remove();
    this.element.prepend(this._valueInput.element);
  }
}

export class NullableInput implements IInput {
  element: HTMLElement;

  constructor(
    public input: IInput,
    public oninput: InputHandler,
  ) {
    const nullableName = `${input.name}-nullable`;
    const value = input.value;

    this.element = (
      <div className="gui-input-nullable">
        {input.element}
        <label htmlFor={nullableName}>
          <input
            type="checkbox"
            id={nullableName}
            name={nullableName}
            checked={value === null}
            onchange={() => {
              if (input.disabled) {
                input.disabled = false;
                oninput(input.value);
              } else {
                input.disabled = true;
                oninput(null);
              }
            }}
          />
          Null?
        </label>
      </div>
    ) as HTMLElement;

    input.disabled = value === null;
    oninput(value);
  }

  get name() {
    return this.input.name;
  }

  set name(name: string) {
    this.input.name = name;
  }

  get disabled() {
    return this.input.disabled;
  }

  set disabled(disabled: boolean) {
    this.input.disabled = disabled;
  }

  get invalid() {
    return this.input.invalid;
  }

  set invalid(invalid: boolean) {
    this.input.invalid = invalid;
  }

  get value() {
    return this.input.value;
  }

  set value(value: unknown | undefined) {
    const checkbox = this.element.querySelector('input[type=checkbox]') as HTMLInputElement;
    checkbox.checked = value === null;
    if (value === null) {
      this.input.disabled = checkbox.checked;
      return;
    }
  }
}

export class Input implements IInput {
  private _inner: IInput;

  constructor(name: string, type: AbiType, nullable: boolean, oninput: InputHandler) {
    this._inner = new TypedInput(name, type, oninput);
    if (nullable) {
      this._inner = new NullableInput(this._inner, oninput);
    }
  }

  get name() {
    return this._inner.name;
  }

  set name(name: string) {
    this._inner.name = name;
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

  set value(value: unknown) {
    this._inner.value = value;
  }
}

/**
 * Works for any `AbiType` whether it is a `GCEnum`, `GCObject` or a primitive/native.
 *
 * - If you know you are dealing with `GCEnum` directly use `EnumInput`.
 * - If you know you are dealing with `GCObject` directory use `ObjectInput`.
 * - If you know you are dealing with a primitive/native, you can use `TypedInput.PRIMITIVE_CTOR['core::int']` (or the others)
 */
export class TypedInput implements IInput {
  private _inner: IInput;
  static PRIMITIVE_CTOR: Record<string, InputConstructor> = {
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
    // TODO add core::geo, and all the tuples
    unknown: UnknownInput,
  };

  constructor(name: string, type: AbiType, oninput: InputHandler) {
    if (type.is_native || type.name === 'core::any') {
      const inputCtor = TypedInput.PRIMITIVE_CTOR[type.name] ?? TypedInput.PRIMITIVE_CTOR.unknown;
      this._inner = new inputCtor(name, oninput);
    } else if (type.is_enum) {
      this._inner = new EnumInput(name, type, oninput);
    } else {
      this._inner = new ObjectInput(name, type, oninput);
    }
  }

  get name() {
    return this._inner.name;
  }

  set name(name: string) {
    this._inner.name = name;
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

  set value(value: unknown) {
    this._inner.value = value;
  }
}

export class LabelledInput implements IInput {
  readonly element: HTMLElement;

  constructor(
    label: Node | string,
    public input: IInput,
  ) {
    this.element = (
      <fieldset className="gui-input-labelled-fieldset">
        <label htmlFor={input.name}>{label}</label>
        {this.input.element}
      </fieldset>
    ) as HTMLElement;
  }

  get name() {
    return this.input.name;
  }

  set name(name: string) {
    this.input.name = name;
  }

  get disabled() {
    return this.input.disabled;
  }

  set disabled(disabled: boolean) {
    this.input.disabled = disabled;
  }

  get invalid(): boolean {
    return this.input.invalid;
  }
  set invalid(invalid: boolean) {
    this.input.invalid = invalid;
  }

  get value(): unknown {
    return this.input.value;
  }

  set value(value: unknown) {
    this.input.value = value;
  }
}

export class InstanceInput implements IInput {
  private _inner: IInput;

  constructor(name: string, instance: unknown, oninput: InputHandler) {
    switch (typeof instance) {
      case 'bigint':
      case 'number':
        this._inner = new IntInput(name, oninput);
        break;
      case 'boolean':
        this._inner = new BoolInput(name, oninput);
        break;
      case 'undefined':
      case 'string':
        this._inner = new StringInput(name, oninput);
        break;
      case 'object':
        if (instance === null) {
          this._inner = new AnyInput(name, oninput);
        } else if (instance instanceof GCEnum) {
          this._inner = new EnumInput(name, instance.$type, oninput);
        } else if (instance instanceof GCObject) {
          this._inner = new ObjectInput(name, instance.$type, oninput);
        } else if (Array.isArray(instance)) {
          this._inner = new ArrayInput(name, oninput);
        } else if (instance instanceof Map) {
          // TODO
          this._inner = new UnknownInput(name, oninput);
        } else {
          // TODO do we want to handle maps?
          this._inner = new UnknownInput(name, oninput);
        }
        break;
      default:
        this._inner = new UnknownInput(name, oninput);
        break;
    }

    this._inner.value = instance;
  }

  get element() {
    return this._inner.element;
  }

  get name() {
    return this._inner.name;
  }

  set name(name: string) {
    this._inner.name = name;
  }

  get disabled() {
    return this._inner.disabled;
  }

  set disabled(disabled: boolean) {
    this._inner.disabled = disabled;
  }

  get invalid(): boolean {
    return this._inner.invalid;
  }
  set invalid(invalid: boolean) {
    this._inner.invalid = invalid;
  }

  get value(): unknown {
    return this._inner.value;
  }

  set value(value: unknown) {
    this._inner.value = value;
  }
}
