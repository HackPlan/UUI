// rollup.config.js
import typescript from 'rollup-plugin-typescript2';
import * as path from 'path';
import * as fs from 'fs';
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
    format: 'umd',
    plugins: [
    ],
    globals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
      'react-popper': 'ReactPopper',
      'prop-types': 'PropTypes',
    },
  },
  {
    name: 'UUI',
    file: pkg.module,
    format: 'es',
    plugins: [
    ],
  }],
  external: [
    "react", "react-dom", "prop-types",
    "@popperjs/core", "react-popper",
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
    copy({
      targets: [
        { src: 'src/styles', dest: 'lib' },
      ]
    }),
  ],
}, {
  input: 'src/styles/index.scss',
  output: {
    file: 'lib/style.tmp.js',
  },
  plugins: [
    sass({
      output: 'lib/index.css',
      runtime: require('sass'),
      options: {
        fiber: require('fibers'),
      }
    }),
    (() => {
      return {
        name: 'cleaner',
        writeBundle: (options, bundle) => {
          fs.unlinkSync(path.join(__dirname, './lib/style.tmp.js'))
        }
      }
    })(),
  ],
}];

export default config;
