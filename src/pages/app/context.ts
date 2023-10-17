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
};

export const MatConfigContext = React.createContext<MatConfig>({
  locale: zhCN,
  setLocale: (locale: Locale): void => {},
});

export default MatConfigContext;
