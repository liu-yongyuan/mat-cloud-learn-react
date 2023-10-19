import ComponentInterface from '@/utils/component-interface';
import { log } from '@/utils/log';
import { Avatar, Menu, MenuProps, Flex, theme } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined, CheckCircleTwoTone } from '@ant-design/icons';
import { Header } from 'antd/es/layout/layout';
import React, { useContext, useState } from 'react';
import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';
import MatConfigContext, { MatConfig } from '../context';
import { storeLocale, storeLight } from '@/utils/global-store';
import { BoolFalseNumber, BoolTrueNumber } from '@/utils/global-const';

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

  const [menuCurrent, setMenuCurrent] = useState('mail');
  const handleMenuClick: MenuProps['onClick'] = (e) => {
    log(appHeader.cname, 'menu-click', e.key);
    switch (e.key) {
      case zhCN.locale:
        storeLocale(zhCN, setLocale);
        break;
      case enUS.locale:
        storeLocale(enUS, setLocale);
        break;
      case 'system-theme-light':
        storeLight(BoolTrueNumber, setLight);
        break;
      case 'system-theme-dark':
        storeLight(BoolFalseNumber, setLight);
        break;
    }
  };

  const items: MenuProps['items'] = [
    {
      label: '账号管理',
      key: 'mail',
      icon: React.createElement(MailOutlined),
    },
    {
      label: '应用工具',
      key: 'app',
      icon: React.createElement(AppstoreOutlined),
    },
    {
      label: '系统设置',
      key: 'system',
      icon: React.createElement(SettingOutlined),
      children: [
        {
          type: 'group',
          label: '样式主题',
          key: 'system-theme',
          children: [
            {
              label: '高亮模式',
              key: 'system-theme-light',
              icon: light === BoolTrueNumber ? React.createElement(CheckCircleTwoTone) : null,
            },
            {
              label: '黑暗模式',
              key: 'system-theme-dark',
              icon: light === BoolFalseNumber ? React.createElement(CheckCircleTwoTone) : null,
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
              key: zhCN.locale,
              icon: locale === zhCN ? React.createElement(CheckCircleTwoTone) : null,
            },
            {
              label: '英文',
              key: enUS.locale,
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
      key: 'link-ant-design',
    },
  ];

  return {
    items,
    menuCurrent,
    handleMenuClick,
  };
};

const AppHeader: React.FC<AppHeaderProps> = (props) => {
  const { mode } = props;

  const matConfigContext = useContext<MatConfig>(MatConfigContext);
  const { items, menuCurrent, handleMenuClick } = useAppHeader(props, matConfigContext);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Header style={{ background: colorBgContainer }}>
      <Flex gap="middle" align="center">
        <Avatar style={styleAvatar} size="large" shape="square">
          Mat
        </Avatar>
        <Menu onClick={handleMenuClick} selectedKeys={[menuCurrent]} mode={mode} items={items} />
      </Flex>
    </Header>
  );
};

export default AppHeader;
