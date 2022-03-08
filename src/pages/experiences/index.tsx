import React, { Suspense, useMemo } from "react";
import { useImmer } from "use-immer";

import { Layout, Menu, Spin } from "antd";
import routers from "@/router/router";
import { LoadingOutlined } from "@ant-design/icons";

const { Sider, Content } = Layout;
const { Item } = Menu;

const menus =
  routers.find((router) => router.key === "experience")?.children ?? [];

export default function Experience() {
  const [selectedKeys, setSelectedKeys] = useImmer<string[]>([]);

  const clickMenu = (e: { key: string }) => {
    setSelectedKeys((draft) => (draft = [e.key]));
  };

  const current = () => {
    if (selectedKeys.length !== 0) {
      const Element = menus.find((x) => x.key === selectedKeys[0])
        ?.element as React.FC;
      return (
        (
          <Suspense
            fallback={
              <Spin
                indicator={<LoadingOutlined className="text-icon" spin />}
              ></Spin>
            }
          >
            <Element />
          </Suspense>
        ) ?? <></>
      );
    } else {
      return <></>;
    }
  };

  return (
    <Layout>
      <Sider>
        <Menu
          selectedKeys={selectedKeys}
          onClick={(e) => clickMenu(e)}
          mode="inline"
        >
          {menus.map((menu) => (
            <Item key={menu.key}>{menu.name}</Item>
          ))}
        </Menu>
      </Sider>
      <Content>{current()}</Content>
    </Layout>
  );
}
