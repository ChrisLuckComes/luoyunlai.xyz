import { classMap } from '@/constants/constant';
import { Anchor } from 'antd';
import { UseMarkDown } from '@/hooks/useMarkdown';
import { LazyImage } from '@/component/image';
import RISK from '@images/knowledge/risks.png';
import { SQL_1, CODE_1, XSS_HTML } from './_safety';
import { useEffect, useLayoutEffect, useReducer, useState } from 'react';

const { Link } = Anchor;

export default function Index() {
  const [markdowns, setMarkdowns] = useState({
    sql_1: <></>,
    code_1: <></>,
    xssHtml: <></>
  });

  useEffect(() => {
    setMarkdowns(() => {
      return {
        sql_1: <UseMarkDown markdown={SQL_1}></UseMarkDown>,
        code_1: <UseMarkDown markdown={CODE_1}></UseMarkDown>,
        xssHtml: <UseMarkDown markdown={XSS_HTML}></UseMarkDown>
      };
    });
  }, []);

  return (
    <article id="root" className={classMap.article}>
      <main className={classMap.content}>
        <h2 id="pre" className={classMap.articleTitle}>
          常见Web应用安全漏洞及应对手段
        </h2>
        攻击者可能有很多不同的路径来突破你的应用来搞破坏，路径图如下：
        <LazyImage src={RISK}></LazyImage>
        <br />
        <br />
        以下列举一些常见的漏洞和应对手段
        <h2 id="injection" className={classMap.articleTitle}>
          注入
        </h2>
        几乎所有源数据都可以被作为注入媒介，环境变量，参数，微服务，各种用户等。它们发生在未信任的数据被用于命令或查询的情况。攻击者的有害数据可以执行非计划之内的命令，在未授权的情况下访问数据。
        注入漏洞是普遍现象，特别是遗留代码里，经常在SQL,NOSQL,OS
        Command,ORM查询等地方发现。该漏洞会造成数据损失，被篡改，严重的情况下会被完全接管。
        <br />
        <h3 id="weakness1" className={classMap.articleSubTitle}>
          漏洞
        </h3>
        具有以下弱点的应用容易被攻击
        <ul className={classMap.ul}>
          <li>1. 用户提供的数据没有合法化，未过滤，或者净化。</li>
          <li>2. 动态查询或者未参数化的调用没有经过上下文感知转义就被解释器使用</li>
          <li>3. 未信任的数据被ORM使用提取敏感数据</li>
          <li>4. 未信任的数据直接使用或者用于连接,例如包含未信任数据的SQL语句或者命令的动态查询，命令，存储过程等</li>
        </ul>
        <h3 id="example1" className={classMap.articleSubTitle}>
          案例
        </h3>
        <ul className={classMap.ul}>
          <li>
            1. 如下使用未信任数据的SQL，即使使用ORM框架，也是不安全的：
            {markdowns.code_1}
          </li>
          <li>
            2. 结合上面的例子，攻击者将如下链接id参数值改为{`'or '1'='1`}：<br />
            <strong>{`http://example.com/app/accountView?id=' or '1'='1`}</strong>
            <br />
          </li>
        </ul>
        上述操作可以查到所有的accounts表的数据，更危险的就是篡改或删除数据。
        <h3 id="prevent1" className={classMap.articleSubTitle}>
          防御手段
        </h3>
        主要就是保持数据与命令和查询分离。
        <ul className={classMap.ul}>
          <li>优先使用安全API</li>
          <li>服务端使用白名单做输入验证</li>
          <li>对于特殊字符转义，例如需要进行URL传参时，需要先转义甚至加密。</li>
          <li>SQL用limit等控制，避免SQL注入发生后大量数据泄露</li>
        </ul>
        <h2 id="brokenAuth" className={classMap.articleTitle}>
          破解认证
        </h2>
        攻击者会大量尝试，例如使用凭证填充，默认管理员用户，自动暴力破解，字典攻击工具等。如果被破解成功，后果难以设想，冒充身份，财物损失，敏感信息泄露等。
        <h3 id="weakness2" className={classMap.articleSubTitle}>
          漏洞
        </h3>
        确认用户身份，鉴权，以及会话管理是保护这类攻击的关键。具有以下弱点的应用容易被攻击
        <ul className={classMap.ul}>
          <li>1. 放任自动化攻击或暴力破解</li>
          <li>
            2. 允许默认/弱/知名密码，例如<strong>123456,password,admin/admin</strong>
          </li>
          <li>3. 密码找回过程太弱或者无效</li>
          <li>
            4. 在URL中暴露了<code>sessionId</code>
          </li>
          <li>5. 在过期的或者登出的动作之后，session或者token没有正确的无效处理。</li>
          <li>6. 缺少多种认证方式</li>
        </ul>
        <h3 id="example2" className={classMap.articleSubTitle}>
          案例
        </h3>
        <ul>
          <li>1. 没有防护的情况下，使用常用密码表多次提交尝试破解</li>
          <li>2. 很多攻击发生在只有密码作为唯一认证手段的地方</li>
          <li>3. session的过期时间设置不正确</li>
        </ul>
        <h3 id="prevent2" className={classMap.articleSubTitle}>
          防御手段
        </h3>
        <ul className={classMap.ul}>
          <li>尽量使用多因子认证，例如短信验证码等无法被破解的方式。</li>
          <li>不要使用默认密码，尤其是管理员</li>
          <li>禁止使用弱密码</li>
          <li>
            确保注册、恢复等API加强了对使用相同消息进行枚举攻击的防御措施，例如对同一账号限制或延迟错误登录尝试，并记录失败操作
          </li>
          <li>
            在服务端管理session，登录之后生成熵值高的随机sessionId。sessionId不能在URL中，需要被安全的存储，而且在超时、闲置或登出后需要作废
          </li>
        </ul>
        <h2 id="sensitiveData" className={classMap.articleTitle}>
          敏感信息泄露
        </h2>
        这可能是最常见的有效攻击，相比于直接攻击密钥，攻击者直接在客户端传输数据时通过中间人攻击获得明文信息。常见的漏洞是没有加密敏感信息，然后就是使用的密钥很弱，算法很弱，使用的protocol和cipher都一样，特别是hash保存密码。
        <h3 id="weakness3" className={classMap.articleSubTitle}>
          漏洞
        </h3>
        首先要做的就是保护数据和传输过程，比如关键字段：密码，信用卡号，个人信息等需要额外的保护，特别是受法律保护的。需要确认如下问题：
        <ul className={classMap.ul}>
          <li>是不是有明文传输的数据？例如HTTP协议，外网尤其危险。</li>
          <li>是不是有敏感数据明文保存了，包括备份？</li>
          <li>是否使用了默认密钥，弱密钥，或者重复使用的密钥？有没有密钥管理</li>
          <li>如果不是强制加密，浏览器安全头部是否存在</li>
          <li>客户端有没有认证接收到的服务证书合法性？</li>
        </ul>
        <h3 id="example3" className={classMap.articleSubTitle}>
          案例
        </h3>
        <ul className={classMap.ul}>
          <li>1. 使用数据库自动加密信用卡号，这个并没有什么效果，被注入攻击获取之后会自动解密成明文</li>
          <li>
            2. 没有强制使用HTTPS等加密协议。攻击者可以降级到HTTP协议拦截请求，获取到session
            cookie之后就可以进行攻击，甚至能修改传输的数据
          </li>
          <li>
            3.
            数据库保存密码时未加盐，或者仅仅用了简单的hash算法。未加盐的hash值可以用彩虹表暴露，简单的加盐也会被GPU暴力破解。
          </li>
        </ul>
        <h3 id="prevent3" className={classMap.articleSubTitle}>
          防御手段
        </h3>
        <ul className={classMap.ul}>
          <li>数据要分类保存，区分哪些数据是敏感的。</li>
          <li>如无必要，不要保存敏感数据。</li>
          <li>加密静态敏感数据</li>
          <li>确认强的算法是最新版本，使用正确的key管理</li>
          <li>
            强制使用HTTPS，并且设置安全相关头部。例如
            <code>Strict-Transport-Security: max-age=31536000; includeSubDomains; preload</code>
          </li>
        </ul>
        <h2 id="brokenAccess" className={classMap.articleTitle}>
          破解访问控制
        </h2>
        源码分析和漏洞扫描工具可以侦测到缺少访问控制也不能认证的地方。
        <h3 id="weakness4" className={classMap.articleSubTitle}>
          漏洞
        </h3>
        通常访问控制有如下弱点：
        <ul className={classMap.ul}>
          <li>通过修改URL，应用内部状态，或者HTML页面，来通过访问控制</li>
          <li>允许主键修改。</li>
          <li>出现权限提升，在未登录的情况下作为用户，或者登录之后作为管理员</li>
          <li>元数据控制，例如重放或者篡改JWT(Json Web Token)</li>
          <li>CORS错误设置，允许未认证的API访问。</li>
          <li>POST,PUT,DELETE请求API没有做访问控制</li>
        </ul>
        <h3 id="example4" className={classMap.articleSubTitle}>
          案例
        </h3>
        <ul className={classMap.ul}>
          <li>
            1. 有如下URL：<code>http://example.com/app/accountInfo?acct=notmyacct</code>
            发起get请求，如果服务端程序没有认证，直接使用该参数，那么攻击者只需要修改acct的值就可以获取任何人的账号信息，例如如下代码：
            {markdowns.code_1}
          </li>
          <li>2. 简单的修改一下URL，可以跳转到与权限不符的页面。</li>
        </ul>
        <h3 id="prevent4" className={classMap.articleSubTitle}>
          防御手段
        </h3>
        <ul className={classMap.ul}>
          <li>1. 意外的资源访问默认拒绝</li>
          <li>2. 访问控制应该强制记录所有者</li>
          <li>3. 禁用服务器资源列表，确定文件元数据和备份数据不在web根目录展示。</li>
          <li>4. 登出以后，JWT tokens应被废弃。</li>
          <li>5. 特殊业务的限制必要条件应该被强制执行</li>
        </ul>
        <h2 id="xss" className={classMap.articleTitle}>
          跨站脚本(Cross-Site Scripting)
        </h2>
        XSS也是最常见的问题，自动化工具可以找到一些XSS的问题，特别是成熟的技术。反射型和DOM
        XSS影响比较温和，存储型XSS就很严峻，可以在受害者的浏览器执行远程代码，例如窃取凭证，发送恶意软件给受害者。
        <h3 id="weakness5" className={classMap.articleSubTitle}>
          漏洞
        </h3>
        有三种类型的XSS，经常命中用户的浏览器：
        <ul className={classMap.ul}>
          <li>
            <strong>反射型XSS</strong>
            ：程序或者API包含未验证的或者未转义的用户输入作为HTML输出。典型的情况是用户需要和可疑链接交互，链接指向攻击者控制下的页面，例如恶意网站，广告等。
          </li>
          <li>
            <strong>存储型CSS</strong>：程序或者API保存了未净化的用户输入。
          </li>
          <li>
            <strong>DOM XSS</strong>: JS库，单页面应用，API动态引入了攻击者控制的数据
          </li>
        </ul>
        典型的XSS攻击包括劫持session，接管账号，替换DOM节点或污染，攻击用户浏览器下载恶意软件，按键记录等客户端攻击。
        <h3 id="example5" className={classMap.articleSubTitle}>
          案例
        </h3>
        <ul className={classMap.ul}>
          <li>
            在HTML片段内没有经过校验或转义使用未信任的数据：
            {markdowns.xssHtml}
          </li>
        </ul>
        <Anchor className="anchor" getContainer={() => document.getElementById('content') as HTMLElement}>
          <Link href="#injection" title="注入">
            <Link href="#weakness1" title="漏洞"></Link>
            <Link href="#example1" title="案例"></Link>
            <Link href="#prevent1" title="防御手段"></Link>
          </Link>
          <Link href="#brokenAuth" title="破解认证">
            <Link href="#weakness2" title="漏洞"></Link>
            <Link href="#example2" title="案例"></Link>
            <Link href="#prevent2" title="防御手段"></Link>
          </Link>
          <Link href="#sensitiveData" title="敏感信息泄露">
            <Link href="#weakness3" title="漏洞"></Link>
            <Link href="#example3" title="案例"></Link>
            <Link href="#prevent3" title="防御手段"></Link>
          </Link>
          <Link href="#brokenAccess" title="破解访问控制">
            <Link href="#weakness4" title="漏洞"></Link>
            <Link href="#example4" title="案例"></Link>
            <Link href="#prevent4" title="防御手段"></Link>
          </Link>
          <Link href="#xss" title="跨站脚本(XSS)">
            <Link href="#weakness5" title="漏洞"></Link>
            <Link href="#example5" title="案例"></Link>
            <Link href="#prevent5" title="防御手段"></Link>
          </Link>
        </Anchor>
      </main>
    </article>
  );
}
