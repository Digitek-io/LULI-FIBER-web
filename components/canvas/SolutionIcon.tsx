"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Edges } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

type Variant = "home" | "business" | "line";

const glassMaterial = (
  <meshPhysicalMaterial
    color="#B822B8"
    emissive="#7B2FF7"
    emissiveIntensity={0.4}
    roughness={0.2}
    metalness={0.1}
    transmission={0.35}
    thickness={0.6}
  />
);

function HomeIcon() {
  return (
    <group>
      <mesh position={[0, -0.15, 0]}>
        <boxGeometry args={[1.1, 0.8, 1.1]} />
        {glassMaterial}
        <Edges color="#22D3EE" />
      </mesh>
      <mesh position={[0, 0.55, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[0.9, 0.7, 4]} />
        {glassMaterial}
        <Edges color="#22D3EE" />
      </mesh>
    </group>
  );
}

function BusinessIcon() {
  // A slim tower with a few emissive "window" points — reads as an office block
  const windows = useMemo(() => {
    const pts: [number, number, number][] = [];
    for (let y = -0.5; y <= 0.7; y += 0.35) {
      pts.push([-0.28, y, 0.41]);
      pts.push([0.28, y, 0.41]);
    }
    return pts;
  }, []);

  return (
    <group>
      <mesh>
        <boxGeometry args={[0.8, 1.6, 0.8]} />
        {glassMaterial}
        <Edges color="#22D3EE" />
      </mesh>
      {windows.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color="#22D3EE" toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

function LineIcon() {
  // Two nodes joined by a single straight strand — a direct callback to the
  // hero's fiber strand, apt here since a leased line IS a dedicated
  // point-to-point fiber rather than the shared network's winding path.
  const pulseRef = useRef<THREE.Mesh>(null);
  const t = useRef(0);

  useFrame((_, delta) => {
    t.current = (t.current + delta * 0.6) % 1;
    if (pulseRef.current) {
      pulseRef.current.position.x = -0.9 + t.current * 1.8;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 10]}>
      <mesh position={[-0.9, 0, 0]}>
        <sphereGeometry args={[0.16, 16, 16]} />
        {glassMaterial}
      </mesh>
      <mesh position={[0.9, 0, 0]}>
        <sphereGeometry args={[0.16, 16, 16]} />
        {glassMaterial}
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.04, 0.04, 1.8, 12]} />
        {glassMaterial}
      </mesh>
      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.09, 12, 12]} />
        <meshBasicMaterial color="#22D3EE" toneMapped={false} />
      </mesh>
    </group>
  );
}

function Rig({ variant, hovered, reduced }: { variant: Variant; hovered: boolean; reduced: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const speed = useRef(0.25);

  useFrame((_, delta) => {
    if (reduced || !groupRef.current) return;
    const target = hovered ? 1.4 : 0.25;
    speed.current += (target - speed.current) * 0.08;
    groupRef.current.rotation.y += delta * speed.current;
    const targetTilt = hovered ? 0.25 : 0.1;
    groupRef.current.rotation.x += (targetTilt - groupRef.current.rotation.x) * 0.05;
  });

  return (
    <group ref={groupRef} rotation={[0.1, 0, 0]}>
      {variant === "home" && <HomeIcon />}
      {variant === "business" && <BusinessIcon />}
      {variant === "line" && <LineIcon />}
    </group>
  );
}

export default function SolutionIcon({ variant, hovered }: { variant: Variant; hovered: boolean }) {
  const reduced = useReducedMotion();

  return (
    <Canvas camera={{ position: [0, 0, 3.4], fov: 40 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[2, 2, 2]} intensity={30} color="#7B2FF7" />
      <pointLight position={[-2, -1, 1]} intensity={18} color="#22D3EE" />
      <Rig variant={variant} hovered={hovered} reduced={reduced} />
    </Canvas>
  );
}