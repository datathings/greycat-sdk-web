/**
 * Custom component for options with checkboxes in 2 columns.
 */
export class GuiMultiSelectCheckbox extends HTMLElement {
  private _checkboxes: HTMLLabelElement[] = [];

  constructor() {
    super();

    this.onItemClick = this.onItemClick.bind(this);
  }

  connectedCallback() {
    this.addEventListener('click', this.onItemClick);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.onItemClick);
    this.replaceChildren(); // cleanup
  }

  onItemClick(event: MouseEvent) {
    const label = this._checkboxes.find((el) => event.target === el);
    if (label) {
      // safety: the first element appended to `label` is the `input` element (see l.38)
      const cb = label.children[0] as HTMLInputElement;
      cb.checked = !cb.checked;
    }
  }

  set selected(values: Array<string>) {
    for (let i = 0; i < this._checkboxes.length; i++) {
      // safety: the first element appended to `label` is the `input` element (see l.38)
      const cb = this._checkboxes[i].children[0] as HTMLInputElement;
      cb.checked = values.includes(cb.value);
    }
  }

  set options(options: string[]) {
    // reset checkboxes
    this._checkboxes.length = 0;

    if (options.length === 0) {
      // no available options
      this.replaceChildren(
        <small>
          <i>No option</i>
        </small>,
      );
      return;
    }

    // sort options
    options.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

    for (let i = 0; i < options.length; i++) {
      const option = options[i];
      const name = `option-${i}`;

      const label = document.createElement('label');
      label.htmlFor = name;

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.value = option;
      checkbox.name = name;

      label.appendChild(checkbox);
      label.appendChild(document.createTextNode(option));

      this._checkboxes.push(label);
    }

    this.replaceChildren(...this._checkboxes);
  }

  get selected() {
    const selected = [];
    for (let i = 0; i < this._checkboxes.length; i++) {
      // safety: the first element appended to `label` is the `input` element (see l.38)
      const cb = this._checkboxes[i].children[0] as HTMLInputElement;
      if (cb.checked) {
        selected.push(cb.value);
      }
    }
    return selected;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gui-multi-select-checkbox': GuiMultiSelectCheckbox;
  }

  namespace JSX {
    interface IntrinsicElements {
      /**
       * Please, don't use this in a React context. Use `WCWrapper`.
       */
      'gui-multi-select-checkbox': Partial<Omit<GuiMultiSelectCheckbox, 'children'>>;
    }
  }
}

if (!globalThis.customElements.get('gui-multi-select-checkbox')) {
  globalThis.customElements.define('gui-multi-select-checkbox', GuiMultiSelectCheckbox);
}
