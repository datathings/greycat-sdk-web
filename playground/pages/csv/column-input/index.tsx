import '@greycat/web';
import '~/common';

await gc.sdk.init();

document.body.appendChild(
  <app-layout title="CSV Column Input">
    <gui-input-abstract type="io::CsvColumn" />
  </app-layout>,
);
