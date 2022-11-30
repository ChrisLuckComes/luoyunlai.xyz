import { classMap } from '@/constants/constant';
import { Anchor } from 'antd';
import { UseMarkDown } from '@/hooks/useMarkdown';
import { MAP_REMAINING_CHILDREN, PLACE_CHILD, RECONCILE_CHILD_FIBERS, RECONCILE_SINGLE_ELEMENT, UPDATE_SLOT } from '.';
import DIFF_SINGLE from '@/images/reconcileSingleElement.png';
const { Link } = Anchor;

export default function Index() {
  const reconcileChildFibers = <UseMarkDown markdown={RECONCILE_CHILD_FIBERS} />,
    reconcileSingleElement = <UseMarkDown markdown={RECONCILE_SINGLE_ELEMENT} />,
    updateSlot = <UseMarkDown markdown={UPDATE_SLOT} />,
    mapRemainingChildren = <UseMarkDown markdown={MAP_REMAINING_CHILDREN} />,
    placeChild = <UseMarkDown markdown={PLACE_CHILD} />;

  return (
    <article id="root" className={classMap.article}>
      <main className={classMap.content}>
        <h2 id="diff" className={classMap.articleTitle}>
          Diff
        </h2>
        <code>Diff算法</code>就是对比当前组件和该组件上次更新时对应的Fiber节点，并生成新的Fiber节点的过程。
        <br />
        <br />
        它的时间复杂度O(n^3)，n为树中元素的数量。所以在真正进入算法之前，必然要有条件限制。
        <ul>
          <li>1. 只对同级元素进行diff，如果一个DOM节点更新中跨越了层级，不会复用</li>
          <li>2. 类型或者tag不同，不会复用</li>
          <li>3. 可以通过key属性来表示该元素能保持稳定</li>
        </ul>
        <br />
        从入口函数<code>reconcileChildFibers</code>开始看，该函数根据<code>newChild</code>的类型来处理
        <div className={classMap.assist}>packages\react-reconciler\src\ReactChildFiber.new.js</div>
        {reconcileChildFibers}
        基本可以分为两类
        <ul>
          1. <code>newChild</code>类型为<code>object</code>、<code>number</code>、<code>string</code>，代表同级为单节点
        </ul>
        <ul>
          2. <code>newChild</code>类型为<code>Array</code>，同级为多节点
        </ul>
        <h2 id="single" className={classMap.articleTitle}>
          单节点diff
        </h2>
        以<code>object</code>类型为例，进入<code>reconcileSingleElement</code>
        <img src={DIFF_SINGLE} />
        {reconcileSingleElement}
        有个细节需要关注：
        <ul className={classMap.ul}>
          <li>
            当<code>child!==null</code>且key相同且type不同时，将child和兄弟fiber都标记删除
          </li>
          <li>
            当<code>child!==null</code>且key不同时仅删除child
          </li>
        </ul>
        因为当key相同时且type不同时，代表已经找到唯一的可能性，不能复用的话剩下的也不用看了，都标记删除。当key不同时只代表该fiber不能被复用，所以仅仅标记该fiber删除。
        <h2 id="multi" className={classMap.articleTitle}>
          多节点diff
        </h2>
        多节点Diff的情况如下：
        <ul>
          <li>1. 节点更新，属性变化等</li>
          <li>2. 节点新增或减少</li>
          <li>3. 位置变化</li>
        </ul>
        节点更新是最常见的场景，所以先判断节点是否属于更新，再处理剩余节点。 几个关键步骤
        <ul>
          <li>
            1.同时从头部开始遍历新旧节点，调用<code>updateSlot</code>比较<code>newChildren[i]</code>和
            <code>oldFiber</code>，如果可复用会更新节点，<code>i++</code>
            <br />
            继续比较
            <code>newChildren[i]</code>和<code>olderFiber.sibling</code>
            ，直到不可复用或者旧节点遍历结束为止。
            {updateSlot}
          </li>
          <li>2. 如果新节点遍历完了，删除剩余旧节点</li>
          <li>3. 如果旧节点遍历完了，插入剩余新节点</li>
          <li>
            4. 都没遍历完，进入真正的diff
            <br />
            首先将未处理的<code>oldFiber</code>存入<code>key:oldFiber</code>的map
            {mapRemainingChildren}
            然后再遍历<code>newChildren</code>,如果可以在map中找到，说明可复用，在map中删除该key。调用
            <code>placeChild</code>来标记
            {placeChild}
            总结就是<code>oldIndex &lt; lastPlacedIndex</code>，需要右移，否则不移动
          </li>
        </ul>
        举个例子:
        <br />
        abcd
        <br />
        acdb
        <ul>
          <li>
            1. 节点a可以复用，<code>lastPlacedIndex=1</code>
          </li>
          <li>
            2. 生成map，开始遍历剩余newChildren <code>[c,d,b]</code>
          </li>
          <li>
            3. 节点c，oldIndex为2,，<code>oldIndex &gt; lastPlacedIndex</code>，c不动，lastPlacedIndex=2
          </li>
          <li>
            4. 节点d，oldIndex为3，<code>oldIndex &gt; lastPlacedIndex</code>，d不动，lastPlacedIndex=3
          </li>
          <li>
            5. 节点b，oldIndex为1，<code>oldIndex &lt; lastPlacedIndex</code>，b右移
          </li>
        </ul>
      </main>
      <Anchor className="anchor" getContainer={() => document.getElementById('content') as HTMLElement}>
        <Link href="#diff" title="Diff"></Link>
        <Link href="#single" title="单节点diff"></Link>
        <Link href="#multi" title="多节点diff"></Link>
      </Anchor>
    </article>
  );
}
