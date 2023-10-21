import React, { useMemo, useState } from 'react';
import { ConfigProvider, Layout, theme } from 'antd';
import { Locale } from 'antd/es/locale';

import 'dayjs/locale/zh-cn';
import './app.less';
import AppHeader from './header/app-header';
import ComponentInterface from '@/utils/component-interface';
import { log } from '@/utils/log';
import MatConfigContext, { MatConfig } from './context';

import { storeLightDefault, storeLocaleDefault } from '@/utils/global-store';
import AppBreadCrumb from './breadcrumb/app-breadcrumb';

import { Outlet } from 'react-router-dom';

const { Content, Footer } = Layout;

export const AppComponent: ComponentInterface = {
  cname: {
    name: 'app',
    prefix: 'mat',
  },
};

const useApp = () => {
  const [locale, setLocale] = useState<Locale>(storeLocaleDefault());
  const [light, setLight] = useState<number>(storeLightDefault());
  const memoMatConfigContext = useMemo<MatConfig>(
    () => ({
      locale,
      setLocale,
      light,
      setLight,
    }),
    [locale, setLocale, light, setLight],
  );
  return { memoMatConfigContext };
};

const App: React.FC = () => {
  log(AppComponent.cname, 'render');

  const { memoMatConfigContext } = useApp();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <MatConfigContext.Provider value={memoMatConfigContext}>
      <ConfigProvider
        locale={memoMatConfigContext.locale}
        theme={{
          algorithm: memoMatConfigContext.light ? theme.defaultAlgorithm : theme.darkAlgorithm,
        }}
      >
        <Layout>
          <AppHeader mode="horizontal" />
          <Content style={{ padding: '0 50px' }}>
            <AppBreadCrumb />
            <Layout style={{ padding: '24px 0', background: colorBgContainer }}>
              <Content style={{ padding: '0 24px', minHeight: 280 }}>
                <Outlet />
              </Content>
            </Layout>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Mat Antd Example ©2023 Created by liu-yongyuan</Footer>
        </Layout>
      </ConfigProvider>
    </MatConfigContext.Provider>
  );
};

export default App;
