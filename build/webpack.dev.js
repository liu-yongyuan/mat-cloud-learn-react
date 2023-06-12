const path = require("path");
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base");

// 合并公共配置, 并添加开发环境配置
module.exports = merge(baseConfig, {
  mode: "development", // 开发模式下打包速度更快, 省去一些代码优化步骤

  devtool: "eval-cheap-module-source-map", // 源码调试时的模式

  devServer: {
    port: 3000, // 服务器端口号
    hot: true, // 开启热模块替换功能
    compress: false, // gzip 压缩,开发模式下不开启,提升热更新的速度
    historyApiFallback: true, // 解决 history 路由一刷新变 404 的问题
    static: {
      directory: path.join(__dirname, "../public"), // 托管静态资源 public 文件夹
    },
  },
});
