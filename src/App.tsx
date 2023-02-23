import { Key, ReactNode, Suspense } from 'react';
import { Layout, Menu, MenuProps, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import routers from '@/router/router';
import './styles/home.css';
import { useImmer } from 'use-immer';

import CAIGOU from '@/images/caigou.gif';
import { LazyImage } from './component/image';

export type MenuItem = Required<MenuProps>['items'][number];

const { Header, Content, Footer } = Layout;

const classMap = {
  layout: 'h-screen bg-white',
  menu: 'flex justify-between bg-white rounded-b-sm shadow-md min-w-300',
  logo: 'text-header font-header cursor-pointer flex-center',
  footer: 'flex justify-center bg-white rounded-t-sm shadow-xl',
  content: 'pt-content overflow-y-auto'
};

export const getItem = (label: ReactNode, key: Key, children?: MenuItem[], type?: 'group') => {
  return { key, children, label, type } as MenuItem;
};

export default function App() {
  let navigate = useNavigate();
  let location = useLocation();

  const [selectedKeys, setSelectedkeys] = useImmer(['/']);

  const clickMenu = (e: { key: string }) => {
    setSelectedkeys(draft => (draft = [e.key]));
    navigate(e.key + location.search);
  };

  const items: MenuProps['items'] = routers
    .filter(router => router.key !== '/')
    .map(router => {
      let children: MenuItem[] = [];
      if (router.groups) {
        children = router.groups.map(group =>
          getItem(
            group,
            group,
            router.children.filter(c => c.group === group).map(r => getItem(r.name, r.key)),
            'group'
          )
        );
      } else {
        if (router?.children) {
          children = router?.children.map(r => getItem(r.name, r.key));
        } else {
          children = [getItem(router.name, router.key)];
        }
      }
      return getItem(router.name, router.key, children);
    });

  return (
    <Layout className={classMap.layout}>
      <Header className={classMap.menu}>
        <div onClick={() => clickMenu({ key: '/' })} className={classMap.logo}>
          <div className="flex-shrink-0">
            <LazyImage className="h-36 mr-8" src={CAIGOU} width={36} />
          </div>
          <span>Luoyunlai.top</span>
        </div>
        <Menu
          className="min-w-header-menu"
          selectedKeys={selectedKeys}
          onClick={e => clickMenu(e)}
          mode="horizontal"
          items={items}
        ></Menu>
      </Header>
      <Content className={classMap.content}>
        <Routes>
          {routers.map(router => (
            <Route
              key={router.key}
              path={router.path + '/*'}
              element={
                <Suspense fallback={<Spin indicator={<LoadingOutlined className="text-icon" spin />}></Spin>}>
                  <router.element menus={router.children as []} groups={router.groups} />
                </Suspense>
              }
            ></Route>
          ))}
        </Routes>
      </Content>
      <Footer className={classMap.footer}>
        <span>
          Copyright 2022- Made with &nbsp;<span>❤</span> &nbsp; by luoyunlai. All Rights Reserved
        </span>
      </Footer>
    </Layout>
  );
}
