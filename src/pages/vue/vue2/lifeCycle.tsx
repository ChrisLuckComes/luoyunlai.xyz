import { classMap } from "@/constants/constant";
import { UseMarkDown } from "@/hooks/useMarkdown";
import {
  MOUNT_COMPONENT,
  VUE,
  VUE_INIT,
  VUE_MOUNT,
  FLUSH_SCHEDULER_QUEUE,
  CALL_UPDATED_HOOK,
  DESTROY
} from "./_lifeCycle";
import { ArticleAnchor } from "@/component/Anchor";

export default function Index() {
  const vue = <UseMarkDown markdown={VUE}></UseMarkDown>,
    init = <UseMarkDown markdown={VUE_INIT}></UseMarkDown>,
    mount = <UseMarkDown markdown={VUE_MOUNT}></UseMarkDown>,
    mountComponent = <UseMarkDown markdown={MOUNT_COMPONENT}></UseMarkDown>,
    flush = <UseMarkDown markdown={FLUSH_SCHEDULER_QUEUE}></UseMarkDown>,
    updatedHook = <UseMarkDown markdown={CALL_UPDATED_HOOK}></UseMarkDown>,
    destroy = <UseMarkDown markdown={DESTROY}></UseMarkDown>;

  return (
    <article id="rootArticle" className={classMap.article}>
      <main className={classMap.content}>
        <h2 id="pre" className="font-semibold text-h2 mb-2">
          生命周期
        </h2>
        Vue有哪些生命周期大家肯定是门清的，这篇文章主要从源码出发来描述细节，这样就可以解答一些常见的问题了。生命周期钩子函数添加到vue实例上分为两个阶段：
        首先从入口代码开始：
        <div className={classMap.assist}>src\core\instance\index.js</div>
        {vue}
        Vue构造函数执行了<code>_init</code>方法，_init方法就是在
        <code>initMixin</code>方法中添加到Vue原型上的
        <h2 id="initMixin" className={classMap.articleTitle}>
          initMixin
        </h2>
        从如下代码中可以看到熟悉的<code>beforeCreate</code>和
        <code>created</code>
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
            3. <code>initEvents(vm)</code>，初始化事件，例如
            <code>$on、$off、$emit</code>
          </li>
          <li>
            4. <code>initRender(vm)</code>，解析前的准备工作，挂载
            <code>$createElement、$attrs、$listeners</code>等属性
          </li>
        </ul>
        <br />
        代码执行顺序说明了一切，为什么在beforeCreate阶段获取不到data，因为
        <code>callHook(vm, &quot;beforeCreate&quot;)</code>先于
        <code>initState(vm)</code>
        执行。
        <br />
        如果一定要获取数据，可以在<code>$options</code>里获取
        <br />
        <br />
        <code>created</code>之前，执行如下:
        <ul>
          <li>
            1.<code>initInjections(vm)</code>，在<code>data,props</code>
            之前先初始化<code>injection</code>
          </li>
          <li>
            2.
            <code>
              initState(vm),从options中取出并初始化
              <code>props、methods、data、computed、watch</code>
            </code>
          </li>
          <li>
            3.<code>initProvide(vm)</code>，在<code>data,props</code>之后初始化
            <code>provide</code>
          </li>
        </ul>
        <br />
        <code>created</code>执行完后，开始调用<code>$mount</code>安装组件。
        <div className={classMap.assist}>src\core\instance\init.js</div>
        {init}
        <h2 id="lifecycleMixin" className={classMap.articleTitle}>
          lifecycleMixin
        </h2>
        接下来看一下其他生命周期的细节。
        <h3 id="mountComponent" className={classMap.articleSubTitle}>
          mountComponent
        </h3>
        调用<code>$mount</code>开始挂载组件
        {mount}
        <code>$mount</code>调用了
        <code>mountComponent</code>
        <h3 id="beforeMount" className={classMap.articleSubTitle}>
          beforeMount
        </h3>
        <code>beforeMount</code>就是字面意思，在开始mount的准备工作前执行
        <br />
        <h3 id="beforeUpdate" className={classMap.articleSubTitle}>
          beforeUpdate
        </h3>
        <code>callHook(vm, &quot;beforeMount&quot;)</code>
        之后开始创建Watcher，传入更新函数等参数， 注意
        <code>new Watcher(vm, updateComponent,...)</code>
        传入第四个参数的before属性，Watcher的构造函数会保存它。更新阶段遍历执行watcher队列的回调函数之前，如果before存在会执行before
        <div className={classMap.assist}>src\core\observer\scheduler.js</div>
        {flush}
        <br />
        这里before函数除首次mount以外每次更新前都调用
        <code>callHook(vm, &quot;beforeUpdate&quot;)</code>
        <h3 id="updated" className={classMap.articleSubTitle}>
          updated
        </h3>
        在watcher遍历执行回调完成后，更新完成，调用组件更新和激活的hooks，执行
        <code>callUpdatedHooks</code>调用了
        <code>updated</code>hook
        {updatedHook}
        <br />
        <h3 id="mounted" className={classMap.articleSubTitle}>
          mounted
        </h3>
        判断<code>$vnode</code>是否为空，为空才是首次mount，首次mount才会调用
        <code>mounted</code>hook
        {mountComponent}
        <h3 id="destroy" className={classMap.articleTitle}>
          destroy
        </h3>
        <code>beforeDestroy</code>和<code>destroyed</code>hook都在
        <code>destroy</code>方法中被调用。
        <h3 id="beforeDestroy" className={classMap.articleSubTitle}>
          beforeDestroy
        </h3>
        和另外两个beforeXXX生命周期一样，在正式开始执行销毁之前会执行
        <code>beforeDestroy</code>
        ，此时还能获取到各种数据。
        <h3 id="destroyed" className={classMap.articleSubTitle}>
          destroyed
        </h3>
        <code>destroyed</code>hook之前会进行如下操作：
        <ul>
          <li>
            1. 移除该节点: <code>remove(parent.$children, vm)</code>
          </li>
          <li>
            2. 调用<code>teardown()</code>卸载Watcher
          </li>
          <li>
            3. 解除<code>data</code>的引用
          </li>
          <li>
            4. 设置<code>_isDestroyed</code>为true，调用
            <code>vm.__patch__(vm._vnode, null)</code>，将该节点更新为null
          </li>
        </ul>
        <code>destroyed</code>
        hook之后，还需要进行一些销毁操作，关闭所有监听器，销毁自身引用，和父级解绑。
        {destroy}
      </main>
      <ArticleAnchor
        items={[
          {
            title: "生命周期",
            key: "pre",
            href: "#pre"
          },
          {
            title: "initMixin",
            key: "initMixin",
            href: "#initMixin",
            children: [
              {
                title: "beforeCreate",
                key: "beforeCreate",
                href: "#beforeCreate"
              },
              {
                title: "created",
                key: "created",
                href: "#created"
              }
            ]
          },
          {
            title: "lifecycleMixin",
            key: "lifecycleMixin",
            href: "#lifecycleMixin",
            children: [
              {
                title: "mountComponent",
                key: "mountComponent",
                href: "#mountComponent",
                children: [
                  {
                    title: "beforeMount",
                    key: "beforeMount",
                    href: "#beforeMount"
                  },
                  {
                    title: "beforeUpdate",
                    key: "beforeUpdate",
                    href: "#beforeUpdate"
                  },
                  {
                    title: "updated",
                    key: "updated",
                    href: "#updated"
                  },
                  {
                    title: "mounted",
                    key: "mounted",
                    href: "#mounted"
                  }
                ]
              }
            ]
          },
          {
            title: "destroy",
            key: "destroy",
            href: "#destroy",
            children: [
              {
                title: "beforeDestroy",
                key: "beforeDestroy",
                href: "#beforeDestroy"
              },
              {
                title: "destroyed",
                key: "destroyed",
                href: "#destroyed"
              }
            ]
          }
        ]}
      ></ArticleAnchor>
    </article>
  );
}
