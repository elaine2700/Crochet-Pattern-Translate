import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vitetsConfigPaths from 'vite-tsconfig-paths';
import commonjs from 'vite-plugin-commonjs';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  base: './',
  plugins: [
    react(),
    vitetsConfigPaths(),
    commonjs(),
    svgr({
      include: [
        'src/**/*.svg',
      ],
    }),
  ],
  server: {
    open: true, // automatically open the app in the browser
    port: 3000,
  },
  build: {
    outDir: 'build',
  },
  
});

