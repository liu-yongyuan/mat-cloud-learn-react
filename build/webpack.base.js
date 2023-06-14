const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

console.log(`NODE_ENV=${process.env.NODE_ENV}`);
console.log(`BASE_ENV=${process.env.BASE_ENV}`);

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
        use: ['babel-loader'],
      },
      // css 文件处理,通过插件解析 css 样式和注入到页面
      {
        test: /.(css|less)$/,
        use: ["style-loader", "css-loader", "postcss-loader", "less-loader"],
      },
      // 使用 webpack5 自带的 asset-module 处理图片文件
      {
        test: /.(png|jpg|jpeg|gif|svg)$/, // 匹配图片文件
        type: "asset", // type 选择 asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于 10kb 转 base64
          },
        },
        generator: {
          filename: "static/images/[name][ext]", // 文件输出目录和命名
        },
      },
      // 处理字体和媒体文件. 处理方式和图片一样
      {
        test: /.(woff2?|ttf|eot)$/,
        type: "asset",
        parser: {
          dataUrlCondition: 10 * 1024,
        },
        generator: {
          filename: "static/font/[name][ext]", // 文件输出目录和命名
        },
      },
      {
        test: /.(map4|mp3|webm|wav|flac|acc|ogg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: 10 * 1024,
        },
        generator: {
          filename: "static/media/[name][ext]", // 文件输出目录和命名
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
    /* html 模板插件 */
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"), // 模板用定义 root 节点的模板
      inject: true, // 自动注入静态资源
    }),

    /* process.env.BASE_ENV注入到业务代码里面，就可以通过该环境变量设置对应环境的接口地址和数据 */
    new webpack.DefinePlugin({
      "process.env.BASE_ENV": JSON.stringify(process.env.BASE_ENV),
    }),

    /* 在不需要刷新浏览器的前提下模块热更新,并且能够保留react组件的状态
      1,css 和 less 
    */
    new ReactRefreshPlugin(), // 添加热更新文件
  ],
};
