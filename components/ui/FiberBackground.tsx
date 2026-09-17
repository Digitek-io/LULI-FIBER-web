"use client";

import { Canvas } from "@react-three/fiber";
import { Sparkles, Float } from "@react-three/drei";

export default function FiberBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-void-radial">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        {/* Ambient lighting for the scene */}
        <ambientLight intensity={0.5} />
        
        {/* Magenta "Fiber" Particles */}
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
          <Sparkles 
            count={150} 
            scale={12} 
            size={4} 
            speed={0.4} 
            color="#B822B8" /* Brand Magenta */
            opacity={0.6}
          />
        </Float>

        {/* Orange "Data" Particles */}
        <Float speed={3} rotationIntensity={2} floatIntensity={3}>
          <Sparkles 
            count={100} 
            scale={10} 
            size={3} 
            speed={0.8} 
            color="#FF8700" /* Brand Light/Orange */
            opacity={0.8}
          />
        </Float>
      </Canvas>
      
      {/* A subtle gradient overlay to ensure text readability */}
      <div className="absolute inset-0 bg-linear-to-b from-void/10 via-void/50 to-void z-10" />
    </div>
  );
}