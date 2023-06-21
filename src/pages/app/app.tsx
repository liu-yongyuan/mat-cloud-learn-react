import React, { useState } from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import defaultAvatar from "@/assets/images/business/mat-default-avatar.png";
import defaultSoltCover from "@/assets/images/business/mat-default-solt-cover.jpg";
import "./app.less";
import User from "../user/user";

const { Header, Content, Footer, Sider } = Layout;

const items1: MenuProps["items"] = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const items2: MenuProps["items"] = [
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
].map((icon, index) => {
  const key = String(index + 1);

  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,

    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});

const App: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  console.log(`NODE_ENV=${process.env.NODE_ENV}`);
  console.log(`BASE_ENV=${process.env.BASE_ENV}`);

  const [count, setCounts] = useState("");
  const onChange = (e: any) => {
    setCounts(e.target.value);
  };

  return (
    <Layout>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={items1}
        />
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Layout style={{ padding: "24px 0", background: colorBgContainer }}>
          <Sider style={{ background: colorBgContainer }} width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%" }}
              items={items2}
            />
          </Sider>
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            Content
            <hr />
            <h2>The Content</h2>
            <hr />
            <img src={defaultAvatar} alt="默认头像 10kb 内" />
            <img src={defaultSoltCover} alt="默认占位封面 28kb" />
            <hr />
            <User />
            <hr />
            <p>受控组件</p>
            <input type="text" value={count} onChange={onChange} />
            <br />
            <p>非受控组件</p>
            <input type="text" />
            <input type="text" />
            <div>aaa</div>
            <div>cdbc</div>
            <div>cdbc</div>
            <div>cdbc</div>
            <div>cdbc</div>
            <hr />
            <div>1,2,3,4,5</div>
            <div>1,2,3,4,5</div>
            <div>1,2,3,4,5</div>
            <hr/>
            <div>6,7,8</div>
            <hr/>
            <div>8,9,10</div>
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2023 Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default App;
