import React, { useEffect, useMemo, useState } from "react";
import * as THREE from "three";
import PowerPole from "../Yard/PowerPole";
import Transformer from "../Yard/Transformer";

export default function Yard({ position, rotation }) {
  return (
    <object3D name="fencing" position={position} rotation={rotation}>
      {/* front center */}
      <Gate position={[0, 0, 12]} rotation={[0, 0, 0]} opener={false} />
      {/* front - left */}
      <Wall position={[-24, 0, 12]} rotation={[0, 0, 0]} />
      <Post position={[48, 0, 12]} />
      {/* front - right */}
      <Wall position={[24, 0, 12]} rotation={[0, 0, 0]} />
      <Post position={[-48, 0, 12]} />
      {/* far left */}
      <Wall position={[-48, 0, -12]} rotation={[0, Math.PI / 2, 0]} />
      {/* far right */}
      <Wall position={[48, 0, -12]} rotation={[0, Math.PI / 2, 0]} />
      {/* back- left */}
      <Wall position={[-24, 0, -36]} rotation={[0, 0, 0]} />
      <Post position={[-48, 0, -36]} />
      {/* back-right */}
      <Wall position={[24, 0, -36]} rotation={[0, 0, 0]} />
      <Post position={[48, 0, -36]} />
      <Gate position={[0, 0, -36]} />
      <object3D name="cables"></object3D>

      <object3D name="power lines">
      {/* pole */}
        <PowerPole position={[25, 0, -15]} rotation={[0, Math.PI / -5, 0]} />
        {/* back row transformers */}
        <Transformer position={[-20,0,-10]} rotation={[0,0,0]}/>
        <Transformer position={[-10,0,-10]} rotation={[0,0,0]}/>
        <Transformer position={[0,0,-10]} rotation={[0,0,0]}/>
        <Transformer position={[10,0,-10]} rotation={[0,0,0]}/>
        <Transformer position={[20,0,-10]} rotation={[0,0,0]}/>
        {/* front row transformers */}
        <Transformer position={[-20,0,0]} rotation={[0,0,0]}/>
        <Transformer position={[-10,0,0]} rotation={[0,0,0]}/>
        <Transformer position={[0,0,0]} rotation={[0,0,0]}/>
        <Transformer position={[10,0,0]} rotation={[0,0,0]}/>
        <Transformer position={[20,0,0]} rotation={[0,0,0]}/>
      </object3D>
    </object3D>
  );
}

function Wall({ position, rotation }) {
  return (
    <object3D position={position} rotation={rotation}>
      <Section position={[-12, 0, 0]} />
      <Section position={[12, 0, 0]} />
    </object3D>
  );
}

function Section({ position }) {
  const vert = useMemo(
    () => new THREE.CylinderGeometry(0.25, 0.25, 8, 24, 12, false),
    []
  );
  const zon = useMemo(
    () => new THREE.CylinderGeometry(0.2, 0.2, 24, 24, 12, false),
    []
  );
  const standard = useMemo(
    () => new THREE.MeshStandardMaterial({ color: 0x888888 }),
    []
  );
  return (
    <object3D name="fencing" position={position}>
      <mesh geometry={vert} material={standard} position={[-12, 4, 0]} />
      <mesh geometry={vert} material={standard} position={[12, 4, 0]} />
      <mesh
        geometry={zon}
        material={standard}
        position={[0, 0.25, 0]}
        rotation={[0, 0, Math.PI / 2]}
      />
      <Link width={24} length={8} position={[0, 4, 0]} rotation={[0, 0, 0]} />
      <mesh
        geometry={zon}
        material={standard}
        position={[0, 7.75, 0]}
        rotation={[0, 0, Math.PI / 2]}
      />
    </object3D>
  );
}

function Post({ position }) {
  const standard = useMemo(
    () => new THREE.MeshStandardMaterial({ color: 0x888888 }),
    []
  );
  return (
    <object3D position={position}>
      <mesh position={[0, 8.5, 0]} material={standard}>
        <sphereGeometry args={[0.36, 12, 12]} />
      </mesh>
      <mesh position={[0, 4.125, 0]} material={standard}>
        <cylinderGeometry args={[0.3, 0.3, 8.25, 24, 12, false]} />
      </mesh>
    </object3D>
  );
}

function Link({ width, length, position, rotation }) {
  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={[width, length, 8, 8]} />
      <meshStandardMaterial color="white" side={THREE.DoubleSide} />
    </mesh>
  );
}

function Gate({ position, rotation, opener }) {
  const [left, setLeft] = useState({
    p: [-3.25, 0, 0],
    r: [0, 0, 0],
  });
  const [right, setRight] = useState({
    p: [3.25, 0, 0],
    r: [0, 0, 0],
  });

  const post = useMemo(
    () => new THREE.CylinderGeometry(0.25, 0.25, 12, 24, 12, false),
    []
  );
  const cross = useMemo(
    () => new THREE.CylinderGeometry(0.2, 0.2, 6, 24, 12, false),
    []
  );
  const standard = useMemo(
    () => new THREE.MeshStandardMaterial({ color: 0x888888 }),
    []
  );
  const mid = useMemo(
    () => new THREE.CylinderGeometry(0.25, 0.25, 8, 24, 12, false),
    []
  );
  const long = useMemo(
    () => new THREE.CylinderGeometry(0.25, 0.25, 12.25, 24, 12, false),
    []
  );
  useEffect(() => {
    //   left
    // closed p= [-3.25,0,0] r=[0,0,0]
    // open p= [-6.25,0,3] r=[0,PI/-2,0]
    // right
    // closed p= [3.25,0,0] r=[0,0,0]
    // open p= [6.25,0,3] r=[0,PI/2,0]
    if (opener) {
      setLeft({
        p: [-6.25, 0, 3],
        r: [0, Math.PI / -2, 0],
      });
      setRight({
        p: [6.25, 0, 3],
        r: [0, Math.PI / 2, 0],
      });
    } else {
      setLeft({
        p: [-3.25, 0, 0],
        r: [0, 0, 0],
      });
      setRight({
        p: [3.25, 0, 0],
        r: [0, 0, 0],
      });
    }
  }, [opener]);

  return (
    <object3D position={position} rotation={rotation}>
      {/* archway */}
      <object3D name="archway" position={[0, 9.5, 0]}>
        <mesh
          geometry={long}
          material={standard}
          position={[0, 2.25, 0]}
          rotation={[0, 0, Math.PI / 2]}
        />
        <mesh position={[0, 0.5, 0]}>
          <planeGeometry args={[12, 3.5]} />
          <meshStandardMaterial color={0xeeeeee} />
        </mesh>
        <mesh
          geometry={long}
          material={standard}
          position={[0, -1.25, 0]}
          rotation={[0, 0, Math.PI / 2]}
        />
      </object3D>
      {/* left */}
      {/* closed p= [-3.25,0,0] r=[0,0,0]*/}
      {/* open p= [-6.25,0,3] r=[0,PI/-2,0]  */}
      <object3D name="left gate" position={left.p} rotation={left.r}>
        <mesh
          geometry={post}
          material={standard}
          position={[-3, 6, 0]}
          rotation={[0, 0, 0]}
        />
        <mesh
          geometry={cross}
          material={standard}
          position={[0, 7.75, 0]}
          rotation={[0, 0, Math.PI / 2]}
        />
        <Link
          width={6}
          length={7.5}
          position={[0, 4, 0]}
          rotation={[0, 0, 0]}
        />
        <mesh
          geometry={cross}
          material={standard}
          position={[0, 0.25, 0]}
          rotation={[0, 0, Math.PI / 2]}
        />
        <mesh
          geometry={mid}
          material={standard}
          position={[3, 4, 0]}
          rotation={[0, 0, 0]}
        />
      </object3D>
      {/* right */}
      {/* closed p= [3.25,0,0] r=[0,0,0]*/}
      {/* open p= [6.25,0,3] r=[0,PI/2,0]  */}
      <object3D name="right gate" position={right.p} rotation={right.r}>
        <mesh
          geometry={mid}
          material={standard}
          position={[-3, 4, 0]}
          rotation={[0, 0, 0]}
        />
        <mesh
          geometry={cross}
          material={standard}
          position={[0, 7.75, 0]}
          rotation={[0, 0, Math.PI / 2]}
        />
        <Link
          width={6}
          length={7.5}
          position={[0, 4, 0]}
          rotation={[0, 0, 0]}
        />
        <mesh
          geometry={cross}
          material={standard}
          position={[0, 0.25, 0]}
          rotation={[0, 0, Math.PI / 2]}
        />
        <mesh
          geometry={post}
          material={standard}
          position={[3, 6, 0]}
          rotation={[0, 0, 0]}
        />
      </object3D>
    </object3D>
  );
}
