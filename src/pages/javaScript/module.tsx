import { classMap } from "@/constants/constant";
import { UseMarkDown } from "@/hooks/useMarkdown";
import {
  CJS_APP,
  WEBPACK_CONFIG_JS,
  COMMON_JS,
  ES_MODULE,
  ES_APP
} from "./_module";
import { ArticleAnchor } from "@/component/Anchor";

export default function Index() {
  const cjsApp = <UseMarkDown markdown={CJS_APP}></UseMarkDown>,
    config = <UseMarkDown markdown={WEBPACK_CONFIG_JS}></UseMarkDown>,
    cjs = <UseMarkDown markdown={COMMON_JS}></UseMarkDown>,
    esm = <UseMarkDown markdown={ES_MODULE}></UseMarkDown>,
    esApp = <UseMarkDown markdown={ES_APP}></UseMarkDown>;

  return (
    <article id="rootArticle" className={classMap.article}>
      <main className={classMap.content}>
        <h2 id="pre" className="font-semibold text-h2 mb-2">
          CommonJS和ES module
        </h2>
        CommonJS和ES
        Module是模块化的两种规范，语法类似但略有不同，本文主要是细说它们的实现方式，这样异同点自然就显现出来了。
        <br />
        接下来我们使用webpack@4.x+babel来打包代码，看输出后的js来分析。
        webpack.config.js简单配置如下
        {config}
        <h2 id="webpack" className={classMap.articleTitle}>
          借助Webpack分析
        </h2>
        CommonJS(下文简称cjs)是<strong>Node.js</strong>
        的模块化标准，npm就是建立在该标准之上的。它以同步加载的方式将模块一次性加载完成，想必大家都知道怎么使用，此处就不举栗子了。
        准备如下代码:
        {cjsApp}
        输出代码如下，
        可以看到webpack将所有js处理成了一个立即执行函数，参数是所有模块组成的对象。每个文件作为一个键值对，
        对象的key是文件路径，value是该js内容包括在内的函数，函数的参数就是
        <code>module</code>,<code>exports</code>,
        <code>__webpack_require__</code>(app.js中使用的<code>require</code>
        函数)。
        {cjs}
        <h3 id="require" className={classMap.articleSubTitle}>
          __webpack_require__
        </h3>
        webpack定义该辅助函数实现引入模块的功能，它的入参是<code>moduleId</code>
        ，也就是路径字符串。
        <br />
        <br />
        首先判断该模块是否在<code>installedModules</code>缓存中，
        <ul className={classMap.ul}>
          <li>
            存在： <code>return installedModules[moduleId].exports</code>
          </li>
          <li>
            不存在：
            <ul className="pl-60">
              <li>
                1. 创建module对象(包含l,exports等属性)，moduleId作为key添加到
                <code>installedModules</code>中
              </li>
              <li>
                2. 执行该模块
                <code>
                  modules[moduleId].call( module.exports, module,
                  module.exports, __webpack_require__ )
                </code>
              </li>
              <li>
                3. <code>module.l = true</code>标记模块已加载。
              </li>
              <li>
                4. 最后返回<code>module.exports</code>
              </li>
            </ul>
          </li>
        </ul>
        <h3 id="cjs" className={classMap.articleSubTitle}>
          CommonJS
        </h3>
        所以只要搞清楚了<code>require</code>
        是怎么实现的，CommonJS模块化的工作原理也就懂了，同步执行引入的模块，返回module.exports或exports对象。
        <h3 id="diff" className={classMap.articleSubTitle}>
          ES Module
        </h3>
        那么ES Module的处理有什么不同呢？以如下代码为例：
        {esApp}
        <br />
        cjs输出的代码还有好些辅助函数并没有提到，有一些就是支持ESM的，来看下ESM模块化的文件打包结果。
        {esm}
        <br />
        可以看到为了同时支持cjs/esm两种模块化规范，辅助函数部分一模一样。
        <br />
        除了基本的<code>__webpack_require__</code>
        以外，esm需要借助的辅助函数多一些，所以这块也是一个优化点，现代浏览器是原生支持esm的，不需要辅助函数，可以跳过它们的打包过程。
        <br />
        从输出代码的不同之处来入手：
        <h3 id="r" className={classMap.articleSubTitle}>
          __webpack_require__.r
        </h3>
        <code>__webpack_require__.r</code>在exports对象上添加
        <code>Symbol.toStringTag</code>
        属性，这样对于exports对象使用<code>toString</code>方法会返回
        <code>[Object Module]</code>。
        <br />
        并且添加了<code>__esModule</code>标识。
        <h3 id="d" className={classMap.articleSubTitle}>
          __webpack_require__.d
        </h3>
        <code>__webpack_require__.d</code>
        在exports对象上对每个key添加了getter属性。
        <h3 id="esmSummary" className={classMap.articleSubTitle}>
          Es Module的实现
        </h3>
        ESM和CJS主要区别在于传入参数的代码部分
        <ul className={classMap.ul}>
          <li>
            1. ESM新增了临时对象
            <code>_module2__WEBPACK_IMPORTED_MODULE_0__ </code>
            来创建引用，代码实际上访问的还是exports对象
          </li>
          <li>
            2. 对于<code>export default</code>的导出，在exports对象上添加
            <code>default</code>属性。对于
            <code>export</code>的导出，在exports对象上添加属性
            <code>getter</code>，返回的是实际变量值。
          </li>
        </ul>
        <h2 id="summary" className={classMap.articleTitle}>
          总结
        </h2>
        CommonJS导出的是对象本身，如果是值类型的即使修改了改变量也不会影响其他地方，当然引用类型的还是会影响。
        <br />
        <br />
        因为导出的是对象，编译阶段时不会读取对象的内容，不知道导出了哪些变量和从哪里导入进来的。只有运行时才能访问对象的属性，确定依赖关系，所以说CommonJS是动态加载的。
        <br />
        <br />
        对于ES
        Module而言，对于每个变量都定义了getter，导入该模块访问变量时触发getter，返回的是模块中的同名变量，如果该值发生变化，会影响所有的引用。
        <br />
        <br />
        ES
        Module导出的并不是对象，在编译时，就可以确定模块之间的依赖关系，所以可以认为ES
        Module是静态加载的，
        <code>tree shaking</code>就是由此而来。
      </main>
      <ArticleAnchor
        items={[
          {
            key: "1",
            title: "前言",
            href: "#pre"
          },
          {
            key: "2",
            title: "借助Webpack分析",
            href: "#webpack",
            children: [
              {
                key: "3",
                title: "__webpack_require__",
                href: "#require"
              },
              {
                key: "4",
                title: "CommonJS",
                href: "#cjs"
              },
              {
                key: "5",
                title: "ES Module",
                href: "#esm",
                children: [
                  {
                    key: "6",
                    title: "__webpack_require__.r",
                    href: "#r"
                  },
                  {
                    key: "7",
                    title: "__webpack_require__.d",
                    href: "#d"
                  },
                  {
                    key: "8",
                    title: "Es Module的实现",
                    href: "#esmSummary"
                  }
                ]
              },
              {
                key: "9",
                title: "总结",
                href: "#summary"
              }
            ]
          }
        ]}
      ></ArticleAnchor>
    </article>
  );
}
