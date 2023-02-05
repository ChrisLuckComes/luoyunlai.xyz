import { classMap } from '@/constants/constant';
import { Alert, Anchor } from 'antd';
import { UseMarkDown } from '@/hooks/useMarkdown';

import SHARE from '@/images/knowledge/share.png';
import STRUCTURE from '@/images/knowledge/structure.webp';
import BASIC_FLOW from '@/images/knowledge/basicFlow.webp';
import MAIN_FLOW from '@/images/knowledge/mainflow.webp';
import MATH_EXPRESSION from '@/images/knowledge/mathExpression.webp';
import PARSE_TREE from '@/images/knowledge/parseTree.webp';

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
          解析
        </h3>
        解析就是把文档转换成代码可以使用的结构，转换的结果通常是节点树，代表了文档的结构，也被称为语法树。如下图：
        <br /><br />
        <img src={MATH_EXPRESSION} />
          <br /><br />
        <h3 id="parser" className={classMap.articleSubTitle}>
          词法分析和语法分析
        </h3>
        解析分为两个子进程，词法分析(lexer)和语法分析(parser)。
        <br /><br />
        词法分析就是把输入分割为单词的过程，它们都是来自语法词汇表中，就像人类语言都是由词典中的单词组成一样。它会移除不相关的内容例如空格和换行。
        <br /><br />
        语法分析就是语法规则的应用。它根据语法规则分析文档结构创建语法树。
        <br /><br />
        <img src={PARSE_TREE} />
        <br />
        分析是循环的过程。语法分析器向词法分析器请求单词并和语法规则匹配，如果匹配成功就在语法树上新增一个节点，然后再请求下一个单词。
        <br />
        如果匹配失败，语法分析器先保存单词，继续请求单词直到内部保存的单词被匹配上为止。如果没有找到规则语法分析器会抛出异常，说明文档无效，包含语法错误。
        <h3 id="parsingExample" className={classMap.articleSubTitle}>
          解释案例
        </h3>
        我们来定义一个模型来模拟分析过程，语法如下：
        <ul>
          <li>1. 语法块可以是单词，表达式和运算</li>
          <li>2. 语言可以包含任意数字</li>
          <li>3. 一个表达式后跟随运算再跟随另一个表达式</li>
          <li>4. 运算是加法符号和减法符号</li>
          <li>5. 表达式是数字或单词</li>
        </ul>
        举个栗子,分析一下<code>2 + 3 - 1</code>：<br /><br />
        首个命中规则的字串是<code>2</code>，第5条。第二个命中的是<code>2 + 3</code>，第3条。最后<code>2 + 3 - 1</code>再次命中第3条，因为<code>2 + 3</code>是一个表达式
        <h3 id="formal" className={classMap.articleSubTitle}>
          词汇表和语法的正式定义
        </h3>
          还是上面的模型，词汇表定义如下:
          <br /><br />
          <Alert type='info' message={<div>
            <div>INTEGER: 0|[1-9][0-9]*</div>
            <div>PLUS: +</div>
            <div>MINUS: -</div></div>}>
          </Alert>
          <br />
        语法通常被定义为巴科斯范式(Backus–Naur form)，
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
          <Link href="#parse" title="解析"></Link>
          <Link href="#parser" title="词法分析和语法分析"></Link>
          <Link href="#parsingExample" title="解析案例"></Link>
          <Link href="#formal" title="词法和语法的正式定义"></Link>
          <Link href="#parseType" title="解释器的类型"></Link>
          <Link href="#autoParsers" title="自动化解析"></Link>
        </Link>
      </Anchor>
    </article>
  );
}
