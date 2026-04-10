"use client";

import { use, useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { sections } from "@/data/sections";
import { ZineEnvironment } from "./ZineEnvironment";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const IMG_BASE = "/experiments/digital-zine/images";
const GLB_BASE = "/experiments/digital-zine/glb";

const SECTION_BGS = sections.map((s) => `${IMG_BASE}/${s.bg}`);

const SECTION_MODELS = sections.map((s) =>
  s.models.map((m) => ({ ...m, file: `${GLB_BASE}/${m.file}` })),
);

const BLOOM_GLBS = new Set(["heart.glb", "wings.glb"]);

const SECTION_ATMOSPHERES = [
  sections[0].atmosphere,
  sections[1].atmosphere,
  sections[2].atmosphere,
  sections[3].atmosphere,
  sections[4].atmosphere,
  sections[5].atmosphere,
  sections[6].atmosphere,
];

export default function ZineLogic() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const atmospheres = SECTION_ATMOSPHERES;
    const atm0 = atmospheres[0];

    // renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // scene + camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(atm0.fogColor, atm0.fogDensity);

    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      100,
    );
    camera.position.set(0, 0, 5);

    // lights
    const ambientLight = new THREE.AmbientLight(atm0.ambientColor, 0.7);
    scene.add(ambientLight);

    // tweak these later

    // const dirLight = new THREE.DirectionalLight(0xffffff, 0.7);
    // dirLight.position.set(4, 5, 5);
    // scene.add(dirLight);
    // const fillLight = new THREE.DirectionalLight(0xd8cce8, 0.3);
    // fillLight.position.set(-3, -2, 3);
    // scene.add(fillLight);
    // const accentLight = new THREE.PointLight(0xe8a0b8, 0.5, 20);
    // accentLight.position.set(0, 3, 3);
    // scene.add(accentLight);

    // composer & bloom
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.4, // strength — how intense the glow is
      0.6, // radius — how far the glow spreads
      0.85, // threshold — brightness cutoff (only bright parts bloom)
    );
    composer.addPass(bloomPass);

    // bgs
    const textureLoader = new THREE.TextureLoader();
    const bgTextures: THREE.Texture[] = [];
    const bgLoadPromises = SECTION_BGS.map(
      (path, i) =>
        new Promise<void>((resolve) => {
          textureLoader.load(
            path,
            (tex) => {
              tex.colorSpace = THREE.SRGBColorSpace;
              bgTextures[i] = tex;
              // first bg as scene background immediately
              if (i === 0) scene.background = tex;
              resolve();
            },
            undefined,
            () => {
              console.error(`[Zine] Failed to load bg: ${path}`);
              resolve();
            },
          );
        }),
    );

    // env map (reused from synth-kit)
    const cubeTextureLoader = new THREE.CubeTextureLoader();
    const envMap = cubeTextureLoader.load([
      "/experiments/synth-kit/images/px.png",
      "/experiments/synth-kit/images/nx.png",
      "/experiments/synth-kit/images/py.png",
      "/experiments/synth-kit/images/ny.png",
      "/experiments/synth-kit/images/pz.png",
      "/experiments/synth-kit/images/nz.png",
    ]);
    scene.environment = envMap;

    // GLBs (with draco compression)
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(
      "https://www.gstatic.com/draco/versioned/decoders/1.5.7/",
    );
    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);

    const sectionGroups: THREE.Group[] = [];
    const sectionModels: THREE.Object3D[][] = [];

    SECTION_MODELS.forEach(() => {
      const group = new THREE.Group();
      scene.add(group);
      sectionGroups.push(group);
      sectionModels.push([]);
    });

    const glbLoadPromises: Promise<void>[] = [];
    SECTION_MODELS.forEach((defs, si) => {
      defs.forEach((def) => {
        const url = def.file;
        glbLoadPromises.push(
          new Promise<void>((resolve) => {
            gltfLoader.load(
              url,
              (gltf) => {
                const model = gltf.scene;
                model.scale.setScalar(def.scale);
                // model.position.set(...def.pos);
                // model.rotation.set(...def.rot);

                // log bounding box to diagnose scale/position
                const box = new THREE.Box3().setFromObject(model);
                const size = new THREE.Vector3();
                box.getSize(size);
                console.log(
                  `[Zine] ${def.file} → section ${si} | bbox size: ${size.x.toFixed(2)} x ${size.y.toFixed(2)} x ${size.z.toFixed(2)} | pos: ${model.position.toArray().map((v) => v.toFixed(2))}`,
                );

                const shouldBloom = BLOOM_GLBS.has(def.file);
                model.traverse((child) => {
                  if ((child as THREE.Mesh).isMesh) {
                    const mat = (child as THREE.Mesh)
                      .material as THREE.MeshStandardMaterial;
                    if (mat) {
                      mat.envMapIntensity = 0.8;
                      if (shouldBloom) {
                        mat.emissive = new THREE.Color("#e8a0c0");
                        mat.emissiveIntensity = 0.6;
                      }
                      mat.needsUpdate = true;
                    }
                  }
                });

                sectionGroups[si].add(model);
                sectionModels[si].push(model);
                resolve();
              },
              undefined,
              (err) => {
                console.error(`[Zine] FAILED ${url}:`, err);
                resolve();
              },
            );
          }),
        );
      });
    });

    // GSAP ScrollTrigger
    const allScrollTriggers: ScrollTrigger[] = [];

    Promise.all([...glbLoadPromises, ...bgLoadPromises]).then(() => {
      console.log("[Zine] All assets loaded");

      // set initial bg
      if (bgTextures[0]) {
        scene.background = bgTextures[0];
      }

      // query all sections:
      const allSections =
        document.querySelectorAll<HTMLElement>(".zine-section");
      console.log(`[Zine] Found ${allSections.length} total sections`);

      allSections.forEach((sectionElem, si) => {
        const models = sectionModels[si] || [];
        const defs = SECTION_MODELS[si] || [];
        const atm = atmospheres[si];

        // models materialize when their section enters
        models.forEach((model, mi) => {
          const def = defs[mi];
          if (!def) return;
          // model.position.set(...def.pos);
          // model.rotation.set(...def.rot);
          model.scale.setScalar(0.001);
          model.visible = false;
        });

        // scalling up/down on enter/leave
        const modelsScroll = ScrollTrigger.create({
          trigger: sectionElem,
          start: "top 90%",
          end: "bottom 10%",
          onEnter: () => {
            models.forEach((model, mi) => {
              const def = defs[mi];
              if (!def) return;
              model.visible = true;
              gsap.to(model.scale, {
                x: def.scale,
                y: def.scale,
                z: def.scale,
                duration: 0.8,
                ease: "back.out(1.4)",
              });
            });
          },
          onLeave: () => {
            models.forEach((model) => {
              gsap.to(model.scale, {
                x: 0.001,
                y: 0.001,
                z: 0.001,
                duration: 0.5,
                ease: "power2.in",
                onComplete: () => {
                  model.visible = false;
                },
              });
            });
          },
          onEnterBack: () => {
            models.forEach((model, mi) => {
              const def = defs[mi];
              if (!def) return;
              model.visible = true;
              gsap.to(model.scale, {
                x: def.scale,
                y: def.scale,
                z: def.scale,
                duration: 0.8,
                ease: "back.out(1.4)",
              });
            });
          },
          onLeaveBack: () => {
            models.forEach((model) => {
              gsap.to(model.scale, {
                x: 0.001,
                y: 0.001,
                z: 0.001,
                duration: 0.5,
                ease: "power2.in",
                onComplete: () => {
                  model.visible = false;
                },
              });
            });
          },
        });
        allScrollTriggers.push(modelsScroll);

        // bg swap per section
        if (bgTextures[si]) {
          const bgScroll = ScrollTrigger.create({
            trigger: sectionElem,
            start: "top 60%",
            onEnter: () => {
              scene.background = bgTextures[si];
            },
            onEnterBack: () => {
              scene.background = bgTextures[si];
            },
          });
          allScrollTriggers.push(bgScroll);
        }

        // atmosphere transition
        if (!atm || si === 0) return; // s0 atmosphere set as default
        const targetFog = new THREE.Color(atm.fogColor);
        const targetAmbient = new THREE.Color(atm.ambientColor);

        const atmTmln = gsap.timeline({
          scrollTrigger: {
            trigger: sectionElem,
            start: "top 70%",
            end: "top 20%",
            scrub: 1,
          },
        });
        if (atmTmln.scrollTrigger)
          allScrollTriggers.push(atmTmln.scrollTrigger);

        atmTmln.to(
          (scene.fog as THREE.FogExp2).color,
          {
            r: targetFog.r,
            g: targetFog.g,
            b: targetFog.b,
            duration: 1,
            ease: "none",
          },
          0,
        );
        atmTmln.to(
          ambientLight.color,
          {
            r: targetAmbient.r,
            g: targetAmbient.g,
            b: targetAmbient.b,
            duration: 1,
            ease: "none",
          },
          0,
        );
        atmTmln.to(
          scene.fog as THREE.FogExp2,
          {
            density: atm.fogDensity,
            duration: 1,
            ease: "none",
          },
          0,
        );
      });
    });

    // render loop
    let animId: number;
    const timer = new THREE.Timer();
    const animate = () => {
      animId = requestAnimationFrame(animate);
      timer.update();
      const t = timer.getElapsed();

      // gentle pulse + slow rotation on all visible models
      sectionModels.forEach((models) => {
        models.forEach((model, mi) => {
          if (!model.visible || model.scale.x < 0.01) return;
          model.rotation.y += 0.002 * (mi % 2 === 0 ? 1 : -1);
          // subtle breathing scale pulse
          const pulse = 1 + Math.sin(t * 1.2 + mi * 1.5) * 0.015;
          const base = model.userData.baseScale ?? model.scale.x;
          model.userData.baseScale = base;
          model.scale.setScalar(base * pulse);
        });
      });

      composer.render();
    };
    animate();

    // window resize
    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      composer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // cleanup
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animId);
      allScrollTriggers.forEach((st) => st.kill());
      dracoLoader.dispose();
      envMap.dispose();
      bgTextures.forEach((t) => t?.dispose());
      composer.dispose();
      renderer.dispose();
      scene.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh) {
          const m = obj as THREE.Mesh;
          m.geometry?.dispose();
          if (Array.isArray(m.material))
            m.material.forEach((mt) => mt.dispose());
          else m.material?.dispose();
        }
      });
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="zine-canvas fixed inset-0 z-0" />;
}
