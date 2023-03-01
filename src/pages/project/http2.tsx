import { classMap } from '@/constants/constant';
import { Anchor } from 'antd';

import HTTP_LISTEN from '@/images/http-listen.png';
import HTTP_CHANGE from '@/images/http-change.png';
import HTTP_FISH from '@/images/http-fish.png';
import HTTPS from '@/images/https.png';
import HTTPS_INSTRUCTION from '@/images/https-instruction.png';
import HTTP2_FRAME from '@/images/http2-frame.png';
import HTTP2_STREAM from '@/images/http2-stream.jpg';
import { NGINX } from '.';
import { UseMarkDown } from '@/hooks/useMarkdown';
import { LazyImage } from '@/component/image';
const { Link } = Anchor;

export default function Index() {
  return (
    <article id="rootActicle" className={classMap.article}>
      <main className={classMap.content}>
        <h1 className={classMap.pageTitle}>http=&gt;https=&gt;http2</h1>
        <div>
          <h2 id="httpDisAdv" className={classMap.articleTitle}>
            http的不足
          </h2>
          <ul className={classMap.ul}>
            <li>
              1.&nbsp;<strong className="text-16">明文</strong>传输,安全性低
            </li>
            <li>
              2.&nbsp;队头<strong className="text-16">阻塞</strong>，如果前面的请求未完成，后续的请求会被阻塞
            </li>
          </ul>
          <br />
          当然http还有其他的不足，例如首部信息冗余等。列举以上两点是为了引出下文的https,http2。
          <h2 id="https" className={classMap.articleTitle}>
            https
          </h2>
          明文传输安全性低主要体现在哪呢？主要是如下三点：
          <ul className={classMap.ul}>
            <li id="listen">
              被<strong>窃听</strong>
              <br />
              <LazyImage src={HTTP_LISTEN} alt="listen" />
            </li>
            <li id="change">
              被<strong>篡改</strong>
              <br />
              <LazyImage src={HTTP_CHANGE} alt="change" />
            </li>
            <li id="fish">
              <strong>冒充</strong>
              <br />
              <LazyImage src={HTTP_FISH} alt="fish" />
            </li>
          </ul>
          https就是为了解决这些安全风险而在的。HTTPS = HTTP + SSL/TLS，通过
          SSL证书来验证服务器的身份，并为浏览器和服务器之间的通信进行加密
          <br />
          <br />
          <LazyImage src={HTTPS} alt="https" />
          <br />
          <LazyImage src={HTTPS_INSTRUCTION} alt="https_instruction" />
          <strong id="legal" className="text-16">
            怎么验证证书合法性？
          </strong>
          <ul className={classMap.ul}>
            <li>
              1. 客户端使用公钥解密签名
              <strong>（服务器对证书正文使用摘要算法生成摘要，并用私钥进行加密生成签名）</strong>
              ，如果证书未被篡改才能解密成功得到摘要A，并使用同样的摘要算法对证书明文进行计算得到B，A跟B一致则验证成功。
            </li>
            <li>2. 比较证书中的域名和请求的域名是否一致</li>
          </ul>
          <strong id="disAdv" className="text-16">
            HTTPS缺点
          </strong>
          <ul className={classMap.ul}>
            <li>1. 需要进行加解密算法，性能开销大</li>
            <li>2. 一般需要收费 💸，越贵功能越强大</li>
          </ul>
          <h2 id="http2" className={classMap.articleTitle}>
            http2
          </h2>
          <p>http2是http1.x的升级版，协议依然是http，加密依然是https</p>
          <br />
          <strong id="frame" className="text-16">
            帧结构
          </strong>
          <p>
            HTTP2相比于HTTP1.1（文本）使用了二进制进行数据传输，提高了HTTP的传输效率，同时也方便了使用位运算对HTTP数据进行解析。
          </p>
          <br />
          <LazyImage src={HTTP2_FRAME} alt="frame" />
          <br />
          <strong id="stream" className="text-16">
            并发传输
          </strong>
          <br />
          <p>
            并发传输解决了应用层队头阻塞的问题，通过多个Stream（由帧组成）复用一条TCP连接来实现，每个Stream都有ID，也避免了握手建立连接、冷启动的耗时
          </p>
          <br />
          <LazyImage src={HTTP2_STREAM} alt="stream" />
          <br />
          <br />
          <strong id="other" className="text-16">
            其他优点
          </strong>
          <p>头部压缩,服务器推送等</p>
          <h2 id="nginx" className={classMap.articleTitle}>
            nginx配置
          </h2>
          开启http2非常简单，在listen 443 ssl后面追加http2就行，需要有 <code>http_v2_module</code>{' '}
          模块，否则需要重新安装更高版本的nginx
          <UseMarkDown markdown={NGINX}></UseMarkDown>
        </div>
      </main>

      <Anchor className="anchor" getContainer={() => document.getElementById('content') as HTMLElement}>
        <Link href="#httpDisAdv" title="http不足" />
        <Link href="#https" title="https">
          <Link href="#listen" title="被窃听" />
          <Link href="#change" title="被篡改" />
          <Link href="#fish" title="冒充" />
          <Link href="#legal" title="验证证书合法性" />
          <Link href="#disAdv" title="缺点" />
        </Link>
        <Link href="#http2" title="http2">
          <Link href="#frame" title="帧结构" />
          <Link href="#stream" title="并发传输" />
          <Link href="#other" title="其他优点" />
        </Link>
        <Link href="#nginx" title="nginx配置"></Link>
      </Anchor>
    </article>
  );
}
