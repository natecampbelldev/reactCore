import React, { useState, useMemo, useEffect } from "react";
import * as THREE from "three";
import StraightPipe from "./StraightPipe";

export default function PipeValve({ position, rotation, flow, temp, length }) {
  return (
    <object3D position={position} rotation={rotation}>
      <StraightPipe position={[0, 0, 0]} rotation={[0, 0, 0]} length={length} />
      <Valve position={[0, length / 3, 0]} flow={flow} temp={temp} />
    </object3D>
  );
}

//   flow was originally designed to be a boolean sent down the tree
function Valve({ position, flow, temp }) {
  //   stopper boxes
  const block = useMemo(() => new THREE.BoxGeometry(0.085, 0.075, 0.033), []);
  //   black material
  const standard = useMemo(
    () => new THREE.MeshStandardMaterial({ color: 0x555555 }),
    []
  );
  //   grey material
  const secondary = useMemo(
    () => new THREE.MeshStandardMaterial({ color: 0x888888 }),
    []
  );

  //   handle positioning state
  const [handle, setHandle] = useState({
    p: [0, 0.55, 0.4],
    r: [1.55, 0, 1.55],
  });

  //  reads the flow state to update the positioning state
  useEffect(() => {
    setHandle(
      flow
        ? {
            // true = on
            p: [0, 0.5, 0.18],
            r: [1.55, 0, 0],
          }
        : {
            // false = off
            p: [-0.15, 0.5, 0.033],
            r: [1.55, 0, 1.55],
          }
    );
  }, [flow]);

  const changeFlow = () => {
    // send this up the tree to add to the DAQ
  };

  return (
    // entire object
    <object3D
      name="valve"
      onClick={changeFlow}
      position={position}
      rotation={[Math.PI / 2, 0, 0]}
    >
      {/* ring around pipe */}
      <mesh name="ring" material={secondary}>
        <torusGeometry args={[0.35, Math.PI / 50, 8, 8]} />
      </mesh>
      {/* frame */}
      <mesh name="frame" material={secondary} position={[0, 0.45, 0.02]}>
        <cylinderGeometry args={[0.1, 0.175, 0.1]} />
      </mesh>
      {/* closed stopper */}
      <mesh
        name="closed"
        position={[0, 0.525, -0.05]}
        geometry={block}
        material={standard}
      />
      {/* open stopper */}
      <mesh
        name="open"
        position={[0.066, 0.525, 0.033]}
        rotation={[0, 1.56, 0]}
        geometry={block}
        material={standard}
      />
      {/* handle object */}
      {/* on = p[0,.5,.18] r[1.55,0,0] */}
      {/* off = p[-0.15, 0.5, 0.033] r[1.55,0,1.55] */}
      <mesh
        name="handle"
        material={secondary}
        position={handle.p}
        rotation={handle.r}
      >
        {/* hinge */}
        <mesh
          name="pin"
          position={[0, -0.15, -0.025]}
          rotation={[0, 1.56, 0]}
          material={standard}
        >
          <boxGeometry args={[0.05, 0.033, 0.033]} />
        </mesh>
        {/* geometry */}
        <capsuleGeometry args={[0.05, 0.33, 3, 3]} />
        {/* blue grip */}
        <mesh name="grip" position={[0, 0.2, 0]} rotation={[0, 0, 0]}>
          <capsuleGeometry args={[0.06, 0.25, 5, 10]} />
          <meshStandardMaterial color={temp === "hot" ? "red" : "dodgerblue"} />
        </mesh>
      </mesh>
    </object3D>
  );
}
