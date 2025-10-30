import '@greycat/web/sdk';
import { readBytes } from './_utils.js';

const g = await gc.sdk.init();

console.log({
  sdk: new Uint8Array(
    g.serializeWithHeaders([
      gc.core.geo.fromLatLng(1, 2),
      gc.core.geo.fromLatLng(1.5, 2.01),
      gc.core.geo.fromLatLng(1, 2),
    ]),
  ),
  core: new Uint8Array(readBytes('project::geos.bin')),
});

// console.log(
//   'geos',
//   JSON.parse(JSON.stringify(g.deserializeWithHeader(readBytes('project::geos.bin')))),
// );
