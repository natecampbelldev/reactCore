import React from "react";
import LPipe from "../Pipes/LPipe";
import StraightPipe from "../Pipes/StraightPipe";
import WaterPump from "../components/WaterPump";
import PipeValve from "../Pipes/PipeValve";

export default function Radiation({ position, pumpOut, pumpPower }) {
  return (
    // radiated water between buildings
    <object3D name="pressure to steamer" position={position}>
      <object3D name="return to pressure">
        <LPipe position={[-0.75, 9.25, -4.85]} rotation={[0, 0, 0]} />
        <StraightPipe
          length={5}
          position={[0, 6.75, -4.85]}
          rotation={[0, 0, 0]}
        />
        <PipeValve
          length={2.75}
          position={[0, 2.85, -4.85]}
          rotation={[0, 0, Math.PI]}
          flow={pumpOut}
        />
        <LPipe
          position={[0, 1.5, -4.15]}
          rotation={[0, Math.PI / 2, Math.PI / -2]}
        />
        <StraightPipe
          length={5.75}
          position={[0, 0.75, -1.25]}
          rotation={[Math.PI / 2, Math.PI / 2, 0]}
        />
        <WaterPump
          position={[0, 0.75, 2.65]}
          rotation={[Math.PI / 2, Math.PI / -2, 0]}
          power={pumpPower}
        />
        <StraightPipe
          length={1}
          position={[0, 0.75, 3.9]}
          rotation={[Math.PI / 2, Math.PI / 2, 0]}
        />
        <LPipe
          position={[0.75, 0.75, 4.45]}
          rotation={[Math.PI / 2, 0, Math.PI / 2]}
        />
      </object3D>
      <object3D name="out to steamer">
        <LPipe position={[-1, 17, -4.1]} rotation={[Math.PI / -2, 0, 0]} />
        <StraightPipe
          length={8.35}
          position={[-0.2, 17, 0.075]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <LPipe position={[-0.25, 16.25, 4.25]} rotation={[0, Math.PI / -2, 0]} />
        <StraightPipe
          length={6.25}
          position={[-0.275, 13.125, 5]}
          rotation={[0, 0, 0]}
        />
        <LPipe position={[0.45, 10, 5]} rotation={[0, 0, Math.PI]} />
      </object3D>
    </object3D>
  );
}
