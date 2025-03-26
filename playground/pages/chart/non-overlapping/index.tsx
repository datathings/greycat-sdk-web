import '@greycat/web';
import { inferConfig } from '@greycat/web';
import '~/common';

const greycat = await gc.sdk.init();

const root = await greycat.root();
const n1 = root['project::non_overlapping_1'] as gc.core.nodeTime<number>;
const n2 = root['project::non_overlapping_2'] as gc.core.nodeTime<number>;
const n3 = root['project::non_overlapping_3'] as gc.core.nodeTime<number>;

const table = await gc.core.nodeTime.sample(
  [n1, n2, n3],
  null,
  null,
  1000,
  gc.core.SamplingMode.adaptative,
  null,
  null,
);
const config = inferConfig(table);

console.log({ table, config });

console.log('adaptative', await gc.core.nodeTime.sample(
  [n1, n2, n3],
  null,
  null,
  1000,
  gc.core.SamplingMode.adaptative,
  null,
  null,
));
console.log('dense', await gc.core.nodeTime.sample(
  [n1, n2, n3],
  null,
  null,
  1000,
  gc.core.SamplingMode.dense,
  null,
  null,
));
console.log('fixed', await gc.core.nodeTime.sample(
  [n1, n2, n3],
  null,
  null,
  1000,
  gc.core.SamplingMode.fixed,
  null,
  null,
));
console.log('fixed_reg', await gc.core.nodeTime.sample(
  [n1, n2, n3],
  null,
  null,
  1000,
  gc.core.SamplingMode.fixed_reg,
  null,
  null,
));

document.body.appendChild(
  <app-layout title="Chart (non overlapping)" mainStyle={{ display: 'grid' }}>
    <gui-tabs>
      <gui-tab slot="tab">Table</gui-tab>
      <gui-tab slot="tab" active>
        Chart
      </gui-tab>

      <gui-panel slot="panel" tab="Table">
        <gui-table value={table} />
      </gui-panel>
      <gui-panel slot="panel" tab="Chart">
        <gui-chart value={table} config={config} />
      </gui-panel>
    </gui-tabs>
  </app-layout>,
);
