import '@greycat/web';
import '~/common';

await gc.sdk.init({ debug: true });

const filter = new gc.object.Filter(42);

document.body.appendChild(
  <app-layout title="Inputs (object)">
    <gui-input-object value={filter}>
      <gui-select slot="b" nullable />
    </gui-input-object>
  </app-layout>,
);
