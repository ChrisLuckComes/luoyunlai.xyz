import { classMap } from '@/constants/constant';
import { Anchor } from 'antd';
import { UseMarkDown } from '@/hooks/useMarkdown';
import IMAGE_MAP from '@/images/project/indexMap.png';
import LIGHTHOUSE from '@/images/project/lighthouse.png';
import SENTRY from '@/images/project/sentry.png';
import LCP_SVG from '@/images/project/lcp.svg';
import FID_SVG from '@/images/project/fid.svg';
import CLS_SVG from '@/images/project/cls.svg';
import { CLS_CODE, FID, FP_FCP, LCP, LONG_TASK, TIMING, SENTRY_INIT } from './_performance';
import { useEffect, useState } from 'react';
import { LazyImage } from '@/component/image';

const { Link } = Anchor;

export default function Index() {
  const timing = <UseMarkDown markdown={TIMING}></UseMarkDown>,
    fpFcp = <UseMarkDown markdown={FP_FCP}></UseMarkDown>,
    lcpCode = <UseMarkDown markdown={LCP}></UseMarkDown>,
    fidCode = <UseMarkDown markdown={FID}></UseMarkDown>,
    longTaskCode = <UseMarkDown markdown={LONG_TASK}></UseMarkDown>,
    clsCode = <UseMarkDown markdown={CLS_CODE}></UseMarkDown>,
    sentryInit = <UseMarkDown markdown={SENTRY_INIT}></UseMarkDown>;

  const [fp, setFp] = useState(''),
    [fcp, setFcp] = useState(''),
    [lcp, setLcp] = useState(''),
    [fid, setFid] = useState(''),
    [longTask, setLongTask] = useState<PerformanceEntry[]>([]),
    [cls, setCls] = useState<PerformanceEntry[]>([]);

  useEffect(() => {
    let _fp = performance.getEntriesByName('first-paint'), // 获取 FP 时间
      _fcp = performance.getEntriesByName('first-contentful-paint'); // 获取 FCP 时间

    setFp(JSON.stringify(_fp[0]));
    setFcp(JSON.stringify(_fcp[0]));

    new PerformanceObserver(entryList => {
      for (const entry of entryList.getEntries()) {
        setLcp(JSON.stringify(entry));
      }
    }).observe({ type: 'largest-contentful-paint', buffered: true });

    new PerformanceObserver(entryList => {
      for (const entry of entryList.getEntries()) {
        setFid(JSON.stringify(entry));
      }
    }).observe({ type: 'first-input', buffered: true });

    new PerformanceObserver(function (list) {
      let perfEntries = list.getEntries();
      setLongTask(perfEntries);
    }).observe({ type: 'longtask' });

    new PerformanceObserver(function (list) {
      let perfEntries = list.getEntries();
      setCls(perfEntries);
    }).observe({ type: 'layout-shift' });
  }, []);

  return (
    <article id="root" className={classMap.article}>
      <main className={classMap.content}>
        <div className={classMap.articleTitle}>连指标都不知道还敢说懂性能优化？</div>
        <h2 id="header" className={classMap.articleTitle}>
          前言
        </h2>
        web性能通常分为两方面：
        <ul className={classMap.ul}>
          <li>首屏性能</li>
          <li>交互性能</li>
        </ul>
        首先需要分析并定位问题，然后针对性的优化。
        <br />
        常见手段是打开谷歌浏览器F12，使用<code>performance</code>、<code>network</code>、<code>lighthouse</code>
        面板，对页面加载过程进行分析。
        {/* <br />
      <br />
      它确实适合开发者自己定位性能问题，但是实际使用的用户访问的设备/网络环境等各种因素不一样，很有可能无法达到预期。这种情况下要排查问题，除非能以用户的使用环境本地复现。
      <br />
      <br />
      所以需要一种监控工具 */}
        <h2 id="indexMap" className={classMap.articleTitle}>
          常见的性能优化指标及获取方式
        </h2>
        页面加载过程模型图如下：
        <LazyImage src={IMAGE_MAP} />
        <br />
        这个模型是
        <a className={classMap.href} target="_blank" rel="noreferrer" href="https://www.w3.org/webperf/">
          w3c
        </a>
        制定的，定义了从上一个页面结束到下一个页面加载完成的过程。基于这个模型可以获取到页面加载过程中各个阶段的耗时情况，分析页面性能。
        <br />
        <br />
        可以通过<code>window.performance.timing</code>获取加载过程模型中的各阶段耗时数据
        {timing}
        后来该属性被标记为废弃，改用<code>window.performance.getEntriesByType(&quot;navigation&quot;)</code>
        ，旧API返回的都是时间戳，而新API返回的是相对时间，可以直接用来分析，很方便。不过实际开发之中更推荐使用谷歌官方的js库
        <a
          className={classMap.href}
          target="_blank"
          rel="noreferrer"
          href="https://github.com/GoogleChrome/web-vitals#api"
        >
          web-vitals
        </a>
        来获取指标，避免再去处理各种特殊情况。
        <h3 id="fp" className={classMap.articleSubTitle}>
          页面何时开始渲染 - FP & FCP
        </h3>
        衡量页面何时开始渲染，有两个指标：<code>FP</code>和<code>FCP</code>
        <ul className={classMap.ul}>
          <li>
            <code>FP(first paint)</code>，表示页面开始首次绘制的时间点，值越小越好。在<code>FP</code>
            之前，用户看到的是导航之前的页面。
          </li>
          <li>
            <code>
              <a className={classMap.href} target="_blank" rel="noreferrer" href="https://web.dev/fcp/">
                FCP(first content paint)
              </a>
            </code>
            ，<code>lighthouse</code>六大指标之一，表示首次绘制任何文本、图像、非空白<code>canvas</code>或
            <code>SVG</code>
            的时间点，值越小越好。
          </li>
        </ul>
        这两个指标，可以通过<code>performance.getEntry</code>、<code>performance.getEntriesByName</code>、
        <code>performanceObserver</code>来获取。
        <br />
        <br />
        {fpFcp}
        <strong>FP:</strong>
        <div className={classMap.markdown}>{fp}</div>
        <strong>FCP:</strong>
        <div className={classMap.markdown}>{fcp}</div>
        <br />
        <h3 id="fmp" className={classMap.articleSubTitle}>
          页面何时渲染主要内容 - LCP
        </h3>
        <br />
        <ul className={classMap.ul}>
          <code>
            <a className={classMap.href} target="_blank" rel="noreferrer" href="https://web.dev/lcp/">
              LCP(largest contentful paint)
            </a>
          </code>
          ，最大元素的绘制时间点，值越小越好
        </ul>
        <embed src={LCP_SVG} type="image/svg+xml" />
        {lcpCode}
        <strong>LCP:</strong>
        <div className={classMap.markdown}>{lcp}</div>
        <h3 id="fmp" className={classMap.articleSubTitle}>
          何时可以交互 - TTI & TBT
        </h3>
        <ul className={classMap.ul}>
          <li>
            <code>
              <a className={classMap.href} target="_blank" rel="noreferrer" href="https://web.dev/i18n/zh/tti/">
                TTI(time to interactive)
              </a>
            </code>
            ，可交互时间，<code>lighthouse</code>
            面板指标之一，用于测量页面开始加载到主要资源完成渲染，并能够快速、可靠响应用户输入所需的时间，值越小越好。
            <br />
            官方没有提供接口获取，而是给出了计算公式，并且不建议手动测量该指标，而是建议获取<code>FID</code>
            ，具体点击上面的链接查看。
          </li>
          <li>
            <code>
              <a
                className={classMap.href}
                target="_blank"
                rel="noreferrer"
                href="https://web.dev/lighthouse-total-blocking-time/"
              >
                TBT(total blocking time)
              </a>
            </code>
            ，总的阻塞时间，<code>lighthouse</code>六大指标之一，用于测量<code>FCP</code>到<code>TTI</code>
            之间的总阻塞时间，值越小越好。
            <br />
            同样是需要手动计算的时间，在计算<code>TTI</code>遍历收集<code>longTask</code>的同时，计算阻塞时间的总和。
          </li>
        </ul>
        <h3 id="fid" className={classMap.articleSubTitle}>
          交互是否有延迟 - FID & Long Task
        </h3>
        衡量交互是否有延迟有2个指标：<code>FID</code>、<code>Long Task</code>。其中<code>FID</code>
        用来衡量用户首次交互延迟的情况，<code>Long Task</code>用于衡量用户在使用应用的过程中遇到的延迟、阻塞情况。
        <ul className={classMap.ul}>
          <li>
            <code>
              <a className={classMap.href} target="_blank" rel="noreferrer" href="https://web.dev/fid/">
                FID(first input delay)
              </a>
            </code>
            ，首次输入延迟，测量用户第一次与页面交互（点击事件等）直到浏览器做出响应，并实际能够开始处理事件所经过的事件。
            <embed src={FID_SVG} type="image/svg+xml" />
            {fidCode}
            <strong>FID：</strong>
            <div className={classMap.markdown}>{fid}</div>
          </li>
          <li>
            <code>Long Task</code>，这个指标可以告诉我们哪些任务执行耗费了50ms以上的时间。
            {longTaskCode}
            <strong>Long Task：</strong>
            <div className={classMap.markdown}>
              {longTask.map(task => (
                <div key={task.name}>{JSON.stringify(task)}</div>
              ))}
            </div>
          </li>
        </ul>
        <h3 id="cls" className={classMap.articleSubTitle}>
          页面视觉是否稳定 - CLS
        </h3>
        <code>
          <a className={classMap.href} target="_blank" rel="noreferrer" href="https://web.dev/cls/">
            CLS
          </a>
        </code>
        ，累积布局偏移，测量整个页面生命周期内发生的所有意外布局偏移中最大一连串的布局偏移值。
        <embed src={CLS_SVG} type="image/svg+xml" />
        {clsCode}
        <strong>CLS:</strong>
        <div className={classMap.markdown}>
          {cls.map(task => (
            <div key={task.name}>{JSON.stringify(task)}</div>
          ))}
        </div>
        <h3 id="key" className={classMap.articleSubTitle}>
          性能分析关键指标
        </h3>
        如果使用<code>lighthouse</code>进行分析，会使用6个指标。以下是我的网站分数
        <LazyImage src={LIGHTHOUSE} />
        <br />
        如果用
        <code>
          <a className={classMap.href} target="_blank" rel="noreferrer" href="http://sentry.io/">
            Sentry
          </a>
        </code>
        等工具进行分析，会使用4个指标
        <LazyImage src={SENTRY} />
        <h2 id="sentry" className={classMap.articleTitle}>
          使用Sentry做性能监控
        </h2>
        <h3 id="install" className={classMap.articleSubTitle}>
          安装
        </h3>
        <div className={classMap.markdown}>pnpm add @sentry/react @sentry/tracing</div>
        {sentryInit}
        其中<code>dsn</code>需要在sentry新增project之后才能获取到，<code>tracesSampleRate</code>
        决定了上报的频率，配置为0则不上报。
        <h3 id="how" className={classMap.articleSubTitle}>
          原理
        </h3>
        原理就是如前文所述，通过<code>window.performance.getEntries</code>和<code>performanceObserver</code>
        获取指标数据，然后通过接口上报。看板通过可视化图表的方式展示性能指标数据供分析
      </main>

      <Anchor className="anchor" getContainer={() => document.getElementById('content') as HTMLElement}>
        <Link href="#header" title="前言"></Link>
        <Link href="#indexMap" title="常见的性能优化指标及获取方式">
          <Link href="#fp" title="页面何时开始渲染 - FP & FCP"></Link>
          <Link href="#fmp" title="页面何时渲染主要内容 - LCP"></Link>
          <Link href="#tti" title="何时可以交互 - TTI & TBT"></Link>
          <Link href="#cls" title="页面视觉是否稳定 - CLS"></Link>
          <Link href="#key" title="性能分析关键指标"></Link>
        </Link>
        <Link href="#sentry" title="使用Sentry做性能监控">
          <Link href="#install" title="配置"></Link>
          <Link href="#how" title="原理"></Link>
        </Link>
      </Anchor>
    </article>
  );
}
