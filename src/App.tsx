import React, { Suspense } from "react";
import { Layout, Menu, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import routers from "@/router/router";
import "./styles/home.css";
import { useImmer } from "use-immer";

const { Header, Content, Footer } = Layout;

const classMap = {
  layout: "h-screen bg-white",
  menu: "flex justify-between bg-white rounded-b-sm shadow-md",
  logo: "text-header font-header cursor-pointer",
  footer: "flex justify-center bg-white rounded-t-sm shadow-xl",
  content: "pt-content overflow-y-auto",
};

export default function App() {
  let navigate = useNavigate();
  let location = useLocation();

  const [selectedKeys, setSelectedkeys] = useImmer(["/"]);

  const clickMenu = (e: { key: string }) => {
    setSelectedkeys((draft) => (draft = [e.key]));
    const path = e.key === "/" ? "/" : `/${e.key}`;
    navigate(path + location.search);
  };

  return (
    <Layout className={classMap.layout}>
      <Header className={classMap.menu}>
        <div onClick={() => clickMenu({ key: "/" })} className={classMap.logo}>
          Luoyunlai.xyz
        </div>
        <Menu
          selectedKeys={selectedKeys}
          onClick={(e) => clickMenu(e)}
          mode="horizontal"
        >
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
                  <router.element menus={router.children as []} />
                </Suspense>
              }
            ></Route>
          ))}
        </Routes>
      </Content>
      <Footer className={classMap.footer}>
        <span>
          Copyright 2022- Made with &nbsp;<span>❤</span> &nbsp; by luoyunlai.
          All Rights Reserved{" "}
        </span>
        &nbsp;
        <a href="https://beian.miit.gov.cn">粤ICP备2022028524号-1</a>
      </Footer>
    </Layout>
  );
}
