import { classMap } from "@/constants/constant";

import touDa from "@/images/头大.webp";
import {
  INDEX_CSS,
  TAILWIND,
  SCRIPTS,
  HTML,
  POSTCSS
} from "../experiences/index";
import { UseMarkDown } from "@/hooks/useMarkdown";
import { LazyImage } from "@/component/image";
import { ArticleAnchor } from "@/component/Anchor";

export default function Tailwind() {
  const indexCss = <UseMarkDown markdown={INDEX_CSS}></UseMarkDown>,
    tailwind = <UseMarkDown markdown={TAILWIND}></UseMarkDown>,
    scripts = <UseMarkDown markdown={SCRIPTS}></UseMarkDown>,
    html = <UseMarkDown markdown={HTML}></UseMarkDown>,
    postcss = <UseMarkDown markdown={POSTCSS}></UseMarkDown>;

  return (
    <article className={classMap.article}>
      <main className={classMap.content}>
        <h2 id="front" className="font-semibold text-h2 mb-2">
          来不及了，快上车tailwindcss🚘
        </h2>
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
        <LazyImage src={touDa} width={220} height={220}></LazyImage>
        <br />
        如果有一个人帮你写好了大部分的原子css（之前的项目里是我），开发时只需要引用组合，最多只是简单配置，那该有多香啊。
        <br />
        <a className={classMap.href} href="https://www.tailwindcss.cn/">
          tailwindcss
        </a>
        就是这么一个优秀的css框架，使用它之后写css只需要配置跟组合。响应式，主题都可以支持。性能方面支持tree-shaking，使用postcss预处理器可以摆脱sass
        <h2 id="begin" className={classMap.articleTitle}>
          开始使用
        </h2>
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
            <div className="markdown-container">{indexCss}</div>
            <br />
            tailwindcss不用自己写，后续自动生成
          </li>
          <li>
            在入口中引入tailwind.css，以react为例，在index.tsx里面
            <code>{'import "./styles/tailwind.css";'}</code>
          </li>
          <li>
            在根目录新增postcss.config.js、tailwind.config.js
            {postcss}
            <div className="markdown-container">{tailwind}</div>
          </li>
          <li>
            修改package.json，scripts修改为如下
            <div className="markdown-container">{scripts}</div>
          </li>
        </ul>
        <h2 id="exp" className={classMap.articleTitle}>
          开启愉快的css编写体验
        </h2>
        以下是一段本人的组件代码
        <div className="markdown-container">{html}</div>
        很清爽有没有🤓
      </main>
      <ArticleAnchor
        items={[
          {
            title: "来不及了，快上车tailwindcss🚘",
            key: "front",
            href: "#front"
          },
          {
            title: "开始使用",
            key: "begin",
            href: "#begin"
          },
          {
            title: "开启愉快的css编写体验",
            key: "exp",
            href: "#exp"
          }
        ]}
      ></ArticleAnchor>
    </article>
  );
}
