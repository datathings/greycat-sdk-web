import SlSelect from '@shoelace-style/shoelace/dist/components/select/select.js';
import { SlSelectEventMap } from '../../shoelace.js';
import { GuiElement } from '../element.js';
import { GuiChangeEvent } from '../events.js';

/**
 * Provides a selector for the currently defined ABI functions.
 */
export class GuiFnSelect extends SlSelect {
  static override styles = [SlSelect.styles as CSSStyleSheet, GuiElement.BASE_STYLE];

  constructor() {
    super();

    this.placeholder = 'Select a function';
    this.addEventListener('sl-change', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiChangeEvent(gc.$.default.findFn(this.value as string)));
    });
  }

  get fqn() {
    return this.value as string | undefined;
  }

  override connectedCallback(): void {
    super.connectedCallback();

    const groups: Map<string, gc.sdk.AbiFunction[]> = new Map();
    for (let i = 0; i < gc.$.default.abi.functions.length; i++) {
      const fn = gc.$.default.abi.functions[i];
      const key = `${fn.lib}::${fn.module}`;
      let group = groups.get(key);
      if (!group) {
        group = [];
        groups.set(key, group);
      }
      group.push(fn);
    }

    const headerStyle: Partial<CSSStyleDeclaration> = {
      color: 'var(--text-muted)',
      fontSize: '14px',
      padding: 'var(--spacing)',
    };
    const options = document.createDocumentFragment();
    groups.forEach((functions, name) => {
      options.appendChild(<div style={headerStyle}>{name}</div>);
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
    /** @see {@link GuiFnSelect} */
    'gui-fn-select': GuiFnSelect;
  }

  interface GuiFnSelectEventMap extends Omit<SlSelectEventMap, 'sl-change'> {
    [GuiChangeEvent.NAME]: GuiChangeEvent<gc.sdk.AbiFunction>;
  }

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        /** @see {@link GuiFnSelect} */
        'gui-fn-select': GreyCat.Element<GuiFnSelect, GuiFnSelectEventMap>;
      }
    }
  }
}
