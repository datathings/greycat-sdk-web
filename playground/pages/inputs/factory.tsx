import {
  findParentInputElement,
  GreyCat,
  GuiInputFactory,
  GuiSearchableSelect,
} from '@greycat/web';
import '@/common';

const greycat = await GreyCat.init();

class TxIdSelect extends GuiSearchableSelect {
  private _onChange = async () => {
    const objInput = findParentInputElement(this);
    const value = objInput.value;
    const values = await greycat.call<Array<string>>('factory::values', [value.type]);
    if (values.indexOf(this.value) === -1) {
      this.value = undefined;
    }
    this.options = values.map((value) => ({ text: value }));
  };

  override connectedCallback(): void {
    super.connectedCallback();
    const parentInput = findParentInputElement(this);
    parentInput.addEventListener('gui-change', this._onChange);
  }
}

customElements.define('tx-id-select', TxIdSelect);

GuiInputFactory.global.set('factory::TxFormData::id', 'tx-id-select');

document.body.appendChild(
  <app-layout title="Input (factory)">
    <gui-input-object
      type="factory::TxFormData"
      ongui-change={function () {
        console.log('form update', { ...this.value });
      }}
    >
      <tx-id-select className="this-is-a-slot" slot="id" />
    </gui-input-object>
  </app-layout>,
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
