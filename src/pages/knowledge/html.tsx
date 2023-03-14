import { classMap } from "@/constants/constant";
import { Anchor, Table } from "antd";
import { UseMarkDown } from "@/hooks/useMarkdown";
import { CODE, SCRIPT_TEXT_HTML, SVELTE, SVELTE_HTML } from "./_html";
const { Link } = Anchor;

export default function Index() {
  const columns = [
    { dataIndex: "name", key: "name", title: "" },
    { dataIndex: "good", key: "good", title: "优势" },
    { dataIndex: "bad", key: "bad", title: "劣势" }
  ];

  const dataSource = [
    {
      name: <strong>SSR</strong>,
      good: (
        <ul>
          <li>1. 返回的数据可以在源代码中看到，对SEO工具友好</li>
          <li>
            2. 在数据返回给浏览器之后可以更快的渲染视图内容，无需等待js的执行
          </li>
          <li>3. 非常适合变化少的静态页面，例如门户网站</li>
        </ul>
      ),
      bad: (
        <ul>
          <li>1. 每次提交数据都需要重新发送请求，触发页面更新</li>
          <li>
            2.
            虽然渲染页面快，但是服务端的计算需要耗时，这个在高并发场景下不会快
          </li>
          <li>3. 因为如上理由，不适合做数据频繁变化和高频交互的场景</li>
        </ul>
      )
    },
    {
      name: <strong>CSR</strong>,
      good: (
        <ul>
          <li>1. 适合强交互型应用</li>
          <li>2. 资源加载完成之后不需要再去刷新页面就可以更新视图</li>
          <li>3. 减小了服务器对模板的计算工作，降低单次访问工作量</li>
        </ul>
      ),
      bad: (
        <ul>
          <li>1. 源代码中无数据，内容过少，不利于SEO</li>
          <li>2. 初始存在白屏时间，需要优化</li>
          <li>3. 设计不好可能会造成单页面并发请求过多</li>
        </ul>
      )
    }
  ];

  const scriptTextHtml = (
      <UseMarkDown markdown={SCRIPT_TEXT_HTML}></UseMarkDown>
    ),
    svelte = <UseMarkDown markdown={SVELTE}></UseMarkDown>,
    svelteHtml = <UseMarkDown markdown={SVELTE_HTML}></UseMarkDown>,
    jsExp1 = <UseMarkDown markdown={CODE}></UseMarkDown>;

  return (
    <article id="root" className={classMap.article}>
      <main className={classMap.content}>
        <h2 id="html" className={classMap.articleTitle}>
          回顾三剑客html,css,javascript
        </h2>
        回顾三剑客，看看有哪些是被忽视了的知识。
        <h2 id="csrSSr" className={classMap.articleTitle}>
          CSR和SSR
        </h2>
        <h3 id="csr" className={classMap.articleSubTitle}>
          CSR(Client Side Rendering)
        </h3>
        目前流行的渲染方式。依赖的是运行在客户端的js，用户首次发送请求只能得到少部分作为基础结构的HTML代码，下次请求会包含更多HTML字符串的js文件，然后再执行js。
        <h3 id="ssr" className={classMap.articleSubTitle}>
          SSR(Server Side Rendering)
        </h3>
        传统的渲染方式。由服务端把渲染的完整的页面传输给客户端。这样减少了一次客户端到服务端的http请求，加快响应速度，一般用于首屏性能优化和SEO。
        <br />
        <strong>
          它们主要是数据拼接字符串的任务在服务端还是在客户端的区别
        </strong>
        <h3 id="diff" className={classMap.articleSubTitle}>
          两者不同点
        </h3>
        SSR渲染的优势在于首屏渲染速度快，因为不需要来回多次传输，但是服务端的性能在内的因素会影响用户体验，例如：网速，并发数，服务器的物理位置等。
        <br />
        <br />
        CSR则相反，因为多次和服务器交互导致首屏加载速度慢，但是请求完成之后，用户和页面之间的交互体验很好。
        <br />
        <br />
        <Table
          bordered
          columns={columns}
          dataSource={dataSource}
          pagination={false}
        ></Table>
        <h2 id="scriptType" className={classMap.articleTitle}>
          script
        </h2>
        <h3 id="text" className={classMap.articleSubTitle}>
          text/html
        </h3>
        node.js没有兴起之前，像layui这种库就将html写在script标签内做代码分割。
        {scriptTextHtml}
        <h3 id="module" className={classMap.articleSubTitle}>
          module
        </h3>
        这个type是具有里程碑意义的。ESM已被正式支持，它支持在html文件中使用ESM模块标准编程的js，通过该能力，esbuild/vite等新的脚手架逐渐问世，它们可以解决webpack存在的性能问题。
        <br />
        但是type=&quot;module&quot;写法上和真实ESM场景不同，在页面中使用必须使用文件路径进行模块加载，它无法找到HTML文件夹中的node_modules文件夹。
        <br />
        为了向下兼容，script还新增了nomodule类型，这样旧版本浏览器会忽略这个属性正常加载js。
        <h2 id="fragment" className={classMap.articleTitle}>
          DocumentFragment or 虚拟dom
        </h2>
        <code>DocumentFragment</code>
        对象可以将多个dom操作合并，它其实跟虚拟DOM的思路类似。表面上很多次的更新不如合成一次，但浏览器其实已有对应优化，
        <strong>reflow</strong>
        的步骤改为了异步处理，也就是说同步的DOM操作,layout到paint都会被优化成异步，这样实际上跟MVVM框架的异步更新思路类似。
        <br />
        所以出现了<strong>Svelte</strong>,<strong>solid.js</strong>
        这种无虚拟dom框架。因为虚拟dom实际上并没有什么性能优势，vue/react它们需要在运行时处理视图更新，例如diff等步骤是占用程序执行时间的。
        <br />
        <strong>Svelte</strong>
        将数据绑定和视图映射等操作放在compile层，提前给dom元素定义好更新，插入等dom操作方法，它们本质上就是DOM框架，这样可以节省实际编译后的代码体积来提升性能，把这些工作交给浏览器。
        如下是Svelte compile前后的的代码栗子：
        {svelteHtml}
        {svelte}
        <h2 id="webComponent" className={classMap.articleTitle}>
          WebComponents
        </h2>
        WebComponents是一套不同的技术，它允许创建可重用的定制元素。
        <ul className={classMap.ul}>
          <li>
            <strong>Custom elements</strong>: 自定义元素
          </li>
          <li>
            <strong>Shadow DOM</strong>:
            这种方式可以保持元素的功能私有，不会和文档其他部分冲突。在qiankun中就有使用，可以实现样式隔离。
          </li>
          <li>
            <strong>HTML templates</strong>: HTML模板，在vue中就有使用。
          </li>
        </ul>
        <h2 id="css" className={classMap.articleTitle}>
          CSS
        </h2>
        <h3 id="cssPre" className={classMap.articleSubTitle}>
          CSS预处理器
        </h3>
        现代前端工程基本都使用了CSS预处理器，它可以通过插件来强化原生CSS的不足之处。
        <ul className={classMap.ul}>
          <li>1. 定义变量、函数、选择器或循环结构等，利于封装和拓展</li>
          <li>2. 添加前缀</li>
          <li>3. 错误提示</li>
          <li>4. 支持css module，即使重名class也不会影响其他</li>
        </ul>
        预处理器种类较多，选择一个上手简单，大家都会的即可，使用最多的场景就是变量和嵌套结构。
        <h3 id="cssInJs" className={classMap.articleSubTitle}>
          css-in-js
        </h3>
        css-in-js就是在js中定义css样式，在react社区中用的最多，因为它加载的时候并没有视图元素，所以可以这样处理。
        <br />
        这种方式一直有争论，但是最后输出还是分开输出，所以选择适合自己的方式就可以。
        <h2 id="js" className={classMap.articleTitle}>
          JavaScript
        </h2>
        <h3 id="type" className={classMap.articleSubTitle}>
          类型
        </h3>
        JavaScript是动态类型的语言，它本身不具备静态类型的能力，这样编程上工作量小代码简洁，但是存在类型的弊端。如下代码：
        {jsExp1}
        由于没有类型约束，定义a时希望它是number类型，但是后续又被赋值改为string，那么再使用a++时就没法正常计算了。
        <br />
        <br />
        为了解决这种问题，Flow和TypeScript就这样诞生了。它们不是在runtime层面来进行类型约束，所以不是单独的编程语言，而是在compile阶段进行类型约束，真正落地的运行时还是JavaScript。
        相当于把解释型的js提升成了编译型语言，这样就可以做到先做类型约束，类型检查通过后，再转为js，且不影响运行。
        <h3 id="immutable" className={classMap.articleSubTitle}>
          不可变性
        </h3>
        基本类型的值是不可变的，意思就是当需要改变状态时，必须创建并追踪新的值而不是改变旧值。
        <br />
        <br />
        大家都知道，<code>const</code>
        用于定义一个常量，但是使用const定义一个引用类型时，它依然是可以修改的，所以const能做到的只有不能重新赋值，这似乎有点令人费解。
        <br />
        对于这种不可修改的需求，<code>Object.freeze</code>
        可以将对象所有属性标识为只读，但是只能对顶层生效。
        <br />
        <strong>Immutable.js</strong>
        是一个很好的实现了这种特性的库，从而避免自行拷贝对象。
        <h3 id="async" className={classMap.articleSubTitle}>
          异步编程
        </h3>
        <ul>
          <li>
            1. 单线程异步模型，虽然是异步，但是同一时间节点并不能做多个事情
          </li>
          <li>2. 同步任务永远先于异步任务</li>
          <li>3. 异步任务在队列中执行，存在阻塞</li>
          <li>
            4.
            异步任务分为宏任务和微任务，宏任务是全局的异步任务，由同一个队列进行编排。微任务是当前宏任务的子任务。
          </li>
          <li>5. 并发是同时发生，并行是同时运行。</li>
        </ul>
      </main>
      <Anchor
        className="anchor"
        getContainer={() => document.getElementById("content") as HTMLElement}
      >
        <Link href="#html" title="HTML">
          <Link href="#csrSSr" title="CSR和SSR">
            <Link href="#csr" title="CSR"></Link>
            <Link href="#ssr" title="SSR"></Link>
            <Link href="#diff" title="两者不同点"></Link>
          </Link>
          <Link href="#scriptType" title="script">
            <Link href="#text" title="text/html"></Link>
            <Link href="#module" title="module"></Link>
          </Link>
          <Link href="#fragment" title="DocumentFragment or 虚拟dom"></Link>
          <Link href="#webComponent" title="WebComponents"></Link>
        </Link>
        <Link href="#css" title="CSS">
          <Link href="#cssPre" title="css预处理器"></Link>
          <Link href="#cssInJs" title="css-in-js"></Link>
        </Link>
        <Link href="#js" title="JavaScript">
          <Link href="#type" title="类型"></Link>
          <Link href="#immutable" title="不可变性"></Link>
          <Link href="#async" title="异步编程"></Link>
        </Link>
      </Anchor>
    </article>
  );
}
