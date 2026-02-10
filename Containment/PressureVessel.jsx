import React, { useState, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { DoubleSide, TextureLoader } from "three";
import { useLoader, useFrame } from "@react-three/fiber";
import Assembly from "./Assembly";
import VesselFit from "../components/VesselFit";
import PipeValve from "../Pipes/PipeValve";
import StraightPipe from "../Pipes/StraightPipe";

export default function PressureVessel({ position, rotation, shields }) {
  // open the vessel state
  const [open, setOpen] = useState(1.6);
  // shielding control state (0 to -7)
  const [exposure, setExposure] = useState(0);

  useEffect(() => {
    setExposure(shields + 2.2);
  }, [shields]);

  // open vessel function
  const opener = () => {
    if (open === 2) {
      setOpen(1.6);
    } else {
      setOpen(2);
    }
  };

  const waterRef = useRef();
  useFrame(({ clock }) => {
    waterRef.current.rotation.y = Math.sin(clock.getElapsedTime());
  });

  return (
    <object3D position={position} rotation={rotation}>
      {/* base */}
      <mesh position={[0, 4, 0]}>
        <cylinderGeometry args={[4.25, 4.5, 9, 32]} />
        <meshStandardMaterial color="darkgrey" side={DoubleSide} />
      </mesh>

      {/* vessel */}
      <mesh position={[0, 14.51, 0]} onClick={opener}>
        <cylinderGeometry
          args={[4, 4, 12, 32, 24, false, 0.6, Math.PI * open]}
        />
        <meshStandardMaterial color="white" side={DoubleSide} />
      </mesh>

      {/* to-from steamer */}
      <RadPipes
        position={[4, 14.5, 0]}
        rotation={[0, Math.PI / -5, 0]}
        radOut={true}
        radIn={true}
      />

      {/* to-from reserves */}
      <ReservePipes
        position={[-3.5, 14.5, -2]}
        rotation={[0, Math.PI / -5, 0]}
        resIn={true}
        resOut={true}
      />

      {/* fuel shields w/ temperature controls */}
      <Shielding position={[0, 12.01, 0]} exposed={exposure} />

      {/* water */}
      <RadWater position={[0, 14, 0]} animator={waterRef} />
    </object3D>
  );
}

// fuel shields
function Shielding({ position, exposed }) {
  const plane = useMemo(() => new THREE.PlaneGeometry(4.25, 10, 8), []);
  const standard = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: 0x777777,
        side: THREE.DoubleSide,
      }),
    []
  );

  return (
    // object
    <object3D position={position}>
      {/* guard shields */}
      <object3D position={[0, exposed, 0]}>
        <mesh
          name="left parallel"
          position={[-1.05, -10.2, 0]}
          rotation={[0, Math.PI / 2, 0]}
          geometry={plane}
          material={standard}
        />
        <mesh
          name="center parallel"
          position={[0, -10.2, 0]}
          rotation={[0, Math.PI / 2, 0]}
          geometry={plane}
          material={standard}
        />
        <mesh
          name="right parallel"
          position={[1.05, -10.2, 0]}
          rotation={[0, Math.PI / 2, 0]}
          geometry={plane}
          material={standard}
        />
        <mesh
          name="center perpindicular"
          position={[0, -10.2, 0]}
          geometry={plane}
          material={standard}
        />
        <mesh
          name="front perpindicular"
          position={[0, -10.2, 1.05]}
          geometry={plane}
          material={standard}
        />
        <mesh
          name="back perpindicular"
          position={[0, -10.2, -1.05]}
          geometry={plane}
          material={standard}
        />
        <mesh position={[0, -10.2, 0]}>
          <boxGeometry args={[4.25, 10.25, 4.25]} />
          <meshStandardMaterial color="grey" />
        </mesh>
      </object3D>
      {/* Fuel Source */}
      <Assembly position={[-1, 0, 1]} />
      <Assembly position={[-1, 0, -1]} />
      <Assembly position={[1, 0, 1]} />
      <Assembly position={[1, 0, -1]} />
    </object3D>
  );
}

// radiation water
function RadWater({ position, rotation, animator }) {
  // texture
  const waterX = useLoader(TextureLoader, "/images/Water_1_M_Normal.jpg");

  return (
    // object
    <mesh position={position} rotation={rotation} ref={animator}>
      <cylinderGeometry args={[3.975, 3.975, 10.5, 32, 21]} />
      <meshBasicMaterial color="aqua" map={waterX} transparent opacity={0.4} />
    </mesh>
  );
}

// radiation water pipes
function RadPipes({ position, rotation, radOut, radIn }) {
  return (
    // object
    <object3D position={position} rotation={rotation}>
      {/* radiated outlet */}
      <object3D>
        <VesselFit
          name="radiated out fitting"
          position={[0.8, 2.5, 2.5]}
          rotation={[0, Math.PI / 2, Math.PI / 2]}
        />
        <PipeValve
          name="hot radiated outlet"
          position={[2.25, 2.5, 2.5]}
          rotation={[0, 0, Math.PI / -2]}
          length={3}
          flow={radOut}
          temp="hot"
        />
        <StraightPipe
          name="outside hot"
          length={3.5}
          position={[5, 2.5, 2.5]}
          rotation={[0, 0, Math.PI / 2]}
        />
        <VesselFit position={[5.75, 2.5, 2.5]} rotation={[0, Math.PI / 2, 0]} />
      </object3D>

      {/* radiated intake */}
      <object3D>
        <VesselFit
          name="cooled radiated intake"
          position={[0.8, -4.5, 2.5]}
          rotation={[0, Math.PI / 2, Math.PI / 2]}
        />
        <PipeValve
          name="radiated in fitting"
          position={[2.25, -4.5, 2.5]}
          rotation={[0, 0, Math.PI / -2]}
          length={3}
          flow={radIn}
          temp="cold"
        />
        <StraightPipe
          name="outside cooled"
          length={3.25}
          position={[5.4, -4.5, 2.5]}
          rotation={[0, 0, Math.PI / 2]}
        />
        <VesselFit
          name="cooled radiated intake"
          position={[5.75, -4.5, 2.5]}
          rotation={[0, Math.PI / 2, 0]}
        />
      </object3D>
    </object3D>
  );
}

// reserve water pipes
function ReservePipes({ position, rotation, resIn, resOut }) {
  return (
    <object3D position={position} rotation={rotation}>
      {/* water intake */}
      <object3D>
        <VesselFit
          name="res out fitting"
          position={[0, 0, -1]}
          rotation={[0, Math.PI / 2, Math.PI / 2]}
        />
        <PipeValve
          name="res outlet"
          position={[-2, 0, -0.75]}
          rotation={[0, 0, Math.PI / 2]}
          length={3}
          flow={resOut}
          temp="cold"
        />
      </object3D>

      {/* water outlet */}
      <object3D>
        <VesselFit
          name="res in fitting"
          position={[0, -3.75, 0]}
          rotation={[0, Math.PI / 2, Math.PI / 2]}
        />
        <PipeValve
          name="res intake"
          position={[-1.5, -3.75, 0]}
          rotation={[0, 0, Math.PI / 2]}
          length={3}
          flow={resIn}
          temp="cold"
        />
      </object3D>
    </object3D>
  );
}
