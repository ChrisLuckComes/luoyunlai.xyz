import { classMap } from "@/constants/constant";
import { UseMarkDown } from "@/hooks/useMarkdown";
import { PROMISE_STATUS, PROMISE_STRUCT, PROMISE_THEN } from "./_promise";
import { ArticleAnchor } from "@/component/Anchor";

export default function Index() {
  const promiseStatus = <UseMarkDown markdown={PROMISE_STATUS}></UseMarkDown>,
    promiseThen = <UseMarkDown markdown={PROMISE_THEN}></UseMarkDown>,
    promiseStruct = <UseMarkDown markdown={PROMISE_STRUCT}></UseMarkDown>;

  return (
    <article id="rootArticle" className={classMap.article}>
      <main className={classMap.content}>
        <h2 id="promise" className="font-semibold text-h2 mb-2">
          Promise
        </h2>
        Promise代表一个未完成的操作，它能够简化异步的操作，增强代码可读性，promise最主要的交互方式就是我们熟悉的
        <code>then</code>方法。本文会按照
        <a
          className={classMap.href}
          target="_blank"
          rel="noreferrer"
          href="https://promisesaplus.com/"
        >
          Promises/A+规范
        </a>
        来一步步实现它。
        <br />
        <h2 id="status" className={classMap.articleTitle}>
          Promise状态
        </h2>
        <h3 id="standard1" className={classMap.articleSubTitle}>
          规范
        </h3>
        promise必须是以下三种状态之一：<code>pending</code>,
        <code>fulfilled</code>,<code>rejected</code>
        <ul>
          <li>1. pending: promise可以变成fulfilled或者rejected</li>
          <li>2. fulfilled: promise不能再变成其他状态，必须有一个不可变的值</li>
          <li>
            3. rejected: promise不能再变成其他状态，必须有一个不可变的理由
          </li>
        </ul>
        <h3 id="code1" className={classMap.articleSubTitle}>
          实现
        </h3>
        所以先给我们的类加上status属性，在构造函数内给status默认设为pending状态
        {promiseStatus}
        <h2 id="then" className={classMap.articleTitle}>
          then
        </h2>
        <h3 id="standard2" className={classMap.articleSubTitle}>
          规范
        </h3>
        promise必须提供<code>then</code>
        方法来访问它当前或最终的值或者失败理由，所以需要给Promise类加上value和reason属性来保存值，提供then方法来访问。
        <br />
        <code>then</code>方法接收两个参数:
        <br />
        <br />
        <code>promise.then(onFulfilled, onRejected)</code>
        <br />
        <br />
        onFulfilled, onRejected都是可选参数，如果它们不是函数，那就必须被忽略。
        <ul className={classMap.ul}>
          <li>
            如果onFulfilled是函数：在promise变为fulfilled状态之后，onFulfilled才能执行，
            <code>value</code>
            作为第一个参数，并且只能调用一次。
          </li>
          <li>
            如果onRejected是函数：在promise变为rejected状态之后，onRejected才能执行，
            <code>reason</code>
            作为第一个参数，并且只能调用一次。
          </li>
        </ul>
        onFulfilled和onRejected不能在当前执行上下文调用。
        <br />
        <br />
        onFulfilled和onRejected必须以函数的方式调用(不要涉及到this，在严格模式下this是undefined,松散模式下是global)
        <br />
        <br />
        <code>then</code>
        可能在同一个promise中被调用多次，当promise状态变为fulfilled/rejected之后，onFulfilled/onRejected回调函数分别按then开始调用的顺序执行
        <br />
        <br />
        <code>then</code>必须返回promise
        <br />
        <code>promise2 = promise1.then(onFulfilled,onRejected)</code>
        <ul>
          <li>
            1. 如果onFulfilled或者onRejected返回了一个值<code>x</code>
            ，执行Promise消除程序
            <code>[[Resolve]](promise2, x)</code>
          </li>
          <li>
            2.
            如果onFulfilled或者onRejected抛出了异常，promise2必须被rejected，reason就是e
          </li>
          <li>
            3.
            如果onFulfilled不是函数且promise1已经是fulfilled状态了,promise2也必须变为fulfilled，且value和promise1一样
          </li>
          <li>
            4.
            如果onRejected不是函数且promise1已经rejected了，promise2也必须变为rejected，且reason和promise1一样
          </li>
        </ul>
        <h3 id="code2" className={classMap.articleSubTitle}>
          实现
        </h3>
        通过上述规范，需要给MyPromise新增value,reason属性，then()方法。
        <br />
        then()方法传入onFulfilled,onRejected参数，并且判断它们是否是函数，如果不是则赋值为函数。
        <br />
        then函数必须返回promise2，所以声明promise2变量，然后根据不同的状态进行处理，最后返回promise2.
        <br />
        {promiseThen}
        <h2 id="promiseResolutionProcedure" className={classMap.articleTitle}>
          Promise解决程序(Promise Resolution Procedure)
        </h2>
        可以看到then方法执行了onFullfiled或者onRejected获得返回值之后就没有继续了，此处缺少了promise解决程序。这一部分我们根据规范将它补上，整个Promise实现就完成了。
        <h3 id="standard3" className={classMap.articleSubTitle}>
          规范
        </h3>
        Promise解决程序接收promise和value作为参数，标记为
        <code>[[resolve]](promise,x)</code>
        。如果x有then属性，它会尝试让promise接收x的状态，假设x跟promise行为一样。否则就将promise变为fulfilled状态，value就是x。
        <br />
        <br />
        这种处理方式支持链式调用，步骤如下：
        <ul>
          <li>1. 如果promise和x指向同一个对象，那么reject promise。</li>
          <li>
            2. 如果x是promise，接收它的状态。
            <ul className="pl-60">
              <li>
                2.1.
                如果x是pending状态，promise必须保持pending直到变为fulfilled或者rejected
              </li>
              <li>2.2. 如果x是fulfilled状态，将promise变为相同的状态和value</li>
              <li>2.3. 如果x是rejected状态，将promise变为相同的状态和reason</li>
            </ul>
          </li>
          <li>
            3. 如果x是对象或者函数
            <ul className="pl-60">
              <li>3.1. then设为x.then</li>
              <li>3.2. 如果获取x.then报错，该异常作为reason，reject promise</li>
              <li>
                3.3.
                如果then是函数，用x作为this来调用它，第一个参数是resolvePromise,第二个参数是rejectPromise，具体如下：
                <ul className="pl-60">
                  <li>
                    3.3.1. 如果resolvePromise被调用了，值为y，执行
                    <code>[[resolve]](promise,y)</code>
                  </li>
                  <li>
                    3.3.2 如果rejectPromise被调用了，reason为r，执行
                    <code>reject(r)</code>
                  </li>
                  <li>
                    3.3.3
                    如果两个都被调用了，或者多次用相同的参数调用。第一次调用优先，后续的忽略。
                  </li>
                  <li>
                    3.3.4
                    如果调用then时抛出异常e，判断resolvePromise或者rejectPromise是否已执行，如果执行了就忽略，否则
                    <code>reject(e)</code>
                  </li>
                </ul>
              </li>
              <li>3.4 如果then不是函数，promise状态设为fulfill,值为x</li>
            </ul>
          </li>
          <li>4. 如果x不是对象也不是函数，promise状态设为fulfill,值为x</li>
        </ul>
        <h3 id="code3" className={classMap.articleSubTitle}>
          实现
        </h3>
        所以这里需要定义一个函数来解决promise，并且在then函数中调用该解决函数，按照规范得出完整代码如下。
        {promiseStruct}
      </main>
      <ArticleAnchor
        items={[
          {
            title: "Promise",
            key: "promise",
            href: "#promise"
          },
          {
            title: "Promise状态",
            key: "status",
            href: "#status",
            children: [
              {
                title: "规范",
                key: "standard1",
                href: "#standard1"
              },
              {
                title: "实现",
                key: "code1",
                href: "#code1"
              }
            ]
          },
          {
            title: "then",
            href: "#then",
            key: "then",
            children: [
              {
                title: "规范",
                href: "#standard2",
                key: "standard2"
              },
              {
                title: "实现",
                href: "#code2",
                key: "code2"
              }
            ]
          },
          {
            title: "Promise解决程序",
            key: "promiseResolutionProcedure",
            href: "#promiseResolutionProcedure",
            children: [
              {
                title: "规范",
                href: "#standard3",
                key: "standard3"
              },
              {
                title: "实现",
                href: "#code3",
                key: "code3"
              }
            ]
          }
        ]}
      />
    </article>
  );
}
