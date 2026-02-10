import React from "react";

export default function PipeFit({ position, rotation }) {

  return (
    // object
    <mesh name="pipe-fitting"  position={position} rotation={rotation}>
      <torusGeometry args={[Math.PI / 9, 0.04, 4, 6]} />
      <meshStandardMaterial color="grey" />
    </mesh>
  );
}
