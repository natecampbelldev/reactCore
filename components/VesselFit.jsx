import React from "react";

export default function VesselFit({ position, rotation }) {

  return (
    // object
    <mesh name="vessel fitting" position={position} rotation={rotation}>
      <torusGeometry args={[0.366, 0.075, 4, 6]} />
      <meshStandardMaterial color="grey" />
    </mesh>
  );
}
