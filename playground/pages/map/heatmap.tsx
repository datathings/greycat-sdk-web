import '@greycat/web';
import { appLayout } from '~/common';
import maplibregl from 'maplibre-gl';
import { GuiObject, sl } from '@greycat/web';

// Example inspired from: https://maplibre.org/maplibre-gl-js/docs/examples/create-a-heatmap-layer/
// Using data from: https://earthquake.usgs.gov/earthquakes/feed/v1.0/csv.php

await gc.sdk.init({ debug: true, maplibregl });

// Fetch data from GreyCat
const earthquakes = await gc.heatmap.major_earthquakes();
// Convert the array to a GeoJSON.FeatureCollection
const geojson = earthquakes.toFeatureCollection((e) => ({
  type: 'Point',
  coordinates: [e.location.lat, e.location.lng],
}));

let hoveredId: number | undefined;
let hoveredDisplay: GuiObject | undefined;
let drawer: sl.SlDrawer | undefined;

document.body.appendChild(
  appLayout({ title: 'Map', mainStyle: { display: 'grid', position: 'relative' } },
    <gui-map
      options={{
        style: {
          version: 8,
          sources: {
            osm: {
              type: 'raster',
              tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'],
              tileSize: 256,
              attribution: '&copy; OpenStreetMap Contributors',
              maxzoom: 19,
            },
          },
          layers: [
            {
              id: 'osm',
              type: 'raster',
              source: 'osm',
            },
          ],
        },
        center: [-120, 50],
        zoom: 2,
      }}
      $ref={async (map) => {
        const m = await map.ready;
        m.on('mouseenter', 'earthquakes-point', (e) => {
          if (!e.features || e.features.length === 0) {
            return;
          }
          if (hoveredId) {
            m.setFeatureState({ source: 'earthquakes', id: hoveredId }, { hover: false });
          }
          hoveredId = e.features[0].id as number;
          m.setFeatureState({ source: 'earthquakes', id: hoveredId }, { hover: true });
          if (drawer && hoveredDisplay) {
            hoveredDisplay.value = earthquakes[hoveredId];
            drawer.show();
          }
        });
      }}
    >
      <gui-map-source
        name="earthquakes"
        value={{
          type: 'geojson',
          data: geojson,
        }}
      />
      <gui-map-layer
        value={{
          id: 'earthquakes-heat',
          type: 'heatmap',
          source: 'earthquakes',
          maxzoom: 9,
          paint: {
            // Increase the heatmap weight based on frequency and property magnitude
            'heatmap-weight': ['interpolate', ['linear'], ['get', 'mag'], 0, 0, 6, 1],
            // Increase the heatmap color weight weight by zoom level
            // heatmap-intensity is a multiplier on top of heatmap-weight
            'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 0, 1, 9, 3],
            // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
            // Begin color ramp at 0-stop with a 0-transparency color
            // to create a blur-like effect.
            'heatmap-color': [
              'interpolate',
              ['linear'],
              ['heatmap-density'],
              0,
              'rgba(33,102,172,0)',
              0.2,
              'rgb(103,169,207)',
              0.4,
              'rgb(209,229,240)',
              0.6,
              'rgb(253,219,199)',
              0.8,
              'rgb(239,138,98)',
              1,
              'rgb(178,24,43)',
            ],
            // Adjust the heatmap radius by zoom level
            'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 0, 2, 9, 20],
            // Transition from heatmap to circle layer by zoom level
            'heatmap-opacity': ['interpolate', ['linear'], ['zoom'], 7, 1, 9, 0],
          },
        }}
      />
      <gui-map-layer
        value={{
          id: 'earthquakes-point',
          type: 'circle',
          source: 'earthquakes',
          minzoom: 7,
          paint: {
            // Size circle radius by earthquake magnitude and zoom level
            'circle-radius': [
              'interpolate',
              ['linear'],
              ['zoom'],
              7,
              ['interpolate', ['linear'], ['get', 'mag'], 1, 1, 6, 4],
              16,
              ['interpolate', ['linear'], ['get', 'mag'], 1, 5, 6, 50],
            ],
            // Color circle by earthquake magnitude
            'circle-color': [
              'interpolate',
              ['linear'],
              ['get', 'mag'],
              1,
              'rgba(33,102,172,0)',
              2,
              'rgb(103,169,207)',
              3,
              'rgb(209,229,240)',
              4,
              'rgb(253,219,199)',
              5,
              'rgb(239,138,98)',
              6,
              'rgb(178,24,43)',
            ],
            'circle-stroke-color': ['case', ['boolean', ['feature-state', 'hover'], false], 'rgb(192,248,95)', 'white'],
            'circle-stroke-width': ['case', ['boolean', ['feature-state', 'hover'], false], 3, 1],
            // Transition from heatmap to circle layer by zoom level
            'circle-opacity': ['interpolate', ['linear'], ['zoom'], 7, 0, 8, 1],
          },
        }}
      />
    </gui-map>,
    <sl-drawer
      $ref={(el) => (drawer = el)}
      label="Eartquake"
      contained
      placement="start"
      style={{ '--size': '400px', position: 'absolute' }}
    >
      <gui-object $ref={(el) => (hoveredDisplay = el)} value="Hover an earthquake to see its details" />
      <sl-button slot="footer" variant="primary" onclick={() => drawer?.hide()}>
        Close
      </sl-button>
    </sl-drawer>,
  ),
);
