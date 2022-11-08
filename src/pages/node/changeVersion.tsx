import { classMap } from '@/constants/constant';
import { Alert, Anchor } from 'antd';
import { UseMarkDown } from '@/hooks/useMarkdown';
const { Link } = Anchor;

import NVM from '@/images/node/nvm.png';
import NVM_LIST from '@/images/node/nvm-list.png';
import N from '@/images/node/n.png';

const PATH = `\`\`\`shell 
export N_PREFIX=/usr/local
export PATH=$N_PREFIX/bin:$PATH
\`\`\``;

export default function Index() {
  return (
    <article id="root" className={classMap.article}>
      <h2 className={classMap.articleTitle}>光速切换Node.js版本</h2>
      有时候需要Node.js升级或者降级兼容，此时就需要进行切换版本的操作。
      <h2 id="windows" className={classMap.articleTitle}>
        Windows
      </h2>
      <h3 id="nvm" className={classMap.articleSubTitle}>
        安装nvm
      </h3>
      首先需要安装
      <a className={classMap.href} target="_blank" rel="noreferrer" href="https://nvm.uihtm.com/">
        nvm
      </a>
      <br />
      <br />
      <Alert
        message="不要将Node.js安装在带空格的目录下，例如C:/Program files，否则nvm操作会出错。如果已经安装了，请卸载后重装"
        type="warning"
      />
      <br />
      以管理员身份运行cmd，执行<code>nvm</code>，出现命令列表说明安装成功。
      <br />
      <br />
      <img src={NVM} alt="" />
      <br />
      <br />
      <h3 id="nvmList" className={classMap.articleSubTitle}>
        切换版本
      </h3>
      接下来的操作如下:
      <ul>
        <li>
          1. 执行<code>nvm list available</code>，列出最近的版本。
        </li>
        <li>
          2. 选择需要的版本安装，一般会选择最新的LTS版本，执行<code>nvm install 18.12.1</code>
        </li>
        <li>
          3. 安装完成后，执行<code>nvm list</code>可以查看环境中已安装的版本
        </li>
        <li>
          4. 需要切换版本，执行<code>nvm use 18.12.1</code>
        </li>
      </ul>
      <img src={NVM_LIST} />
      <h2 id="linux" className={classMap.articleTitle}>
        Linux/MacOS
      </h2>
      <h3 id="n" className={classMap.articleSubTitle}>
        安装n
      </h3>
      不在windows环境相对简单点，首先执行<code>npm install n -g</code>，用于安装和切换node.js版本
      <br />
      <br />
      安装完成后执行n，如下图，说明安装成功
      <br />
      <br />
      <img src={N} />
      <h3 id="path" className={classMap.articleSubTitle}>
        环境变量
      </h3>
      <code>vim ~/.bash_profile</code>，修改末尾代码设置环境变量
      <UseMarkDown markdown={PATH}></UseMarkDown>
      <code>source ~/.bash_profile</code>，执行使变量生效
      <h3 id="change" className={classMap.articleSubTitle}>
        切换版本
      </h3>
      之后切换版本就很简单了，<code>n 18.12.1</code>，n+版本号就行。
      <Anchor className="anchor" getContainer={() => document.getElementById('content') as HTMLElement}>
        <Link href="#windows" title="Windows">
          <Link href="#nvm" title="安装nvm"></Link>
          <Link href="#nvmList" title="切换版本"></Link>
        </Link>
        <Link href="#linux" title="Linux">
          <Link href="#n" title="安装n"></Link>
          <Link href="#path" title="环境变量"></Link>
          <Link href="#change" title="切换版本"></Link>
        </Link>
      </Anchor>
    </article>
  );
}
