import React from 'react';
import { classMap } from '@/constants/constant';
import { Anchor } from 'antd';
import { CREATE_REACTIVE_OBJECT, REACTIVE, TARGET_TYPE_MAP } from '.';
const { Link } = Anchor;
export default function Index() {
  return (
    <article id="root" className={classMap.article}>
      <h1 className={classMap.pageTitle}>Vue3响应式系统</h1>
      <h2 id="reactive" className={classMap.articleTitle}>
        reactive
      </h2>
      接受一个普通对象然后返回该对象的响应式<code>proxy</code>
      <br />
      Vue3中响应式数据核心是<code>reactive</code>，它由<code>proxy</code>+<code>effect</code>组合
      <div className={classMap.assist}>packages\reactivity\src\reactive.ts</div>
      <div className={classMap.markdown}>{REACTIVE}</div>
      再进入<code>createReactiveObject</code>
      <div className={classMap.markdown}>{CREATE_REACTIVE_OBJECT}</div>
      函数先是做了一些判断，如下情况会直接返回<code>target</code>
      <ul className={classMap.ul}>
        <li>不是对象</li>
        <li>已经是proxy或者已被观察过</li>
        <li>
          对象类型是否能被代理
          <br />
          <code>getTargetType</code>判断是否满足如下条件
          <div className={classMap.markdown}>{TARGET_TYPE_MAP}</div>
          <ul>
            <li>1.没有__v_skip标记</li>
            <li>2.没有被冻结</li>
            <li>3.在可以代理的类型case内</li>
          </ul>
        </li>
      </ul>
      最后创建proxy并返回
      <h2 id="ref" className={classMap.articleTitle}>
        ref
      </h2>
      接受一个参数值并返回一个响应式且可改变的ref对象，ref对象拥有一个指向内部值的单一属性.value ref可以看作是
      <code>reactive</code> 的变形，用于解决值类型的数据响应，如果传入ref的是对象，会调用<code>reactive</code>
      <div className="flex-between relative">
        <div></div>
        <Anchor className="anchor" getContainer={() => document.getElementById('content') as HTMLElement}>
          <Link href="#reactive" title="reactive"></Link>
          <Link href="#ref" title="ref"></Link>
          <Link href="#baseHandlers" title="baseHandlers"></Link>
          <Link href="#effect" title="effect"></Link>
          <Link href="#computed" title="computed"></Link>
        </Anchor>
      </div>
    </article>
  );
}
