import { GreyCat, GuiInput } from '@greycat/web';
import '@/common';

await GreyCat.init();

const input = (<gui-input type="io::CsvColumn" ongui-change={dump} />) as GuiInput;

function dump() {
  console.log('value', input.value);
}

document.body.appendChild(
  <app-layout title="CSV Column Input">
    <div>
      {input}
      <sl-button onclick={dump}>Dump</sl-button>
    </div>
  </app-layout>,
);
