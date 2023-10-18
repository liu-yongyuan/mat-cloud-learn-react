import ComponentInterface from '@/utils/component-interface';
import { log } from '@/utils/log';
import { Avatar, Menu, MenuProps, Flex, theme } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { Header } from 'antd/es/layout/layout';
import React, { useContext, useState } from 'react';
import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';
import MatConfigContext, { MatConfig } from '../context';

export interface AppHeaderProps {
  mode: 'horizontal' | 'vertical' | 'inline';
}

export const appHeader: ComponentInterface = {
  cname: {
    name: 'app-header',
    prefix: 'mat',
  },
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
          },
          {
            label: '黑暗模式',
            key: 'system-theme-dark',
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
          },
          {
            label: '英文',
            key: enUS.locale,
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

const styleAvatar: React.CSSProperties = {
  backgroundColor: '#1677ff',
};

const AppHeader: React.FC<AppHeaderProps> = (props) => {
  const { mode } = props;

  const { setLocale, setLight } = useContext<MatConfig>(MatConfigContext);

  const [current, setCurrent] = useState('mail');
  const onClick: MenuProps['onClick'] = (e) => {
    log(appHeader.cname, 'menu-click', e.key);
    switch (e.key) {
      case zhCN.locale:
        setLocale(zhCN);
        break;
      case enUS.locale:
        setLocale(enUS);
        break;
      case 'system-theme-light':
        setLight(true);
        break;
      case 'system-theme-dark':
        setLight(false);
        break;
    }
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Header style={{ background: colorBgContainer }}>
      <Flex gap="middle" align="center">
        <Avatar style={styleAvatar} size="large" shape="square">
          Mat
        </Avatar>
        <Menu onClick={onClick} selectedKeys={[current]} mode={mode} items={items} />
      </Flex>
    </Header>
  );
};

export default AppHeader;
