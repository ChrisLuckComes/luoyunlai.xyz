import React, { Suspense, useEffect } from "react";
import { useImmer } from "use-immer";

import { Layout, Menu, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { MenuItem, getItem } from "@/App";
import BackTop from "@/component/backTop";

const { Sider, Content } = Layout;

const classMap = {
  content: "px-10 bg-white overflow-y-auto max-w-content",
  sider: "bg-white"
};

interface PageContentProps {
  menus: {
    key: string;
    path: string;
    name: string;
    group?: string;
    element: React.LazyExoticComponent<() => JSX.Element>;
  }[];
  groups?: string[];
}

export default function PageContent({ menus, groups }: PageContentProps) {
  const navigate = useNavigate(),
    location = useLocation();

  const [selectedKeys, setSelectedKeys] = useImmer<string[]>([
    location.pathname
  ]);

  const clickMenu = (e: { key: string }) => {
    setSelectedKeys((draft) => (draft = [e.key]));
    navigate(e.key);
  };

  useEffect(() => {
    setSelectedKeys([location.pathname]);
  }, [location]);

  let items: MenuItem[] = [];

  if (groups) {
    items = groups.map((group) =>
      getItem(
        group,
        group,
        menus
          .filter((menu) => menu.group === group)
          .map((r) => getItem(r.name, r.key)),
        "group"
      )
    );
  } else {
    items = menus.map((r) => getItem(r.name, r.key));
  }

  return (
    <Layout className="h-content">
      <Sider className={classMap.sider}>
        <Menu
          className="h-full overflow-y-auto"
          selectedKeys={selectedKeys}
          onClick={(e) => clickMenu(e)}
          mode="inline"
          items={items}
        ></Menu>
      </Sider>
      <Content id="content" className={classMap.content}>
        <Routes>
          {menus?.map((child) => (
            <Route
              key={child.key}
              path={child.path}
              element={
                <Suspense
                  fallback={
                    <Spin
                      indicator={<LoadingOutlined className="text-icon" spin />}
                    ></Spin>
                  }
                >
                  <child.element />
                  <BackTop />
                </Suspense>
              }
            ></Route>
          ))}
        </Routes>
      </Content>
    </Layout>
  );
}
