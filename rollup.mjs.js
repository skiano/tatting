import uglify from "rollup-plugin-uglify-es";

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/tatting.mjs',
    format: 'es',
  },
  plugins: [
    uglify(),
  ],
};
