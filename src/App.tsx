import React, { Suspense } from "react";
import { HashRouter, Route, Routes, Navigate  } from "react-router-dom";
import routers from "@/router/router";

import { Button, Layout, Menu } from "antd";
import "./styles/home.css";

const { Sider, Header, Content, Footer } = Layout;

const classMap = {
  menu: "flex justify-between bg-white rounded-b-sm shadow-xl",
  logo: "text-header font-header cursor-pointer",
  footer:"flex justify-center bg-white rounded-t-sm shadow-xl"
};

export default function () {
  return (
    <Layout className="h-screen">
      <Header className={classMap.menu}>
        <div className={classMap.logo}>Luoyunlai.xyz</div>
        <Menu mode="horizontal">
          {routers.map((router) => (
            <Menu.Item key={router.key}>{router.name}</Menu.Item>
          ))}
        </Menu>
      </Header>
      <Content>
            <HashRouter>
                
            </HashRouter>
      </Content>
      <Footer className={classMap.footer}>
            Made with  &nbsp;<span>❤</span> &nbsp; by luoyunlai
      </Footer>
    </Layout>
  );
}
