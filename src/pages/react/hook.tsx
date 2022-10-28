import { classMap } from '@/constants/constant';
import { Anchor, Alert } from 'antd';
import { useMarkDown } from '@/hooks/useMarkdown';
import { DISPATCHER, DISPATCHER_SET, HOOK, PUSH_EFFECT } from '.';
const { Link } = Anchor;

export default function Index() {
  const hook = useMarkDown(HOOK),
    pushEffect = useMarkDown(PUSH_EFFECT),
    dispatcher = useMarkDown(DISPATCHER),
    dispatcherSet = useMarkDown(DISPATCHER_SET);

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
      <Anchor className="anchor" getContainer={() => document.getElementById('content') as HTMLElement}>
        <Link href="#hooks" title="Hooks"></Link>
        <Link href="#dataStructure" title="数据结构">
          <Link href="#memoizedState" title="memoizedState"></Link>
          <Link href="#dispatcher" title="dispatcher"></Link>
        </Link>
        <Link href="#detail" title="具体实现">
          <Link href="#useState" title="useState和useReducer"></Link>
          <Link href="#useEffect" title="useEffect"></Link>
          <Link href="#useRef" title="useRef"></Link>
          <Link href="#useMemo" title="useMemo和useCallback"></Link>
        </Link>
      </Anchor>
    </article>
  );
}
