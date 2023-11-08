import { StringInput, CharInput, IntInput, FloatInput, BoolInput, DurationInput, FnInput, NodeGeoInput, NodeInput, NodeTimeInput, TimeInput } from './input-factory.js';
import { core } from '@greycat/sdk';

export class GuiInputString extends HTMLElement {
  private _input = new StringInput('default', (value) =>
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
  private _input = new CharInput('default', (value) =>
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
  private _input = new IntInput('default', (value) =>
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
  private _input = new FloatInput('default', (value) =>
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
  private _input = new BoolInput('default', (value) =>
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
  private _input = new TimeInput('default', (value) =>
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
  private _input = new FnInput('default', (value) =>
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
  private _input = new DurationInput('default', (value) =>
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
  private _input = new NodeInput('default', (value) =>
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
  private _input = new NodeTimeInput('default', (value) =>
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
  private _input = new NodeGeoInput('default', (value) =>
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
