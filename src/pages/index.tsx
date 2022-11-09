import React, { Suspense } from 'react';
import { useImmer } from 'use-immer';

import { Layout, Menu, Spin } from 'antd';
import * as Sentry from '@sentry/react';
import { LoadingOutlined } from '@ant-design/icons';
import { Route, Routes, useNavigate } from 'react-router-dom';

const { Sider, Content } = Layout;
const { Item } = Menu;

const SentryRoutes = Sentry.withSentryReactRouterV6Routing(Routes);

const classMap = {
  layout: 'h-content',
  content: 'h-full pl-content pr-5 bg-white overflow-y-auto',
  sider: 'bg-white'
};

interface PageContentProps {
  menus: {
    key: string;
    path: string;
    name: string;
    element: React.LazyExoticComponent<() => JSX.Element>;
  }[];
}

export default function PageContent({ menus }: PageContentProps) {
  const navigate = useNavigate();
  const [selectedKeys, setSelectedKeys] = useImmer<string[]>([]);

  const clickMenu = (e: { key: string }) => {
    let path = menus.find(x => x.key === e.key)?.path!;
    setSelectedKeys(draft => (draft = [e.key]));
    navigate(path);
  };

  return (
    <Layout className={classMap.layout}>
      <Sider className={classMap.sider}>
        <Menu selectedKeys={selectedKeys} onClick={e => clickMenu(e)} mode="inline">
          {menus.map(menu => (
            <Item key={menu.key}>{menu.name}</Item>
          ))}
        </Menu>
      </Sider>
      <Content id="content" className={classMap.content}>
        <Routes>
          {menus?.map(child => (
            <Route
              key={child.key}
              path={child.path}
              element={
                <Suspense fallback={<Spin indicator={<LoadingOutlined className="text-icon" spin />}></Spin>}>
                  <child.element />
                </Suspense>
              }
            ></Route>
          ))}
        </Routes>
      </Content>
    </Layout>
  );
}
