import React from "react";
import LPipe from "../Pipes/LPipe";
import StraightPipe from "../Pipes/StraightPipe";
import WaterPump from "../components/WaterPump";
import PipeValve from "../Pipes/PipeValve";
import TPipe from "../Pipes/TPipe";

export default function Steam({ position, pumpIn, pumpPower }) {
  return (
    <object3D name="steamer to turbine" position={position}>
      <object3D name="out to turbine">
        <StraightPipe
          length={20}
          position={[-12.5, 9.25, -10]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <LPipe
          position={[-11.75, 9.25, 0]}
          rotation={[Math.PI / 2, 0, Math.PI / 2]}
        />
        <StraightPipe
          length={24}
          position={[0.25, 9.25, 0.75]}
          rotation={[Math.PI / 2, 0, Math.PI / 2]}
        />
        <LPipe
          position={[12.25, 9.25, 1.5]}
          rotation={[Math.PI / 2, 0, Math.PI / -2]}
        />
        <StraightPipe
          length={5}
          position={[13, 9.25, 4]}
          rotation={[Math.PI / 2, Math.PI / 2, 0]}
        />
      </object3D>
      <object3D name="t-joint to nozzles">
        <TPipe
          position={[13, 9.25, 7.5]}
          rotation={[Math.PI / -2, 0, Math.PI / 2]}
        />
        <PipeValve
          length={2}
          position={[15, 9.25, 7.5]}
          rotation={[Math.PI / -2, 0, Math.PI / -2]}
          temp="hot"
          flow={true}
        />
        <LPipe
          position={[16, 9.25, 8.25]}
          rotation={[Math.PI / 2, 0, Math.PI / -2]}
        />
        <StraightPipe
          length={1}
          position={[16.75, 9.25, 8.75]}
          rotation={[Math.PI / 2, Math.PI / 2, 0]}
        />
        <PipeValve
          length={2}
          position={[11, 9.25, 7.5]}
          rotation={[Math.PI / -2, 0, Math.PI / 2]}
          temp="hot"
          flow={true}
        />
        <LPipe
          position={[10, 9.25, 8.25]}
          rotation={[Math.PI / 2, 0, Math.PI]}
        />
        <StraightPipe
          length={1}
          position={[9.25, 9.25, 8.75]}
          rotation={[Math.PI / 2, 0, 0]}
        />
      </object3D>
      <object3D name="return to steamer">
        <WaterPump
          position={[-12.5, -1.25, -18.75]}
          rotation={[0, Math.PI / -2, Math.PI / 2]}
          power={pumpPower}
        />
        <PipeValve
          length={6}
          position={[-12.5, -1.25, -15]}
          rotation={[Math.PI / 2, Math.PI / -2, 0]}
          flow={pumpIn}
        />
        <StraightPipe
          length={12.5}
          position={[-12.5, -1.25, -5.75]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <LPipe position={[-13.25, -1.25, 0.5]} rotation={[Math.PI / 2, 0, 0]} />
        <StraightPipe
          length={24}
          position={[-25.25,-1.25, 1.25]}
          rotation={[Math.PI / 2, 0, Math.PI / 2]}
        />
        <StraightPipe
          length={24}
          position={[-49.25, -1.25, 1.25]}
          rotation={[Math.PI / 2, 0, Math.PI / 2]}
        />
        <StraightPipe
          length={9.5}
          position={[-66, -1.25, 1.25]}
          rotation={[Math.PI / 2, 0, Math.PI / 2]}
        />
     
      </object3D>
    </object3D>
  );
}
