export interface EarthquakeFeature {
  id: string;
  properties: {
    mag: number | null;
    place: string | null;
    time: number | null;
    url?: string | null;
    [key: string]: any;
  };
  geometry: {
    coordinates: [number, number, number]; // [lng, lat, depth]
  };
}
