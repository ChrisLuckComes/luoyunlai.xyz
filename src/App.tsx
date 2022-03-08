import React, { Suspense } from "react";
import { Layout, Menu, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import routers from "@/router/router";
import "./styles/home.css";

const { Header, Content, Footer } = Layout;

const classMap = {
  menu: "flex justify-between bg-white rounded-b-sm shadow-md",
  logo: "text-header font-header cursor-pointer",
  footer: "flex justify-center bg-white rounded-t-sm shadow-xl",
  content:"pt-content"
};

export default function App() {
  let navigate = useNavigate();
  let location = useLocation();

  const clickMenu = (e: { key: string }) => {
    const path = e.key === "/" ? "/" : `/${e.key}`;
    navigate(path + location.search);
  };

  return (
    <Layout className="h-screen">
      <Header className={classMap.menu}>
        <div className={classMap.logo}>Luoyunlai.xyz</div>
        <Menu defaultSelectedKeys={['/']} onClick={(e) => clickMenu(e)} mode="horizontal">
          {routers.map((router) => (
            <Menu.Item key={router.key}>{router.name}</Menu.Item>
          ))}
        </Menu>
      </Header>
      <Content className={classMap.content}>
        <Routes>
          {routers.map((router) => (
            <Route
              key={router.key}
              path={router.path}
              element={
                <Suspense
                  fallback={
                    <Spin
                      indicator={<LoadingOutlined className="text-icon" spin />}
                    ></Spin>
                  }
                >
                  <router.element />
                </Suspense>
              }
            ></Route>
          ))}
        </Routes>
      </Content>
      <Footer className={classMap.footer}>
        Made with &nbsp;<span>❤</span> &nbsp; by luoyunlai
      </Footer>
    </Layout>
  );
}
