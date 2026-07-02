import type * as sl from '@shoelace-style/shoelace';
import { appLayout } from '~/common';
import './index.css';

await gc.sdk.init({ debug: true });

// async function getTable() {
//   const nt = core.nodeTime.create(41943357n);
//   const table = await nt.sample(null, null, 1000, core.SamplingMode.adaptative(), null, null);
//   return table;
// }

// const value = await getTable();

// const table = (
//   <gui-table
//     value={value}
//     ongui-change={() => {
//       chart.setAttrs({ value: table.table, config: inferConfig(table.table) });
//     }}
//   />
// ) as GuiTable;
// const chart = (<gui-chart value={value} config={inferConfig(value)} />) as GuiChart;

export class AppInputs extends HTMLElement {
  private _elements: sl.SlInput[] = [];

  constructor() {
    super();

    for (let i = 0; i < 100; i++) {
      this._elements.push((<sl-input value={`${i}`} />) as sl.SlInput);
    }
  }

  connectedCallback() {
    this.replaceChildren(...this._elements);
  }
}

export class AppSelects extends HTMLElement {
  private _elements: sl.SlSelect[] = [];

  constructor() {
    super();

    for (let i = 0; i < 1; i++) {
      this._elements.push(
        (
          <sl-select hoist value={`${i}`}>
            <sl-option value="a">a</sl-option>
            <sl-option value="b">b</sl-option>
            <sl-option value="c">c</sl-option>
            <sl-option value="d">d</sl-option>
          </sl-select>
        ) as sl.SlSelect,
      );
    }
  }

  connectedCallback() {
    this.replaceChildren(...this._elements);
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'app-inputs': AppInputs;
    'app-selects': AppSelects;
  }

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        'app-inputs': GreyCat.Element<AppInputs>;
        'app-selects': GreyCat.Element<AppSelects>;
      }
    }
  }
}

customElements.define('app-selects', AppSelects);
customElements.define('app-inputs', AppInputs);

document.body.appendChild(
  appLayout({ title: 'Tabs', mainStyle: { display: 'grid' } },
    <gui-tabs>
      <gui-tab slot="tab" active>
        simple
      </gui-tab>
      <gui-tab slot="tab">inputs</gui-tab>
      <gui-tab slot="tab">selects</gui-tab>

      <gui-panel slot="panel" tab="simple">
        simple
      </gui-panel>
      <gui-panel slot="panel" tab="inputs">
        <app-inputs />
      </gui-panel>
      <gui-panel slot="panel" tab="selects">
        <app-selects />
      </gui-panel>
    </gui-tabs>,
  ),
);
