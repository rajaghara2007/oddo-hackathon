"use client";

import createGlobe from "cobe";
import { useEffect, useRef } from "react";

export function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 1000,
      height: 1000,
      phi: 0,
      theta: 0.3,
      dark: 0,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.95, 0.95, 0.97], // soft grey
      markerColor: [1, 0.4, 0.1], // warm orange markers
      glowColor: [0.98, 0.98, 0.98], // white glow
      markers: [
        { location: [35.6762, 139.6503], size: 0.1 }, // Tokyo
        { location: [48.8566, 2.3522], size: 0.1 },   // Paris
        { location: [40.7128, -74.0060], size: 0.1 }, // New York
      ],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.005;
      },
    });

    return () => globe.destroy();
  }, []);

  return (
    <div className="relative w-[1000px] h-[1000px] max-w-full aspect-square flex items-center justify-center -ml-[250px] opacity-80">
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", contain: "layout paint size" }}
      />
    </div>
  );
}
