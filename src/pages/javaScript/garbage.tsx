import { classMap } from "@/constants/constant";
import { Anchor } from "antd";
import { UseMarkDown } from "@/hooks/useMarkdown";
import {
  DOM_LOOP,
  LOOP,
  HIDDEN_CLASS,
  NO_DEF,
  CLOSURE_TIMER,
  CLOSURE
} from "./_garbage";
const { Link } = Anchor;

import GC from "@images/js/majorGC.svg";
import GENERATION from "@images/js/generation.svg";
import MINOR from "@images/js/minorGC.svg";
import OLD from "@images/js/oldGen.svg";
import { LazyImage } from "@/component/image";

export default function Index() {
  const loop = <UseMarkDown markdown={LOOP}></UseMarkDown>,
    domLoop = <UseMarkDown markdown={DOM_LOOP}></UseMarkDown>,
    hiddenClass = <UseMarkDown markdown={HIDDEN_CLASS}></UseMarkDown>,
    noDef = <UseMarkDown markdown={NO_DEF}></UseMarkDown>,
    timer = <UseMarkDown markdown={CLOSURE_TIMER}></UseMarkDown>,
    closure = <UseMarkDown markdown={CLOSURE}></UseMarkDown>;
  return (
    <article id="root" className={classMap.article}>
      <main className={classMap.content}>
        <h2 id="pre" className={classMap.articleTitle}>
          垃圾回收
        </h2>
        在C/C++语言中，跟踪内存使用对开发者来说负担很大，也是很多问题的来源。在JavaScript中，内存分配和闲置资源回收都是自动的。
        基本思路很简单：确定哪个变量不再使用，然后释放它占用的内存。这个过程是周期性的，每隔一段时间垃圾回收程序就会自动运行。它不是一个完美的方案，因为某块内存是否有用只靠算法是判定不了的。
        <br />
        <br />
        以局部变量为例，函数中的局部变量会在函数执行时存在。此时，栈/堆内存会分配空间以保存相应的值。函数内部使用了变量，然后退出，此时就不再需要那个局部变量，它占用的内存可以释放。
        <br />
        <br />
        但不是每次都这么明显，垃圾回收程序必须跟踪记录哪个变量还会使用，哪个变量不会使用。如何标记未使用的变量，在浏览器的发展史上，主要有以下两种标记策略：
        <h2 id="markSweep" className={classMap.articleTitle}>
          标记清除
        </h2>
        标记清除(mark-and-sweep)是JavaScript最常用的垃圾回收策略。当变量进入上下文，例如在函数内部声明一个变量时，变量会被加上存在于上下文的标记。在上下文中的变量，永远不应该释放它们的内存，因为只要上下文中的代码在运行，就有可能用到它们。当变量离开上下文时，也会被加上离开上下文的标记。
        <br />
        <br />
        给变量加标记的方式有很多种，可以维护在上下文中和不在上下文中两个变量列表，也可以把一个列表转移到另一个列表。过程实现不重要，关键是策略。
        <br />
        <br />
        垃圾回收程序运行的时候，会标记内存中存储的所有变量，然后它会将所有上下文中的变量，以及被上下文中变量引用的变量的标记去掉。在此之后，还有标记的变量就是待删除的了，原因是任何上下文的变量都访问不到它们了。随后垃圾回收程序做一次
        <strong>内存清理</strong>，销毁带标记的所有值并回收内存。
        <br />
        <br />
        现在几乎所有浏览器都是采用标记清除或者变体，只是回收频率的差异。
        <h2 id="referenceCounting" className={classMap.articleTitle}>
          引用计数
        </h2>
        引用计数(reference
        counting)是一种不常用的策略。它的思路是对每个值都记录它被引用的次数，声明变量并给它赋一个引用值时，这个值的引用数为1。如果同一个值又被赋给另一个变量，那么引用数+1.类似的，如果保存对该值引用的变量被其他值给覆盖了，那么引用数-1。当一个值的引用数为0时，说明没办法访问到这个值，可以回收它的内存了。垃圾回收程序下次运行的时候就会释放引用数为0的值的内存。
        <br />
        <br />
        这种策略有严重的问题，循环引用，循环引用就是两个对象互相引用，有如下代码：
        {loop}
        这个栗子，a,b通过各自的属性互相引用，它们的引用数都是2.在标记清除状态下，这不是问题，因为函数结束后两个对象都不在作用域中。而且引用计数策略下，a和b函数结束后还存在，因为它们的引用数永远不会变成0。如果函数被多次调用，会造成大量内存永远不会被释放。
        <br />
        <br />
        引用计数还不止如上问题。在IE8及更早版本中，BOM和DOM中的对象都不是原生JavaScript对象，它们使用引用计数实现垃圾回收。就算这些版本IE使用标记清除，涉及到BOM/DOM对象依然无法避开循环引用的问题，如下代码：
        {domLoop}
        这种情况又形成了循环引用，DOM元素的内存永远不会被回收，除非在不使用的情况下手动处理。
        <br />
        <code>object.element = null;element.xxx = null</code>
        <br />
        将值设置为null可以切断引用。为了补救这点，IE9就把BOM和DOM对象都改成了JavaScript对象。
        <h2 id="v8" className={classMap.articleTitle}>
          V8垃圾回收策略
        </h2>
        V8使用的垃圾回收策略是标记整理(mark-compact)
        <h3 id="major" className={classMap.articleSubTitle}>
          主要GC{" "}
          <span className={classMap.assist}>
            Major GC(Mark-Compact 标记-整理)
          </span>
        </h3>
        主要GC回收整个堆内存的垃圾，过程如下图：
        <br />
        <embed src={GC} type="image/svg+xml" />
        <div className={classMap.assistCenter}>
          主要GC过程分为三个阶段:标记、清除和整理
        </div>
        <strong id="mark">标记阶段</strong>
        <br />
        搞清楚哪些对象可以被回收是垃圾回收必不可少的过程。垃圾回收器使用可达性代表存活。任意对象在运行时可以访问必须被保留，访问不到的就可能被回收。
        <br />
        <br />
        GC从<code>root set</code>
        开始，它是已知对象指针的集合，包括执行上下文和全局对象。它跟踪每个对象指针，标记对象为可达(reachable)。GC继续递归的执行这个过程，直到每个可达对象在运行时被找到和标记。
        <br />
        <br />
        <strong id="sweep">清除阶段</strong>
        <br />
        <br />
        清除阶段会将要被回收的&quot;死亡&quot;对象添加到称为
        <code>free-list</code>
        的数据结构中，这个过程会在内存中留下空白。当标记阶段完成后，GC找到不可达对象留下的相邻的空白，并且将它们加到合适的free-list。为了快速查找，free-lists根据内存块的大小来区别。未来如果想分配内存，只需要从free-list找到合适大小的内存块。
        <br /> <br />
        <strong id="compact">整理</strong>
        <br />
        主要GC选择性的清理/整理某些页，在碎片启发式算法基础上(fragmentation
        heuristic)，就像在老电脑的硬盘碎片整理一样。复制当前不会被整理的存活的对象到其他页，这样可以利用死亡对象留下的分散的内存空白。
        <h3 id="generationalLayout" className={classMap.articleSubTitle}>
          两代之间的设计
        </h3>
        V8的堆内存分为不同的区域称为代(<strong>generation</strong>
        )。新生代(young generation 细分为婴儿室
        <strong>nursery</strong>和中级的<strong>intermediate</strong>
        子生代)和老生代(old
        generation)。对象最开始分配到婴儿室，如果在下一次GC中存活，它会保留新生代中且被认为是中级的。如果又活过了另一次GC，它们会被移动到老生代。
        <br />
        <br />
        <LazyImage src={GENERATION} />
        <div className={classMap.assistCenter}>
          V8堆内存被分割成generations，在GC后存活的对象会在generation之间移动
        </div>
        <br />
        垃圾回收有一个重要术语:<code>The Generational Hypothesis</code>
        代的假设，大多数对象分配之后很快就不可达了，这不仅仅是V8或者JS的表现，大多数动态语言都是这样。
        <br />
        V8这种代的堆内存设计利用了对象生命周期的事实。这里GC主要是整理/移动，当对象在垃圾回收存活就复制它们。这有点反直觉，因为在GC的时候复制对象的代价很高，但是只有小部分的对象能实际存活，其他的分配变成了垃圾。
        实际上只需要和存活的对象成比例的花费，而不是所有的分配。
        <h3 id="minor" className={classMap.articleSubTitle}>
          次要GC{" "}
          <span className={classMap.assist}>
            Minor GC(Scavenger 捡破烂的人/清道夫)
          </span>
        </h3>
        V8有两个垃圾回收器。
        <a
          className={classMap.href}
          target="_self"
          rel="noreferrer"
          href="#major"
        >
          Major GC(Mark-Compact)
        </a>
        从整个堆内存收集垃圾。<strong>Minor GC(Scavenger)</strong>
        从新生代收集垃圾。
        <br />
        <br />
        Scavenger中，存活的对象总是转移到另一页。V8对于新生代使用二分空间(semi-space)设计。意思就是整个空间的一半始终是空的，留给转移对象的步骤。在垃圾回收过程中，初始化为空的空间称为
        <strong>To-Space</strong>，需要复制对象的目标区域称为
        <strong>From-Space</strong>。
        最坏的情况就是，每个对象都可以在scavenge下存活，它们都需要复制。
        <br />
        <br />
        为了执行清理，我们有额外的根节点集合，它们是旧空间中的指针，指向新生代中的对象。比起在每次清理追踪整个堆内存，V8使用写入边界(write
        barrriers)来维持一个从旧到新引用的列表。当执行上下文和全局合在一起时，V8知道每一个新生代的引用，不需要追踪整个老生代。
        <br />
        <br />
        转移的步骤移动所有存活的对象到相邻的内存块(同一页内)，这样有利于移除死对象留下的碎片。然后切换两个空间，To-Space和From-Space交换。一旦GC完成，新的内存分配从From-Space开始。
        <br />
        <LazyImage src={MINOR} />
        <div className={classMap.assistCenter}>
          Scavenger将存活的对象移动到新页
        </div>
        <br />
        如果仅仅只用这种策略，很快就会内存耗尽。对象活过第二次GC就移动到老生代，而不是To-Space
        <br />
        最后一步就是更新指向原对象指针，每个复制的对象都会留下转发地址用于更新原来的指针，指向新的位置。
        <br />
        <br />
        <LazyImage src={OLD} />
        <div className={classMap.assistCenter}>
          Scavenger将中级对象移动到老生代，婴儿室里的对象移动到新页
        </div>
        在这个过程中，实际上做了下面三步：标记，移动，指针更新，都是交叉进行，而不是确定的阶段
        <h2 id="manage" className={classMap.articleTitle}>
          内存管理
        </h2>
        虽然说大多数开发者通常无需关心内存管理，但是JavaScript运行在浏览器中，分配给浏览器的内存通常少于桌面软件，移动浏览器更少。这主要是出于安全考虑，避免网页大量运行JavaScript耗尽能存导致系统崩溃，这个内存限制影响内存分配和同一个线程中能执行的语句数量。
        <br />
        将内存占用量保持在一个较小的值可以让页面性能更好。优化内存占用手段之一就是
        <strong>解除引用</strong>
        ：当数据不再必要，那么把它设置为null，就可以释放引用，最适合全局变量及其属性，因为局部变量超出作用域后会自动接触引用。
        <br />
        解除引用不会自动导致内存被回收，而是保证相关的值不在上下文里，下次GC会回收。
        <br />
        有如下手段可以提升性能：
        <ul>
          <li>
            <strong>1. 通过const和let声明提升性能</strong>
            <br />
            ES6增加这两个关键字有助于改进垃圾回收过程，因为它们都是块级作用域，相比于使用var，使用这两个关键字可能会更早的让垃圾回收程序介入。
          </li>
          <li>
            <strong>2. 隐藏类和删除操作</strong>
            <br />
            使用V8引擎，V8将在解释后的JavaScript代码编译为实际的机器码时会利用隐藏类。
            <br />
            运行期间，V8会将创建的对象与隐藏类关联起来，以跟踪它们的属性。能够共享隐藏类的对象性能会更好，但不一定总能做到。如下代码：
            {hiddenClass}
            V8会让a1和a2共享相同的隐藏类，因为它们共享同一个构造函数和原型，如果后续又添加下面这行代码：
            <br />
            <code>a2.author = &quot;lyl&quot;</code>
            <br />
            此时两个实例就会对应不同的隐藏类。根据这样的操作频率和隐藏类的大小，有可能对性能产生明显影响。
            <br />
            对此，解决方案就是避免这种先创建再补充的动态属性赋值，在构造函数中一次性声明所有属性。
            <br />
            <br />
            使用<code>delete</code>
            关键字也会导致生成相同的隐藏类片段，和动态添加属性的后果一样，最佳实践是把不想要的属性设置为null，这样可以保持隐藏类不变继续共享，也能删除引用值供垃圾回收。
          </li>
          <li>
            <strong>3. 内存泄露</strong>
            <br />
            写的不好的代码可能出现难以察觉的内存泄露问题，大部分的内存泄露都是不合理的引用导致的。
            <br />
            意外声明全局变量是最常见也最容易修复的内存泄漏问题，如下:
            {noDef}
            此时，解释器会把变量name当作window的属性来创建，相当于
            <code>window.name = &quot;lyl&quot;</code>
            。在windows对象上创建的属性，只要window本身还在就不会消失。这个问题很容易解决，加上变量声明关键字即可。
            <br />
            <br />
            定时器也可能悄悄地导致内存泄露，下面的代码中，定时器的回调引用了外部的变量，形成了闭包：
            {timer}
            只要定时器一直运行，name就会一直占用内存。
            <br />
            使用闭包很容易不知不觉造成内存泄露，如下：
            {closure}
            调用outer会导致分配name的内存被泄露。以上代码执行后创建了一个闭包，只要返回的函数存在就不能清理name。假如name的内容很大，那可能就是大问题。
          </li>
          <li>
            <strong>4. 静态分配和对象池</strong>
            <br />
            在初始化的时候，创建一个对象池，用来管理一组可回收的对象。程序可以向对象池请求对象，使用完成后再返回。因为没发生对象初始化，垃圾回收程序就不会频繁的运行。
            <br />
            这是一种极端的优化，如果GC严重影响了性能，那么可以考虑使用这种方式。这种情况很少见，属于过早优化，不用考虑。
          </li>
        </ul>
      </main>
      <Anchor
        className="anchor"
        getContainer={() => document.getElementById("content") as HTMLElement}
      >
        <Link href="#pre" title="垃圾回收"></Link>
        <Link href="#markSweep" title="标记清除"></Link>
        <Link href="#referenceCounting" title="引用计数"></Link>
        <Link href="#v8" title="V8垃圾回收策略">
          <Link href="#major" title="主要GC">
            <Link href="#mark" title="标记"></Link>
            <Link href="#sweep" title="清除"></Link>
            <Link href="#compact" title="整理"></Link>
          </Link>
          <Link href="#generationalLayout" title="两代之间的设计"></Link>
          <Link href="#minor" title="次要GC"></Link>
        </Link>
        <Link href="#manage" title="内存管理"></Link>
      </Anchor>
    </article>
  );
}
