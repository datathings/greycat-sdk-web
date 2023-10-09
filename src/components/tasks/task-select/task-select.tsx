import { AbiFunction, GreyCat } from '@greycat/sdk';

export class GuiTaskSelect extends HTMLElement {
  private _greycat = greycat.default;
  private _select = document.createElement('select');
  private _selected: AbiFunction | null = null;

  constructor() {
    super();

    this._select.addEventListener('change', (ev) => {
      this._selected =
        this._greycat.abi.fn_by_fqn.get((ev.target as HTMLOptionElement).value) ?? null;
    });
  }

  connectedCallback() {
    this.appendChild(this._select);
    this.update();
  }

  disconnectedCallback() {
    this.replaceChildren();
  }

  update() {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < this._greycat.abi.functions.length; i++) {
      const fn = this._greycat.abi.functions[i];
      if (fn.is_task) {
        const option = document.createElement('option');
        option.value = fn.fqn;
        option.textContent = fn.fqn;
        fragment.appendChild(option);
      }
    }
    this._select.replaceChildren(fragment);
    this._select.prepend(<option selected>Select a task</option>);
  }

  set selected(fn: AbiFunction | null) {
    if (fn === null) {
      for (let i = 0; i < this._select.children.length; i++) {
        const option = this._select.children[i] as HTMLOptionElement;
        option.selected = false;
      }
      this._selected = null;
      return;
    }

    for (let i = 0; i < this._select.children.length; i++) {
      const option = this._select.children[i] as HTMLOptionElement;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (option.value === fn.fqn) {
        option.selected = true;
        this._selected = fn;
      } else {
        option.selected = false;
      }
    }
  }

  get selected() {
    return this._selected;
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

  namespace JSX {
    interface IntrinsicElements {
      'gui-task-select': GreyCat.Element<GuiTaskSelect>;
    }
  }
}

if (!customElements.get('gui-task-select')) {
  customElements.define('gui-task-select', GuiTaskSelect);
}
