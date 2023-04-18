import { classMap } from "@/constants/constant";
import { UseMarkDown } from "@/hooks/useMarkdown";
import {
  COMPILER,
  COMPLILATION,
  COMPLILATION_CLASS,
  CREATE_COMPILER,
  CREATE_MODULE,
  HANDLE_MODULE_CREATION,
  LOADER_PLUGIN,
  LOADER_RUNNER,
  NORMAL,
  NORMAL_MODULE,
  ROOT,
  WEPBACK_OPTIONS_APPLY
} from "./_webpack";
import { ArticleAnchor } from "@/component/Anchor";

export default function Index() {
  const root = <UseMarkDown markdown={ROOT}></UseMarkDown>,
    createCompiler = <UseMarkDown markdown={CREATE_COMPILER}></UseMarkDown>,
    compiler = <UseMarkDown markdown={COMPILER}></UseMarkDown>,
    webpackOptionsApply = (
      <UseMarkDown markdown={WEPBACK_OPTIONS_APPLY}></UseMarkDown>
    ),
    compile = <UseMarkDown markdown={COMPLILATION}></UseMarkDown>,
    normal = <UseMarkDown markdown={NORMAL}></UseMarkDown>,
    createModule = <UseMarkDown markdown={CREATE_MODULE}></UseMarkDown>,
    loaderPlugin = <UseMarkDown markdown={LOADER_PLUGIN}></UseMarkDown>,
    handleModuleCreation = (
      <UseMarkDown markdown={HANDLE_MODULE_CREATION}></UseMarkDown>
    ),
    queue = <UseMarkDown markdown={COMPLILATION_CLASS}></UseMarkDown>,
    doBuild = <UseMarkDown markdown={NORMAL_MODULE}></UseMarkDown>,
    runner = <UseMarkDown markdown={LOADER_RUNNER}></UseMarkDown>;

  return (
    <article id="rootArticle" className={classMap.article}>
      <main className={classMap.content}>
        <h2 id="pre" className="font-semibold text-h2 mb-2">
          Webpack
        </h2>
        Webpack是现代JS程序的打包工具，几乎每个前端都使用/曾经用过。它从入口开始构建出一个依赖图(dependency
        graph)，然后将项目中所需的每一个模块组合成<strong>bundles</strong>。
        本文从源码出发，过一遍它的核心流程。
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
          Compiler <span className={classMap.assist}>lib\Compiler.js</span>
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
        <h2 id="loaderAndPlugin" className={classMap.articleTitle}>
          loader和plugin
        </h2>
        相信你一定被问到过这个问题，loader和plugin有什么区别，先分开介绍：
        <h3 id="loader" className={classMap.articleSubTitle}>
          loader
        </h3>
        webpack自带处理JS和JSON文件的能力。但是实际开发过程中经常会用到其他类型的文件，webpack允许导入任何类型的模块，然后通过loader来处理，将它们转为
        <strong>module</strong>。
        <br />
        loader有两个属性：
        <ul>
          <li>
            1. <code>test</code>属性，识别出哪些文件会被转换
          </li>
          <li>
            2. <code>use</code>属性，定义转换过程中应该使用的loader
          </li>
        </ul>
        <strong id="rule">解析rules</strong>
        <br />
        用过webpack的同学们都知道需要在module.rules属性中配置loader，如下是解析过程部分代码。
        <br />
        <ul>
          <li>
            1. 回到compile方法的第一行，首先执行
            <code>const params = this.newCompilationParams();</code>
            <br />
            <code>newCompilationParams</code>调用
            <code>createNormalModuleFactory()</code>和
            <code>createContextModuleFactory</code>
            两个工厂方法分别收集所有loaders，获取loader文件
            {normal}
          </li>
          <li>
            2. <strong>normalModuleFactory</strong>中， new
            <strong>RuleSetCompiler</strong> 然后执行<code>compile</code>
            方法，传入loader配置<code>options.rules</code>
            <br />
            方法内部会处理rules，返回正确的ruleSet规则集
            {createModule}
          </li>
          <li>
            3. 回到<code>WebpackOptionsApply</code>中，执行
            <code>new LoaderPlugin({}).apply(compiler);</code>
            ，开始真正的加载并导入loader
            <br /> 代码很长，提取关键字:
            <strong>loadModule</strong>,<strong>importModule </strong>
          </li>
          <li>
            4. 在compilation类中有如下队列：
            {queue}
            <strong>loadModule</strong>,<strong>importModule </strong>
            两个函数里面代码类似，都执行了
            <code>compilation.buildQueue.increaseParallelism();</code>,
            <code>handleModuleCreation</code>
            ,它们主要是填充了这些队列，然后队列会遍历执行各自的加工函数
            <code>processor</code>
            {loaderPlugin}
          </li>
          <li id="runLoader">
            5. <strong>handleModuleCreation</strong> 调用
            <code>factorizeModule</code>，填充<code>factorizeQueue</code>
            队列，队列的加工方法是<code>_factorizeModule</code>，调用了
            <code>NormalModuleFactory</code>的<code>create</code>方法。
            <br />
            然后在回调中调用了<code>addModule</code>填充
            <code>addModuleQueue</code>。{handleModuleCreation}
            ，addModule的回调又调用了
            <code>_handleModuleBuildAndDependencies</code>
            <br />
            它的回调调用了<code>buildModule</code>
            填充buildQueue，buildQueue的加工方法是_buildModule，最终调用的是
            <code>NormalModuleFactory</code>的<code>_doBuild</code>
            方法来执行loader
            <br />
            {doBuild}
          </li>
          <li>
            6.
            <a
              className={classMap.href}
              target="_blank"
              rel="noreferrer"
              href="https://github.com/webpack/loader-runner.git"
            >
              runLoader
            </a>
            是webpack的内置插件，最终执行loader的代码很简单，主要都是传入上下文和参数的处理:
            {runner}
          </li>
        </ul>
        <strong id="loaderSummary">总结</strong>
        <br />
        loader就是一个函数，只不过webpack会使用apply来调用，传入上下文
        <code>context</code>
        ，args作为参数，这样可以在函数内获取到各种数据，例如文件内容等。
        <br />
        多个loader会按顺序执行
        <h2 id="plugin" className={classMap.articleTitle}>
          plugin
        </h2>
        其实上面已经贴出了一个Plugin的完整栗子，<code>LoaderPlugin</code>。
        <br />
        Plugin是一个必须实现<code>apply</code>
        方法的类，然后调用Plugin的时候，它的apply方法的会注入compiler参数。break
        compiler信息量很大，包括各种hooks，自定义插件选择合适的hook在回调函数中完成自定义逻辑即可。
      </main>
      <ArticleAnchor
        items={[
          {
            title: "Webpack",
            key: "pre",
            href: "#pre"
          },
          {
            title: "Webpack入口函数",
            key: "webpack",
            href: "#webpack",
            children: [
              {
                title: "createCompiler",
                key: "createCompiler",
                href: "#createCompiler"
              },
              {
                title: "compiler",
                key: "compiler",
                href: "#compiler"
              },
              {
                title: "WebpackOptionsApply",
                key: "webpackOptionsApply",
                href: "#webpackOptionsApply"
              },
              {
                title: "run",
                key: "run",
                href: "#run"
              }
            ]
          },
          {
            title: "loader和plugin",
            key: "loaderAndPlugin",
            href: "#loaderAndPlugin",
            children: [
              {
                title: "loader",
                key: "loader",
                href: "#loader",
                children: [
                  {
                    title: "解析rules",
                    key: "rule",
                    href: "#rule"
                  },
                  {
                    title: "执行loader",
                    key: "runLoader",
                    href: "#runLoader"
                  },
                  {
                    title: "总结",
                    key: "loaderSummary",
                    href: "#loaderSummary"
                  }
                ]
              },
              {
                title: "plugin",
                key: "plugin",
                href: "#plugin"
              }
            ]
          }
        ]}
      ></ArticleAnchor>
    </article>
  );
}
