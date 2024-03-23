import { GreyCat, IndexedDbCache, type core } from '@greycat/web';
import '@/common';

greycat.default = await GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
});

const table = await greycat.default.call<core.Table>('project::donut');

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
