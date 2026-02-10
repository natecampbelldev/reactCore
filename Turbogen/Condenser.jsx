import React, { useState, useMemo } from "react";
import * as THREE from "three";
import { DoubleSide } from "three";
import Vaccuum from "./Vaccuum";
import StraightPipe from "../Pipes/StraightPipe";
import VesselFit from "../components/VesselFit";
import PipeValve from "../Pipes/PipeValve";
import LPipe from "../Pipes/LPipe";
import WaterPump from "../components/WaterPump";

export default function Condenser({ position, rotation, vacPower }) {
  return (
    // object
    <object3D position={position} rotation={rotation}>
      {/* vaccuum pump */}
      <Vaccuum
        position={[3.5, 7, 0]}
        rotation={[0, 0, Math.PI / 4]}
        power={vacPower}
      />
      {/*  stands */}
      <Stand />
      {/* condenser vessel */}
      <mesh position={[0, 5, 0]} rotation={[0, 0, Math.PI / -4]}>
        <cylinderGeometry args={[3, 3, 8, 32, 24, false]} />
        <meshStandardMaterial color="white" side={DoubleSide} />
      </mesh>
      <SpiralPipe
        position={[0.5, 5.5, 0.75]}
        rotation={[Math.PI / -2, Math.PI / 5, 0]}
        flowIn={true}
        flowOut={true}
      />
    </object3D>
  );
}

function Stand() {
  // ring geometry
  const ring = useMemo(() => new THREE.TorusGeometry(3.2, 0.15, 12, 24), []);
  //   short legs
  const shortLeg = useMemo(
    () => new THREE.CylinderGeometry(0.1, 0.2, 1.75, 24)
  );
  //   long legs
  const longLeg = useMemo(
    () => new THREE.CylinderGeometry(0.1, 0.2, 5.5, 24),
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
          position={[-1.5, 3.5, 0]}
          rotation={[Math.PI / 2, Math.PI / -4.25, 0]}
        />
        <mesh
          geometry={shortLeg}
          material={standard}
          position={[1, 0.75, 1.5]}
          rotation={[Math.PI / -10, 0, Math.PI / 7]}
        />
        <mesh
          geometry={shortLeg}
          material={standard}
          position={[1, 0.75, -1.5]}
          rotation={[Math.PI / 10, 0, Math.PI / 7]}
        />
      </object3D>
      {/* long legs */}
      <object3D>
        <mesh
          geometry={ring}
          material={standard}
          position={[1.5, 6.5, 0]}
          rotation={[Math.PI / 2, Math.PI / -4.25, 0]}
        />
        <mesh
          geometry={longLeg}
          material={standard}
          position={[4.5, 2.5, 2.5]}
          rotation={[Math.PI / -15, 0, Math.PI / 8]}
        />
        <mesh
          geometry={longLeg}
          material={standard}
          position={[4.5, 2.5, -2.5]}
          rotation={[Math.PI / 15, 0, Math.PI / 8]}
        />
        <Outlet
          position={[-3, 2, 0]}
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
      {/* cold in take */}
      <VesselFit position={[0.7, -9.25, 0.55]} rotation={[Math.PI / 2, 0, 0]} />
      <StraightPipe
        length={5}
        position={[0.7, -10.2, 0.55]}
        rotation={[0, 0, 0]}
      />
      <WaterPump
        position={[0.7, -6.85, 0.55]}
        rotation={[0, 0, 0]}
        power={true}
      />
      <PipeValve
        length={3}
        position={[0.7, -4.6, 0.55]}
        rotation={[0, 0, 0]}
        temp={"cold"}
        flow={flowIn}
      />
      <VesselFit
        position={[0.7, -2.2, 0.55]}
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
      <mesh
        geometry={arch}
        material={standard}
        position={[-0.05, 0.07, -2]}
        rotation={[Math.PI / 24, Math.PI / 24, Math.PI]}
      />
      {/* warm out */}
      <StraightPipe
        length={3}
        position={[1.5, -1, -2.125]}
        rotation={[0, 0, Math.PI / 2]}
      />
      <VesselFit
        position={[2.25, -1, -2.125]}
        rotation={[Math.PI / 2, Math.PI / 3, 0]}
      />
      <LPipe position={[3, -1.75, -2.125]} rotation={[0, 0, 0]} />
      <PipeValve
        length={3}
        position={[3.75, -3.25, -2.125]}
        rotation={[0, 0, 0]}
        temp={"hot"}
        flow={flowOut}
      />
      <StraightPipe
        length={5}
        position={[3.75, -7.25, -2.125]}
        rotation={[0, 0, 0]}
      />
      <VesselFit
        position={[3.75, -9.25, -2.125]}
        rotation={[Math.PI / 2, 0, 0]}
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
        position={[-0.75, 0, -2.25]}
        rotation={[Math.PI / 2, Math.PI / -2, 0]}
        temp={"cold"}
        flow={out}
      />
    </object3D>
  );
}
