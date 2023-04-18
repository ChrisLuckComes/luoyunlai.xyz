import { classMap } from "@/constants/constant";
import { Anchor } from "antd";
import { UseMarkDown } from "@/hooks/useMarkdown";
import { LazyImage } from "@/component/image";
const { Link } = Anchor;

import HEAP_MEMORY from "@images/vue/heapMemory.png";
import { INIT_DATA } from "./_data";

export default function Index() {
  const initData = <UseMarkDown markdown={INIT_DATA}></UseMarkDown>;
  return (
    <article id="rootArticle" className={classMap.article}>
      <main className={classMap.content}>
        <h2 id="title" className={classMap.articleTitle}>
          为什么data必须是函数
        </h2>
        根本原因如下：
        <h2 id="heap" className={classMap.articleTitle}>
          根本原因：堆内存
        </h2>
        <LazyImage src={HEAP_MEMORY}></LazyImage>
        javaScript将对象放在堆内存中，对象的复制或者传递都只是它的引用，实际上还是指向同一个对象的内存地址。
        所以在vue中data如果是对象的话，在多次被复用的情况下，任意一个地方修改了属性会影响其他所有地方，那么vue是怎么处理的呢？
        <h2 id="closure" className={classMap.articleTitle}>
          函数执行
        </h2>
        <div className={classMap.assist}>src\core\instance\state.js</div>
        答案是使用函数，<code>data.call(vm, vm)</code>
        <br />
        <br />
        执行函数时两个重要的步骤就是确定变量对象和this。
        <br />
        this判断也不复杂，就那么几种情况
        <h3 id="diff" className={classMap.articleSubTitle}>
          this
        </h3>
        <ul className={classMap.ul}>
          <li>
            全局作用域：this就是宿主环境，在浏览器中是window，在node.js环境是global
          </li>
          <li>
            函数执行：
            <ul className={classMap.ul}>
              <li>
                xxx.call(xxxThis,xxx): 使用call和apply传入的第一个参数就是this
              </li>
              <li>xxx.func(...): 谁调用的就是this就是谁，此时就是xxx</li>
              <li>箭头函数：自身没有this，所在环境的this</li>
            </ul>
          </li>
        </ul>
        <br />
        vue就是使用<code>call</code>
        给每个组件当组件被复用时执行data函数时传入各自的this。 data函数内
        <code>return {`{...}`}</code>相当于
        <code>let xxx = {`{...}`}; return xxx;</code>
        ，xxx是单独的变量声明，会开辟独立的内存地址，也就实现了给每个组件单独维护一份data的目的
        {initData}
        <Anchor
          className="anchor"
          getContainer={() => document.getElementById("content") as HTMLElement}
        >
          <Link href="#heap" title="堆内存"></Link>
          <Link href="#func" title="函数执行">
            <Link href="#this" title="this"></Link>
          </Link>
        </Anchor>
      </main>
    </article>
  );
}
