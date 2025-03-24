import '@greycat/web';
import '~/common';
import maplibregl from 'maplibre-gl';
import maplibreStyles from 'maplibre-gl/dist/maplibre-gl.css?inline';
import { GeoData, GuiMap } from '@greycat/web';

globalThis.maplibregl = maplibregl;

const greycat = await gc.sdk.init();

const markers = document.createElement('gui-map-markers');

const map = (
  <gui-map
    stylesheet={maplibreStyles}
    options={{
      style: 'https://demotiles.maplibre.org/style.json',
      center: gc.core.geo.fromLatLng(49.6181, 6.162),
      zoom: 5,
    }}
  >
    {/* <gui-map-source
      name="national-park"
      value={{
        type: 'geojson',
        data: 'https://www.data.gouv.fr/fr/datasets/r/bb4cda9a-9036-4458-9113-e05b923f0656',
      }}
    />
    <gui-map-source
      name="urban-areas"
      value={{
        type: 'geojson',
        data: 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_urban_areas.geojson',
      }}
    />
    <gui-map-layer
      value={{
        id: 'national-parks-layer',
        type: 'fill',
        source: 'national-park',
        layout: {},
        paint: {
          'fill-color': '#507',
          'fill-opacity': 1,
        },
      }}
    />
    <gui-map-layer
      value={{
        id: 'urban-areas-fill',
        type: 'fill',
        source: 'urban-areas',
        layout: {},
        paint: {
          'fill-color': '#f08',
          'fill-opacity': 0.4,
        },
      }}
    /> */}
    {markers}
  </gui-map>
) as GuiMap;

document.body.appendChild(
  <app-layout title="Map" mainStyle={{ display: 'grid' }}>
    {map}
  </app-layout>,
);

const root = await greycat.root();
const nCities = root['cities::cities'] as gc.core.nodeGeo;

const m = await map.ready;
m.on('zoomend', updateCities);
m.on('dragend', updateCities);

async function updateCities() {
  const bounds = m.getBounds();
  const tCities = await gc.core.nodeGeo.sample(
    [nCities],
    gc.core.geo.fromLatLng(bounds.getSouthWest()),
    gc.core.geo.fromLatLng(bounds.getNorthEast()),
    1000,
    gc.core.SamplingMode.dense,
  );
  const cities: GeoData<gc.City>[] = [];
  for (const row of tCities) {
    cities.push({ geo: row[0], data: row[1] });
  }
  markers.value = cities;
}

updateCities();