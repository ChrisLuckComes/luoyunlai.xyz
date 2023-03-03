import { classMap } from '@/constants/constant';
import { Anchor } from 'antd';
import { UseMarkDown } from '@/hooks/useMarkdown';

import NODE_MODEL from '@/images/node/nodeModel.png';
import LIBUV from '@/images/node/libuv.webp';
import BRAINLESS from '@/images/brainless.webp';
import FLOW from '@/images/node/flow.png';

import { EVENT_LOOP, TIMER } from './_node';
import { LazyImage } from '@/component/image';

const { Link } = Anchor;

export default function Index() {
  const eventLoop = <UseMarkDown markdown={EVENT_LOOP}></UseMarkDown>,
    timer = <UseMarkDown markdown={TIMER}></UseMarkDown>;

  return (
    <article id="rootActicle" className={classMap.article}>
      <main className={classMap.content}>
        <h2 id="diff" className={classMap.articleTitle}>
          Node.js
        </h2>
        什么是Node.js?官网一句话介绍：Node.js是一个开源，跨平台的JavaScript运行时环境。
        <div className={classMap.assist}>
          Node.js® is an open-source, cross-platform JavaScript runtime environment.
        </div>
        <br />
        Node.js基于V8引擎运行，脱离了浏览器，因此可以胜任任意类型的项目。Node.js
        app单进程运行，不需要对每一个请求都创建一个线程，原生提供了异步的I/O设置以防止js代码阻塞，所以Node.js可以单服务器承担大量的并发连接。
        <br />
        <strong>
          它最特别的优势就是前端同学们👨‍💻👩‍💻都熟js，不需要学习新语言就可以写服务端的代码。只需要几行代码就可以启动一个服务，如下
        </strong>
        <iframe
          src="https://codesandbox.io/embed/relaxed-shaw-5u3725?fontsize=14&hidenavigation=1&theme=dark"
          style={{
            width: '100%',
            height: '500px',
            border: 0,
            borderRadius: '4px',
            overflow: 'hidden',
            margin: '10px 0'
          }}
          title="relaxed-shaw-5u3725"
          allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
          sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
        ></iframe>
        <br />
        Node.js核心依赖项如下：
        <br />
        <strong>类库</strong>：
        <ul className={classMap.ul}>
          <li>
            <code>
              <a className={classMap.href} target="_blank" rel="noreferrer" href="https://v8.dev/docs/">
                V8
              </a>
            </code>
            ：V8为Node.js提供了JavaScript引擎，Node.js通过V8 C++的API函数接口进行操控。V8由谷歌维护，用于谷歌浏览器中。
          </li>
          <li>
            <code>
              <a className={classMap.href} target="_blank" rel="noreferrer" href="http://docs.libuv.org/">
                libuv
              </a>
            </code>
            ：它是C语言的类库，用于非阻塞型的I/O操作，同时在所有支持的操作系统上保持一致的接口。它提供了一些机制来处理文件系统、DNS、网络、子进程、管道、信号量控制、轮询机制和数据流。它也提供了一个线程池，用于无法在操作系统层面进行异步操作的任务卸载。
          </li>
          <li>
            <code>
              <a className={classMap.href} target="_blank" rel="noreferrer" href="https://github.com/nodejs/llhttp">
                llhttp
              </a>
            </code>
            ：由C编写，用于HTTP解析。
          </li>
          <li>
            <code>
              <a className={classMap.href} target="_blank" rel="noreferrer" href="https://c-ares.haxx.se/docs.html">
                c-ares
              </a>
            </code>
            ：异步DNS请求
          </li>
          <li>
            <code>
              <a className={classMap.href} target="_blank" rel="noreferrer" href="https://www.openssl.org/docs/">
                OpenSSL
              </a>
            </code>
            ：在<code>tls</code>和<code>crypto</code>模块中使用，它提供了密码函数。
          </li>
          <li>
            <code>
              <a className={classMap.href} target="_blank" rel="noreferrer" href="https://www.zlib.net/manual.html">
                zlib
              </a>
            </code>
            ：Node.js使用zlib创建同步、异步和数据流压缩、解压缩接口。
          </li>
        </ul>
        <strong>工具</strong>：
        <ul className={classMap.ul}>
          <li>
            <code>
              <a className={classMap.href} target="_blank" rel="noreferrer" href="https://docs.npmjs.com/">
                npm
              </a>
            </code>
            ：Node.js的包管理器。
          </li>
          <li>
            <code>
              <a
                className={classMap.href}
                target="_blank"
                rel="noreferrer"
                href="https://gyp.gsrc.io/docs/UserDocumentation.md"
              >
                gyp
              </a>
            </code>
            ：从V8拷贝而来，基于python的项目生成工具。它可以生成跨平台的项目文件。
          </li>
          <li>
            <code>
              <a
                className={classMap.href}
                target="_blank"
                rel="noreferrer"
                href="https://code.google.com/p/googletest/wiki/V1_7_Documentation"
              >
                gtest
              </a>
            </code>
            ：C/C++程序测试工具。
          </li>
        </ul>
        <br />
        那么这些技术是如何组合的呢？如下是node.js的架构图
        <LazyImage src={NODE_MODEL} />
        <ul className={classMap.ul}>
          <li>最上层是Node API，可以直接js调用</li>
          <li>
            中间<code>node bindings</code>，js通过它可以和C/C++通信
          </li>
          <li>最底层向node bindings提供api服务</li>
        </ul>
        <h2 id="bindings" className={classMap.articleTitle}>
          Node bindings
        </h2>
        C/C++有很多功能js是没有的，例如文件系统，http等，但js不能直接调用C++的库，所以需要一个中间人，Node
        bindings就是这个中间人。
        <br />
        Node.js是这样处理的：
        <ul className={classMap.ul}>
          <li>将库用C++封装，文件类型为xxx.cpp</li>
          <li>编译为.node文件</li>
          <li>
            js可以直接<code>require</code>这个<code>.node</code>文件
          </li>
        </ul>
        示例代码见
        <a
          className={classMap.href}
          target="_blank"
          rel="noreferrer"
          href="https://github.com/nodejs/node-addon-examples"
        >
          Node.js C++ addon examples 官方示例仓库
        </a>
        ，拉到本地从hello world开始看
        <br />
        <br />
        <LazyImage src={BRAINLESS} />
        <h2 id="v8" className={classMap.articleTitle}>
          V8
        </h2>
        <code>V8</code>是谷歌开源的高性能js引擎，用C++写的，功能如下
        <ul className={classMap.ul}>
          <li>编译并运行js代码</li>
          <li>管理内存</li>
          <li>垃圾收集</li>
          <li>实现ECMA标准中的类型、运算符、对象和函数</li>
        </ul>
        <h2 id="libuv" className={classMap.articleTitle}>
          libuv
        </h2>
        libuv是一个C库，它支持多平台的异步I/O操作，啥是I/O？
        <ul className={classMap.ul}>
          <li>文件</li>
          <li>网络</li>
          <li>线程池</li>
          <li>...更多，如下图</li>
        </ul>
        <LazyImage src={LIBUV} />
        <h2 id="workflow" className={classMap.articleTitle}>
          工作流程
        </h2>
        <LazyImage src={FLOW} />
        <br />
        以读取文件为例：
        <ul className={classMap.ul}>
          <li>
            <code>Application</code>就是代码，然后<code>V8运行代码</code>
          </li>
          <li>
            运行代码到需要读取文件，<code>libuv</code>开一个线程读文件
          </li>
          <li>
            读完文件后，操作系统返回事件给<code>event loop</code>，<code>event loop</code>把文件传回给<code>V8</code>
          </li>
        </ul>
        <h3 id="eventLoop" className={classMap.articleSubTitle}>
          事件循环(Event Loop)
        </h3>
        它是Node.js处理非阻塞I/O操作的机制，会把操作转移到系统内核中去。js是单线程没错，但是大多数系统内核都是多线程的，它们可以在后台处理多种操作，当一个操作完成的时候，内核通知Node.js将合适的回调函数添加到队列里等待时机执行。
        <br />
        <br />
        当Node.js启动后，它会初始化<code>Event Loop</code>
        ，处理已提供的输入脚本，它可能会调用一些异步的API、调度定时器，或者调用<code>process.nextTick</code>
        ，然后开始处理
        <code>Event Loop</code>，流程如下，它展示了操作顺序的简化概览：
        {eventLoop}
        <div className={classMap.assist}>每个框都是事件循环机制的一个阶段。</div>
        <br />
        每个阶段都有一个FIFO队列来执行回调。虽然每个阶段都是特殊的，但通常情况下，当事件循环进入给定的阶段时，它将执行特定于该阶段的任何操作，然后之心该阶段队列中的回调，直到队列用尽或已执行到最大的回调数。当执行完成后，事件循环将移动到下一阶段，以此类推。
        <br />
        <br />
        <h3 id="stage" className={classMap.articleSubTitle}>
          阶段概述
        </h3>
        <ul className={classMap.ul}>
          <li>
            <strong>timers(计时器)</strong>：本阶段执行已经被<code>setTimeout</code>和<code>setInterval</code>
            的调度回调函数。
            <br />
            <br />
            计时器可以指定阈值，而不是用户希望回调执行的确切时间。经过指定的时间间隔后，计时器回调将被尽可能早地运行，但是操作系统调度或其他正在运行的回调可能会延迟它们
            (由轮询阶段控制)。举个例子，设置了一个100ms的定时器，假设读取文件需要95ms：
            {timer}
            当事件循环进入poll阶段时，它由一个空队列（此时<code>fs.readFile</code>
            暂未完成），因此它将等待剩下的毫秒数，直到达到最快的一个计时器阈值为止。当它等待95ms后，
            <code>fs.readFile</code>
            完成，它的那个需要10毫秒才能完成的回调将被添加到轮询队列中并执行。当回调完成后，队列为空，此时事件循环机制发现计时器最快的阈值(100ms)已达到，将回到计时器阶段，执行计时器阶段。
          </li>
          <li>
            <strong>I/O callbacks(待定回调)</strong>：执行延迟到下一个循环迭代的I/O回调
            <br />
            <br />
            此阶段对某些系统操作（如TCP错误类型）执行回调。
          </li>
          <li>
            <strong>idle,prepare</strong>：仅系统内部使用
          </li>
          <li>
            <strong>poll(轮询)</strong>：检索新的I/O事件；执行与I/O相关的回调（除了关闭的回调函数、计时器和
            <code>setImmediate</code>调度的之外），其余情况node将在适当的时候在此阻塞。
            <br />
            <br />
            轮询阶段有两个重要的功能：
            <ul>
              <li>1. 计算应该阻塞和轮询I/O的时间</li>
              <li>2. 处理轮询队列里的时间</li>
            </ul>
            当时间循环进入轮询阶段且没有被调度的计时器时，将发生以下两种情况：
            <ul className={classMap.ul}>
              <li>
                如果轮询队列不是空的，事件循环将循环访问回调队列并同步执行它们，直到队列为空，或者达到系统硬性限制
              </li>
              <li>
                如果轮询队列是空的：
                <ul className={classMap.ul}>
                  <li>
                    如果脚本被<code>setImmediate</code>调度，则时间循环将结束轮询阶段，继续执行检查阶段
                  </li>
                  <li>否则等待回调被添加到队列中并立即执行</li>
                </ul>
              </li>
            </ul>
            一旦轮询队列为空，事件循环将检查已达到时间阈值的计时器。如果有计时器已准备就绪，则事件循环将绕回计时器阶段执行这些计时器的回调。
          </li>
          <li>
            <strong>check(检查)</strong>：<code>setImmediate</code>回调函数在这里执行
            <br />
            <br />
            此阶段允许在轮询阶段完成后立即执行回调。如果轮询阶段变为空闲状态，并且脚本使用<code>setImmediate</code>
            后被排列在队列中，则事件循环可能到检查阶段而不是等待。
            <br />
            <code>setImmediate</code>实际上是一个在事件循环的单独阶段运行的特殊计时器，它使用一个libuv
            API来安排回调在轮询阶段完成后执行。
            <br />
            通常在执行代码时，事件循环最终会进入轮询阶段。但是如果回调已使用<code>setImmediate</code>
            调度过，并且轮询阶段变为空闲状态，继续到检查阶段。
          </li>
          <li>
            <strong>close callbacks(关闭的回调函数)</strong>；一些关闭的回调函数，如
            <code>socket.on(&quot;close&quot;,...)</code>
            <br />
            <br />
            如果socket或处理函数突然关闭(例如socket.destroy),则<code>close</code>事件将在这个阶段发出，否则通过
            <code>process.nextTick</code>发出。
          </li>
        </ul>
      </main>

      <Anchor className="anchor" getContainer={() => document.getElementById('content') as HTMLElement}>
        <Link href="#intro" title="Node.js"></Link>
        <Link href="#bindings" title="Node bindings"></Link>
        <Link href="#v8" title="V8"></Link>
        <Link href="#libuv" title="libuv"></Link>
        <Link href="#workflow" title="工作流程">
          <Link href="#eventLoop" title="事件循环(Event Loop)"></Link>
          <Link href="#stage" title="阶段概述"></Link>
        </Link>
      </Anchor>
    </article>
  );
}
