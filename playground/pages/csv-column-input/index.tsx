import { GreyCat } from '@greycat/sdk/web';
import '@/common';

await GreyCat.init();

document.body.appendChild(
  <app-layout title="CSV Column Input">
    <gui-input-abstract type="io::CsvColumn" />
  </app-layout>,
);
