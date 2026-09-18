import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import { readFileSync } from 'node:fs';

const { version } = JSON.parse(readFileSync('./package.json', 'utf8'));

export default {
  input: 'src/humidifier-card.ts',
  output: {
    file: 'dist/humidifier-card.js',
    format: 'es',
    sourcemap: false,
    banner: `/*! humidifier-card v${version} | GPL-3.0-only | https://github.com/iharosi/humidifier-card */`,
  },
  plugins: [
    resolve(),
    typescript({
      noEmit: false,
      declaration: false,
      outDir: undefined,
      tsconfig: './tsconfig.json',
    }),
    terser({ format: { comments: /^!/ } }),
  ],
};
