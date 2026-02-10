import React, { useState, useMemo } from "react";
import * as THREE from "three";
import { DoubleSide } from "three";
import VesselFit from "../components/VesselFit";
import PipeValve from "../Pipes/PipeValve";
import StraightPipe from "../Pipes/StraightPipe";
import LPipe from "../Pipes/LPipe";

// steam control vessel
export default function SteamVessel({ position, rotation }) {
  return (
    // object
    <object3D name="steam-vessel" position={position} rotation={rotation}>
      {/* stand */}
      <Stand position={[0, 2.575, 0]} rotation={[0, Math.PI / 4, 0]} />

      {/* tank */}
      <mesh onClick={opener} name="tank" position={[0, 7.5, 0]}>
        <cylinderGeometry args={[2.5, 2.5, 12, 32, 12, false]} />
        <meshStandardMaterial color="white" side={DoubleSide} />
      </mesh>

      {/* Rad Water */}
      <RadiatedPipe position={[-1, 6.5, 0]} rotation={[0, 0, 0]} />
      {/* Clean Water */}
      <WaterCycle rotation={[0, Math.PI / -2, 0]} />
    </object3D>
  );
}

// a stand for the tank
function Stand({ position, rotation }) {
  // black material
  const standard = useMemo(
    () => new THREE.MeshStandardMaterial({ color: 0x444444 }),
    []
  );
  //   leg geometry
  const leg = useMemo(() => new THREE.CylinderGeometry(0.25, 0.25, 3, 12), []);
  return (
    // object
    <object3D name="frame" position={position} rotation={rotation}>
      {/* ring */}
      <mesh
        name="ring"
        material={standard}
        position={[0, 0, 0]}
        rotation={[1.56, 0, 0]}
      >
        <torusGeometry args={[2.71, 0.2, 16, 32]} />
      </mesh>
      {/* legs */}
      <mesh
        name="right-leg"
        geometry={leg}
        material={standard}
        position={[3.45, -1.5, 0]}
        rotation={[0, 0, Math.PI / 6]}
      />
      <mesh
        name="left-leg"
        geometry={leg}
        material={standard}
        position={[-3.45, -1.5, 0]}
        rotation={[0, 0, Math.PI / -6]}
      />
      <mesh
        name="front-leg"
        geometry={leg}
        material={standard}
        position={[0, -1.5, 3.45]}
        rotation={[Math.PI / -6, 0, 0]}
      />
      <mesh
        name="back-leg"
        geometry={leg}
        material={standard}
        position={[0, -1.5, -3.45]}
        rotation={[Math.PI / 6, 0, 0]}
      />
    </object3D>
  );
}

function WaterCycle({ rotation }) {
  return (
    <object3D rotation={rotation}>
      {/* cold in */}
      <VesselFit
        name="cold intake"
        position={[2.55, 3.75, 0]}
        rotation={[0, Math.PI / 2, 0.5]}
      />
      <PipeValve
        position={[4, 3.75, 0]}
        rotation={[0, 0, Math.PI / 2]}
        length={3}
        flow={true}
        temp="cold"
      />
      <StraightPipe
        length={5}
        position={[8, 3.75, 0]}
        rotation={[0, 0, Math.PI / 2]}
      />
      <VesselFit
        name="steam output"
        position={[8, 3.75, 0]}
        rotation={[0, Math.PI / 2, 0]}
      />
      {/* steam out */}
      <VesselFit
        position={[1.25, 13.5, 0]}
        rotation={[Math.PI / 2, 0, 0.5]}
      />
      <LPipe position={[2, 13.5, 0]} rotation={[0, 0, Math.PI / 2]} />
      <PipeValve
        name="steam out"
        position={[3.5, 14.25, 0]}
        rotation={[0, 0, Math.PI / 2]}
        length={3}
        flow={true}
        temp="hot"
      />
      <StraightPipe
        length={5}
        position={[7.5, 14.25, 0]}
        rotation={[0, 0, Math.PI / 2]}
      />
      <VesselFit
        name="steam-output"
        position={[8, 14.25, 0]}
        rotation={[0, Math.PI / 2, 0]}
      />
    </object3D>
  );
}

function RadiatedPipe({ position, rotation }) {
  return (
    <object3D position={position} rotation={rotation}>
      {/* hot rad in */}
      <VesselFit
        name="rad-intake"
        position={[-1.5, 2.75, 0]}
        rotation={[0, Math.PI / 2, 0]}
      />
      <PipeValve
        name="hot-in"
        position={[-2.55, 2.75, 0]}
        rotation={[0, 0, Math.PI / 2]}
        length={3}
        flow={true}
        temp="hot"
      />
      <VesselFit position={[-7.05, 2.75, 0]} rotation={[0, Math.PI / 2, 0]} />
      <StraightPipe
        name="rad intake"
        length={4.5}
        position={[-6.3, 2.75, 0]}
        rotation={[0, 0, Math.PI / 2]}
      />
      {/* circulation */}
      <LPipe position={[-1.05, 3.5, 0]} rotation={[0, 0, Math.PI / -2]} />
      <mesh position={[0.425, 3.5, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.75, 0.3, 24, 32, Math.PI]} />
        <meshStandardMaterial color="darkgrey" />
      </mesh>
      <StraightPipe
        position={[1.175, -0.75, 0]}
        rotation={[0, 0, 0]}
        length={8.5}
      />
      {/* cool rad out */}
      <VesselFit
        name="rad-output"
        position={[1.15, -5, 0]}
        rotation={[Math.PI / 2, 0, 0.25]}
      />
      <LPipe position={[0.3, -5, 0.175]} rotation={[0, 0, Math.PI / -2]} />
      <StraightPipe
        name="rad return"
        length={3}
        position={[-1.25, -5.75, 0.175]}
        rotation={[0, 0, Math.PI / 2]}
      />
      <PipeValve
        name="cooled-out"
        position={[-5.5, -5.75, 0.175]}
        rotation={[0, 0, Math.PI / -2]}
        length={5.5}
        flow={true}
        temp="cold"
      />
      <VesselFit position={[-7, -5.75, 0.175]} rotation={[0, Math.PI / 2, 0]} />
    </object3D>
  );
}
