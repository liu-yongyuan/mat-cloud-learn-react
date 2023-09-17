module.exports = {
  parserOptions: {
    ecmaVersion: 'latest', // 使用最新的 ECMAScript 版本
    sourceType: 'module', // 使用模块化的文件结构
  },
  env: {
    browser: true, // 启用浏览器环境
    es2021: true, // 使用 ES2021 版本的特性
    commonjs: true, // 启用 CommonJS 模块规范
  },
  parser: '@typescript-eslint/parser', // 使用 '@typescript-eslint/parser' 作为解析器，用于解析 TypeScript 代码
  extends: [
    'prettier',
    'plugin:compat/recommended',
    'plugin:jest/recommended',
    'plugin:react/recommended',
    'plugin:import/typescript',
  ],
  plugins: ['react', 'prettier'], // 启用 react 插件
  rules: {
    'jest/no-deprecated-functions': 'off',
  },
};
