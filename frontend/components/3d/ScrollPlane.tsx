"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import { useScroll } from "framer-motion";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function PaperPlane({ scrollYProgress }: { scrollYProgress: any }) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Create a simple paper plane geometry
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(1, 0.2);
    shape.lineTo(0.2, 0.5);
    shape.lineTo(0.5, -0.5);
    shape.lineTo(1, -0.2);
    shape.lineTo(0, 0);
    
    const extrudeSettings = { depth: 0.05, bevelEnabled: false };
    const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geo.center();
    return geo;
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;
    const progress = scrollYProgress.get();
    
    // Map scroll progress (0 to 1) to position and rotation
    // x: from right to left
    const x = 10 - (progress * 20); 
    const y = 5 - (progress * 10);
    const z = 2 - (progress * 4);
    
    const rotateX = 0.5 - (progress * 0.3);
    const rotateY = -0.5 + (progress * 1);
    const rotateZ = -0.2 + (progress * 0.4);

    groupRef.current.position.set(x, y, z);
    groupRef.current.rotation.set(rotateX, rotateY, rotateZ);
  });

  return (
    <group ref={groupRef}>
      <Float speed={3} rotationIntensity={1} floatIntensity={2}>
        <mesh geometry={geometry} scale={2}>
          <meshStandardMaterial 
            color="#FB923C" 
            metalness={0.2} 
            roughness={0.2} 
            emissive="#ea580c"
            emissiveIntensity={0.5}
          />
        </mesh>
      </Float>
    </group>
  );
}

export function ScrollPlane() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();

  return (
    <div className="absolute inset-0 z-0 pointer-events-none" ref={containerRef}>
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#FB923C" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#38BDF8" />
        <Environment preset="city" />
        
        <PaperPlane scrollYProgress={scrollYProgress} />
      </Canvas>
    </div>
  );
}
