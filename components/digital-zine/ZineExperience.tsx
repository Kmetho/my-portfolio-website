"use client";

import React, { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  ScrollControls,
  useScroll,
  Html,
  MeshDistortMaterial,
  Float,
  Points,
  PointMaterial,
  Environment,
} from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  Noise,
  Vignette,
  ChromaticAberration,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import { poems } from "@/data/poems";

const SIMPLEX_NOISE_GLSL = `
vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
vec4 mod289(vec4 x){return x-floor(x*(1./289.))*289.;}
vec4 permute(vec4 x){return mod289(((x*34.)+1.)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1./6.,1./3.);
  const vec4 D=vec4(0.,.5,1.,2.);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));
  float n_=.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.+1.;
  vec4 s1=floor(b1)*2.+1.;
  vec4 sh=-step(h,vec4(0.));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);
  m=m*m;
  return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
`;

const SCENE_SPACING = 20; // Distance between each scene on the X axis
const TOTAL_HORIZONTAL_SPAN = (poems.length - 1) * SCENE_SPACING; // Total X distance the camera travels
const MAX_RIPPLES = 24;

// --- 3. CUSTOM WATER SHADER ---
const waterVert = `
  uniform float uTime;
  uniform float uRipples[${MAX_RIPPLES * 3}];
  varying vec2 vUv;
  varying float vHeight;
  ${SIMPLEX_NOISE_GLSL}
  void main() {
    vUv = uv;
    vec3 pos = position;
    // Ambient waves
    float wave = snoise(vec3(pos.xz * 0.8, uTime * 0.3)) * 0.06;
    wave += snoise(vec3(pos.xz * 1.5 + 5.0, uTime * 0.2)) * 0.03;
    // Interactive Ripples
    for (int i = 0; i < ${MAX_RIPPLES}; i++) {
      float rx = uRipples[i * 3];
      float ry = uRipples[i * 3 + 1]; // ry in shader is actually the Z-coord from pointer
      float rt = uRipples[i * 3 + 2];
      float age = uTime - rt;
      if (age > 0.0 && age < 4.0) { // Ripple lasts 4 seconds
        float dist = length(pos.xz - vec2(rx, ry));
        float rippleRadius = age * 2.0;
        // Dampen ripple over distance and age
        float ripple = sin((dist - rippleRadius) * 8.0) * exp(-dist * 0.8) * exp(-age * 1.0) * 0.15;
        wave += ripple;
      }
    }
    pos.y += wave;
    vHeight = wave;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const waterFrag = `
  varying vec2 vUv;
  varying float vHeight;
  void main() {
    vec3 shallow = vec3(0.85, 0.88, 0.92);
    vec3 deep = vec3(0.70, 0.75, 0.85);
    vec3 highlight = vec3(0.95, 0.96, 0.98);
    float h = vHeight * 8.0; // Scale height for color mixing
    vec3 col = mix(deep, shallow, smoothstep(-0.2, 0.2, h));
    col = mix(col, highlight, smoothstep(0.3, 0.8, h));
    
    // Softer fade at the edges
    float edgeFactor = 1.0;
    edgeFactor *= smoothstep(0.0, 0.1, vUv.x); // Fade in from left
    edgeFactor *= smoothstep(1.0, 0.9, vUv.x); // Fade out to right
    edgeFactor *= smoothstep(0.0, 0.3, vUv.y); // Fade in from bottom
    edgeFactor *= smoothstep(1.0, 0.7, vUv.y); // Fade out to top
    
    gl_FragColor = vec4(col, 0.5 * edgeFactor); // Base opacity 0.5
  }
`;

// --- 4. SCENE ENVIRONMENT & CONTROLLER (Background, Fog, Water, Particles) ---
function EnvironmentLayer() {
  const { camera, scene, clock } = useThree();
  const scroll = useScroll();

  const bgMatRef = useRef<THREE.ShaderMaterial>(null!);
  const waterMatRef = useRef<THREE.ShaderMaterial>(null!);
  const ripplesRef = useRef(new Float32Array(MAX_RIPPLES * 3).fill(-999));
  const rippleIndexRef = useRef(0); // Use ref for persistent index

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const offset = scroll.offset;

    // Camera moves horizontally as we scroll vertically
    camera.position.x = THREE.MathUtils.damp(
      camera.position.x,
      offset * TOTAL_HORIZONTAL_SPAN,
      4,
      delta,
    );

    // Update Shaders
    if (bgMatRef.current) {
      bgMatRef.current.uniforms.uTime.value = t;
      bgMatRef.current.uniforms.uScroll.value = offset;
    }
    if (waterMatRef.current) {
      waterMatRef.current.uniforms.uTime.value = t;
      waterMatRef.current.uniforms.uRipples.value = ripplesRef.current;
    }

    // Dynamic Fog (FIXED: Robust clamping for poem index)
    const normalizedScroll = offset * (poems.length - 1); // 0 to poems.length-1
    const currentPoemIndex = Math.min(
      Math.floor(normalizedScroll),
      poems.length - 1,
    );
    const nextPoemIndex = Math.min(currentPoemIndex + 1, poems.length - 1);
    const lerpFactor = normalizedScroll - currentPoemIndex;

    const c1 = new THREE.Color(poems[currentPoemIndex].atmosphere.fogColor);
    const c2 = new THREE.Color(poems[nextPoemIndex].atmosphere.fogColor);
    const currentFogColor = c1.lerp(c2, lerpFactor);

    if (!scene.fog) scene.fog = new THREE.Fog(currentFogColor.getHex(), 8, 25);
    (scene.fog as THREE.Fog).color.copy(currentFogColor);
  });

  // Handle water ripple creation
  const handleWaterTouch = (e: any) => {
    e.stopPropagation();
    // e.point gives the 3D intersection point on the water plane
    const x = e.point.x;
    const z = e.point.z; // This is the 'y' coordinate in the water shader
    const t = clock.getElapsedTime();

    const i = rippleIndexRef.current;
    ripplesRef.current[i * 3] = x;
    ripplesRef.current[i * 3 + 1] = z;
    ripplesRef.current[i * 3 + 2] = t;

    rippleIndexRef.current = (i + 1) % MAX_RIPPLES;
  };

  // Subtle Particles (Dust)
  const particles = useMemo(() => {
    const p = new Float32Array(300 * 3);
    for (let i = 0; i < 300; i++) {
      p[i * 3] = (Math.random() - 0.5) * 60;
      p[i * 3 + 1] = (Math.random() - 0.5) * 40;
      p[i * 3 + 2] = (Math.random() - 0.5) * 30 - 5;
    }
    return p;
  }, []);

  return (
    <>
      {/* 1. Scrolling Watercolor Background Plane */}
      <mesh position={[0, 0, -15]} scale={[100, 50, 1]}>
        {" "}
        {/* Covers a wide area */}
        <planeGeometry />
        <shaderMaterial
          ref={bgMatRef}
          depthWrite={false}
          uniforms={{ uTime: { value: 0 }, uScroll: { value: 0 } }}
          vertexShader={`varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`}
          fragmentShader={`
            uniform float uTime;
            uniform float uScroll;
            varying vec2 vUv;
            ${SIMPLEX_NOISE_GLSL}
            void main(){
              vec2 p = vUv * 3.0;
              float n1 = snoise(vec3(p * 0.8, uTime * 0.15)) * 0.5 + 0.5;
              float n2 = snoise(vec3(p * 1.5 + 10.0, uTime * 0.1 + uScroll * 2.0)) * 0.5 + 0.5;
              
              vec3 c1 = vec3(0.88, 0.87, 0.82); // Warm cream
              vec3 c2 = vec3(0.82, 0.78, 0.85); // Lavender
              vec3 c3 = vec3(0.78, 0.82, 0.80); // Sage
              vec3 c4 = vec3(0.75, 0.80, 0.88); // Ice blue
              
              vec3 pal1 = mix(c1, c2, smoothstep(0.0, 0.25, uScroll));
              vec3 pal2 = mix(pal1, c4, smoothstep(0.2, 0.5, uScroll));
              vec3 pal3 = mix(pal2, c3, smoothstep(0.45, 0.75, uScroll));
              vec3 baseColor = mix(pal3, c1, smoothstep(0.7, 1.0, uScroll));
              
              vec3 col = mix(baseColor, baseColor * 0.9, n1 * 0.3);
              col = mix(col, baseColor * 1.05, n2 * 0.2);
              col += snoise(vec3(vUv * 500.0, uTime * 5.0)) * 0.01; 
              
              gl_FragColor = vec4(col, 1.0);
            }
          `}
        />
      </mesh>

      {/* 2. Interactive Water Plane - Positioned lower but visible */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -3.5, 0]} // Slightly lower to be distinct, but within camera view
        onPointerMove={(e) => e.buttons > 0 && handleWaterTouch(e)}
        onPointerDown={handleWaterTouch}
      >
        <planeGeometry args={[TOTAL_HORIZONTAL_SPAN + 60, 25, 256, 64]} />{" "}
        {/* Wider to cover full scroll */}
        <shaderMaterial
          ref={waterMatRef}
          transparent
          depthWrite={false}
          uniforms={{
            uTime: { value: 0 },
            uRipples: { value: ripplesRef.current },
          }}
          vertexShader={waterVert}
          fragmentShader={waterFrag}
        />
      </mesh>

      {/* 3. Subtle Warm Dust Particles */}
      <Points positions={particles}>
        <PointMaterial
          transparent
          color="#b8b0a8"
          size={0.015}
          sizeAttenuation
          depthWrite={false}
          opacity={0.25}
        />
      </Points>
    </>
  );
}

// --- 5. THE ORGANIC SHAPES & TEXTS ---
function OrganicClusters({ poem, index }: { poem: any; index: number }) {
  const groupRef = useRef<THREE.Group>(null!);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[index * SCENE_SPACING, 0, -4]}>
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        {/* Main Shape */}
        <mesh position={[-1, 0.5, 0]}>
          <icosahedronGeometry args={[1.2, 32]} />
          <MeshDistortMaterial
            color="#ffffff"
            transparent
            opacity={0.35}
            distort={0.45}
            speed={2}
            roughness={0.2}
            transmission={0.8}
            thickness={1}
          />
        </mesh>
        {/* Companion smaller shape */}
        <mesh position={[1.5, -0.5, -1]} scale={0.6}>
          <icosahedronGeometry args={[1, 32]} />
          <MeshDistortMaterial
            color={poem.bgColor}
            transparent
            opacity={0.4}
            distort={0.5}
            speed={3}
          />
        </mesh>
      </Float>

      {/* HTML Text Overlay */}
      <Html
        position={[0, 0, 3]}
        center
        className="pointer-events-none w-[90vw] max-w-150 text-center"
      >
        {poem.isCover ? (
          <h1
            className="text-5xl md:text-7xl font-serif italic font-light tracking-wide drop-shadow-sm mb-4"
            style={{ color: poem.textColor }}
          >
            {poem.title}
          </h1>
        ) : (
          <h2
            className="text-3xl md:text-4xl font-serif italic mb-6 tracking-tight drop-shadow-sm"
            style={{ color: poem.textColor }}
          >
            {poem.title}
          </h2>
        )}
        <p
          className="text-lg md:text-xl font-light leading-relaxed whitespace-pre-line opacity-80"
          style={{ color: poem.textColor }}
        >
          {poem.text}
        </p>
      </Html>
    </group>
  );
}

// --- 6. MAIN APP SETUP ---
export default function ZineExperience() {
  return (
    <div className="w-full h-screen bg-[#e0ddd2] overflow-hidden font-sans">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 2]}>
        <Suspense
          fallback={
            <Html center>
              <span className="text-gray-500 tracking-widest text-sm uppercase">
                loading ethereal space...
              </span>
            </Html>
          }
        >
          {/* Soft Lighting Setup */}
          <ambientLight intensity={0.8} color="#ffffff" />
          <directionalLight
            position={[5, 5, 5]}
            intensity={0.8}
            color="#ffffff"
          />
          <directionalLight
            position={[-3, -2, 4]}
            intensity={0.4}
            color="#d8cce8"
          />
          <pointLight position={[0, 3, 3]} intensity={0.8} color="#e8a0b8" />
          <Environment preset="city" />

          {/* Scrolling via height creates the horizontal camera pan! */}
          <ScrollControls pages={poems.length} damping={0.2} distance={1.2}>
            <EnvironmentLayer />
            {poems.map((poem, i) => (
              <OrganicClusters key={poem.id} poem={poem} index={i} />
            ))}
          </ScrollControls>

          {/* Ethereal Post-Processing */}
          <EffectComposer enableNormalPass={false} multisampling={0}>
            <Bloom
              luminanceThreshold={0.85}
              luminanceSmoothing={0.9}
              intensity={0.3}
              mipmapBlur
            />
            <ChromaticAberration offset={new THREE.Vector2(0.0003, 0.0003)} />
            <Noise opacity={0.08} blendFunction={BlendFunction.SOFT_LIGHT} />
            <Vignette eskil={false} offset={0.4} darkness={0.35} />
          </EffectComposer>
        </Suspense>
      </Canvas>

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 pointer-events-none text-[#4a4050]/40 text-xs tracking-widest uppercase">
        Drag/Click water to touch • Scroll to flow
      </div>
    </div>
  );
}
