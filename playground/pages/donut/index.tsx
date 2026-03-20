import '@greycat/web';
import { appLayout } from '~/common';

await gc.sdk.init({ debug: true });

const table = await gc.project.donut();

document.body.appendChild(
  appLayout('Donut',
    <gui-donut
      value={table}
      dataColumn={1}
      labelColumn={0}
      withInfo
      withLabelInfo
      withLabels
      style={{
        maxWidth: '1024px',
        maxHeight: '768px',
        margin: 'auto',
      }}
    />,
  ),
);
