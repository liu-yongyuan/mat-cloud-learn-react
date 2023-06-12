const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base");

module.exports = merge(baseConfig, {
  mode: "production", // 生产模式下, 会开启 tree-shaking 和压缩代码,以及其他优化项
});
