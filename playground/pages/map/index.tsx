import '@greycat/web';
import '@/common';
import 'maplibre-gl/dist/maplibre-gl.css';

const greycat = await gc.sdk.init();

const root = await greycat.root();
const geo_index = root['cities::cities'] as gc.core.nodeGeo;

document.body.appendChild(
  <app-layout title="Map" mainStyle={{ display: 'grid' }}>
    <gui-map
      value={geo_index}
      options={{
        style: 'https://demotiles.maplibre.org/style.json',
        center: gc.core.geo.fromLatLng(49.6181, 6.162),
        zoom: 7,
      }}
    >
      {/* <gui-map-nodegeo value={geo_index} /> */}
    </gui-map>
  </app-layout>,
);
