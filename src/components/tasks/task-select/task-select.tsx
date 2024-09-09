import { AbiFunction, GreyCat } from '@greycat/sdk';

export class GuiTaskSelect extends HTMLElement {
  private _greycat = greycat.default;
  private _select = document.createElement('gui-searchable-select');

  constructor() {
    super();

    this._select.placeholder = 'Select a task';
  }

  connectedCallback() {
    this.appendChild(this._select);
    this.update();
  }

  disconnectedCallback() {
    this.replaceChildren();
  }

  update() {
    const options = [];
    for (let i = 0; i < this._greycat.abi.functions.length; i++) {
      const fn = this._greycat.abi.functions[i];
      if (fn.is_task) {
        options.push({ text: fn.fqn, value: fn.fqn });
      }
    }
    this._select.options = options;
  }

  /**
   * @deprecated use `value` instead
   */
  set selected(fn: AbiFunction | null) {
    this.value = fn;
  }

  set value(value: AbiFunction | null) {
    if (value === null) {
      this._select.value = undefined;
      return;
    }

    this._select.value = value.fqn;
  }

  /**
   * @deprecated use `value` instead
   */
  get selected() {
    return this.value;
  }

  get value() {
    const fqn = this._select.value as string | undefined;
    if (fqn) {
      return this._greycat.abi.fn_by_fqn.get(fqn) ?? null;
    }
    return null;
  }

  set greycat(greycat: GreyCat) {
    this._greycat = greycat;
    this.update();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gui-task-select': GuiTaskSelect;
  }

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        'gui-task-select': GreyCat.Element<GuiTaskSelect>;
      }
    }
  }
}

if (!customElements.get('gui-task-select')) {
  customElements.define('gui-task-select', GuiTaskSelect);
}
