import { classMap } from '@/constants/constant';
import { Anchor } from 'antd';
import {
  BEGIN_WORK,
  BEGIN_WORK_PARAMS,
  CHECK_UPDATE,
  COMPLETE_WORK,
  DIFF_PROP,
  EFFECT_LIST,
  FIBER_EXAMPLE,
  FLAGS,
  HOST_COMPONENT,
  HOST_UPDATE,
  MOUNT_COMPONENT,
  RECONCILER_CHILDREN,
  UPDATE_COMPONENT,
  WORK_LOOP,
  WORK_LOOP_CONCUNCURRENT
} from '.';
import FIBER_1 from '@/images/fiber.png';
import BEGINWORK from '@/images/beginWork.png';
import SUBTREE_FLAGS from '@/images/subTreeFlags.png';
import EFFECT_LIST_PNG from '@/images/effectList.png';
import { UseMarkDown } from '@/hooks/useMarkdown';
import { LazyImage } from '@/component/image';

const { Link } = Anchor;

export default function Render() {
  const beginWork = <UseMarkDown markdown={BEGIN_WORK}></UseMarkDown>,
    beginWorkParams = <UseMarkDown markdown={BEGIN_WORK_PARAMS}></UseMarkDown>,
    checkUpdate = <UseMarkDown markdown={CHECK_UPDATE}></UseMarkDown>,
    completeWork = <UseMarkDown markdown={COMPLETE_WORK}></UseMarkDown>,
    diffProp = <UseMarkDown markdown={DIFF_PROP}></UseMarkDown>,
    effectList = <UseMarkDown markdown={EFFECT_LIST}></UseMarkDown>,
    fiberExample = <UseMarkDown markdown={FIBER_EXAMPLE}></UseMarkDown>,
    flags = <UseMarkDown markdown={FLAGS}></UseMarkDown>,
    hostComponent = <UseMarkDown markdown={HOST_COMPONENT}></UseMarkDown>,
    hostUpdate = <UseMarkDown markdown={HOST_UPDATE}></UseMarkDown>,
    mountComponent = <UseMarkDown markdown={MOUNT_COMPONENT}></UseMarkDown>,
    reconcileChildren = <UseMarkDown markdown={RECONCILER_CHILDREN}></UseMarkDown>,
    updateComponent = <UseMarkDown markdown={UPDATE_COMPONENT}></UseMarkDown>,
    workLoop = <UseMarkDown markdown={WORK_LOOP}></UseMarkDown>,
    workLoopConcurrent = <UseMarkDown markdown={WORK_LOOP_CONCUNCURRENT}></UseMarkDown>;

  return (
    <article id="root" className={classMap.article}>
      <main className={classMap.content}>
        <h2 id="flow" className={classMap.articleTitle}>
          Render阶段流程
        </h2>
        <code>render阶段</code>开始于<code>performSyncWorkOnRoot</code>或<code>performConcurrentWorkOnRoot</code>
        。取决于本次更新是同步更新还是异步更新 它们会调用如下两个方法
        <div className={classMap.assist}>packages\react-reconciler\src\ReactFiberWorkLoop.new.js</div>
        {workLoop}
        <br />
        {workLoopConcurrent}
        它们唯一的区别就是调用<code>shouldYield</code>，如果当前浏览器帧没有剩余时间，<code>shouldYield</code>
        会中止循环，直到浏览器有空闲时间后再继续遍历。
        <br />
        <br />
        <code>workInProgress</code>代表当前已创建的<code>workInProgress Fiber</code>
        <br />
        <br />
        <code>performUnitOfWork</code>会创建下一个<code>Fiber</code>节点并赋值给<code>workInProgress</code>，并将
        <code>workInProgress</code>与已创建的<code>Fiber</code>节点连接起来构成<code>Fiber树</code>
        <br />
        <h3 id="traverseDown" className={classMap.articleSubTitle}>
          向下阶段
        </h3>
        首先从<code>rootFiber</code>开始向下深度优先遍历，为遍历到的每个<code>Fiber节点</code>调用<code>beginWork</code>
        <br />
        该方法会根据传入的<code>Fiber节点</code>创建子<code>Fiber节点</code>，并将这两个<code>Fiber节点</code>连接起来
        <br />
        <br />
        当遍历到叶子节点时，就会进入向上阶段
        <br />
        <h3 id="traverseUp" className={classMap.articleSubTitle}>
          向上阶段
        </h3>
        这个阶段会调用<code>completeWork</code>处理<code>Fiber节点</code>
        当某个<code>Fiber节点</code>执行完<code>completeWork</code>，如果存在兄弟节点(<code>fiber.sibling!==null</code>
        )，会进入兄弟节点的向下阶段。
        <br />
        如果不存在兄弟节点，会进入父节点的向上阶段。
        <br />
        向上和向下会交错执行直到向上回到<code>rootFiber</code>，至此，<code>rennder</code>阶段结束.
        <br />
        还是之前的栗子
        {fiberExample}
        <LazyImage src={FIBER_1} />
        <code>render阶段</code>会依次执行
        <div className={classMap.markdown}>
          <ul>
            <li>1. rootFiber beginWork</li>
            <li>2. App Fiber beginWork</li>
            <li>3. div Fiber beginWork</li>
            <li>4. &quot;i am&quot; Fiber beginWork</li>
            <li>5. &quot;i am&quot; Fiber completeWork</li>
            <li>6. span Fiber beginWork</li>
            <li>7. span Fiber completeWork</li>
            <li>8. div Fiber completeWork</li>
            <li>9. App Fiber completeWork</li>
            <li>10. rootFiber completeWork</li>
          </ul>
        </div>
        为什么span的文本节点没有begin/complete Work呢？
        <span className={classMap.assist}>React针对只有单一文本子节点的Fiber进行了特殊处理以优化性能</span>
        <h2 id="beginWork" className={classMap.articleTitle}>
          beginWork
        </h2>
        <h3 id="beginWorkParams" className={classMap.articleSubTitle}>
          传入参数
        </h3>
        {beginWorkParams}
        <ul className={classMap.ul}>
          <li>
            current: 当前组件对应的<code>Fiber节点</code>在上一次更新时的<code>Fiber节点</code>
          </li>
          ,即<code>workInProgress.alternate</code>
          <li>
            workInProgress: 当前组件对应的<code>Fiber节点</code>
          </li>
          <li>renderLanes: 优先级相关</li>
        </ul>
        beginWork工作可以分为两部分
        <ul className={classMap.ul}>
          <li>
            <code>update</code>时：如果<code>current</code>存在，满足一定条件时可以复用<code>current</code>节点
            ，这样就可以复用current.child作为workInProgress.child，而不需要新建
          </li>
          <li>
            <code>mount</code>时，除了<code>fiberRootNode</code>以外，<code>current===null</code>，会根据
            <code>fiber.tag</code>来创建不同类型的子节点
          </li>
        </ul>
        <div className={classMap.assist}>packages\react-reconciler\src\ReactFiberBeginWork.new.js</div>
        {beginWork}
        <h3 id="update" className={classMap.articleSubTitle}>
          update时
        </h3>
        如下情况<code>didReceiveUpdate === false</code>，也就是可以复用前一次更新的子节点
        <ul>
          <li>
            1. <code>oldProps === newProps && workInProgress.type === current.type</code>，即props跟fiber.type不变
          </li>
          <li>
            2. <code>!hasScheduledUpdateOrContext</code>，即当前节点优先级不够
            <br />
            调用
            <code>checkScheduledUpdateOrContext</code>，检查当前节点优先级。如果优先级不够
            <code>hasScheduledUpdateOrContext</code>为false
            {checkUpdate}
          </li>
        </ul>
        <h3 id="update" className={classMap.articleSubTitle}>
          mount时
        </h3>
        当不满足优化条件时，就要新建子节点了。根据<code>fiber.tag</code>不同，进入不同类型的<code>Fiber</code>的创建逻辑
        <div className={classMap.assist}>
          tag对应的类型在packages\react-devtools-shared\src\backend\renderer.js可以看到，个版本有略微区别
        </div>
        对于常见的组件类型，最终会进入<code>reconcileChildren</code>方法
        <h3 id="reconcileChildren" className={classMap.articleSubTitle}>
          reconcileChildren
        </h3>
        它是<code>Reconciler</code>的核心部分
        <ul className={classMap.ul}>
          <li>
            对于<code>mount</code>的组件，它会创建新的<code>子fiber节点</code>
          </li>
          <li>
            对于<code>update</code>的组件，它会将当前组件与该组件上次更新对应的<code>Fiber节点</code>比较（
            <code>Diff</code>），将比较的结果生成新的节点
          </li>
        </ul>
        {reconcileChildren}
        从代码可以看出，和<code>beginWork</code>一样，它也是通过<code>current===null</code>来区分<code>mount</code>和
        <code>update</code>
        <br />
        <br />
        最后会生成新的子<code>Fiber节点</code>并赋值给<code>workInProgress.child</code>，作为本次<code>beginWork</code>
        返回值，并作为下次<code>performUnitOfWork</code>执行时<code>workInProgress</code>的传参
        <div className={classMap.assist}>
          <code>mountChildFibers</code>和<code>reconcileChildFibers</code>
          逻辑基本一致，区别是reconcileChildFibers会为生成的<code>Fiber节点</code>带上<code>effectTag</code>
        </div>
        <h3 id="effectTag" className={classMap.articleSubTitle}>
          effectTag
        </h3>
        DOM操作的具体类型就保存在<code>fiber.effectTag</code>中{flags}
        <div className={classMap.assist}>
          通过二进制表示可以更方便的用位操作为<code>fiber.effectTag</code>来赋值
        </div>
        多个<code>effect</code>
        如果要通知<code>renderer</code>将<code>fiber节点</code>对应的DOM插入页面中，需要满足两个条件
        <ul>
          <li>
            1. <code>fiber.stateNode</code>存在，即DOM节点不为空
          </li>
          <li>
            2. <code>(fiber.effectTag & Placement)!==0</code>，即节点存在修改
          </li>
        </ul>
        <div className={classMap.assist}>
          <code>mount</code>时，只有<code>rootFiber</code>会赋值<code>Placement effectTag</code>，这样在首屏渲染
          <code>commit阶段</code>只会执行一次插入操作
        </div>
        <br />
        <strong>beginWork流程图</strong>
        <LazyImage src={BEGINWORK} />
        <h2 id="completeWork" className={classMap.articleTitle}>
          completeWork
        </h2>
        类似<code>beginWork</code>，<code>completeWork</code>也是根据不同的<code>fiber.tag</code>
        调用不同的处理逻辑，以渲染页面必须的<code>HostComponent</code>（即原生DOM组件对应的fiber节点）为例。
        {completeWork}
        <h3 id="hostComponent" className={classMap.articleSubTitle}>
          HostComponent
        </h3>
        和<code>beginWork</code>一样，根据<code>current === null</code>来判断是mount还是update
        <br />
        同时针对<code>HostComponent</code>，判断<code>update</code>时还要考虑
        <code>workInProgress.stateNode!==null</code>
        ，也就是该<code>fiber节点</code>是否存在对应的DOM节点
        {hostComponent}
        <h3 id="hostUpdate" className={classMap.articleSubTitle}>
          update时
        </h3>
        当<code>update</code>时，<code>Fiber节点</code>已经存在对应DOM节点，不需要生成，需要做的是处理<code>props</code>
        <ul className={classMap.ul}>
          <li>
            <code>onClick</code>
            <code>onChange</code>等回调函数的注册
          </li>
          <li>
            处理 <code>style prop</code>
          </li>
          <li>
            处理 <code>DANGEROUSLY_SET_INNER_HTML prop</code>
          </li>
          <li>
            处理 <code>children prop</code>
          </li>
        </ul>
        最主要的逻辑就是调用了<code>updateHostComponent</code>
        {hostUpdate}
        <code>updateHostComponent</code>将props处理完后，赋值给<code>workInProgress.updateQueue</code>，最终会在
        <code>commit阶段</code>被渲染到页面上
        {updateComponent}
        <code>uploadPayload</code>是数组，它的偶数索引的值为变化的<code>prop key</code>，奇数索引的值为变化的
        <code>prop value</code>
        {diffProp}
        <h3 id="hostMount" className={classMap.articleSubTitle}>
          mount时
        </h3>
        <code>mount</code>的主要逻辑：
        <ul className={classMap.ul}>
          <li>
            为<code>Fiber节点</code>生成了对应的DOM节点
          </li>
          <li>将子孙DOM节点插入刚生成的DOM节点中</li>
          <li>
            <code>跟updateHostComponent</code>类似的处理props过程
          </li>
        </ul>
        每次向上阶段都会调用<code>appendAllChildren</code>插入子孙节点至当前生成的DOM节点下，那么到顶部
        <code>rootFiber时</code>，DOM树就构建完成了。
        {mountComponent}
        <h3 id="effectList" className={classMap.articleSubTitle}>
          effectList
        </h3>
        <code>commit阶段</code>需要找到所有有<code>effectTag</code>的<code>Fiber节点</code>
        并依次执行对应操作，难道还要再遍历一次<code>Fiber树</code>？
        <br />
        <br />
        为了解决这个问题，在<code>completeWork</code>的上层函数<code>completeUnitOfWork</code>中，每个执行完的
        <code>completeWork</code>且存在<code>effectTag</code>的<code>Fiber节点</code>会被保存在<code>effectList</code>
        这个单向链表中。
        <br />
        <br />
        <code>effectList</code>第一个节点保存在<code>fiber.firstEffect</code>，最后一个节点保存在
        <code>fiber.lastEffect</code>
        <br />
        <br />
        类似于<code>appendAllChildren</code>，在向上阶段，所有有<code>effectTag</code>
        的节点都会被追加在effectList中，最终形成一条以<code>rootFiber.firstEffect</code>为起点的单向链表。
        {effectList}在<code>commit阶段</code>只需要遍历<code>effectList</code>
        就能执行所有<code>effect</code>了
        <LazyImage src={EFFECT_LIST_PNG} />
        但是从react16.14开始，effectList被重构了，改用<strong>SubtreeFlags</strong>
        <h3 id="SubtreeFlags" className={classMap.articleSubTitle}>
          SubtreeFlags
        </h3>
        重构之后，会将子节点的副作用冒泡到父节点的<code>SubTreeFlags</code>属性
        <LazyImage src={SUBTREE_FLAGS} />
        <ul>
          <li>1.B的副作用是Passive，冒泡到A，A.SubtreeFlags包含Passive</li>
          <li>2.E的副作用是Placement，冒泡到D，D.SubtreeFlags包含Placement</li>
          <li>3.D冒泡到C,C.SubtreeFlags包含Placement</li>
          <li>4.C的副作用为Update，C.SubtreeFlags包含Placement，C冒泡到A</li>
          <li>5.最终A.SubtreeFlags包含Passive,Placement,Update</li>
        </ul>
        在<code>commit阶段</code>，再根据<code>SubtreeFlags</code>
        一层层查找有副作用的节点并执行对应操作。可见这种操作需要遍历树，效率低于遍历链表，为什么要重构呢？
        <h3 id="Suspense" className={classMap.articleSubTitle}>
          Suspense
        </h3>
        根据<code>Suspense</code>
        的理念，如果子孙组件有异步加载的内容，只会先渲染fallback。为了实现这一点，需要改变commit阶段遍历的方式，所以重构为subtreeFlags。
      </main>
      <Anchor className="anchor" getContainer={() => document.getElementById('content') as HTMLElement}>
        <Link href="#flow" title="Render阶段流程">
          <Link href="#traverseDown" title="向下阶段"></Link>
          <Link href="#traverseUp" title="向上阶段"></Link>
        </Link>
        <Link href="#beginWork" title="beginWork">
          <Link href="#beginWorkParams" title="传入参数"></Link>
          <Link href="#update" title="update时"></Link>
          <Link href="#mount" title="mount时"></Link>
          <Link href="#reconcileChildren" title="reconcileChildren"></Link>
          <Link href="#effectTag" title="effectTag"></Link>
        </Link>
        <Link href="#completeWork" title="completeWork">
          <Link href="#hostComponent" title="HostComponent"></Link>
          <Link href="#hostUpdate" title="update时"></Link>
          <Link href="#hostMount" title="mount时"></Link>
          <Link href="#effectList" title="effectList"></Link>
          <Link href="#SubtreeFlags" title="SubtreeFlags"></Link>
          <Link href="#Suspense" title="Suspense"></Link>
        </Link>
      </Anchor>
    </article>
  );
}
