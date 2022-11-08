import { classMap } from '@/constants/constant';
import { Anchor } from 'antd';
import { UseMarkDown } from '@/hooks/useMarkdown';
const { Link } = Anchor;

import CREATE_SSH from '@/images/createSSH.jpg';
import SETTINGS from '@/images/settings.png';
import NEW_SECRET from '@/images/newSecret.png';
import NEW_WORKFLOW from '@/images/newWorkflow.png';
import SETUP_YOURSELF from '@/images/setUpYourself.png';
import COMMIT_WORKFLOW from '@/images/commitWorkflow.png';
import WORKFLOW from '@/images/workflow.png';

const MY_WORKFLOW = `\`\`\`xml
# 一个workflow，名为deploy to tengxunyun
name: deploy to tencent cloud

on: # 此CI/CD触发时的事件
  push: # 在代码提交时自动触发
    branches:
      - main

# 一个 CI/CD 的工作流有许多 jobs 组成，比如最典型的 job 是 lint，test，build。
jobs: 
  build: # 构建job
    runs-on: ubuntu-latest # 跑workflow的服务器系统
    steps: # job的一系列动作
      # 切换分支获取源码
      - name: Checkout # step的名称，将会在 github action 的控制台中显示
        # 选择一个action，可以理解为若干 steps.run，有利于代码复用
        uses: actions/checkout@main
      # 安装使用 node:16
      - name: use Node.js 16
        uses: actions/setup-node@v1
        with:
          node-version: 16.13.1
      # 运行命令，npm install && npm run build
      - name: npm install and build
        run: |
          npm install
          npm run build
        env:
          CI: true
      # 部署到腾讯云服务器
      - name: Deploy to Server
        uses: easingthemes/ssh-deploy@v2.0.7
        env:
            # 本地.ssh文件下的私钥id_rsa，存在secrets的TOKEN中
            SSH_PRIVATE_KEY: \${{ secrets.TOKEN }} 
            # 复制操作的参数。"-avzr --delete"意味部署时清空服务器目标目录下的文件
            ARGS: "-avzr --delete" 
            # 源目录，相对于$GITHUB_WORKSPACE根目录的路径
            SOURCE: "build/" 
            # 服务器域名
            REMOTE_HOST: "123.123.123.123" 
            # 腾讯云默认用户名为root
            REMOTE_USER: "root" 
            # 目标目录
            TARGET: "/usr/share/nginx/html" 
\`\`\``;

export default function Index() {
  const myWorkflow = <UseMarkDown markdown={MY_WORKFLOW}></UseMarkDown>;

  return (
    <article id="root" className={classMap.article}>
      <h2 id="diff" className={classMap.articleTitle}>
        不会还有人在手动发版吧？不会吧？手把手带你使用Github Actions完成CI/CD自动化部署
      </h2>
      <div className={classMap.assist}>以该repo为例子，部署在腾讯云</div>
      <h2 id="ssh" className={classMap.articleTitle}>
        SSH密钥
      </h2>
      首先需要在云服务器创建密钥，用于后续SSH远程登录
      <img src={CREATE_SSH} />
      <br />
      然后进入github，路径：github/settings/Secrets，已存在的密钥会在这里展示，点击
      <strong>new repository secret</strong>新增，也可以创建环境变量区分不同环境。
      <br />
      <br />
      <img src={SETTINGS} />
      <br />
      <br />
      输入名称和上一步新增的密钥，新增成功
      <br />
      <br />
      <img src={NEW_SECRET} />
      <h2 id="workflow" className={classMap.articleTitle}>
        workflow
      </h2>
      然后进入到actions,点击<strong>New workflow</strong>
      <img src={NEW_WORKFLOW} />
      <br />
      <br />
      有很多模板可供选择，这里我们选择自定义，点击<strong>set up a work yourself</strong>
      <br />
      <br />
      <img src={SETUP_YOURSELF} />
      <br />
      <br />
      文件名按个人喜好来，示例代码在下节，创建完成后，每次对应分支有变动就会触发workflow，完成自动拉取代码打包发布
      <br />
      <br />
      <img src={COMMIT_WORKFLOW} />
      <h2 id="code" className={classMap.articleTitle}>
        代码
      </h2>
      {myWorkflow}
      <h2 id="result" className={classMap.articleTitle}>
        Jobs
      </h2>
      点击工作流可以查看jobs执行情况，到此就大功告成了，从此无需再手动打包复制文件。
      <br />
      <br />
      <img src={WORKFLOW} />
      <Anchor className="anchor" getContainer={() => document.getElementById('content') as HTMLElement}>
        <Link href="#ssh" title="SSH"></Link>
        <Link href="#workflow" title="workflow"></Link>
        <Link href="#code" title="代码"></Link>
        <Link href="#result" title="Jobs"></Link>
      </Anchor>
    </article>
  );
}
