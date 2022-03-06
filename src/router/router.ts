import { lazy } from "react";

const routers = [
  {
    key: "/",
    path: "/",
    name: "首页",
    element: lazy(() => import("@/home")),
  },
  {
    key: "experience",
    path: "/experience",
    name: "经验",
    element: lazy(() => import("@/pages/experiences/index")),
  },
];

export default routers;
