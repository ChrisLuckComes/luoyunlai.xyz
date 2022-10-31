import { classMap } from '@/constants/constant';
import { Anchor, Alert } from 'antd';
import { useMarkDown } from '@/hooks/useMarkdown';
import {
  APP_1,
  BASIC_STATE_ROUTER,
  COMMIT_HOOK_EFFECT_LIST_MOUNT,
  COMMIT_HOOK_EFFECT_LIST_UNMOUNT,
  DISPATCHER,
  DISPATCHER_SET,
  DISPATCH_STATE,
  FLUSH_PASSIVE_EFFECTS,
  HOOK,
  MOUNT_STATE_REDUCER,
  PUSH_EFFECT,
  UPDATE_REDUCER,
  USE_STATE_REDUCER
} from '.';
const { Link } = Anchor;

export default function Index() {
  const hook = useMarkDown(HOOK),
    pushEffect = useMarkDown(PUSH_EFFECT),
    dispatcher = useMarkDown(DISPATCHER),
    dispatcherSet = useMarkDown(DISPATCHER_SET),
    app_1 = useMarkDown(APP_1),
    useState_Reducer = useMarkDown(USE_STATE_REDUCER),
    mountStateReducer = useMarkDown(MOUNT_STATE_REDUCER),
    basicStateReducer = useMarkDown(BASIC_STATE_ROUTER),
    updateReducer = useMarkDown(UPDATE_REDUCER),
    dispatch = useMarkDown(DISPATCH_STATE),
    flushPassiveEffects = useMarkDown(FLUSH_PASSIVE_EFFECTS),
    commitHookEffectListUnmount = useMarkDown(COMMIT_HOOK_EFFECT_LIST_UNMOUNT),
    commitHookEffectListMount = useMarkDown(COMMIT_HOOK_EFFECT_LIST_MOUNT);

  return (
    <article id="root" className={classMap.article}>
      <h2 id="hooks" className={classMap.articleTitle}>
        Hooks
      </h2>
      什么是Hooks?它的直译是钩子，函数组件中使用它们可以实现和<code>ClassComponent</code>一样的功能。它是 React实现
      <code>代数效应(Algebraic Effects)</code>的方式，我们不需要关注函数组件的state在<code>useState</code>这些
      <code>hook</code>
      中是怎么保存和处理的，专注业务逻辑的实现就行。
      <div className={classMap.assist}>
        代数效应可以理解为将主要逻辑跟副作用分开，比如<code>try/catch</code>,<code>async/await</code>
      </div>
      <br />
      <br />
      <h2 id="dataStructure" className={classMap.articleTitle}>
        数据结构
      </h2>
      <div className={classMap.assist}>packages\react-reconciler\src\ReactFiberHooks.new.js</div>
      {hook}
      <h3 id="memoizedState" className={classMap.articleSubTitle}>
        memoizedState
      </h3>
      <Alert
        message={
          <ul className={classMap.ul}>
            hook和FunctionComponent都存在<code>memoizedState</code>属性，不要混淆。
            <li>
              <code>fiber.memoizedState</code>: FunctionComponent对应的<code>fiber</code>保存的hooks链表
            </li>
            <li>
              <code>hook.memoizedState</code>: hooks链表中保存的单一hook对应的数据
            </li>
          </ul>
        }
        type="warning"
      />
      不同类型的<code>hook</code>的<code>memorizedState</code>保存不同类型数据，具体如下：
      <ul className={classMap.ul}>
        <li>
          useState: 对于<code>const [state, updateState] = useState(initialState)</code>，<code>memorizedState</code>
          保存state的值
        </li>
        <li>
          useReducer：对于<code>const [state, dispatch] = useReducer(reducer, {})</code>，保存state的值
        </li>
        <li>
          useEffect：<code>memorizedState</code>保存包含<code>useEffect回调函数</code>、<code>依赖项</code>
          等的链表数据结构<code>effect</code>，effect同时会保存在<code>fiber.updateQueue</code>中，创建过程如下
          {pushEffect}
        </li>
        <li>
          useRef：对于<code>useRef(1)</code>，memorizedState保存<code>{`{current:1}`}</code>
        </li>
        <li>
          useMemo：对于<code>useMemo(callback,[depA])</code>，memorizedState保存<code>[callback(),depA]</code>
        </li>
        <li>
          useCallback：对于<code>useCallback(callback,[depA])</code>，memorizedState保存<code>[callback,depA]</code>，和
          <code>useMemo</code>的区别就是它保存的是函数本身，<code>useMemo</code>保存的是执行结果
        </li>
        <li>useContext：没有memorizedState</li>
      </ul>
      <h3 id="dispatcher" className={classMap.articleSubTitle}>
        dispatcher
      </h3>
      真实的<code>hooks</code>中，组件mount时的hook和update时的hook来源于不同的对象，这类对象被称为
      <code>dispatcher</code>
      {dispatcher}
      mount时调用的hook和update时调用的hook是两个不同的函数。
      <br />
      <br />在<code>render</code>之前，根据<code>current===null || current.memorized === null</code>
      来区分mount和update。
      <br />
      然后将不同情况的<code>dispatcher</code>赋值给全局变量<code>ReactCurrentDispatcher.current</code>
      {dispatcherSet}
      执行<code>render</code>的时候，从<code>ReactCurrentDispatcher.current</code>中寻找需要的hook
      <h2 id="detail" className={classMap.articleTitle}>
        具体实现
      </h2>
      <h3 id="useState" className={classMap.articleSubTitle}>
        useState和useReducer
      </h3>
      它们的工作流程分为<code>声明阶段</code>和<code>调用阶段</code>
      举个栗子，有如下函数组件：
      {app_1}
      <ul>
        <li>
          <code>声明阶段</code>： <code>App</code>调用时，依次执行<code>useReducer</code>和<code>useState</code>
        </li>
        <li>
          <code>调用阶段</code>： 点击按钮后，<code>dispatch</code>或<code>updateNum</code>
        </li>
      </ul>
      <h3 id="define" className={classMap.articleSubTitle}>
        <strong>声明阶段</strong>
      </h3>
      函数组件进入<code>render</code>,调用<code>beginWork</code>，会调用<code>renderWithHooks</code>。
      <br />
      内部会执行<code>FunctionComponent</code>对应函数。
      <code>useState</code>和<code>useReducer</code>源码如下：
      <br />
      <div className={classMap.assist}>packages\react\src\ReactHooks.js</div>
      {useState_Reducer}
      <strong className={classMap.h4}>mount时</strong>
      <code>mount时</code>，<code>useReducer</code>会调用<code>mountReducer</code>，<code>useState</code>会调用
      <code>mountState</code>
      <div className={classMap.assist}>packages\react-reconciler\src\ReactFiberHooks.new.js</div>
      {mountStateReducer}
      <code>mountWorkInProgressHook</code>方法会创建并返回对应<code>hook</code>，可以看到，两个hook唯一区别是
      <code>lastRenderedReducer</code>字段。
      <code>useReducer</code>的<code>lastRenderedReducer</code>为传入的<code>reducer</code>参数。<code>useState</code>的
      <code>lastRenderedReducer</code>为<code>basicStateReducer</code>
      <br />
      <code>basicStateReducer</code>代码如下：
      {basicStateReducer}
      所以，<code>useState</code>就是<code>reducer</code>为<code>basicStateReducer</code>的<code>useReducer</code>
      <strong className={classMap.h4}>update时</strong>
      <code>mount时</code>还有微小的差别，而
      <code>update</code>时，<code>useReducer</code>和<code>useState</code>调用的是同一个函数<code>updateReducer</code>
      {updateReducer}
      <code>mount</code>时获取当前<code>hook</code>使用的是<code>mountWorkInProgressHook</code>，而<code>update</code>
      时使用的是<code>updateWorkInProgressHook</code>，原因是：
      <ul className={classMap.ul}>
        <li>
          <code>mount</code>时可以确定是调用<code>ReactDOM.render</code>产生的初始化更新，只会执行一次。
        </li>
        <li>
          <code>update</code>可能是事件回调或副作用中触发的更新，也有可能是<code>render</code>
          阶段触发的更新，为了避免无限循环更新，后者需要区别对待。
        </li>
      </ul>
      <code>React</code>使用变量<code>didScheduleRenderPhaseUpdate</code>判断是否是<code>render</code>阶段的更新。
      <h3 id="call" className={classMap.articleSubTitle}>
        <strong>调用阶段</strong>
      </h3>
      调用阶段会执行<code>dispatchAction</code>，此时该函数组件对应的<code>fiber</code>,<code>hook.queue</code>已经通过
      <code>bind</code>方法预先作为参数传入。
      {dispatch}
      整个过程可以概括为：创建<code>update</code>，将<code>update</code>加入<code>queue.pending</code>，并开启调度。
      <h3 id="useEffect" className={classMap.articleSubTitle}>
        useEffect
      </h3>
      深入<code>flushPassiveEffects</code>方法看<code>useEffect</code>的工作原理。
      <strong className={classMap.h4}>flushPassiveEffectsImpl</strong>
      <code>flushPassiveEffects</code>内部设置优先级，执行<code>flushPassiveEffectsImpl</code>
      {flushPassiveEffects}
      <code>flushPassiveEffectsImpl</code>主要做三件事：
      <ul className={classMap.ul}>
        <li>
          调用<code>useEffect</code>在上一次<code>render</code>的销毁函数
        </li>
        <li>
          调用<code>useEffect</code>本次<code>render</code>的回调函数
        </li>
        <li>如果存在同步任务，不需要等待下次事件循环的宏任务，提前执行</li>
      </ul>
      <code>v16.13.1</code>之前第一步是同步执行的，之后都改为异步执行了。
      <strong className={classMap.h4}>阶段一：销毁函数的执行</strong>
      <code>useEffect</code>需要所有组件的<code>useEffect</code>的销毁函数都执行完后才能执行任意一个
      <code>useEffect</code>的回调函数， 因为多个组件可能共用同一个ref，<code>useLayoutEffect</code>也是一样。 
      <br />
      <br />
      在阶段一，会遍历并执行所有<code>useEffect</code>的销毁函数
      {commitHookEffectListUnmount}
      <strong className={classMap.h4}>阶段二：回调函数的执行</strong>
      {commitHookEffectListMount}
      <Anchor className="anchor" getContainer={() => document.getElementById('content') as HTMLElement}>
        <Link href="#hooks" title="Hooks"></Link>
        <Link href="#dataStructure" title="数据结构">
          <Link href="#memoizedState" title="memoizedState"></Link>
          <Link href="#dispatcher" title="dispatcher"></Link>
        </Link>
        <Link href="#detail" title="具体实现">
          <Link href="#useState" title="useState和useReducer">
            <Link href="#define" title="声明阶段"></Link>
            <Link href="#call" title="调用阶段"></Link>
          </Link>
          <Link href="#useEffect" title="useEffect"></Link>
          <Link href="#useRef" title="useRef"></Link>
          <Link href="#useMemo" title="useMemo和useCallback"></Link>
        </Link>
      </Anchor>
    </article>
  );
}
