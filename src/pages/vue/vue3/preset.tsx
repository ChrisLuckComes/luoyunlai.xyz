import React from 'react';
import { classMap } from '@/constants/constant';
import { Anchor } from 'antd';
import { DEFINE_PROPERTY, VUE2_2WAY_BIND, VUE_ARRAY_METHODS_TO_PATCH, VUE_SET } from '.';

const { Link } = Anchor;
export default function Preset() {
  return (
    <article id="root" className={classMap.article}>
      <h1 className={classMap.pageTitle}>Vue3前置知识</h1>
      <div className="flex-between relative">
        <div>
          <h2 id="proxy" className={classMap.articleTitle}>
            Vue3为什么使用proxy
          </h2>
          <h3 id="defineProperty" className={classMap.articleSubTitle}>
            Object.defineProperty
          </h3>
          之前，vue使用的是<code>Object.defineProperty</code>拦截对象的get,set操作。
          <div className={classMap.assist}>
            Object.defineProperty()方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象
          </div>
          <br />
          重点是<strong>对象上，属性</strong>，可以理解是针对对象上的属性做处理的。 举个栗子
          <ul className={classMap.ul}>
            <li>obj 要定义属性的对象</li>
            <li>Prop 要定义或修改属性的名称</li>
            <li>Descriptor 要定义或修改的属性描述符</li>
          </ul>
          <div className="markdown-container">{DEFINE_PROPERTY}</div>
          vue2实现双向绑定的核心代码如下
          <div className={classMap.assist}>src\core\observer\index.ts</div>
          <div className="markdown-container">{VUE2_2WAY_BIND}</div>
          <h3 id="definePropertyProblem" className={classMap.articleSubTitle}>
            Object.defineProperty存在的问题
          </h3>
          <ul className={classMap.ul}>
            <li>
              <strong>对象上新增属性不能触发更新</strong>
              <br />
              因为<code>observer</code>监听数据的时候，当时并没有这个属性，所以后续添加的属性不会触发更新，需要手动调用
              <code>vue.$set</code>来新增，本质上是手动调用<code>defineReactive</code>
              <div className={classMap.assist}>src\core\observer\index.ts</div>
              <div className="markdown-container">{VUE_SET}</div>
            </li>
            <li>
              <strong>通过索引设置数组项时不能触发更新</strong>
              出于数组可能长度很长的考虑，不会对数组的每一个元素进行监听。同时defineProperty也没法新增索引，所以vue选择监听原生数组的方法，涉及到push,unshift,splice等会新增索引的方法，手动触发更新。
              <div className={classMap.assist}>src\core\observer\array.ts</div>
              <div className="markdown-container">{VUE_ARRAY_METHODS_TO_PATCH}</div>
            </li>
          </ul>
          <h3 id="proxySummary" className={classMap.articleSubTitle}>
            使用proxy的原因总结
          </h3>
          <ul className={classMap.ul}>
            <li>
              <code>proxy</code>能观察的类型更丰富
            </li>
            <li>
              <code>proxy</code>劫持的是整个对象，不需要特殊处理。
              <code>Object.defineProperty</code>监听的是属性，新增属性需要再次调用
            </li>
            <li>
              使用<code>Object.defineProperty</code>，修改原对象触发；使用<code>proxy</code>必须修改代理对象触发
            </li>
          </ul>
          <h2 id="collection" className={classMap.articleTitle}>
            Set、Map、WeakSet、WeakMap
          </h2>
          <h3 id="set" className={classMap.articleSubTitle}>
            Set
          </h3>
          set存储任何类型的唯一值，可用于数组去重，求并集，交集，差集等场景
          <h3 id="weakSet" className={classMap.articleSubTitle}>
            WeakSet
          </h3>
          <div>
            它主要解决弱引用对象存储的场景，和set相比，它只能是对象的集合，不能是任意类型值。如果没有其他的对WeakSet中对象的引用，那么这些对象会被回收掉。WeakSet没有存储当前对象的列表，所以不可枚举，没有遍历方法。
          </div>
          <div className={classMap.assist}>
            弱引用是指不能确保引用的对象不回被垃圾回收期回收的引用。就是可能在任意时间被回收
          </div>
          <h3 id="map" className={classMap.articleSubTitle}>Map</h3>
          ES6之前，只有<code>Array,Object</code>两种集合，通常使用Object模拟Map，它有如下缺陷
          <ul className={classMap.ul}>
            <li>key必须是string,限制了key的数据类型</li>
            <li>object没有直接的方法获取size</li>
            <li>无序</li>
          </ul>
          <code>Map</code>会保留所有元素的顺序
          <h3 id='weakMap' className={classMap.articleSubTitle}>WeakMap</h3>
          跟<code>WeakSet</code>一样，没有遍历方法
        </div>
        <Anchor className="anchor" getContainer={() => document.getElementById('content') as HTMLElement}>
          <Link href="#proxy" title="Vue3为什么改用proxy">
            <Link href="#defineProperty" title="Object.defineProperty" />
            <Link href="#definePropertyProblem" title="Object.defineProperty存在的问题" />
            <Link href="#proxySummary" title="使用proxy的原因总结" />
          </Link>
          <Link href="#collection" title="Set、Map、WeakSet、WeakMap">
            <Link href="#set" title="Set"></Link>
            <Link href="#weakSet" title="WeakSet"></Link>
            <Link href="#map" title="Map"></Link>
            <Link href="#weakMap" title="WeakMap"></Link>
          </Link>
        </Anchor>
      </div>
    </article>
  );
}
