import React, { useMemo } from "react";
import * as THREE from "three";

export default function Generator({position, rotation}) {
  return (
    // object
    <object3D name="generator" position={position} rotation={rotation}>
      {/* main body */}
      <mesh
        name="container"
        position={[0, -0.15, 0]}
        rotation={[1.575, 1.565, 0]}
      >
        <cylinderGeometry args={[2.25, 2.25, 10.5, 32, 2, false, 0, Math.PI]} />
        <meshStandardMaterial color="grey" />
      </mesh>
      {/* faces object */}
      <object3D>
        {/* capsule */}
        <mesh
          name="axle-head"
          rotation={[Math.PI / 2, 0, 0]}
          position={[0, 0, 0]}
        >
          <capsuleGeometry args={[0.33, 10.5, 12, 12]} />
          <meshStandardMaterial color="darkgrey" />
        </mesh>
        {/* four planes for detail */}
        <Frame name="front face" position={[0, 0, 5.3]} />
        <Frame name="back face" position={[0, 0, -5.3]} />
      </object3D>
      {/* outer edges */}
      <object3D>
        {/* four down the body */}
        <Ridge name="ridge1" position={[0, 0, 5.25]} />
        <Ridge name="ridge2" position={[0, 0, 2.75]} />
        <Ridge name="ridge3" position={[0, 0, 0]} />
        <Ridge name="ridge4" position={[0, 0, -2.75]} />
        <Ridge name="ridge5" position={[0, 0, -5.25]} />
      </object3D>
    </object3D>
  );
}

function Frame({ position }) {
  // plane geometry
  const beam = useMemo(() => new THREE.PlaneGeometry(0.3, 2, 4, 4), []);
  // black material
  const standard = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: 0x000000,
      }),
    []
  );

  return (
    // object
    <object3D position={position}>
      <mesh
        position={[1.25, 0, 0]}
        rotation={[0, 0, Math.PI / 2]}
        geometry={beam}
        material={standard}
      />
      <mesh
        position={[0.8, 0.8, 0]}
        rotation={[0, 0, Math.PI / -4]}
        geometry={beam}
        material={standard}
      />
      <mesh
        position={[0, 1.2, 0]}
        rotation={[0, 0, 0]}
        geometry={beam}
        material={standard}
      />
      <mesh
        position={[-0.8, 0.8, 0]}
        rotation={[0, 0, Math.PI / 4]}
        geometry={beam}
        material={standard}
      />
      <mesh
        position={[-1.25, 0, 0]}
        rotation={[0, 0, Math.PI / 2]}
        geometry={beam}
        material={standard}
      />
    </object3D>
  );
}

function Ridge({ position }) {
  // torus half
  const ridge = useMemo(
    () => new THREE.TorusGeometry(2.2, 0.1, 24, 32, Math.PI),
    []
  );
  // black geometry
  const standard = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: 0x000000,
      }),
    []
  );
  return (
    // object
    <mesh position={position} geometry={ridge} material={standard} />
  );
}
