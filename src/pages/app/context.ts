import type { Locale } from 'antd/es/locale';
import React from 'react';
import zhCN from 'antd/locale/zh_CN';

/**
 * 全局上下文配置
 */
export type MatConfig = {
  // 当前系统语言, 向后传递
  locale: Locale;
  setLocale: (locale: Locale) => void;

  // 当前样式主题
  // 默认样式: true, 暗黑模式: false
  light: boolean;
  setLight: (light: boolean) => void;
};

export const MatConfigContext = React.createContext<MatConfig>({
  locale: zhCN,
  setLocale: (locale: Locale): void => {},
  light: false,
  setLight: (light: boolean): void => {},
});

export default MatConfigContext;
