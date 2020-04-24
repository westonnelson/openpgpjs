import { builtinModules } from 'module';

import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from 'rollup-plugin-babel';

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

const plugins = [
  "@babel/plugin-transform-async-to-generator",
  "@babel/plugin-transform-regenerator"
];
const presets = [[require.resolve('@babel/preset-env'), {
  targets: {
    browsers: [
      'IE >= 11',
      'Safari >= 9',
      'Last 2 Chrome versions',
      'Last 2 Firefox versions',
      'Last 2 Edge versions'
    ]
  }
}]];

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
      { file: 'dist/compat/openpgp.js', format: 'iife', name: pkg.name }
    ],
    plugins: [
      resolve(),
      commonjs({
        ignore: builtinModules.concat(node)
      }),
      babel({
        // Only babelify web-streams-polyfill, web-stream-tools, asmcrypto, email-addresses and seek-bzip in node_modules
        only: [/^(?:.*\/node_modules\/web-streams-polyfill\/|.*\/node_modules\/web-stream-tools\/|.*\/node_modules\/asmcrypto\.js\/|.*\/node_modules\/email-addresses\/|.*\/node_modules\/seek-bzip\/|(?!.*\/node_modules\/)).*$/],
        ignore: ['*.min.js'],
        plugins,
        presets
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
