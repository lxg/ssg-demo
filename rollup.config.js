import multi from '@rollup/plugin-multi-entry'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'

export default {
  input: [
      'src/scripts/**/*.js'
  ],
  output: {
    file: 'dist/_assets/js/main.js',
  },
  plugins: [multi(), json(), resolve()]
}
