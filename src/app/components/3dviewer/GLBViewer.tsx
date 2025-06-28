"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Stage } from "@react-three/drei";
// import { Vector3 } from "three";

interface GLBViewerProps {
  path: string;               // public path to .glb (e.g. /models/perfume.glb)
  position?: [number, number, number]; // default [0, 0, 0]
  rotation?: [number, number, number]; // in radians, default [0, 0, 0]
  scale?: number;             // default 1
  autoRotate?: boolean;       // optional auto rotation
}

function Model({
  path,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
}: GLBViewerProps) {
  const { scene } = useGLTF(path);
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <primitive object={scene} />
    </group>
  );
}

export default function GLBViewer(props: GLBViewerProps) {
  return (
    <div className="w-full h-[400px]">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <directionalLight color={"purple"}></directionalLight>
        <Stage environment="night" intensity={0.1}>
          <Model {...props} />
        </Stage>
        <OrbitControls enableZoom={false} autoRotate={props.autoRotate} />
      </Canvas>
    </div>
  );
}