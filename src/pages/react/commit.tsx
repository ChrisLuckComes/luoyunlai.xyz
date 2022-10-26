import { classMap } from '@/constants/constant';
import { Anchor } from 'antd';
import {
  BEFORE_MUTATION,
  BEFORE_MUTATION_BEFORE,
  CHANGE_CURRENT_ROOT,
  CLASS_COMPONENT,
  COMMIT_ATTACH_REF,
  COMMIT_BEFORE_MUTATION_EFFECTS,
  COMMIT_HOOK_EFFECT_LIST_MOUNT,
  COMMIT_HOOK_EFFECT_LIST_UNMOUNT,
  COMMIT_LAYOUT_EFFECT,
  COMMIT_LAYOUT_EFFECT_ON_FIBER,
  COMMIT_MUTATION_EFFECTS,
  COMMIT_ROOT,
  COMMIT_UPDATE,
  DESTROY_FUNC,
  FUNCTION_COMPONENT,
  INSERT,
  LAYOUT_AFTER,
  PARENT_FIBER,
  SIBILING
} from '.';
import { useMarkDown } from '@/hooks/useMarkdown';
const { Link } = Anchor;

export default function Index() {
  const commitRoot = useMarkDown(COMMIT_ROOT),
    BeforeMutation = useMarkDown(BEFORE_MUTATION),
    layoutAfter = useMarkDown(LAYOUT_AFTER),
    beforeMutationBefore = useMarkDown(BEFORE_MUTATION_BEFORE),
    beforeMutationEffects = useMarkDown(COMMIT_BEFORE_MUTATION_EFFECTS),
    functionComponent = useMarkDown(FUNCTION_COMPONENT),
    classComponent = useMarkDown(CLASS_COMPONENT),
    commitMutationEffects = useMarkDown(COMMIT_MUTATION_EFFECTS),
    parentFiber = useMarkDown(PARENT_FIBER),
    sibling = useMarkDown(SIBILING),
    insert = useMarkDown(INSERT),
    commitHookEffectListUnmount = useMarkDown(COMMIT_HOOK_EFFECT_LIST_UNMOUNT),
    destroyFunc = useMarkDown(DESTROY_FUNC),
    commitHookEffectListMount = useMarkDown(COMMIT_HOOK_EFFECT_LIST_MOUNT),
    commitUpdate = useMarkDown(COMMIT_UPDATE),
    commitLayoutEffects = useMarkDown(COMMIT_LAYOUT_EFFECT),
    commitLayoutEffectOnFiber = useMarkDown(COMMIT_LAYOUT_EFFECT_ON_FIBER),
    commitAttachRef = useMarkDown(COMMIT_ATTACH_REF),
    changeCurrentRoot = useMarkDown(CHANGE_CURRENT_ROOT);

  return (
    <article id="root" className={classMap.article}>
      <h2 id="process" className={classMap.articleTitle}>
        流程概览
      </h2>
      <code>commitRoot</code>方法是<code>commit阶段</code>工作的起点，<code>fiberRoot</code>作为传参。
      {commitRoot}
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
          3. 根据兄弟节点是否存在调用<code>insertBefore</code>或<code>appendChild</code>执行DOM操作
          {insert}
        </li>
      </ul>
      <h3 id="updateEffect" className={classMap.articleSubTitle}>
        Update effect
      </h3>
      当<code>Fiber节点</code>含有<code>Update tag</code>，说明需要更新。主要关注<code>FunctionComponent</code>和
      <code>HostComponent</code>
      <br />
      <br />
      <strong>FunctionComponent mutation</strong>
      <br />
      <br />
      先调用<code>commitHookEffectListUnmount</code>，遍历updateQueue，执行销毁函数
      {commitHookEffectListUnmount}
      所谓<b>销毁函数</b>如下：
      {destroyFunc}
      再调用<code>commitHookEffectListMount</code>，遍历updateQueue，执行effect.create并赋值给destroy
      {commitHookEffectListMount}
      <br />
      <br />
      <strong>HostComponent mutation</strong>
      <br />
      <br />当<code>fiber.tag</code>为<code>HostComponent</code>，会调用<code>commitUpdate</code>。其中调用
      <code>updateProperties</code>修改DOM节点，调用<code>updateFiberProps</code>修改<code>fiber节点</code>
      {commitUpdate}
      <h3 id="deletionEffect" className={classMap.articleSubTitle}>
        Deletion effect
      </h3>
      mutation阶段首先执行的就是<code>recursivelyTraverseMutationEffects</code> ，遍历parentFiber.deletions并执行
      <code>commitDeletionEffects</code>，内部调用<code>commitDeletionEffectsOnFiber</code>完成如下操作：
      <ul>
        <li>
          1. <code>ClassComponent</code>类型的节点，调用<code>componentWillUnmount</code>生命周期钩子，移除对应DOM节点
        </li>
        <li>
          2. 解绑<code>ref</code>
        </li>
        <li>
          3. 对于<code>FunctionComponent</code>等类型，执行safelyCallDestroy，调用销毁函数
        </li>
      </ul>
      <h2 id="layout" className={classMap.articleTitle}>
        layout
      </h2>
      该阶段的代码在DOM渲染完成后执行，该阶段触发的生命周期钩子和<code>hook</code>
      可以访问到更新后的DOM。具体的执行函数是<code>commitLayoutEffects</code>
      <h3 id="commitLayoutEffects" className={classMap.articleSubTitle}>
        commitLayoutEffects
      </h3>
      <code>commitLayoutEffects</code>调用了<code>commitLayoutEffectOnFiber</code>
      {commitLayoutEffects}
      <h3 id="commitLayoutEffectOnFiber" className={classMap.articleSubTitle}>
        commitLayoutEffectOnFiber
      </h3>
      <code>commitLayoutEffectOnFiber</code>根据<code>fiber.tag</code>分类处理
      <ul className={classMap.ul}>
        <li>
          对于<code>ClassComponent</code>，根据<code>current===null</code>区分是mount还是update，调用
          <code>componentDidMount</code>或<code>componentDidUpdate</code>
        </li>
        <li>
          对于<code>FunctionComponent</code>等类型，调用<code>useLayoutEffect hook</code>
          的回调函数，并且将结果赋值给destroy
          <br />
          <br />
          <code>mutation阶段</code>会执行<code>useLayoutEffect hook</code>的destroy函数，结合这里
          <code>useLayoutEffect hook</code>从上一次更新的destroy到本次更新的create调用是同步执行的，但是
          <code>useEffect</code>需要先调度，在<code>Layout阶段</code>完成后再异步执行
        </li>
      </ul>
      {commitLayoutEffectOnFiber}
      <h3 id="commitAttachRef" className={classMap.articleSubTitle}>
        commitAttachRef
      </h3>
      {commitAttachRef}
      主要就是获取DOM实例，更新ref
      <h3 id="changeCurrentFiber" className={classMap.articleSubTitle}>
        current Fiber树切换
      </h3>
      {changeCurrentRoot}
      这段代码的位置在<code>mutation阶段</code>结束后，<code>layout阶段</code>开始前。因为mutation阶段会执行
      <code>componentWillUnmount</code>钩子，此时<code>currentFiber</code>还是前一次更新的<code>fiber树</code>
      ，生命周期内获取的DOM是更新前的。layout阶段会执行<code>componentDidMount</code>和<code>componentDidUpdate</code>
      ，此时<code>current Fiber树</code>已经是更新后的。
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
          <Link href="#deletionEffect" title="Deletion effect"></Link>
        </Link>
        <Link href="#layout" title="layout">
          <Link href="#commitLayoutEffects" title="commitLayoutEffects"></Link>
          <Link href="#commitLayoutEffectOnFiber" title="commitLayoutEffectOnFiber"></Link>
          <Link href="#commitAttachRef" title="commitAttachRef"></Link>
          <Link href="#changeCurrentFiber" title="current Fiber树切换"></Link>
        </Link>
      </Anchor>
    </article>
  );
}
