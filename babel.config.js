const isDev = process.env.NODE_ENV === 'development'; // 是否为开发模式

module.exports = {
  plugins: [isDev && require.resolve("react-refresh/babel")],
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
};
