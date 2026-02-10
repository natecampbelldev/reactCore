import { useEffect, useState, useMemo, useRef } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import PressureVessel from "./Fibers/Containment/PressureVessel";
import Assembly from "./Fibers/Containment/Assembly";
import ContainmentBuilding from "./Fibers/Buildings/ContainmentBuilding";
import FloodPipe from "./Fibers/Containment/FloodPipe";
import SteamVessel from "./Fibers/Steamer/SteamVessel";
import SteamerBuilding from "./Fibers/Buildings/SteamerBuilding";
import TurbineGeneratorBuilding from "./Fibers/Buildings/TurbineGeneratorBuilding";
import { OrbitControls, FirstPersonControls, MapControls } from "@react-three/drei";


export default function Reactor() {
 

  return (
    <>
      <directionalLight position={[5, 1, 5]} />
      <ambientLight />
      {/* <PressureVessel position={{x:0,y:0,z:0}} rotation={{rX:0, rY:0, rZ:0}}/> */}
      {/* <ContainmentBuilding position={[0,0,0]} rotation={[0,0,0]}/> */}
      {/* <FloodPipe position={[25,0,0]} rotation={[0,0,0]}/> */}
      {/* <SteamVessel position={[0,0,0]} rotation={[0,0,0]}/> */}
      <SteamerBuilding position={[-40,0,0]} rotation={[0,0,0]}/>
      <object3D onClick={(e) => {
        console.dir(e);
        // console.log(myY);
        // // setMyY(myY + 5);
        // myCam.lookAt(0,myY+=5,0);
        // console.log(myY);
      }}>
      <TurbineGeneratorBuilding position={[0,0,0]} rotation={[0,0,0]} />
      </object3D>
      <OrbitControls />
      {/* <FirstPersonControls /> */}
      {/* <MapControls /> */}
    </>
  );
}
