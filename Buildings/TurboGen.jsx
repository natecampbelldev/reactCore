import React, { useMemo, useState } from "react";
import * as THREE from "three";
import { DoubleSide } from "three";
import Generator from "../Turbogen/Generator";
import Turbine from "../Turbogen/Turbine";
import Crank from "../components/Crank";
import VesselFit from "../components/VesselFit";
import StraightPipe from "../Pipes/StraightPipe";
import Nozzle from "../Pipes/Nozzle";
import Condenser from "../Turbogen/Condenser";
import Relay from "../Turbogen/Relay";
import LPipe from "../Pipes/LPipe";

export default function TurboGen({ position, rotation, nozzleL, nozzleR }) {
  const textile = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "lightgrey",
      side: DoubleSide,
    });
  });
  const textilePlatform = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "purple",
      side: DoubleSide,
    });
  });

  return (
    <object3D name="turbineBuilding" position={position} rotation={rotation}>
      <mesh
        name="northWall"
        position={[0, 10, -10]}
        rotation={[0, Math.PI, 0]}
        material={textile}
      >
        <planeGeometry args={[40, 20]} />
      </mesh>
      <mesh
        name="southWall"
        position={[0, 10, 10]}
        rotation={[0, 0, 0]}
        material={textile}
      >
        <planeGeometry args={[40, 20]} />
      </mesh>

      <mesh
        name="westWall"
        position={[20, 10, 0]}
        rotation={[0, Math.PI / 2, 0]}
        material={textile}
      >
        <planeGeometry args={[20, 20]} />
      </mesh>
      <mesh
        name="eastWall"
        position={[-20, 10, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        material={textile}
      >
        <planeGeometry args={[20, 20]} />
      </mesh>
      <mesh
        name="roof"
        position={[0, 20, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={textile}
      >
        <planeGeometry args={[40, 20]} />
      </mesh>
      <mesh
        name="floor"
        position={[0, 0, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        material={textile}
      >
        <planeGeometry args={[40, 20]} />
      </mesh>
      <mesh
        name="divider"
        position={[0, 16.5, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        material={textilePlatform}
      >
        <planeGeometry args={[20, 7]} />
      </mesh>
      <Relay position={[17, 20, 4]} rotation={[0, Math.PI / 2.75, 0]} />
      <object3D name="steam nozzles">
        {/* right side from jet perspective */}
        <VesselFit
          position={[-20, 14.25, 3.25]}
          rotation={[0, Math.PI / 2, 0]}
        />
        <StraightPipe
          length={5}
          position={[-18.25, 14.25, 3.25]}
          rotation={[Math.PI / 2, 0, Math.PI / 2]}
        />
        <Nozzle
          position={[-14.75, 14.25, 3.25]}
          rotation={[Math.PI / 2, 0, Math.PI / -2]}
          pressure={nozzleR}
        />
        {/* left side from jet perspective */}
        <VesselFit
          position={[-20, 14.25, -4.25]}
          rotation={[0, Math.PI / 2, 0]}
        />
        <StraightPipe
          length={5}
          position={[-18.25, 14.25, -4.25]}
          rotation={[0, 0, Math.PI / 2]}
        />
        <Nozzle
          position={[-14.75, 14.25, -4.25]}
          rotation={[0, 0, Math.PI / -2]}
          pressure={nozzleL}
        />
      </object3D>
      <object3D name="turbinePlatform" position={[10, 13, 0]}>
        <mesh
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          material={textilePlatform}
        >
          <boxGeometry args={[20, 1, 20]} />
        </mesh>
        <Generator position={[0, 0.6, -3]} rotation={[0, -Math.PI / 2, 0]} />
        <Generator position={[0, 0.6, 3]} rotation={[0, -Math.PI / 2, 0]} />
        <Crank position={[-13.25, 0.55, 3]} rotation={[0, 0, Math.PI / 2]} />
        <Crank position={[-13.25, 0.55, -3]} rotation={[0, 0, Math.PI / 2]} />
        <Turbine
          position={[-21.25, 0.55, 3]}
          rotation={[0, Math.PI / 2, 0]}
          spray={0.15}
        />
        <Turbine
          position={[-21.25, 0.55, -3]}
          rotation={[0, Math.PI / 2, 0]}
          spray={0.15}
        />
      </object3D>
      <Condenser
        position={[0, 0, 0]}
        rotation={[0, Math.PI, 0]}
        vacPower={true}
      />
    </object3D>
  );
}
