import '@greycat/web';
import { appLayout } from '~/common';

await gc.sdk.init({ debug: true });

const filter = new gc.object.Filter(42);

document.body.appendChild(
  appLayout('Inputs (object)',
    <gui-input-object value={filter}>
      <gui-select slot="b" nullable />
    </gui-input-object>,
  ),
);
