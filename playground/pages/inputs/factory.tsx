import { findParentInputElement, GuiChangeEvent, GuiInputObject, GuiSelect } from '@greycat/web';
import { appLayout } from '~/common';

const greycat = await gc.sdk.init({ debug: true });

class TxIdSelect extends GuiSelect {
  private _onChange = async (ev: GuiChangeEvent) => {
    if (ev.target === this) {
      return;
    }
    const objInput = findParentInputElement(this);
    const value = objInput.value;
    try {
      const values = await greycat.call<Array<string>>('tx::TxFormData::values', [value.type]);
      if (values.indexOf(this.value) === -1) {
        this.value = undefined;
        this.dispatchEvent(new GuiChangeEvent(this.value));
      }
      this.options = values.map((value) => ({ value })).sort((a, b) => a.value.localeCompare(b.value));
    } catch {
      this.value = undefined;
      this.options = [];
      this.dispatchEvent(new GuiChangeEvent(this.value));
    }
  };

  override connectedCallback(): void {
    super.connectedCallback();
    const parentInput = findParentInputElement(this);
    parentInput.addEventListener('gui-change', this._onChange);
  }
}

customElements.define('tx-id-select', TxIdSelect);

const input = (<gui-input-object value={greycat.create('tx::TxFormData', [])} />) as GuiInputObject;

async function loadTx() {
  loadValue.value = await greycat.call('tx::TxFormData::load', [input.value]);
}

const loadValue = document.createElement('gui-object');
loadValue.value = '';
loadValue.header = true;

document.body.appendChild(
  appLayout('Input (factory)',
    <div className="row">
      <div className="list">
        {input}
        <sl-button onclick={loadTx}>Load</sl-button>
        {loadValue}
      </div>
    </div>,
  ),
);

declare global {
  interface HTMLElementTagNameMap {
    'tx-id-select': TxIdSelect;
  }

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        'tx-id-select': GreyCat.Element<TxIdSelect>;
      }
    }
  }
}
