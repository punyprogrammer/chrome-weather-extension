const path = require("path");
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.common.js");
module.exports = merge(baseConfig, {
  mode: "development",
  devtool: "cheap-module-source-map",
});
