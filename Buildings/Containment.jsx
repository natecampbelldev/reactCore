import React, { useMemo } from "react";
import * as THREE from "three";
import { DoubleSide } from "three";
import PressureVessel from "../Containment/PressureVessel";
import StraightPipe from "../Pipes/StraightPipe";
import LPipe from "../Pipes/LPipe";
import VesselFit from "../components/VesselFit";
import WaterPump from "../components/WaterPump";

export default function Containment({ position }) {
  const textile = useMemo(() => {
    return new THREE.MeshStandardMaterial({ color: "grey", side: DoubleSide });
  }, []);

  return (
    //north in positive -z direction
    <object3D name="containment" position={position}>
      <object3D name="tower">
        <mesh
          name="southWall"
          rotation={[0, Math.PI, 0]}
          position={[0, 15, -8]}
          material={textile}
        >
          <planeGeometry args={[16, 30]} />
        </mesh>
        <mesh name="northWall" position={[0, 15, 8]} material={textile}>
          <planeGeometry args={[16, 30]} />
        </mesh>
        <mesh
          name="westWall"
          rotation={[0, -Math.PI / 2, 0]}
          position={[-8, 25, 0]}
          material={textile}
        >
          <planeGeometry args={[16, 10]} />
        </mesh>
        <mesh
          name="eastWall"
          rotation={[0, Math.PI / 2, 0]}
          position={[8, 15, 0]}
          material={textile}
        >
          <planeGeometry args={[16, 30]} />
        </mesh>
        <mesh name="floor" rotation={[Math.PI / 2, 0, 0]} material={textile}>
          <planeGeometry args={[16, 16]} />
        </mesh>
        <mesh
          name="roof"
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 30, 0]}
          material={textile}
        >
          <planeGeometry args={[16, 16]} />
        </mesh>
        {/* shields 9 = closed, 0 = wide open */}
        <PressureVessel
          position={[-1, 0, 0]}
          rotation={[0, Math.PI / 5, 0]}
          shields={0}
        />
      </object3D>
      <object3D name="control room" position={[0, 0.01, 0]}>
        <mesh
          name="southWall"
          rotation={[0, Math.PI, 0]}
          position={[-18, 10, -8]}
          material={textile}
        >
          <planeGeometry args={[20, 20]} />
        </mesh>
        <mesh
          name="northWall"
          rotation={[0, 0, 0]}
          position={[-18, 10, 8]}
          material={textile}
        >
          {/* <planeGeometry args={[20, 20]} /> */}
        </mesh>
        <mesh
          name="westWall"
          rotation={[0, -Math.PI / 2, 0]}
          position={[-28, 10, 0]}
          material={textile}
        >
          <planeGeometry args={[16, 20]} />
        </mesh>
        <object3D name="recovery pipes">
          {/* out */}
          <VesselFit
            position={[-28, 10.75, 0.75]}
            rotation={[0, Math.PI / 2, 0]}
          />
          <StraightPipe
            length={24}
            position={[-20, 10.75, 0.7]}
            rotation={[0, 0, Math.PI / 2]}
          />
          {/* in */}
          <LPipe
            position={[-15, 14, 1.5]}
            rotation={[Math.PI / -2, 0, Math.PI / 2]}
          />
          <StraightPipe length={1} position={[0, 0, 0]} rotation={[0, 0, 0]} />
          <LPipe position={[0, 0, 0]} rotation={[0, 0, 0]} />
          <StraightPipe length={1} position={[0, 0, 0]} rotation={[0, 0, 0]} />
          <LPipe position={[0, 0, 0]} rotation={[0, 0, 0]} />
          <StraightPipe length={1} position={[0, 0, 0]} rotation={[0, 0, 0]} />
        </object3D>
        <mesh
          name="roof"
          rotation={[-Math.PI / 2, 0, 0]}
          position={[-18, 20, 0]}
          material={textile}
        >
          <planeGeometry args={[20, 16]} />
        </mesh>
        <mesh
          name="floor"
          rotation={[Math.PI / 2, 0, 0]}
          position={[-18, 0, 0]}
          material={textile}
        >
          <planeGeometry args={[20, 16]} />
        </mesh>
      </object3D>
    </object3D>
  );
}
