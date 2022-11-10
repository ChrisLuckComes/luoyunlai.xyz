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
        key: 'tailwindcss',
        path: 'tailwindcss',
        name: '来不及了，快上车tailwindcss🚘',
        element: lazy(() => import('@/pages/project/tailwindcss'))
      },
      {
        key: 'http2',
        path: 'http2',
        name: 'http=>https=>http2',
        element: lazy(() => import('@/pages/project/http2'))
      },
      {
        key: 'vite',
        path: 'vite',
        name: '2022年还在用webpack?快上Vite！',
        element: lazy(() => import('@/pages/project/vite'))
      },
      {
        key: 'workflow',
        path: 'workflow',
        name: '不会还有人在手动发版吧？',
        element: lazy(() => import('@/pages/project/workflow'))
      },
      {
        key: 'performance',
        path: 'performance',
        name: '虚空性能优化？从指标开始',
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
        key: 'thinking',
        path: 'thinking',
        name: '理念',
        element: lazy(() => import('@/pages/react/thinking'))
      },
      {
        key: 'fiber',
        path: 'fiber',
        name: 'Fiber',
        element: lazy(() => import('@/pages/react/fiber'))
      },
      {
        key: 'render',
        path: 'render',
        name: 'Render',
        element: lazy(() => import('@/pages/react/render'))
      },
      {
        key: 'commit',
        path: 'commit',
        name: 'Commit',
        element: lazy(() => import('@/pages/react/commit'))
      },
      {
        key: 'diff',
        path: 'diff',
        name: 'Diff',
        element: lazy(() => import('@/pages/react/diff'))
      },
      {
        key: 'hook',
        path: 'hook',
        name: 'Hook',
        element: lazy(() => import('@/pages/react/hook'))
      }
    ]
  },
  {
    key: 'vue',
    path: 'vue',
    name: 'Vue',
    element: lazy(() => import('@/pages/index')),
    children: [
      {
        key: 'vue3Preset',
        path: 'vue3/preset',
        name: 'Vue3 - 前置知识',
        element: lazy(() => import('@/pages/vue/vue3/preset'))
      },
      {
        key: 'vue3Global',
        path: 'vue3/global',
        name: 'Vue3 - 全局概览',
        element: lazy(() => import('@/pages/vue/vue3/global'))
      },
      {
        key: 'vue3Reactive',
        path: 'vue3/reactive',
        name: 'Vue3 - 响应式系统',
        element: lazy(() => import('@/pages/vue/vue3/reactive'))
      },
      {
        key: 'vue3Diff',
        path: 'vue3/diff',
        name: 'Vue3 - Diff',
        element: lazy(() => import('@/pages/vue/vue3/diff'))
      }
    ]
  },
  {
    key: 'node',
    path: 'node',
    name: 'Node',
    element: lazy(() => import('@/pages/index')),
    children: [
      {
        key: 'changeVersion',
        path: 'changeVersion',
        name: '光速切换node版本',
        element: lazy(() => import('@/pages/node/changeVersion'))
      }
    ]
  },
  {
    key: 'experience',
    path: '/experience',
    name: '经验',
    element: lazy(() => import('@/pages/index')),
    children: [
      {
        key: 'npm',
        path: 'npm',
        name: '第一个npm包',
        element: lazy(() => import('@/pages/experiences/npm'))
      },
      {
        key: 'cloud',
        path: 'cloud',
        name: '作为一个前端好意思说没有个人网站？',
        element: lazy(() => import('@/pages/experiences/cloud'))
      }
    ]
  }
];

export default routers;
