import { classMap } from '@/constants/constant';
import { Anchor } from 'antd';
import { UseMarkDown } from '@/hooks/useMarkdown';

import SHARE from '@/images/knowledge/share.png';
import STRUCTURE from '@/images/knowledge/structure.webp';
import BASIC_FLOW from '@/images/knowledge/basicFlow.webp';
import MAIN_FLOW from '@/images/knowledge/mainflow.webp';

const { Link } = Anchor;

export default function Index() {
  return (
    <article id="root" className={classMap.article}>
      <main className={classMap.content}>
        <h2 id="preface" className={classMap.articleTitle}>
          前言
        </h2>
        作为一个web开发者，学习浏览器的内部运行机制能更好的做出决策，同时也可以了解采用最佳实践背后的理由。我们可能经常会被问到，当在地址栏输入完成按下enter键之后都发生了什么，下面会详细说明。
        <br />
        <h2 id="browsers" className={classMap.articleTitle}>
          有哪些浏览器？
        </h2>
        现在PC端主要有5个浏览器：Chrome,IE,Firefox,Safari,Opera。移动端主要是Android Browser,iPhone,Opera Mini,UC
        browser,Chrome.除了Opera之外，其他所有浏览器都是基于WebKit。截至于2023年，以下是各大浏览器的占有率，数据来源:
        <a className={classMap.href} target="_blank" rel="noreferrer" href="https://gs.statcounter.com/">
          StatCounter statistics
        </a>
        <br />
        <br />
        <img src={SHARE} />
        <br />
        Chrome可谓是一家独大
        <h2 id="functionality" className={classMap.articleTitle}>
          浏览器的主要功能
        </h2>
        浏览器的主要功能就是从服务器请求网络资源，并且在浏览器窗口显示。资源通常是HTML文档，也有可能是PDF,图片等其他内容。用户用URI(Uniform
        Resource Identifier)来规定资源路径。浏览器有以下共同UI元素：
        <ul>
          <li>1. 地址栏</li>
          <li>2. 后退和前进按钮</li>
          <li>3. 书签</li>
          <li>4. 刷新和停止</li>
          <li>5. 首页</li>
        </ul>
        <h2 id="structure" className={classMap.articleTitle}>
          浏览器的架构
        </h2>
        <br />
        <img src={STRUCTURE} />
        <br />
        浏览器的架构如下：
        <ul>
          <li>
            1. <strong>用户界面(User Interface)</strong>：包括地址栏，前进后退按钮，书签菜单等。除了页面之外的部分都是。
          </li>
          <li>
            2. <strong>浏览器引擎(browser engine)</strong>：组织UI和渲染引擎之间的操作
          </li>
          <li>
            3. <strong>渲染引擎(rendering engine)</strong>
            ：负责展示请求到的内容。如果请求到的内容是HTML，就解析HTML和CSS，将解析后的内容展示出来。
            不同的浏览器使用的渲染引擎不同：IE(Trident), Firefox(Gecko), Safari(WebKit),
            Chrome,Opera(Blink,WebKit分支)。
          </li>
          <li>
            4. <strong>网络(networking)</strong>
            ：用于网络请求，例如HTTP请求，它有平台无关的接口，对于每个平台有不同的实现。
          </li>
          <li>
            5. <strong>UI后端(UI backend)</strong>
            ：用于绘制基础部件，例如弹窗和级联选择。它有通用样式，除非使用了操作系统UI。
          </li>
          <li>
            6. <strong>JS解释器(JavaScript interpreter)</strong>：用于解析和执行js代码
          </li>
          <li>
            7. <strong>数据存储(Data storage)</strong>
            ：它是持久层。浏览器可能需要本地保存各种类型的数据，例如cookies。浏览器也支持localStorage,IndexedDB,WebSQL,FileSystem等存储机制。
          </li>
        </ul>
        值得一提的是，像Chrome这种浏览器的渲染引擎会运行多个实例，每个实例对应每个tab。每个tab都是独立进程。
        <h2 id="mainFlow" className={classMap.articleTitle}>
          主要流程
        </h2>
        渲染引擎从网络层获取请求到的文档，之后，开始如下的渲染流程。
        <br />
        <br />
        <img src={BASIC_FLOW} />
        <br />
        渲染引擎开始解析HTML文档，把元素转换为DOM树(content
        tree)。引擎还会解析样式数据，包括外部CSS文件和style元素。样式信息和HTML中的视觉描述一起创建渲染树(render tree)
        <br />
        <br />
        渲染树包含了有颜色、尺寸等视觉属性的矩形，它们会以正确的顺序显示在屏幕上。
        <br />
        <br />
        渲染树构建完后，开始布局(layout)进程，就是给每一个节点精确的坐标，让它们显示在应该出现的位置。下一步就是绘制，使用UI后端(UI
        backend)层遍历渲染树绘制每个节点。
        <br />
        <br />
        以上是一个渐进的过程，为了更好的用户体验，渲染引擎会尽快显示内容。在开始构建和布局渲染树之前，它不会等到HTML全部解析完才开始显示。部分内容会先被解析后显示，同时进程也在继续处理从网络层来的剩余内容。
        <h3 id="examples" className={classMap.articleSubTitle}>
          主要流程案例
        </h3>
        <br />
        <br />
        <img src={MAIN_FLOW} />
        <br />
        <br />
        <h3 id="parse" className={classMap.articleSubTitle}>
          解释
        </h3>
        <h3 id="grammar" className={classMap.articleSubTitle}>
          语法
        </h3>
        <h3 id="translation" className={classMap.articleSubTitle}>
          翻译
        </h3>
        <h3 id="parsingExample" className={classMap.articleSubTitle}>
          解释案例
        </h3>
        <h3 id="formal" className={classMap.articleSubTitle}>
          词法和语法的正式定义
        </h3>
        <h3 id="parseType" className={classMap.articleSubTitle}>
          解释器的类型
        </h3>
        <h3 id="autoParsers" className={classMap.articleSubTitle}>
          自动化解析
        </h3>
      </main>
      <Anchor className="anchor" getContainer={() => document.getElementById('content') as HTMLElement}>
        <Link href="#preface" title="前言"></Link>
        <Link href="#browsers" title="有哪些浏览器?"></Link>
        <Link href="#functionality" title="浏览器的主要功能"></Link>
        <Link href="#structure" title="浏览器的架构"></Link>
        <Link href="#mainFlow" title="主要流程">
          <Link href="#examples" title="主要流程案例"></Link>
          <Link href="#parse" title="解释"></Link>
          <Link href="#grammar" title="语法"></Link>
          <Link href="#translation" title="翻译"></Link>
          <Link href="#parsingExample" title="解析案例"></Link>
          <Link href="#formal" title="词法和语法的正式定义"></Link>
          <Link href="#parseType" title="解释器的类型"></Link>
          <Link href="#autoParsers" title="自动化解析"></Link>
        </Link>
      </Anchor>
    </article>
  );
}
