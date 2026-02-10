import React from "react";
import { DoubleSide } from "three";

export default function WaterPump({ position, rotation, power }) {
  return (
    // entire object
    <object3D name="water-pump" position={position} rotation={rotation}>
      {/* main body */}
      <mesh>
        <cylinderGeometry args={[0.6, 0.6, 1.5, 24]} />
        <meshStandardMaterial color="lightgrey" />
      </mesh>
      {/* power supply */}
      <mesh position={[0, 0.33, 0.66]}>
        <boxGeometry args={[0.33, 0.45, 0.15]} />
        <meshStandardMaterial color="darkgrey" />
      </mesh>
      {/* power light */}
      <mesh position={[0.09, 0.45, 0.725]}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshStandardMaterial color={power ? "lime" : "red"} />
      </mesh>
      {/* wire */}
      <mesh
        position={[-0.15, 0.33, 0.66]}
        rotation={[Math.PI / 2, Math.PI / 6, Math.PI / 5]}
      >
        <torusGeometry args={[0.125, 0.025, 24, 12, Math.PI * 1.175]} />
        <meshStandardMaterial color="black" side={DoubleSide} />
      </mesh>
    </object3D>
  );
}
