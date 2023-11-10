import * as factory from './input-factory.js';
import { core, GCEnum, GCObject, Value, AbiFunction, AbiType } from '@greycat/sdk';

export class GuiInputString extends HTMLElement {
  private _input = new factory.StringInput('default', (value) =>
    this.dispatchEvent(new CustomEvent('input', { detail: value })),
  );

  connectedCallback() {
    this.replaceChildren(this._input.element);
  }

  disconnectedCallback() {
    this.replaceChildren();
  }

  set name(name: string) {
    this._input.name = name;
  }

  get name() {
    return this._input.name;
  }

  set value(value: string) {
    this._input.value = value;
  }

  get value() {
    return this._input.value;
  }

  set disabled(disabled: boolean) {
    this._input.disabled = disabled;
  }

  get disabled() {
    return this._input.disabled;
  }

  set invalid(invalid: boolean) {
    this._input.invalid = invalid;
  }

  get invalid() {
    return this._input.invalid;
  }
}

export class GuiInputChar extends HTMLElement {
  private _input = new factory.CharInput('default', (value) =>
    this.dispatchEvent(new CustomEvent('input', { detail: value })),
  );

  connectedCallback() {
    this.replaceChildren(this._input.element);
  }

  disconnectedCallback() {
    this.replaceChildren();
  }

  set name(name: string) {
    this._input.name = name;
  }

  get name() {
    return this._input.name;
  }

  set value(value: string) {
    this._input.value = value;
  }

  get value() {
    return this._input.value;
  }

  set disabled(disabled: boolean) {
    this._input.disabled = disabled;
  }

  get disabled() {
    return this._input.disabled;
  }

  set invalid(invalid: boolean) {
    this._input.invalid = invalid;
  }

  get invalid() {
    return this._input.invalid;
  }
}

export class GuiInputInt extends HTMLElement {
  private _input = new factory.IntInput('default', (value) =>
    this.dispatchEvent(new CustomEvent('input', { detail: value })),
  );

  connectedCallback() {
    this.replaceChildren(this._input.element);
  }

  disconnectedCallback() {
    this.replaceChildren();
  }

  set name(name: string) {
    this._input.name = name;
  }

  get name() {
    return this._input.name;
  }

  set value(value: number) {
    this._input.value = value;
  }

  get value() {
    return this._input.value;
  }

  set disabled(disabled: boolean) {
    this._input.disabled = disabled;
  }

  get disabled() {
    return this._input.disabled;
  }

  set invalid(invalid: boolean) {
    this._input.invalid = invalid;
  }

  get invalid() {
    return this._input.invalid;
  }
}

export class GuiInputFloat extends HTMLElement {
  private _input = new factory.FloatInput('default', (value) =>
    this.dispatchEvent(new CustomEvent('input', { detail: value })),
  );

  connectedCallback() {
    this.replaceChildren(this._input.element);
  }

  disconnectedCallback() {
    this.replaceChildren();
  }

  set name(name: string) {
    this._input.name = name;
  }

  get name() {
    return this._input.name;
  }

  set value(value: number) {
    this._input.value = value;
  }

  get value() {
    return this._input.value;
  }

  set disabled(disabled: boolean) {
    this._input.disabled = disabled;
  }

  get disabled() {
    return this._input.disabled;
  }

  set invalid(invalid: boolean) {
    this._input.invalid = invalid;
  }

  get invalid() {
    return this._input.invalid;
  }
}

export class GuiInputBool extends HTMLElement {
  private _input = new factory.BoolInput('default', (value) =>
    this.dispatchEvent(new CustomEvent('input', { detail: value })),
  );

  connectedCallback() {
    this.replaceChildren(this._input.element);
  }

  disconnectedCallback() {
    this.replaceChildren();
  }

  set name(name: string) {
    this._input.name = name;
  }

  get name() {
    return this._input.name;
  }

  set value(value: boolean) {
    this._input.value = value;
  }

  get value() {
    return this._input.value;
  }

  set disabled(disabled: boolean) {
    this._input.disabled = disabled;
  }

  get disabled() {
    return this._input.disabled;
  }

  set invalid(invalid: boolean) {
    this._input.invalid = invalid;
  }

  get invalid() {
    return this._input.invalid;
  }
}

export class GuiInputTime extends HTMLElement {
  private _input = new factory.TimeInput('default', (value) =>
    this.dispatchEvent(new CustomEvent('input', { detail: value })),
  );

  connectedCallback() {
    this.replaceChildren(this._input.element);
  }

  disconnectedCallback() {
    this.replaceChildren();
  }

  set name(name: string) {
    this._input.name = name;
  }

  get name() {
    return this._input.name;
  }

  set value(value: core.time) {
    this._input.value = value;
  }

  get value() {
    return this._input.value;
  }

  set disabled(disabled: boolean) {
    this._input.disabled = disabled;
  }

  get disabled() {
    return this._input.disabled;
  }

  set invalid(invalid: boolean) {
    this._input.invalid = invalid;
  }

  get invalid() {
    return this._input.invalid;
  }
}

export class GuiInputFn extends HTMLElement {
  private _input = new factory.FnInput('default', (value) =>
    this.dispatchEvent(new CustomEvent('input', { detail: value })),
  );

  connectedCallback() {
    this.replaceChildren(this._input.element);
  }

  disconnectedCallback() {
    this.replaceChildren();
  }

  set name(name: string) {
    this._input.name = name;
  }

  get name() {
    return this._input.name;
  }

  set value(value: core.function_ | null) {
    this._input.value = value;
  }

  get value() {
    return this._input.value;
  }

  set disabled(disabled: boolean) {
    this._input.disabled = disabled;
  }

  get disabled() {
    return this._input.disabled;
  }

  set invalid(invalid: boolean) {
    this._input.invalid = invalid;
  }

  get invalid() {
    return this._input.invalid;
  }
}

export class GuiInputDuration extends HTMLElement {
  private _input = new factory.DurationInput('default', (value) =>
    this.dispatchEvent(new CustomEvent('input', { detail: value })),
  );

  connectedCallback() {
    this.replaceChildren(this._input.element);
  }

  disconnectedCallback() {
    this.replaceChildren();
  }

  set name(name: string) {
    this._input.name = name;
  }

  get name() {
    return this._input.name;
  }

  set value(value: core.duration) {
    this._input.value = value;
  }

  get value() {
    return this._input.value;
  }

  set disabled(disabled: boolean) {
    this._input.disabled = disabled;
  }

  get disabled() {
    return this._input.disabled;
  }

  set invalid(invalid: boolean) {
    this._input.invalid = invalid;
  }

  get invalid() {
    return this._input.invalid;
  }
}

export class GuiInputNode extends HTMLElement {
  private _input = new factory.NodeInput('default', (value) =>
    this.dispatchEvent(new CustomEvent('input', { detail: value })),
  );

  connectedCallback() {
    this.replaceChildren(this._input.element);
  }

  disconnectedCallback() {
    this.replaceChildren();
  }

  set name(name: string) {
    this._input.name = name;
  }

  get name() {
    return this._input.name;
  }

  set value(value: core.node) {
    this._input.value = value;
  }

  get value() {
    return this._input.value;
  }

  set disabled(disabled: boolean) {
    this._input.disabled = disabled;
  }

  get disabled() {
    return this._input.disabled;
  }

  set invalid(invalid: boolean) {
    this._input.invalid = invalid;
  }

  get invalid() {
    return this._input.invalid;
  }
}

export class GuiInputNodeTime extends HTMLElement {
  private _input = new factory.NodeTimeInput('default', (value) =>
    this.dispatchEvent(new CustomEvent('input', { detail: value })),
  );

  connectedCallback() {
    this.replaceChildren(this._input.element);
  }

  disconnectedCallback() {
    this.replaceChildren();
  }

  set name(name: string) {
    this._input.name = name;
  }

  get name() {
    return this._input.name;
  }

  set value(value: core.nodeTime) {
    this._input.value = value;
  }

  get value() {
    return this._input.value;
  }

  set disabled(disabled: boolean) {
    this._input.disabled = disabled;
  }

  get disabled() {
    return this._input.disabled;
  }

  set invalid(invalid: boolean) {
    this._input.invalid = invalid;
  }

  get invalid() {
    return this._input.invalid;
  }
}

export class GuiInputNodeGeo extends HTMLElement {
  private _input = new factory.NodeGeoInput('default', (value) =>
    this.dispatchEvent(new CustomEvent('input', { detail: value })),
  );

  connectedCallback() {
    this.replaceChildren(this._input.element);
  }

  disconnectedCallback() {
    this.replaceChildren();
  }

  set name(name: string) {
    this._input.name = name;
  }

  get name() {
    return this._input.name;
  }

  set value(value: core.nodeGeo) {
    this._input.value = value;
  }

  get value() {
    return this._input.value;
  }

  set disabled(disabled: boolean) {
    this._input.disabled = disabled;
  }

  get disabled() {
    return this._input.disabled;
  }

  set invalid(invalid: boolean) {
    this._input.invalid = invalid;
  }

  get invalid() {
    return this._input.invalid;
  }
}

export class GuiInputNodeList extends HTMLElement {
  private _input = new factory.NodeListInput('default', (value) =>
    this.dispatchEvent(new CustomEvent('input', { detail: value })),
  );

  connectedCallback() {
    this.replaceChildren(this._input.element);
  }

  disconnectedCallback() {
    this.replaceChildren();
  }

  set name(name: string) {
    this._input.name = name;
  }

  get name() {
    return this._input.name;
  }

  set value(value: core.nodeList) {
    this._input.value = value;
  }

  get value() {
    return this._input.value;
  }

  set disabled(disabled: boolean) {
    this._input.disabled = disabled;
  }

  get disabled() {
    return this._input.disabled;
  }

  set invalid(invalid: boolean) {
    this._input.invalid = invalid;
  }

  get invalid() {
    return this._input.invalid;
  }
}

export class GuiInputNodeIndex extends HTMLElement {
  private _input = new factory.NodeIndexInput('default', (value) =>
    this.dispatchEvent(new CustomEvent('input', { detail: value })),
  );

  connectedCallback() {
    this.replaceChildren(this._input.element);
  }

  disconnectedCallback() {
    this.replaceChildren();
  }

  set name(name: string) {
    this._input.name = name;
  }

  get name() {
    return this._input.name;
  }

  set value(value: core.nodeIndex) {
    this._input.value = value;
  }

  get value() {
    return this._input.value;
  }

  set disabled(disabled: boolean) {
    this._input.disabled = disabled;
  }

  get disabled() {
    return this._input.disabled;
  }

  set invalid(invalid: boolean) {
    this._input.invalid = invalid;
  }

  get invalid() {
    return this._input.invalid;
  }
}

export class GuiInputUnknown extends HTMLElement {
  private _input = new factory.UnknownInput('default', (value) =>
    this.dispatchEvent(new CustomEvent('input', { detail: value })),
  );

  connectedCallback() {
    this.replaceChildren(this._input.element);
  }

  disconnectedCallback() {
    this.replaceChildren();
  }

  set name(name: string) {
    this._input.name = name;
  }

  get name() {
    return this._input.name;
  }

  set value(value: unknown) {
    this._input.value = value;
  }

  get value() {
    return this._input.value;
  }

  set disabled(disabled: boolean) {
    this._input.disabled = disabled;
  }

  get disabled() {
    return this._input.disabled;
  }

  set invalid(invalid: boolean) {
    this._input.invalid = invalid;
  }

  get invalid() {
    return this._input.invalid;
  }
}

export class GuiInputObject extends HTMLElement {
  private _input = new factory.ObjectInput('default',
    greycat.default.abi.types[greycat.default.abi.core_string_offset],
    (value) => this.dispatchEvent(new CustomEvent('input', { detail: value })),
  );

  connectedCallback() {
    this.replaceChildren(this._input.element);
  }

  disconnectedCallback() {
    this.replaceChildren();
  }

  set name(name: string) {
    this._input.name = name;
  }

  get name() {
    return this._input.name;
  }

  set value(value: GCObject) {
    this._input.value = value;
  }

  get value() {
    return this._input.value;
  }

  set disabled(disabled: boolean) {
    this._input.disabled = disabled;
  }

  get disabled() {
    return this._input.disabled;
  }

  set invalid(invalid: boolean) {
    this._input.invalid = invalid;
  }

  get invalid() {
    return this._input.invalid;
  }
}

export class GuiInputFnCall extends HTMLElement {
  private _input: factory.FnCallInput | undefined;

  connectedCallback() {
    if (this._input !== undefined) {
      this.replaceChildren(this._input.element);
    }
  }

  disconnectedCallback() {
    this.replaceChildren();
  }

  set name(name: string) {
    if (this._input !== undefined) {
      this._input.name = name;
    }
  }

  get name() {
    return this._input?.name ?? "";
  }

  set fn(fn: AbiFunction | undefined) {
    if (fn) {
      this._input = new factory.FnCallInput(fn.name,
        fn,
        (value) => this.dispatchEvent(new CustomEvent('input', { detail: value })),
      );
      this.replaceChildren(this._input.element);
    }
  }

  get fn() {
    return this._input?.fn;
  }

  set value(value: Value[]) {
    if (this._input !== undefined) {
      this._input.value = value;
    }
  }

  get value() {
    if (this._input !== undefined) {
      return this._input.value;
    } else {
      return [];
    }
  }

  set disabled(disabled: boolean) {
    if (this._input !== undefined) {
      this._input.disabled = disabled;
    }
  }

  get disabled() {
    if (this._input !== undefined) {
      return this._input.disabled;
    } else {
      return false;
    }
  }

  set invalid(invalid: boolean) {
    if (this._input !== undefined) {
      this._input.invalid = invalid;
    }
  }

  get invalid() {
    if (this._input !== undefined) {
      return this._input.invalid;
    } else {
      return false;
    }
  }
}

export class GuiInputEnum extends HTMLElement {
  private _input = new factory.EnumInput('default',
    greycat.default.abi.types[greycat.default.abi.core_string_offset],
    (value) => this.dispatchEvent(new CustomEvent('input', { detail: value })),
  );

  connectedCallback() {
    this.replaceChildren(this._input.element);
  }

  disconnectedCallback() {
    this.replaceChildren();
  }

  set name(name: string) {
    this._input.name = name;
  }

  get name() {
    return this._input.name;
  }

  set value(value: GCEnum | null) {
    this._input.value = value;
  }

  get value() {
    return this._input.value;
  }

  set disabled(disabled: boolean) {
    this._input.disabled = disabled;
  }

  get disabled() {
    return this._input.disabled;
  }

  set invalid(invalid: boolean) {
    this._input.invalid = invalid;
  }

  get invalid() {
    return this._input.invalid;
  }
}

export class GuiInputArray extends HTMLElement {
  private _input = new factory.ArrayInput('default', (value) =>
    this.dispatchEvent(new CustomEvent('input', { detail: value })),
  );

  connectedCallback() {
    this.replaceChildren(this._input.element);
  }

  disconnectedCallback() {
    this.replaceChildren();
  }

  set name(name: string) {
    this._input.name = name;
  }

  get name() {
    return this._input.name;
  }

  set value(value: Array<unknown>) {
    this._input.value = value;
  }

  get value() {
    return this._input.value;
  }

  set disabled(disabled: boolean) {
    this._input.disabled = disabled;
  }

  get disabled() {
    return this._input.disabled;
  }

  set invalid(invalid: boolean) {
    this._input.invalid = invalid;
  }

  get invalid() {
    return this._input.invalid;
  }
}

export class GuiInputAny extends HTMLElement {
  private _input = new factory.AnyInput('default', (value) =>
    this.dispatchEvent(new CustomEvent('input', { detail: value })),
  );

  connectedCallback() {
    this.replaceChildren(this._input.element);
  }

  disconnectedCallback() {
    this.replaceChildren();
  }

  set name(name: string) {
    this._input.name = name;
  }

  get name() {
    return this._input.name;
  }

  set value(value: unknown) {
    this._input.value = value;
  }

  get value() {
    return this._input.value;
  }

  set disabled(disabled: boolean) {
    this._input.disabled = disabled;
  }

  get disabled() {
    return this._input.disabled;
  }

  set invalid(invalid: boolean) {
    this._input.invalid = invalid;
  }

  get invalid() {
    return this._input.invalid;
  }
}

export class GuiInputNullable extends HTMLElement {
  private _input = new factory.NullableInput('default',
    greycat.default.abi.types[greycat.default.abi.core_string_offset],
    (value) => this.dispatchEvent(new CustomEvent('input', { detail: value })),
  );

  connectedCallback() {
    this.replaceChildren(this._input.element);
  }

  disconnectedCallback() {
    this.replaceChildren();
  }

  set name(name: string) {
    this._input.name = name;
  }

  get name() {
    return this._input.name;
  }

  set value(value: unknown | undefined) {
    this._input.value = value;
  }

  get value() {
    return this._input.value;
  }

  set disabled(disabled: boolean) {
    this._input.disabled = disabled;
  }

  get disabled() {
    return this._input.disabled;
  }

  set invalid(invalid: boolean) {
    this._input.invalid = invalid;
  }

  get invalid() {
    return this._input.invalid;
  }
}

export class GuiInput extends HTMLElement {
  private _input = new factory.Input(
    '1', 
    'default', 
    greycat.default.abi.types[greycat.default.abi.core_string_offset],
    false,
    (value) => this.dispatchEvent(new CustomEvent('input', { detail: value })),
  );

  connectedCallback() {
    this.replaceChildren(this._input.element);
  }

  disconnectedCallback() {
    this.replaceChildren();
  }

  set name(name: string) {
    this._input.name = name;
  }

  get name() {
    return this._input.name;
  }

  set value(value: unknown) {
    this._input.value = value;
  }

  get value() {
    return this._input.value;
  }

  set disabled(disabled: boolean) {
    this._input.disabled = disabled;
  }

  get disabled() {
    return this._input.disabled;
  }

  set invalid(invalid: boolean) {
    this._input.invalid = invalid;
  }

  get invalid() {
    return this._input.invalid;
  }
}

export class GuiInputTyped extends HTMLElement {
  private _input = new factory.TypedInput(
    'default', 
    greycat.default.abi.types[greycat.default.abi.core_string_offset],
    (value) => this.dispatchEvent(new CustomEvent('input', { detail: value })),
  );

  connectedCallback() {
    this.replaceChildren(this._input.element);
  }

  disconnectedCallback() {
    this.replaceChildren();
  }

  set name(name: string) {
    this._input.name = name;
  }
  
  get name() {
    return this._input.name;
  }

  set value(value: unknown) {
    this._input.value = value;
  }

  get value() {
    return this._input.value;
  }

  set disabled(disabled: boolean) {
    this._input.disabled = disabled;
  }

  get disabled() {
    return this._input.disabled;
  }

  set invalid(invalid: boolean) {
    this._input.invalid = invalid;
  }

  get invalid() {
    return this._input.invalid;
  }
}

export class GuiInputLabelled extends HTMLElement {
  private _input = new factory.LabelledInput(
    '1',
    'default', 
    greycat.default.abi.types[greycat.default.abi.core_string_offset],
    false,
    (value) => this.dispatchEvent(new CustomEvent('input', { detail: value })),
  );

  connectedCallback() {
    this.replaceChildren(this._input.element);
  }

  disconnectedCallback() {
    this.replaceChildren();
  }

  get name() {
    return this._input.name;
  }

  set name(name: string) {
    this._input.name = name;
  }

  set value(value: unknown) {
    this._input.value = value;
  }

  get value() {
    return this._input.value;
  }

  get type() {
    return this._input.type;
  }

  set type(type: AbiType) {
    this._input.type = type;
  }

  get nullable() {
    return this._input.nullable;
  }

  set nullable(nullable: boolean) {
    this._input.nullable = nullable;
  }

  set disabled(disabled: boolean) {
    this._input.disabled = disabled;
  }

  get disabled() {
    return this._input.disabled;
  }

  set invalid(invalid: boolean) {
    this._input.invalid = invalid;
  }

  get invalid() {
    return this._input.invalid;
  }
}

export class GuiInputInstance extends HTMLElement {
  private _input = new factory.InstanceInput(
    'default',
    'default',
    (value) => this.dispatchEvent(new CustomEvent('input', { detail: value })),
  );

  connectedCallback() {
    this.replaceChildren(this._input.element);
  }

  disconnectedCallback() {
    this.replaceChildren();
  }

  set name(name: string) {
    this._input.name = name;
  }

  get name() {
    return this._input.name;
  }

  set value(value: unknown) {
    this._input.value = value;
  }

  get value() {
    return this._input.value;
  }

  set disabled(disabled: boolean) {
    this._input.disabled = disabled;
  }

  get disabled() {
    return this._input.disabled;
  }

  set invalid(invalid: boolean) {
    this._input.invalid = invalid;
  }

  get invalid() {
    return this._input.invalid;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gui-input-string': GuiInputString;
    'gui-input-char': GuiInputChar;
    'gui-input-int': GuiInputInt;
    'gui-input-float': GuiInputFloat;
    'gui-input-bool': GuiInputBool;
    'gui-input-time': GuiInputTime;
    'gui-input-fn': GuiInputFn;
    'gui-input-duration': GuiInputDuration;
    'gui-input-node': GuiInputNode;
    'gui-input-nodetime': GuiInputNodeTime;
    'gui-input-nodegeo': GuiInputNodeGeo;
    'gui-input-nodelist': GuiInputNodeList;
    'gui-input-nodeindex': GuiInputNodeIndex;
    'gui-input-unknown': GuiInputUnknown;
    'gui-input-object': GuiInputObject;
    'gui-input-fncall': GuiInputFnCall;
    'gui-input-enum': GuiInputEnum;
    'gui-input-array': GuiInputArray;
    'gui-input-any': GuiInputAny;
    'gui-input-nullable': GuiInputNullable;
    'gui-input': GuiInput;
    'gui-input-typed': GuiInputTyped;
    'gui-input-labelled': GuiInputLabelled;
    'gui-input-instance': GuiInputInstance;
  }

  namespace JSX {
    interface IntrinsicElements {
      'gui-input-string': GreyCat.Element<GuiInputString>;
      'gui-input-char': GreyCat.Element<GuiInputChar>;
      'gui-input-int': GreyCat.Element<GuiInputInt>;
      'gui-input-float': GreyCat.Element<GuiInputFloat>;
      'gui-input-bool': GreyCat.Element<GuiInputBool>;
      'gui-input-time': GreyCat.Element<GuiInputTime>;
      'gui-input-fn': GreyCat.Element<GuiInputFn>;
      'gui-input-duration': GreyCat.Element<GuiInputDuration>;
      'gui-input-node': GreyCat.Element<GuiInputNode>;
      'gui-input-nodetime': GreyCat.Element<GuiInputNodeTime>;
      'gui-input-nodegeo': GreyCat.Element<GuiInputNodeGeo>;
      'gui-input-nodelist': GreyCat.Element<GuiInputNodeList>;
      'gui-input-nodeindex': GreyCat.Element<GuiInputNodeIndex>;
      'gui-input-unknown': GreyCat.Element<GuiInputUnknown>;
      'gui-input-object': GreyCat.Element<GuiInputObject>;
      'gui-input-fncall': GreyCat.Element<GuiInputFnCall>;
      'gui-input-enum': GreyCat.Element<GuiInputEnum>;
      'gui-input-array': GreyCat.Element<GuiInputArray>;
      'gui-input-any': GreyCat.Element<GuiInputAny>;
      'gui-input-nullable': GreyCat.Element<GuiInputNullable>;
      'gui-input': GreyCat.Element<GuiInput>;
      'gui-input-typed': GreyCat.Element<GuiInputTyped>;
      'gui-input-labelled': GreyCat.Element<GuiInputLabelled>;
      'gui-input-instance': GreyCat.Element<GuiInputInstance>;
    }
  }
}

customElements.define('gui-input-string', GuiInputString);
customElements.define('gui-input-char', GuiInputChar);
customElements.define('gui-input-int', GuiInputInt);
customElements.define('gui-input-float', GuiInputFloat);
customElements.define('gui-input-bool', GuiInputBool);
customElements.define('gui-input-time', GuiInputTime);
customElements.define('gui-input-fn', GuiInputFn);
customElements.define('gui-input-duration', GuiInputDuration);
customElements.define('gui-input-node', GuiInputNode);
customElements.define('gui-input-nodetime', GuiInputNodeTime);
customElements.define('gui-input-nodegeo', GuiInputNodeGeo);
customElements.define('gui-input-nodelist', GuiInputNodeList);
customElements.define('gui-input-nodeindex', GuiInputNodeIndex);
customElements.define('gui-input-unknown', GuiInputUnknown);
customElements.define('gui-input-object', GuiInputObject);
customElements.define('gui-input-fncall', GuiInputFnCall);
customElements.define('gui-input-enum', GuiInputEnum);
customElements.define('gui-input-array', GuiInputArray);
customElements.define('gui-input-any', GuiInputAny);
customElements.define('gui-input-nullable', GuiInputNullable);
customElements.define('gui-input', GuiInput);
customElements.define('gui-input-typed', GuiInputTyped);
customElements.define('gui-input-labelled', GuiInputLabelled);
customElements.define('gui-input-instance', GuiInputInstance);
