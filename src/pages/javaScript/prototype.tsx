import { classMap } from '@/constants/constant';
import { Anchor } from 'antd';
import { UseMarkDown } from '@/hooks/useMarkdown';
import { LazyImage } from '@/component/image';
const { Link } = Anchor;

import NICK_YOUNG from '@images/js/nickYoung.webp';
import PROTO_DEBUG from '@images/js/protoDebug.png';
import PROTO_TOP from '@images/js/protoChainTop.png';
import PROTO_CHAIN from '@images/js/protoChain.png';

import { EXAMPLE } from './_prototype';

export default function Index() {
  const example = <UseMarkDown markdown={EXAMPLE}></UseMarkDown>;
  return (
    <article id="root" className={classMap.article}>
      <main className={classMap.content}>
        <h2 id="pre" className={classMap.articleTitle}>
          10分钟内搞懂原型和原型链
        </h2>
        又是一个小伙伴们遇到会黑人问号脸的问题
        <br />
        <br />
        <LazyImage src={NICK_YOUNG}></LazyImage>
        <br />
        老规矩，来个栗子，debug一看便知。
        <h2 id="debug" className={classMap.articleTitle}>
          Debug
        </h2>
        代码如下：
        {example}
        打上断点，来看一下对象<code>a</code>的属性：
        <br />
        <br />
        <LazyImage src={PROTO_DEBUG}></LazyImage>
        <br />
        如图，可以看到a有属性<code>[[Prototype]]</code>，是不是在哪见过这种中括号的属性啊？想起来了没，就是作用域链
        <code>[[Scope]]</code>
        <br />
        <br />
        上次我们提到函数执行时，作用域链用来找变量。那这个[[Prototype]]很明显就是用来找属性的了，它是链表结构，也就是我们常说的原型链。
        <h2 id="diff" className={classMap.articleTitle}>
          对象
        </h2>
        <code>ECMA</code>将<strong>对象</strong>
        定义为一组属性的无序集合，对象的每个属性或方法都用一个名称来标识，名称对应一个值，值可以是数据或者函数。
        <br />
        <br />
        创建对象有两种方式:
        <ul className={classMap.ul}>
          <li>
            1. 使用<code>Object</code>构造函数
          </li>
          <li>2. 对象字面量</li>
        </ul>
        两者都有相同的问题，创建多个具有同样属性的对象需要编写重复代码。所以针对特定类型的对象，可以自定义构造函数用于创建。
        <h2 id="func" className={classMap.articleTitle}>
          构造函数
        </h2>
        要创建对象，应该使用new操作符，它会执行如下操作
        <ul>
          <li>1. 创建新对象</li>
          <li>
            2. 新对象的[[Prototype]]赋值为构造函数的<code>prototype</code>属性
          </li>
          <li>
            3. 构造函数的<code>this</code>指向新对象
          </li>
          <li>4. 执行构造函数</li>
          <li>5. 如果构造函数返回不为空，则返回该对象；否则返回刚创建的新对象</li>
        </ul>
        构造函数也是函数，没有特殊语法，区别就是调用方式不同，首字母一般是大写。任何函数用new调用就是构造函数，不用就是普通函数。
        <h2 id="prototype" className={classMap.articleTitle}>
          原型
        </h2>
        每个函数都会创建一个<code>prototype</code>
        属性，它是一个对象，包含特定引用类型的实例共享的属性。实际上这个对象就是通过调用构造函数创建的对象的
        <strong>原型</strong>
        <br />
        <br />
        每当调用构造函数创建一个新实例，实例的内部[[Prototype]]的指针就会被赋值为构造函数的原型对象。
        虽然js不能直接访问到[[Prototype]]，但是Chrome,Safari,Firefox浏览器会在每个对象上暴露<code>__proto__</code>
        ，通过这个属性就可以访问对象的原型，也可以使用<code>Object.getPrototypeOf(obj)</code>来获取
        <br />
        <br /> 关键记住一句话：<strong>对象跟构造函数原型有联系，跟构造函数没有</strong>。
        <code>console.log(obj.__proto__ === Object.prototype) // true</code>
        <h3 id="attr" className={classMap.articleSubTitle}>
          访问属性
        </h3>
        在通过对象访问属性时，会按照这个属性的名称开始找。首先是在对象本身开始，如果找到了就返回对应的值。如果没有找到，则会沿着
        <code>[[Prototype]]</code>这个指针进入原型对象， 然后在原型对象上找到属性后再返回对应的值。
        <br />
        因此，在调用<code>a.setAge()</code>
        时，会发生两步搜索，先问a有setAge属性吗？没有。然后继续找，再问a的原型有setAge属性吗？有。于是就返回了保存在原型上的这个函数
        <h2 id="protoChain" className={classMap.articleTitle}>
          原型链
        </h2>
        一个原型也会是另一个类型的实例，所以就构成了一个链条，如下图：
        <LazyImage src={PROTO_CHAIN}></LazyImage>
        <br />
        <br />
        直观视觉版，可以看到就是一个链条，顶部为<code>Object</code>
        ，因为默认情况下，所有引用类型都继承自Object，也是通过原型链实现的，任何函数的默认原型都是Object的实例：
        <LazyImage src={PROTO_TOP}></LazyImage>
        原型链扩展了上文访问属性的搜索机制，通过原型链就可以继续向上搜索原型的原型。
      </main>
      <Anchor className="anchor" getContainer={() => document.getElementById('content') as HTMLElement}>
        <Link href="#pre" title="前言"></Link>
        <Link href="#debug" title="Debug"></Link>
        <Link href="#object" title="对象"></Link>
        <Link href="#func" title="构造函数"></Link>
        <Link href="#prototype" title="原型">
          <Link href="#attr" title="访问属性"></Link>
        </Link>
        <Link href="#protoChain" title="原型链"></Link>
      </Anchor>
    </article>
  );
  zz;
}
