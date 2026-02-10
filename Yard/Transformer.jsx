import React, { useMemo } from "react";
import * as THREE from "three";

export default function Transformer({ position, rotation }) {
  return (
    // object
    <object3D name="transformer" position={position} rotation={rotation}>
      {/* main body */}
      <mesh name="body" position={[0, 1, 0]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="darkgrey" />
      </mesh>
      {/* coils on top */}
      <Coil position={[0, 2.5, 0]} />
      {/* details around body */}
      <Edges position={[0, 1, 0]} />
    </object3D>
  );
}

function Ring({ position }) {
  return (
    // object
    <mesh position={position} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[0.125, 0.025, 12, 24]} />
      <meshStandardMaterial color="lightgrey" />
    </mesh>
  );
}

function Coil({ position }) {
  // post geometry
  const post = useMemo(() => new THREE.CylinderGeometry(0.1, 0.1, 1, 18), []);
  // near black material
  const standard = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: 0x333333,
      }),
    []
  );

  return (
    // object
    <object3D position={position}>
      {/* right post */}
      <mesh geometry={post} material={standard} position={[0.55, 0, 0]} />
      {/* right rings */}
      <Ring position={[0.55, -0.4, 0]} />
      <Ring position={[0.55, -0.2, 0]} />
      <Ring position={[0.55, 0, 0]} />
      <Ring position={[0.55, 0.2, 0]} />
      {/* top post */}
      <mesh
        geometry={post}
        material={standard}
        position={[0, 0.4, 0]}
        rotation={[0, 0, Math.PI / 2]}
      />
      {/* transistor on top */}
      <mesh
        name="transistor"
        position={[0, 0.425, 0]}
        rotation={[0, 0, Math.PI / 2]}
      >
        <meshStandardMaterial color="lightgrey" />
        <cylinderGeometry args={[0.175, 0.175, 0.55, 24]} />
      </mesh>
      {/* left post */}
      <mesh geometry={post} material={standard} position={[-0.55, 0, 0]} />
      {/* left ring */}
      <Ring position={[-0.55, -0.4, 0]} />
      <Ring position={[-0.55, -0.2, 0]} />
      <Ring position={[-0.55, 0, 0]} />
      <Ring position={[-0.55, 0.2, 0]} />
    </object3D>
  );
}

function Edges({ position }) {
  // cylinders
  const edge = useMemo(() => new THREE.CylinderGeometry(0.1, 0.1, 2, 18), []);
  // near black material
  const standard = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: 0x333333,
      }),
    []
  );
  return (
    // object
    <object3D position={position}>
      {/* corners */}
      <mesh position={[0.97, 0, 0.97]} geometry={edge} material={standard} />
      <mesh position={[0.97, 0, -0.97]} geometry={edge} material={standard} />
      <mesh position={[-0.97, 0, -0.97]} geometry={edge} material={standard} />
      <mesh position={[-0.97, 0, 0.97]} geometry={edge} material={standard} />
      {/* verticals between */}
      <mesh position={[-0.97, 0, 0.33]} geometry={edge} material={standard} />
      <mesh position={[-0.97, 0, -0.33]} geometry={edge} material={standard} />
      <mesh position={[0.33, 0, 0.97]} geometry={edge} material={standard} />
      <mesh position={[-0.33, 0, 0.97]} geometry={edge} material={standard} />
      <mesh position={[0.97, 0, 0.33]} geometry={edge} material={standard} />
      <mesh position={[0.97, 0, -0.33]} geometry={edge} material={standard} />
      <mesh position={[0.33, 0, -0.97]} geometry={edge} material={standard} />
      <mesh position={[-0.33, 0, -0.97]} geometry={edge} material={standard} />

      {/* top */}
      <mesh
        rotation={[Math.PI / 2, 0, 0]}
        position={[0.97, 0.97, 0]}
        geometry={edge}
        material={standard}
      />
      <mesh
        rotation={[Math.PI / 2, 0, 0]}
        position={[-0.97, 0.97, 0]}
        geometry={edge}
        material={standard}
      />
      <mesh
        rotation={[0, 0, Math.PI / 2]}
        position={[0, 0.97, -0.97]}
        geometry={edge}
        material={standard}
      />
      <mesh
        rotation={[0, 0, Math.PI / 2]}
        position={[0, 0.97, 0.97]}
        geometry={edge}
        material={standard}
      />
      {/* bottom */}
      <mesh
        rotation={[Math.PI / 2, 0, 0]}
        position={[0.97, -0.97, 0]}
        geometry={edge}
        material={standard}
      />
      <mesh
        rotation={[Math.PI / 2, 0, 0]}
        position={[-0.97, -0.97, 0]}
        geometry={edge}
        material={standard}
      />
      <mesh
        rotation={[0, 0, Math.PI / 2]}
        position={[0, -0.97, -0.97]}
        geometry={edge}
        material={standard}
      />
      <mesh
        rotation={[0, 0, Math.PI / 2]}
        position={[0, -0.97, 0.97]}
        geometry={edge}
        material={standard}
      />
    </object3D>
  );
}
