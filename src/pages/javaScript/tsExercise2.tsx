import { classMap } from "@/constants/constant";
import {
  returnType,
  omit,
  readonly2,
  deepReadonly,
  tupleToUnion,
  last,
  pop,
  push,
  shift,
  unshift,
  chainableOptions
} from "./_tsExercise";

import { ExerciseItem } from "@/component/exerciseItem";
import { ArticleAnchor } from "@/component/Anchor";

export default function Ts2() {
  return (
    <article id="rootArticle" className={classMap.article}>
      <main className={classMap.content}>
        <ExerciseItem
          id="getReturnType"
          name="GetReturnType"
          source={returnType}
          className="font-semibold text-h2 mb-2"
        />
        使用<code>infer</code>关键字来推导函数的返回值类型
        <ExerciseItem id="omit" name="Omit" source={omit} />
        在Object类型中，key如果是<strong>never</strong>就不会被设置
        <ExerciseItem id="readonly2" name="Readonly 2" source={readonly2} />
        需要用&将提供/未提供属性的两个类型合在一起
        <ExerciseItem
          id="deepReadonly"
          name="DeepReadonly"
          source={deepReadonly}
        />
        递归处理对象。
        <ExerciseItem
          id="tupleToUnion"
          name="Tuple To Union"
          source={tupleToUnion}
        />
        使用<code>infer</code>推断类型，配合递归完成。
        <ExerciseItem id="last" name="Last" source={last} />
        <ExerciseItem id="pop" name="Pop" source={pop} />
        <ExerciseItem id="push" name="Push" source={push} />
        <ExerciseItem id="shift" name="Shift" source={shift} />
        <ExerciseItem id="unshift" name="Unshift" source={unshift} />
        <ExerciseItem
          id="chainableOptions"
          name="Chainable Options"
          source={chainableOptions}
        />
        <ul>
          <li>
            1. 链式调用 <br />
            <code>option()</code>
            的返回值仍然是Chainable，并且传入的类型是已存储到的类型。
          </li>
          <li>2. option传参使用泛型，这样可以自行推断取到key,value的类型</li>
          <li>3. Chainable传入类型需要排除当前key，实现覆盖</li>
        </ul>
      </main>
      <ArticleAnchor
        items={[
          {
            title: "GetReturnType",
            key: "getReturnType",
            href: "#getReturnType"
          },
          {
            title: "Omit",
            key: "omit",
            href: "#omit"
          },
          {
            title: "Readonly 2",
            key: "readonly2",
            href: "#readonly2"
          },
          {
            title: "DeepReadonly",
            key: "deepReadonly",
            href: "#deepReadonly"
          },
          {
            title: "Tuple To Union",
            key: "tupleToUnion",
            href: "#tupleToUnion"
          },
          {
            title: "Last",
            key: "last",
            href: "#last"
          },
          {
            title: "Pop",
            key: "pop",
            href: "#pop"
          },
          {
            title: "Push",
            key: "push",
            href: "#push"
          },
          {
            title: "Shift",
            key: "shift",
            href: "#shift"
          },
          {
            title: "Unshift",
            key: "unshift",
            href: "#unshift"
          },
          {
            title: "Chainable Options",
            key: "chainableOptions",
            href: "#chainableOptions"
          }
        ]}
      ></ArticleAnchor>
    </article>
  );
}
