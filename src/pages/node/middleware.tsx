import { classMap } from '@/constants/constant';
import { Anchor, Alert } from 'antd';
import { UseMarkDown } from '@/hooks/useMarkdown';
import {
  APP_USE,
  APP_USE_1,
  COMPOSE,
  INFO_EXPRESS,
  INFO_KOA,
  KOA_USE,
  PROCESS_PARAMS,
  PROTO_HANDLE,
  PROTO_USE
} from './_middleware';

import ONION from '@/images/node/koa.png';

const { Link } = Anchor;

export default function Index() {
  const appUse = <UseMarkDown markdown={APP_USE}></UseMarkDown>,
    appUse_1 = <UseMarkDown markdown={APP_USE_1}></UseMarkDown>,
    protoUse = <UseMarkDown markdown={PROTO_USE}></UseMarkDown>,
    protoHandle = <UseMarkDown markdown={PROTO_HANDLE}></UseMarkDown>,
    processParams = <UseMarkDown markdown={PROCESS_PARAMS}></UseMarkDown>,
    koaUse = <UseMarkDown markdown={KOA_USE}></UseMarkDown>,
    compose = <UseMarkDown markdown={COMPOSE}></UseMarkDown>;

  return (
    <article id="root" className={classMap.article}>
      <main className={classMap.content}>
        <h2 id="express" className={classMap.articleTitle}>
          express中间件
        </h2>
        提到Node.js，绕不开的框架就是express以及原班人马开发的koa
        <br />
        <br />
        <Alert type="info" message={INFO_EXPRESS} />
        <br />
        如下是一段熟悉的中间件代码：
        <a
          className={classMap.href}
          target="_blank"
          rel="noreferrer"
          href="https://codesandbox.io/s/modest-cray-s3t4o1"
        >
          codeSandbox
        </a>
        <br />
        {appUse}
        输出如下：
        <div className={classMap.markdown}>
          <div>第一个中间件start</div>
          <div>第一个中间件end</div>
          <div>第二个中间件start</div>
          <div>第二个中间件end</div>
          <div>接口逻辑start </div>
          <div>接口逻辑end</div>
        </div>
        <br />
        但是，如果把setTimeout移除，直接调用next()：
        {appUse_1}
        输出如下：
        <div className={classMap.markdown}>
          <div>第一个中间件start</div>
          <div>第二个中间件start</div>
          <div>接口逻辑start</div>
          <div>接口逻辑end</div>
          <div>第二个中间件end</div>
          <div>第一个中间件end</div>
        </div>
        这种输出看着跟koa的输出没区别啊？确实是，但是它和洋葱模型不同，这种输出的结果其实是因为代码是同步运行导致的，express是线性的模型。
        <h3 id="expressSource" className={classMap.articleSubTitle}>
          源码解析
        </h3>
        我们来看一下源码(有删减，只看关键部分)。
        <div className={classMap.assist}>lib\router\index.js</div>
        中间件的挂载主要通过<code>proto.use</code>和<code>proto.handle</code>
        {protoUse}
        <br />
        <code>proto.use</code>主要将挂载的中间件存储在stack属性上，具体实现还要看<code>proto.handle</code>的
        <code>next方法</code>
        <br />
        <br />
        {protoHandle}
        <br />
        <code>proto.handle</code>中遍历stack，并取出layer并执行，具体执行逻辑在<code>process_params</code>
        <br />
        <br />
        {processParams}
        其实就是按stack顺序执行，比如第一个栗子，此时setTimeout这种异步代码会跳过，不会执行next，同步代码执行完后再执行。当没有异步代码时，就是按正常的层层嵌套顺序走下去，所以输出了跟洋葱模型类似的结果
        <h2 id="express" className={classMap.articleTitle}>
          koa中间件
        </h2>
        <Alert type="info" message={INFO_KOA} />
        <h3 id="onion" className={classMap.articleSubTitle}>
          洋葱模型
        </h3>
        <img src={ONION} />
        一句话概括就是按中间件的顺序添加中间件形成嵌套的Promise,next函数就是下一个中间件，await需要等待内部promise执行，执行结果会呈现一个类似剥洋葱的模型。
        <br />
        <h3 id="koaSource" className={classMap.articleSubTitle}>
          源码解析
        </h3>
        <div className={classMap.assist}>lib\application.js</div>
        {koaUse}
        <ul>
          <li>
            1. 首先koa调用<code>use</code>将回调函数push到<code>middleware</code>数组
          </li>
          <li>
            2. 调用<code>listen</code>，启动httpServer的同时，调用<code>callback</code>
          </li>
          <li>3. callback调用<code>compose</code>执行中间件</li>
        </ul>
        {compose}
        在compose中，对<code>middleware</code>中间件数组进行递归调用，返回一个Promise链。
      </main>
      <Anchor className="anchor" getContainer={() => document.getElementById('content') as HTMLElement}>
        <Link href="express" title="express中间件">
          <Link href="expressSource" title="源码解析"></Link>
        </Link>
        <Link href="koa" title="koa中间件">
          <Link href="onion" title="洋葱模型"></Link>
          <Link href="koaSource" title="源码解析"></Link>
        </Link>
      </Anchor>
    </article>
  );
}
