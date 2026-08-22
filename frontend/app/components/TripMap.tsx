"use client";

import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export type MapStop = {
  id: string;
  name: string;
  country: string;
  latitude: number | null;
  longitude: number | null;
  order: number;
};

// Leaflet's default marker icons reference image files by path, which breaks
// under bundlers unless re-pointed at CDN-hosted assets.
const pinIcon = (label: number) =>
  L.divIcon({
    className: "",
    html: `<div style="
      background:#C4622D;color:#FBF7EF;width:28px;height:28px;border-radius:50% 50% 50% 0;
      transform:rotate(-45deg);display:flex;align-items:center;justify-content:center;
      box-shadow:0 2px 6px rgba(0,0,0,0.35);border:2px solid #FBF7EF;">
      <span style="transform:rotate(45deg);font-family:monospace;font-size:12px;font-weight:600;">${label}</span>
    </div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 28],
  });

export default function TripMap({ stops }: { stops: MapStop[] }) {
  const located = stops.filter((s) => s.latitude !== null && s.longitude !== null);

  if (located.length === 0) {
    return (
      <div className="card text-center py-16 text-ink/50 dark:text-paper/50 text-sm">
        No stops with map coordinates yet.
      </div>
    );
  }

  const center: [number, number] = [located[0].latitude as number, located[0].longitude as number];
  const path: [number, number][] = located
    .sort((a, b) => a.order - b.order)
    .map((s) => [s.latitude as number, s.longitude as number]);

  return (
    <div className="card !p-0 overflow-hidden">
      <MapContainer center={center} zoom={4} scrollWheelZoom style={{ height: "420px", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polyline positions={path} pathOptions={{ color: "#C4622D", weight: 2, dashArray: "6 6" }} />
        {located.map((stop) => (
          <Marker key={stop.id} position={[stop.latitude as number, stop.longitude as number]} icon={pinIcon(stop.order)}>
            <Popup>
              <strong>{stop.name}</strong>, {stop.country}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
