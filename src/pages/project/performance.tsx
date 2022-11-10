import { classMap } from '@/constants/constant';
import { Anchor } from 'antd';
import { UseMarkDown } from '@/hooks/useMarkdown';

import IMAGE_MAP from '@/images/project/indexMap.png';
import { FP_FCP, TIMING } from './_performance';
import { useEffect, useState } from 'react';

const { Link } = Anchor;

export default function Index() {
  const timing = <UseMarkDown markdown={TIMING}></UseMarkDown>;

  const fpFcp = <UseMarkDown markdown={FP_FCP}></UseMarkDown>;

  const [fp, setFp] = useState(''),
    [fcp, setFcp] = useState('');

  useEffect(() => {
    let _fp = performance.getEntriesByName('first-paint'), // 获取 FP 时间
      _fcp = performance.getEntriesByName('first-contentful-paint'); // 获取 FCP 时间
    setFp(JSON.stringify(_fp[0]));
    setFcp(JSON.stringify(_fcp[0]));
  }, []);

  return (
    <article id="root" className={classMap.article}>
      <div className={classMap.articleTitle}>虚空性能优化？从指标开始</div>
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
      <img src={IMAGE_MAP} />
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
      ，旧API返回的都是时间戳，而新API返回的是相对时间，可以直接用来分析，很方便。
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
          ，<code>lighthouse</code>六大指标之一，表示首次绘制任何文本、图像、非空白<code>canvas</code>或<code>SVG</code>
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
        页面何时渲染主要内容 - FMP & SI & LCP
      </h3>
      衡量页面何时渲染主要内容，有三个指标：<code>FMP</code>、<code>SI</code>、<code>LCP</code>:
      <br />
      <br />
      <ul className={classMap.ul}>
        <code>
          <a className={classMap.href} target="_blank" rel="noreferrer" href="https://web.dev/first-meaningful-paint/">
            FMP(first meaningful paint)
          </a>
        </code>
        ，首次完成有意义内容绘制的时间点，值越小越好
      </ul>
      <Anchor className="anchor" getContainer={() => document.getElementById('content') as HTMLElement}>
        <Link href="#header" title="前言"></Link>
        <Link href="#indexMap" title="常见的性能优化指标及获取方式">
          <Link href="#fp" title="页面何时开始渲染 - FP & FCP"></Link>
          <Link href="#fmp" title="页面何时渲染主要内容 - FMP & SI & LCP"></Link>
        </Link>
      </Anchor>
    </article>
  );
}
