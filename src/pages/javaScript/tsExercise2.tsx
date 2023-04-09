import { classMap } from "@/constants/constant";
import { Anchor } from "antd";
import { UseMarkDown } from "@/hooks/useMarkdown";
import {
  MY_RETURN_TYPE,
  MY_RETURN_TYPE_TITLE,
  OMIT,
  OMIT_TITLE,
  READONLY_2,
  READONLY_2_TITLE
} from "./_tsExercise";
import { Toggle } from "@/component/toggle";
const { Link } = Anchor;

export default function Ts2() {
  const myReturnTypeTitle = (
      <UseMarkDown markdown={MY_RETURN_TYPE_TITLE}></UseMarkDown>
    ),
    returnType = <UseMarkDown markdown={MY_RETURN_TYPE}></UseMarkDown>,
    omitTitle = <UseMarkDown markdown={OMIT_TITLE}></UseMarkDown>,
    omit = <UseMarkDown markdown={OMIT}></UseMarkDown>,
    readOnly2Title = <UseMarkDown markdown={READONLY_2_TITLE}></UseMarkDown>,
    readOnly2 = <UseMarkDown markdown={READONLY_2}></UseMarkDown>;
  return (
    <article id="root" className={classMap.article}>
      <main className={classMap.content}>
        <h2 id="diff" className={classMap.articleTitle}>
          GetReturnType
        </h2>
        {myReturnTypeTitle}
        <Toggle content={returnType} />
        使用<code>infer</code>关键字来推导函数的返回值类型
        <h2 id="omit" className={classMap.articleTitle}>
          Omit
        </h2>
        {omitTitle}
        <Toggle content={omit} />
        在Object类型中，key如果是<strong>never</strong>就不会被设置
        <h2 id="readonly2" className={classMap.articleTitle}>
          Readonly 2
        </h2>
        {readOnly2Title}
        <Toggle content={readOnly2} />
      </main>
      <Anchor
        className="anchor"
        getContainer={() => document.getElementById("content") as HTMLElement}
      >
        <Link href="#getReturnType" title="GetReturnType"></Link>
        <Link href="#omit" title="Omit"></Link>
        <Link href="#readonly2" title="Readonly 2"></Link>
      </Anchor>
    </article>
  );
}
