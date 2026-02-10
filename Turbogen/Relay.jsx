import React, { useMemo } from "react";
import * as THREE from "three";
import { DoubleSide } from "three";
import Cable from "../components/Cable";
import CableTurn from "../components/CableTurn";

export default function Relay({ position, rotation }) {
  const support = useMemo(
    () => new THREE.CylinderGeometry(0.2, 0.2, 4, 24, 12, false),
    []
  );
  const wire = useMemo(
    () => new THREE.CylinderGeometry(0.15, 0.15, 6, 24, 12, false),
    []
  );
  const standard = useMemo(
    () => new THREE.MeshStandardMaterial({ color: 0x555555 }),
    []
  );

  return (
    <object3D position={position} rotation={rotation}>
      {/* left support */}
      <mesh
        geometry={support}
        material={standard}
        name="left support front"
        position={[2.5, 1.9, 0.575]}
        rotation={[Math.PI / -6, 0, 0]}
      />
      <mesh
        geometry={support}
        material={standard}
        name="left support back"
        position={[2.5, 1.9, -0.575]}
        rotation={[Math.PI / 6, 0, 0]}
      />

      {/* cross beams */}
      <mesh
        geometry={wire}
        material={standard}
        name="cross beam bottom"
        position={[0, 2.5, 0]}
        rotation={[0, 0, Math.PI / 2]}
      />
      <mesh
        geometry={wire}
        material={standard}
        name="cross beam top"
        position={[0, 3.3, 0]}
        rotation={[0, 0, Math.PI / 2]}
      />

      {/* right support */}
      <mesh
        geometry={support}
        material={standard}
        name="right support front"
        position={[-2.5, 1.9, 0.575]}
        rotation={[Math.PI / -6, 0, 0]}
      />
      <mesh
        geometry={support}
        material={standard}
        name="right support back"
        position={[-2.5, 1.9, -0.575]}
        rotation={[Math.PI / 6, 0, 0]}
      />
      {/* conduit w/ cables */}
      <mesh position={[0, 0, -1.1]} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[0.5, 0.3, 16, 12, Math.PI / 2.5]} />
        <meshStandardMaterial color="grey" side={DoubleSide} />
      </mesh>

      {/* <Cable position={[0.45, 2, -.66]} rotation={[Math.PI / 8, 0, Math.PI/ -18]} length={5} /> */}
      <object3D
        name="cable right"
        position={[0.35, 1.6, -.9]}
        rotation={[Math.PI / 8, 0, Math.PI / -18]}
      >
        <Cable
          name="from roof"
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          length={3.9}
        />
        <CableTurn position={[0, 1.95, 0.2]} rotation={[0, Math.PI / 2, 0]} />
        <Cable
          name="to right"
          position={[0, 3.385, 2.29]}
          rotation={[Math.PI / 3, 0, 0]}
          length={5}
        />
      </object3D>
      <object3D
        name="cable left"
        position={[-0.35, 1.225, -.9]}
        rotation={[Math.PI / 7, 0, Math.PI / 18]}
      >
        <Cable
          name="from roof"
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          length={3}
        />
        <CableTurn position={[0, 1.5, 0.2]} rotation={[0, Math.PI / 2, 0]} />
        <Cable
          name="to left"
          position={[0, 2.9125, 2.25]}
          rotation={[Math.PI / 3, 0, 0]}
          length={5}
        />
      </object3D>
    </object3D>
  );
}
