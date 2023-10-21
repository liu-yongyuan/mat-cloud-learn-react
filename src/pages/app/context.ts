import { boolTrueNumber } from '@/utils/global-const';
import type { Locale } from 'antd/es/locale';
import React from 'react';

/**
 * 全局上下文配置
 */
export type MatConfig = {
  // 当前系统语言, 向后传递
  locale: Locale;
  setLocale: (locale: Locale) => void;

  // 当前样式主题
  light: number;
  setLight: (light: number) => void;
};

export const MatConfigContext = React.createContext<MatConfig>({
  locale: undefined as unknown as Locale,
  setLocale: (locale: Locale): void => {},
  light: boolTrueNumber,
  setLight: (light: number): void => {},
});

export default MatConfigContext;
