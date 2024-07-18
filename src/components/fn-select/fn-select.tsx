import type { AbiFunction } from '../../exports.js';
import { SlSelect } from '@shoelace-style/shoelace';

/**
 * Provides a selector for the currently defined ABI functions.
 */
export class GuiFnSelect extends SlSelect {
  constructor() {
    super();

    this.placeholder = 'Select a function';
  }

  override connectedCallback(): void {
    super.connectedCallback();

    const groups: Map<string, AbiFunction[]> = new Map();
    for (let i = 0; i < greycat.default.abi.functions.length; i++) {
      const fn = greycat.default.abi.functions[i];
      const key = `${fn.lib}::${fn.module}`;
      let group = groups.get(key);
      if (!group) {
        group = [];
        groups.set(key, group);
      }
      group.push(fn);
    }

    console.log(groups);

    const headerClasses = ['px-1', 'text-muted'];
    const options = document.createDocumentFragment();
    groups.forEach((functions, name) => {
      options.appendChild(<h6 className={headerClasses}>{name}</h6>);
      for (let i = 0; i < functions.length; i++) {
        const fn = functions[i];
        if (fn.type) {
          options.appendChild(
            <sl-option value={fn.fqn}>
              {fn.type}::{fn.name}
            </sl-option>,
          );
        } else {
          options.appendChild(<sl-option value={fn.fqn}>{fn.name}</sl-option>);
        }
      }
      options.appendChild(<sl-divider />);
    });
    this.replaceChildren(options);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gui-fn-select': GuiFnSelect;
  }

  interface GuiFnSelectEventMap {}

  interface HTMLElementEventMap extends GuiFnSelectEventMap {}

  namespace JSX {
    interface IntrinsicElements {
      'gui-fn-select': GreyCat.Element<GuiFnSelect, GuiFnSelectEventMap>;
    }
  }
}

if (!customElements.get('gui-fn-select')) {
  customElements.define('gui-fn-select', GuiFnSelect);
}
