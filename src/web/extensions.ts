declare global {
  interface Array<T> {
    /**
     * Converts an array of objects into a GeoJSON FeatureCollection.
     * Each object in the array becomes a GeoJSON Feature, with the object's
     * data serving as the Feature's `properties`.
     *
     * @param geometryMapper A function that receives an item from the array
     * and returns a GeoJSON Geometry object (e.g., a Point, Polygon, etc.).
     * This function is responsible for creating the geometry for each feature.
     *
     * @returns A GeoJSON FeatureCollection containing all the converted features.
     *
     * @example
     * // Example with a Point geometry
     * const cities = [
     *   { name: 'Paris', lat: 48.8566, lon: 2.3522 },
     *   { name: 'London', lat: 51.5074, lon: -0.1278 }
     * ];
     *
     * const geoJsonCities = cities.toFeatureCollection(item => ({
     *   type: 'Point',
     *   coordinates: [item.lon, item.lat]
     * }));
     * // Result will be a GeoJSON FeatureCollection of points
     */
    toFeatureCollection<G extends GeoJSON.Geometry>(
      geometryMapper: (item: T) => G,
    ): GeoJSON.FeatureCollection<G, T>;
  }
}

if (!Array.prototype.toFeatureCollection) {
  Array.prototype.toFeatureCollection = function <T, G extends GeoJSON.Geometry>(
    this: T[],
    geometryMapper: (item: T) => G,
  ): GeoJSON.FeatureCollection<G, T> {
    return {
      type: 'FeatureCollection',
      features: this.map((item: T) => {
        return {
          type: 'Feature',
          properties: item,
          geometry: geometryMapper(item),
        };
      }),
    };
  };
}

export function toFeatureCollection<T, G extends GeoJSON.Geometry>(
  array: T[],
  geometryMapper: (item: T) => G,
): GeoJSON.FeatureCollection<G, T> {
  return array.toFeatureCollection(geometryMapper);
}

export {};
