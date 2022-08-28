import { defineConfig } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';
import eslint from 'vite-plugin-eslint';
import react from '@vitejs/plugin-react';
import vitePluginImp from 'vite-plugin-imp';

export default defineConfig(async () => {
  return {
    build: {
      outDir: 'build'
    },
    optimizeDeps: {
      include: ['react/jsx-runtime']
    },
    plugins: [
      react(),
      tsConfigPaths(),
      vitePluginImp({
        libList: [
          {
            libName: 'antd',
            style: name => `antd/es/${name}/style`
          }
        ]
      }),
      eslint()
    ],
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
        }
      }
    }
  };
});
