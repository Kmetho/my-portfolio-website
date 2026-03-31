"use client";

import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll } from "@react-three/drei";
import { ZineScene } from "./ZineScene";
import { ZinePostProcessing } from "./ZinePostProcessing";
import { poems } from "@/data/poems";

const TOTAL_PAGES = poems.length + 2;

export default function ZineExperience() {
  return (
    <div className="h-screen w-screen fixed inset-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
      >
        <ScrollControls pages={TOTAL_PAGES} damping={0.25}>
          <ZineScene />

          <Scroll html>
            <ZineDOMContent />
          </Scroll>
        </ScrollControls>

        <ZinePostProcessing />
      </Canvas>
    </div>
  );
}
