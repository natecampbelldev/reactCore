import React, { useMemo } from "react";
import * as THREE from "three";
import { DoubleSide } from "three";
import SteamVessel from "../Steamer/SteamVessel";

export default function Boiler({ position, rotation }) {
  const textile = useMemo(() => {
    return new THREE.MeshStandardMaterial({ color: "grey", side: DoubleSide });
  });

  return (
    <object3D position={position} rotation={rotation}>
      <mesh
        name="northWall"
        position={[0, 8, -8]}
        rotation={[0, Math.PI, 0]}
        material={textile}
      >
        <planeGeometry args={[16, 16]} />
      </mesh>
      <mesh
        name="eastWall"
        position={[8, 8, 0]}
        rotation={[0, Math.PI / 2, 0]}
        material={textile}
      >
        <planeGeometry args={[16, 16]} />
      </mesh>
      <mesh
        name="southWall"
        position={[0, 8, 8]}
        rotation={[0, 0, 0]}
        material={textile}
      >
        <planeGeometry args={[16, 16]} />
      </mesh>
      <mesh
        name="westWall"
        position={[-8, 8, 0]}
        rotation={[0, Math.PI / -2, 0]}
        material={textile}
      >
        <planeGeometry args={[16, 16]} />
      </mesh>
      <mesh
        name="roof"
        position={[0, 16, 0]}
        rotation={[Math.PI / -2, 0, 0]}
        material={textile}
      >
        <planeGeometry args={[16, 16]} />
      </mesh>
      <mesh
        name="floor"
        position={[0, 0, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        material={textile}
      >
        <planeGeometry args={[16, 16]} />
      </mesh>
      {/* Steamer */}
      <SteamVessel position={[0, 0, 0]} rotation={[0, 0, 0]} />
    </object3D>
  );
}
