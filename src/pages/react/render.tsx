import { classMap } from '@/constants/constant';
import { Anchor } from 'antd';
import {
  BEGIN_WORK,
  BEGIN_WORK_PARAMS,
  CHECK_UPDATE,
  FIBER_EXAMPLE,
  FLAGS,
  RECONCILER_CHILDREN,
  WORK_LOOP,
  WORK_LOOP_CONCUNCURRENT
} from '.';
import FIBER_1 from '@/images/fiber.png';
import BEGINWORK from '@/images/beginWork.png';

const { Link } = Anchor;

export default function Render() {
  return (
    <article id="root" className={classMap.article}>
      <h2 id="idea" className={classMap.articleTitle}>
        Render阶段流程
      </h2>
      <code>render阶段</code>开始于<code>performSyncWorkOnRoot</code>或<code>performConcurrentWorkOnRoot</code>
      。取决于本次更新是同步更新还是异步更新 它们会调用如下两个方法
      <div className={classMap.assist}>packages\react-reconciler\src\ReactFiberWorkLoop.new.js</div>
      <div className={classMap.markdown}>{WORK_LOOP}</div>
      <div className={classMap.markdown}>{WORK_LOOP_CONCUNCURRENT}</div>
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
      <div className={classMap.markdown}>{FIBER_EXAMPLE}</div>
      <img src={FIBER_1} />
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
      <div className={classMap.markdown}>{BEGIN_WORK_PARAMS}</div>
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
      <div className={classMap.markdown}>{BEGIN_WORK}</div>
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
          <div className={classMap.markdown}>{CHECK_UPDATE}</div>
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
      <div className={classMap.markdown}>{RECONCILER_CHILDREN}</div>
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
      DOM操作的具体类型就保存在<code>fiber.effectTag</code>中<div className={classMap.markdown}>{FLAGS}</div>
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
      <img src={BEGINWORK} />
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
        <Link href="#completeWork" title="completeWork"></Link>
      </Anchor>
    </article>
  );
}
