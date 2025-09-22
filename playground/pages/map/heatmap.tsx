import '@greycat/web';
import '~/common';
import maplibregl from 'maplibre-gl';

// Example inspired from: https://maplibre.org/maplibre-gl-js/docs/examples/create-a-heatmap-layer/
// Using data from: https://earthquake.usgs.gov/earthquakes/feed/v1.0/csv.php

await gc.sdk.init({ maplibregl });

// Fetch data from GreyCat
const earthquakes = await gc.heatmap.earthquakes();
// Convert the array to a GeoJSON.FeatureCollection
const geojson = earthquakes.toFeatureCollection((e) => ({
  type: 'Point',
  coordinates: [e.location.lat, e.location.lng],
}));

document.body.appendChild(
  <app-layout title="Map" mainStyle={{ display: 'grid' }}>
    <gui-map
      options={{
        style: 'https://demotiles.maplibre.org/style.json',
        center: [-120, 50],
        zoom: 2,
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
            'circle-stroke-color': 'white',
            'circle-stroke-width': 1,
            // Transition from heatmap to circle layer by zoom level
            'circle-opacity': ['interpolate', ['linear'], ['zoom'], 7, 0, 8, 1],
          },
        }}
      />
    </gui-map>
  </app-layout>,
);
