import React from "react";

export default function FloodPipe({position}) {
  return (
    // object
    <object3D name="flood-pipe" position={position}>
      {/* framing */}
      <mesh name='frame'>
        <boxGeometry args={[4, 50, 4, 3, 12, 3]} />
        <meshPhongMaterial wireframe color="white" transparent />
      </mesh>
      {/* pipe */}
      <mesh name='pipe'>
        <cylinderGeometry args={[1.9, 1.9, 50, 24, 25]} />
        <meshPhongMaterial color="black" />
      </mesh>
    </object3D>
  );
}
