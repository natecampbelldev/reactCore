import React, { useMemo } from "react";
import * as THREE from "three";
import { DoubleSide } from "three";

export default function Vaccuum({ position, rotation }) {
  const dot = useMemo(() => new THREE.SphereGeometry(0.05, 24, 24), []);
  const arc = useMemo(() => new THREE.TorusGeometry(0.1, 0.05, 12, 12, Math.PI/.5), []);
  const standard = useMemo(
    () => new THREE.MeshStandardMaterial({ color: 0x295563, side: DoubleSide })
  );

  return (
    //  object
    <object3D name="vaccuum" position={position} rotation={rotation}>
      {/* main body */}
      <mesh name="body" rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[0.575, 0.575, 1]} />
        <meshStandardMaterial color="grey" />
      </mesh>
      {/* intake/output */}
      <mesh name="in-out" rotation={[0, 0, Math.PI / -2]} material={standard}>
        <cylinderGeometry
          args={[Math.PI / 10.5, Math.PI / 14.5, 1.5, 24, 2, true]}
        />
      </mesh>
      {/* dots */}
      <mesh
        name="dot1"
        position={[0.3, 0.275, 0]}
        geometry={dot}
        material={standard}
      />
      <mesh
        name="dot2"
        position={[-0.35, 0.275, 0]}
        geometry={dot}
        material={standard}
      />
      {/* wiring */}
      <mesh
        name="wiring"
        position={[0, 0.25, -0.3]}
        rotation={[0, Math.PI / -2, 0]}
        geometry={arc}
        material={standard}
      />
      <mesh
        name="wiring"
        position={[0, 0.25, 0.3]}
        rotation={[0, Math.PI / 2, 0]}
        geometry={arc}
        material={standard}
      />
    </object3D>
  );
}
