import { AbiFunction, AbiType, GCEnum, GCObject, Value, core } from '@greycat/sdk';
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
  name: string;
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
    this.element.id = name;
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
    this.element.id = name;
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

  set value(value: number) {
    this.element.valueAsNumber = value;
  }

  get name() {
    return this.element.name;
  }

  set name(name: string) {
    this.element.id = name;
    this.element.name = name;
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

  set value(value: number) {
    this.element.valueAsNumber = value;
  }

  get name() {
    return this.element.name;
  }

  set name(name: string) {
    this.element.id = name;
    this.element.name = name;
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

  set value(value: boolean) {
    this._input.checked = value;
  }

  get name() {
    return this._input.name;
  }

  set name(name: string) {
    this._input.id = name;
    this._input.name = name;
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

  set value(value: core.time) {
    this.element.valueAsNumber = value.epochMs;
  }

  get name() {
    return this.element.name;
  }

  set name(name: string) {
    this.element.id = name;
    this.element.name = name;
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

  set value(value: core.function_ | null) {
    if (value === null) {
      this.element.value = '';
    } else {
      this.element.value = value.fqn;
    }
  }

  get name() {
    return this.element.name;
  }

  set name(name: string) {
    this.element.id = name;
    this.element.name = name;
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

  get name() {
    return this._valueInput.name;
  }

  set name(name: string) {
    this._valueInput.id = name;
    this._valueInput.name = name;
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

  set value(value: core.node) {
    this.element.value = value.ref;
  }

  get name() {
    return this.element.name;
  }

  set name(name: string) {
    this.element.id = name;
    this.element.name = name;
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

  set value(value: core.nodeTime) {
    this.element.value = value.ref;
  }

  get name() {
    return this.element.name;
  }

  set name(name: string) {
    this.element.id = name;
    this.element.name = name;
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

  set value(value: core.nodeGeo) {
    this.element.value = value.ref;
  }

  get name() {
    return this.element.name;
  }

  set name(name: string) {
    this.element.name = name;
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

  set value(value: core.nodeList) {
    this.element.value = value.ref;
  }

  get name() {
    return this.element.name;
  }

  set name(name: string) {
    this.element.id = name;
    this.element.name = name;
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

  set value(value: core.nodeIndex) {
    this.element.value = value.ref;
  }

  get name() {
    return this.element.name;
  }

  set name(name: string) {
    this.element.id = name;
    this.element.name = name;
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

  set value(_value: unknown) {
    // TODO noop for now
  }

  get name() {
    return this.element.name;
  }

  set name(name: string) {
    this.element.id = name;
    this.element.name = name;
  }
}

export class ObjectInput implements IInput {
  readonly element: HTMLElement;
  private _values: Value[];
  private _inputs: LabelledInput[];
  private _name: string;

  constructor(
    name: string,
    readonly type: AbiType,
    oninput: InputHandler,
  ) {
    this._values = new Array(type.attrs.length);
    this._name = name;

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

  set value(value: GCObject) {
    if (value.$type === this.type) {
      for (let i = 0; i < this.type.attrs.length; i++) {
        this._inputs[i].value = value.$attrs![i];
        this._values[i] = value.$attrs![i];
      }
    }
  }

  get name() {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
    for (let i = 0; i < this.type.attrs.length; i++) {
      const attr = this.type.attrs[i];
      this._inputs[i].name = `${name}-${attr.name}`;
    }
  }
}

export class FnCallInput implements IInput {
  readonly element: HTMLElement;
  private _values: Value[];
  private _inputs: LabelledInput[];
  //private _name: string;

  constructor(
    private _name: string,
    private _fn: AbiFunction,
    public oninput: InputHandler,
  ) {
    //this._name = name;
    this._values = new Array(_fn.params.length);

    const inputList = document.createElement('div');
    inputList.classList.add('container-fluid', 'py-1');
    inputList.role = 'list';

    this._inputs = new Array(_fn.params.length);
    for (let i = 0; i < _fn.params.length; i++) {
      const param = _fn.params[i];
      const input = new LabelledInput(
        `${_name}-${param.name}`,
        param.name,
        param.type,
        param.nullable,
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

    this.element = (<article className="gui-input-fn-call">{inputList}</article>) as HTMLElement;
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
    for (let i = 0; i < this._inputs.length; i++) {
      this._inputs[i].value = value[i];
    }
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
      const input = new LabelledInput(
        `${this._name}-${param.name}`,
        param.name,
        param.type,
        param.nullable,
        (v) => {
          // update closed arg value
          this._values[i] = v;
          this.oninput(this.value);
        },
      );

      // append to input list
      this._inputs[i] = input;
      // append to DOM list
      this.element.appendChild(input.element);
    }

    this.oninput(this.value);
  }

  set name(name: string) {
    this._name = name;
    for (let i = 0; i < this._inputs.length; i++) {
      this._inputs[i].name = `${this._name}-${this._fn.params[i].name}`;
    }
  }

  get name() {
    return this._name;
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

  set value(value: GCEnum | null) {
    this.element.selected = value;
  }

  get name() {
    return this.element.selectId;
  }

  set name(name: string) {
    this.element.selectId = name;
  }
}

export class ArrayInput implements IInput {
  readonly element: HTMLElement;
  private _inputs: AnyInput[] = [];
  /** used to get unique IDs for inputs, not ideal, but totally fine here */
  private _id = 0;
  private _name: string;

  constructor(
    name: string,
    readonly oninput: InputHandler,
  ) {
    this._name = name;
    this.element = (
      <article className={['container-fluid', 'py-1', 'gui-input-array']}>
        <a
          href="#"
          onclick={() => {
            this._addInput();
            this.oninput(this.value);
          }}
        >
          Add a new element
        </a>
      </article>
    ) as HTMLElement;

    // oninput(this.value);
  }

  private _addInput() {
    const index = this._inputs.length;
    const input = new AnyInput(`${this._name}-${this._id++}`, () => this.oninput(this.value));
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
    return input;
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

  set value(value: Array<unknown>) {
    // reset input list
    this._inputs.length = 0;
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

  set name(name: string) {
    this._name = name;
    for (let i = 0; i < this._inputs.length; i++) {
      this._inputs[i].name = `${name}-${i}`;
    }
  }

  get name() {
    return this._name;
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

  get name() {
    return this._valueInput.name;
  }

  set name(name: string) {
    this._valueInput.name = name;
  }
}

export class NullableInput implements IInput {
  element: HTMLElement;
  private _input: IInput | null = null;

  constructor(
    name: string,
    public type: AbiType,
    public oninput: InputHandler,
  ) {
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
                // replace '<em>Null by default</em>' by 'this._input.element'
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

  set value(value: unknown | undefined) {
    const checkbox = this.element.querySelector('input[type=checkbox]') as HTMLInputElement;
    checkbox.checked = value === null;
    if (value !== null && value instanceof GCObject && value.$type === this.type) {
      this._input = new TypedInput(this.name, this.type, this.oninput);
      this._input.disabled = checkbox.checked;
      this._input.value = value;
    } else if (this._input) {
      this._input.disabled = checkbox.checked;
      this._input.value = value;
    }
  }

  get name() {
    return this._input?.name ?? "";
  }

  set name(name: string) {
    if (this._input) {
      this._input.name = name;
    }
  }
}

export class Input implements IInput {
  private _inner: IInput;
  private _name: string;

  constructor(id: string, name: string, type: AbiType, nullable: boolean, oninput: InputHandler) {
    this._name = name;
    if (nullable) {
      this._inner = new NullableInput(id, type, oninput);
    } else {
      this._inner = new TypedInput(id, type, oninput);
    }
  }

  get name() {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
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

  get name() {
    return this._inner.name;
  }

  set name(name: string) {
    this._inner.name = name;
  }
}

export class LabelledInput implements IInput {
  readonly element: HTMLElement;
  private _label: HTMLLabelElement;
  private _input: Input;
  private _type: AbiType;
  private _nullable: boolean;

  constructor(id: string, name: string, type: AbiType, nullable: boolean, oninput: InputHandler) {
    this._input = new Input(id, name, type, nullable, oninput);
    this._type = type;
    this._nullable = nullable;

    this._label = (
      <label htmlFor={name}>
        {name}: {displayType(type, nullable)}
      </label>
    ) as HTMLLabelElement;

    this.element = (
      <fieldset className="gui-input-labelled-fieldset">
        {this._label}
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

  set value(value: unknown) {
    this._input.value = value;
  }

  get type() {
    return this._type;
  }

  set type(type: AbiType) {
    this._type = type;
    this._updateLabel();
  }

  get nullable() {
    return this._nullable;
  }

  set nullable(nullable: boolean) {
    this._nullable = nullable;
    this._updateLabel();
  }

  get name() {
    return this._input.name;
  }

  set name(name: string) {
    this._input.name = name;
    this._updateLabel();
  }

  private _updateLabel() {
    this._label.htmlFor = this._input.name;
    this._label.textContent = `${this._input.name}: ${displayType(this._type, this._nullable)}`;
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

  get name() {
    return this._inner.name;
  }

  set name(name: string) {
    this._inner.name = name;
  }
}
