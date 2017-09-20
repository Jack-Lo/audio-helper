import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import typescript from 'rollup-plugin-typescript2'

export default {
  entry: 'src/index.js',
  moduleName: 'AudioHelper',
  sourceMap: true,
  plugins: [
    nodeResolve({
      jsnext: true,
      main: true
    }),
    commonjs(),
    typescript(),
    babel()
  ],
  targetMap: {
    'umd': 'dist/index.js',
    'es': 'dist/index.esm.js',
    'cjs': 'dist/index.cjs.js',
    'iife': 'dist/index.iife.js'
  }
}