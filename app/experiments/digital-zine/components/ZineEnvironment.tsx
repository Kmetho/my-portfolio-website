import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { poems } from "@/data/poems";
import { Float, MeshDistortMaterial } from "@react-three/drei";


function OrganicShape({ position, color, speed = 1 }) {
  return (
    <Float speed={speed} rotationIntensity={0.4} floatIntensity={0.5}>
      <mesh position={position}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color={color}
          distort={0.3}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.6}
        />
      </mesh>
    </Float>
  );
}

export function ZineEnvironment() {
  const scroll = useScroll();
  const fogRef = useRef<THREE.Fog>(null!);

  useFrame(() => {
    const offset = scroll.offset; // 0 to 1
    const totalSections = poems.length + 2;
    const currentSection = offset * totalSections;

    const poemIndex = Math.floor(currentSection - 1);
    const clampedIndex = Math.max(0, Math.min(poemIndex, poems.length - 1));

    const currentPoem = poems[clampedIndex];
    const nextPoem = poems[Math.min(clampedIndex + 1, poems.length - 1)];
    const t = currentSection - 1 - clampedIndex;

    const currentFogColor = new THREE.Color(currentPoem.atmosphere.fogColor);
    const nextFogColor = new THREE.Color(nextPoem.atmosphere.fogColor);
    if (fogRef.current) {
      fogRef.current.color.lerpColors(currentFogColor, nextFogColor, t);
    }
  });

  return <fog ref={fogRef} attach="fog" args={["#d8cce0", 5, 20]} />;
}
