import { classMap } from '@/constants/constant';
import { Anchor } from 'antd';
import {
  BEFORE_MUTATION,
  BEFORE_MUTATION_BEFORE,
  CLASS_COMPONENT,
  COMMIT_BEFORE_MUTATION_EFFECTS,
  COMMIT_MUTATION_EFFECTS,
  FUNCTION_COMPONENT,
  INSERT,
  LAYOUT_AFTER,
  PARENT_FIBER,
  SIBILING
} from '.';
import { useMarkDown } from '@/hooks/useMarkdown';
const { Link } = Anchor;

export default function Index() {
  const BeforeMutation = useMarkDown(BEFORE_MUTATION),
    layoutAfter = useMarkDown(LAYOUT_AFTER),
    beforeMutationBefore = useMarkDown(BEFORE_MUTATION_BEFORE),
    beforeMutationEffects = useMarkDown(COMMIT_BEFORE_MUTATION_EFFECTS),
    functionComponent = useMarkDown(FUNCTION_COMPONENT),
    classComponent = useMarkDown(CLASS_COMPONENT),
    commitMutationEffects = useMarkDown(COMMIT_MUTATION_EFFECTS),
    parentFiber = useMarkDown(PARENT_FIBER),
    sibling = useMarkDown(SIBILING),
    insert = useMarkDown(INSERT);
  return (
    <article id="root" className={classMap.article}>
      <h2 id="process" className={classMap.articleTitle}>
        流程概览
      </h2>
      <code>commitRoot</code>方法是<code>commit阶段</code>工作的起点，<code>fiberRoot</code>作为传参。
      <div className={classMap.markdown}>commitRoot(root)</div>
      节点的<code>updateQueue</code>中保存了变化的props,这些副作用对应的DOM操作在<code>commit</code>阶段执行。
      <br />
      <br />
      除此之外,一些生命周期钩子(<code>componentDidxxx</code>)、<code>useEffect</code>等hook需要在commit阶段执行。
      commit阶段主要工作分为三部分：
      <ul className={classMap.ul}>
        <li>before mutation阶段（执行DOM操作前）</li>
        <li>mutation阶段（执行DOM操作）</li>
        <li>layout阶段（执行DOM操作后）</li>
      </ul>
      <div className={classMap.assist}>packages\react-reconciler\src\ReactFiberWorkLoop.new.js</div>
      <br />
      <h3 id="beforeMutation_before" className={classMap.articleSubTitle}>
        before mutation之前
      </h3>
      {beforeMutationBefore}在<code>before mutation</code>
      之前主要做一些变量赋值，状态重置的工作
      <h3 id="layout_after" className={classMap.articleSubTitle}>
        layout之后
      </h3>
      {layoutAfter}
      主要包括三点内容：
      <ul>
        <li>
          1. <code>useEffect</code>相关处理
        </li>
        <li>2. 性能追踪相关</li>
        <li>3. commit阶段会触发的一些生命周期钩子</li>
      </ul>
      <h2 id="beforeMutation" className={classMap.articleTitle}>
        before mutation
      </h2>
      {BeforeMutation}
      重点关注<code>commitBeforeMutationEffects</code>
      <h3 id="commitBeforeMutationEffects" className={classMap.articleSubTitle}>
        commitBeforeMutationEffects
      </h3>
      {beforeMutationEffects}
      执行<code>commitBeforeMutationEffectsOnFiber</code>，会根据fiber.tag来执行不同的逻辑
      <ul className={classMap.ul}>
        <li>
          FunctionComponent 处理<code>updateQueue.events</code>,其中包括useEffect等回调函数
          {functionComponent}
        </li>
        <li>
          ClassComponent 执行getSnapshotBeforeUpdate
          <div className={classMap.assist}>getSnapshotBeforeUpdate可以获取最近一次更新前的值</div>
          {classComponent}
        </li>
      </ul>
      <h2 id="mutation" className={classMap.articleTitle}>
        mutation
      </h2>
      <h3 id="commitMutationEffects" className={classMap.articleSubTitle}>
        commitMutationEffects
      </h3>
      主要关注<code>commitMutationEffects</code>函数，它调用了<code>commitMutationEffectsOnFiber</code>
      ，根据fiber节点的类型和flag(effectTag)类型来执行对应操作
      {commitMutationEffects}
      <h3 id="placementEffect" className={classMap.articleSubTitle}>
        Placement effect
      </h3>
      执行<code>commitReconciliationEffects</code>，当<code>fiber节点</code>含有<code>Placement effectTag</code>
      ，意味着对应的DOM节点需要插入到页面中，调用
      <code>commitPlacement</code>，该方法分为三步：
      <ul>
        <li>
          1. 获取父级DOM节点
          {parentFiber}
        </li>
        <li>
          2. 获取兄弟节点
          {sibling}
        </li>
        <li>
          3. 根据兄弟节点是否存在调用<code>insertBefore</code>或<code>appendChild</code>
          {insert}
        </li>
      </ul>
      <Anchor className="anchor" getContainer={() => document.getElementById('content') as HTMLElement}>
        <Link href="#process" title="流程概览">
          <Link href="#beforeMutation_before" title="before mutation之前"></Link>
          <Link href="#layout_after" title="layout之后"></Link>
        </Link>
        <Link href="#beforeMutation" title="before mutation">
          <Link href="#commitBeforeMutationEffects" title="commitBeforeMutationEffects"></Link>
        </Link>
        <Link href="#mutation" title="mutation">
          <Link href="#commitMutationEffects" title="commitMutationEffects"></Link>
          <Link href="#placementEffect" title="Placement effect"></Link>
          <Link href="#updateEffect" title="Update effect"></Link>
        </Link>
        <Link href="#layout" title="layout"></Link>
      </Anchor>
    </article>
  );
}
