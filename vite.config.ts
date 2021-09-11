/* eslint-disable @typescript-eslint/no-var-requires */
import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import vitePluginImp from 'vite-plugin-imp'

const path = require('path')
export default defineConfig({
  resolve: {
    alias: [
      { find: /^~/, replacement: '' },
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      {
        find: '@components',
        replacement: path.resolve(__dirname, 'src/components'),
      },
      { find: '@assets', replacement: path.resolve(__dirname, 'src/assets') },
      { find: '@locales', replacement: path.resolve(__dirname, 'src/locales') },
      { find: '@utils', replacement: path.resolve(__dirname, 'src/utils') },
      { find: '@services', replacement: path.resolve(__dirname, 'src/services') },
      { find: '@pages', replacement: path.resolve(__dirname, 'src/pages') },
    ],
  },
  plugins: [
    reactRefresh(),
    vitePluginImp({
      libList: [
        {
          libName: 'antd',
          libDirectory: 'es',
          style: (name) => `antd/es/${name}/style`,
        },
      ],
    }),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://10.121.26.5:38443',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
})
