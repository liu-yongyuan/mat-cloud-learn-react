const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.join(__dirname, "../src/index.tsx"), //入口文件

  //打包文件出口
  output: {
    filename: "static/js/[name].js", //每个输出的js文件的名称
    path: path.join(__dirname, "../dist"), //打包结果输出的路径
    clean: true, //webapck5内置的，webpack4中需要配置clean-webpack-plugin来删除之前的dist
    publicPath: "/", //打包后文件的公共前缀路径
  },

  module: {
    rules: [
      // babel tsx 和 ts 文件转换
      {
        test: /.(ts|tsx)$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-typescript"],
          },
        },
      },
    ],
  },

  /* 
  extebsions是webpack的resolve解析配置下的选项，在==引入模块时不带入文件后缀==的时候，会在该配置数组中依次添加后缀查找文件。
  因为ts不支持引入以.ts、.tsx为后缀的文件，所以要在extensions中要配置，在很多第三方库中里面很多引入js文件且没有带后缀，所以也要配置下js。
 */
  resolve: {
    extensions: [".js", ".tsx", ".ts"],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"), // 模板用定义 root 节点的模板
      inject: true, // 自动注入静态资源
    }),
  ],
};