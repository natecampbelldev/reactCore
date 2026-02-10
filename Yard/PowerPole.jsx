import React, { useMemo } from "react";
import * as THREE from "three";

export default function PowerPole({ position, rotation }) {
  const supportGeo = useMemo(
    () => new THREE.CylinderGeometry(0.5, 0.5, 30, 24),
    []
  );
  const standard = useMemo(
    () => new THREE.MeshStandardMaterial({ color: 0x888888 }),
    []
  );

  const post = useMemo(() => new THREE.CylinderGeometry(0.1, 0.1, 2, 12), []);
  const secondary = useMemo(
    () => new THREE.MeshStandardMaterial({ color: 0x000000 }),
    []
  );

  return (
    // entire object
    <object3D name="power-pole" position={position} rotation={rotation}>
      {/* left support */}
      <mesh
        position={[-2, 16.01, 0]}
        rotation={[0, 0, -0.2]}
        geometry={supportGeo}
        material={standard}
      />
      {/* right support */}
      <mesh
        position={[2, 16.01, 0]}
        rotation={[0, 0, 0.2]}
        geometry={supportGeo}
        material={standard}
      />
      {/* top cross */}
      <mesh
        material={standard}
        position={[0, 20.01, 0]}
        rotation={[0, 0, 1.56]}
      >
        <cylinderGeometry args={[0.2, 0.2, 10, 18]} />
      </mesh>
      {/* two attach */}
      <mesh position={[-4.25, 20.01, 0]} geometry={post} material={secondary} />
      <mesh position={[4.25, 20.01, 0]} geometry={post} material={secondary} />
      {/* bottom cross */}
      <mesh
        material={standard}
        position={[0, 17.01, 0]}
        rotation={[0, 0, 1.56]}
      >
        <cylinderGeometry args={[0.2, 0.2, 13, 18]} />
      </mesh>
      {/* four attach */}
      <mesh position={[-5.5, 17.01, 0]} geometry={post} material={secondary} />
      <mesh position={[5.5, 17.01, 0]} geometry={post} material={secondary} />
      <mesh position={[-3.5, 17.01, 0]} geometry={post} material={secondary} />
      <mesh position={[3.5, 17.01, 0]} geometry={post} material={secondary} />
    </object3D>
  );
}
