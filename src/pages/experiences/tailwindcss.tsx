import React from "react";
import { Image } from "antd";
import { useMarkDown } from "@/hooks/useMarkdown";

import { classMap, imgFallback } from "@/constants/constant";

const touDa = require("@/images/头大.webp");

const indexCss = `
~~~css
/* index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
~~~
`;

const postcss = `
~~~js
// postcss.config.js
const tailwindcss = require("tailwindcss");

module.exports = {
  plugins: [
    require("tailwindcss/nesting"),
    tailwindcss("./tailwind.js"),
    require("autoprefixer"),
  ],
};

~~~
`;

const tailwind = `
~~~js
// tailwind.config.js
module.exports = {
  mode: "jit",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {},
  plugins: [],
};
~~~
`;

/* eslint-disable */
const scripts = `
~~~json
"scripts":{
  "start:css": "tailwindcss -o src/styles/tailwind.css --watch",
  "start": "concurrently \"npm run start:css\" \"node scripts/start.js\"",
}
~~~
`;
/* eslint-disable */

const html = `
~~~tsx
const classMap = {
  layout: "h-content",
  content: "h-full pl-content bg-white overflow-y-auto",
  sider: "bg-white",
};

return (
  <Layout className={classMap.layout}>
    <Sider className={classMap.sider}>
    </Sider>
    <Content className={classMap.content}></Content>
  </Layout>
);
~~~
`;

export default function () {
  return (
    <article className={classMap.article}>
      <h1 className={classMap.pageTitle}>来不及了，快上车tailwindcss🚘</h1>
      <br />
      <h2 className={classMap.articleTitle}>前言</h2>
      <p>
        前端最讨厌的大概就是写css了🤮，而且还要注意优先级，命名覆盖等问题，取个啥名好是所有游戏的第一个难题🐶。项目大了css怎么维护真让人头大，多人协作一定会出现同样的样式却用不同的命名写了n次。
      </p>
      <p>
        更让人烦的是某些css预处理器，对，说的就是你{" "}
        <strong className={classMap.articleTitle}>sass</strong>
      </p>
      <p>
        首先某些脚手架初始化时涉及到node-sass的安装问题，菜鸟需要折腾好久。再就是sass-loader的性能问题，根据webpack-measure的插件显示sass-loader耗时着实不短。
      </p>
      <br />
      <Image
        placeholder={true}
        width={220}
        height={220}
        src={touDa}
        fallback={imgFallback}
        preview={false}
      />
      <br />
      如果有一个人帮你写好了大部分的原子css（之前的项目里是我），开发时只需要引用组合，最多只是简单配置，那该有多香啊。
      <br />
      <a className={classMap.href} href="https://www.tailwindcss.cn/">
        tailwindcss
      </a>
      就是这么一个优秀的css框架，使用它之后写css只需要配置跟组合。响应式，主题都可以支持。性能方面支持tree-shaking，使用postcss预处理器可以摆脱sass
      <h2 className={classMap.articleTitle}>开始使用</h2>
      <code>npm install tailwindcss</code>&nbsp;
      <span className={classMap.assist}>
        <a className={classMap.href} href="https://www.postcss.com.cn/">
          postcss
        </a>
        &nbsp;create-react-app脚手架自带，vue-cli可选，其他情况就需要自行安装
      </span>
      <ul className={classMap.ul}>
        <li>
          新增styles目录,在目录下新增index.css,tailwindcss，内容如下:
          {useMarkDown(indexCss)}
          <br />
          tailwindcss不用自己写，后续自动生成
        </li>
        <li>
          在入口中引入tailwind.css，以react为例，在index.tsx里面
          <code>import "./styles/tailwind.css";</code>
        </li>
        <li>
          在根目录新增postcss.config.js、tailwind.config.js
          {useMarkDown(postcss)}
          {useMarkDown(tailwind)}
        </li>
        <li>
          修改package.json，scripts修改为如下
          {useMarkDown(scripts)}
        </li>
      </ul>
      <h2 className={classMap.articleTitle}>开启愉快的css编写体验</h2>
      以下是一段本人的组件代码
      {useMarkDown(html)}
      很清爽有没有🤓
    </article>
  );
}
