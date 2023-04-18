import { classMap } from "@/constants/constant";
import { UseMarkDown } from "@/hooks/useMarkdown";
import {
  GITIGNORE,
  INDEX,
  NPMIGNORE,
  PACKAGE_JSON,
  ROLLUP,
  ROLLUP_SCRIPTS,
  TS_CONFIG
} from ".";

export default function Npm() {
  const gitignore = <UseMarkDown markdown={GITIGNORE}></UseMarkDown>,
    index = <UseMarkDown markdown={INDEX}></UseMarkDown>,
    npmignore = <UseMarkDown markdown={NPMIGNORE}></UseMarkDown>,
    packageJson = <UseMarkDown markdown={PACKAGE_JSON}></UseMarkDown>,
    rollup = <UseMarkDown markdown={ROLLUP}></UseMarkDown>,
    rollupScripts = <UseMarkDown markdown={ROLLUP_SCRIPTS}></UseMarkDown>,
    tsConfig = <UseMarkDown markdown={TS_CONFIG}></UseMarkDown>;

  return (
    <article className={classMap.article}>
      <main className={classMap.content}>
        <h1 className={classMap.pageTitle}>从0到1发布一个npm包</h1>
        <br />
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
            安装必须的依赖rollup：
            <span className={classMap.assist}>
              如果是纯js/ts可以不用rollup，实际上工程多多少少都有依赖，建议使用
            </span>
            <br />
            <code>
              pnpm add rollup @rollup/plugin-commonjs
              @rollup/plugin-node-resolve @rollup/plugin-typescript -D
            </code>
            <br />
            <br />
            新增<strong>rollup.config.js:</strong>
            {rollup}
            <br />
            package.json添加scripts:
            <br />
            {rollupScripts}
          </li>
          <li>
            安装typescript:
            <br />
            <code>pnpm add typescript -D</code>
            <br /> <br />
            新增<strong>tsconfig.json</strong>
            {tsConfig}
          </li>
          <li>
            修改package.json;
            {packageJson}
          </li>
        </ul>
        <h2 className={classMap.articleTitle}>编码</h2>
        <p>
          然后就可以新增src目录开始编码啦，最后只需要在index.ts中export所有成员就OK，/src/index.ts如下：
          {index}
        </p>
        <h2 className={classMap.articleTitle}>发布</h2>
        <ul className={classMap.ul}>
          <li>
            新增.gitignore,.npmignore,我的配置如下
            <br />
            <br />
            <code>.gitingore</code>
            {gitignore}
            <code>.npmignore</code>
            {npmignore}
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
      </main>
    </article>
  );
}
