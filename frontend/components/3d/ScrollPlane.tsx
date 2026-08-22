"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import { motion } from "framer-motion-3d";
import { useScroll, useTransform } from "framer-motion";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function PaperPlane({ scrollYProgress }: { scrollYProgress: any }) {
  // Map scroll progress to position and rotation
  const x = useTransform(scrollYProgress, [0, 1], [-10, 10]);
  const y = useTransform(scrollYProgress, [0, 1], [5, -5]);
  const z = useTransform(scrollYProgress, [0, 1], [2, -2]);
  
  const rotateX = useTransform(scrollYProgress, [0, 1], [0.5, 0.2]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [-0.5, 0.5]);
  const rotateZ = useTransform(scrollYProgress, [0, 1], [-0.2, 0.2]);

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

  return (
    <motion.group
      position-x={x}
      position-y={y}
      position-z={z}
      rotation-x={rotateX}
      rotation-y={rotateY}
      rotation-z={rotateZ}
    >
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
    </motion.group>
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
