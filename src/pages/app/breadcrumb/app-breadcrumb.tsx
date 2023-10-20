import React from 'react';
import { Breadcrumb } from 'antd';
import { ItemType } from 'antd/es/breadcrumb/Breadcrumb';
import { Link } from 'react-router-dom';

const breadcrumbStyle: React.CSSProperties = {
  margin: '16px 0',
};

const itemRender = (route: ItemType, params: any, routes: ItemType[], paths: string[]): React.ReactNode => {
  const last = routes.indexOf(route) === routes.length - 1;
  return last ? <span>{route.breadcrumbName}</span> : <Link to={`/${paths.join('/')}`}>{route.breadcrumbName}</Link>;
};

const AppBreadCrumb: React.FC = () => {
  return <Breadcrumb style={breadcrumbStyle} itemRender={itemRender}></Breadcrumb>;
};

export default AppBreadCrumb;
