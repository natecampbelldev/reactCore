import React from "react";
import PipeFit from "../components/PipeFit";
import { DoubleSide } from "three";

export default function StraightPipe({ position, rotation, length }) {
  return (
    <object3D position={position} rotation={rotation}>
      <PipeFit
        position={[0, length / 2, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh>
        <cylinderGeometry args={[0.3, 0.3, length, 24, 4, true]} />
        <meshStandardMaterial color="darkgrey" side={DoubleSide} />
      </mesh>
      <PipeFit
        position={[0, length / -2, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </object3D>
  );
}
