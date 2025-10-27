import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Circle, useMap, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import type { EarthquakeFeature } from "../types/Earthquake";
import EarthquakeMarker from "./EarthquakeMarker";
import L from "leaflet";

interface Props {
  earthquakes: EarthquakeFeature[];
  searchLocation: { lat: number; lon: number } | null;
  circleRadiusKm?: number;
}

function MapZoomHandler() {
  const map = useMap();

  useEffect(() => {
    const handler = (e: any) => {
      map.setView([e.detail.latitude, e.detail.longitude], 6, { animate: true });
    };
    const locateHandler = () => {
      if (!navigator.geolocation) return alert("Geolocation not supported");
      navigator.geolocation.getCurrentPosition((pos) => {
        const lat = pos.coords.latitude, lon = pos.coords.longitude;
        map.setView([lat, lon], 7, { animate: true });
        // dispatch event to show marker? we'll just show a temporary marker below
        const ev = new CustomEvent("user-location", { detail: { lat, lon } });
        window.dispatchEvent(ev);
      }, (err) => alert("Geolocation failed: " + err.message));
    };
    window.addEventListener("zoom-to-location", handler);
    window.addEventListener("locate-user", locateHandler);
    return () => {
      window.removeEventListener("zoom-to-location", handler);
      window.removeEventListener("locate-user", locateHandler);
    };
  }, [map]);

  return null;
}

const searchIcon = L.icon({
  iconUrl: "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2.png",
  iconSize: [28, 42],
  iconAnchor: [14, 42],
});

export default function MapView({ earthquakes, searchLocation, circleRadiusKm = 200 }: Props) {
  return (
    <MapContainer className="map-container" center={[20, 0]} zoom={2} scrollWheelZoom>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <MapZoomHandler />

      {/* marker clustering */}
      <MarkerClusterGroup chunkedLoading>
        {earthquakes.map((q) => (
          <EarthquakeMarker key={q.id} quake={q} />
        ))}
      </MarkerClusterGroup>

      {/* searched location marker + radius circle */}
      {searchLocation && (
        <>
          <Marker position={[searchLocation.lat, searchLocation.lon]} icon={searchIcon}>
            <Popup>Search location</Popup>
          </Marker>
          <Circle
            center={[searchLocation.lat, searchLocation.lon]}
            radius={circleRadiusKm * 1000}
            pathOptions={{ color: "#0077ff", fillColor: "#0077ff", fillOpacity: 0.05 }}
          />
        </>
      )}

      {/* user location display (listening to event) */}
      <UserLocationMarker />
    </MapContainer>
  );
}

function UserLocationMarker() {
  const [pos, setPos] = React.useState<{ lat: number; lon: number } | null>(null);
  useEffect(() => {
    const handler = (e: any) => setPos({ lat: e.detail.lat, lon: e.detail.lon });
    window.addEventListener("user-location", handler);
    return () => window.removeEventListener("user-location", handler);
  }, []);
  if (!pos) return null;
  return (
    <Marker position={[pos.lat, pos.lon]}>
      <Popup>You are here</Popup>
    </Marker>
  );
}
