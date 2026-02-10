import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import Containment from "./Fibers/Buildings/Containment";
import Boiler from "./Fibers/Buildings/Boiler";
import TurboGen from "./Fibers/Buildings/TurboGen";
import Yard from "./Fibers/Buildings/Yard";
import Storage from "./Fibers/Buildings/Storage";
import Radiation from "./Fibers/Connections/Radiation";
import Steam from "./Fibers/Connections/Steam";
import { OrbitControls } from "@react-three/drei";
import Recovery from "./Fibers/Connections/Recovery";

export default function Reactor() {
  const set = useThree((st) => st.set);
  const myCam = new THREE.PerspectiveCamera(100, 2, 0.1, 1000);
  myCam.position.x = 10;
  myCam.position.y = 10;
  myCam.position.z = -50;
  myCam.lookAt(20, 0, -100);
  set({ shadows: true, camera: myCam });

  return (
    <>
      <OrbitControls />
      <directionalLight position={[5, 10, 5]} />
      <ambientLight />
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[200, 200, 5, 5]} />
        <meshBasicMaterial color="blue" side={THREE.DoubleSide} />
      </mesh>
      <Containment position={[0, 0.01, -50]} rotation={[0, 0, 0]} />
      <Radiation
        position={[10, 0, -45]}
        pumpIn={true}
        pumpOut={true}
        pumpPower={true}
      />
      <Boiler position={[20, 0.01, -40]} rotation={[0, 0, 0]} />
      <Steam
        position={[32.5, 5, -10]}
        rotation={[0, 0, 0]}
        pumpIn={true}
        pumpPower={true}
      />
      <TurboGen
        position={[45, 0.01, 20]}
        rotation={[0, Math.PI * 1.5, 0]}
        nozzleL={2}
        nozzleR={2}
      />
      <Yard position={[0, 0.01, 80]} rotation={[0, 0, 0]} />
      <Storage position={[-50, 0.01, 0]} rotation={[0, 0, 0]} />
      <Recovery position={[0, 0, 0]} rotation={[0, 0, 0]} />
    </>
  );
}
