import React from 'react';
import { classMap } from '@/constants/constant';
import { Anchor } from 'antd';
import { PATCH } from '.';
const { Link } = Anchor;

export default function Index() {
  return (
    <article id="root" className={classMap.article}>
      <h1 className={classMap.pageTitle}>Vue3 - diff</h1>
      在更新时，出于性能考虑，需要最大程度的利用已存在的节点。
      <br />
      所以需要递归比较同层级的新旧节点，这个比较函数就是
      <code>diff</code>算法
      <h2 id="patch" className={classMap.articleTitle}>
        patch
      </h2>
      <code>patch</code>是核心函数，入参主要关注n1,n2
      <ul className={classMap.ul}>
        <li>n1 旧节点</li>
        <li>n2 新节点</li>
      </ul>
      <strong>比较的基本流程</strong>
      <ul>
        <li>1. 是否完全一样，如果完全一样退出</li>
        <li>2. 是否类型不同，如果不同直接卸载旧节点</li>
        <li>
          <div>3. 根据新节点类型分类处理</div>
          <br />
          对于Text,Comment,Static的处理较为简单，旧节点为空就新增，否则修改即可
          <br />
          主要关注其他类型的处理 它们最后都会进入到<code>patchChildren</code>
        </li>
      </ul>
      <div className={classMap.assist}>packages\runtime-core\src\renderer.ts</div>
      <div className={classMap.markdown}>{PATCH}</div>
      <h2 id="patchChildren" className={classMap.articleTitle}>
        patchChildren
      </h2>
      <div className="flex-between relative">
        <Anchor className="anchor" getContainer={() => document.getElementById('content') as HTMLElement}>
          <Link href="#diff" title="diff">
            <Link href="#patch" title="patch"></Link>
            <Link href="#patchChildren" title="patchChildren"></Link>
          </Link>
        </Anchor>
      </div>
    </article>
  );
}
