import { classMap } from "@/constants/constant";
import VITE from "@/images/vite.png";
import VITE_ADV_1 from "@/images/vite-adv-1.png";
import VITE_ADV_2 from "@/images/vite-adv-2.png";
import VITE_ADV_3 from "@/images/vite-adv-3.png";
import MAX_AGE from "@/images/max-age.png";
import VITE_DEPS from "@/images/vite-deps.png";
import VITE_RESOURCE from "@/images/vite-resource.png";
import { VITE_CONFIG } from ".";
import { UseMarkDown } from "@/hooks/useMarkdown";
import { LazyImage } from "@/component/image";
import { ArticleAnchor } from "@/component/Anchor";

const linkItems = [
  {
    key: "h1",
    href: "#h1",
    title: "Vite"
  },
  {
    key: "1",
    href: "#front",
    title: "前言"
  },
  {
    key: "2",
    href: "#begin",
    title: "优点",
    children: [
      {
        key: "3",
        href: "#no-build",
        title: "无需打包"
      },
      {
        key: "4",
        href: "#hmr",
        title: "热重载(HMR)"
      }
    ]
  },
  {
    key: "5",
    href: "#move",
    title: "迁移流程"
  },
  {
    key: "6",
    href: "#end",
    title: "技术选型",
    children: [
      {
        key: "7",
        href: "#rollup",
        title: "Rollup"
      },
      {
        key: "8",
        href: "#webpack",
        title: "Webpack"
      },
      {
        key: "9",
        href: "#vite",
        title: "Vite"
      },
      {
        key: "10",
        href: "#turbopack",
        title: "Turbopack"
      }
    ]
  }
];

export default function Vite() {
  return (
    <article id="rootArticle" className={classMap.article}>
      <main className={classMap.content}>
        <h1 id="h1" className={classMap.pageTitle}>
          2022年还在用webpack?快上
          <a
            className="text-blue"
            target="_blank"
            rel="noreferrer"
            href="https://cn.vitejs.dev/"
          >
            Vite！
          </a>
        </h1>
        <br />
        <LazyImage src={VITE} alt="VITE" width={320} height={320} />
        <h2 id="front" className={classMap.articleTitle}>
          前言
        </h2>
        <p>
          本仓库最开始是由 <code>create-react-app</code>{" "}
          创建，其中使用了webpack，关于webpack我有几点想吐槽
        </p>
        <ul className={classMap.ul}>
          <li>
            1.热替换速度慢，写完几行代码随手保存想看看效果，需要等个几秒才能看到。
          </li>
          <li>2.工程规模变大后，启动速度显著变慢。</li>
          <li>
            3.配置大而复杂，不用vue-cli/umi/creatReactApp这种集大成者高低也得来个几十行代码才能达到最佳状态
          </li>
        </ul>
        <h2 id="begin" className={classMap.articleTitle}>
          优点
        </h2>
        <p>
          所以至少在本地开发阶段或者仅面向现代浏览器的工程，可以大胆使用vite来加速。那么它为什么这么快呢？主要有以下两方面原因
        </p>
        <ul className={`${classMap.ul} list-none`}>
          <li>
            <LazyImage src={VITE_ADV_1} alt="adv1" />
            <div className="pl-10">
              <br />
              <strong id="no-build">无需打包</strong>
              ：准确的说是不用js写的打包器全量打包🤪 <br />
              <br />
              1.
              vite会直接启动服务，并且进行预构建依赖。具体表现为对代码进行导入分析，使用
              <strong>esbuild</strong>
              将CJS或UMD依赖全部转换为ESM缓存到node_modules/.vite/deps目录下，后续直接从缓存获取。
              <LazyImage src={VITE_DEPS} alt="deps" />
              <br />
              esbuild是用go编写的，速度比js快10-100倍，因为go对多线程的支持比js好，支持共享内存（尽量复用AST），而且esbuild所有代码都是自行编写。js设计存在多线程/编译方面的缺陷。
              <br />
              vite提供的是ESM的源码，利用了浏览器对ESM的支持，将部分打包程序的工作交给了浏览器，对于ESM不需要类似于webpack的胶水代码。并且vite给不常变化的依赖请求加上了长期强缓存。
              <LazyImage src={MAX_AGE} alt="max-age" />
              <br />
              <br />
              而webpack需要全量打包，并且在构建依赖时需要经过多个loader进行字符串的处理，尤其是babel-loader涉及到多次字符串AST互转的操作。Webpack
              打包时间 = parse string * n + transform * n + parse to AST +
              compress
              <br /> <br /> 2.
              启动服务后，根据路由，通过http请求来获取文件和加载所需模块。（如果模块过多会受浏览器http最大并行数限制,vite首次启动慢其中之一是这个原因）下图是本路由的资源列表
              <br />
              可以看出vite对于资源处理的大体逻辑， index.html =&gt; 入口ESM
              index.tsx =&gt; index.tsx中导入的其他模块
              <LazyImage src={VITE_RESOURCE} alt="resource" />
            </div>
          </li>
          <li>
            <br />
            <br />
            <LazyImage src={VITE_ADV_2} alt="adv2" />
            <br />
            <strong id="hmr">热重载(HMR)</strong>
            &nbsp; vite明显快于webpack，这个跟它们各自的实现方式有关。
            <br />
            <br />
            Webpack-dev-server实现hmr的方式是监听到变化后，通过websocket服务主动推送，页面需要刷新。而vite只需要重新请求变化的资源即可
          </li>
          <li>
            <br />
            <br />
            <LazyImage src={VITE_ADV_3} alt="adv3" />
            <br />
            vite build使用<strong>rollup</strong>
            ,rollup产出的包体积天然比webpack的要小，原生支持ESM非常适合组件库的开发，而webpack需要注入额外胶水代码，天然有体积上的劣势。
          </li>
        </ul>
        <h2 id="move" className={classMap.articleTitle}>
          迁移流程
        </h2>
        <ul className={classMap.ul}>
          <li>
            从create-react-app迁移
            <br />
            <br />
            <p>
              <code>pnpm add -D vite vite-tsconfig-paths</code>
              <br />
              <br />
              然后将public/index.html移动到根目录下，去掉%PUBLIC_URL%，修改script&nbsp;
              <code>{`<script type="module" src="/src/index.tsx"></script>`}</code>
              <br />
              <br />
              修改package.json的start和build命令
              <br />
              <br />
              <code>
                &quot;start&quot;: &quot;vite&quot;,
                <br />
                &quot;build&quot;: &quot;vite build&quot;
              </code>
              <br />
              <br />
              新增&nbsp;<code>vite.config.ts</code>
              <UseMarkDown markdown={VITE_CONFIG}></UseMarkDown>
              <br />
              大功告成，可以pnpm start启动了，最后移除react-scripts&nbsp;
              <code>pnpm remove react-scripts</code>
            </p>
          </li>
          <li>umi4天然支持</li>
        </ul>
        <h2 id="end" className={classMap.articleTitle}>
          技术选型
        </h2>
        可以看出本文重复最多的单词就是ESM，vite的核心理念就在于此，充分的利用现代浏览器原生支持ESM。
        <br />
        <ul className={classMap.ul}>
          <li>
            <strong>Rollup</strong>
            更适合打包组件库/插件(library)。它基于ESM打包，生成的文件更小，支持tree-shaking，但是不支持代码分割。
          </li>
          <li>
            <strong>Webpack</strong>
            更适合打包项目，它支持代码分割，devServer的热更新，以及各种loader和plugin来处理各种文件。但是它的产物会注入很多胶水代码，导致体积增加。
          </li>
          <li>
            <strong>Vite</strong>
            更适合现代Web应用的开发(支持ESM)，追求开发效率和性能优化的可以选择Vite。如果项目需要一定兼容性，不太适合用于生产打包，当然也有插件支持。
          </li>
          <li>
            <strong>Turbopack</strong>
            很新，很快，使用Rust编写，但是它处于alpha阶段，未来等稳定了再考虑。
          </li>
        </ul>
      </main>
      <ArticleAnchor items={linkItems}></ArticleAnchor>
    </article>
  );
}
