import { defineConfig, LibraryFormats } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import pkg from './package.json';

const format = process.env.FORMAT as LibraryFormats;

export default defineConfig({
  root: './src',
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: [format]
    },
    outDir: path.resolve(__dirname, `./${format}`),
    emptyOutDir: false,
    target: 'es2017',
    rollupOptions: {
      external: Object.keys(pkg.peerDependencies),
      output: {
        interop: 'compat',
        exports: 'named',
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: ({ name: fileName }) => {
          return `${fileName}.js`;
        }
      }
    }
  },
  plugins: [
    react({
      babel: {
        presets: ['@babel/preset-typescript'],
        plugins: [
          [
            'babel-plugin-styled-components',
            {
              ssr: false,
              pure: true,
              displayName: false,
              fileName: false
            }
          ]
        ]
      }
    })
  ]
});
