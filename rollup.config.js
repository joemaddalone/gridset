import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import globals from 'rollup-plugin-node-globals';
import builtins from 'rollup-plugin-node-builtins';

export default {
	input: 'index.js',
	output: [
		{
			file: 'dist/bundle.cjs.js',
			format: 'cjs'
		},
		{
			file: 'dist/bundle.esm.js',
			format: 'es'
		},
		{
			file: 'dist/bundle.js',
			format: 'iife',
			name: 'gridset'
		}
	],
	plugins: [
		nodeResolve({ preferBuiltins: false }), // or `true`
		commonjs(),
		globals(),
		builtins()
	]

};