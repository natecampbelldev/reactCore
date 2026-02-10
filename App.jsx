import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import RootLayout from "./RootLayout";
import FullLogo from "./components/FullLogo";

import Core from "./components/Core";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    path: "/",
    loader: () => {
      const user = JSON.parse(sessionStorage.getItem("ReactCorePlayer"));
      return user;
    },
    action: async ({ request }) => {
      console.log("HOME ACTION")
      const fdata = await request.formData();
      console.dir(fdata.get("intent"));
      let sdata = {};
      for (let [key, value] of fdata.entries()) {
        // console.log(key,value)
        sdata[key] = value;
      }
      console.dir(JSON.stringify(sdata));

      const res = await fetch("http://localhost:3535/login", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(sdata),
        headers: {
          "Content-Type": "application/json",
        },
      });
      // console.dir(res);
      const user = await res.json()
      console.dir(user)
      return user
      // return redirect("/");
    },
    children: [
      // {
      //   element: <FullLogo />,
      //   index: true,
      // },
      // {
      //   element: <Dashboard/>,
      //   path: 'home',
      //   loader: () => {
      //     const user = sessionStorage.getItem("ReactCorePlayer");
      //     return user;
      //   },
      // },
      {
        element: <Core />,
        // path: "/core",
        index:true,
        loader: async ({ request, params }) => {
          // get the info to load from DaQ
          // from params
          return null;
        },
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
