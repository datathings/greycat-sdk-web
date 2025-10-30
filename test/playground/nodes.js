// @ts-check
import '@greycat/web/sdk';
import assert from 'assert';

const greycat = await gc.sdk.init();

{
  const n = await gc.project.get_node();
  const v = await n.resolve();
  assert.strictEqual(v, 'Hello, world!');
}

{
  const n = await gc.project.get_node_time();
  const v = await n.sample(null, null, 100, gc.core.SamplingMode.dense, null, null);
  assert.deepStrictEqual(
    v,
    gc.core.Table.fromRows([
      [gc.core.time.fromDate(new Date('2024-01-01T00:00:00Z')), 'first day'],
      [gc.core.time.fromDate(new Date('2024-01-02T00:00:00Z')), 'second day'],
    ]),
  );
}

{
  const n = await gc.project.get_node_list();
  const v = await n.sample(null, null, 100, gc.core.SamplingMode.dense, null);
  assert.deepStrictEqual(
    v,
    gc.core.Table.fromRows([
      [0, 'first'],
      [1, 'second'],
      [2, 'third'],
    ]),
  );
}

{
  const n = await gc.project.get_node_index();
  const v = await n.sample(null, 100, gc.core.SamplingMode.dense);
  assert.deepStrictEqual(
    v,
    gc.core.Table.fromRows([
      ['sensor-0', 14.3],
      ['sensor-1', 28.36],
      ['sensor-2', 5.1],
    ]),
  );
}

{
  const n = await gc.project.get_node_geo();
  const v = await n.sample(null, null, 100, gc.core.SamplingMode.dense);
  assert.deepStrictEqual(
    v,
    gc.core.Table.fromRows([
      [gc.core.geo.fromLatLng(1.2, 1.3), 'second'],
      [gc.core.geo.fromLatLng(1, 2), 'first'],
    ]),
  );
}
