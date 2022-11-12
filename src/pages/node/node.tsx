import { classMap } from '@/constants/constant';
import { Anchor } from 'antd';
import { UseMarkDown } from '@/hooks/useMarkdown';

import NODE_DEPS from '@/images/node/nodeJs.png';
import NODE_MODEL from '@/images/node/nodeModel.jpeg';
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
      {helloNode}
      <img src={NODE_DEPS} width={1000} height={600} />
      <br />
      图中是nodejs所用到的依赖，可以看到一些很常见或者听说过的名称，例如<code>v8</code>等。核心依赖项如下：
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
