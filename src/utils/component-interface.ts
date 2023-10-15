/**
 * 组件抽象类
 */
export default interface ComponentInterface {
  // 组件名称对象
  cname: ComponentName;
}

/**
 * 组件名称
 * kebab-case
 */
export interface ComponentName {
  // 填充组件名称即可
  name: 'component' | string;
  // 无特殊需求不改
  prefix: 'mat' | string;
}

/**
 * 名组合
 * Context/Provider
 * Class 命名
 * Log 日志输出前缀
 */
export const getPrefix = ({ name, prefix }: ComponentName) => `${prefix}-${name}`;
