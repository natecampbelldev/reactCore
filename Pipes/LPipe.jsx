import React from "react";
import PipeFit from "../components/PipeFit";
import { DoubleSide } from "three";

export default function LPipe({ position, rotation }) {
  return (
    <object3D position={position} rotation={rotation}>
      <PipeFit position={[0.75, 0, 0]} rotation={[Math.PI / 2, 0, 0]} />
      <mesh>
        <torusGeometry args={[0.75, 0.3, 24, 8, Math.PI / 2]} />
        <meshStandardMaterial color="darkgrey" side={DoubleSide} />
      </mesh>
      <PipeFit position={[0, 0.75, 0]} rotation={[0, Math.PI / 2, 0]} />
    </object3D>
  );
}
