import React, { useMemo } from "react";
import * as THREE from "three";
import WaterSupply from "../Storage/WaterSupply";
import VesselFit from "../components/VesselFit";
import StraightPipe from "../Pipes/StraightPipe";
import WaterPump from "../components/WaterPump";
import LPipe from "../Pipes/LPipe";
import PipeFit from "../components/PipeFit";
import PipeValve from "../Pipes/PipeValve";

const globalMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
});

export default function Storage({
  position,
  rotation,
  radReturn,
  steamReturn,
}) {
  const block = useMemo(() => new THREE.BoxGeometry(10, 10, 14), []);
  return (
    <object3D name="storage facility" position={position} rotation={rotation}>
      <mesh
        name="recycle supply"
        geometry={block}
        material={globalMaterial}
        position={[5, 5, 0]}
      >
        <WaterSupply name="recycle" position={[0, -5, 0]} rad={false} />
      </mesh>
      <mesh
        name="radiated supply"
        geometry={block}
        material={globalMaterial}
        position={[-5, 5, 0]}
      >
        <WaterSupply name="radiated" position={[0, -5, 0]} rad={true} />
      </mesh>
      <object3D name="pump house">
        <mesh
          name="structure"
          material={globalMaterial}
          position={[0, 3, -8.25]}
        >
          <boxGeometry args={[14, 6, 4]} />
        </mesh>
        <VesselFit position={[7, 3.75, -8.75]} rotation={[0, Math.PI / 2, 0]} />
        <PipeValve
          position={[8.75, 3.75, -8.75]}
          rotation={[Math.PI /2, 0, Math.PI/-2]}
          flow={steamReturn}
          length={6}
          temp="cold"
        />
        <VesselFit position={[-5, 3.75, -10.25]} rotation={[0, 0, 0]} />
        <PipeValve
          position={[-5, 3.75, -10.5]}
          rotation={[Math.PI / 2, 0, Math.PI]}
          flow={radReturn}
          length={2}
          temp="cold"
        />
      </object3D>
      <SupplyIntake position={[0, 11, 6]} />
    </object3D>
  );
}

function SupplyIntake({ position }) {
  return (
    <object3D name="intake housing" position={position}>
      <mesh name="intake structure" material={globalMaterial}>
        <boxGeometry args={[12, 2, 2]} />
        <VesselFit
          name="water intake"
          position={[5, -0.25, 1]}
          rotation={[0, 0, 0]}
        />
        <VesselFit
          name="radiated intake"
          position={[-5, -0.25, -1]}
          rotation={[0, 0, 0]}
        />
      </mesh>
      <StraightPipe
        length={3}
        position={[5, -0.25, 2.025]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <StraightPipe
        length={3}
        position={[-5, -0.25, -2.5]}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </object3D>
  );
}
