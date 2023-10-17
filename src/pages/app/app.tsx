import React, { useContext, useMemo, useState } from 'react';
import { Breadcrumb, Card, ConfigProvider, Layout, Menu, ThemeConfig, theme } from 'antd';
import { Locale } from 'antd/es/locale';
import zhCN from 'antd/locale/zh_CN';
import 'dayjs/locale/zh-cn';

import './app.less';
import AppHeader from './header/app-header';
import ComponentInterface from '@/utils/component-interface';
import { log } from '@/utils/log';
import MatConfigContext, { MatConfig } from './context';

import Home from '../home/home';

const { Header, Content, Footer, Sider } = Layout;

export const AppComponent: ComponentInterface = {
  cname: {
    name: 'app',
    prefix: 'mat',
  },
};

const App: React.FC = () => {
  log(AppComponent.cname, 'render');

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [locale, setLocale] = useState<Locale>(zhCN);
  const [light, setLight] = useState<boolean>(true);
  const memoMatConfigContext = useMemo(
    () => ({
      locale,
      setLocale,
      light,
      setLight,
    }),
    [locale, setLocale, light, setLight],
  );

  return (
    <MatConfigContext.Provider value={memoMatConfigContext}>
      <ConfigProvider
        locale={memoMatConfigContext.locale}
        theme={{
          algorithm: light ? theme.defaultAlgorithm : theme.darkAlgorithm,
        }}
      >
        <Layout>
          <AppHeader mode="horizontal" />
          <Content style={{ padding: '0 50px' }}>
            <Breadcrumb
              style={{ margin: '16px 0' }}
              items={[{ title: '账号管理' }, { title: '用户信息' }]}
            ></Breadcrumb>
            <Layout style={{ padding: '24px 0', background: colorBgContainer }}>
              <Sider style={{ background: colorBgContainer }} width={200}></Sider>
              <Content style={{ padding: '0 24px', minHeight: 280 }}>
                <Home />
              </Content>
            </Layout>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
        </Layout>
      </ConfigProvider>
    </MatConfigContext.Provider>
  );
};

export default App;
