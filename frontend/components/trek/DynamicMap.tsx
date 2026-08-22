"use client";

import dynamic from "next/dynamic";
import type { MapMarker } from "./Map";

const DynamicLeafletMap = dynamic(() => import("./Map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-[#0F172A] border border-indigo-500/20 rounded-inherit">
      <div className="w-8 h-8 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
    </div>
  )
});

interface DynamicMapProps {
  center: [number, number];
  zoom?: number;
  markers?: MapMarker[];
  className?: string;
}

export default function Map(props: DynamicMapProps) {
  return <DynamicLeafletMap {...props} />;
}
