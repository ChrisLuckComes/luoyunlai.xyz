import { Suspense } from 'react';
import { Layout, Menu, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import routers from '@/router/router';
import './styles/home.css';
import { useImmer } from 'use-immer';

import policeIcon from '@/images/policeIcon.png';
import CAIGOU from '@/images/caigou.gif';

const { Header, Content, Footer } = Layout;

const classMap = {
  layout: 'h-screen bg-white',
  menu: 'flex justify-between bg-white rounded-b-sm shadow-md min-w-300',
  logo: 'text-header font-header cursor-pointer flex-center',
  footer: 'flex justify-center bg-white rounded-t-sm shadow-xl',
  content: 'pt-content overflow-y-auto'
};

export default function App() {
  let navigate = useNavigate();
  let location = useLocation();

  const [selectedKeys, setSelectedkeys] = useImmer(['/']);

  const clickMenu = (e: { key: string }) => {
    setSelectedkeys(draft => (draft = [e.key]));
    const path = e.key === '/' ? '/' : `/${e.key}`;
    navigate(path + location.search);
  };

  return (
    <Layout className={classMap.layout}>
      <Header className={classMap.menu}>
        <div onClick={() => clickMenu({ key: '/' })} className={classMap.logo}>
          <div className="flex-shrink-0">
            <img className="h-36 mr-8" src={CAIGOU} alt="caigou" width={36} />
          </div>
          <span>Luoyunlai.top</span>
        </div>
        <Menu className="min-w-header-menu" selectedKeys={selectedKeys} onClick={e => clickMenu(e)} mode="horizontal">
          {routers.map(router => (
            <Menu.Item key={router.key}>{router.name}</Menu.Item>
          ))}
        </Menu>
      </Header>
      <Content className={classMap.content}>
        <Routes>
          {routers.map(router => (
            <Route
              key={router.key}
              path={router.path + '/*'}
              element={
                <Suspense fallback={<Spin indicator={<LoadingOutlined className="text-icon" spin />}></Spin>}>
                  <router.element menus={router.children as []} />
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
