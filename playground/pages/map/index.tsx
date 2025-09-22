import '@greycat/web';
import '~/common';
import maplibregl from 'maplibre-gl';
import { GeoData, GuiMap } from '@greycat/web';

const greycat = await gc.sdk.init({ maplibregl });

const markers = document.createElement('gui-map-markers');

document.body.appendChild(
  <app-layout title="Map" mainStyle={{ display: 'grid' }}>
    <gui-map
      $ref={init}
      options={{
        style: 'https://demotiles.maplibre.org/style.json',
        center: gc.core.geo.fromLatLng(49.6181, 6.162),
        zoom: 5,
      }}
    >
      {markers}
    </gui-map>
  </app-layout>,
);

async function updateCities(m: maplibregl.Map, nCities: gc.core.nodeGeo) {
  const bounds = m.getBounds();
  const tCities = await gc.core.nodeGeo.sample(
    [nCities],
    gc.core.geo.fromLatLng(bounds.getSouthWest()),
    gc.core.geo.fromLatLng(bounds.getNorthEast()),
    1000,
    gc.core.SamplingMode.dense,
  );
  console.log(tCities);
  const cities: GeoData<gc.City>[] = [];
  for (const row of tCities) {
    cities.push({ geo: row[0], data: row[1] });
  }
  markers.value = cities;
}

async function init(map: GuiMap) {
  const m = await map.ready;
  const root = await greycat.root();
  const nCities = root['cities::cities'] as gc.core.nodeGeo;

  m.on('zoomend', () => updateCities(m, nCities));
  m.on('dragend', () => updateCities(m, nCities));

  updateCities(m, nCities);
}
