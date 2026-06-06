"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { sections } from "@/data/sections";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const IMG_BASE = "/experiments/digital-zine/images";
const SECTION_BGS = sections.map((s) => `${IMG_BASE}/${s.bg}`);

// env map reused from the synth-kit experiment (cube faces)
const ENV_FACES = [
  "/experiments/synth-kit/images/px.png",
  "/experiments/synth-kit/images/nx.png",
  "/experiments/synth-kit/images/py.png",
  "/experiments/synth-kit/images/ny.png",
  "/experiments/synth-kit/images/pz.png",
  "/experiments/synth-kit/images/nz.png",
];

const atm0 = sections[0].atmosphere;

function ZineScene() {
  const { scene } = useThree();
  const meshRef = useRef<THREE.Mesh>(null);
  const fogRef = useRef<THREE.FogExp2>(null);
  const ambientRef = useRef<THREE.AmbientLight>(null);

  // Load the env map + per-section backgrounds imperatively (no Suspense yet —
  // that arrives in Phase 6), then wire the GSAP ScrollTrigger atmosphere scrub.
  useEffect(() => {
    const fog = fogRef.current;
    const ambient = ambientRef.current;

    // env map → scene.environment (drives reflections on standard materials)
    const cubeLoader = new THREE.CubeTextureLoader();
    const envMap = cubeLoader.load(ENV_FACES);
    scene.environment = envMap;

    // backgrounds: load all, set section 0 as the initial background
    const texLoader = new THREE.TextureLoader();
    const bgTextures: THREE.Texture[] = [];
    SECTION_BGS.forEach((path, i) => {
      texLoader.load(path, (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        bgTextures[i] = tex;
        if (i === 0 && !scene.background) scene.background = tex;
      });
    });

    // Per-section scroll wiring against the existing .zine-section elements
    const triggers: ScrollTrigger[] = [];
    const sectionEls =
      document.querySelectorAll<HTMLElement>(".zine-section");

    sectionEls.forEach((el, si) => {
      // background swap when the section reaches mid-viewport
      triggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: "top 60%",
          onEnter: () => {
            if (bgTextures[si]) scene.background = bgTextures[si];
          },
          onEnterBack: () => {
            if (bgTextures[si]) scene.background = bgTextures[si];
          },
        }),
      );

      // atmosphere scrub — section 0 is the default state, so skip it
      const atm = sections[si]?.atmosphere;
      if (!atm || si === 0 || !fog || !ambient) return;

      const targetFog = new THREE.Color(atm.fogColor);
      const targetAmbient = new THREE.Color(atm.ambientColor);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 70%",
          end: "top 20%",
          scrub: 1,
        },
      });
      if (tl.scrollTrigger) triggers.push(tl.scrollTrigger);

      tl.to(
        fog.color,
        { r: targetFog.r, g: targetFog.g, b: targetFog.b, ease: "none" },
        0,
      )
        .to(
          ambient.color,
          {
            r: targetAmbient.r,
            g: targetAmbient.g,
            b: targetAmbient.b,
            ease: "none",
          },
          0,
        )
        .to(fog, { density: atm.fogDensity, ease: "none" }, 0);
    });

    ScrollTrigger.refresh();

    return () => {
      triggers.forEach((t) => t.kill());
      envMap.dispose();
      bgTextures.forEach((t) => t?.dispose());
    };
  }, [scene]);

  // Test mesh kept through Phase 2 so fog/ambient/env changes are visible.
  // Replaced by the real per-section models in Phase 3.
  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
      meshRef.current.rotation.x += delta * 0.3;
    }
  });

  return (
    <>
      <fogExp2
        ref={fogRef}
        attach="fog"
        args={[atm0.fogColor, atm0.fogDensity]}
      />
      <ambientLight ref={ambientRef} intensity={0.7} color={atm0.ambientColor} />
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1, 0.3, 128, 32]} />
        <meshStandardMaterial
          color="#e8a0c0"
          metalness={0.4}
          roughness={0.35}
          envMapIntensity={0.8}
        />
      </mesh>
    </>
  );
}

export default function ZineLogic() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        dpr={[1, 2]}
        camera={{ fov: 50, position: [0, 0, 5], near: 0.1, far: 100 }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
      >
        <ZineScene />
      </Canvas>
    </div>
  );
}
