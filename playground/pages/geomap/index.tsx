import { $, core, GreyCat, IndexedDbCache } from '@greycat/web';
import '@/common';

await GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
});

const table = (await $.default.call('project::geo_table')) as core.Table;

document.body.appendChild(
  <app-layout title="Hello">
    <gui-geo-map
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
  </app-layout>,
);
