'use client';

import { Canvas } from "@react-three/fiber";

export default function Cube() {
  return (
    <div className="w-full h-screen">
      <Canvas>
        <directionalLight position={[1, 2, 5]} intensity={1} />
        <mesh position={[0, 0, 0]} rotation={[0.3, 0.5, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="blue" />
        </mesh>
      </Canvas>
    </div>
  )
}

