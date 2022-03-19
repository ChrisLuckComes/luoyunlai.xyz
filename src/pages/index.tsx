import React, { Suspense } from "react";
import { useImmer } from "use-immer";

import { Layout, Menu, Spin } from "antd";

import { LoadingOutlined } from "@ant-design/icons";

const { Sider, Content } = Layout;
const { Item } = Menu;

const classMap = {
  layout: "h-content",
  content: "h-full pl-content bg-white overflow-y-auto",
  sider: "bg-white",
};

interface PageContentProps {
  menus: {
    key: string;
    path: string;
    name: string;
    element: React.LazyExoticComponent<() => JSX.Element>;
  }[];
}

export default function PageContent(props: PageContentProps) {
  const [selectedKeys, setSelectedKeys] = useImmer<string[]>([]);

  const clickMenu = (e: { key: string }) => {
    setSelectedKeys((draft) => (draft = [e.key]));
  };

  const current = () => {
    if (selectedKeys.length !== 0) {
      const Element = props.menus.find((x) => x.key === selectedKeys[0])
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
    <Layout className={classMap.layout}>
      <Sider className={classMap.sider}>
        <Menu
          selectedKeys={selectedKeys}
          onClick={(e) => clickMenu(e)}
          mode="inline"
        >
          {props.menus.map((menu) => (
            <Item key={menu.key}>{menu.name}</Item>
          ))}
        </Menu>
      </Sider>
      <Content className={classMap.content}>{current()}</Content>
    </Layout>
  );
}
