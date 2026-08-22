"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";

export function Globe({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 1000,
      height: 1000,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.1, 0.8, 1],
      glowColor: [1, 1, 1],
      markers: [
        { location: [37.7595, -122.4367], size: 0.03 },
        { location: [40.7128, -74.006], size: 0.1 },
      ],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.005;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <div className={`relative max-w-full aspect-square ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-0 transition-opacity duration-1000 ease-in-out"
        style={{
          width: 1000,
          height: 1000,
          maxWidth: "100%",
          maxHeight: "100%",
        }}
        onLoad={(e) => {
          if (e.currentTarget) {
            e.currentTarget.style.opacity = "1";
          }
        }}
        ref={(el) => {
          if (el) {
             el.style.opacity = "1";
             // @ts-ignore
             canvasRef.current = el;
          }
        }}

      />
    </div>
  );
}
