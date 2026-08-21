import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        baseline: resolve(__dirname, 'baseline.html'),
        redux: resolve(__dirname, 'redux.html'),
        contextApi: resolve(__dirname, 'context-api.html'),
        mobx: resolve(__dirname, 'mobx.html'),
      },
    },
  },
});
