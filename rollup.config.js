// rollup.config.js
import typescript from 'rollup-plugin-typescript2';
import * as path from 'path';
import pkg from './package.json';
import sass from 'rollup-plugin-sass';
import copy from 'rollup-plugin-copy';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import svgr from '@svgr/rollup';
import url from '@rollup/plugin-url';

const config = [{
  input: 'src/index.ts',
  output: [{
    name: 'UUI',
    file: pkg.main,
    format: 'amd',
    plugins: [
    ],
  },
  {
    name: 'UUI',
    file: pkg.module,
    format: 'es',
    plugins: [
    ],
  }],
  external: [
    "react", "react-dom",
    "@popperjs/core", "react-popper",
    "@charlietango/use-focus-trap",
  ],
  plugins: [
    url(),
    svgr(),
    nodeResolve({
      browser: true,
    }),
    commonjs(),
    typescript({
      tsconfig: path.join(__dirname, 'tsconfig.json'),
      typescript: require("typescript"),
    }),
    sass({
      output: 'lib/index.css',
      runtime: require('sass'),
      options: {
        sourceMap: true,
        outputStyle: 'compressed',
        sourceMapEmbed: false,
        fiber: require('fibers'),
      }
    }),
    copy({
      targets: [
        { src: 'src/styles', dest: 'lib' },
      ]
    }),
  ],
}];

export default config;
