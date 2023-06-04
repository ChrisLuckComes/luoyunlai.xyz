import { classMap } from '@/constants/constant';
import { ArticleAnchor } from '@/component/Anchor';
import { UseMarkDown } from '@/hooks/useMarkdown';
import { COMPILER, TOKENIZER, TRANSFORM_SOURCE } from './_babel';

export default function Index() {
  const transformSource = <UseMarkDown markdown={TRANSFORM_SOURCE}></UseMarkDown>,
    compiler = <UseMarkDown markdown={COMPILER}></UseMarkDown>,
    tokenizer = <UseMarkDown markdown={TOKENIZER}></UseMarkDown>;

  return (
    <article id="root" className={classMap.article}>
      <main className={classMap.content}>
        <h1 id="babel" className="font-semibold text-h2 mb-2">
          Babel
        </h1>
        Babel是一个JavaScript工具链，主要用于在当前或者更老的浏览器或环境中将ES2015+的代码转换为向下兼容的JavaScript版本.
        它可以做什么？
        <ul className={classMap.ul}>
          <li id="babel-transform">转换语法</li>
          <li id="babel-polyfill">
            Polyfill(可翻译为补充)当前环境缺失的语法特性，例如通过
            <a className={classMap.href} target="_blank" rel="noreferrer" href="https://github.com/zloirock/core-js">
              core-js
            </a>
            。 那么问题来了，什么是<strong>core-js</strong>?<br />
            <div className="pl-indent">
              <h3 id="core-js" className={classMap.articleSubTitle}>
                core-js
              </h3>
              它是最全面的js标准的polyfill库(说人话，一堆函数)，支持从最前沿的pre-stage
              0阶段到最新的ECMAScript的feature，包括和ECMAScript有关的Web平台，例如<code>URL</code>。它主要是为了
              <code>@babel/preset-env</code>等基于<code>core-js</code>的工具而设计，当然也可以直接导入使用.
              <br />
              它是开发者可以使用现代ECMAScript语法的一个主要原因，很多人都没感知到它的存在，因为有些框架已经将其包含在内了。
            </div>
          </li>
          <li>
            转换源代码，就像这样：
            <br />
            {transformSource}
          </li>
        </ul>
        那么它是怎么实现的呢？
        <h2 id="compiler" className={classMap.articleTitle}>
          编译器
        </h2>
        一个最小的编译器代码结构如下：
        <a
          className={classMap.href}
          target="_blank"
          rel="noreferrer"
          href="https://github.com/jamiebuilds/the-super-tiny-compiler"
        >
          the-super-tiny-compiler
        </a>
        {compiler}
        <h3 id="tokenizer" className={classMap.articleSubTitle}>
          词法分析
        </h3>
        词法分析就是接收原始代码，分割成tokens并返回的过程。tokens就是包含了很多描述独立的语法片段的对象数组，对象可能是数字，字符，标点符号，运算符等。
        {tokenizer}
      </main>
      <ArticleAnchor
        items={[
          {
            title: 'babel',
            key: 'babel',
            href: '#babel',
            children: [
              {
                title: '转换语法',
                key: 'babel-transform',
                href: '#babel-transform'
              },
              {
                title: 'Polyfill',
                key: 'babel-polyfill',
                href: '#babel-polyfill',
                children: [
                  {
                    title: 'core-js',
                    key: 'core-js',
                    href: '#core-js'
                  }
                ]
              }
            ]
          },
          {
            title: '编译器',
            key: 'compiler',
            href: '#compiler',
            children: [
              {
                title: '词法分析',
                key: 'tokenizer',
                href: '#tokenizer'
              },
              {
                title: '语法分析',
                key: 'parser',
                href: '#parser'
              },
              {
                title: '转换',
                key: 'transformer',
                href: '#transformer'
              },
              {
                title: '生成代码',
                key: 'codeGenerator',
                href: '#codeGenerator'
              }
            ]
          },
          {
            title: 'babel相关的库',
            key: 'aboutBabel',
            href: '#aboutBabel'
          }
        ]}
      />
    </article>
  );
}
