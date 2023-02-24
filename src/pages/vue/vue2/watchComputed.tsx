import { classMap } from '@/constants/constant';
import { Anchor } from 'antd';
import { UseMarkDown } from '@/hooks/useMarkdown';
import { INIT_STATE, INIT_COMPUTED, DEFINE_COMPUTED, SHARED_PROPERTY_DEFENITION } from './_watchComputed';
const { Link } = Anchor;

export default function Index() {
  const initState = <UseMarkDown markdown={INIT_STATE}></UseMarkDown>,
    initComputed = <UseMarkDown markdown={INIT_COMPUTED}></UseMarkDown>,
    defineComputed = <UseMarkDown markdown={DEFINE_COMPUTED}></UseMarkDown>,
    sharedPropertyDefinition = <UseMarkDown markdown={SHARED_PROPERTY_DEFENITION}></UseMarkDown>;

  return (
    <article id="root" className={classMap.article}>
      <main className={classMap.content}>
        <h2 id="pre" className={classMap.articleTitle}>
          computed和watch
        </h2>
        在组件中两者都可以获取到更新后的值，那么它们各自有什么特点，区别在哪呢？
        <br />
        我们从源码来看一下。 首先从入口函数<code>initState</code>开始，先初始化<code>data</code>
        ，再初始化computed和watch(如果有的话)
        <div className={classMap.assist}>src\core\instance\state.js</div>
        {initState}
        <h2 id="computed" className={classMap.articleTitle}>
          computed
        </h2>
        <code>initState</code>首先调用了<code>initComputed</code>,遍历computed给每一个key都加上<code>Watcher</code>
        。遍历过程中如果vm中没有这个key，调用<code>defineComputed(vm, key, userDef)</code>添加上该计算属性
        {initComputed}
        首先判断是不是SSR，如果不是就调用<code>createComputedGetter</code>，是就调用<code>createGetterInvoker</code>
        ，两者的区别就是后者不涉及watcher。
        <br />
        <code>dirty</code>就是定义Watcher时传入的<code>lazy</code>
        ，标识计算属性需要缓存，如果dirty是true(每次触发update会设置为true)，那么获取计算属性值时才需要调用
        <code>watcher.evaluate()</code>，执行完成后将dirty再次设为false， ,否则直接return <code>watcher.value</code>。
        {defineComputed}
        <code>sharedPropertyDefinition</code>是全局变量,它是<code>Object.defineProperty</code>的公共配置参数。在
        <code>initProps,initData</code>通过<code>proxy</code>函数统一定义属性。
        {sharedPropertyDefinition}
        <h2 id="watch" className={classMap.articleTitle}>
          watch
        </h2>
        <Anchor className="anchor" getContainer={() => document.getElementById('content') as HTMLElement}>
          <Link href="#pre" title="前言"></Link>
          <Link href="#computed" title="computed"></Link>
          <Link href="#watch" title="watch"></Link>
          <Link href="#summary" title="总结"></Link>
        </Anchor>
      </main>
    </article>
  );
}
