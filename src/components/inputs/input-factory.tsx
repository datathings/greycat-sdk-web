import { AbiFunction, AbiType, GCEnum, GCObject, Value, core } from '@greycat/sdk';
import { GuiSearchableSelect, SearchableOption, displayType } from '../index.js';
import { getIndexInParent } from '../../utils.js';

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

  constructor(name: string, oninput: InputHandler, defaultValue = '') {
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

    setTimeout(() => oninput(this.value), 0);
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

  constructor(name: string, oninput: InputHandler, defaultValue = '') {
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

    setTimeout(() => oninput(this.value), 0);
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

  constructor(name: string, oninput: InputHandler, defaultValue = 0) {
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

    setTimeout(() => oninput(this.value), 0);
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

  constructor(name: string, oninput: InputHandler, defaultValue = 0.0) {
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

    setTimeout(() => oninput(this.value), 0);
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
  element: HTMLInputElement;

  constructor(name: string, oninput: InputHandler, defaultValue = false) {
    this.element = (
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

    setTimeout(() => oninput(this.value), 0);
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
    return this.element.checked;
  }

  set value(value: boolean) {
    this.element.checked = value;
  }
}

export class TimeInput implements IInput {
  element: HTMLInputElement;

  constructor(name: string, oninput: InputHandler, defaultValue?: core.time) {
    this.element = (
      <input
        type="datetime-local"
        id={name}
        name={name}
        step="0.1"
        defaultValue={defaultValue?.toString()}
        oninput={() => {
          this.invalid = false;
          oninput(this.value);
        }}
      />
    ) as HTMLInputElement;

    if (defaultValue !== undefined) {
      setTimeout(() => oninput(this.value), 0);
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

    setTimeout(() => oninput(this.value), 0);
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
  private _unitSelect: EnumInput;

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

    this._unitSelect = InputFactory.createFromValue(
      `${name}_unit`,
      core.DurationUnit.minutes(),
      () => {
        this.invalid = false;
        oninput(this.value);
      },
    ) as EnumInput;

    this.element = (
      <fieldset role="group">
        {this._valueInput}
        {this._unitSelect.element}
      </fieldset>
    ) as HTMLDivElement;

    // default value
    setTimeout(() => oninput(this.value), 0);
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
    } else {
      this._valueInput.removeAttribute('aria-invalid');
    }
    this._unitSelect.invalid = invalid;
  }

  get value() {
    let value = this._valueInput.valueAsNumber;
    if (isNaN(value)) {
      value = 0;
      this._valueInput.value = '0';
    }
    return core.duration.from_unit(
      value,
      (this._unitSelect.value as core.DurationUnit | null) ?? core.DurationUnit.minutes(),
    );
  }

  set value(value: core.duration) {
    let unit = this._unitSelect.value as core.DurationUnit | null;
    if (unit === null) {
      unit = this._unitSelect.value = core.DurationUnit.minutes();
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
    return this._unitSelect.value as core.DurationUnit;
  }

  set unit(unit: core.DurationUnit) {
    this._unitSelect.value = unit;
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
          try {
            BigInt(`0x${this.element.value}`);
          } catch {
            this.invalid = true;
          }
          if (!this.invalid) {
            oninput(this.value);
          }
        }}
      />
    ) as HTMLInputElement;

    setTimeout(() => oninput(this.value), 0);
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
    return core.node.fromRef(this.element.value);
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
          try {
            BigInt(`0x${this.element.value}`);
          } catch {
            this.invalid = true;
          }
          if (!this.invalid) {
            oninput(this.value);
          }
        }}
      />
    ) as HTMLInputElement;

    setTimeout(() => oninput(this.value), 0);
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
    return core.nodeTime.fromRef(this.element.value);
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
          try {
            BigInt(`0x${this.element.value}`);
          } catch {
            this.invalid = true;
          }
          if (!this.invalid) {
            oninput(this.value);
          }
        }}
      />
    ) as HTMLInputElement;

    setTimeout(() => oninput(this.value), 0);
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
    return core.nodeGeo.fromRef(this.element.value);
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
          try {
            BigInt(`0x${this.element.value}`);
          } catch {
            this.invalid = true;
          }
          if (!this.invalid) {
            oninput(this.value);
          }
        }}
      />
    ) as HTMLInputElement;

    setTimeout(() => oninput(this.value), 0);
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
    return core.nodeList.fromRef(this.element.value);
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
          try {
            BigInt(`0x${this.element.value}`);
          } catch {
            this.invalid = true;
          }
          if (!this.invalid) {
            oninput(this.value);
          }
        }}
      />
    ) as HTMLInputElement;

    setTimeout(() => oninput(this.value), 0);
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
    return core.nodeIndex.fromRef(this.element.value);
  }

  set value(value: core.nodeIndex) {
    this.element.value = value.ref;
  }
}

export class UnknownInput implements IInput {
  element: HTMLInputElement;

  constructor(name: string, oninput: InputHandler) {
    this.element = (
      <input type="text" id={name} name={name} placeholder="Not handled yet" disabled />
    ) as HTMLInputElement;

    setTimeout(() => oninput(this.value), 0);
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
    return undefined;
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
    inputList.classList.add('gui-input-object-attributes');

    this._inputs = new Array(type.attrs.length);
    for (let i = 0; i < type.attrs.length; i++) {
      const attr = type.attrs[i];
      const attrOnInput: InputHandler = (v) => {
        // update closed arg value
        this._values[i] = v;
        oninput(this.value);
      };
      const attrTy = greycat.default.abi.types[attr.abi_type];
      let input: IInput;
      if (attr.nullable) {
        input = new NullableInput(
          `${_name}-${attr.name}`,
          () => InputFactory.create(`${_name}-${attr.name}`, attrTy, attrOnInput),
          attrOnInput,
        );
      } else {
        input = InputFactory.create(`${_name}-${attr.name}`, attrTy, attrOnInput);
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

    this.element = (<div className="gui-input-object">{inputList}</div>) as HTMLElement;

    setTimeout(() => oninput(this.value), 0);
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
  private readonly _inputs: LabelledInput[];

  constructor(
    private _name: string,
    private _fn: AbiFunction,
    public oninput: InputHandler,
  ) {
    this._values = new Array(_fn.params.length);

    const inputList = document.createElement('div');
    inputList.classList.add('gui-input-fn-call-params');

    this._inputs = new Array(_fn.params.length);
    for (let i = 0; i < _fn.params.length; i++) {
      const param = _fn.params[i];
      const paramOnInput: InputHandler = (v) => {
        // update closed arg value
        this._values[i] = v;
        oninput(this.value);
      };
      let input: IInput;
      if (param.nullable) {
        input = new NullableInput(
          `${_name}-${param.name}`,
          () => InputFactory.create(`${_name}-${param.name}`, param.type, paramOnInput),
          paramOnInput,
        );
      } else {
        input = InputFactory.create(`${_name}-${param.name}`, param.type, paramOnInput);
      }

      const label = document.createTextNode(
        `${param.name}: ${displayType(param.type, param.nullable)}`,
      );
      const labelledInput = new LabelledInput(label, input);

      // append to input list
      this._inputs[i] = labelledInput;
      // append to DOM list
      inputList.appendChild(labelledInput.element);
    }

    this.element = (<div className="gui-input-fn-call">{inputList}</div>) as HTMLElement;

    setTimeout(() => oninput(this.value), 0);
  }

  /**
   * Gets a reference to the underlying inputs for the parameters.
   */
  get inputs(): IInput[] {
    return this._inputs;
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
    this._inputs.length = fn.params.length;

    const inputList = document.createElement('div');
    inputList.classList.add('gui-input-fn-call-params');

    for (let i = 0; i < fn.params.length; i++) {
      const param = fn.params[i];
      const paramOnInput: InputHandler = (v) => {
        // update closed arg value
        this._values[i] = v;
        this.oninput(this.value);
      };
      let input: IInput;
      if (param.nullable) {
        input = new NullableInput(
          `${this._name}-${param.name}`,
          () => InputFactory.create(`${this._name}-${param.name}`, param.type, paramOnInput),
          paramOnInput,
        );
      } else {
        input = InputFactory.create(`${this._name}-${param.name}`, param.type, paramOnInput);
      }

      const label = document.createTextNode(
        `${param.name}: ${displayType(param.type, param.nullable)}`,
      );
      const labelledInput = new LabelledInput(label, input);

      // append to input list
      this._inputs[i] = labelledInput;
      // append to DOM list
      inputList.appendChild(labelledInput.element);
    }

    this.element.replaceChildren(inputList);

    this.oninput(this.value);
  }
}

export class EnumInput implements IInput {
  element: HTMLSelectElement;

  constructor(
    name: string,
    private _type: AbiType,
    oninput: InputHandler,
  ) {
    this.element = (
      <select
        name={name}
        onchange={() => oninput(this._type.enum_values![this.element.selectedIndex])}
      >
        {this._type.enum_values!.map((e) => (
          <option>{e.key}</option>
        ))}
      </select>
    ) as HTMLSelectElement;

    // default value
    setTimeout(() => oninput(this.value), 0);
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
    return this._type.enum_values![this.element.selectedIndex];
  }

  set value(value: GCEnum | null) {
    if (value === null || value.$type.enum_values === null) {
      // noop
    } else {
      this._type = value.$type;

      const options = document.createDocumentFragment();
      for (let i = 0; i < value.$type.enum_values.length; i++) {
        const en = value.$type.enum_values[i];
        options.appendChild(<option>{en.key}</option>);
      }
      this.element.replaceChildren(options);
    }
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

    this.element = document.createElement('div');
    this.element.className = 'gui-input-array';
    this.element.appendChild(this._addElementAnchor);

    setTimeout(() => oninput(this.value), 0);
  }

  get name() {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  private _addInput() {
    const input = new AnyInput(`${this.name}-${this._id++}`, () => this.oninput(this.value));

    const deleteAnchor = (
      <a
        href="#"
        title="Delete element"
        onclick={() => {
          const index = getIndexInParent(inputWrapper) - 1;
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
    ) as HTMLElement;
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
    const value: unknown[] = new Array(this._arrElements.length);
    for (let i = 0; i < this._arrElements.length; i++) {
      value[i] = this._arrElements[i].input.value;
    }
    return value;
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

/**
 * Lets the user choose which AbiType to construct from a selector.
 */
export class AnyInput implements IInput {
  element: HTMLElement;
  private _valueInput: IInput;
  private _typeSelect: GuiSearchableSelect;

  constructor(
    name: string,
    public oninput: InputHandler,
  ) {
    this._valueInput = new StringInput(name, oninput);
    this._typeSelect = document.createElement('gui-searchable-select');
    this._typeSelect.placeholder = 'Select a type';
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
        selected: ty.offset === greycat.default.abi.core_string_offset,
      });
    }
    this._typeSelect.value = greycat.default.abi.core_string_offset;
    this._typeSelect.options = options;
    this._typeSelect.addEventListener('gui-change', (ev) => {
      const type = greycat.default.abi.types[ev.detail as number];
      const newInput = InputFactory.create(name, type, oninput);
      this.element.children[0].remove();
      this.element.prepend(newInput.element);
      this._valueInput = newInput;
      this.oninput(this.value);
    });

    this.element = (
      <div className="gui-input-any">
        {this._valueInput.element}
        {this._typeSelect}
      </div>
    ) as HTMLElement;
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
        this._typeSelect.value = 'core::int';
        this._valueInput = new IntInput(this.name, this.oninput);
        this._valueInput.value = value;
        break;
      case 'boolean':
        this._typeSelect.value = 'core::bool';
        this._valueInput = new BoolInput(this.name, this.oninput);
        this._valueInput.value = value;
        break;
      case 'string':
        this._typeSelect.value = 'core::String';
        this._valueInput = new StringInput(this.name, this.oninput);
        this._valueInput.value = value;
        break;
      case 'undefined':
        this._typeSelect.value = 'core::String';
        this._valueInput = new StringInput(this.name, this.oninput);
        this._valueInput.value = '';
        break;
      case 'object': {
        if (value === null) {
          this._typeSelect.value = 'core::String';
          this._valueInput = new StringInput(this.name, this.oninput);
          this._valueInput.value = '';
        } else if (Array.isArray(value)) {
          this._typeSelect.value = 'core::Array';
          this._valueInput = new ArrayInput(this.name, this.oninput);
          this._valueInput.value = value;
        } else if (value instanceof Map) {
          this._typeSelect.value = 'core::Map';
          this._valueInput = new MapInput(this.name, this.oninput);
          this._valueInput.value = value;
        } else if (value instanceof GCObject) {
          this._typeSelect.value = value.$type.name;
          this._valueInput = InputFactory.create(this.name, value.$type, this.oninput);
          this._valueInput.value = value;
        } else {
          this._typeSelect.value = '';
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
  input: IInput | undefined;
  private _nullCheckbox: HTMLInputElement;

  constructor(
    private _name: string,
    private _createInput: () => IInput,
    public oninput: InputHandler,
  ) {
    const nullableName = `${_name}-nullable`;

    this._nullCheckbox = (
      <input
        type="checkbox"
        id={nullableName}
        name={nullableName}
        checked
        onchange={() => {
          if (this.input === undefined) {
            this.input = _createInput();
            this.element.replaceChild(this.input.element, this.element.children[0]);
          }
          if (!this._nullCheckbox.checked) {
            this.input.disabled = false;
            oninput(this.input.value);
          } else {
            this.input.disabled = true;
            oninput(null);
          }
        }}
      />
    ) as HTMLInputElement;

    this.element = (
      <div className="gui-input-nullable">
        <em>Null by default</em>
        <label htmlFor={nullableName}>
          {this._nullCheckbox}
          Null?
        </label>
      </div>
    ) as HTMLElement;

    setTimeout(() => oninput(this.value), 0);
  }

  get name() {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
    if (this.input) {
      this.input.name = name;
    }
  }

  get disabled() {
    return this._nullCheckbox.disabled;
  }

  set disabled(disabled: boolean) {
    this._nullCheckbox.disabled = disabled;
    if (this.input) {
      this.input.disabled = disabled;
    }
  }

  get invalid() {
    return this._nullCheckbox.hasAttribute('aria-invalid');
  }

  set invalid(invalid: boolean) {
    if (invalid) {
      this._nullCheckbox.setAttribute('aria-invalid', 'true');
    } else {
      this._nullCheckbox.removeAttribute('aria-invalid');
    }
    if (this.input) {
      this.input.invalid = invalid;
    }
  }

  get value() {
    if (this._nullCheckbox.checked) {
      return null;
    }
    return this.input?.value ?? null;
  }

  set value(value: unknown | undefined) {
    if (value === null) {
      this._nullCheckbox.checked = true;
      this.disabled = true;
      return;
    }
    this._nullCheckbox.checked = false;
    if (!this.input) {
      this.input = this._createInput();
      this.element.replaceChild(this.input.element, this.element.children[0]);
    }
    this.input.value = value;
  }
}

export class Input implements IInput {
  private _inner: IInput;

  constructor(name: string, type: AbiType, nullable: boolean, oninput: InputHandler) {
    if (nullable) {
      this._inner = new NullableInput(
        name,
        () => InputFactory.create(name, type, oninput),
        oninput,
      );
    } else {
      this._inner = InputFactory.create(name, type, oninput);
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
 * Wraps the function factory `createInput` with its own state
 */
export class TypedInput implements IInput {
  private _inner: IInput;

  constructor(name: string, type: AbiType, oninput: InputHandler) {
    this._inner = InputFactory.create(name, type, oninput);
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
      <fieldset className="gui-input-labelled-fieldset" role="group">
        <label htmlFor={input.name}>{label}</label>
        {this.input instanceof BoolInput ? (
          <div className="gui-input-bool">{this.input.element}</div>
        ) : (
          this.input.element
        )}
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

class MapEntryInput implements IInput {
  readonly element: HTMLElement;
  private _keyInput: AnyInput;
  private _valueInput: AnyInput;

  constructor(name: string, oninput: InputHandler) {
    this._keyInput = new AnyInput(`${name}_key`, () => {
      oninput(this.value);
    });
    this._valueInput = new AnyInput(`${name}_value`, () => {
      oninput(this.value);
    });
    this.element = (
      <div className="gui-input-map-entry">
        <fieldset role="group">
          <label>Key</label>
          {this._keyInput.element}
        </fieldset>
        <fieldset role="group">
          <label>Value</label>
          {this._valueInput.element}
        </fieldset>
      </div>
    ) as HTMLElement;
  }

  get name() {
    return this._keyInput.name;
  }

  set name(name: string) {
    this._keyInput.name = name;
    this._valueInput.name = name;
  }

  get disabled() {
    return this._keyInput.disabled;
  }

  set disabled(disabled: boolean) {
    this._keyInput.disabled = disabled;
    this._valueInput.disabled = disabled;
  }

  get invalid() {
    return this._keyInput.invalid;
  }

  set invalid(invalid: boolean) {
    this._keyInput.disabled = invalid;
    this._valueInput.disabled = invalid;
  }

  get value() {
    return [this._keyInput.value, this._valueInput.value] as const;
  }

  set value([key, value]: readonly [unknown, unknown]) {
    this._keyInput.value = key;
    this._valueInput.value = value;
  }
}

export class MapInput implements IInput {
  readonly element: HTMLElement;
  private _addElementAnchor: HTMLAnchorElement;
  private _mapElements: Array<{ entry: MapEntryInput; deleteAnchor: HTMLAnchorElement }> = [];
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
          this._addEntry();
          this.oninput(this.value);
        }}
      >
        Add a new entry
      </a>
    ) as HTMLAnchorElement;

    this.element = (<div className="gui-input-map">{this._addElementAnchor}</div>) as HTMLElement;

    setTimeout(() => oninput(this.value), 0);
  }

  get name() {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  private _addEntry() {
    const entry = new MapEntryInput(`${this.name}-${this._id++}`, () => this.oninput(this.value));

    const deleteAnchor = (
      <a
        href="#"
        title="Delete entry"
        onclick={() => {
          const index = getIndexInParent(inputWrapper) - 1;
          this.element.removeChild(inputWrapper);
          this._mapElements.splice(index, 1);
          this.oninput(this.value);
        }}
      >
        X
      </a>
    ) as HTMLAnchorElement;

    const inputWrapper = (
      <div className="gui-input-map-entry-container">
        {entry.element}
        {deleteAnchor}
      </div>
    ) as HTMLElement;
    this.element.appendChild(inputWrapper);
    this._mapElements.push({ entry, deleteAnchor });
    return entry;
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
    for (let i = 0; i < this._mapElements.length; i++) {
      this._mapElements[i].entry.disabled = disabled;
      if (disabled) {
        this._mapElements[i].deleteAnchor.remove();
      } else {
        this._mapElements[i].entry.element.parentElement!.appendChild(
          this._mapElements[i].deleteAnchor,
        );
      }
    }
  }

  get invalid() {
    // if the first one is invalid, then they all are
    return this._mapElements[0]?.entry.invalid ?? false;
  }

  set invalid(invalid: boolean) {
    for (let i = 0; i < this._mapElements.length; i++) {
      this._mapElements[i].entry.invalid = invalid;
    }
  }

  get value() {
    return new Map(this._mapElements.map((input) => input.entry.value));
  }

  set value(value: Map<unknown, unknown>) {
    // reset input list
    this._mapElements.length = 0;
    // remove all inputs from the DOM
    let lastInput = this.element.lastChild;
    while (this.element.children.length > 1 && lastInput) {
      lastInput.remove();
      lastInput = this.element.lastChild;
    }
    // create an input for each item in value
    value.forEach((value, key) => {
      const entry = this._addEntry();
      entry.value = [key, value];
    });
    this.oninput(this.value);
  }
}

export class GeoInput implements IInput {
  readonly element: HTMLFieldSetElement;
  private _lat: FloatInput;
  private _lng: FloatInput;

  constructor(name: string, oninput: InputHandler) {
    this._lat = new FloatInput(`${name}_lat`, () => oninput(this.value));
    this._lat.element.placeholder = 'Latitude';
    this._lng = new FloatInput(`${name}_lat`, () => oninput(this.value));
    this._lng.element.placeholder = 'Longitude';

    this.element = (
      <fieldset role="group" name={name}>
        {this._lat.element}
        {this._lng.element}
      </fieldset>
    ) as HTMLFieldSetElement;
  }

  get name() {
    return this.element.name;
  }

  set name(name: string) {
    this.element.name = name;
    this._lat.name = `${name}_lat`;
    this._lng.name = `${name}_lng`;
  }

  get disabled() {
    return this._lat.disabled || this._lng.disabled;
  }

  set disabled(disabled: boolean) {
    this._lat.disabled = disabled;
    this._lng.disabled = disabled;
  }

  get invalid() {
    return this._lat.invalid || this._lng.invalid;
  }

  set invalid(invalid: boolean) {
    this._lat.invalid = invalid;
    this._lng.invalid = invalid;
  }

  get value() {
    if (isNaN(this._lat.value) || isNaN(this._lng.value)) {
      return core.geo.fromLatLng(0, 0);
    }
    return core.geo.fromLatLng(this._lat.value, this._lng.value);
  }

  set value(geo: core.geo) {
    const [lat, lng] = geo.latlng;
    this._lat.value = lat;
    this._lng.value = lng;
  }
}

export class InputFactory {
  static inputs: Record<string, InputConstructor> = {
    ['core::any']: AnyInput,
    ['core::bool']: BoolInput,
    ['core::char']: CharInput,
    ['core::float']: FloatInput,
    ['core::int']: IntInput,
    [core.Array._type]: ArrayInput,
    [core.duration._type]: DurationInput,
    [core.function_._type]: FnInput,
    [core.Map._type]: MapInput,
    [core.node._type]: NodeInput,
    [core.nodeGeo._type]: NodeGeoInput,
    [core.nodeIndex._type]: NodeIndexInput,
    [core.nodeList._type]: NodeListInput,
    [core.nodeTime._type]: NodeTimeInput,
    [core.String._type]: StringInput,
    [core.time._type]: TimeInput,
    [core.geo._type]: GeoInput,
    // TODO add all the tuples
    unknown: UnknownInput,
  };

  /**
   * Creates an input based on the given `AbiType`.
   *
   * Works for any `AbiType` whether it is a `GCEnum`, `GCObject` or a primitive/native.
   *
   * - If you know you are dealing with `GCEnum` directly use `EnumInput`.
   * - If you know you are dealing with `GCObject` directory use `ObjectInput`.
   * - If you know you are dealing with a primitive/native, you can use `InputFactory.inputs['core::int']` (or the others)
   *
   * *You can override any input by mutating `InputFactory.inputs` prior to calling this method*
   */
  static create(name: string, type: AbiType, oninput: InputHandler): IInput {
    if (type.is_native || type.name === 'core::any') {
      const inputCtor = InputFactory.inputs[type.name] ?? InputFactory.inputs.unknown;
      return new inputCtor(name, oninput);
    } else if (type.is_enum) {
      return new EnumInput(name, type, oninput);
    }
    return new ObjectInput(name, type, oninput);
  }

  /**
   * Creates an input from any value and set the created input value.
   *
   * *You can override any input by mutating `InputFactory.inputs` prior to calling this method*
   */
  static createFromValue(name: string, value: unknown, oninput: InputHandler): IInput {
    let input: IInput;

    switch (typeof value) {
      case 'bigint':
      case 'number':
        input = new IntInput(name, oninput);
        break;
      case 'boolean':
        input = new BoolInput(name, oninput);
        break;
      case 'undefined':
      case 'string':
        input = new StringInput(name, oninput);
        break;
      case 'object':
        if (value === null) {
          input = new AnyInput(name, oninput);
        } else if (value instanceof GCEnum) {
          input = new EnumInput(name, value.$type, oninput);
        } else if (value instanceof GCObject) {
          input = new ObjectInput(name, value.$type, oninput);
        } else if (Array.isArray(value)) {
          input = new ArrayInput(name, oninput);
        } else if (value instanceof Map) {
          input = new MapInput(name, oninput);
        } else {
          input = new UnknownInput(name, oninput);
        }
        break;
      default:
        input = new UnknownInput(name, oninput);
        break;
    }

    input.value = value;

    return input;
  }
}
