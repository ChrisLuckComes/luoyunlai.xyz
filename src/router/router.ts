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
    children: [
      {
        key: "npm",
        path: "/experience/npm",
        name: "第一个npm包",
        element: lazy(() => import("@/pages/experiences/npm")),
      },
      {
        key: "tailwindcss",
        path: "/experience/tailwindcss",
        name: "来不及了，快上车tailwindcss",
        element: lazy(() => import("@/pages/experiences/tailwindcss")),
      },
    ],
  },
];

export default routers;
