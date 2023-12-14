import React from 'react';
import { Layout, theme } from 'antd';

const { Footer } = Layout;

const AppFooter: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Footer className="mat-page-layout-footer" style={{ backgroundColor: colorBgContainer }}>
      Mat Antd Example ©2023 Created by liu-yongyuan
    </Footer>
  );
};

export default AppFooter;
