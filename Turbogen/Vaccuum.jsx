import React, { useMemo } from "react";
import * as THREE from "three";
import { DoubleSide } from "three";

export default function Vaccuum({ position, rotation, power }) {
  const dot = useMemo(() => new THREE.SphereGeometry(0.05, 24, 24), []);
  const arc = useMemo(
    () => new THREE.TorusGeometry(0.1, 0.05, 12, 12, Math.PI / 0.5),
    []
  );
  const standard = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "black", side: DoubleSide })
  );
  const light = useMemo(
    () => new THREE.MeshStandardMaterial({ color: power ? 0x00ff00 : 0xff0000 })
  );

  return (
    //  object
    <object3D name="vaccuum" position={position} rotation={rotation}>
      {/* main body */}
      <mesh name="body" rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[0.75, 0.75, 1]} />
        <meshStandardMaterial color="grey" />
      </mesh>
      {/* intake/output */}
      <mesh name="in-out" rotation={[0, 0, Math.PI / -2]} material={standard}>
        <cylinderGeometry
          args={[Math.PI / 10, Math.PI / 14, 1.75, 24, 2, true]}
        />
      </mesh>
      {/* dots */}
      <mesh
        name="dot1"
        position={[0.3, -0.35, 0]}
        geometry={dot}
        material={light}
      />
      <mesh
        name="dot2"
        position={[0.3, 0.35, 0]}
        geometry={dot}
        material={light}
      />
      {/* wiring */}
      <mesh
        name="wiring"
        position={[0.4, 0, -0.4]}
        rotation={[0, Math.PI / -2, 0]}
        geometry={arc}
        material={standard}
      />
      <mesh
        name="wiring"
        position={[0.4, 0, 0.4]}
        rotation={[0, Math.PI / 2, 0]}
        geometry={arc}
        material={standard}
      />
    </object3D>
  );
}
