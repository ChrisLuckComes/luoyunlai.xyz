import { classMap } from "@/constants/constant";
import { UseMarkDown } from "@/hooks/useMarkdown";
import { EXAMPLE, PRIVATE_ATTR } from "./_closure";

import NICK_YOUNG from "@images/js/NickYoung.webp";
import DEBUG from "@images/js/closureDebug.png";
import { LazyImage } from "@/component/image";
import { ArticleAnchor } from "@/component/Anchor";

export default function Index() {
  const example = <UseMarkDown markdown={EXAMPLE}></UseMarkDown>,
    privateAttr = <UseMarkDown markdown={PRIVATE_ATTR}></UseMarkDown>;
  return (
    <article id="rootArticle" className={classMap.article}>
      <main className={classMap.content}>
        <h2 id="closure" className="font-semibold text-h2 mb-2">
          10分钟内搞懂什么是闭包
        </h2>
        你是不是像我一样，经常被灵魂一问，什么是闭包？
        <LazyImage src={NICK_YOUNG}></LazyImage>
        答案先说一半，闭包是一个对象……
        <br />
        嘿嘿，废话文学皮一下，剩下的一半下文详细分析之后来补上。文中主要涉及
        <strong>执行上下文</strong>、<strong>作用域链</strong>等概念。
        <br />
        <h2 id="debug" className={classMap.articleTitle}>
          debug分析
        </h2>
        首先给出如下示例代码产生一个闭包，函数套函数就可以：
        {example}
        <br />在<code>log</code>出断点，local变量如下：
        <br />
        <br />
        <LazyImage src={DEBUG}></LazyImage>
        <br />
        看到<strong>Closure</strong>
        关键字了吧，它就是之前func函数活动对象的引用，相当于
        <code>[[Scopes]][0] = func[activationObject]</code>
        <br />
        为什么会给函数加上<code>[[Scopes]]</code>
        呢，这里就要讲到js函数的执行了。
        <h2 id="function" className={classMap.articleTitle}>
          执行上下文
        </h2>
        执行上下文(Execution
        Context)在JavaScript中是很重要的概念。变量或函数的上下文决定了它们可以访问哪些数据，每个上下文都有关联的变量对象(variable
        object)，上下文定义的所有变量和函数都在VO上，虽然代码无法访问，但是后台处理数据时会用到，这个在debug的时候就可以观察到。
        <br />
        <br />
        上下文在其所有代码都执行完毕后会被销毁，包括定义在它上面的所有变量和函数。
        <br />
        <br />
        每个函数都有自己的上下文。当代码执行流进入函数时，函数的上下文入栈，函数执行完后，上下文出栈。ECMAScript就是这样控制程序执行流的。
        <br />
        <br />
        <h3 id="scopeChain" className={classMap.articleSubTitle}>
          作用域链
        </h3>
        上下文代码执行时，会创建VO的一个<strong>作用域链</strong>{" "}
        ，也就是debug看到的<code>[[Scopes]]</code>
        。它决定了上下文代码在访问变量时的顺序，代码正在执行的的上下文的VO始终位于作用域链的最前端。如果上下文是函数，则活动对象(activation
        object)作为VO，活动对象最初只有一个变量<code>arguments</code>
        。下一个VO来自包含的上下文，下一个VO再来自下一个包含上下文，以此类推直到全局上下文。全局上下文始终是作用域链的最后一个VO。
        <br />
        <br />
        结合debug数据，作用域链可以理解为对象数组。代码执行时的标识符解析是通过作用域链逐级搜索标识符完成的。搜索过程始终从最前端开始，然后逐级往后，直到找到标识符，如果没有找到通常会报错。
        <h2 id="closureDiff" className={classMap.articleTitle}>
          闭包的不同之处
        </h2>
        在一个函数内部定义的函数会把其包含函数的AO加入到自己的作用域链中。因此，匿名函数包含
        <code>func(str)</code>
        的AO，也就是可以访问到<code>str</code>。<code>func()</code>
        返回匿名函数后，它的作用域链被初始化为
        <code>func()</code>的AO和全局VO，这样匿名函数就可以访问到
        <code>func()</code>可以访问的所有变量。
        func()的AO并不能在它执行完毕后销毁，因为匿名函数的作用域链还有对它的引用。
        <br />
        闭包的<strong>不同之处</strong>在于：在<code>func()</code>
        执行完毕后，它执行上下文的作用域链会销毁，但是它的AO仍然保留在内存中，直到匿名函数被销毁后才会被销毁，因为匿名函数的作用域链还有对AO的引用。
        <h2 id="use" className={classMap.articleTitle}>
          用途
        </h2>
        既然闭包可以保存父级的活动对象，那可以利用它实现私有属性，只对外暴露函数来读写该值，代码如下:
        {privateAttr}
        <h2 id="summary" className={classMap.articleTitle}>
          总结
        </h2>
        闭包是一个对象……的引用，这个对象就是父级的活动变量，函数执行时会创建作用域链，在作用域链里寻找标识符的时候就会找到闭包。
      </main>
      <ArticleAnchor
        items={[
          {
            key: "closure",
            title: "10分钟内搞懂什么是闭包",
            href: "#closure"
          },
          {
            key: "debug",
            title: "debug分析",
            href: "#debug"
          },
          {
            key: "function",
            title: "执行上下文",
            href: "#function",
            children: [
              {
                key: "scopeChain",
                title: "作用域链",
                href: "#scopeChain"
              }
            ]
          },
          {
            key: "closureDiff",
            title: "闭包的不同之处",
            href: "#closureDiff"
          },
          {
            key: "use",
            title: "用途",
            href: "#use"
          },
          {
            key: "summary",
            title: "总结",
            href: "#summary"
          }
        ]}
      ></ArticleAnchor>
    </article>
  );
}
