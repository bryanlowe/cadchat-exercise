'use client';

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import CommentPanel from "../CommentPanel";
import SafeHtml from "../SafeHtml";

export default function CubeViewer() {
  const [isCommentPanelOpen, setIsCommentPanelOpen] = useState<boolean>(false);

  const toggleCommentPanel = () => {
    setIsCommentPanelOpen(!isCommentPanelOpen);
  }

  return (
    <Canvas>
        <directionalLight position={[1, 2, 5]} intensity={1} />
        <mesh position={[0, 0, 0]} rotation={[0.3, 0.5, 0]} onClick={toggleCommentPanel}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="blue" />
        </mesh>
        {isCommentPanelOpen && (
          <SafeHtml position={[0, 2, 0]} center>
            <CommentPanel />
          </SafeHtml>
        )}
    </Canvas>
  )
}