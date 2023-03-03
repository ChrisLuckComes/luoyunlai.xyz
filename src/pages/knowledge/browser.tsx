import { classMap } from '@/constants/constant';
import { Alert, Anchor } from 'antd';
import { UseMarkDown } from '@/hooks/useMarkdown';

import SHARE from '@images/knowledge/share.png';
import STRUCTURE from '@images/knowledge/structure.webp';
import BASIC_FLOW from '@images/knowledge/basicFlow.webp';
import MAIN_FLOW from '@images/knowledge/mainflow.webp';
import MATH_EXPRESSION from '@images/knowledge/mathExpression.webp';
import PARSE_TREE from '@images/knowledge/parseTree.webp';
import DOM_TREE from '@images/knowledge/domTree.webp';
import HTML_PARSING_FLOW from '@images/knowledge/htmlParseingFlow.webp';
import TOKENIZE from '@images/knowledge/tokenize.webp';
import TREE_CONSTRUCTION from '@images/knowledge/treeConstruction.webp';
import CSS_PARSING from '@images/knowledge/parseCss.webp';
import RELATION from '@images/knowledge/relation.webp';
import BOX from '@images/knowledge/box.webp';
import BLOCK from '@images/knowledge/blockBox.webp';
import INLINE from '@images/knowledge/inlineBox.webp';
import BLOCK_INLINE from '@images/knowledge/blockAndInline.webp';
import LINES from '@images/knowledge/lines.webp';
import RELATIVE from '@images/knowledge/relative.webp';
import FLOAT_IMG from '@images/knowledge/float.webp';
import FIXED from '@images/knowledge/fixed.webp';

import {
  CSS_EXAMPLE,
  CSS_RULES,
  CSS_WORD_RULES,
  RULE_SET,
  RENDER_OBJECT,
  DISPLAY,
  COMPOUND,
  COMPUTED_HTML,
  COMPUTED_CSS,
  HASH_MAP_RULES,
  HTML_FOR_HASH,
  WIDTH_CAL_EXAMPLES,
  EVENT_LOOP,
  FLOAT
} from '.';
import { LazyImage } from '@/component/image';

const { Link } = Anchor;

export default function Index() {
  const cssRules = <UseMarkDown markdown={CSS_RULES}></UseMarkDown>,
    cssWordRules = <UseMarkDown markdown={CSS_WORD_RULES}></UseMarkDown>,
    cssExample = <UseMarkDown markdown={CSS_EXAMPLE}></UseMarkDown>,
    ruleSet = <UseMarkDown markdown={RULE_SET}></UseMarkDown>,
    renderObject = <UseMarkDown markdown={RENDER_OBJECT}></UseMarkDown>,
    display = <UseMarkDown markdown={DISPLAY}></UseMarkDown>,
    compound = <UseMarkDown markdown={COMPOUND}></UseMarkDown>,
    computeHtml = <UseMarkDown markdown={COMPUTED_HTML}></UseMarkDown>,
    computeCss = <UseMarkDown markdown={COMPUTED_CSS}></UseMarkDown>,
    hashMapRules = <UseMarkDown markdown={HASH_MAP_RULES}></UseMarkDown>,
    htmlForHash = <UseMarkDown markdown={HTML_FOR_HASH}></UseMarkDown>,
    widthCalExample = <UseMarkDown markdown={WIDTH_CAL_EXAMPLES}></UseMarkDown>,
    eventLoop = <UseMarkDown markdown={EVENT_LOOP}></UseMarkDown>,
    float = <UseMarkDown markdown={FLOAT}></UseMarkDown>;

  return (
    <article id="rootActicle" className={classMap.article}>
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
        <LazyImage src={SHARE} />
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
        <LazyImage src={STRUCTURE} />
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
        <LazyImage src={BASIC_FLOW} />
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
        <LazyImage src={MAIN_FLOW} />
        <br />
        <br />
        <h3 id="parse" className={classMap.articleSubTitle}>
          解析
        </h3>
        解析就是把文档转换成代码可以使用的结构，转换的结果通常是节点树，代表了文档的结构，也被称为语法树。如下图：
        <br />
        <br />
        <LazyImage src={MATH_EXPRESSION} />
        <br />
        <br />
        <h3 id="parser" className={classMap.articleSubTitle}>
          词法分析和语法分析
        </h3>
        解析分为两个子进程，词法分析(lexer)和语法分析(parser)。
        <br />
        <br />
        词法分析就是把输入分割为单词的过程，它们都是来自语法词汇表中，就像人类语言都是由词典中的单词组成一样。它会移除不相关的内容例如空格和换行。
        <br />
        <br />
        语法分析就是语法规则的应用。它根据语法规则分析文档结构创建语法树。
        <br />
        <br />
        <LazyImage src={PARSE_TREE} />
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
        举个栗子,分析一下<code>2 + 3 - 1</code>：<br />
        <br />
        首个命中规则的字串是<code>2</code>，第5条。第二个命中的是<code>2 + 3</code>，第3条。最后<code>2 + 3 - 1</code>
        再次命中第3条，因为<code>2 + 3</code>是一个表达式
        <h3 id="formal" className={classMap.articleSubTitle}>
          词汇表和语法的正式定义
        </h3>
        还是上面的模型，词汇表定义如下:
        <br />
        <br />
        <Alert
          type="info"
          message={
            <div>
              <div>INTEGER: 0|[1-9][0-9]*</div>
              <div>PLUS: +</div>
              <div>MINUS: -</div>
            </div>
          }
        ></Alert>
        <br />
        <br />
        数字被定义成正则表达式。语法通常被定义为巴科斯范式(Backus–Naur form)，如下：
        <br />
        <br />
        <Alert
          type="info"
          message={
            <div>
              <div>expression := term operation term</div>
              <div>operation := PLUS | MINUS</div>
              <div>term := INTEGER | expression</div>
            </div>
          }
        ></Alert>
        <br />
        <br />
        如果语法是上下文无关的话，语言就可以被规范解释器解析。上下文无关语法(
        <a
          className={classMap.href}
          target="_blank"
          rel="noreferrer"
          href="https://en.wikipedia.org/wiki/Context-free_grammar"
        >
          Context-free grammar
        </a>
        )就是可以完全用BNF表示的语法
        <h3 id="parseType" className={classMap.articleSubTitle}>
          解释器的类型
        </h3>
        <br />
        <br />
        有两种类型的解释器，自顶向下和自底向上。自顶向下检查语法的高级别结构并匹配规则，自底向上从输入开始逐步按语法规则转换，从低级别规则开始到高级别规则。
        还是上面的栗子<code></code>：<br />
        <br />
        自顶向下从高级别规则开始，首先会识别出<code>2 + 3</code>作为表达式，然后再识别<code>2 + 3 - 1</code>作为表达式。
        <br />
        自底向上会扫描输入直到匹配规则成功。
        <h2 id="htmlParser" className={classMap.articleTitle}>
          HTML解析
        </h2>
        HTML语法由W3C organization定义,虽然它有正式的格式定义DTD(Document Type
        Definition)，但它不是上下文无关语法。HTML解释器就是把HTML标记转换为语法树。
        <br />
        <br />
        <h3 id="dtd" className={classMap.articleSubTitle}>
          HTML DTD
        </h3>
        DTD用来定义
        <a className={classMap.href} target="_blank" rel="noreferrer" href="https://zh.wikipedia.org/wiki/SGML">
          SGML(Standard Generalized Markup Language)
        </a>
        家族的语言(XML,HTML),它包括了允许的元素定义，属性和层次。
        <br />
        DTD有一些变种。严格模式只符合定义，但是其他模式包括对以前浏览器使用过标记的支持。目的主要是向后兼容旧内容。
        <h3 id="dom" className={classMap.articleSubTitle}>
          dom
        </h3>
        语法树由DOM(Document Object Modal)元素和属性节点组成，DOM大多数是一对一的标记。
        <br />
        <br />
        <LazyImage src={DOM_TREE} />
        <br />
        <br />
        跟HTML类似，DOM也是W3C组织定义的，地址如下：
        <a className={classMap.href} target="_blank" rel="noreferrer" href="http://www.w3.org/DOM/DOMTR">
          http://www.w3.org/DOM/DOMTR
        </a>
        <h3 id="algo" className={classMap.articleSubTitle}>
          解析算法
        </h3>
        HTML因为种种原因不能用规范的解析技术，浏览器自定义了解释器来解析HTML。算法主要包括两个阶段：词语切分和树的构建。
        <br />
        词语切分就是词法分析，将输入解析为标记，标记的范围是开始tag,结束tag，属性名和属性值。切分器识别到了标记，把它给到树的构造器，然后使用下一个字母来识别下一个标记，直到结束。
        <LazyImage src={HTML_PARSING_FLOW} />
        <h3 id="tokenizationAlgo" className={classMap.articleSubTitle}>
          切分算法
        </h3>
        算法的输出是HTML
        token。算法被表示为状态机，每个状态消费输入流的一个或多个字母，并且更新下一个状态，它会被当前的切分状态和树的构建状态影响，这个算法很复杂，举个栗子。
        <Alert
          type="info"
          message={
            <div>
              <div>{`<html>`}</div>
              <div>&nbsp;{`    <body>Hello World</body>`}</div>
              <div>{`</html>`}</div>
            </div>
          }
        ></Alert>
        <br />
        <br />
        初始状态称为&quot;data state&quot;。当遇到<code>{`<`}</code>时，状态变为&quot;Tag open state&quot;。消费
        <code>a-z</code>字母时创建&quot;Start tag token&quot;，状态变为&quot;Tag name state&quot;。然后保持这个state直到
        <code>{`>`}</code>被消费。每个字母会被追加到token name上。上面的栗子被创建的token就是<code>html</code> token。
        <br />
        <br />
        当遇到<code>{`>`}</code>时,当前token被发出，状态变为&quot;Data state&quot;，然后用同样的步骤对待
        <code>{`<body>`}</code> tag，到现在已经发出了<code>html</code>和<code>body</code> tag，状态又回到了&quot;Data
        state&quot; 开始消费H字母时会创建并发出一个字母token，直到遇到body标记的<code>{`<`}</code>
        ，最后发出一个字母token包括<code>Hello world</code>的每个字母。
        <br />
        <br />
        再回到&quot;Tag open state&quot;。开始消费<code>{`/`}</code>符号时会创建<code>end tag token</code>
        ，状态变为&quot;Tag name state&quot;，保持这个state直到<code>{`>`}</code>，就又发出了一个新的tag
        token，状态变为&quot;Data state&quot;，<div className="code">{`</html>`}</div>的处理也跟之前一样。
        <br />
        <br />
        <LazyImage src={TOKENIZE} />
        <br />
        <br />
        <h3 id="treeAlgo" className={classMap.articleSubTitle}>
          树的构建算法
        </h3>
        第一个mode是&quot;initial mode&quot;，接收<code>html</code>token会触发&quot;before
        html&quot;mode，创建HTMLHtmlElement element，然后追加到根节点上。
        <br />
        然后状态变为&quot;before head&quot;，接收到body token。然后隐式创建HTMLHeadElement并添加到树，尽管没有head
        token。
        <br />
        接着状态变为&quot;in head&quot;，然后再是&quot;after head&quot;，重新处理body
        token，创建并插入HTMLBodyElement，状态随后变为&quot;in body&quot;
        <br />
        接收到Hello world字符token，第一个字符会触发创建&quot;Text&quot;节点，剩余的字母会追加到该节点。
        <br />
        body end token的接收，状态变为&quot;After body&quot; mode。
        <br />
        接收到html end tag进入&quot;after after body&quot; mode。
        <br />
        接收到文件结尾就停止解析。
        <br />
        <br />
        <LazyImage src={TREE_CONSTRUCTION} />
        <h3 id="parseFinished" className={classMap.articleSubTitle}>
          解析完成后的操作
        </h3>
        这个阶段浏览器会标记文档为可交互状态，开始解析<strong>deferred</strong>
        的脚本，这些脚本应该在文档解析完成后执行。然后文档状态会被设置为<strong>complete</strong>，<strong>load</strong>
        事件会开始执行。
        <br />
        <br />
        <a
          className={classMap.href}
          target="_blank"
          rel="noreferrer"
          href="https://html.spec.whatwg.org/multipage/syntax.html#html-parser"
        >
          解析的完整过程在这儿
        </a>
        <h2 id="cssParser" className={classMap.articleTitle}>
          CSS解析
        </h2>
        CSS是上下文无关语法，可以被解释器解析。举个栗子：
        <br />
        规范表达式词法如下：
        {cssWordRules}
        <strong>ident</strong>是identifier的缩写，就像classname。<strong>name</strong>就是元素id
        <br />
        语法BNF描述如下：
        {cssRules}
        <br />
        一个规则集就是如下这种结构
        {cssExample}
        <br />
        <code>div.error</code>和<code>a.error</code>
        是选择器，大括号内部包含了应用到该选择器的规则，这个结构命中了如下规则定义
        {ruleSet}
        <br />
        规则描述：一个或多个选择器，可以用空格(S*表示逗号)和逗号分割。规则集由大括号和内部的一个或多个用分号隔开的描述组成。
        <br />
        <br />
        <LazyImage src={CSS_PARSING} />
        <h2 id="order" className={classMap.articleTitle}>
          加载script和css的顺序
        </h2>
        <h3 id="scripts" className={classMap.articleSubTitle}>
          Scripts
        </h3>
        web的模型是同步的，作者希望解释器遇到<code>script</code>
        标签时立即解析和执行scripts，此时文档的解析会暂停直到script执行完成。
        如果这个script是外部的，资源首先要通过网络请求回来，这也是同步的，解析会暂停直到资源取回完成再开始。开发者可以在script上加上
        <strong>defer</strong>属性，它就不会暂停文档解析，会在文档解析完后再执行。HTML5新增了<strong>async</strong>
        异步属性，它会在另一个线程解析和执行。
        <h3 id="speculative" className={classMap.articleSubTitle}>
          预测解析
        </h3>
        WebKit和Firefox都做了这项优化。当执行script时，另一个线程解析剩下的文档并找出其他需要被加载的网络资源并加载它们。这样资源可以并行的连接上加载，总体速度提升。
        <br />
        值得一提的是，这个预测只解析外部引用资源例如外部script，样式表和图片，它不修改DOM Tree。
        <h3 id="styleSheet" className={classMap.articleSubTitle}>
          样式表
        </h3>
        样式表有另一个模型。概念上样式表不改变DOM
        tree，没理由去等它们，但是样式没有加载和解析的话，会引起很多问题。所以Firefox引擎的优化方式是，在样式表加载和解析的时候，停止scripts。而WebKit只允许scipts访问会影响没有加载的样式表的属性
        <h2 id="renderTree" className={classMap.articleTitle}>
          Render Tree的构建
        </h2>
        当DOM tree创建完成时，浏览器创建另一颗树，render tree，它由要展示的元素按顺序组成，目的是为了按顺序渲染内容。
        <br />
        Firefox称render tree中这些元素为<strong>frame</strong>，WebKit则称为renderer或render object
        <br />
        renderer知道怎么去布局和渲染它自己和它的children，如下是WebKit的RenderObject类定义，它是renderer的父类
        {renderObject}
        每个renderer代表一个矩形区域，对应css的盒子。它包括了几何图形的信息例如宽度，高度和位置。
        <br />
        盒子类型被<strong>display</strong>
        样式属性值影响。以下是WebKit中判断display属性值来决定创建DOM节点的renderer类型的代码
        {display}
        元素类型也是考虑在内的，form和table有特殊处理。在WebKit如果元素想新增特殊renderer，会重写
        <code>createRenderer</code>方法。
        <h3 id="renderTreeRelate" className={classMap.articleSubTitle}>
          Render tree和DOM tree的关系
        </h3>
        虽然renderers和DOM元素一致,但是不是一对一的关系。不可见的DOM元素不会被插入render tree，例如head。 display值为
        <strong>none</strong>也不会出现在树中(然而visibility:hidden会)。
        <br />
        有的DOM元素跟多个object关联，因为它们的结构复杂，单个矩形描述不了。例如<code>select</code>
        元素有三个renderer，一个用于展示区域，一个用于下拉列表盒子，一个用于按钮。
        文本宽度一行不足被强制换行的时候，新行也会新增额外的renderer。
        <br />
        有些render
        objects跟DOM节点对应的位置不一样。Floats和绝对定位元素是脱离文档流的，放置在树的不同位置，定位在实际占位的地方。
        <br />
        <LazyImage src={RELATION} />
        <br />
        <br />
        在WebKit解决样式，创建renderer的进程名为<code>attachment</code>，每个DOM节点都有<code>attach</code>
        方法。Attachment是同步的，节点插入DOM tree时会调用新节点的attach方法。
        <br />
        根节点对应CSS标准的containing
        block，最顶部的块包括所有其他块。它的尺寸就是视口，也就是浏览器窗口展示区域尺寸，WebKit称为
        <code>RenderView</code>。 这就是document指向的render object，树中剩余节点都会当作DOM节点创建并插入。
        <h3 id="styleComputation" className={classMap.articleSubTitle}>
          样式计算
        </h3>
        构建render tree需要计算每个render object的可视属性，这需要计算每个元素的样式属性。
        <br />
        样式包括不同来源的样式表，行内样式和HTML的可视属性(例如<code>bgcolor</code>
        属性)，后面会被转换称对应的CSS样式属性。
        <br />
        样式表的来源有浏览器默认样式表，开发者提供的样式表，还有用户样式表。
        <br />
        样式计算有如下难题：
        <ul>
          <li>1. 样式数据结构很庞大，保持这么庞杂的样式属性，会造成内存问题</li>
          <li>
            2.
            如果没有优化的话，给每一个元素寻找对应的规则会造成性能问题。对每个元素遍历整个规则列表去匹配是一个很重的任务。结构复杂的选择器会造成多次匹配
            <br />
            就像如下的复合规则:
            <br />
            {compound}
            <br />
            这个规则表示div是3个div的子节点。设想一下，如果要检查这个规则是否符合给定的div元素，从头开始遍历节点树，只有1到2个div的不符合规则，又需要重新开始找。
          </li>
          <li>定义规则层次时包括很复杂规则，例如级联。下面看下浏览器怎么面对这些问题。</li>
        </ul>
        <h3 id="share" className={classMap.articleSubTitle}>
          共享样式数据
        </h3>
        WebKit节点引用style
        objects(RenderStyle)，这些对象可以在某些情况下在节点间共享，这些节点是兄弟姐妹节点且满足如下条件：
        <ul className={classMap.ul}>
          <li>元素必须都在同一个鼠标状态下</li>
          <li>元素都不应该有id</li>
          <li>标签名应该匹配</li>
          <li>class属性值应该匹配</li>
          <li>样式属性必须完全一样</li>
          <li>链接状态必须匹配</li>
          <li>focus状态必须匹配</li>
          <li>元素都不能被属性选择器影响</li>
          <li>不能有行内样式</li>
          <li>不能有兄弟选择器，包括+选择器，:first-child，last-child这种</li>
        </ul>
        <h3 id="division" className={classMap.articleSubTitle}>
          分割为结构体
        </h3>
        样式上下文被分割为多个结构体。这些结构体包含某个具体的样式类型信息，例如border和color。所有结构体中的属性要么是继承的要么不是，继承的属性除非是自己定义的不然就是继承自父级，非继承的属性(reset)如果没有定义则使用默认值。
        <h3 id="manipulate" className={classMap.articleSubTitle}>
          简单匹配的操作
        </h3>
        有如下来源的样式：
        <br />
        <ul className={classMap.ul}>
          <li>
            CSS规则，在style元素中或在外部样式表中：
            {`p {color:blue}`}
          </li>
          <li>
            行内样式
            {`<p style="color:blue"></p>`}
          </li>
          <li>
            HTML可视属性
            {`<p bgcolor="blue"></p>`}
          </li>
        </ul>
        后面两个很容易匹配到元素，因为它有样式属性和HTML属性可以用作key。
        <br />
        在解析完样式表后，规则通过选择器加入一些hash
        map中。有以id,classname,tagname作key的map，也有通用的map。比如，如果选择器是id，或者class，那么这些样式会被加入到对应的map，以此类推。
        <br />
        这个操作让匹配元素变得更简单，不需要再去找每一个声明，将相关的规则提取。
        <br />
        举个栗子：
        {hashMapRules}
        第一个规则会插入class map，第二个插入id map,第三个插入tag map。 对于下面的文档碎片：
        {htmlForHash}
        <br />
        <br />
        首先看p元素，它有class属性且值为error，所以在class
        map中p.error规则匹配上了。再看div，因为它有id，同理也是匹配上了id map。
        所以工作变得很简单，只需要在元素匹配的map中去匹配。
        <br />
        WebKit和Firefox都做了这个操作。
        <h3 id="cascade" className={classMap.articleSubTitle}>
          样式表的顺序
        </h3>
        如果属性没有被任何规则定义，那么就会继承一些父级元素的样式，有些属性有默认值。那么问题来了，如果有不止一个定义怎么办呢？
        <br />
        样式表的顺序如下(从低到高)：
        <ul>
          <li>1. 浏览器声明</li>
          <li>2. 用户通常声明</li>
          <li>3. 作者通常声明</li>
          <li>4. 作者important声明</li>
          <li>5. 用户important声明</li>
        </ul>
        <br />
        <br />
        如果声明在同一级别，那么就会按定义的顺序来，详见下文{' '}
        <a className={classMap.href} target="_self" rel="noreferrer" href="#specificity">
          明确定义
        </a>
        。
        <h3 id="specificity" className={classMap.articleSubTitle}>
          明确定义
        </h3>
        <ul>
          <li>
            1. 如果声明来自<code>style</code>属性而不是选择器，+1，否则+0 (=a)
          </li>
          <li>2. id选择器+1 (=b)</li>
          <li>3. 其他选择器和伪类+1 (=c)</li>
          <li>4. 标签名选择器和伪元素+1 (=d)</li>
        </ul>
        将a-b-c-d四个数值连在一起，然后排序。
        <br />
        <br />
        <h2 id="layout" className={classMap.articleTitle}>
          布局
        </h2>
        当renderer创建完成后，它并没有位置和大小，计算它们的过程称为布局或者回流(reflow)。
        <br />
        HTML在layout
        model的基础上使用flow，代表大多数时间都可能在单次计算出几何属性。当前flow元素通常不会影响之前flow中的元素的几何属性，所以文档布局可以从左到右，从上到下执行。例外情况：例如HTML
        <code>table</code>元素可能不止一次计算。
        <br />
        坐标系统和根部框架相关，使用top和left坐标轴。
        <br />
        布局是一个递归的过程。它从根节点开始，对应的就是HTML文档的<code>html</code>
        元素，然后层级递归地给每一个renderer计算几何属性。
        <br />
        根节点的renderer位置是0,0，它的尺寸就是视口viewport，也就是浏览器窗口的可视部分
        <br />
        所有的renderer都有<code>layout</code>，<code>reflow</code>方法，每个renderer给它需要layout的子节点唤起
        <code>layout</code>方法。
        <h3 id="dirtyBit" className={classMap.articleSubTitle}>
          标志位系统
        </h3>
        为了避免一个小小的改变就完整layout，浏览器使用了标志位系统<code>dirty bit system</code>
        。有变化的或者新增的renderer，将它自己和子节点标记为<code>dirty</code>: 需要layout。
        <br />
        有两个flag,<code>dirty</code>和<code>children are dirty</code>表示至少有一个子节点需要layout。
        <h3 id="global" className={classMap.articleSubTitle}>
          全局和增量的布局
        </h3>
        Layout可以发生在整个render树上，这是全局layout。它的发生可能有如下原因：
        <ul>
          <li>
            1. 全局样式改变影响到了所有的renderer，例如<code>fontSize</code>变化
          </li>
          <li>2. 作为屏幕改变了大小的结果</li>
        </ul>
        <br />
        layout可以是增量的，仅当标记为<strong>dirty</strong>的renderer要被展示的时候。例如从网络来的新的内容被添加到DOM
        Tree后，新的renderer追加到render tree中，就会异步触发增量layout。
        <h3 id="async" className={classMap.articleSubTitle}>
          异步和同步layout
        </h3>
        增量layout是异步完成的。WebKit有定时器来执行增量layout。
        <br />
        脚本请求例如<code>offsetHeight</code>这种样式属性可以触发异步的增量layout。
        <br />
        全局layout通常都会异步触发。
        <br />
        有时候因为某些属性，在初始layout之后，layout作为回调函数触发，例如滚动位置的变化。
        <h3 id="optimization" className={classMap.articleSubTitle}>
          优化
        </h3>
        当layout在渲染位置的时候，被<code>resize</code>等事件触发，这些renders的大小会从缓存中获取，不会重新计算。
        <br />
        有些情况子树被修改了，layout也不会从root开始。例如文字被插入文字区域这种，修改只在它自身，不会影响周围。
        <h3 id="layoutProcess" className={classMap.articleSubTitle}>
          布局过程
        </h3>
        layout通常有以下几种模式：
        <ul>
          <li>1. 父级renderer决定它的宽度</li>
          <li>
            2. 父级检查子级
            <ul className={classMap.ul}>
              <li>替换子renderer(重新设置x和y)</li>
              <li>如果有必要，会调用子级的layout - 在被标记为dirty或者在全局layout，或者需要计算子级的高度的情况下</li>
            </ul>
          </li>
          <li>父级用子级累加高度，还有margin和padding来设置自己高度的情况下，layout会被父级使用。</li>
          <li>设置自身的dirty为false时</li>
        </ul>
        <h3 id="widthCalculation" className={classMap.articleSubTitle}>
          宽度计算
        </h3>
        renderer的宽度使用容器的宽度计算，包括<strong>width,margin,border</strong>等属性。
        <br />
        例如以下的div
        {widthCalExample}
        WebKit按如下规则计算：
        <ul className={classMap.ul}>
          <li>
            容器宽度是所有容器的<code>availableWidth</code>和0之中的最大值。这个栗子中<code>availableWidth</code>就是
            <code>contentWidth</code>计算方式如下
            <div className="markdown-container">clientWidth() - paddingLeft() - paddingRight()</div>
          </li>
        </ul>
        <code>clientWidth</code>和<code>clientHeight</code>代表对象内部的宽高，也就是说不包括<code>border</code>和
        <code>scrollbar</code>
        <ul className={classMap.ul}>
          <li>
            元素宽度是<code>width</code>属性时，它会被当作绝对值来计算容器宽度的百分比
          </li>
          <li>
            水平的<code>border</code>和<code>padding</code>被添加了
          </li>
        </ul>
        到目前为止是优先宽度的计算，下面介绍最小和最大的宽度计算。
        <br />
        如果优先宽度大于最大宽度，那么使用最大宽度。如果比最小宽度还小，那就使用最小宽度。
        <h3 id="line" className={classMap.articleSubTitle}>
          换行
        </h3>
        当renderer在布局中途决定需要换行，renderer就会停止并通知父级当前renderer需要被破坏，然后父级就会创建额外的renderer并调用layout。
        <h2 id="painting" className={classMap.articleTitle}>
          渲染
        </h2>
        在渲染阶段，遍历render tree调用每个renderer的<code>paint</code>方法来把内容展示到屏幕上。渲染使用UI基础组件。
        <h3 id="globalAndIncremental" className={classMap.articleSubTitle}>
          全局和增量
        </h3>
        和layout一样，渲染也可以是全局和增量的。增量渲染时，有些renderer的改变不影响整个tree。修改后的renderer使矩形失效了，它会让操作系统识别到它是一个
        <strong>dirty</strong>区域然后生成<code>paint</code>
        事件。操作系统会将多个区域合并为一个。在Chrome中，它的操作更为复杂，展示过程中监听这些事件并且委托消息给根节点，遍历树直到找到相关的renderer，它会重新渲染自身。
        <h3 id="paintingOrder" className={classMap.articleSubTitle}>
          渲染顺序
        </h3>
        CSS标准定义了渲染顺序，它实际上是元素在堆叠上下文中的顺序。堆叠上下文从后往前渲染，它的顺序如下：
        <ul>
          <li>1. background color</li>
          <li>2. background image</li>
          <li>3. border</li>
          <li>4. children</li>
          <li>5. outline</li>
        </ul>
        <h3 id="dynamicChanges" className={classMap.articleSubTitle}>
          动态修改
        </h3>
        浏览器会尽量做最小的动作来响应修改，所以对于元素颜色的修改只会重新绘制它本身，但是对于位置的修改会触发layout，它自身，它的子集，可能还有兄弟节点都会重绘。
        <br />
        新增DOM节点也跟上面一样。
        <br />
        像修改<code>html</code>元素的<code>fontSize</code>这种大的操作，会引起缓存失效，重新布局和绘制整个树。
        <h3 id="thread" className={classMap.articleSubTitle}>
          渲染引擎线程
        </h3>
        除了网络操作，基本上都是单线程的，包括渲染引擎。在Firefox和Safari中，渲染引擎是主线程，在Chrome中是当前tab进程的主线程。
        <br />
        网络操作可以多线程并行执行，并行连接的数量浏览器做了限制，一般是2-6，Chrome就是6。
        <h3 id="eventLoop" className={classMap.articleSubTitle}>
          事件循环
        </h3>
        浏览器主线程是事件循环。它是一个保持进程活跃的无限循环，它等待事件并执行它们，代码如下：
        {eventLoop}
        <h2 id="cssVisualModel" className={classMap.articleTitle}>
          CSS视觉模型
        </h2>
        <h3 id="canvas" className={classMap.articleSubTitle}>
          Canvas
        </h3>
        canvas是一个空间，浏览器将内容绘制到这个空间，生成格式化的结构。
        <h3 id="box" className={classMap.articleSubTitle}>
          CSS盒模型
        </h3>
        <a className={classMap.href} target="_blank" rel="noreferrer" href="http://www.w3.org/TR/CSS2/box.html">
          CSS盒模型
        </a>
        ：视觉格式化模型，它用于在文档树中生成并展示元素。
        <br />
        每个盒子都有内容区域(文字，图片等)和周围的padding,border,margin区域。
        <LazyImage src={BOX} />
        <br />
        <br />
        所有的元素都有<code>display</code>属性，它决定生成什么类型的盒子。
        <ul className={classMap.ul}>
          <li>block: 生成block box</li>
          <li>inline: 生成一个或多个inline boxes</li>
          <li>none: 不会生成</li>
        </ul>
        <br />
        默认类型是inline，但是浏览器的样式表会设置其他默认值,例如<code>div</code>元素的默认值是block。
        <h3 id="position" className={classMap.articleSubTitle}>
          位置方案
        </h3>
        有三种方案：
        <ul className={classMap.ul}>
          <li>Normal: 对象通过它在文档中的位置来定位，它会通过box类型和尺寸来显示。</li>
          <li>Float: 首先会像正常流一样显示，然后会尽量向左或向右移动。</li>
          <li>Absolute: 对象在渲染树的位置和在DOM树的位置不同。</li>
        </ul>
        这些方案都使用<code>position</code>和<code>float</code>属性来设置。
        <ul className={classMap.ul}>
          <li>static和relative是正常文档流</li>
          <li>absolute和fixed是绝对定位</li>
        </ul>
        static表示使用默认position，其他的方案使用top,bottom,left,right来定位。
        <br />
        box展示方式由如下内容决定：
        <ul className={classMap.ul}>
          <li>盒子类型</li>
          <li>盒子位置</li>
          <li>定位方案</li>
          <li>像图片大小和屏幕大小这种外部信息</li>
        </ul>
        <h3 id="boxType" className={classMap.articleSubTitle}>
          盒子类型
        </h3>
        <strong>block</strong>: 由一个block形成，在浏览器窗体内有自己的矩形
        <LazyImage src={BLOCK} />
        <br />
        <strong>inline</strong>: 没有自己的block，被block包含
        <LazyImage src={INLINE} />
        <br />
        block盒子在垂直方向排列，inline的盒子则是水平排列。
        <LazyImage src={BLOCK_INLINE} />
        <br />
        inline盒子放在<strong>line boxes</strong>行盒子内。行盒子至少和最高的盒子一样高，也可以更高。当盒子按
        <strong>baseline</strong>方式对齐，代表元素底部对齐其他盒子的底部。
        <br />
        <LazyImage src={LINES} />
        <h3 id="positioning" className={classMap.articleSubTitle}>
          定位
        </h3>
        <strong>relative</strong>
        <br />
        相对定位：定位和平常一样，然后按规定数值移动
        <LazyImage src={RELATIVE} />
        <br />
        <br />
        <strong>float</strong>
        <br />
        float盒子会漂移到行的左边或者右边，有趣的是其他的盒子围在它的周围。
        {float}
        显示如下：
        <LazyImage src={FLOAT_IMG} />
        <br />
        <strong>absolute和fixed</strong>
        <br />
        元素不参与正常文档流，它们相对父容器来定位。fixed的父容器是viewport。
        <LazyImage src={FIXED} />
        <Alert type="info" message="fixed元素不会随着文档滚动而移动。"></Alert>
        <h3 id="layer" className={classMap.articleSubTitle}>
          层级展示
        </h3>
        层级由<code>z-index</code>属性定义，它代表盒子的三维，也就是z轴的位置。
        <br />
        盒子被分成层级上下文。每层后面的元素会先渲染然后前面的元素在顶部，更靠近用户。在重叠的情况下，最前面的元素会遮住后面的元素。
        <br />
        层级通过<code>z-index</code>属性来排序。当元素没有包含z-index时，排序规则如下（由底到顶）：
        <ul>
          <li>1. 根元素的背景和边界</li>
          <li>2. 普通流的块元素，按HTML中的出现顺序堆叠</li>
          <li>3. 定位元素按HTML中出现的顺序堆叠</li>
        </ul>
        <Alert
          type="info"
          message={
            <ul className={classMap.ul}>
              <li>在一组不含有z-index的同类元素，这些元素按HTML出现的顺序堆叠，不管定位属性如何</li>
              <li>
                普通流中不含定位属性的块元素始终先于定位元素渲染并出现在定位元素的下层，即使出现顺序晚于定位元素。
              </li>
            </ul>
          }
        ></Alert>
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
        <Link href="#htmlParser" title="HTML解析">
          <Link href="#dtd" title="HTML DTD"></Link>
          <Link href="#dom" title="DOM"></Link>
          <Link href="#algo" title="解析算法"></Link>
          <Link href="#tokenizationAlgo" title="切分算法"></Link>
          <Link href="#treeAlgo" title="树的构建算法"></Link>
          <Link href="#parseFinished" title="解析完成后的操作"></Link>
        </Link>
        <Link href="#cssParser" title="CSS解析"></Link>
        <Link href="#order" title="加载scripts和样式表的顺序">
          <Link href="#scripts" title="Scripts"></Link>
          <Link href="#speculative" title="预测解析"></Link>
          <Link href="#styleSheet" title="样式表"></Link>
        </Link>
        <Link href="#renderTree" title="Render Tree的构建">
          <Link href="#renderTreeRelate" title="Render tree和DOM tree的关系"></Link>
          <Link href="#styleComputation" title="样式计算"></Link>
          <Link href="#share" title="共享样式数据"></Link>
          <Link href="#division" title="分割为结构体"></Link>
          <Link href="#manipulate" title="简单匹配的操作"></Link>
          <Link href="#cascade" title="样式表的顺序"></Link>
          <Link href="#specificity" title="明确定义"></Link>
        </Link>
        <Link href="#layout" title="布局">
          <Link href="#dirtyBit" title="标志位系统"></Link>
          <Link href="#global" title="全局和增量的布局"></Link>
          <Link href="#optimization" title="优化"></Link>
          <Link href="#layoutProcess" title="布局过程"></Link>
          <Link href="#widthCalculation" title="宽度计算"></Link>
          <Link href="#line" title="换行"></Link>
        </Link>
        <Link href="#painting" title="渲染">
          <Link href="#globalAndIncremental" title="全局和增量"></Link>
          <Link href="#paintingOrder" title="渲染顺序"></Link>
          <Link href="#dynamicChanges" title="动态修改"></Link>
          <Link href="#thread" title="渲染引擎线程"></Link>
          <Link href="#eventLoop" title="事件循环"></Link>
        </Link>
        <Link href="#cssVisualModel" title="CSS视觉模型">
          <Link href="#canvas" title="Canvas"></Link>
          <Link href="#box" title="CSS盒模型"></Link>
          <Link href="#position" title="位置方案"></Link>
          <Link href="#boxType" title="盒子类型"></Link>
          <Link href="#positioning" title="定位"></Link>
          <Link href="#layer" title="层级展示"></Link>
        </Link>
      </Anchor>
    </article>
  );
}
