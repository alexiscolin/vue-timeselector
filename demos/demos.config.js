const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('../webpack.config.js');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = merge(baseConfig[1], {
  devtool: 'eval-source-map',

  entry: {
     demos: './demos/script.js'
  },

  devServer: {
    compress: true,
    open: true,
    stats: "errors-only",
    port: 9900
  },

  plugins: [
    new HtmlWebPackPlugin({
      template: "./demos/index.html",
      filename: "index.html"
    })
  ]
});
