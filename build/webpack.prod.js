const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(baseConfig, {
  mode: "production", // 生产模式下, 会开启 tree-shaking 和压缩代码,以及其他优化项
  plugins: [
    // 复制插件
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../public"), // 从 public 文件夹
          to: path.resolve(__dirname, "../dist"), // 复制到 dist 文件夹
          filter: (source) => {
            return !source.includes("index.html"); // 忽略 index.html
          },
        },
      ],
    }),

    // 抽离 css 插件
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[contenthash:8].css",
    }),
  ],
});
