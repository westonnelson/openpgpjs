import { builtinModules } from 'module';

import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

import pkg from './package.json';

const node = [
  'asn1.js',
  'node-fetch',
  'node-localstorage'
];
const compat = [
  'whatwg-fetch',
  'core-js/fn/array/fill',
  'core-js/fn/array/find',
  'core-js/fn/array/includes',
  'core-js/fn/array/from',
  'core-js/fn/promise',
  'core-js/fn/typed/uint8-array',
  'core-js/fn/string/repeat',
  'core-js/fn/symbol',
  'core-js/fn/object/assign'
];

export default [
  {
    input: 'src/index.js',
    output: [
      { file: 'dist/openpgp.js', format: 'iife', name: pkg.name },
      { file: 'dist/openpgp.mjs', format: 'es' }
    ],
    plugins: [
      resolve(),
      commonjs({
        ignore: builtinModules.concat(node).concat(compat)
      })
    ],
    context: 'global'
  },
  {
    input: 'src/index.js',
    external: builtinModules,
    output: [
      { file: 'dist/openpgp.node.js', format: 'cjs', name: pkg.name },
      { file: 'dist/openpgp.node.mjs', format: 'es' }
    ],
    plugins: [
      resolve(),
      commonjs({
        ignore: compat.concat('encoding')
      })
    ],
    context: 'global'
  },
  {
    input: 'src/index.js',
    output: [
      { file: 'dist/lightweight/openpgp.js', format: 'iife', name: pkg.name },
      { file: 'dist/lightweight/openpgp.mjs', format: 'es' }
    ],
    plugins: [
      resolve(),
      commonjs({
        ignore: builtinModules.concat(node).concat(compat).concat('elliptic')
      })
    ],
    context: 'global'
  }
];
