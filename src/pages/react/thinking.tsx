import { classMap } from '@/constants/constant';
import { Anchor } from 'antd';
import { FLAGS, WORK_LOOP_CONCUNCURRENT } from '.';
const { Link } = Anchor;

export default function Thinking() {
  return (
    <article id="root" className={classMap.article}>
      <h2 id="thinking" className={classMap.articleTitle}>
        React理念
      </h2>
      <div className={classMap.assist}>我们认为，React是用JavaScript构建快速响应的大型Web应用程序的首选方式</div>
      摘自
      <a
        className={classMap.href}
        rel="noreferrer"
        target="_blank"
        href="https://zh-hans.reactjs.org/docs/thinking-in-react.html"
      >
        官网
      </a>
      <br />
      <br />
      制约<strong>快速响应</strong>的场景如下:
      <ul className={classMap.ul}>
        <li>CPU瓶颈：计算量大，设备性能不足</li>
        <li>IO瓶颈：发送网络请求后，需要等待数据返回后才能操作</li>
      </ul>
      为了解决这两个问题，React实现了时间切片，<code>Suspense</code>
      <br />
      而两者都需要将同步的更新变为<strong>可中断的异步更新</strong>
      <h2 id="oldStructure" className={classMap.articleTitle}>
        React15架构
      </h2>
      React15架构可以分为两层
      <ul className={classMap.ul}>
        <li>Reconciler（协调器） 负责找出变化的组件</li>
        <li>Renderer（渲染器）负责将变化的组件渲染到页面上</li>
      </ul>
      <h3 id="oldReconciler" className={classMap.articleSubTitle}>
        Reconciler（协调器）
      </h3>
      在<code>React</code>中可以通过<code>this.setState</code>、<code>this.forceUpdate</code>、
      <code>ReactDOM.render</code>等API触发更新
      <br />
      <br />
      每当有更新发生时,<strong>Reconciler</strong>会做如下工作
      <ul className={classMap.ul}>
        <li>
          调用<code>render</code>方法，将返回的jsx转化为vDom
        </li>
        <li>将vDom和上一次更新的vDom对比</li>
        <li>通过对比找出本次更新中变化的vDom</li>
        <li>
          通知<strong>Renderer</strong>把新的vDom渲染到页面上
        </li>
      </ul>
      Reconciler
      <a
        className={classMap.href}
        rel="noreferrer"
        target="_blank"
        href="https://zh-hans.reactjs.org/docs/codebase-overview.html#reconcilers"
      >
        官方解释
      </a>
      <br />
      <h3 id="oldRenderer" className={classMap.articleSubTitle}>
        Renderer（渲染器）
      </h3>
      <code>React</code>支持跨平台，前端最熟悉的是负责浏览器环境渲染的
      <a className={classMap.href} rel="noreferrer" target="_blank" href="https://www.npmjs.com/package/react-dom">
        ReactDOM
      </a>
      ， 还有
      <a className={classMap.href} rel="noreferrer" target="_blank" href="https://www.npmjs.com/package/react-native">
        ReactNative
      </a>
      等渲染器
      <br />
      每次更新发生时，<strong>Renderer</strong>接到<strong>Reconciler</strong>通知，将变化的组件渲染在当前环境
      <br />
      <a
        className={classMap.href}
        rel="noreferrer"
        target="_blank"
        href="https://zh-hans.reactjs.org/docs/codebase-overview.html#renderers"
      >
        官方解释
      </a>
      <h3 id="oldWeakness" className={classMap.articleSubTitle}>
        缺点
      </h3>
      在<strong>Reconciler</strong>中，<code>mount</code>的组件会调用<code>mountComponent</code>,<code>update</code>
      组件会调用<code>updateComponent</code>，它们都会递归更新子组件。
      递归执行一旦开始就无法中断，当层级很深时，递归更新时间超过了16ms，用户交互就会卡顿。
      <br />
      <h2 id="newStructure" className={classMap.articleTitle}>
        React16架构
      </h2>
      React16架构可以分为三层
      <ul className={classMap.ul}>
        <li>
          Scheduler（调度器） 调度任务的优先级，高优先级任务优先进入<strong>Reconciler</strong>
        </li>
        <li>Reconciler（协调器） 负责找出变化的组件</li>
        <li>Renderer（渲染器） 负责将变化的组件渲染到页面上</li>
      </ul>
      React16新增了<strong>Scheduler（调度器）</strong>
      <h3 id="scheduler" className={classMap.articleSubTitle}>
        Scheduler（调度器）
      </h3>
      部分浏览器已经实现了
      <a
        className={classMap.href}
        rel="noreferrer"
        target="_blank"
        href="https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestIdleCallback"
      >
        requestIdleCallback
      </a>
      ，但是它的兼容性不好，且触发频率不稳定。<code>React</code>选择了自行实现，这就是<strong>Scheduler</strong>
      ,可以在空闲时触发回调。
      <h3 id="newReconciler" className={classMap.articleSubTitle}>
        Reconciler（协调器）
      </h3>
      React15中<strong>Reconciler</strong>是递归处理vDom的，react16解决了这个问题。
      <br />
      更新工作改写成了可以中断的循环过程。每次循环都会调用<code>shouldYield</code>判断是否有剩余时间
      <div className={classMap.assist}>packages\react-reconciler\src\ReactFiberWorkLoop.new.js</div>
      <div className={classMap.markdown}>{WORK_LOOP_CONCUNCURRENT}</div>
      另外，<strong>Reconciler</strong>和<strong>Renderer</strong>不再是交替工作。当<strong>Scheduler</strong>将任务交给
      <strong>Reconciler</strong>后，<strong>Reconciler</strong>会为有变化的vDom打上effectTag,如下：
      <div className={classMap.assist}>packages\react-reconciler\src\ReactFiberFlags.js</div>
      <div className={classMap.markdown}>{FLAGS}</div>
      整个<strong>Scheduler</strong>和<strong>Reconciler</strong>的工作都在内存中进行，所有组件都完成<strong>Reconciler</strong>的工作，才会统一交给renderer
      <h3 id="newRenderer" className={classMap.articleSubTitle}>
      Renderer（渲染器）
      </h3>
      <strong>Renderer</strong>根据<strong>Reconciler</strong>标记的effectTag，同步执行对应的DOM操作
      <h2 id='summary' className={classMap.articleTitle}>总结</h2>
      <code>React16</code>采用了新的<code>Reconciler</code>,其内部采用了<code>Fiber</code>架构
      <Anchor className="anchor" getContainer={() => document.getElementById('content') as HTMLElement}>
        <Link href="#thinking" title="理念"></Link>
        <Link href="#oldStructure" title="React15架构">
          <Link href="#oldReconciler" title="Reconciler（协调器）"></Link>
          <Link href="#oldRenderer" title="Renderer（渲染器）"></Link>
          <Link href="#oldWeakness" title="缺点"></Link>
        </Link>
        <Link href="#newStructure" title="React16架构">
          <Link href="#scheduler" title="Scheduler（调度器）"></Link>
          <Link href="#newReconciler" title="Reconciler（协调器）"></Link>
          <Link href="#newRenderer" title="Renderer（渲染器）"></Link>
        </Link>
        <Link href="#summary" title="总结"></Link>
      </Anchor>
    </article>
  );
}
