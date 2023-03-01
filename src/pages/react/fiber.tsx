import { classMap } from '@/constants/constant';
import { Anchor } from 'antd';
import { ALTERNATE, FIBER_EXAMPLE, FIBER_NODE, MOUNT_EXAMPLE, ROOT_NODE } from '.';
import FIBER_1 from '@/images/fiber.png';
import FIBER_2 from '@/images/fiberRootNode.png';
import ALTERNATE_IMG from '@/images/alternate.png';
import CURRENT from '@/images/current.png';
import UPDATE_IMG from '@/images/update.png';
import CURRENT_UPDATE from '@/images/currentUpdate.png';
import { UseMarkDown } from '@/hooks/useMarkdown';
import { LazyImage } from '@/component/image';
const { Link } = Anchor;

export default function Fiber() {
  const alternate = <UseMarkDown markdown={ALTERNATE}></UseMarkDown>,
    fiberExample = <UseMarkDown markdown={FIBER_EXAMPLE}></UseMarkDown>,
    fiberNode = <UseMarkDown markdown={FIBER_NODE}></UseMarkDown>,
    mountExample = <UseMarkDown markdown={MOUNT_EXAMPLE}></UseMarkDown>,
    rootNode = <UseMarkDown markdown={ROOT_NODE}></UseMarkDown>;

  return (
    <article id="rootActicle" className={classMap.article}>
      <main className={classMap.content}>
        <h2 id="idea" className={classMap.articleTitle}>
          概念
        </h2>
        <code>React</code>内部实现的一套状态更新机制，支持任务优先级，可中断与恢复，并且恢复后可以复用之前的中间状态。
        其中每个任务更新单元为<code>React Element</code>对应的<code>Fiber</code>节点
        <h2 id="principle" className={classMap.articleTitle}>
          实现原理
        </h2>
        <h3 id="meaning" className={classMap.articleSubTitle}>
          含义
        </h3>
        <code>Fiber</code>包含三层含义
        <ul>
          <li>
            1. React16的<code>Reconciler</code>基于<code>Fiber</code>节点实现
          </li>
          <li>
            2. 作为静态数据结构来说，对应一个<code>React Element</code>，保存了组件的类型，dom节点等信息
          </li>
          <li>
            3. 作为动态工作单元来说Fiber，每个<code>Fiber</code>节点保存了本次更新中组件改变的状态，要执行的工作
          </li>
        </ul>
        <h3 id="structure" className={classMap.articleSubTitle}>
          结构
        </h3>
        <div className={classMap.assist}>packages\react-reconciler\src\ReactFiber.new.js</div>
        {fiberNode}
        举个栗子，如下组件
        {fiberExample}
        <LazyImage src={FIBER_1} />
        <div className={classMap.assist}>
          那么为什么父级指针叫return不叫parent呢？<code>return</code>指的是执行完<code>completeWork</code>
          后返回的下一个节点。虽然返回的确是父级，但是<code>return</code>更准确一点
        </div>
        <h2 id="work" className={classMap.articleTitle}>
          工作原理
        </h2>
        <h3 id="doubleCache" className={classMap.articleSubTitle}>
          双缓存
        </h3>
        双缓存就是<strong>在内存中构建并直接替换</strong>，这样可以一步到位，避免较大计算量带来的白屏等问题。
        <code>React</code>使用双缓存来完成<code>Fiber</code>树的构建与替换
        <br />
        <h3 id="doubleCacheFiber" className={classMap.articleSubTitle}>
          双缓存Fiber树
        </h3>
        在<code>React</code>中最多同时存在两棵<code>Fiber</code>树。当前屏幕上显示内容对应的Fiber树成为
        <strong>current Fiber树</strong>，正在内存中构建的Fiber树称为<strong>workInProgress Fiber树</strong>
        <br />
        <br />
        currentFiber和workInProgressFiber通过<code>alternate</code>属性连接
        {alternate}当<code>workInProgress Fiber树</code>构建完成交给
        <code>Renderer</code>渲染在页面上后，应用根节点的<code>current</code>指针指向<code>workInProgress Fiber树</code>
        ，此时<code>workInProgress Fiber树</code>就变为<code>current Fiber树</code>
        <br />
        <br />
        每次状态更新都会产生新的<code>workInProgress树</code>，通过<code>current</code>和<code>workInProgress</code>
        的切换，完成dom更新
        <br />
        <h3 id="mount" className={classMap.articleSubTitle}>
          mount时
        </h3>
        {mountExample}
        <ul>
          <li>
            1.首次执行<code>ReactDOM.render</code>会创建fiberRootNode和rootFiber,<code>fiberRootNode</code>
            是整个应用的根节点，rootFiber是App所在组件树的根节点。
            <br />
            在应用中我们可以多次render不同的组件树，它们会拥有不同的<code>rootFiber</code>
            ，但是整个应用的根节点只有一个，就是<code>fiberRootNode</code>
            <br />
            <br />
            <code>fiberRootNode</code>的<code>current</code>会指向当前页面上已渲染内容对应的<code>Fiber树</code>,即
            <code>current Fiber树</code>
            <LazyImage src={FIBER_2} />
            {rootNode}
            由于是首屏渲染，页面中还没有挂载任何DOM,所以fiberRootNode.current指向的rootFiber没有子fiber节点
          </li>
          <li>
            2.接下来进入render阶段，根据组件返回的<code>JSX</code>在内存中依次创建Fiber节点并连接在一起构建
            <code>Fiber</code>树，被称为<code>workInProgress树</code>
            <br />
            <br />
            在构建<code>workInProgress树</code>时会尝试复用<code>current树</code>
            已有的fiber节点内的属性，在首屏渲染时只有
            <code>rootFiber</code>存在对应的<code>current fiber</code>(rootFiber.alternate)
            <div className={classMap.assist}>下图右边为内存中构建的树，左侧为页面显示的树</div>
            <LazyImage src={ALTERNATE_IMG} />
          </li>
          <li>
            3.图中右侧已构建完的<code>workInProgress树</code>在<code>commit阶段</code>渲染到页面
            <br />
            <br />
            此时DOM更新为右侧树对应的样子。<code>fiberRootNode</code>的<code>current</code>指针指向
            <code>workInProgress树</code>，使其变为<code>current树</code>
            <LazyImage src={CURRENT} />
          </li>
        </ul>
        <h3 id="update" className={classMap.articleSubTitle}>
          update时
        </h3>
        <ul>
          <li>
            1. 点击p节点触发更新，开启新的render阶段并构建新的<code>workInProgress树</code>
            <LazyImage src={UPDATE_IMG} />和<code>mount</code>一样，<code>workInProgress树</code>可以复用
            <code>current树</code>
            对应的节点数据，决定是否复用的过程就是<strong>diff算法</strong>
          </li>
          <li>
            2. <code>workInProgress树</code>在<code>render阶段</code>完成构建后进入<code>commit阶段</code>
            渲染到页面上。渲染完成后，<code>workInProgress树</code>变为<code>current树</code>
            <LazyImage src={CURRENT_UPDATE} />
          </li>
        </ul>
      </main>
      <Anchor className="anchor" getContainer={() => document.getElementById('content') as HTMLElement}>
        <Link href="#idea" title="概念"></Link>
        <Link href="#principle" title="实现原理">
          <Link href="#meaning" title="含义"></Link>
          <Link href="#structure" title="结构"></Link>
        </Link>
        <Link href="#work" title="工作原理">
          <Link href="#doubleCache" title="双缓存"></Link>
          <Link href="#doubleCacheFiber" title="双缓存Fiber树"></Link>
          <Link href="#mount" title="mount时"></Link>
          <Link href="#update" title="update时"></Link>
        </Link>
      </Anchor>
    </article>
  );
}
