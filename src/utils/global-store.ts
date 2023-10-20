import { Locale } from 'antd/es/locale';
import { prefixLocale, prefixLight, boolTrueNumber } from './global-const';
import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';
import { log } from './log';
import { ComponentName } from './component-interface';

export const globalStoreCName: ComponentName = {
  // 填充组件名称即可
  name: 'globalStore',
  // 无特殊需求不改
  prefix: 'mat-utils',
};

export const storeLocale = (locale: Locale, setLocale: Function) => {
  log(globalStoreCName, locale.locale);
  localStorage.setItem(prefixLocale, locale.locale);
  setLocale(locale);
};

export const storeLocaleDefault = (): Locale => {
  const storeLocale = getSotreLocale();
  const defaultLocale = storeLocale ? (storeLocale === zhCN.locale ? zhCN : enUS) : zhCN;
  localStorage.setItem(prefixLocale, defaultLocale.locale);
  return defaultLocale;
};

export const getSotreLocale = () => {
  return localStorage.getItem(prefixLocale);
};

export const storeLight = (light: number, setLight: Function) => {
  log(globalStoreCName, light);
  localStorage.setItem(prefixLight, `${light}`);
  setLight(light);
};

export const storeLightDefault = (): number => {
  const storeLight = getStoreLight();
  const defaultLight = storeLight ? Number(storeLight) : boolTrueNumber;
  localStorage.setItem(prefixLight, `${defaultLight}`);
  return defaultLight;
};

export const getStoreLight = () => {
  return localStorage.getItem(prefixLight);
};
