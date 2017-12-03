const webpack = require('webpack');
const path = require('path');

const config = {
  devtool: "inline-source-map",
  entry:  path.resolve(__dirname, "app/App.js"),
  output: {
    path: path.resolve(__dirname, "public/js/"),
    publicPath: "/js/",
    filename: "bundle.js"
  },
  module: {
    rules: [{
      test: /.jsx?$/,
      exclude: [path.resolve(__dirname, "node_modules")],
      loader: "babel-loader",
      query: {
        presets: ["env","react","stage-0"]
      }
    }]
  },
  devServer: {
    contentBase: path.resolve(__dirname, "public"),
    historyApiFallback: true,
    compress: true, 
  },
}

if (process.env.NODE_ENV === 'production') {
  config.devtool = false;
  config.plugins = [
    new webpack.optimize.UglifyJsPlugin({comments: false}),
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: JSON.stringify('production')}
    })
  ];
};

module.exports = config;
