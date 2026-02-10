import React from "react";

export default function Crank({ position, rotation }) {
  return (
    <object3D position={position} rotation={rotation}>
      <mesh>
        <cylinderGeometry args={[0.15, 0.15, 15.5, 24, 12, false]} />
        <meshStandardMaterial color="black" />
      </mesh>
    </object3D>
  );
}
