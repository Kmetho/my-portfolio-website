"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useThree } from "@react-three/fiber";
import { Preload, useGLTF } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { ZineEnvironment } from "./ZineEnvironment";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { sections } from "@/data/sections";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const IMG_BASE = "/experiments/digital-zine/images";
const GLB_BASE = "/experiments/digital-zine/glb";
const DRACO_PATH = "https://www.gstatic.com/draco/versioned/decoders/1.5.7/";

const SECTION_BGS = sections.map((s) => `${IMG_BASE}/${s.bg}`);

// these two glow under the bloom pass
const BLOOM_GLBS = new Set(["heart.glb", "wings.glb"]);

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

// kick off glb fetches as early as possible (module load), so they're warm by
// the time each <ZineModel> mounts
sections.forEach((s) =>
  s.models.forEach((m) => useGLTF.preload(`${GLB_BASE}/${m.file}`, DRACO_PATH)),
);

type ModelDef = (typeof sections)[number]["models"][number];

/**
 * a single glb, the outer <group> handles the materialize-on-scroll scale
 * (0.001 to 1, driven by gsap/ScrollTrigger), the inner <primitive> sits at its
 * static scale/position/rotation from data/sections.ts, idle motion is
 * intentionally disabled for now, organic motion will live on `modelRef`
 */
function ZineModel({
  def,
  sectionIndex,
}: {
  def: ModelDef;
  sectionIndex: number;
}) {
  const gltf = useGLTF(`${GLB_BASE}/${def.file}`, DRACO_PATH);
  const outerRef = useRef<THREE.Group>(null);
  const modelRef = useRef<THREE.Object3D>(null);

  // apply env-map intensity + emissive (for the bloom set) once per glb
  const object = useMemo(() => {
    const root = gltf.scene;
    const shouldBloom = BLOOM_GLBS.has(def.file);
    root.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (!mesh.isMesh) return;
      const mat = mesh.material as THREE.MeshStandardMaterial;
      if (!mat) return;
      mat.envMapIntensity = 0.8;
      if (shouldBloom) {
        mat.emissive = new THREE.Color("#e8a0c0");
        mat.emissiveIntensity = 0.6;
      }
      mat.needsUpdate = true;
    });
    return root;
  }, [gltf.scene, def.file]);

  // materialize-on-scroll, tied to this model's .zine-section element
  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;
    const el =
      document.querySelectorAll<HTMLElement>(".zine-section")[sectionIndex];
    if (!el) return;

    outer.scale.setScalar(0.001);
    outer.visible = false;

    const show = () => {
      outer.visible = true;
      gsap.to(outer.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 0.8,
        ease: "back.out(1.4)",
      });
    };
    const hide = () => {
      gsap.to(outer.scale, {
        x: 0.001,
        y: 0.001,
        z: 0.001,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          outer.visible = false;
        },
      });
    };

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      end: "bottom 10%",
      onEnter: show,
      onLeave: hide,
      onEnterBack: show,
      onLeaveBack: hide,
    });

    return () => st.kill();
  }, [sectionIndex]);

  // note: idle rotation/breathing intentionally removed, add organic motion
  // here later via useFrame on `modelRef` (remember to re-gate it with
  // useReducedMotion, as ZineEnvironment still does)

  return (
    <group ref={outerRef}>
      <primitive
        ref={modelRef}
        object={object}
        scale={def.scale}
        position={def.pos ?? [0, 0, 0]}
        rotation={def.rot ?? [0, 0, 0]}
      />
    </group>
  );
}

function ZineModels() {
  return (
    <>
      {sections.map((section, si) =>
        section.models.map((def, mi) => (
          <ZineModel
            key={`${si}-${def.file}-${mi}`}
            def={def}
            sectionIndex={si}
          />
        )),
      )}
    </>
  );
}

function ZineScene() {
  const { scene } = useThree();
  const fogRef = useRef<THREE.FogExp2>(null);
  const ambientRef = useRef<THREE.AmbientLight>(null);

  // load the env map + per-section backgrounds imperatively, then wire the
  // gsap ScrollTrigger atmosphere scrub
  useEffect(() => {
    const fog = fogRef.current;
    const ambient = ambientRef.current;

    // env map becomes scene.environment (drives reflections on standard materials)
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

    // per-section scroll wiring against the existing .zine-section elements
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

      // atmosphere scrub, section 0 is the default state, so skip it
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

  return (
    <>
      <fogExp2
        ref={fogRef}
        attach="fog"
        args={[atm0.fogColor, atm0.fogDensity]}
      />
      <ambientLight ref={ambientRef} intensity={0.7} color={atm0.ambientColor} />
      {/* temp placement guide, remove when models are positioned
          red = +X (right), green = +Y (up), blue = +Z (toward camera) */}
      <axesHelper args={[5]} />
      <ZineEnvironment />
      <Suspense fallback={null}>
        <ZineModels />
        <Preload all />
      </Suspense>
      {/* Bloom, ported from the vanilla UnrealBloomPass(0.4, 0.6, 0.85)
          strength to intensity, radius to radius, threshold to luminanceThreshold */}
      <EffectComposer>
        <Bloom
          intensity={0.4}
          radius={0.6}
          luminanceThreshold={0.85}
          luminanceSmoothing={0.025}
          mipmapBlur
        />
      </EffectComposer>
    </>
  );
}

export default function ZineLogic() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        dpr={[1, 2]}
        camera={{ fov: 80, position: [0, 0.1, 5], rotation: [-0.1, 0, 0], near: 0.1, far: 100 }}
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
