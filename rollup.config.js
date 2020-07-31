// rollup.config.js
import typescript from 'rollup-plugin-typescript2';
import * as path from 'path';
import pkg from './package.json';
import sass from 'rollup-plugin-sass';
import copy from 'rollup-plugin-copy';
import { terser } from "rollup-plugin-terser";
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import svgr from '@svgr/rollup';
import url from '@rollup/plugin-url';

const config =[{
  input: 'src/index.ts',
  output: [{
    name: 'UUI',
    file: pkg.main,
    format: 'cjs',
    sourcemap: true,
  },
  {
    file: pkg.module,
    format: 'esm',
    sourcemap: true,
  }],
  external: [
    "lodash-es", "lodash", "luxon", "react-use", "classnames", "uuid", "uuid/v4",
    "react", "react-dom",
    "@charlietango/use-focus-trap",
    "@popperjs/core", "react-popper-2",
  ],
  plugins: [
    url(),
    svgr(),
    typescript({
      tsconfig: path.join(__dirname, 'tsconfig.json'),
    }),
    nodeResolve({
      browser: true,
    }),
    commonjs(),
    sass({
      output: 'lib/index.css',
      runtime: require('sass'),
      options: {
        sourceMap: true,
        outputStyle: 'compressed',
        sourceMapEmbed: false,
      }
    }),
    copy({
      targets: [
        { src: 'src/styles', dest: 'lib' },
        { src: 'src/icons/assets', dest: 'lib/icons' },
      ]
    }),
    terser(),
  ],
}];

export default config;
