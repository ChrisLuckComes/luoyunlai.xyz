import { classMap } from "@/constants/constant";

import DEVELOPMENT from "@images/knowledge/development.png";
import { LazyImage } from "@/component/image";
import { ArticleAnchor } from "@/component/Anchor";

export default function Index() {
  return (
    <article id="rootArticle" className={classMap.article}>
      <main className={classMap.content}>
        <h2 id="pre" className="font-semibold text-h2 mb-2">
          前端技术发展轨迹
        </h2>
        <LazyImage src={DEVELOPMENT} />
        <br />
        <h3 id="ajax" className={classMap.articleSubTitle}>
          ajax
        </h3>
        早期并没有前端工程师这个独立的职位，随着ajax技术出现，才开始有前后端分离模式的诞生和流行，主要就是前端通过ajax向后端发起请求，后端提供Restful接口的协作方式
        <h3 id="mvc" className={classMap.articleSubTitle}>
          MVC(Model View Controller)
        </h3>
        MVC改变了命令式的代码组织，但它的缺点是代码组织起来较为复杂，首先需要定义model，然后需要view中定义属性变化后的dom修改函数。
        <h3 id="mvvm" className={classMap.articleSubTitle}>
          MVVM(Model View ViewModel)
        </h3>
        它和MVC最大的区别就是，通过双向绑定等方式实现了数据变动后自动渲染视图，屏蔽了dom操作，无需开发者手动修改。
        简化了视图和数据的依赖，带来了虚拟dom的理念，解决了频繁更新的问题。
        <h3 id="node" className={classMap.articleSubTitle}>
          Node.js
        </h3>
        随着Node.js的出现，各种前端工具如雨后春笋般出现：
        <ul className={classMap.ul}>
          <li>1. webpack等库，真正的实现了前端的工程化。</li>
          <li>2. bff层，前端可以自行编写后端服务或SSR</li>
        </ul>
        <h3 id="serverless" className={classMap.articleSubTitle}>
          Serverless
        </h3>
        实现bff层后，自然涉及到服务的管理，那么无形中增大了人力成本。Serverless是一个很好的解决方案，将服务器的运维等集中管理，研发可以专注于实现云函数。
        <h3 id="plan" className={classMap.articleSubTitle}>
          技术方案
        </h3>
        前端发展的过程中诞生了很多针对不同场景的技术方案：
        <ul className={classMap.ul}>
          <li>1. ui：组件化方案(antd)、配置化解决方案(低代码)</li>
          <li>2. 单体应用的工程方案：微前端</li>
          <li>3. 平台化方案：PWA、小程序</li>
          <li>4. 跨端方案：hybrid、ReactNative、Flutter</li>
        </ul>
        <h3 id="render" className={classMap.articleSubTitle}>
          渲染方案
        </h3>
        CSR =&gt; SSR =&gt; NSR =&gt;
        <strong>SSR</strong>
        <br />
        现在SSR有了hydration的方案，将html和数据同时通过请求返回。
        <strong>NSR</strong>
        <br />
        csr和ssr都知道，那么nsr又是啥？
        <br />
        nsr是hybrid的情况下的技术方案，借助native来渲染生成html数据，借助离线数据实现预渲染。
        <strong>ESR</strong>
        <br />
      </main>
      <ArticleAnchor
        items={[
          {
            title: "前端技术发展轨迹",
            key: "pre",
            href: "#pre",
            children: [
              {
                title: "ajax",
                key: "ajax",
                href: "#ajax"
              },
              {
                title: "MVC",
                key: "mvc",
                href: "#mvc"
              },
              {
                title: "MVVM",
                key: "mvvm",
                href: "#mvvm"
              },
              {
                title: "Node.js",
                key: "node",
                href: "#node"
              },
              {
                title: "Serverless",
                key: "serverless",
                href: "#serverless"
              },
              {
                title: "技术方案",
                key: "plan",
                href: "#plan"
              },
              {
                title: "渲染方案",
                key: "render",
                href: "#render"
              }
            ]
          }
        ]}
      ></ArticleAnchor>
    </article>
  );
}
