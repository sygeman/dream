import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import Unocss from 'unocss/vite';
import { presetAttributify, presetUno } from 'unocss';
import { liquids } from './src/constants';

export default defineConfig({
  resolve: {
    conditions: ['development', 'browser'],
  },
  plugins: [
    solidPlugin(),
    Unocss({
      safelist: Object.values(liquids),
      presets: [presetAttributify(), presetUno()],
    }),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
});
