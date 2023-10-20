import { getPrefix } from './global-tools';

export const prefixLight = 'light';
export const prefixLocale = 'locale';
export const boolTrueNumber = 1; // 1 true
export const boolFalseNumber = 0; // 0 false
export const prefixRoute = 'mat-route';
export const prefixMenu = 'mat-menu';
export const menuKeyHome = getPrefix(prefixRoute, 'home');
export const menuKeyAdmin = getPrefix(prefixRoute, 'admin');
export const menuKeyUtil = getPrefix(prefixRoute, 'util');
export const menuKeySystem = getPrefix(prefixMenu, 'system');
export const menuKeySystemThem = getPrefix(prefixMenu, getPrefix('system', 'theme'));
export const menuKeySystemThemLight = getPrefix(menuKeySystemThem, 'light');
export const menuKeySystemThemDark = getPrefix(menuKeySystemThem, 'dark');
export const menuKeySystemLocale = getPrefix(prefixMenu, getPrefix('system', 'locale'));
export const menuKeySystemLocaleZhCN = getPrefix(menuKeySystemLocale, 'zh-CN');
export const menuKeySystemLocaleEnUS = getPrefix(menuKeySystemLocale, 'en-US');
