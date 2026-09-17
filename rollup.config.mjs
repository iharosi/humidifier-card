import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/humidifier-card.ts',
  output: {
    file: 'dist/humidifier-card.js',
    format: 'es',
    sourcemap: false,
  },
  plugins: [
    resolve(),
    typescript({
      noEmit: false,
      declaration: false,
      outDir: undefined,
      tsconfig: './tsconfig.json',
    }),
    terser({ format: { comments: false } }),
  ],
};
