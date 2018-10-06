import uglify from "rollup-plugin-uglify-es";
import buble from 'rollup-plugin-buble';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/tatting.umd.js',
    format: 'umd',
    name: 'tatting',
  },
  plugins: [
    buble(),
    uglify(),
  ],
};
