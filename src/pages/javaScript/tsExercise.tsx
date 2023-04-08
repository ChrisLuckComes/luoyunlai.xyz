import { classMap } from "@/constants/constant";
import { Anchor } from "antd";
import { UseMarkDown } from "@/hooks/useMarkdown";
import {
  AWAITED,
  CONCAT,
  FIRST_OF_ARRAY,
  INCLUDE,
  If,
  LEN,
  MY_EXCLUDE,
  PICK,
  READONLY,
  TUPLE_OBJECT,
  TUPLE_TITLE
} from "./_tsExercise";
import { Toggle } from "@/component/toggle";

const { Link } = Anchor;

export default function Ts() {
  const _if = <UseMarkDown markdown={If}></UseMarkDown>,
    pick = <UseMarkDown markdown={PICK}></UseMarkDown>,
    readonly = <UseMarkDown markdown={READONLY}></UseMarkDown>,
    tupleTitle = <UseMarkDown markdown={TUPLE_TITLE}></UseMarkDown>,
    tupleObject = <UseMarkDown markdown={TUPLE_OBJECT}></UseMarkDown>,
    firstOfArray = <UseMarkDown markdown={FIRST_OF_ARRAY}></UseMarkDown>,
    len = <UseMarkDown markdown={LEN}></UseMarkDown>,
    awaited = <UseMarkDown markdown={AWAITED}></UseMarkDown>,
    concat = <UseMarkDown markdown={CONCAT}></UseMarkDown>,
    exclude = <UseMarkDown markdown={MY_EXCLUDE}></UseMarkDown>,
    include = <UseMarkDown markdown={INCLUDE}></UseMarkDown>;

  return (
    <article id="root" className={classMap.article}>
      <main className={classMap.content}>
        <h2 id="pre" className={classMap.articleTitle}>
          TypeScript类型体操
        </h2>
        TS想必都不陌生了，练练手吧，巩固基础。
        <h3 id="if" className={classMap.articleSubTitle}>
          If
        </h3>
        实现一个If类型，接收一个条件C，为真时返回类型T，判断为假是返回类型F。C只能是boolean,T和F是任意类型。
        <Toggle content={_if} />
        ts中常规的条件判断一般都用<code>extends xxx</code>
        ，在泛型中可以收窄类型，并且支持三目运算符输出结果
        <h3 id="pick" className={classMap.articleSubTitle}>
          Pick
        </h3>
        实现TS内置Pick，Pick接收类型T，选择出属性K，构造新类型。
        <Toggle content={pick} />
        需要使用<code>keyof T</code>，表示类型K是T中的某一个Key
        <h3 id="if" className={classMap.articleSubTitle}>
          Readonly
        </h3>
        实现内置Readonly，接收一个泛型参数，返回一个所有属性被readonly修饰的类型。
        <Toggle content={readonly} />
        只需要在key前面加<code>readonly</code>关键字就可以了
        <h3 id="tupleToObject" className={classMap.articleSubTitle}>
          TupleToObject
        </h3>
        {tupleTitle}
        <Toggle content={tupleObject} />
        遍历Object类型使用keyof，遍历元组类型使用<code>[number]</code>
        <h3 id="firstOfArray" className={classMap.articleSubTitle}>
          First of Array
        </h3>
        实现一个类型，返回数组第一个值的类型：
        <Toggle content={firstOfArray} />
        除了常规T[0]取值之外，也可以用<code>infer</code>
        关键字。它可以推断某些类型，需要配合<code>extends</code>使用。
        <h3 id="length" className={classMap.articleSubTitle}>
          Length Of Tuple
        </h3>
        创建通用Length，接收一个数组，返回数组长度
        <Toggle content={len} />
        <h3 id="awaited" className={classMap.articleSubTitle}>
          Awaited
        </h3>
        在 TS 中，我们用 Promise 中的 T 来描述这个 Promise
        返回的类型。请你实现一个类型，可以获取这个类型
        <Toggle content={awaited} />
        此处使用<code>infer关键字即可</code>
        ，如果T满足条件，返回R即可，否则返回T，还需要处理嵌套Promise。
        <h3 id="concat" className={classMap.articleSubTitle}>
          Concat
        </h3>
        在类型系统里实现 JavaScript 内置的 Array.concat
        方法，这个类型接受两个参数，返回的新数组类型应该按照输入参数从左到右的顺序合并为一个新的数组。
        <Toggle content={concat} />
        ts也支持...展开运算符
        <h3 id="exclude" className={classMap.articleSubTitle}>
          Exclude
        </h3>
        实现内置的Exclude &lt;T,
        U&gt;类型，但不能直接使用它本身。从联合类型T中排除U的类型成员，来构造一个新的类型。
        <Toggle content={exclude} />
        <h3 id="include" className={classMap.articleSubTitle}>
          Include
        </h3>
        在类型系统里实现 JavaScript 的 Array.includes
        方法，这个类型接受两个参数，返回的类型要么是 true 要么是 false。
        <Toggle content={include} />
        如果不考虑子类型实现比较简单，要考虑的话需要递归去判断，并且要借助其他类型判断是否===
        <h2 id="diff" className={classMap.articleTitle}>
          知识
        </h2>
        <h3 id="type" className={classMap.articleSubTitle}>
          判断类型是否一致
        </h3>
        通常使用<code>extends</code>关键字完成
        <br />
        如果要判断全等，则需要使用Includes中的<code>Equal</code>联合类型。
        <h3 id="infer" className={classMap.articleSubTitle}>
          推断类型
        </h3>
        推断类型需要使用<code>infer</code>
        关键字，infer关键字和extends关键字配合收窄类型之后使用。
        <br />
        例如<code>{`[infer F,...inter R]`}</code>
        F是第一个元素的类型，R为剩余的元素类型。
        <h3 id="traverse" className={classMap.articleSubTitle}>
          遍历
        </h3>
        <ul className={classMap.ul}>
          <li>
            <span>联合类型遍历</span>
            <br />
            <code>type Test&lt;T&gt; = T extends string ? string : never</code>
          </li>
          <li>
            <span>对象的key遍历</span>
            <br />
            <code>type Test&lt;T&gt; = {`[K in keyof T]: T[K]`}</code>
            <div>不想要的key可以返回never</div>
          </li>
          <li>
            <span>数组的遍历</span>
            <br />
            <code>type Test&lt;T&gt; = {`[K in keyof T]: T[K]`}</code>
            <br />
            <code>type Test&lt;T&gt; = {`[K in T[number]]: K`}</code>
          </li>
        </ul>
      </main>
      <Anchor
        className="anchor"
        getContainer={() => document.getElementById("content") as HTMLElement}
      >
        <Link href="#if" title="If"></Link>
        <Link href="#pick" title="Pick"></Link>
        <Link href="#readonly" title="Readonly"></Link>
        <Link href="#tupleToObject" title="TupleToObject"></Link>
        <Link href="#firstOfArray" title="First of Array"></Link>
        <Link href="#length" title="Length Of Tuple"></Link>
        <Link href="#awaited" title="Awaited"></Link>
        <Link href="#concat" title="Concat"></Link>
        <Link href="#exclude" title="Exclude"></Link>
        <Link href="#include" title="Include"></Link>
        <Link href="#know" title="知识">
          <Link href="#type" title="判断类型是否一致"></Link>
          <Link href="#infer" title="推断类型"></Link>
          <Link href="#traverse" title="遍历"></Link>
        </Link>
      </Anchor>
    </article>
  );
}
