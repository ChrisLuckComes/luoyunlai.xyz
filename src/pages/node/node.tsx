import { classMap } from '@/constants/constant';
import { Anchor } from 'antd';
import { UseMarkDown } from '@/hooks/useMarkdown';

import NODE_DEPS from '@/images/node/nodeJs.png';
import NODE_MODEL from '@/images/node/nodeModel.png';
import LIBUV from '@/images/node/libuv.webp';
import BRAINLESS from '@/images/brainless.webp';
import { HELLO_NODE } from './_node';

const { Link } = Anchor;

export default function Index() {
  const helloNode = <UseMarkDown markdown={HELLO_NODE}></UseMarkDown>;

  return (
    <article id="root" className={classMap.article}>
      <h2 id="diff" className={classMap.articleTitle}>
        Node.js
      </h2>
      什么是Node.js?官网一句话介绍：Node.js是一个开源，跨平台的JavaScript运行时环境。
      <div className={classMap.assist}>Node.js® is an open-source, cross-platform JavaScript runtime environment.</div>
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
          margin:'10px 0'
        }}
        title="relaxed-shaw-5u3725"
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      ></iframe>
      <br />
      Node.js核心依赖项如下：
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
      <img src={NODE_MODEL} />
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
      <img src={BRAINLESS} />
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
      <img src={LIBUV} />
      <h2 id="workflow" className={classMap.articleTitle}>
        工作流程
      </h2>
      <Anchor className="anchor" getContainer={() => document.getElementById('content') as HTMLElement}>
        <Link href="intro" title="Node.js"></Link>
        <Link href="bindings" title="Node bindings"></Link>
        <Link href="v8" title="V8"></Link>
        <Link href="libuv" title="libuv"></Link>
        <Link href="workflow" title="工作流程"></Link>
      </Anchor>
    </article>
  );
}
