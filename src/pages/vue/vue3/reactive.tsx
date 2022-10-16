import React from 'react';
import { classMap } from '@/constants/constant';
import { Anchor } from 'antd';
import {
  CREATE_REACTIVE_OBJECT,
  CREATE_REF,
  MUTABLE_GET,
  MUTABLE_HANDLERS,
  MUTABLE_OTHER,
  MUTABLE_SET,
  REACTIVE,
  REF,
  TARGET_TYPE_MAP
} from '.';
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
      <br />
      <div className={classMap.assist}>packages\reactivity\src\ref.ts</div>
      <div className={classMap.markdown}>{REF}</div>
      <br />
      <code>ref</code>调用<code>createRef</code>，判断value是不是ref，如果不是调用<code>new RefImpl</code>
      <br />
      <br />
      构造函数中，如果shallow是true直接将初始值和当前值都设为value,否则调用reactive包装value
      <br />
      <code>RefImpl</code>类定义了私有属性_value,_rawValue,对外提供get
      set来读写，所以ref需要使用.value属性操作，这样可以避免直接修改。
      <br />
      <div className={classMap.markdown}>{CREATE_REF}</div>
      <br />
      <h2 id="baseHandlers" className={classMap.articleTitle}>
        baseHandlers
      </h2>
      handlers是Proxy的第二个参数，针对target具体操作同时做一些处理。<code>baseHandlers</code>包含4种handler
      <div className={classMap.assist}>packages\reactivity\src\baseHandlers.ts</div>
      <ul className={classMap.ul}>
        <li>mutableHandlers 可变处理</li>
        <li>readonlyHandlers 只读处理</li>
        <li>shallowReactiveHandlers 浅观察处理</li>
        <li>shallowReadonlyHandlers 潜观察且只读处理</li>
      </ul>
      其他三个handler都是<code>mutableHandlers</code>的变形
      <h3 id="mutableHandlers" className={classMap.articleSubTitle}>
        mutableHandlers
      </h3>
      <div className={classMap.markdown}>{MUTABLE_HANDLERS}</div>
      <br />
      <code id="get">get</code>
      <div className={classMap.markdown}>{MUTABLE_GET}</div>
      <code id="set">set</code>
      <div className={classMap.markdown}>{MUTABLE_SET}</div>
      <code id="other">deleteProperty has ownKeys</code>
      <div className={classMap.markdown}>{MUTABLE_OTHER}</div>

      其中多次出现的两个函数
      <ul>
        <li><code>track</code> 依赖收集</li>
        <li><code>trigger</code> 触发依赖</li>
      </ul>
      它们是<code>effect</code>里的方法，effect是<code>reactive</code>的核心
      <div className="flex-between relative">
        <Anchor className="anchor" getContainer={() => document.getElementById('content') as HTMLElement}>
          <Link href="#reactive" title="reactive"></Link>
          <Link href="#ref" title="ref"></Link>
          <Link href="#baseHandlers" title="baseHandlers">
            <Link href="#mutableHandlers" title="mutableHandlers"></Link>
            <Link href="#get" title="get"></Link>
            <Link href="#set" title="set"></Link>
            <Link href="#other" title="deleteProperty has ownKeys"></Link>
          </Link>
          <Link href="#effect" title="effect"></Link>
          <Link href="#computed" title="computed"></Link>
        </Anchor>
      </div>
    </article>
  );
}