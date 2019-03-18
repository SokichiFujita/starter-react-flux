const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const WebpackBundleSizeAnalyzerPlugin = require("webpack-bundle-size-analyzer")
  .WebpackBundleSizeAnalyzerPlugin;

const config = {
  mode: "production",
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      openAnalyzer: true,
      reportFilename: "../analysis/bundle-analyzer.html"
    }),
    new WebpackBundleSizeAnalyzerPlugin("../analysis/bundle-size-analyzer.log")
  ]
};

module.exports = merge(common, config);
