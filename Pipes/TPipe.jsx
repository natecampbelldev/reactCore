import React from "react";
import PipeFit from "../components/PipeFit";
import StraightPipe from "./StraightPipe";
import { DoubleSide } from "three";

export default function TPipe({ position, rotation }) {
  return (
    // object
    <object3D name="t-joint" position={position} rotation={rotation}>
      {/* main section */}
      <StraightPipe
        name="main"
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
        length={2}
      />
      {/* intersection */}
      <mesh
        name="intersect"
        position={[0.5, 0, 0]}
        rotation={[0, 0, Math.PI / 2]}
      >
        <cylinderGeometry args={[0.3, 0.3, 1, 24, 2, true]} />
        <meshStandardMaterial color="darkgrey" side={DoubleSide} />
      </mesh>

      {/* one fitting */}
      <PipeFit
        name="cross-fitting"
        position={[1, 0, 0]}
        rotation={[0, Math.PI /2, 0]}
      />
    </object3D>
  );
}
