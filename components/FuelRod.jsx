import React, { useMemo } from "react";
import * as THREE from "three";

export default function FuelRod({ position }) {

  const colors = ['lime', 'hotpink', 'violet', 'yellow']
  // geometry
  const fuelRod = useMemo(
    () => new THREE.CylinderGeometry(0.2, 0.2, 10, 12),
    []
  );
  // // green material
  const standardRod = useMemo(
    () => new THREE.MeshStandardMaterial({ color: 0x00ff00 }),
    []
  );

  return (
    // object
    <object3D name="fuel rod" position={position}>
      {/* four rods to make a bundle */}
      <mesh
        name="right back"
        position={[-0.25, 0.01, 0.25]}
        geometry={fuelRod}
        material={standardRod}
      />
      <mesh
        name="left back"
        position={[-0.75, 0.01, 0.25]}
        geometry={fuelRod}
        material={standardRod}
      />
      <mesh
        name="left front"
        position={[-0.75, 0.01, 0.75]}
        geometry={fuelRod}
        material={standardRod}
      />
      <mesh
        name="right front"
        position={[-0.25, 0.01, 0.75]}
        geometry={fuelRod}
        material={standardRod}
      />
    </object3D>
  );
}
