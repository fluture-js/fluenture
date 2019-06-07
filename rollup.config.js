export default {
  input: 'index.js',
  external: ['fluture/index.js'],
  output: {
    format: 'umd',
    file: 'index.cjs',
    interop: false,
    name: 'fluenture',
    globals: {
      'fluture/index.js': 'Fluture'
    },
    paths: {
      'fluture/index.js': 'fluture'
    }
  }
};
