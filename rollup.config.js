import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';

const config = {
  input: 'src/index.ts',
  output: {
    file: `dist/gridset.min.js`,
    name: 'gridset',
    format: 'umd',
    indent: false,
    extend: true,
  },
};

export default {
  ...config,
  plugins: [typescript(), terser()],
};
