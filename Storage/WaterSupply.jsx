import React from "react";
import VesselFit from "../components/VesselFit";
import LPipe from "../Pipes/LPipe";
import PipeValve from "../Pipes/PipeValve";
import WaterPump from "../components/WaterPump";
import { DoubleSide } from "three";
import StraightPipe from "../Pipes/StraightPipe";

export default function WaterSupply({ position, rotation, rad }) {
  return (
    <object3D position={position} rotation={rotation}>
      <mesh position={[0, 2.01, 0]}>
        <cylinderGeometry args={[5, 5, 4, 32, 4, false]} />
        <meshStandardMaterial color="grey" side={DoubleSide} />
      </mesh>
      <Intake position={[0, 3, 5.025]} flowIn={true} rad={rad} />
      <Outlet position={[0, 0, -5.025]} flowOut={true} rad={rad} />
    </object3D>
  );
}

function Intake({ position, flowIn, rad }) {
  let pose = [0, 7, 1.5]
  let rotate = [0, Math.PI / 2, 0]
  if(rad){
    pose = [0, 7, 0]
    rotate = [0, Math.PI / -2, 0]
  }
  return (
    <object3D name="intake" position={position}>
      <VesselFit
        name="in fitting"
        position={[0, 0, 0]}
        rotation={[0, 0, Math.PI]}
      />
      <LPipe position={[0, 0.75, 0]} rotation={[Math.PI, Math.PI / 2, 0]} />
      <PipeValve
        name="intake"
        position={[0, 1.75, 0.75]}
        rotation={[0, Math.PI / -2, Math.PI]}
        length={2}
        flow={flowIn}
        temp="cold"
      />
      <StraightPipe
        length={4.25}
        position={[0, 4.875, 0.75]}
        rotation={[0, Math.PI / 2, 0]}
      />
      <LPipe position={pose} rotation={rotate} />
    </object3D>
  );
}

function Outlet({ position, flowOut, rad, outPower }) {
  let rotate = [0, Math.PI, 0];
  let pose = [0.75, 3, -3.75]
  if (rad) {
    rotate = [0, Math.PI / -2, 0];
    pose=[0, 3, -4.5]
  }
  return (
    <object3D position={position}>
      <VesselFit
        name="out fitting"
        position={[0, 0.75, 0]}
        rotation={[0, 0, Math.PI / 2]}
      />
      <PipeValve
        position={[0, 0.75, -1.5]}
        rotation={[Math.PI / 2, 0, 0]}
        flow={flowOut}
        temp='cold'
        length={3}
      />
      <LPipe
        position={[0, 1.5, -3]}
        rotation={[Math.PI * 1.5, Math.PI / 2, 0]}
      />

      <WaterPump
        name="outlet pump"
        position={[0, 2.25, -3.75]}
        rotation={[0, Math.PI, 0]}
        power={outPower}
      />
      <LPipe
        name="water outlet"
        position={pose}
        rotation={rotate}
      />
    </object3D>
  );
}
