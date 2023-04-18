import { classMap } from "@/constants/constant";
import { UseMarkDown } from "@/hooks/useMarkdown";

import EVENT_LOOP from "@images/knowledge/eventloop.webp";
import EVENT_LOOP1 from "@images/knowledge/eventloop2.webp";
import RESULT_IMG from "@images/knowledge/result.png";
import TIMER from "@images/knowledge/timer2.png";
import { LazyImage } from "@/component/image";
import { RESULT } from "./_eventLoop";
import { ArticleAnchor } from "@/component/Anchor";

export default function Index() {
  const result = <UseMarkDown markdown={RESULT}></UseMarkDown>;

  return (
    <article id="rootArticle" className={classMap.article}>
      <main className={classMap.content}>
        <h2 id="pre" className="font-semibold text-h2 mb-2">
          事件循环(Event Loop)
        </h2>
        网上看过很多文章写事件循环、主线程、任务、微任务，还是有些疑问没有解答，总是没有搞的特别清楚，本文将这些碎片知识收集并记录下来。
        <br />
        <h2 id="mainThread" className={classMap.articleTitle}>
          主线程
        </h2>
        主线程是浏览器执行JS，重绘，处理事件，完成其他任务的线地方。它也被称为JS引擎，集成到了浏览器中。
        <h2 id="eventloop" className={classMap.articleTitle}>
          Event Loop
        </h2>
        如下是事件循环的架构图。
        <LazyImage src={EVENT_LOOP} />
        <br />
        如图所示，事件循环是唯一可以让任务进入调用栈的方式。任务可能有两种类型：
        <ul className={classMap.ul}>
          <li>页面的主要的js代码执行</li>
          <li>渲染，微任务等</li>
        </ul>
        这些任务就按下图所示运转
        <LazyImage src={EVENT_LOOP1} />
        一旦执行了任意js，script任务就会进入Tasks队列。随着代码运行，会遇到不同来源的任务。在script
        task执行完后，<strong>事件循环</strong>开始执行
        <strong>微任务(Microtasks)</strong>，这个过程一直持续到任务都执行完成。
        <br />
        如果一个来源没有任务了，事件循环就会移动到下一个。相反的，如果某个来源的任务执行时间很长，其他的任务只能等着，如果无止境的执行，那么执行栈会溢出，浏览器报错。
        <h2 id="code" className={classMap.articleTitle}>
          例子
        </h2>
        来看看浏览器是怎么执行的，如下示例html代码：
        {result}
        首先执行同步代码，然后<code>example</code>函数添加一个<code>timer</code>
        ，timer会在下一个tasks队列执行，secondExample添加了一个微任务。然后这一轮的task执行完了，就执行微任务。最后执行timer
        <br />
        输出为 0 4 2 1
        <br />
        <br />
        <LazyImage src={RESULT_IMG} />
        <br />
        <br />
        那么问题来了，如果连续<code>setTimeout</code>
        会是怎样呢？如下图所示，它们会在分开在两次循环中执行。
        <LazyImage src={TIMER} />
        <h2 id="summary" className={classMap.articleTitle}>
          总结
        </h2>
        事件循环就是：task =&gt; Microtasks的循环
        <br />
        先执行同步代码，包括新增timer,然后执行所有的微任务。只不过timer会等本次微任务执行完成后下次循环再执行，而且timer和timer之间会在不同的循环中执行。
      </main>
      <ArticleAnchor
        items={[
          {
            title: "事件循环(Event Loop)",
            key: "pre",
            href: "#pre"
          },
          {
            title: "主线程",
            key: "mainThread",
            href: "#mainThread"
          },
          {
            title: "Event Loop",
            key: "eventloop",
            href: "#eventloop"
          },
          {
            title: "例子",
            key: "code",
            href: "#code"
          },
          {
            title: "总结",
            key: "summary",
            href: "#summary"
          }
        ]}
      ></ArticleAnchor>
    </article>
  );
}
