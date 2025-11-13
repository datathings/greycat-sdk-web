import '@greycat/web';
import '~/common';

await gc.sdk.init({ debug: true });

const table = await gc.project.donut();

document.body.appendChild(
  <app-layout title="Donut">
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
    />
  </app-layout>,
);
