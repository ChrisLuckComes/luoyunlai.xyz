import React, { Suspense } from 'react';
import { useImmer } from 'use-immer';

import { Layout, Menu, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { MenuItem, getItem } from '@/App';

const { Sider, Content } = Layout;
const { Item } = Menu;

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
    group?: string;
    element: React.LazyExoticComponent<() => JSX.Element>;
  }[];
  groups?: string[];
}

export default function PageContent({ menus, groups }: PageContentProps) {
  const navigate = useNavigate(),
    location = useLocation();
    
  const [selectedKeys, setSelectedKeys] = useImmer<string[]>([location.pathname]);

  const clickMenu = (e: { key: string }) => {
    setSelectedKeys(draft => (draft = [e.key]));
    navigate(e.key);
  };

  let items: MenuItem[] = [];

  if (groups) {
    items = groups.map(group =>
      getItem(
        group,
        group,
        menus.filter(menu => menu.group === group).map(r => getItem(r.name, r.key)),
        'group'
      )
    );
  } else {
    items = menus.map(r => getItem(r.name, r.key));
  }

  return (
    <Layout className={classMap.layout}>
      <Sider className={classMap.sider}>
        <Menu selectedKeys={selectedKeys} onClick={e => clickMenu(e)} mode="inline" items={items}></Menu>
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
