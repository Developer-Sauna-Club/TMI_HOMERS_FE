import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { dependencies } from './package.json';

const renderChunks = (deps: Record<string, string>) => {
  const chunks = {};
  Object.keys(deps).forEach((key) => {
    if (['react', 'react-router-dom', 'react-dom'].includes(key)) {
      return;
    }
    chunks[key] = [key];
  });
  return chunks;
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: '@components', replacement: path.resolve(__dirname, 'src/components') },
      { find: '@constants', replacement: path.resolve(__dirname, 'src/constants') },
      { find: '@api', replacement: path.resolve(__dirname, 'src/api') },
      { find: '@context', replacement: path.resolve(__dirname, 'src/context') },
      { find: '@hooks', replacement: path.resolve(__dirname, 'src/hooks') },
      { find: '@pages', replacement: path.resolve(__dirname, 'src/pages') },
      { find: '@stories', replacement: path.resolve(__dirname, 'src/stories') },
      { find: '@type', replacement: path.resolve(__dirname, 'src/type') },
      { find: '@utils', replacement: path.resolve(__dirname, 'src/utils') },
    ],
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-router-dom', 'react-dom'],
          ...renderChunks(dependencies),
        },
      },
    },
  },
});
