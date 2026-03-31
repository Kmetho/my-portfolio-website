"use client";

<<<<<<< Updated upstream
import ExperimentBackLink from "@/components/ExperimentBackLink";

export default function SynthKitExperience() {
  return (
    <div className="h-screen w-screen bg-black text-white flex items-center justify-center">
      <ExperimentBackLink />
      <p className="text-white/40 text-sm">
        Crystal synth kit — awaiting migration
      </p>
=======
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import ExperimentBackLink from "@/components/ExperimentBackLink";

const ASSET_BASE = "/experiments/synth-kit";

export default function SynthKitExperience() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let disposed = false;

    function init() {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000,
      );
      const renderer = new THREE.WebGLRenderer({ canvas: canvas! });

      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.position.setZ(50);
      renderer.outputColorSpace = THREE.SRGBColorSpace;

      const composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));
      composer.addPass(
        new UnrealBloomPass(
          new THREE.Vector2(window.innerWidth, window.innerHeight),
          0.8,
          0.4,
          0.95,
        ),
      );
      composer.addPass(new OutputPass());

      scene.fog = new THREE.FogExp2(0xffffff, 0.02);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.listenToKeyEvents(window);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.enablePan = false;
      controls.screenSpacePanning = false;
      controls.minDistance = 16;
      controls.maxDistance = 50;
      controls.maxPolarAngle = Math.PI / 2;

      // light
      const pointLight = new THREE.PointLight(0xffffff, 1);
      pointLight.position.set(5, 5, 5);
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.05);
      scene.add(pointLight, ambientLight);

      // bg and env
      const bg = new THREE.TextureLoader().load(`${ASSET_BASE}/images/bg.png`);
      scene.background = bg;

      const cubeTextureLoader = new THREE.CubeTextureLoader();
      const cubeMap = cubeTextureLoader.load([
        `${ASSET_BASE}/images/px.png`,
        `${ASSET_BASE}/images/nx.png`,
        `${ASSET_BASE}/images/py.png`,
        `${ASSET_BASE}/images/ny.png`,
        `${ASSET_BASE}/images/pz.png`,
        `${ASSET_BASE}/images/nz.png`,
      ]);

      // stars
      const stars: THREE.Mesh[] = [];
      const starHomePositions: THREE.Vector3[] = [];
      const starGeometry = new THREE.SphereGeometry(0.2, 6, 6);
      const starMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
      starMaterial.envMap = cubeMap;
      starMaterial.envMapIntensity = 10;

      Array(400)
        .fill(null)
        .forEach(() => {
          const star = new THREE.Mesh(starGeometry, starMaterial);
          const [x, y, z] = Array(3)
            .fill(null)
            .map(() => THREE.MathUtils.randFloatSpread(100));
          star.position.set(x, y, z);
          scene.add(star);
          stars.push(star);
          starHomePositions.push(star.position.clone());
        });

      // materials
      const materials = [
        new THREE.MeshStandardMaterial({
          color: 0x4a4558,
          emissive: 0x001099,
          roughness: 0,
          metalness: 1,
          flatShading: true,
          vertexColors: true,
          fog: true,
        }),
        new THREE.MeshStandardMaterial({
          color: 0x3a4a3e,
          emissive: 0x154a35,
          roughness: 0,
          metalness: 1,
          flatShading: true,
          vertexColors: true,
          fog: true,
        }),
        new THREE.MeshStandardMaterial({
          color: 0x5a4a2a,
          emissive: 0x6a5a80,
          roughness: 0,
          metalness: 1,
          flatShading: true,
          vertexColors: true,
          fog: true,
        }),
        new THREE.MeshStandardMaterial({
          color: 0x1a5a5b,
          emissive: 0x4a4a4a,
          roughness: 0,
          metalness: 1,
          flatShading: true,
          vertexColors: true,
          fog: true,
        }),
        new THREE.MeshStandardMaterial({
          color: 0x0e0080,
          emissive: 0x0d053a,
          roughness: 0,
          metalness: 1,
          flatShading: true,
          vertexColors: true,
          fog: true,
        }),
        new THREE.MeshStandardMaterial({
          color: 0x4a2a3a,
          emissive: 0x8a0050,
          roughness: 0,
          metalness: 1,
          flatShading: true,
          vertexColors: true,
          fog: true,
        }),
        new THREE.MeshStandardMaterial({
          color: 0x5a4a70,
          emissive: 0x4a0080,
          roughness: 0,
          metalness: 1,
          flatShading: true,
          vertexColors: true,
          fog: true,
        }),
        new THREE.MeshStandardMaterial({
          color: 0x2a4a5a,
          emissive: 0x3a7a90,
          roughness: 0,
          metalness: 1,
          flatShading: true,
          vertexColors: true,
          fog: true,
        }),
      ];

      materials.forEach((mat) => {
        mat.envMap = cubeMap;
        mat.envMapIntensity = 0.8;
      });

      // raycasting
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();
      const crystalMeshes: THREE.Mesh[] = [];
      const originalEmissives = new Map<THREE.Mesh, THREE.Color>();
      let hoveredObject: THREE.Mesh | null = null;

      // web audio api
      let audioCtx: AudioContext | null = null;
      const crystalNotes = [
        261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25,
      ];
      const crystalNoteMap = new Map<THREE.Mesh, number>();

      function playEtherealTone(frequency: number) {
        if (!audioCtx) audioCtx = new AudioContext();
        const now = audioCtx.currentTime;

        const gainNode = audioCtx.createGain();
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.15, now + 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 2.0);

        const osc1 = audioCtx.createOscillator();
        osc1.type = "sine";
        osc1.frequency.setValueAtTime(frequency, now);

        const osc2 = audioCtx.createOscillator();
        osc2.type = "sine";
        osc2.frequency.setValueAtTime(frequency, now);
        osc2.detune.setValueAtTime(7, now);

        const osc3 = audioCtx.createOscillator();
        osc3.type = "sine";
        osc3.frequency.setValueAtTime(frequency * 2, now);
        const octaveGain = audioCtx.createGain();
        octaveGain.gain.setValueAtTime(0.06, now);

        osc1.connect(gainNode);
        osc2.connect(gainNode);
        osc3.connect(octaveGain);
        octaveGain.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        osc1.start(now);
        osc2.start(now);
        osc3.start(now);
        osc1.stop(now + 2.0);
        osc2.stop(now + 2.0);
        osc3.stop(now + 2.0);
      }

      // --- Halos ---
      const activeHalos: { mesh: THREE.Mesh; age: number }[] = [];

      function spawnHalo(crystal: THREE.Mesh) {
        const emissiveColor = originalEmissives.get(crystal);
        if (!emissiveColor) return;
        const glowGeo = new THREE.SphereGeometry(3, 16, 16);
        const glowMat = new THREE.MeshBasicMaterial({
          color: emissiveColor,
          transparent: true,
          opacity: 0.15,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        });

        const halo = new THREE.Mesh(glowGeo, glowMat);
        const worldPos = new THREE.Vector3();
        crystal.getWorldPosition(worldPos);
        halo.position.copy(worldPos);

        scene.add(halo);
        activeHalos.push({ mesh: halo, age: 0 });
      }

      function triggerCrystal(index: number) {
        playEtherealTone(crystalNotes[index]);
        const mesh = crystalMeshes.find((m) => crystalNoteMap.get(m) === index);
        if (mesh) spawnHalo(mesh);
      }

      // --- Event handlers ---
      function onMouseMove(event: MouseEvent) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      }

      function onTouchMove(event: TouchEvent) {
        const touch = event.touches[0];
        mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;
      }

      function onClick() {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(crystalMeshes);
        if (intersects.length > 0) {
          const hit = intersects[0].object as THREE.Mesh;
          const noteIndex = crystalNoteMap.get(hit);
          if (noteIndex !== undefined) triggerCrystal(noteIndex);
        }
      }

      function onTouchStart(event: TouchEvent) {
        const touch = event.touches[0];
        mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(crystalMeshes);
        if (intersects.length > 0) {
          const hit = intersects[0].object as THREE.Mesh;
          const noteIndex = crystalNoteMap.get(hit);
          if (noteIndex !== undefined) triggerCrystal(noteIndex);
        }
      }

      const keyMap: Record<string, number> = {
        "1": 0,
        "2": 1,
        "3": 2,
        "4": 3,
        "5": 4,
        "6": 5,
        "7": 6,
        "8": 7,
      };

      function onKeyDown(event: KeyboardEvent) {
        const index = keyMap[event.key];
        if (index !== undefined) triggerCrystal(index);
      }

      function onResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        composer.setSize(window.innerWidth, window.innerHeight);
      }

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("touchmove", onTouchMove);
      window.addEventListener("click", onClick);
      window.addEventListener("touchstart", onTouchStart);
      window.addEventListener("keydown", onKeyDown);
      window.addEventListener("resize", onResize);

      // crystals
      const crystalNames = ["c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8"];
      const mixers: (THREE.AnimationMixer | null)[] = [];
      const loader = new GLTFLoader();

      crystalNames.forEach((name, index) => {
        const material = materials[index];
        loader.load(
          `${ASSET_BASE}/glb/${name}.glb`,
          (gltf) => {
            if (disposed) return;
            gltf.scene.traverse((node) => {
              if ((node as THREE.Mesh).isMesh) {
                const mesh = node as THREE.Mesh;
                mesh.material = material;
                crystalMeshes.push(mesh);
                originalEmissives.set(mesh, material.emissive.clone());
                crystalNoteMap.set(mesh, index);
              }
            });
            scene.add(gltf.scene);
            mixers[index] = new THREE.AnimationMixer(gltf.scene);
            const clips = gltf.animations;
            const clip = THREE.AnimationClip.findByName(
              clips,
              `${name}-action`,
            );
            if (clip) mixers[index]!.clipAction(clip).play();
          },
          undefined,
          (error) => {
            console.error(`Failed to load crystal ${name}:`, error);
          },
        );
      });

      // anim
      const mouseWorld = new THREE.Vector3();
      const timer = new THREE.Timer();
      let animFrameId: number;

      function animate() {
        if (disposed) return;
        animFrameId = requestAnimationFrame(animate);
        timer.update();
        const delta = timer.getDelta();

        mixers.forEach((mixer) => mixer?.update(delta));

        // halos
        for (let i = activeHalos.length - 1; i >= 0; i--) {
          const halo = activeHalos[i];
          halo.age += delta;
          const progress = halo.age / 1.5;

          if (progress >= 1) {
            scene.remove(halo.mesh);
            halo.mesh.geometry.dispose();
            (halo.mesh.material as THREE.Material).dispose();
            activeHalos.splice(i, 1);
          } else {
            const scale = 1 + progress * 1.5;
            halo.mesh.scale.set(scale, scale, scale);
            (halo.mesh.material as THREE.MeshBasicMaterial).opacity =
              0.15 * ((1 + Math.cos(progress * Math.PI)) / 2);
          }
        }

        // star push
        mouseWorld.set(mouse.x, mouse.y, 0.5).unproject(camera);
        const pushRadius = 15;
        const pushRadiusSq = pushRadius * pushRadius;

        for (let i = 0; i < stars.length; i++) {
          const star = stars[i];
          const home = starHomePositions[i];
          const dx = star.position.x - mouseWorld.x;
          const dy = star.position.y - mouseWorld.y;
          const dz = star.position.z - mouseWorld.z;
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < pushRadiusSq) {
            const dist = Math.sqrt(distSq);
            const strength = ((pushRadius - dist) / pushRadius) * 0.3;
            star.position.x += (dx / dist) * strength;
            star.position.y += (dy / dist) * strength;
            star.position.z += (dz / dist) * strength;
          } else {
            star.position.lerp(home, 0.02);
          }
        }

        // hover
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(crystalMeshes);

        if (intersects.length > 0) {
          const hit = intersects[0].object as THREE.Mesh;
          if (hoveredObject !== hit) {
            if (hoveredObject) {
              (
                hoveredObject.material as THREE.MeshStandardMaterial
              ).emissive.copy(originalEmissives.get(hoveredObject)!);
              hoveredObject.scale.set(1, 1, 1);
            }
            hoveredObject = hit;
            const boosted = originalEmissives
              .get(hit)!
              .clone()
              .multiplyScalar(3);
            (hit.material as THREE.MeshStandardMaterial).emissive.copy(boosted);
            hit.scale.set(1.03, 1.03, 1.03);
            document.body.style.cursor = "pointer";
          }
        } else {
          if (hoveredObject) {
            (
              hoveredObject.material as THREE.MeshStandardMaterial
            ).emissive.copy(originalEmissives.get(hoveredObject)!);
            hoveredObject.scale.set(1, 1, 1);
            hoveredObject = null;
            document.body.style.cursor = "default";
          }
        }

        controls.update();
        composer.render();
      }

      animate();

      cleanupRef.current = () => {
        disposed = true;
        cancelAnimationFrame(animFrameId);

        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("touchmove", onTouchMove);
        window.removeEventListener("click", onClick);
        window.removeEventListener("touchstart", onTouchStart);
        window.removeEventListener("keydown", onKeyDown);
        window.removeEventListener("resize", onResize);

        controls.dispose();

        activeHalos.forEach((h) => {
          scene.remove(h.mesh);
          h.mesh.geometry.dispose();
          (h.mesh.material as THREE.Material).dispose();
        });

        scene.traverse((obj) => {
          if ((obj as THREE.Mesh).isMesh) {
            const mesh = obj as THREE.Mesh;
            mesh.geometry?.dispose();
            if (Array.isArray(mesh.material)) {
              mesh.material.forEach((m) => m.dispose());
            } else {
              mesh.material?.dispose();
            }
          }
        });

        composer.dispose();
        renderer.dispose();

        if (audioCtx) audioCtx.close();

        document.body.style.cursor = "default";
      };
    }

    init();

    return () => {
      cleanupRef.current?.();
    };
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <ExperimentBackLink />
      <canvas ref={canvasRef} className="fixed inset-0" />

      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 text-right pointer-events-none">
        <p className="text-muted-foreground text-xs sm:text-sm font-bold italic hidden sm:block">
          click a crystal or press 1–8
        </p>
        <p className="text-muted-foreground text-xs font-bold italic sm:hidden">
          tap a crystal to play
        </p>
      </div>
>>>>>>> Stashed changes
    </div>
  );
}
