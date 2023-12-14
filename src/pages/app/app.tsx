import React, { useMemo, useState } from 'react';
import { ConfigProvider, Layout, theme } from 'antd';
import { Locale } from 'antd/es/locale';

import 'dayjs/locale/zh-cn';
import './app.less';
import AppHeader from './header/app-header';
import { log } from '@/utils/log';
import MatConfigContext, { MatConfig } from './context';

import { storeLightDefault, storeLocaleDefault } from '@/utils/global-store';
import AppBreadCrumb from './breadcrumb/app-breadcrumb';

import { Outlet } from 'react-router-dom';
import { getPrefix } from '@/utils/global-tools';
import AppFooter from './footer/app-footer';

const { Content, Footer } = Layout;

const cname = getPrefix('mat', 'App');

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
    [locale, setLocale, light, setLight]
  );
  return { memoMatConfigContext };
};

const App: React.FC = () => {
  log(cname, 'render');

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
        <Layout className="mat-page-container mat-page-layout">
          <AppHeader mode="horizontal" />
          <Content className="mat-page-layout-content">
            <Outlet />
          </Content>
          <AppFooter />
        </Layout>
      </ConfigProvider>
    </MatConfigContext.Provider>
  );
};

export default App;
