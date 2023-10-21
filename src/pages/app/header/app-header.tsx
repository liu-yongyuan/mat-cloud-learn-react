import ComponentInterface from '@/utils/component-interface';
import { log } from '@/utils/log';
import { Avatar, Menu, MenuProps, Flex, theme } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined, CheckCircleTwoTone, HomeTwoTone } from '@ant-design/icons';
import { Header } from 'antd/es/layout/layout';
import React, { useContext, useState } from 'react';
import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';
import MatConfigContext, { MatConfig } from '../context';
import { storeLocale, storeLight } from '@/utils/global-store';
import {
  boolFalseNumber,
  boolTrueNumber,
  prefixRoute,
  menuKeyAdmin,
  menuKeyHome,
  menuKeyUtil,
  menuKeySystem,
  menuKeySystemThem,
  menuKeySystemThemLight,
  menuKeySystemThemDark,
  menuKeySystemLocaleZhCN,
  menuKeySystemLocale,
  menuKeySystemLocaleEnUS,
} from '@/utils/global-const';
import { Link } from 'react-router-dom';

export interface AppHeaderProps {
  mode: 'horizontal' | 'vertical' | 'inline';
}

export const appHeader: ComponentInterface = {
  cname: {
    name: 'app-header',
    prefix: 'mat',
  },
};

const styleAvatar: React.CSSProperties = {
  backgroundColor: '#1677ff',
};

const useAppHeader = (props: AppHeaderProps, matConfigContext: MatConfig) => {
  const { light, locale, setLight, setLocale } = matConfigContext;

  const items: MenuProps['items'] = [
    {
      label: (
        <Link title="首页" to={'/'}>
          首页
        </Link>
      ),
      key: menuKeyHome,
      icon: React.createElement(HomeTwoTone),
    },
    {
      label: (
        <Link title="账号管理" to={'mail'}>
          账号管理
        </Link>
      ),
      key: menuKeyAdmin,
      icon: React.createElement(MailOutlined),
    },
    {
      label: '应用工具',
      key: menuKeyUtil,
      icon: React.createElement(AppstoreOutlined),
    },
    {
      label: '系统设置',
      key: menuKeySystem,
      icon: React.createElement(SettingOutlined),
      children: [
        {
          type: 'group',
          label: '样式主题',
          key: menuKeySystemThem,
          children: [
            {
              label: '高亮模式',
              key: menuKeySystemThemLight,
              icon: light === boolTrueNumber ? React.createElement(CheckCircleTwoTone) : null,
            },
            {
              label: '黑暗模式',
              key: menuKeySystemThemDark,
              icon: light === boolFalseNumber ? React.createElement(CheckCircleTwoTone) : null,
            },
          ],
        },
        {
          type: 'group',
          label: '中/英切换',
          key: 'system-locale',
          children: [
            {
              label: '中文',
              key: menuKeySystemLocaleZhCN,
              icon: locale === zhCN ? React.createElement(CheckCircleTwoTone) : null,
            },
            {
              label: '英文',
              key: menuKeySystemLocaleEnUS,
              icon: locale === enUS ? React.createElement(CheckCircleTwoTone) : null,
            },
          ],
        },
      ],
    },
    {
      label: (
        <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
          ant design 官网
        </a>
      ),
      key: 'outlink-ant-design',
    },
  ];

  const [menuSelectKey, setMenuSelectKey] = useState<string>(items.at(0)?.key as string);
  // 路由菜单路由的点击响应
  const handleMenuClickByLink = (key: string) => {
    if (!key.includes(prefixRoute)) {
      return;
    }
    setMenuSelectKey(key);
  };

  // 响应菜单主题切换的点击响应
  const handleMenuClickTheme = (key: string) => {
    if (!key.includes(menuKeySystemThem)) {
      return;
    }
    const themeNum = Object.is(menuKeySystemThemDark, key) ? boolFalseNumber : boolTrueNumber;
    storeLight(themeNum, setLight);
  };

  // 响应菜单语言切换的点击响应
  const handleMenuClickLocale = (key: string) => {
    if (!key.includes(menuKeySystemLocale)) {
      return;
    }
    const locale = Object.is(menuKeySystemLocaleZhCN, key) ? zhCN : enUS;
    storeLocale(locale, setLocale);
  };

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    const key = e.key;
    log(appHeader.cname, 'menu-click', key);
    handleMenuClickByLink(key);
    handleMenuClickTheme(key);
    handleMenuClickLocale(key);
  };

  return {
    items,
    menuSelectKey,
    handleMenuClick,
  };
};

const AppHeader: React.FC<AppHeaderProps> = (props) => {
  const { mode } = props;

  const matConfigContext = useContext<MatConfig>(MatConfigContext);
  const { items, menuSelectKey, handleMenuClick } = useAppHeader(props, matConfigContext);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Header style={{ background: colorBgContainer }}>
      <Flex gap="middle" align="center">
        <Avatar style={styleAvatar} size="large" shape="square">
          Mat
        </Avatar>
        <Menu onClick={handleMenuClick} selectedKeys={[menuSelectKey]} mode={mode} items={items} />
      </Flex>
    </Header>
  );
};

export default AppHeader;
