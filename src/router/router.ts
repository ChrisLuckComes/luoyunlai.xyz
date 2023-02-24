import { lazy } from 'react';

const routers = [
  {
    key: '/',
    path: '/',
    name: '首页',
    element: lazy(() => import('@/home'))
  },
  {
    key: 'project',
    path: '/project',
    name: '工程化',
    element: lazy(() => import('@/pages/index')),
    children: [
      {
        key: '/project/tailwindcss',
        path: 'tailwindcss',
        name: '来不及了，快上车tailwindcss🚘',
        element: lazy(() => import('@/pages/project/tailwindcss'))
      },
      {
        key: '/project/http2',
        path: 'http2',
        name: 'http=>https=>http2',
        element: lazy(() => import('@/pages/project/http2'))
      },
      {
        key: '/project/vite',
        path: 'vite',
        name: '2022年还在用webpack?快上Vite！',
        element: lazy(() => import('@/pages/project/vite'))
      },
      {
        key: '/project/workflow',
        path: 'workflow',
        name: '不会还有人在手动发版吧？',
        element: lazy(() => import('@/pages/project/workflow'))
      },
      {
        key: '/project/performance',
        path: 'performance',
        name: '连指标都不知道还敢说懂性能优化？',
        element: lazy(() => import('@/pages/project/performance'))
      }
    ]
  },
  {
    key: 'react',
    path: '/react',
    name: 'React',
    element: lazy(() => import('@/pages/index')),
    children: [
      {
        key: '/react/thinking',
        path: 'thinking',
        name: '理念',
        element: lazy(() => import('@/pages/react/thinking'))
      },
      {
        key: '/react/fiber',
        path: 'fiber',
        name: 'Fiber',
        element: lazy(() => import('@/pages/react/fiber'))
      },
      {
        key: '/react/render',
        path: 'render',
        name: 'Render',
        element: lazy(() => import('@/pages/react/render'))
      },
      {
        key: '/react/commit',
        path: 'commit',
        name: 'Commit',
        element: lazy(() => import('@/pages/react/commit'))
      },
      {
        key: '/react/diff',
        path: 'diff',
        name: 'Diff',
        element: lazy(() => import('@/pages/react/diff'))
      },
      {
        key: '/react/hook',
        path: 'hook',
        name: 'Hook',
        element: lazy(() => import('@/pages/react/hook'))
      },
      {
        key: '/react/state',
        path: 'state',
        name: '还在用Redux吗？你已经out了',
        element: lazy(() => import('@/pages/react/store'))
      }
    ]
  },
  {
    key: 'vue',
    path: '/vue',
    name: 'Vue',
    groups: ['vue2', 'vue3'],
    element: lazy(() => import('@/pages/index')),
    children: [
      {
        key: '/vue/vue3/preset',
        path: 'vue3/preset',
        name: '前置知识',
        group: 'vue3',
        element: lazy(() => import('@/pages/vue/vue3/preset'))
      },
      {
        key: '/vue/vue3/global',
        path: 'vue3/global',
        name: '全局概览',
        group: 'vue3',
        element: lazy(() => import('@/pages/vue/vue3/global'))
      },
      {
        key: '/vue/vue3/reactive',
        path: 'vue3/reactive',
        name: '响应式系统',
        group: 'vue3',
        element: lazy(() => import('@/pages/vue/vue3/reactive'))
      },
      {
        key: '/vue/vue3/diff',
        path: 'vue3/diff',
        name: 'Diff',
        group: 'vue3',
        element: lazy(() => import('@/pages/vue/vue3/diff'))
      },
      {
        key: '/vue/vue2/router',
        path: '/vue2/router',
        name: 'Vue-Router',
        group: 'vue2',
        element: lazy(() => import('@/pages/vue/vue2/vueRouter'))
      },
      {
        key: '/vue/vue2/vForWithIf',
        path: 'vue2/vForWithIf',
        name: 'v-for和v-if混用',
        group: 'vue2',
        element: lazy(() => import('@/pages/vue/vue2/vForWithIf'))
      },
      {
        key: '/vue/vue2/lifeCycle',
        path: 'vue2/lifeCycle',
        name: '生命周期',
        group: 'vue2',
        element: lazy(() => import('@/pages/vue/vue2/lifeCycle'))
      },
      {
        key: '/vue/vue2/watchComputed',
        path: 'vue2/watchComputed',
        name: 'computed和watch',
        group: 'vue2',
        element: lazy(() => import('@/pages/vue/vue2/watchComputed'))
      },
      {
        key: '/vue/vue2/data',
        path: 'vue2/data',
        name: '为什么data必须是函数',
        group: 'vue2',
        element: lazy(() => import('@/pages/vue/vue2/data'))
      },
    ]
  },
  {
    key: '/node',
    path: 'node',
    name: 'Node',
    element: lazy(() => import('@/pages/index')),
    children: [
      {
        key: '/node/changeVersion',
        path: 'changeVersion',
        name: '光速切换node版本',
        element: lazy(() => import('@/pages/node/changeVersion'))
      },
      {
        key: '/node/nodeJs',
        path: 'nodeJs',
        name: 'Node.js',
        element: lazy(() => import('@/pages/node/node'))
      },
      {
        key: '/node/middleware',
        path: 'middleware',
        name: 'express和koa的中间件模型',
        element: lazy(() => import('@/pages/node/middleware'))
      }
    ]
  },
  {
    key: '/experience',
    path: '/experience',
    name: '经验',
    element: lazy(() => import('@/pages/index')),
    children: [
      {
        key: '/experience/npm',
        path: 'npm',
        name: '第一个npm包',
        element: lazy(() => import('@/pages/experiences/npm'))
      },
      {
        key: '/experience/cloud',
        path: 'cloud',
        name: '作为一个前端好意思说没有个人网站？',
        element: lazy(() => import('@/pages/experiences/cloud'))
      }
    ]
  },
  {
    key: 'knowledge',
    path: '/knowledge',
    name: '知识',
    element: lazy(() => import('@/pages/index')),
    children: [
      {
        key: '/knowledge/browser',
        path: 'browser',
        name: '浏览器如何工作',
        element: lazy(() => import('@/pages/knowledge/browser'))
      }
    ]
  }
];

export default routers;
