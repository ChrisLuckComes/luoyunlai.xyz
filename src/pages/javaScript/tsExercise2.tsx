import { classMap } from "@/constants/constant";
import { Anchor } from "antd";

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

import { Toggle } from "@/component/toggle";
import { ExerciseItem } from "@/component/exerciseItem";
const { Link } = Anchor;

export default function Ts2() {
  return (
    <article id="root" className={classMap.article}>
      <main className={classMap.content}>
        <ExerciseItem
          id="getReturnType"
          name="GetReturnType"
          source={returnType}
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
        <ExerciseItem id="unshift" name="unshift" source={unshift} />
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
      <Anchor
        className="anchor"
        getContainer={() => document.getElementById("content") as HTMLElement}
      >
        <Link href="#getReturnType" title="GetReturnType"></Link>
        <Link href="#omit" title="Omit"></Link>
        <Link href="#readonly2" title="Readonly 2"></Link>
        <Link href="#deepReadonly" title="DeepReadonly"></Link>
        <Link href="#tupleToUnion" title="Tuple To Union"></Link>
        <Link href="#last" title="Last"></Link>
        <Link href="#pop" title="Pop"></Link>
        <Link href="#push" title="Push"></Link>
        <Link href="#shift" title="Shift"></Link>
        <Link href="#unshift" title="unshift"></Link>
        <Link href="#chainableOptions" title="Chainable Options"></Link>
      </Anchor>
    </article>
  );
}
