import React from "react";
import LPipe from "../Pipes/LPipe";
import StraightPipe from "../Pipes/StraightPipe";
import WaterPump from "../components/WaterPump";
import PipeValve from "../Pipes/PipeValve";

export default function Recovery() {
  return (
    <object3D>
      <StraightPipe
        length={25.25}
        position={[-55, 10.75, -10.65]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <StraightPipe
        length={25.25}
        position={[-55, 10.75, -35.9]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <LPipe
        position={[-54.25, 10.75, -48.55]}
        rotation={[Math.PI / 2, 0, Math.PI]}
      />
      <StraightPipe
        length={22.25}
        position={[-43.125, 10.75, -49.3]}
        rotation={[0, 0, Math.PI / 2]}
      />
    </object3D>
  );
}
