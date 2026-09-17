"use client";

import {
  useRef,
  useState,
  useMemo,
  useEffect,
  type ReactNode,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/* =========================================================
   BRAND
========================================================= */

const PURPLE = "#B822B8";
const ORANGE = "#FF8700";
const WHITE = "#FFFFFF";

/**
 * Deterministic pseudo-random value.
 *
 * Unlike Math.random(), this always produces the same
 * value for the same input, making it safe during render.
 */
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

/* =========================================================
   TYPES
========================================================= */

interface FiberData {
  curve: THREE.CatmullRomCurve3;
  color: string;
  radius: number;
  angle: number;
  opacity: number;
}

interface PulseData {
  fiberIndex: number;
  progress: number;
  speed: number;
  color: string;
  size: number;
}

/* =========================================================
   CABLE PATH
========================================================= */

/**
 * Main cable path.
 *
 * This is intentionally long and curved so the entire visual
 * reads as one continuous fiber-optic cable rather than
 * individual strands emerging from a central object.
 */
function createCableCurve(): THREE.CatmullRomCurve3 {
  const points = [
    new THREE.Vector3(-7.5, -0.9, 1.2),
    new THREE.Vector3(-6.0, -0.75, 0.75),
    new THREE.Vector3(-4.5, -0.35, 0.3),
    new THREE.Vector3(-3.0, 0.15, -0.05),
    new THREE.Vector3(-1.5, 0.55, -0.25),
    new THREE.Vector3(0, 0.7, -0.35),
    new THREE.Vector3(1.5, 0.55, -0.2),
    new THREE.Vector3(3.0, 0.25, 0.05),
    new THREE.Vector3(4.5, -0.1, 0.25),
    new THREE.Vector3(6.0, -0.25, 0.55),
    new THREE.Vector3(7.5, -0.15, 0.9),
  ];

  return new THREE.CatmullRomCurve3(
    points,
    false,
    "catmullrom",
    0.5
  );
}

/* =========================================================
   INTERNAL FIBERS
========================================================= */

/**
 * Creates smaller curves positioned around the inside of
 * the main cable.
 *
 * The fibers follow the exact same path as the cable while
 * maintaining their radial positions inside the jacket.
 */
function createFiberCurves(
  cableCurve: THREE.CatmullRomCurve3,
  count: number,
  fiberRadius: number
): FiberData[] {
  const fibers: FiberData[] = [];

  const colors = [
    PURPLE,
    PURPLE,
    ORANGE,
    PURPLE,
    ORANGE,
    PURPLE,
    ORANGE,
  ];

  const steps = 100;

  for (let fiberIndex = 0; fiberIndex < count; fiberIndex++) {
    const angle =
      (fiberIndex / count) * Math.PI * 2 + Math.PI / 6;

    const points: THREE.Vector3[] = [];

    for (let i = 0; i <= steps; i++) {
      const t = i / steps;

      const point = cableCurve.getPoint(t);
      const tangent = cableCurve.getTangent(t).normalize();

      /*
       * Build a local coordinate system around the cable.
       *
       * Since our cable primarily bends through X/Y,
       * Z works nicely as the second radial axis.
       */
      const referenceUp = new THREE.Vector3(0, 0, 1);

      let normal = new THREE.Vector3()
        .crossVectors(referenceUp, tangent)
        .normalize();

      if (normal.lengthSq() < 0.001) {
        normal = new THREE.Vector3(0, 1, 0);
      }

      const binormal = new THREE.Vector3()
        .crossVectors(tangent, normal)
        .normalize();

      const offset = new THREE.Vector3()
        .addScaledVector(
          normal,
          Math.cos(angle) * fiberRadius
        )
        .addScaledVector(
          binormal,
          Math.sin(angle) * fiberRadius
        );

      points.push(point.clone().add(offset));
    }

    const curve = new THREE.CatmullRomCurve3(
      points,
      false,
      "catmullrom",
      0.5
    );

    fibers.push({
      curve,
      color: colors[fiberIndex % colors.length],
      radius: 0.035,
      angle,
      opacity: 0.8,
    });
  }

  return fibers;
}

/* =========================================================
   GLOW TEXTURE
========================================================= */

function useGlowTexture() {
  const texture = useMemo(() => {
    const size = 128;

    const canvas = document.createElement("canvas");

    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext("2d");

    if (ctx) {
      const gradient = ctx.createRadialGradient(
        size / 2,
        size / 2,
        0,
        size / 2,
        size / 2,
        size / 2
      );

      gradient.addColorStop(
        0,
        "rgba(255,255,255,1)"
      );

      gradient.addColorStop(
        0.2,
        "rgba(255,255,255,0.85)"
      );

      gradient.addColorStop(
        0.5,
        "rgba(255,255,255,0.25)"
      );

      gradient.addColorStop(
        1,
        "rgba(255,255,255,0)"
      );

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);
    }

    return new THREE.CanvasTexture(canvas);
  }, []);

  useEffect(() => {
    return () => {
      texture.dispose();
    };
  }, [texture]);

  return texture;
}

/* =========================================================
   FIBER STRAND
========================================================= */

function FiberStrand({
  fiber,
  glowTexture,
  pulses,
}: {
  fiber: FiberData;
  glowTexture: THREE.Texture;
  pulses: PulseData[];
}) {
  const pulseRefs = useRef<
    Array<THREE.Mesh | null>
  >([]);

  const haloRefs = useRef<
    Array<THREE.Sprite | null>
  >([]);

  const trailRefs = useRef<
    Array<THREE.Mesh | null>
  >([]);

  useFrame((_, delta) => {
    pulses.forEach((pulse, index) => {
      pulse.progress += delta * pulse.speed;

      if (pulse.progress > 1) {
        pulse.progress -= 1;
      }

      const point = fiber.curve.getPoint(
        pulse.progress
      );

      const tangent = fiber.curve
        .getTangent(pulse.progress)
        .normalize();

      const pulseMesh = pulseRefs.current[index];

      if (pulseMesh) {
        pulseMesh.position.copy(point);

        pulseMesh.lookAt(
          point.clone().add(tangent)
        );

        const pulseScale =
          0.8 +
          Math.sin(
            performance.now() * 0.008 + index
          ) *
            0.15;

        pulseMesh.scale.set(
          pulseScale,
          pulseScale,
          8
        );
      }

      const halo = haloRefs.current[index];

      if (halo) {
        halo.position.copy(point);

        const pulseGlow =
          0.85 +
          Math.sin(
            performance.now() * 0.01 + index
          ) *
            0.15;

        halo.scale.setScalar(
          0.35 * pulseGlow
        );
      }

      /*
       * Directional trail.
       *
       * The trail is placed slightly behind the
       * moving light pulse so it looks like the
       * light is physically travelling through the fiber.
       */
      const trail = trailRefs.current[index];

      if (trail) {
        const trailProgress = Math.max(
          0,
          pulse.progress - 0.055
        );

        const trailPoint =
          fiber.curve.getPoint(trailProgress);

        trail.position.copy(trailPoint);

        trail.lookAt(
          point.clone()
        );

        trail.scale.set(
          0.65,
          0.65,
          5
        );
      }
    });
  });

  return (
    <group>
      {/* Actual glass fiber */}
      <mesh>
        <tubeGeometry
          args={[
            fiber.curve,
            80,
            fiber.radius,
            8,
            false,
          ]}
        />

        <meshPhysicalMaterial
          color={WHITE}
          transmission={0.35}
          transparent
          opacity={0.32}
          roughness={0.05}
          metalness={0.05}
          emissive={fiber.color}
          emissiveIntensity={0.25}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Slight colored inner glow */}
      <mesh>
        <tubeGeometry
          args={[
            fiber.curve,
            80,
            fiber.radius * 0.45,
            6,
            false,
          ]}
        />

        <meshBasicMaterial
          color={fiber.color}
          transparent
          opacity={0.28}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Moving beams */}
      {pulses.map((pulse, index) => (
        <group key={`${pulse.fiberIndex}-${index}`}>
          {/* Main bright beam */}
          <mesh
            ref={(element) => {
              pulseRefs.current[index] = element;
            }}
          >
            <sphereGeometry
              args={[
                pulse.size,
                12,
                12,
              ]}
            />

            <meshBasicMaterial
              color={pulse.color}
              toneMapped={false}
            />
          </mesh>

          {/* Directional trail */}
          <mesh
            ref={(element) => {
              trailRefs.current[index] = element;
            }}
          >
            <cylinderGeometry
              args={[
                pulse.size * 0.45,
                pulse.size * 0.12,
                0.8,
                8,
              ]}
            />

            <meshBasicMaterial
              color={pulse.color}
              transparent
              opacity={0.3}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
              toneMapped={false}
            />
          </mesh>

          {/* Glow */}
          <sprite
            ref={(element) => {
              haloRefs.current[index] = element;
            }}
          >
            <spriteMaterial
              map={glowTexture}
              color={pulse.color}
              transparent
              opacity={0.65}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </sprite>
        </group>
      ))}
    </group>
  );
}

/* =========================================================
   OUTER CABLE
========================================================= */

function OuterCable({
  curve,
}: {
  curve: THREE.CatmullRomCurve3;
}) {
  return (
    <group>
      {/* Main protective jacket */}
      <mesh>
        <tubeGeometry
          args={[
            curve,
            100,
            0.95,
            32,
            false,
          ]}
        />

        <meshPhysicalMaterial
          color="#160D1A"
          transparent
          opacity={0.38}
          roughness={0.25}
          metalness={0.3}
          transmission={0.05}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Inner sheath glow */}
      <mesh>
        <tubeGeometry
          args={[
            curve,
            100,
            0.78,
            24,
            false,
          ]}
        />

        <meshBasicMaterial
          color={PURPLE}
          transparent
          opacity={0.045}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Subtle outer highlight */}
      <mesh>
        <tubeGeometry
          args={[
            curve,
            100,
            0.97,
            16,
            false,
          ]}
        />

        <meshBasicMaterial
          color="#6D356D"
          transparent
          opacity={0.08}
          wireframe
        />
      </mesh>
    </group>
  );
}

/* =========================================================
   CABLE END CAP
========================================================= */

function CableEnd({
  position,
  rotation,
}: {
  position: THREE.Vector3;
  rotation: THREE.Euler;
}) {
  return (
    <group
      position={position}
      rotation={rotation}
    >
      <mesh>
        <cylinderGeometry
          args={[
            1.0,
            1.0,
            0.18,
            32,
          ]}
        />

        <meshStandardMaterial
          color="#201521"
          roughness={0.35}
          metalness={0.6}
        />
      </mesh>

      <mesh>
        <ringGeometry
          args={[
            0.72,
            0.94,
            32,
          ]}
        />

        <meshBasicMaterial
          color={PURPLE}
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

/* =========================================================
   FIBER CABLE
========================================================= */

function FiberCable({
  isMobile,
  glowTexture,
}: {
  isMobile: boolean;
  glowTexture: THREE.Texture;
}) {
  const groupRef = useRef<THREE.Group>(null);

  const cableCurve = useMemo(
    () => createCableCurve(),
    []
  );

  const fibers = useMemo(
    () =>
      createFiberCurves(
        cableCurve,
        isMobile ? 5 : 7,
        0.42
      ),
    [cableCurve, isMobile]
  );

  /*
   * Two pulses per fiber on desktop.
   * One pulse per fiber on mobile.
   */
  const pulseCount = isMobile ? 1 : 2;

  const pulseData = useMemo(() => {
    return fibers.map((fiber, fiberIndex) =>
      Array.from(
        { length: pulseCount },
        (_, index) => ({
          fiberIndex,
          progress:
            (index / pulseCount +
              fiberIndex * 0.07) %
            1,
          speed:
            0.45 +
            Math.random() * 0.35,
          color: fiber.color,
          size: isMobile ? 0.045 : 0.055,
        })
      )
    );
  }, [fibers, pulseCount, isMobile]);

  /*
   * Very subtle movement.
   *
   * The cable should feel alive, but the light
   * travelling through it remains the dominant motion.
   */
  useFrame((state) => {
    if (!groupRef.current) return;

    const time =
      state.clock.getElapsedTime();

    groupRef.current.rotation.z =
      Math.sin(time * 0.18) * 0.025;

    groupRef.current.rotation.y =
      Math.sin(time * 0.12) * 0.02;
  });

  const startPoint = cableCurve.getPoint(0);
  const endPoint = cableCurve.getPoint(1);

  const startTangent =
    cableCurve.getTangent(0).normalize();

  const endTangent =
    cableCurve.getTangent(1).normalize();

  const startQuaternion =
    new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      startTangent
    );

  const endQuaternion =
    new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      endTangent
    );

  const startEuler =
    new THREE.Euler().setFromQuaternion(
      startQuaternion
    );

  const endEuler =
    new THREE.Euler().setFromQuaternion(
      endQuaternion
    );

  return (
    <group
      ref={groupRef}
      scale={isMobile ? 0.82 : 1}
    >
      {/* Main cable */}
      <OuterCable curve={cableCurve} />

      {/* Internal fibers */}
      {fibers.map((fiber, index) => (
        <FiberStrand
          key={`fiber-${index}`}
          fiber={fiber}
          glowTexture={glowTexture}
          pulses={pulseData[index]}
        />
      ))}

      {/* Cable ends */}
      <CableEnd
        position={startPoint}
        rotation={startEuler}
      />

      <CableEnd
        position={endPoint}
        rotation={endEuler}
      />

      {/* Light illuminating the inside of the cable */}
      <pointLight
        position={[0, 0.5, 0]}
        color={PURPLE}
        intensity={5}
        distance={5}
      />

      <pointLight
        position={[2, 0, 0]}
        color={ORANGE}
        intensity={3}
        distance={4}
      />
    </group>
  );
}

/* =========================================================
   BACKGROUND SPEED PARTICLES
========================================================= */

function SpeedLines({
  count,
}: {
  count: number;
}) {
  const groupRef = useRef<THREE.Group>(null);

  const lines = useMemo(() => {
    return Array.from({ length: count }, (_, index) => {
      const r1 = seededRandom(index * 7 + 1);
      const r2 = seededRandom(index * 7 + 2);
      const r3 = seededRandom(index * 7 + 3);
      const r4 = seededRandom(index * 7 + 4);
      const r5 = seededRandom(index * 7 + 5);

      return {
        x: (r1 - 0.5) * 18,
        y: (r2 - 0.5) * 10,
        z: (r3 - 0.5) * 12 - 2,

        length: 0.3 + r4 * 1.8,

        speed: 1.5 + r5 * 3,

        color:
          seededRandom(index * 7 + 6) > 0.45
            ? PURPLE
            : ORANGE,

        opacity:
          0.08 +
          seededRandom(index * 7 + 7) * 0.2,
      };
    });
  }, [count]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    groupRef.current.children.forEach(
      (child, index) => {
        const line = lines[index];

        if (!line) return;

        child.position.z +=
          line.speed * delta;

        if (child.position.z > 7) {
          child.position.z = -10;
        }
      }
    );
  });

  return (
    <group ref={groupRef}>
      {lines.map((line, index) => (
        <mesh
          key={index}
          position={[
            line.x,
            line.y,
            line.z,
          ]}
          rotation={[
            0,
            0,
            Math.PI / 2,
          ]}
        >
          <boxGeometry
            args={[
              line.length,
              0.008,
              0.008,
            ]}
          />

          <meshBasicMaterial
            color={line.color}
            transparent
            opacity={line.opacity}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

/* =========================================================
   FLOATING PARTICLES
========================================================= */

function AmbientParticles({
  count,
}: {
  count: number;
}) {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, index) => {
      const r1 = seededRandom(index * 5 + 1);
      const r2 = seededRandom(index * 5 + 2);
      const r3 = seededRandom(index * 5 + 3);
      const r4 = seededRandom(index * 5 + 4);
      const r5 = seededRandom(index * 5 + 5);

      return {
        position: [
          (r1 - 0.5) * 15,
          (r2 - 0.5) * 8,
          -2 - r3 * 6,
        ] as [number, number, number],

        size:
          0.008 + r4 * 0.025,

        color:
          r5 > 0.45
            ? PURPLE
            : ORANGE,
      };
    });
  }, [count]);

  return (
    <group>
      {particles.map((particle, index) => (
        <mesh
          key={index}
          position={particle.position}
          scale={particle.size}
        >
          <sphereGeometry
            args={[1, 6, 6]}
          />

          <meshBasicMaterial
            color={particle.color}
            transparent
            opacity={0.55}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

/* =========================================================
   PARALLAX
========================================================= */

function ParallaxRig({
  children,
}: {
  children: ReactNode;
}) {
  const rigRef =
    useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!rigRef.current) return;

    const targetX =
      state.pointer.y * -0.06;

    const targetY =
      state.pointer.x * 0.12;

    rigRef.current.rotation.x =
      THREE.MathUtils.lerp(
        rigRef.current.rotation.x,
        targetX,
        0.035
      );

    rigRef.current.rotation.y =
      THREE.MathUtils.lerp(
        rigRef.current.rotation.y,
        targetY,
        0.035
      );
  });

  return (
    <group
      ref={rigRef}
      position={[0, -0.2, 0]}
      rotation={[
        -0.08,
        -0.08,
        -0.08,
      ]}
    >
      {children}
    </group>
  );
}

/* =========================================================
   SCENE
========================================================= */

function Scene({
  isMobile,
}: {
  isMobile: boolean;
}) {
  const glowTexture =
    useGlowTexture();

  return (
    <>
      {/* Ambient environment */}
      <ambientLight
        intensity={0.3}
        color="#7C4DFF"
      />

      {/* Main white light */}
      <directionalLight
        position={[5, 8, 6]}
        intensity={2}
        color="#FFFFFF"
      />

      {/* Purple rim */}
      <directionalLight
        position={[-5, 3, 4]}
        intensity={2.5}
        color={PURPLE}
      />

      {/* Orange rim */}
      <directionalLight
        position={[5, -2, 2]}
        intensity={1.4}
        color={ORANGE}
      />

      {/* Atmospheric depth */}
      <fog
        attach="fog"
        args={[
          "#100615",
          7,
          18,
        ]}
      />

      <ParallaxRig>
        <SpeedLines
          count={isMobile ? 12 : 30}
        />

        <AmbientParticles
          count={isMobile ? 20 : 45}
        />

        <Float
          speed={0.8}
          rotationIntensity={0.08}
          floatIntensity={0.2}
        >
          <FiberCable
            isMobile={isMobile}
            glowTexture={glowTexture}
          />
        </Float>
      </ParallaxRig>
    </>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function FiberCore() {
  const [isMobile, setIsMobile] =
    useState(false);

  useEffect(() => {
    const checkSize = () => {
      setIsMobile(
        window.innerWidth < 768
      );
    };

    checkSize();

    window.addEventListener(
      "resize",
      checkSize
    );

    return () =>
      window.removeEventListener(
        "resize",
        checkSize
      );
  }, []);

  return (
    <Canvas
      camera={{
        position: [0, 0, 9],
        fov: 42,
      }}
      dpr={[
        1,
        isMobile ? 1.5 : 2,
      ]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference:
          "high-performance",
      }}
    >
      <Scene
        isMobile={isMobile}
      />
    </Canvas>
  );
}