import { classMap } from "@/constants/constant";
import { UseMarkDown } from "@/hooks/useMarkdown";
import {
  BASE_CREATE_RENDERER,
  CREATE_APP,
  CREATE_APP_API,
  CREATE_APP_CONTEXT,
  CREATE_BASE_VNODE,
  CREATE_RENDERER,
  CREATE_VNODE,
  DEFINE_COMPONENT,
  EFFECT,
  ENSURE_RENDERER,
  FLUSH_JOBS,
  H,
  NEXTTICK,
  QUEUE_FLUSH,
  QUEUE_JOB,
  REACTIVE_EFFECT,
  TRIGGER_EFFECT
} from ".";
import { ArticleAnchor } from "@/component/Anchor";

export default function Global() {
  const baseCreateRenderer = (
      <UseMarkDown markdown={BASE_CREATE_RENDERER}></UseMarkDown>
    ),
    createApp = <UseMarkDown markdown={CREATE_APP}></UseMarkDown>,
    createAppAPI = <UseMarkDown markdown={CREATE_APP_API}></UseMarkDown>,
    createAppContext = (
      <UseMarkDown markdown={CREATE_APP_CONTEXT}></UseMarkDown>
    ),
    createBaseVNode = <UseMarkDown markdown={CREATE_BASE_VNODE}></UseMarkDown>,
    createRenderer = <UseMarkDown markdown={CREATE_RENDERER}></UseMarkDown>,
    createVNode = <UseMarkDown markdown={CREATE_VNODE}></UseMarkDown>,
    defineComponent = <UseMarkDown markdown={DEFINE_COMPONENT}></UseMarkDown>,
    effect = <UseMarkDown markdown={EFFECT}></UseMarkDown>,
    ensureRenderer = <UseMarkDown markdown={ENSURE_RENDERER}></UseMarkDown>,
    flushJobs = <UseMarkDown markdown={FLUSH_JOBS}></UseMarkDown>,
    h = <UseMarkDown markdown={H}></UseMarkDown>,
    nextTick = <UseMarkDown markdown={NEXTTICK}></UseMarkDown>,
    queueFlush = <UseMarkDown markdown={QUEUE_FLUSH}></UseMarkDown>,
    queueJob = <UseMarkDown markdown={QUEUE_JOB}></UseMarkDown>,
    ReactiveEffect = <UseMarkDown markdown={REACTIVE_EFFECT}></UseMarkDown>,
    triggerEffect = <UseMarkDown markdown={TRIGGER_EFFECT}></UseMarkDown>;

  return (
    <article id="rootArticle" className={classMap.article}>
      <main className={classMap.content}>
        <h2 id="createApp" className="font-semibold text-h2 mb-2">
          createApp
        </h2>
        <code>createApp</code>是vue3的启动函数，返回一个应用实例，它做了啥？
        <div className={classMap.assist}>packages\runtime-dom\src\index.ts</div>
        {baseCreateRenderer}
        重点在于第一句<code>ensureRenderer</code> {ensureRenderer}
        调用<code>createRenderer</code>
        {createRenderer}
        <div className={classMap.assist}>
          packages\runtime-core\src\renderer.ts
        </div>
        调用<code>baseCreateRenderer</code>,<code>baseCreateRenderer</code>
        ,diff,patch都在这个函数中实现，先看他最后返回值
        {baseCreateRenderer}
        <code>baseCreateRenderer</code>最终返回
        <code>render hydrate createApp</code>3个函数，然后将
        <code>render hydrate</code>传给<code>createAppAPI</code>
        ,它是真正的createApp方法
        <br />
        <br />
        <div className={classMap.assist}>
          packages\runtime-core\src\apiCreateApp.ts
        </div>
        可以看到很多都是眼熟的方法
        {createAppAPI}
        <code>createAppContext</code>实现
        {createAppContext}
        到此整个<code>createApp</code>流程就结束了
        <br />
        <br />
        <h2 id="defineComponent" className={classMap.articleTitle}>
          defineComponent
        </h2>
        <div className={classMap.assist}>
          packages\runtime-core\src\apiDefineComponent.ts
        </div>
        Vue3用它来定义组件，代码返回了传入的对象并人工加上了类型，主要是为了更好的TSX/IDE支持
        {defineComponent}
        <br />
        <br />
        <h2 id="h" className={classMap.articleTitle}>
          h
        </h2>
        h代表hyperScript，它在vue的作用是返回一个虚拟节点(VNode)，它接受三个参数
        <ul className={classMap.ul}>
          <li>Type 元素类型</li>
          <li>propsOrChildren 数据对象，这里主要表示props,attrs,class,style</li>
          <li>Children 子节点</li>
        </ul>
        <div className={classMap.assist}>packages\runtime-core\src\h.ts</div>
        {h}
        <code>createVNode</code>主要做的是props,class,style标准化
        <div className={classMap.assist}>
          packages\runtime-core\src\vnode.ts
        </div>
        {createVNode}
        <code>CreateBaseVNode</code>创建<code>VNode</code>,并打上编码标记
        {createBaseVNode}
        <br />
        <br />
        <h2 id="nextTick" className={classMap.articleTitle}>
          nextTick
        </h2>
        在下次DOM更新循环结束后执行延迟回调。修改数据后，使用这个方法可以获取到更新后的值。
        <h3 id="why" className={classMap.articleSubTitle}>
          为什么需要nextTick
        </h3>
        如果没有这个函数，那么每次数据更新都会触发视图更新，所以需要这个机制让数据更新完后只执行一次视图更新
        <br />
        <br />
        <h3 id="how" className={classMap.articleSubTitle}>
          nextTick实现
        </h3>
        它利用了js的EventLoop执行机制，在call stack执行完后检查task
        queue。Vue3中的实现是直接使用promise新增微任务
        <div className={classMap.assist}>
          packages\runtime-core\src\scheduler.ts
        </div>
        可以看到代码非常简单，就是新增promise
        {nextTick}
        来看一下vue3是如何处理任务队列的
        <strong>queueJob queuePostFlushCb</strong>
        <code>queueJob</code>维护job队列，每次调用执行<code>queueFlush</code>
        <code>queuePostFlushCb </code>维护cb队列，每次调用执行
        <code>queueFlush</code>
        {queueJob}
        <strong>queueFlush</strong>
        <code>Promise.then</code>执行<code>flushJobs</code>
        ，此处就实现了把flushJobs添加到微任务
        {queueFlush}
        <br />
        <strong>flushJobs</strong>
        对队列排序，执行queue中的job，处理完后再调用<code>postFlushCbs</code>
        ，如果队列不为空则递归调用
        <code>flushJobs</code>
        {flushJobs}
        这也没看出来哪儿调用了queueJob啊？不着急，接着往下看
        <div className={classMap.assist}>
          packages\runtime-core\src\renderer.ts
        </div>
        当响应式触发后，执行effect，如果有 <code>scheduler</code>属性，就执行
        <code>scheduler</code>，<code>ReactiveEffect</code>
        第二个参数就是scheduler，可以看到它传的就是
        <code>()=&gt;queueJob(update)</code>
        {effect}
        <div className={classMap.assist}>
          packages\runtime-core\src\effect.ts
        </div>
        {ReactiveEffect}
        {triggerEffect}
      </main>
      <ArticleAnchor
        items={[
          {
            title: "createApp",
            key: "createApp",
            href: "#createApp"
          },
          {
            title: "defineComponent",
            key: "defineComponent",
            href: "#defineComponent"
          },
          {
            title: "h",
            key: "h",
            href: "#h"
          },
          {
            title: "nextTick",
            key: "nextTick",
            href: "#nextTick",
            children: [
              {
                title: "为什么需要nextTick",
                key: "why",
                href: "#why"
              },
              {
                title: "nextTick实现",
                key: "how",
                href: "#how"
              }
            ]
          }
        ]}
      ></ArticleAnchor>
    </article>
  );
}
