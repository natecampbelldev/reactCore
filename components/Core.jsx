import { useState, createContext } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from '@react-three/drei'
import Reactor from "../Reactor2";
import HUD from "../HUD";

export const ReactorState = createContext();

export default function Core() {
  const [core, setCore] = useState(null);

  const alter = async (reactor) => {
    const req = await fetch("http://localhost:3535/ReactorCore/:id", {
      method: "PUT",
      mode: "cors",
      body: JSON.stringify(reactor),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (req) {
      const res = req.json();
      setCore(res);
    }
  };

  const signIn = (user) => {};

  const playGame = async () => {
    // const user = {
    //   username: core.username,
    //   password: core.password
    // };
    // const req = await fetch("http://localhost:3535/ReactorCore/", {
    //   method: "POST",
    //   mode: "cors",
    //   body: JSON.stringify(user),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    // console.log(req);
    // if (req) {
    //   const res = await req.json();
    //   console.log(res);
    //   setCore(res);
    // }
  };

  return (
    <>
      <ReactorState.Provider value={core}>
          <div id="canvasContainer">
            <Canvas>
              <OrbitControls />
              <Reactor />
            </Canvas>
          </div>
          <HUD control={alter} />
      </ReactorState.Provider>
      <footer></footer>
    </>
  );
}
