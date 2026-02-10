import React, { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Blade({ position, rotation }) {
  // slice of circle for geometry
  const blade = useMemo(
    () => new THREE.CircleGeometry(2, 12, 0, Math.PI / 4.5),
    []
  );
  // double sided grey material
  const standard = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: 0xaaaaaa,
        side: THREE.DoubleSide,
      }),
    []
  );

  return (
    // object
    <mesh
      position={position}
      rotation={rotation}
      geometry={blade}
      material={standard}
    />
  );
}

export default function Turbine({ position, rotation, spray }) {
  
  // spinning animation range of 0 - .33
  const fanRef = useRef();
  useFrame(() => {
    fanRef.current.rotation.z += spray;
  });

  return (
    // object
    <object3D position={position} rotation={rotation} name="fan" ref={fanRef}>
      {/* axis */}
      <mesh name="center" rotation={[Math.PI / 2, 0, 0]}>
        <capsuleGeometry args={[0.25, 0.5, 12, 24]} />
        <meshStandardMaterial color="grey" side={THREE.DoubleSide} />
      </mesh>
      {/* five blades */}
      <Blade
        name="one"
        position={[-0.03, 0, 0]}
        rotation={[-0.25, -0.125, 0]}
      />
      <Blade
        name="two"
        position={[-0.03, -0.03, 0]}
        rotation={[-0.125, -0.25, Math.PI * 0.33]}
      />
      <Blade
        name="three"
        position={[0.03, -0.03, 0]}
        rotation={[0.25, -0.25, Math.PI * 0.66]}
      />
      <Blade
        name="four"
        position={[0.06, 0, 0]}
        rotation={[0.25, -0.125, Math.PI]}
      />
      <Blade
        name="five"
        position={[0.03, 0.03, 0]}
        rotation={[0.125, 0.25, Math.PI * -0.66]}
      />
      <Blade
        name="six"
        position={[-0.03, 0.03, 0]}
        rotation={[-0.25, 0.25, Math.PI * -0.33]}
      />
    </object3D>
  );
}
