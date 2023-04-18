import { classMap } from "@/constants/constant";
import { UseMarkDown } from "@/hooks/useMarkdown";
import { CODE, CODE_1, CODE_2, NEXTTICK, USED } from "./_treeShaking";
import { ArticleAnchor } from "@/component/Anchor";

export default function Index() {
  const code = <UseMarkDown markdown={CODE}></UseMarkDown>,
    code1 = <UseMarkDown markdown={CODE_1}></UseMarkDown>,
    code2 = <UseMarkDown markdown={CODE_2}></UseMarkDown>,
    used = <UseMarkDown markdown={USED}></UseMarkDown>,
    nextTick = <UseMarkDown markdown={NEXTTICK}></UseMarkDown>;
  return (
    <article id="rootArticle" className={classMap.article}>
      <main className={classMap.content}>
        <h2 id="pre" className="font-semibold text-h2 mb-2">
          Tree Shaking
        </h2>
        Tree Shaking翻译为摇树优化，它通常用于移除js上下文中未使用的代码，最先在
        <strong>Rollup</strong>社区流行，它的实现还需要依靠前端工程工具来实现。
        <h2 id="esm" className={classMap.articleTitle}>
          ESM规范
        </h2>
        Tree Shaking依赖ESM规范，原因如下：
        <ul className={classMap.ul}>
          <li>import模块名只能是字符串常量</li>
          <li>import一般只在模块顶层出现</li>
          <li>import导入值是不可变的(引用类型除外)</li>
        </ul>
        CommonJS模块在之前的文章有提到，它是动态的，执行代码后才知道引用了什么，所以没法tree
        shaking
        <h2 id="effect" className={classMap.articleTitle}>
          副作用
        </h2>
        有如下代码，如果<code>add</code>
        函数没有被其他模块引用，那么add可以被tree shaking掉。
        <br />
        然后window.memorize调用了add函数，并触发某些副作用。那么像webpack这种工程化工具也要将add打包到最后的bundle中，即使没有其他模块依赖add函数
        {code}
        <h3 id="webpack" className={classMap.articleSubTitle}>
          webpack的处理
        </h3>
        webpack提供了副作用的配置<strong>module.rule.sideEffects</strong>
        ，允许声明哪些模块具有副作用。
        <br />
        <code>{`{ sideEffects:false }`}</code>表示xxx没有副作用。
        <br />
        但是上述代码也可以对其进行优化使tree shaking生效，如下：{code1}
        <br />
        此外，webpack使用内置的<code>TerserPlugin</code>
        来删除死代码，webpack负责对模块进行分析和标记，压缩插件根据结果进行代码删除，标记有如下三种：
        <ul className={classMap.ul}>
          <li>harmony export</li>
          <li>unused harmony export</li>
          <li>harmony import</li>
        </ul>
        webpack在compile时将每个模块加入<code>ModuleGraph</code>，依靠
        <code>HarmonyExportSpecifierDependency</code>和
        <code>HarmonyExportImportedSpecifierDependency</code>
        分别识别处理import和export。 代码如下:
        <div className={classMap.assist}>
          lib\dependencies\HarmonyExportSpecifierDependency.js
        </div>
        {used}
        <h2 id="good" className={classMap.articleTitle}>
          友好的导出模式
        </h2>
        如下导出方式都<strong>不利于tree shaking</strong>
        <ul className={classMap.ul}>
          <li>导出包含多项属性和方法的对象</li>
          <li>导出多项属性和方法的class</li>
          <li>export default</li>
        </ul>
        {code2}
        友好的方式，就是原子化，颗粒化的单项导出。
        <h2 id="vue" className={classMap.articleTitle}>
          Vue中的tree shaking
        </h2>
        Vue将内置组件都改为了ESM的方式导入使用:
        {nextTick}
        <h2 id="design" className={classMap.articleTitle}>
          设计兼顾易用性和tree shaking的公共库
        </h2>
        普遍做法参考antd，构建出两个文件夹，并且配置package.json的main和module属性，同时支持cjs和esm模块化。
      </main>
      <ArticleAnchor
        items={[
          {
            title: "Tree Shaking",
            key: "pre",
            href: "#pre"
          },
          {
            title: "ESM规范",
            key: "esm",
            href: "#esm"
          },
          {
            title: "副作用",
            key: "effect",
            href: "#effect",
            children: [
              {
                title: "webpack",
                key: "webpack",
                href: "#webpack"
              }
            ]
          },
          {
            title: "友好的导出模式",
            key: "good",
            href: "#good"
          },
          {
            title: "Vue中的tree shaking",
            key: "vue",
            href: "#vue"
          },
          {
            title: "设计兼顾易用性和tree shaking的公共库",
            key: "design",
            href: "#design"
          }
        ]}
      ></ArticleAnchor>
    </article>
  );
}
