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
    element: lazy(() => import("@/pages/index")),
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
        name: "来不及了，快上车tailwindcss🚘",
        element: lazy(() => import("@/pages/experiences/tailwindcss")),
      },
      {
        key: "cloud",
        path: "/experience/cloud",
        name: "作为一个前端好意思说没有个人网站？",
        element: lazy(() => import("@/pages/experiences/cloud")),
      },
      {
        key: "http2",
        path: "/experience/http2",
        name: "什么是http2，怎么启用？",
        element: lazy(() => import("@/pages/experiences/http2")),
      },
    ],
  },
  {
    key: "react",
    path: "/react",
    name: "React",
    element: lazy(() => import("@/pages/index")),
    children: [
      {
        key: "vite",
        path: "/react/vite",
        name: "2022年还在用webpack?快上Vite！",
        element: lazy(() => import("@/pages/react/vite")),
      },
    ],
  },
];

export default routers;
