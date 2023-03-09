import { classMap } from "@/constants/constant";
import { Anchor } from "antd";
import { UseMarkDown } from "@/hooks/useMarkdown";
import {
  COMPILER,
  COMPLILATION,
  CREATE_COMPILER,
  ROOT,
  WEPBACK_OPTIONS_APPLY
} from "./_webpack";
const { Link } = Anchor;

export default function Index() {
  const root = <UseMarkDown markdown={ROOT}></UseMarkDown>,
    createCompiler = <UseMarkDown markdown={CREATE_COMPILER}></UseMarkDown>,
    compiler = <UseMarkDown markdown={COMPILER}></UseMarkDown>,
    webpackOptionsApply = (
      <UseMarkDown markdown={WEPBACK_OPTIONS_APPLY}></UseMarkDown>
    ),
    compile = <UseMarkDown markdown={COMPLILATION}></UseMarkDown>;

  return (
    <article id="root" className={classMap.article}>
      <main className={classMap.content}>
        <h2 id="webpack" className={classMap.articleTitle}>
          Webpack
        </h2>
        Webpack几乎每个前端都要使用。本文从源码出发，过一遍它的核心流程。
        <h2 id="webpack" className={classMap.articleTitle}>
          Webpack入口函数
        </h2>
        <div className={classMap.assist}>lib\webpack.js</div>
        webpack大家都知道首先需要配置<code>webpack.config.js</code>
        ，函数第一个入参就是<code>options</code>，然后执行：
        <ul>
          <li>
            1. 执行<code>create</code>函数，返回<code>compiler</code>
          </li>
          <li>
            2. 执行<code>compiler.run</code>,内部会执行<code>compile</code>
            ，返回<code>compiler</code>
          </li>
        </ul>
        {root}
        来看一下compiler的创建
        <h3 id="createCompiler" className={classMap.articleSubTitle}>
          createCompiler
        </h3>
        <ul>
          <li>1. 处理options</li>
          <li>2. new Compiler</li>
          <li>3. 遍历执行plugins</li>
        </ul>
        {createCompiler}
        <h3 id="Compiler" className={classMap.articleSubTitle}>
          Compiler
        </h3>
        整个类代码较长，这里关注构造函数。可以看到很多熟悉的属性，比较重要的就是hooks，自定义插件就可以选择实现这些hook。
        {compiler}
        <h3 id="webpackOptionsApply" className={classMap.articleSubTitle}>
          WebpackOptionsApply
        </h3>
        这个类根据配置执行对应的内置Plugin，代码非常长
        <div className={classMap.assist}>lib\WebpackOptionsApply.js</div>
        {webpackOptionsApply}
        <h3 id="run" className={classMap.articleSubTitle}>
          run
        </h3>
        创建完了compiler当然就要执行了，<code>run</code>函数内部主要是执行了
        <code>compile</code>方法，new一个<code>Compilation</code>
        ，然后执行它的hooks。
        {compile}
      </main>
      <Anchor
        className="anchor"
        getContainer={() => document.getElementById("content") as HTMLElement}
      >
        <Link href="#pre" title="Webpack"></Link>
        <Link href="#webpack" title="Webpack入口函数">
          <Link href="#createCompiler" title="createCompiler"></Link>
          <Link href="#compiler" title="compiler"></Link>
          <Link href="#webpackOptionsApply" title="WebpackOptionsApply"></Link>
          <Link href="#run" title="run"></Link>
        </Link>
      </Anchor>
    </article>
  );
}
