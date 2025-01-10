// @ts-check
import { GreyCat, core } from '@greycat/web/sdk';
import { readBytes } from './_utils.js';

const g = await GreyCat.init();

console.log({
  sdk: new Uint8Array(
    g.serializeWithHeaders([
      core.geo.fromLatLng(1, 2),
      core.geo.fromLatLng(1.5, 2.01),
      core.geo.fromLatLng(1, 2),
    ]),
  ),
  core: new Uint8Array(readBytes('project::geos.bin')),
});

// console.log(
//   'geos',
//   JSON.parse(JSON.stringify(g.deserializeWithHeader(readBytes('project::geos.bin')))),
// );

