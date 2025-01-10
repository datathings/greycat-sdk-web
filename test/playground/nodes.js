// @ts-check
import { core, GreyCat } from '@greycat/web/sdk';
import assert from 'assert';

const greycat = await GreyCat.init();

{
  /** @type {import('@greycat/web/sdk').core.node<string>} */
  const n = await greycat.call('project::get_node');
  const v = await n.resolve();
  assert.strictEqual(v, 'Hello, world!');
}

{
  /** @type {import('@greycat/web/sdk').core.nodeTime<string>} */
  const n = await greycat.call('project::get_node_time');
  const v = await n.sample(null, null, 100, core.SamplingMode.dense(), null, null);
  assert.deepStrictEqual(
    v,
    core.Table.fromRows([
      [core.time.fromDate(new Date('2024-01-01T00:00:00Z')), 'first day'],
      [core.time.fromDate(new Date('2024-01-02T00:00:00Z')), 'second day'],
    ]),
  );
}

{
  /** @type {import('@greycat/web/sdk').core.nodeList<string>} */
  const n = await greycat.call('project::get_node_list');
  const v = await n.sample(null, null, 100, core.SamplingMode.dense(), null);
  assert.deepStrictEqual(
    v,
    core.Table.fromRows([
      [0, 'first'],
      [1, 'second'],
      [2, 'third'],
    ]),
  );
}

{
  /** @type {import('@greycat/web/sdk').core.nodeIndex<string, number>} */
  const n = await greycat.call('project::get_node_index');
  const v = await n.sample(null, 100, core.SamplingMode.dense());
  assert.deepStrictEqual(
    v,
    core.Table.fromRows([
      ['sensor-0', 14.3],
      ['sensor-1', 28.36],
      ['sensor-2', 5.1],
    ]),
  );
}

{
  /** @type {import('@greycat/web/sdk').core.nodeGeo<string>} */
  const n = await greycat.call('project::get_node_geo');
  const v = await n.sample(null, null, 100, core.SamplingMode.dense());
  assert.deepStrictEqual(
    v,
    core.Table.fromRows([
      [core.geo.fromLatLng(1.2, 1.3), 'second'],
      [core.geo.fromLatLng(1, 2), 'first'],
    ]),
  );
}
