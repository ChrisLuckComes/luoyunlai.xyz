export const If = `\`\`\`ts
export type If<C extends boolean, T, F> = C extends true ? T : F;
\`\`\``;

export const PICK = `\`\`\`ts
export type MyPick<T, K extends keyof T> = { [P in K]: T[P] };
\`\`\``;

export const READONLY = `\`\`\`ts
export type MyReadonly<T> = { readonly [K in keyof T]: T[K] };
\`\`\``;

export const TUPLE_TITLE = `\`\`\`ts
传入一个元组类型，将这个元组类型转换为对象类型，这个对象类型的键/值都是从元组中遍历出来。

例如：
const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

type result = TupleToObject<typeof tuple> // expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
\`\`\``;

export const TUPLE_OBJECT = `\`\`\`ts
const tuple = ["tesla", "model 3", "model x", "model y"] as const;

export type TupleObject<T extends readonly any[]> = { [K in T[number]]: K };

type result = TupleObject<typeof tuple>
\`\`\``;

export const FIRST_OF_ARRAY = `\`\`\`ts
export type FirstOfArray<T extends any[]> = T extends [] ? never : T[0];

export type FirstOfArray<T extends any[]> = T extends [infer F, ...infer R]
  ? F
  : never;

type arr = ["a", "b", "c"];

type head1 = FirstOfArray<arr>; // 'a'
\`\`\``;

export const LEN = `\`\`\`ts
export type Length<T extends any[]> = T["length"];
\`\`\``;

export const AWAITED = `\`\`\`ts
export type MyAwaited<T extends Promise<any>> = T extends PromiseLike<infer R>
    ? R extends PromiseLike<any>
    ? MyAwaited<R>
    : R
  : never;

type example = Promise<string>;

type result = MyAwaited<example>; // string
\`\`\``;

export const CONCAT = `\`\`\`ts
export type Concat<T extends any[], K extends any[]> = [...T, ...K];

type a = [1, 2];
type b = [3, "4"];

type c = Concat<a, b>; //[1,2,3,"4"]
\`\`\``;

export const MY_EXCLUDE = `\`\`\`ts
export type MyExclude<T, U> = T extends U ? never : T;

type a = string;

type result = MyExclude<string | number | symbol, string>; // number | symbol
\`\`\``;

export const INCLUDE = `\`\`\`ts
// export type Includes<T extends any[], U> = U extends T[number] ? true : false; // extends不是===，无法判断子类型

export type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <
  T
>() => T extends Y ? 1 : 2
  ? true
  : false;

export type Includes<T extends any[], U> = T extends [infer X, ...infer Rest]
  ? Equal<X, U> extends true
    ? true
    : Includes<Rest, U>
  : false;

type arr = [1, 2, 3, 4];

type b = Includes<arr, 1>;
\`\`\``;

export const MY_RETURN_TYPE_TITLE = `\`\`\`ts
不使用 ReturnType 实现 TypeScript 的 ReturnType<T> 泛型。

例如：
const fn = (v: boolean) => {
    if (v) return 1;
    else return 2;
  };
  
  type a = MyReturnType<typeof fn>; // 1 | 2
\`\`\``;

export const MY_RETURN_TYPE = `\`\`\`ts
export type MyReturnType<T extends (args: any) => any> = T extends (
    args: any
  ) => infer R
    ? R
    : any;
\`\`\``;

export const OMIT_TITLE = `\`\`\`ts
不使用 Omit 实现 TypeScript 的 Omit<T, K> 泛型。

Omit 会创建一个省略 K 中字段的 T 对象。

例如：

interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoPreview = MyOmit<Todo, 'description' | 'title'>

const todo: TodoPreview = {
  completed: false,
}
\`\`\``;

export const OMIT = `\`\`\`ts
export type MyOmit<T, K extends keyof T> = {
    [P in keyof T as P extends K? never : P]: T[P];
};
\`\`\``;

export const READONLY_2_TITLE = `\`\`\`ts
实现一个通用MyReadonly2<T, K>，它带有两种类型的参数T和K。

K指定应设置为Readonly的T的属性集。如果未提供K，则应使所有属性都变为只读，就像普通的Readonly<T>一样。

例如

interface Todo {
  title: string
  description: string
  completed: boolean
}

const todo: MyReadonly2<Todo, 'title' | 'description'> = {
  title: "Hey",
  description: "foobar",
  completed: false,
}

todo.title = "Hello" // Error: cannot reassign a readonly property
todo.description = "barFoo" // Error: cannot reassign a readonly property
todo.completed = true // OK
\`\`\``;

export const READONLY_2 = `\`\`\`js
export type MyReadonly2<T, K extends keyof T> = {
    readonly [P in keyof T as P extends K ? P : never]: T[P];
  } & { [P in keyof T as P extends K ? never : P]: T[P] };
\`\`\``;

export const DeepReadonly_TITLE = `\`\`\`ts
实现一个通用的DeepReadonly<T>，它将对象的每个参数及其子对象递归地设为只读。

您可以假设在此挑战中我们仅处理对象。数组，函数，类等都无需考虑。但是，您仍然可以通过覆盖尽可能多的不同案例来挑战自己。

例如

type X = {
  x: {
    a: 1
    b: 'hi'
  }
  y: 'hey'
}

type Expected = {
  readonly x: {
    readonly a: 1
    readonly b: 'hi'
  }
  readonly y: 'hey'
}

type Todo = DeepReadonly<X> // should be same as \`Expected\`
\`\`\``;

export const DEEP_READ_ONLY = `\`\`\`js
export type DeepReadonly<T> = {
    readonly [K in keyof T]: T[K] extends Record<any, any>
      ? DeepReadonly<T[K]>
      : T[K];
  };
\`\`\``;
