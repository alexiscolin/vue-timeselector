const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  entry: {
    VueTimeSelector: './index.js',
    demos: './demos/script.js'
  },
  output: {
   path: path.resolve(__dirname, 'dist'),
   filename: '[name].js'
 },
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
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebPackPlugin({
      template: "index.html",
      filename: "./index.html"
    })
  ],
  devServer: {
    compress: true,
    open: true,
    stats: "errors-only",
    port: 9900
  }
};
