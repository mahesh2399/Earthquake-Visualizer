import { CircleMarker, Popup, Tooltip } from "react-leaflet";
import type { EarthquakeFeature } from "../types/Earthquake";

interface Props {
  quake: EarthquakeFeature;
}

export default function EarthquakeMarker({ quake }: Props) {
  const [lng, lat] = quake.geometry.coordinates;
  const mag = quake.properties.mag ?? 0;
  const depth = quake.geometry.coordinates[2] ?? 0;

  // color scale
  const color =
    mag >= 7 ? "#7f0000" :
    mag >= 6 ? "#b30000" :
    mag >= 5 ? "#ff2d00" :
    mag >= 4 ? "#ff7a00" :
    mag >= 3 ? "#ffb84d" :
    "#ffd966";

  const radius = Math.max(4, mag * 3);

  return (
    <CircleMarker
      center={[lat, lng]}
      radius={radius}
      pathOptions={{ color, fillColor: color, fillOpacity: 0.7, weight: 1 }}
    >
      <Tooltip direction="top" offset={[0, -radius]} opacity={0.9}>
        <div style={{ fontWeight: 700 }}>M {mag.toFixed(1)}</div>
        <div style={{ fontSize: 12 }}>{quake.properties.place}</div>
      </Tooltip>
      <Popup>
        <div style={{ minWidth: 200 }}>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>{quake.properties.place}</div>
          <div>Magnitude: <strong>{mag}</strong></div>
          <div>Depth: <strong>{depth} km</strong></div>
          <div>Time: {new Date(quake.properties.time ?? 0).toLocaleString()}</div>
          {quake.properties.url && (
            <div style={{ marginTop: 6 }}>
              <a href={quake.properties.url} target="_blank" rel="noreferrer">USGS details</a>
            </div>
          )}
        </div>
      </Popup>
    </CircleMarker>
  );
}
