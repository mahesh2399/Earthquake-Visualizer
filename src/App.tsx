import "./styles/global.css";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Filters from "./components/Filters";
import MapView from "./components/MapView";
import { useState, useEffect, useMemo } from "react";
import { useEarthquakes } from "./hooks/useEarthquakes";
import type { EarthquakeFeature } from "./types/Earthquake";

export default function App() {
  const { earthquakes, loading, error } = useEarthquakes();

  const [searchLocation, setSearchLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [minMag, setMinMag] = useState<number>(0);
  const [hours, setHours] = useState<number>(24);

  // filtered by magnitude & time window
  const filteredByFilters = useMemo(() => {
    const cutoff = Date.now() - hours * 3600 * 1000;
    return earthquakes.filter((q) => {
      const mag = q.properties.mag ?? 0;
      const time = q.properties.time ?? 0;
      return mag >= minMag && time >= cutoff;
    });
  }, [earthquakes, minMag, hours]);

  // filtered by search proximity (handled inside handleSearch)
  const [filteredQuakes, setFilteredQuakes] = useState<EarthquakeFeature[]>([]);
  useEffect(() => {
    // when base filtered changes, apply it
    setFilteredQuakes(filteredByFilters);
  }, [filteredByFilters]);

  // search (nominatim forward geocoding) -> set searchLocation and filter by distance
  const handleSearch = async (query: string) => {
    if (!query) {
      setSearchLocation(null);
      setFilteredQuakes(filteredByFilters);
      return;
    }

    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`;
      const res = await fetch(url);
      const locations = await res.json();
      if (!locations || locations.length === 0) {
        alert("No location found");
        return;
      }
      const { lat, lon } = locations[0];
      const latN = parseFloat(lat);
      const lonN = parseFloat(lon);
      setSearchLocation({ lat: latN, lon: lonN });

      // Haversine filter radius 500 km
      const R = 6371;
      const filtered = filteredByFilters.filter((q) => {
        const [lng, latitude] = q.geometry.coordinates;
        const dLat = (latN - latitude) * Math.PI / 180;
        const dLon = (lonN - lng) * Math.PI / 180;
        const a =
          Math.sin(dLat / 2) ** 2 +
          Math.cos(latitude * Math.PI / 180) *
          Math.cos(latN * Math.PI / 180) *
          Math.sin(dLon / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        return distance <= 500;
      });
      setFilteredQuakes(filtered);
      window.dispatchEvent(new CustomEvent("zoom-to-location", { detail: { latitude: latN, longitude: lonN } }));
    } catch (err) {
      console.error(err);
      alert("Search failed");
    }
  };

  return (
    <>
      <Header />
      <SearchBar onSearch={handleSearch} />
      <div style={{ display: "flex", gap: 12, padding: "0 12px", alignItems: "flex-start" }}>
        <Filters minMag={minMag} setMinMag={setMinMag} hours={hours} setHours={setHours} />
        <div style={{ flex: 1 }}>
          {loading && <p className="loader">Loading earthquakes...</p>}
          {error && <p className="error">{error}</p>}
          {!loading && !error && (
            <MapView earthquakes={filteredQuakes} searchLocation={searchLocation} circleRadiusKm={200} />
          )}
        </div>
      </div>
    </>
  );
}
