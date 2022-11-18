/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react'
import dayjs from 'dayjs'
import * as path from 'path'
import { defineConfig } from 'vite'

// @ts-ignore
import pkg from './package.json'

const { dependencies, devDependencies, name, version, author } = pkg;
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version, author },
  lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
};

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
    ],
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  esbuild: {
    pure: ['console.log', 'debugger'],
  },
  build: {
    target: 'es2015',
    cssTarget: 'chrome80',
    outDir: 'dist',
    chunkSizeWarningLimit: 2000,
  },
  define: {
    __APP_INFO__: JSON.stringify(__APP_INFO__),
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: '@root-entry-name: default;',
      },
    },
    postcss: {
      plugins: [
        {
          postcssPlugin: 'internal:charset-removal',
          AtRule: {
            charset: (atRule) => {
              if (atRule.name === 'charset') {
                atRule.remove();
              }
            },
          },
        },
      ],
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    reporters: 'verbose',
    include: ['src/**/*.{test,spec}.{jsx,tsx}'],
    setupFiles: './src/test/setup.ts'
  },
  plugins: [react()],
});
