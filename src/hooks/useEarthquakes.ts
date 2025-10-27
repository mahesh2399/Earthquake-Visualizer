import { useEffect, useState } from "react";
import type { EarthquakeFeature } from "../types/Earthquake";
import { fetchEarthquakes } from "../services/earthquakeService";

export function useEarthquakes() {
  const [earthquakes, setEarthquakes] = useState<EarthquakeFeature[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      const features = await fetchEarthquakes();
      setEarthquakes(features);
    } catch (err: any) {
      setError(err.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // optional: refresh every 5 minutes
    const id = setInterval(load, 5 * 60 * 1000);
    return () => clearInterval(id);
  }, []);

  return { earthquakes, loading, error, reload: load };
}
