'use client';

import { Canvas } from "@react-three/fiber";
import CommentPanel from "../CommentPanel";
import SafeHtml from "../SafeHtml";

export default function CubeViewer() {
  return (
    <Canvas>
        <directionalLight position={[1, 2, 5]} intensity={1} />
        <mesh position={[0, 0, 0]} rotation={[0.3, 0.5, 0]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="blue" />
        </mesh>
        <SafeHtml position={[0, 2, 0]} center>
          <CommentPanel />
        </SafeHtml>
    </Canvas>
  )
}