const BASE =
  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

export async function fetchEarthquakes(): Promise<any[]> {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error("Failed to fetch USGS data");
  const data = await res.json();
  return data.features || [];
}
