import { classMap } from '@/constants/constant';
import { Alert, Anchor } from 'antd';
import { UseMarkDown } from '@/hooks/useMarkdown';

import SHARE from '@/images/knowledge/share.png';
import STRUCTURE from '@/images/knowledge/structure.webp';
import BASIC_FLOW from '@/images/knowledge/basicFlow.webp';
import MAIN_FLOW from '@/images/knowledge/mainflow.webp';
import MATH_EXPRESSION from '@/images/knowledge/mathExpression.webp';
import PARSE_TREE from '@/images/knowledge/parseTree.webp';
import DOM_TREE from '@/images/knowledge/domTree.webp';
import HTML_PARSING_FLOW from '@/images/knowledge/htmlParseingFlow.webp';
import TOKENIZE from '@/images/knowledge/tokenize.webp';
import TREE_CONSTRUCTION from '@/images/knowledge/treeConstruction.webp';
import { CSS_EXAMPLE, CSS_RULES, CSS_WORD_RULES, RULE_SET } from '.';

const { Link } = Anchor;

export default function Index() {
  const cssRules = <UseMarkDown markdown={CSS_RULES}></UseMarkDown>,
    cssWordRules = <UseMarkDown markdown={CSS_WORD_RULES}></UseMarkDown>,
    cssExample = <UseMarkDown markdown={CSS_EXAMPLE}></UseMarkDown>,
    ruleSet = <UseMarkDown markdown={RULE_SET}></UseMarkDown>;
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
        <br />
        <br />
        <img src={MATH_EXPRESSION} />
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
        <img src={DOM_TREE} />
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
        <img src={HTML_PARSING_FLOW} />
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
        初始状态称为&quot;data state&quot;。当遇到<code>{`/`}</code>时，状态变为&quot;Tag open state&quot;。消费
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
        <img src={TOKENIZE} />
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
        <img src={TREE_CONSTRUCTION} />
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
      </Anchor>
    </article>
  );
}
