"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
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

// these two glow under the bloom pass (Phase 4)
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

// Kick off GLB fetches as early as possible (module load), so they're warm by
// the time each <ZineModel> mounts.
sections.forEach((s) =>
  s.models.forEach((m) => useGLTF.preload(`${GLB_BASE}/${m.file}`, DRACO_PATH)),
);

type ModelDef = (typeof sections)[number]["models"][number];

/**
 * A single GLB. The outer <group> handles the materialize-on-scroll scale
 * (0.001 → 1, driven by GSAP/ScrollTrigger); the inner <primitive> handles the
 * idle rotation + breathing pulse on its natural scale, in useFrame. Splitting
 * the two avoids GSAP and the render loop fighting over the same scale value.
 */
function ZineModel({
  def,
  sectionIndex,
  modelIndex,
}: {
  def: ModelDef;
  sectionIndex: number;
  modelIndex: number;
}) {
  const gltf = useGLTF(`${GLB_BASE}/${def.file}`, DRACO_PATH);
  const outerRef = useRef<THREE.Group>(null);
  const modelRef = useRef<THREE.Object3D>(null);
  const elapsed = useRef(0);

  const dir = modelIndex % 2 === 0 ? 1 : -1;

  // Apply env-map intensity + emissive (for the bloom set) once per GLB.
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

  // Materialize-on-scroll, tied to this model's .zine-section element.
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

  // Idle rotation + subtle breathing pulse on the inner model.
  useFrame((_state, delta) => {
    const model = modelRef.current;
    if (!model || !outerRef.current?.visible) return;
    elapsed.current += delta;
    model.rotation.y += delta * 0.12 * dir;
    const pulse =
      1 + Math.sin(elapsed.current * 1.2 + modelIndex * 1.5) * 0.015;
    model.scale.setScalar(def.scale * pulse);
  });

  return (
    <group ref={outerRef}>
      <primitive
        ref={modelRef}
        object={object}
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
            modelIndex={mi}
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

  return (
    <>
      <fogExp2
        ref={fogRef}
        attach="fog"
        args={[atm0.fogColor, atm0.fogDensity]}
      />
      <ambientLight ref={ambientRef} intensity={0.7} color={atm0.ambientColor} />
      <ZineEnvironment />
      <Suspense fallback={null}>
        <ZineModels />
        <Preload all />
      </Suspense>
      {/* Bloom — ported from the vanilla UnrealBloomPass(0.4, 0.6, 0.85).
          strength→intensity, radius→radius, threshold→luminanceThreshold. */}
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
