import { $, core, GeoMap, GreyCat, IndexedDbCache } from '@greycat/web';
import '@/common';

await GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
});

const table = (await $.default.call('project::geo_table')) as core.Table;
const map = (
  <gui-geomap
    value={table}
    layers={[
      {
        id: 'layer',
        type: 'circle',
        source: 'main',
        paint: {
          'circle-color': [
            'interpolate',
            ['linear'],
            ['get', 'column_1'],
            -30,
            '#e2714b',
            30,
            '#eee695',
          ],
        },
      },
    ]}
  />
) as GeoMap;

document.body.appendChild(<app-layout title="Hello">{map}</app-layout>);
