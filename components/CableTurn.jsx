import React from "react";

export default function CableTur({ position, rotation }) {
  return (
    <object3D position={position} rotation={rotation}>
      <mesh>
        <torusGeometry args={[0.2, 0.05, 16, 12, Math.PI / 2.5]} />
        <meshStandardMaterial color="darkgrey" />
      </mesh>
    </object3D>
  );
}
