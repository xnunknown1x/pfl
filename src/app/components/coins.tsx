"use client";
import { useGLTF } from "@react-three/drei";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom, DepthOfField } from "@react-three/postprocessing";
import * as THREE from "three";

interface CoinChainProps {
  path: string;
  position?: [number, number, number];
  scale?: number;
}

export default function CoinChain({
  path,
  position = [0, 0, 0],
  scale = 1,
}: CoinChainProps) {
  const { scene } = useGLTF(path);
  const coins = Array.from({ length: 9 }, (_, i) => `Circle00${i + 1}`);

  const hoverStates = useRef<Record<string, boolean>>({});
  const coinRefs = useRef<Record<string, THREE.Mesh>>({});
  const [focusPoint] = useState(() => new THREE.Vector3()); // this will update focus dynamically

  // const defaultBlur = true; // when no coin is hovered

  useFrame(() => {
    let anyHovered = false;

    coins.forEach((name, i) => {
      const mesh = coinRefs.current[name];
      if (!mesh) return;

      const targetZ = hoverStates.current[name] ? 0.3 : 0;
      const easing = 0.03 - i * 0.001;
      mesh.rotation.z += (targetZ - mesh.rotation.z) * easing;

      if (hoverStates.current[name]) {
        anyHovered = true;
        // Smoothly follow the hovered coin's world position
        const worldPos = new THREE.Vector3();
        mesh.getWorldPosition(worldPos);
        focusPoint.lerp(worldPos, 0.1); // ease to it
      }
    });

    if (!anyHovered) {
      // Move the focus far away when nothing is hovered (cause blur)
      focusPoint.lerp(new THREE.Vector3(0, 0, -50), 0.1);
    }
  });

  return (
    <>
      {/* 🌟 Lighting */}
      <directionalLight position={[10, 0, 0.6]} intensity={2} castShadow />
      <directionalLight position={[4, 20, 0.6]} intensity={2} castShadow />
      <directionalLight position={[-20, 20, 0.6]} intensity={2} castShadow />
      <ambientLight intensity={1} />

      {/* 💫 Coin Group */}
      <group position={position} scale={scale}>
        {coins.map((name) => {
          const node = scene.getObjectByName(name) as THREE.Mesh;
          if (!node) return null;

          return (
            <primitive
              key={name}
              object={node}
              ref={(el: THREE.Mesh | null) => {
                if (el) coinRefs.current[name] = el;
              }}
              onPointerOver={() => (hoverStates.current[name] = true)}
              onPointerOut={() => (hoverStates.current[name] = false)}
            />
          );
        })}
      </group>

      {/* ✨ Postprocessing Effects */}
        <Bloom
          intensity={0.01}
          luminanceThreshold={0.3}
          luminanceSmoothing={0.8}
          mipmapBlur
        />
    </>
  );
}

useGLTF.preload("/models/Coins.glb");