"use client";
"use client";

import LeafletMap, { MapMarker } from "./Map";

interface TripMapProps {
  stops?: any[];
}

export default function TripMap({ stops = [] }: TripMapProps) {
  const markers: MapMarker[] = stops
    .filter((s) => s.city?.latitude && s.city?.longitude)
    .map((s) => ({
      id: s.id,
      lat: s.city.latitude,
      lng: s.city.longitude,
      label: s.city.name,
    }));

  const center = markers.length > 0 ? [markers[0].lat, markers[0].lng] as [number, number] : [35.0116, 135.7681];

  return (
    <LeafletMap center={center} zoom={12} markers={markers} className="h-full w-full" />
  );
}
