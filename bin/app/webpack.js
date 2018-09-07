const webpack = require("webpack");
const path = require("path");

const config = {
  mode: "production",
  entry: path.resolve(__dirname, "app/App.js"),
  output: {
    path: path.resolve(__dirname, "public/js/"),
    publicPath: "/js/",
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: [path.resolve(__dirname, "node_modules")],
        loader: "babel-loader"
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, "public"),
    historyApiFallback: true,
    compress: true,
    open: true
  }
};

module.exports = config;
