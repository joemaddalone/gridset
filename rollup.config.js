import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import copy from 'rollup-plugin-copy';

const OUTPUT_DATA = [
  {
    input: 'src/index.ts',
    file: 'dist/index.esm.js',
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
    copy({
      targets: [{ src: 'src/gridset.d.ts', dest: 'dist' }],
    }),
  ],
}));

export default config;
