"use client";

import * as THREE from "three";
import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";

const o = new THREE.Object3D();

export function ZineEnvironment({
  count = 300,
  speed = 1.5,
  bubbleSize = 0.05,
  opacity = 0.5,
  repeat = true,
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { scene } = useThree();
  const reducedMotion = useReducedMotion();

  const bubbleSpeed = useRef(new Float32Array(count));
  const minSpeed = speed * 0.001;
  const maxSpeed = speed * 0.005;

  const geometry = new THREE.SphereGeometry(bubbleSize, 16, 16);

  const material = new THREE.MeshStandardMaterial({
    transparent: true,
    opacity,
  });

  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) {
      return;
    }

    // create {count} number of bubbles in random locations
    for (let i = 0; i < count; i++) {
      o.position.set(
        gsap.utils.random(-4, 4),
        gsap.utils.random(-4, 4),
        gsap.utils.random(-4, 4),
      );

      // update matrix so that the position is applied
      o.updateMatrix();
      // apply the updated matrix from Object3D to the mesh at index i
      mesh.setMatrixAt(i, o.matrix);

      // set a random bubble speed
      bubbleSpeed.current[i] = gsap.utils.random(minSpeed, maxSpeed);
    }

    mesh.instanceMatrix.needsUpdate = true;
    return () => {
      mesh.geometry.dispose();
      (mesh.material as THREE.Material).dispose();
    };
  }, [count, minSpeed, maxSpeed]);

  // useFrame runs on every animation frame
  useFrame((_state, delta) => {
    if (!meshRef.current) {
      return;
    }

    // tint bubbles with the active atmosphere (the fog colour gsap scrubs
    // per-section) so they blend into the current scene
    const fog = scene.fog as THREE.FogExp2 | null;
    if (fog) material.color.copy(fog.color);

    // freeze the upward drift under prefers-reduced-motion (colour still tracks
    // the atmosphere, that's not motion)
    if (reducedMotion) return;

    // normalise to 60fps so the rise speed is the same on any refresh rate
    const step = delta * 60;

    for (let i = 0; i < count; i++) {
      meshRef.current.getMatrixAt(i, o.matrix);
      o.position.setFromMatrixPosition(o.matrix);
      // move bubble upwards by its speed
      o.position.y += bubbleSpeed.current[i] * step;

      // reset bubble position if it moves off the top of the screen
      if (o.position.y > 4 && repeat) {
        o.position.y = -2; // reset to bottom
        o.position.x = gsap.utils.random(-4, 4);
        o.position.z = gsap.utils.random(0, 8);
      }

      o.updateMatrix();
      meshRef.current.setMatrixAt(i, o.matrix);
    }

    // mark the instance matrix as needing an update, so the new positions of the bubbles are rendered
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, count]}
      position={[0, 0, 0]}
      material={material}
      geometry={geometry}
    ></instancedMesh>
  );
}
