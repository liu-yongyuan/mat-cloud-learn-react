const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

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
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  // 设置兼容目标浏览器版本,这里可以不写,babel-loader会自动寻找上面配置好的文件.browserslistrc
                  // "targets": {
                  //  "chrome": 35,
                  //  "ie": 9
                  // },
                  useBuiltIns: "usage", // 根据配置的浏览器兼容,以及代码中使用到的 api 进行引入 polyfill 按需添加
                  corejs: 3, // 配置使用 core-js 版本
                },
              ],
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
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
  ],
};
