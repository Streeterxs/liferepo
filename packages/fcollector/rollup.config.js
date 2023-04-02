import path from 'path';

import { babel } from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import json from '@rollup/plugin-json';
import { preserveShebangs } from 'rollup-plugin-preserve-shebangs';

const cli = './src/fCollector.ts';

const external = (id) => {
  return id.startsWith('.') === false && path.isAbsolute(id) === false;
};

const extensions = ['.tsx', '.ts', '.js', '.jsx', '.es6', '.es', '.mjs'];

const babelOptions = {
  babelHelpers: 'bundled',
  extensions,
  include: ['src/**/*'],
  presets: ['@babel/preset-env', '@babel/preset-typescript'],
  plugins: [],
  exclude: ['babel.config.js'],
};

export default [
  {
    input: cli,
    external,
    plugins: [
      // Allows node_modules resolution
      resolve({ extensions }),

      // Allow bundling cjs modules. Rollup doesn't understand cjs
      commonjs(),

      babel(babelOptions),
      replace({
        preventAssignment: true,
      }),

      terser(),
      preserveShebangs(),
      json(),
    ],
    output: [
      {
        file: 'build/fCollector.cjs.js',
        format: 'cjs',
      },
    ],
  },
];
