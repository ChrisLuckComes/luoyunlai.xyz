import { classMap } from '@/constants/constant';
import { Anchor } from 'antd';
import { UseMarkDown } from '@/hooks/useMarkdown';
import { GEN_ELEMENT, GEN_FOR, V_FOR_IF } from './ForWithIf';
const { Link } = Anchor;

export default function Index() {
  const vFor = <UseMarkDown markdown={V_FOR_IF}></UseMarkDown>,
    genElement = <UseMarkDown markdown={GEN_ELEMENT}></UseMarkDown>,
    genFor = <UseMarkDown markdown={GEN_FOR}></UseMarkDown>;
  return (
    <article id="rootActicle" className={classMap.article}>
      <main className={classMap.content}>
        <h2 className={classMap.articleTitle}>为什么v-for和v-if不要一起使用</h2>
        例如模板如下代码：
        {vFor}
        它不会按设想中工作，而是照常执行v-for，并且对每个li都执行了v-if。
        <br />
        原因很简单，代码一看便知，解析模板的源码如下：
        <div className={classMap.assist}>packages\vue-template-compiler\browser.js</div>
        {genElement}
        <br />
        可见源码的判断顺序就是<code>el.for</code>先于<code>el.if</code>
        <br />
        <br />
        {genFor}
        所以如果混用，就会在每个元素上都判断一次v-if，所以建议提前对数据进行过滤
      </main>
    </article>
  );
}
