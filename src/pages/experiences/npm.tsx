import React from "react";
import { useMarkDown } from "@/hooks/useMarkdown";

const classMap = {
  pageTitle: "text-h1 font-medium",
  artical: "h-full overflow-y-auto",
  articleTitle: "text-h2 mt-6 mb-2",
  href: "text-sky-400",
  ul: "list-disc list-inside",
  assist: "text-assist",
};

const packageJson = `
~~~json
{
  "name": "dayjs-date-tools",
  "version": "1.0.7-alpha",
  "description": "基于dayjs的时间工具函数",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "files": [
    "dist"
  ],
  "scripts": {
    "dev": "rollup -w -c",
    "cypress:open": "cypress open",
    "build": "rollup -c"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/ChrisLuckComes/dayjs-date-tools.git"
  },
  "keywords": [
    "dayjs",
    "date",
    "rollup",
    "typescript"
  ],
  "author": "ChrisLuckComes",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/ChrisLuckComes/dayjs-date-tools/issues"
  },
  "homepage": "https://github.com/ChrisLuckComes/dayjs-date-tools#readme",
  "dependencies": {
    "dayjs": "^1.10.8"
  },
  "devDependencies": {
    "typescript": "^4.6.2",
    "@rollup/plugin-commonjs": "^21.0.2",
    "@rollup/plugin-node-resolve": "^13.1.3",
    "@rollup/plugin-typescript": "^8.3.1",
    "@typescript-eslint/eslint-plugin": "^5.14.0",
    "@typescript-eslint/parser": "^5.14.0",
    "cypress": "^9.5.1",
    "eslint": "^8.11.0",
    "prettier": "^2.5.1",
    "rollup": "^2.70.0"
  }
}

~~~
`;

const rollup = `
~~~js
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";

export default [
  {
    input: "./src/index.ts",
    output: {
      dir: "dist",
      format: "cjs",
      entryFileNames: "[name].cjs.js",
    },
    plugins: [resolve(), commonjs(), typescript()],
  },
  {
    input: "./src/index.ts",
    output: {
      dir: "dist",
      format: "esm",
      entryFileNames: "[name].esm.js",
    },
    plugins: [resolve(), commonjs(), typescript()],
  },
];

~~~
`;

const rollupScripts = `
~~~json
"dev": "rollup -w -c",
"build": "rollup -c"
~~~
`;

const tsConfig = `
~~~json
{
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig.json to read more about this file */
    /* Basic Options */
    "target": "es5" /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019', 'ES2020', or 'ESNEXT'. */,
    "module": "esnext" /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', 'es2020', or 'ESNext'. */,
    "lib": ["es5", "dom"] /* Specify library files to be included in the compilation. */,
    "declaration": true /* Generates corresponding '.d.ts' file. */,
    "outDir": "dist" /* Redirect output structure to the directory. */,
    /* Strict Type-Checking Options */
    "strict": true /* Enable all strict type-checking options. */,
    "types": ["cypress"] /* Type declaration files to be included in compilation. */,
    "esModuleInterop": true /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */,
    /* Advanced Options */
    "skipLibCheck": true /* Skip type checking of declaration files. */,
    "forceConsistentCasingInFileNames": true /* Disallow inconsistently-cased references to the same file. */
  },
  "include": ["src/", "cypress/"],
}
~~~
`;

const index = `
~~~ts
import {
  getFirstDayAndEndDayOfWeek,
  getFirstDayAndEndDayOfMonth,
  isInRange,
} from "./range/range";

import { isSameOrAfter, isSameOrBefore } from "./tool/tool";

import { Dayjs } from "dayjs";

export type DateParam = string | Date | Dayjs;

export {
  getFirstDayAndEndDayOfWeek,
  getFirstDayAndEndDayOfMonth,
  isInRange,
  isSameOrBefore,
  isSameOrAfter,
};

~~~
`;

const gitignore = `
~~~json
/node_modules/
/dist/
~~~
`;

const npmignore = `
~~~json
node_modules/
src/
.babelrc
.gitignore
.npmignore
cypress/
pnpm-lock.yaml
cypress.json
tsconfig.json
~~~
`;

export default function Npm() {
  return (
    <article className={classMap.artical}>
      <h1 className={classMap.pageTitle}>从0到1发布一个npm包</h1>
      <br />
      <h2 className={classMap.articleTitle}>前言</h2>
      以本人的npm包
      <a
        target="_blank"
        rel="noreferrer"
        className={classMap.href}
        href="https://www.npmjs.com/package/dayjs-date-tools"
      >
        dayjs-date-tools
      </a>
      为例，下文中cypress为测试框架，无需测试可忽略相关内容{" "}
      <span className="text-assist">建议还是先自测再发上去</span>
      <br />
      <h2 className={classMap.articleTitle}>准备工作</h2>
      <div>
        <ul className={classMap.ul}>
          <li>
            分别注册
            <a
              target="_blank"
              rel="noreferrer"
              className={classMap.href}
              href="https://www.npmjs.com/"
            >
              npm
            </a>
            、
            <a
              target="_blank"
              rel="noreferrer"
              className={classMap.href}
              href="https://github.com/"
            >
              github
            </a>
            账号,已有跳过
          </li>
          <li>
            <a
              target="_blank"
              rel="noreferrer"
              className={classMap.href}
              href="https://github.com/new"
            >
              github新增repository
            </a>
          </li>
          <li>
            {" "}
            <code>git clone</code> 代码拉到本地
          </li>
        </ul>
      </div>
      <h2 className={classMap.articleTitle}>工程</h2>
      <ul className={classMap.ul}>
        <li>
          <span>
            npm init 根据实际情况填写字段，完成后会生成一个初始化package.json
          </span>
        </li>
        <li>
          安装必须的依赖rollup：{" "}
          <span className={classMap.assist}>
            如果是纯js/ts可以不用rollup，实际上工程多多少少都有依赖，建议使用
          </span>
          <br />
          <code>
            pnpm add rollup @rollup/plugin-commonjs @rollup/plugin-node-resolve
            @rollup/plugin-typescript -D
          </code>
          <br />
          <br />
          新增<strong>rollup.config.js:</strong>
          {useMarkDown(rollup)}
          <br />
          package.json添加scripts:
          <br />
          {useMarkDown(rollupScripts)}
        </li>
        <li>
          安装typescript:
          <br />
          <code>pnpm add typescript -D</code>
          <br /> <br />
          新增<strong>tsconfig.json</strong>
          {useMarkDown(tsConfig)}
        </li>
        <li>
          修改package.json;
          {useMarkDown(packageJson)}
        </li>
      </ul>
      <h2 className={classMap.articleTitle}>编码</h2>
      <p>
        然后就可以新增src目录开始编码啦，最后只需要在index.ts中export所有成员就OK，/src/index.ts如下：
        {useMarkDown(index)}
      </p>
      <h2 className={classMap.articleTitle}>发布</h2>
      <ul className={classMap.ul}>
        <li>
          新增.gitignore,.npmignore,我的配置如下
          <br />
          <br />
          <code>.gitingore</code>
          {useMarkDown(gitignore)}
          <code>.npmignore</code>
          {useMarkDown(npmignore)}
        </li>
        <li>add commit push git三连提交代码</li>
        <li>
          <span>
            准备发布，一般初始版本号后缀为alpha，如果已存在该版本号需要修改package.json中的version
          </span>
          <br />
          <br />
          输入<code>pnpm login</code>
          接下来输入npmjs.com的账号密码
          <br />
          <br />
          完成后rollup打包生成dist目录用于发布<code>pnpm build</code>
          <br />
          <br />
          最后<code>pnpm publish</code>
        </li>
      </ul>
      <h2 className={classMap.articleTitle}>大功告成</h2>
      发布完成，可以在想要的地方使用自己的npm包啦
    </article>
  );
}
