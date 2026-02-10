import React, { useEffect, useState, useMemo } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import Containment from "./Buildings/Containment";
import Boiler from "./Buildings/Boiler";
import TurboGen from "./Buildings/TurboGen";
import Yard from "./Buildings/Yard";
import Storage from "./Buildings/Storage";
import LPipe from "./Pipes/LPipe";
import StraightPipe from "./Pipes/StraightPipe";
import WaterPump from "./components/WaterPump";
import PipeValve from "./Pipes/PipeValve";

export default function Tester() {
  const set = useThree((st) => st.set);
  const myCam = new THREE.PerspectiveCamera(100, 2, 0.1, 1000);
  myCam.position.x = 0;
  myCam.position.y = 30;
  myCam.position.z = 100;
  myCam.lookAt(0, 0, 0);

  set({ shadows: true, camera: myCam });

  return (
    <>
      <directionalLight position={[5, 10, 5]} />
      <ambientLight />
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[200, 200, 5, 5]} />
        <meshBasicMaterial color="blue" side={THREE.DoubleSide} />
      </mesh>
      <Containment position={[0, 0.01, -40]} rotation={[0, 0, 0]} />
      {/* radiated water between buildings */}
      <LPipe position={[9.5, 9.25, -39.85]} rotation={[0, 0, 0]} />
      <StraightPipe
        length={4}
        position={[10.25, 5.5, -39.85]}
        rotation={[0, 0, 0]}
      />
      <PipeValve
        length={2}
        position={[10.25, 2.5, -39.85]}
        rotation={[0, 0, Math.PI]}
        flow={true}
      />
      <LPipe
        position={[10.25, 1.5, -39.1]}
        rotation={[0, Math.PI / 2, Math.PI / -2]}
      />
      <StraightPipe
        length={1}
        position={[10.25, 0.75, -36.1]}
        rotation={[Math.PI / 2, Math.PI / 2, 0]}
      />
      <WaterPump
        position={[10.25, 0.75, -37.35]}
        rotation={[Math.PI / 2, Math.PI / -2, 0]}
        power={true}
      />
      <StraightPipe
        length={1}
        position={[10.25, 0.75, -38.6]}
        rotation={[Math.PI / 2, Math.PI / 2, 0]}
      />
      <LPipe
        position={[11, 0.75, -35.6]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
      />
      <Boiler position={[20.1, 0.01, -35]} rotation={[0, 0, 0]} />
      <TurboGen position={[45, 0.01, 25]} rotation={[0, Math.PI * 1.5, 0]} />
      <Yard position={[50, 0.01, 90]} rotation={[0, 0, 0]} />
      <Storage position={[-50, 0.01, 20]} rotation={[0, Math.PI / 2, 0]} />
    </>
  );
}
