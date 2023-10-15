import ComponentInterface from '@/utils/component-interface';
import { log } from '@/utils/log';
import { Menu, MenuProps } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { Header } from 'antd/es/layout/layout';
import React, { useState } from 'react';

export interface AppHeaderProps {
  theme: 'light' | 'dark';
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
    label: 'Navigation One',
    key: 'mail',
    icon: React.createElement(MailOutlined),
  },
  {
    label: 'Navigation Two',
    key: 'app',
    icon: React.createElement(AppstoreOutlined),
    disabled: true,
  },
  {
    label: 'Navigation Three - Submenu',
    key: 'SubMenu',
    icon: React.createElement(SettingOutlined),
    children: [
      {
        type: 'group',
        label: 'Item 1',
        children: [
          {
            label: 'Option 1',
            key: 'setting:1',
          },
          {
            label: 'Option 2',
            key: 'setting:2',
          },
        ],
      },
      {
        type: 'group',
        label: 'Item 2',
        children: [
          {
            label: 'Option 3',
            key: 'setting:3',
          },
          {
            label: 'Option 4',
            key: 'setting:4',
          },
        ],
      },
    ],
  },
  {
    label: (
      <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
        Navigation Antd - Link
      </a>
    ),
    key: 'alipay',
  },
];
const AppHeader: React.FC<AppHeaderProps> = (props) => {
  const { mode, theme } = props;

  const [current, setCurrent] = useState('mail');
  const onClick: MenuProps['onClick'] = (e) => {
    log(appHeader.cname, 'menu-click', e);
  };

  return (
    <Header>
      <Menu onClick={onClick} selectedKeys={[current]} theme={theme} mode={mode} items={items} />
    </Header>
  );
};

export default AppHeader;
