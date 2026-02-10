import React from "react";

export default function Cable({ position, rotation, length }) {
  return (
    <object3D position={position} rotation={rotation}>
      <mesh>
        <cylinderGeometry args={[0.05, 0.05, length, 24, 12, false]} />
        <meshStandardMaterial color="darkgrey" />
      </mesh>
    </object3D>
  );
}
