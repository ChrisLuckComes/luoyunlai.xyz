import { classMap } from '@/constants/constant';
import { Anchor } from 'antd';
import { UseMarkDown } from '@/hooks/useMarkdown';

import IMAGE_MAP from '@/images/project/indexMap.png';
import { TIMING } from './_performance';

const { Link } = Anchor;

export default function Index() {
  const timing = <UseMarkDown markdown={TIMING}></UseMarkDown>;

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
      <Anchor className="anchor" getContainer={() => document.getElementById('content') as HTMLElement}>
        <Link href="#header" title="前言"></Link>
        <Link href="#indexMap" title="常见的性能优化指标及获取方式"></Link>
      </Anchor>
    </article>
  );
}
