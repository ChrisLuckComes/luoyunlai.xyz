import { lazy } from "react";

export default [
  {
    key: "experience",
    name: "经验",
    component: lazy(() => import("@/pages/experiences/index")),
  },
];
