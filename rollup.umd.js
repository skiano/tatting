import uglify from "rollup-plugin-uglify-es";

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/tatting.umd.js',
    format: 'umd',
    name: 'tatting',
  },
  plugins: [
    uglify(),
  ],
};
