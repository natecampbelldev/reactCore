import React, { useState, useEffect } from "react";
import StraightPipe from "./StraightPipe";

export default function Nozzle({ position, rotation, pressure }) {
  const [steam, setSteam] = useState({ r: 0.5, l: 3, p: 2.4 });

  useEffect(() => {
    switch (pressure) {
      case 0:
        // off
        setSteam({ r: 0, l: 0, p: 0 });
        break;
      case 1:
        // weak
        setSteam({ r: 0.75, l: 2, p: 2.28 });
        break;
      case 2:
        // good
        setSteam({ r: 0.33, l: 4, p: 2.6 });
        break;
      case 3:
        // high
        setSteam({ r: 0.25, l: 5.5, p: 2.5 });
        break;
      default:
        // danger
        setSteam({ r: 0.5, l: 3, p: 2.4 });
    }
  }, [pressure]);
  

  return (
    <object3D position={position} rotation={rotation} >
      <StraightPipe length={2} />
      <mesh position={[0, 1.25, 0]}>
        <cylinderGeometry args={[0.1, 0.3, 0.5, 24, 12, true]} />
        <meshStandardMaterial color="darkgrey" />
      </mesh>
      <mesh position={[0, steam.p, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[steam.r, steam.l, 32]} />
        <meshStandardMaterial color="aliceblue" transparent opacity={0.75} />
      </mesh>
    </object3D>
  );
}
