import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

const OUTPUT_DATA = [
  {
    input: 'src/index.ts',
    file: 'dist/index.esm.js',
    format: 'es',
  },
  {
    input: 'src/index.ts',
    file: 'demo/src/dist/index.esm.js',
    format: 'es',
  },
  {
    input: 'src/index-umd.ts',
    file: 'dist/index.js',
    format: 'umd',
  },
];

const config = OUTPUT_DATA.map(({ file, format, input }) => ({
  input,
  output: {
    file,
    format,
    name: 'Gridset',
  },
  external: [],
  watch: {
    include: 'src/**',
  },
  plugins: [
    typescript(),
    terser({
      format: {
        comments: false,
      },
    }),
  ],
}));

export default config;
