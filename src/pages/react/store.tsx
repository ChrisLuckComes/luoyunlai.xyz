import { classMap } from '@/constants/constant';
import { Anchor } from 'antd';
import { UseMarkDown } from '@/hooks/useMarkdown';
import {
  ADD_TO_STORE,
  CONFIGURE_STORE,
  CREATE_STORE,
  PROVIDER,
  REDUX_APP,
  REDUX_STORE,
  STORE_SLICE,
  USE_REDUX_STATE
} from './_store';
const { Link } = Anchor;

export default function Index() {
  const reduxStore = <UseMarkDown markdown={REDUX_STORE}></UseMarkDown>,
    reduxApp = <UseMarkDown markdown={REDUX_APP}></UseMarkDown>,
    storeSlice = <UseMarkDown markdown={STORE_SLICE}></UseMarkDown>,
    addToStore = <UseMarkDown markdown={ADD_TO_STORE}></UseMarkDown>,
    useReduxState = <UseMarkDown markdown={USE_REDUX_STATE} />,
    createStore = <UseMarkDown markdown={CREATE_STORE} />,
    configureStore = <UseMarkDown markdown={CONFIGURE_STORE}></UseMarkDown>,
    provider = <UseMarkDown markdown={PROVIDER}></UseMarkDown>;

  return (
    <article id="root" className={classMap.article}>
      <main className={classMap.content}>
        <h2 id="info" className={classMap.articleTitle}>
          还在用Redux吗？你out了。
        </h2>
        <h2 id="redux" className={classMap.articleSubTitle}>
          React-Redux
        </h2>
        Redux是一个可预见状态的管理容器，在react生态中中广泛使用，然而我本人使用它的频率却不多。因为不是什么东西都需要放进redux的，常规场景url传参就够用了。
        <br />
        想把它在React工程中跑起来，需要这样一些步骤：
        <ul>
          <li>
            1. 首先当然是安装了 <code>pnpm add react-redux</code>
          </li>
          <li>
            2. 预先配置store(包括name,state,reducers等)
            {reduxStore}
          </li>
          <li>
            3.然后用<code>Provider</code>将<code>App</code>包裹起来
            {reduxApp}
          </li>
          <li>
            4.创建state切片
            {storeSlice}
          </li>
          <li>
            5. 将slice加到store中
            {addToStore}
          </li>
          <li>
            6. 最后就可以在组件中引入state并使用了
            {useReduxState}
          </li>
        </ul>
        <embed
          width="100%"
          height={500}
          src="https://codesandbox.io/embed/github/reduxjs/redux-essentials-counter-example/tree/master/?fontsize=14&hidenavigation=1&theme=dark"
        />
      </main>
      <h2 id="source" className={classMap.articleTitle}>
        源码解析
      </h2>
      <h2 id="#init" className={classMap.articleTitle}>
        初始化
      </h2>
      <h3 id="configureStore" className={classMap.articleSubTitle}>
        配置store
      </h3>
      按照使用步骤，第一步就是配置store
      <br />
      <strong>repo: redux-toolkit</strong>
      <div className={classMap.assist}>packages\toolkit\src\configureStore.ts</div>
      {configureStore}
      <p>对options中的参数进行处理，最后调用标准Redux createStore()函数</p>
      <h3 id="createStore" className={classMap.articleSubTitle}>
        createStore
      </h3>
      <div className={classMap.assist}>src\createStore.ts</div>
      {createStore}
      <p>
        函数接收reducer、preloadedState、enhancer参数创建一个包括<code>dispatch</code>,<code>subscribe</code>
        等属性的store对象，其中dispatch用来修改state,subscribe订阅listener的变化
      </p>
      <h2 id="diff" className={classMap.articleTitle}>
        在react中的实现
      </h2>
      <h3 id="provider" className={classMap.articleSubTitle}>
        Provider
      </h3>
      react-redux这个repo中的<code>Provider</code>
      组件是实现state变化刷新页面的核心，它帮我们做了订阅，并且使用<code>Context</code>将state传递给了子组件，所以state有变化时能刷新页面。
      <div className={classMap.assist}>src\components\Provider.tsx</div>
      {provider}
      <h2 id="#reduxInReact" className={classMap.articleTitle}>
        当前主流方案
      </h2>
      按现在的眼光来看Redux，确实略微繁琐了。使用<code>useContext</code>就能实现类似的功能，还不需要额外引入库。
      <Anchor className="anchor" getContainer={() => document.getElementById('content') as HTMLElement}>
        <Link title="Redux" href="#redux" />
        <Link title="源码解析" href="#source">
          <Link title="初始化" href="#init">
            <Link title="configureStore" href="#configureStore"></Link>
            <Link title="createStore" href="#createStore"></Link>
          </Link>
          <Link title="在react中的实现" href="#reduxInReact">
            <Link title="Provider" href="#provider"></Link>
          </Link>
        </Link>
        <Link title="当前主流方案" href="#replace" />
      </Anchor>
    </article>
  );
}
