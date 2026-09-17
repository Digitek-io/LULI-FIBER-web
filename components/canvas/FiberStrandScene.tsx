"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

/**
 * The Signal Line — signature visual for Lulifiber.
 * A glass fiber-optic strand rendered as a tube, with a cyan pulse of
 * light travelling along it (literal: fiber optics carry data as light).
 * Reacts subtly to pointer position for depth (parallax), and respects
 * prefers-reduced-motion by freezing the pulse and parallax.
 */

function Strand({ reduced }: { reduced: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const pulseRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();
  const t = useRef(0);

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-2.6, 1.6, -1),
      new THREE.Vector3(-1, 0.6, 0.4),
      new THREE.Vector3(0.4, -0.4, -0.6),
      new THREE.Vector3(1.6, 0.8, 0.6),
      new THREE.Vector3(2.6, -1.2, -0.4),
    ]);
  }, []);

  const tubeGeometry = useMemo(
    () => new THREE.TubeGeometry(curve, 200, 0.05, 12, false),
    [curve]
  );

  useFrame((_, delta) => {
    if (!reduced) {
      t.current = (t.current + delta * 0.18) % 1;
      const point = curve.getPointAt(t.current);
      pulseRef.current?.position.copy(point);
    }

    if (groupRef.current) {
      const targetX = reduced ? 0 : pointer.y * 0.15;
      const targetY = reduced ? 0 : pointer.x * 0.2;
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.04;
      groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.04;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Glass strand */}
      <mesh geometry={tubeGeometry}>
        <meshPhysicalMaterial
          color="#4D0AA4"
          emissive="#7B2FF7"
          emissiveIntensity={0.6}
          roughness={0.15}
          metalness={0.1}
          transmission={0.4}
          thickness={0.5}
        />
      </mesh>

      {/* Travelling light pulse */}
      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.11, 16, 16]} />
        <meshBasicMaterial color="#22D3EE" toneMapped={false} />
      </mesh>
    </group>
  );
}

export default function FiberStrandScene() {
  const reduced = useReducedMotion();

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 3, 3]} intensity={40} color="#7B2FF7" />
      <pointLight position={[-3, -2, 2]} intensity={25} color="#22D3EE" />
      <Strand reduced={reduced} />
    </Canvas>
  );
}