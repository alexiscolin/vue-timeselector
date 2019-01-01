const path = require('path');
const merge = require('webpack-merge');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

let commonConfig = {
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }, {
        test: /\.js$/,
        loader: 'babel-loader'
      }, {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
};

module.exports = [
  // Config 1: For browser environment
  merge(commonConfig, {
    entry: path.resolve(__dirname + '/src/plugin.js'),
    output: {
      filename: 'vue-timeselector.min.js',
      libraryTarget: 'window',
      library: 'VueTimeSelector'
    }
  }),

  // Config 2: For Node-based development environments
  merge(commonConfig, {
    entry: {
      VueTimeSelector: path.resolve(__dirname + '/src/VueTimeSelector.vue')
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
      libraryTarget: 'umd',
      library: 'vue-timeselector',
      umdNamedDefine: true
    }
  })
];
