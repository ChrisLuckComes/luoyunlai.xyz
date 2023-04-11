import { classMap } from "@/constants/constant";
import { Anchor } from "antd";
import { UseMarkDown } from "@/hooks/useMarkdown";
import {
  ASYNC_OUTPUT,
  EXAMPLE,
  MAKE_INVOKE_METHOD,
  MARK,
  WRAP,
  GENERATOR_AWAIT,
  ASYNC,
  AWRAP,
  INVOKE
} from "./_asyncAwait";
const { Link } = Anchor;

export default function Index() {
  const example = <UseMarkDown markdown={EXAMPLE}></UseMarkDown>,
    output = <UseMarkDown markdown={ASYNC_OUTPUT}></UseMarkDown>,
    mark = <UseMarkDown markdown={MARK}></UseMarkDown>,
    wrap = <UseMarkDown markdown={WRAP}></UseMarkDown>,
    makeInvokeMethod = (
      <UseMarkDown markdown={MAKE_INVOKE_METHOD}></UseMarkDown>
    ),
    generator = <UseMarkDown markdown={GENERATOR_AWAIT}></UseMarkDown>,
    _async = <UseMarkDown markdown={ASYNC}></UseMarkDown>,
    awrap = <UseMarkDown markdown={AWRAP}></UseMarkDown>,
    invoke = <UseMarkDown markdown={INVOKE}></UseMarkDown>;

  return (
    <article id="rootActicle" className={classMap.article}>
      <main className={classMap.content}>
        <h2 id="pre" className={classMap.articleTitle}>
          async await
        </h2>
        async函数是使用<code>async</code>关键字的函数，是
        <code>AysncFunction</code>的实例，并且其中允许使用
        <code>await</code>
        关键字。它们提供了一种更简洁的基于<code>Promise</code>
        的代码编写方式，可以把链式调用改为同步写法。
        <h2 id="webpack" className={classMap.articleTitle}>
          打包分析
        </h2>
        那么它是如何实现的呢？此处我们依然是借助webpack+babel打包，通过输出后的代码分析，准备源码如下：
        {example}
        输出：
        {output}
        <br />
        可以看到代码添加了<code>asyncGeneratorStep</code>,
        <code>_asyncToGenerator</code>辅助函数。
        <br />
        执行过程中调用<code>_asyncToGenerator</code>
        ，将函数a转换为执行函数_a,内部是一个用Promise包装的无限循环，当函数完成或抛出异常时结束循环。
        <br />
        接下来看一下<code>regeneratorRuntime</code>的<code>mark,wrap</code>
        函数都干了什么。
        <h3 id="diff" className={classMap.articleSubTitle}>
          regeneratorRuntime
        </h3>
        如果直接用输出的代码起个服务，就会看到控制台报错：
        <code>regeneratorRuntime is not defined</code>。使用async
        await语法时，如果要在不支持的targets上使用，需要引入
        <code>@babel/plugin-transform-runtime</code>获取完整支持。
        <br />
        由于整个runtime代码行数过多，下文只讨论涉及到的内容
        <h3 id="mark" className={classMap.articleSubTitle}>
          mark
        </h3>
        <code>mark</code>方法将传入的fn的原型设为
        <code>GeneratorFunctionPrototype</code>，也就是将函数转为迭代器函数。
        {mark}
        <h3 id="wrap" className={classMap.articleSubTitle}>
          wrap
        </h3>
        主要是调用了<code>makeInvokeMethod</code>
        {wrap}
        函数首先设置state为<code>GenStateSuspendedStart</code>
        ，并调用<code>makeInvokeMethod</code>
        设置了invoke函数用于执行innerFn
        <br />
        <h3 id="makeInvokeMethod" className={classMap.articleSubTitle}>
          makeInvokeMethod
        </h3>
        内部主要通过<code>tryCatch</code>来执行
        <code>innerFn</code>，也就是wrap包裹的函数。
        {makeInvokeMethod}
        分析调用流程：
        <br />
        <ul className={classMap.ul}>
          <li>首先函数被转换为上面的代码</li>
          <li>
            <ul>
              <li>
                1. 通过<code>await</code>分割生成器函数代码生成
                <code>_callee$</code>函数
              </li>
              <li>2. context对象用于储存函数执行上下文，包括各种属性和方法</li>
              <li>
                3. invoke()定义next()，用于执行<code>_callee$</code>跳到下一步
              </li>
            </ul>
          </li>
          <li>
            调用next，进入switch语句，根据context的标识执行对应的case块，return对应结果。
          </li>
          <li>
            运行到结尾，switch匹配不到返回空值，next的返回值为
            <code>{`{value:undefined,done:true}`}</code>
          </li>
        </ul>
        <h2 id="generator" className={classMap.articleTitle}>
          自行实现
        </h2>
        可以发现把函数名换成async函数，把yield替换成await就实现了异步代码同步写法了。
        {generator}
        <h2 id="summary" className={classMap.articleTitle}>
          总结
        </h2>
        所以Async
        await也被称为是语法糖，增加了新的关键字。它们是在generator基础上实现。
        <h3 id="async" className={classMap.articleSubTitle}>
          async
        </h3>
        <code>async</code>关键字用于包裹函数，然后调用
        <code>next</code>方法。
        {_async}
        <h3 id="await" className={classMap.articleSubTitle}>
          await
        </h3>
        await就是<code>yield</code>，实际上调用了
        <code>regeneratorRuntime.awrap(x)</code>加上了<code>__await</code>
        属性用于标识状态
        {awrap}
        <h3 id="invoke" className={classMap.articleSubTitle}>
          AsyncIterator
        </h3>
        AsyncIterator部分完整代码:
        {invoke}
      </main>
      <Anchor
        className="anchor"
        getContainer={() => document.getElementById("content") as HTMLElement}
      >
        <Link href="#pre" title="async await"></Link>
        <Link href="#webpack" title="打包分析">
          <Link href="#regeneratorRuntime" title="regeneratorRuntime">
            <Link href="#mark" title="mark"></Link>
            <Link href="#makeInvokeMethod" title="makeInvokeMethod"></Link>
          </Link>
        </Link>
        <Link href="#generator" title="自行实现"></Link>
        <Link href="#summary" title="总结">
          <Link href="#async" title="async"></Link>
          <Link href="#await" title="await"></Link>
          <Link href="#invoke" title="AsyncIterator"></Link>
        </Link>
      </Anchor>
    </article>
  );
}
