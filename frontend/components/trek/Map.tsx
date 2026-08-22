"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for missing default icon in React-Leaflet
const iconUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png";
const iconRetinaUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png";
const shadowUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

export type MapMarker = {
  id: string;
  lat: number;
  lng: number;
  label?: string;
  popup?: string;
};

interface MapProps {
  center: [number, number];
  zoom?: number;
  markers?: MapMarker[];
  className?: string;
}

export default function LeafletMap({ center, zoom = 12, markers = [], className = "h-full w-full" }: MapProps) {
  useEffect(() => {
    // Re-adjust map if container resizes
    window.dispatchEvent(new Event("resize"));
  }, []);

  return (
    <div className={className}>
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        className="h-full w-full z-0 rounded-inherit"
        style={{ height: "100%", width: "100%", background: "#0B0F19" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        {markers.map((marker) => (
          <Marker key={marker.id} position={[marker.lat, marker.lng]}>
            {(marker.label || marker.popup) && (
              <Popup>
                <div className="text-gray-900 font-sans">
                  {marker.label && <h3 className="font-bold text-sm">{marker.label}</h3>}
                  {marker.popup && <p className="text-xs">{marker.popup}</p>}
                </div>
              </Popup>
            )}
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
