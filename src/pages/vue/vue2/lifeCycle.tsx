import { classMap } from '@/constants/constant';
import { Anchor } from 'antd';
import { UseMarkDown } from '@/hooks/useMarkdown';
import { VUE, VUE_INIT } from './_lifeCycle';
const { Link } = Anchor;

export default function Index() {
  const vue = <UseMarkDown markdown={VUE}></UseMarkDown>,
    init = <UseMarkDown markdown={VUE_INIT}></UseMarkDown>;

  return (
    <article id="root" className={classMap.article}>
      <main className={classMap.content}>
        <h2 id="pre" className={classMap.articleTitle}>
          生命周期
        </h2>
        Vue有哪些生命周期大家肯定是门清的，这篇文章主要从源码出发来描述细节，这样就可以解答一些常见的问题了。生命周期钩子函数添加到vue实例上分为两个阶段：
        首先从入口代码开始：
        <div className={classMap.assist}>src\core\instance\index.js</div>
        {vue}
        Vue构造函数执行了<code>_init</code>方法，_init方法就是在<code>initMixin</code>方法中添加到Vue原型上的
        <h2 id="initMixin" className={classMap.articleTitle}>
          initMixin
        </h2>
        从如下代码中可以看到熟悉的<code>beforeCreate</code>和<code>created</code>
        使用<code>callHook</code>先后被调用。
        <h3 id="beforeCreate" className={classMap.articleSubTitle}>
          beforeCreate
        </h3>
        <code>beforeCreate</code>之前，做了这么几件事
        <ul>
          <li>
            1. 在实例上挂载合并后的<code>$options</code>，即初始配置
          </li>
          <li>
            2. <code>initLifecycle(vm)</code>，初始化实例生命周期
          </li>
          <li>
            3. <code>initEvents(vm)</code>，初始化事件，例如<code>$on、$off、$emit</code>
          </li>
          <li>
            4. <code>initRender(vm)</code>，解析前的准备工作，挂载<code>$createElement、$attrs、$listeners</code>等属性
          </li>
        </ul>
        <br />
        代码执行顺序说明了一切，为什么在beforeCreate阶段获取不到data，因为
        <code>callHook(vm, &quot;beforeCreate&quot;)</code>先于<code>initState(vm)</code>
        执行。
        <br />
        如果一定要获取数据，可以在<code>$options</code>里获取
        <br />
        <br />
        <code>created</code>之前，执行如下:
        <ul>
          <li>
            1.<code>initInjections(vm)</code>，在<code>data,props</code>之前先初始化<code>injection</code>
          </li>
          <li>
            2.
            <code>
              initState(vm),从options中取出并初始化<code>props、methods、data、computed、watch</code>
            </code>
          </li>
          <li>
            3.<code>initProvide(vm)</code>，在<code>data,props</code>之后初始化<code>provide</code>
          </li>
        </ul>
        <br />
        <code>created</code>执行完后，开始调用<code>$mount</code>安装组件。
        {init}
        <h2 id="lifecycleMixin" className={classMap.articleTitle}>
          lifecycleMixin
        </h2>
        接下来看一下其他生命周期的细节
      </main>
      <Anchor className="anchor" getContainer={() => document.getElementById('content') as HTMLElement}>
        <Link href="#pre" title="前言"></Link>
        <Link href="#initMixin" title="initMixin">
          <Link href="#beforeCreate" title="beforeCreate"></Link>
          <Link href="#created" title="created"></Link>
        </Link>
        <Link href="#lifecycleMixin" title="lifecycleMixin">
          <Link href="#beforeMount" title="beforeMount"></Link>
          <Link href="#mounted" title="mounted"></Link>
          <Link href="#beforeUpdate" title="beforeUpdate"></Link>
          <Link href="#beforeDestroy" title="beforeDestroy"></Link>
          <Link href="#destroyed" title="destroyed"></Link>
        </Link>
      </Anchor>
    </article>
  );
}
