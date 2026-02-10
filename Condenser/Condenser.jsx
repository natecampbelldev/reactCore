import React, { useState, useMemo } from "react";
import * as THREE from "three";
import { DoubleSide } from "three";
import Vaccuum from "./Vaccuum";
import StraightPipe from "../Pipes/StraightPipe";
import VesselFit from "../components/VesselFit";
import PipeValve from "../Pipes/PipeValve";
import LPipe from "../Pipes/LPipe";

export default function Condenser({ position, rotation }) {
  //   open the vessel state
  const [open, setOpen] = useState(2);

  //   open the vessel function
  const opener = () => {
    if (open === 2) {
      setOpen(1.6);
    } else {
      setOpen(2);
    }
  };
  return (
    // object
    <object3D position={position} rotation={rotation}>
      {/* vaccuum pump */}
      <Vaccuum position={[1.66, 6.66, 0]} rotation={[0, 0, Math.PI / 4]} />
      {/*  stands */}
      <Stand />
      {/* condenser vessel */}
      <mesh
        position={[0, 3.875, 0]}
        rotation={[0, 0, Math.PI / -4]}
        onClick={opener}
      >
        <cylinderGeometry
          args={[2.5, 2.5, 6, 32, 24, false, 0.4, Math.PI * open]}
        />
        <meshStandardMaterial color="white" side={DoubleSide} />
        <SpiralPipe
          position={[0.25, 1.25, 0.5]}
          rotation={[Math.PI / -2, 0, 0]}
          flowIn={true}
          flowOut={true}
        />
      </mesh>
    </object3D>
  );
}

function Stand() {
  // ring geometry
  const ring = useMemo(() => new THREE.TorusGeometry(2.7, 0.15, 12, 24), []);
  //   short legs
  const shortLeg = useMemo(
    () => new THREE.CylinderGeometry(0.1, 0.175, 1.78, 24)
  );
  //   long legs
  const longLeg = useMemo(
    () => new THREE.CylinderGeometry(0.1, 0.175, 5.6, 24),
    []
  );
  //   black material
  const standard = useMemo(
    () => new THREE.MeshStandardMaterial({ color: 0x444444 }),
    []
  );
  return (
    <>
      {/* short legs */}
      <object3D>
        <mesh
          geometry={ring}
          material={standard}
          position={[-1.25, 2.55, 0]}
          rotation={[Math.PI / 2, Math.PI / -4.25, 0]}
        />
        <mesh
          geometry={shortLeg}
          material={standard}
          position={[0.4, 0.75, 2.4]}
          rotation={[Math.PI / -10, 0, Math.PI / 7]}
        />
        <mesh
          geometry={shortLeg}
          material={standard}
          position={[0.4, 0.75, -2.4]}
          rotation={[Math.PI / 10, 0, Math.PI / 7]}
        />
      </object3D>
      {/* long legs */}
      <object3D>
        <mesh
          geometry={ring}
          material={standard}
          position={[1.75, 5.65, 0]}
          rotation={[Math.PI / 2, Math.PI / -4.25, 0]}
        />
        <mesh
          geometry={longLeg}
          material={standard}
          position={[4, 2, 2.55]}
          rotation={[Math.PI / -15, 0, Math.PI / 8]}
        />
        <mesh
          geometry={longLeg}
          material={standard}
          position={[4, 2, -2.55]}
          rotation={[Math.PI / 15, 0, Math.PI / 8]}
        />
        <Outlet
        position={[-1.4, 1, 1]}
        rotation={[0, 0, Math.PI / 4]}
        out={true}
        />
      </object3D>
    </>
  );
}

function SpiralPipe({ position, rotation, flowIn, flowOut }) {
  const arch = useMemo(
    () => new THREE.TorusGeometry(1, 0.3, 24, 32, Math.PI / 1.9),
    []
  );
  const standard = useMemo(
    () => new THREE.MeshStandardMaterial({ color: 0xaaaaaa, side: DoubleSide }),
    []
  );

  return (
    <object3D position={position} rotation={rotation}>
      <PipeValve
        length={2}
        position={[0.7, -4.1, 0.55]}
        rotation={[0, 0, 0]}
        temp={"cold"}
        flow={flowIn}
      />
      <VesselFit
        position={[0.7, -1.86, 0.55]}
        rotation={[Math.PI / 2, Math.PI / 15, 0]}
      />
      <StraightPipe
        length={3}
        position={[0.7, -1.6, 0.55]}
        rotation={[0, 0, 0]}
      />
      <mesh
        geometry={arch}
        material={standard}
        position={[-0.25, 0.1, 0.4]}
        rotation={[Math.PI / -36, Math.PI / -24, Math.PI / -12]}
      />
      <mesh
        geometry={arch}
        material={standard}
        position={[-0.1, 0.08, 0.2]}
        rotation={[Math.PI / 24, Math.PI / -24, Math.PI / 2]}
      />
      <mesh
        geometry={arch}
        material={standard}
        position={[-0.1, 0.1, -0.05]}
        rotation={[Math.PI / 24, Math.PI / 24, Math.PI]}
      />
      <mesh
        geometry={arch}
        material={standard}
        position={[0, 0.11, -0.32]}
        rotation={[Math.PI / -24, Math.PI / 24, Math.PI * 1.5]}
      />
      <mesh
        geometry={arch}
        material={standard}
        position={[0, 0.05, -0.57]}
        rotation={[Math.PI / -24, Math.PI / -24, 0]}
      />
      <mesh
        geometry={arch}
        material={standard}
        position={[0, 0.05, -0.82]}
        rotation={[Math.PI / 24, Math.PI / -24, Math.PI / 2]}
      />
      <mesh
        geometry={arch}
        material={standard}
        position={[0, 0.05, -1.1]}
        rotation={[Math.PI / 24, Math.PI / 24, Math.PI]}
      />
      <mesh
        geometry={arch}
        material={standard}
        position={[0, 0.05, -1.35]}
        rotation={[Math.PI / -24, Math.PI / 24, Math.PI * 1.5]}
      />
      <mesh
        geometry={arch}
        material={standard}
        position={[0, 0.05, -1.62]}
        rotation={[Math.PI / -24, Math.PI / -24, 0]}
      />
      <mesh
        geometry={arch}
        material={standard}
        position={[0.2, 0.07, -1.8]}
        rotation={[Math.PI / 36, Math.PI / -24, Math.PI * 0.55]}
      />
      <StraightPipe
        length={3}
        position={[-0.77, -1.66, -1.92]}
        rotation={[0, 0, 0]}
      />
      <VesselFit
        position={[-0.77, -1.95, -1.92]}
        rotation={[Math.PI / 2, Math.PI / -26, 0]}
      />
      <PipeValve
        length={2}
        position={[-0.77, -4.15, -1.92]}
        rotation={[0, 0, 0]}
        temp={"hot"}
        flow={flowOut}
      />
    </object3D>
  );
}

function Outlet({ position, rotation, out }) {
  return (
    <object3D name="outlet" position={position} rotation={rotation}>
      <VesselFit position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
      <LPipe
        position={[0, 0, -0.75]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
      />
      <PipeValve
        length={3}
        position={[-0.725, -0.05, -2.25]}
        rotation={[Math.PI / 2, Math.PI / -2, 0]}
        temp={'cold'}
        flow={out}
      />
    </object3D>
  );
}
