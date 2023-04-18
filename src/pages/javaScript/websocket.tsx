import { classMap } from "@/constants/constant";

import { UseMarkDown } from "@/hooks/useMarkdown";
import { ADAPTER, CLIENT, GATEWAY, MAIN } from "./_websocket";
import { LazyImage } from "@/component/image";

import WS_TEST from "@images/js/ws1.png";
import { ArticleAnchor } from "@/component/Anchor";

export default function Index() {
  const gateway = <UseMarkDown markdown={GATEWAY}></UseMarkDown>,
    adapter = <UseMarkDown markdown={ADAPTER}></UseMarkDown>,
    main = <UseMarkDown markdown={MAIN}></UseMarkDown>,
    client = <UseMarkDown markdown={CLIENT}></UseMarkDown>;

  return (
    <article id="rootArticle" className={classMap.article}>
      <main className={classMap.content}>
        <h2 id="pre" className="font-semibold text-h2 mb-2">
          WebSocket
        </h2>
        <code>WebSocket</code>
        的目标是通过一个长连接实现全双工、双向通信。在JavaScript中创建WebSocket时，一个HTTP请求会发送到服务器以初始化连接。
        服务器响应后，连接使用HTTP的Upgrade头部切换到WebSocket协议，这意味着WebSocket不能通过标准HTTP服务器实现，需要使用专有服务器。
        <br />
        <h3 id="protocol" className={classMap.articleSubTitle}>
          自定义协议
        </h3>
        因为使用了自定义协议，所以不能再使用http://或https://，而要使用ws和wss。使用自定义协议的好处是，客户端和服务器之间可以发送非常少的数据，不会对HTTP造成负担。缺点就是定义协议的时间比jsAPI要长。
        <h2 id="server" className={classMap.articleTitle}>
          服务端实现
        </h2>
        首先需要实现一个ws服务，这里使用Nest.js框架来提供比较方便。
        先上我已经测试成功的
        <a
          className={classMap.href}
          target="_blank"
          rel="noreferrer"
          href="https://github.com/ChrisLuckComes/nest-websocket-demo"
        >
          demo
        </a>
        ，拉一下代码之后<code>pnpm install</code>之后就能跑了.
        <h3 id="nest" className={classMap.articleSubTitle}>
          NestJS
        </h3>
        Nest是一个基于<strong>Node.js</strong>
        的服务端框架，支持TypeScript，底层构建在<strong>Express</strong>
        之上。在全新项目模板上，需要增加三个文件：
        <ul className={classMap.ul}>
          <li>Gateway 实现业务逻辑的地方</li>
          <li>WebSocketAdapter WebSocket适配器</li>
          <li>Module 定义模块</li>
        </ul>
        <strong id="gateway">Gateway</strong>
        <br />
        Nest里的gateway只是一个用<code>@WebSocketGateway()</code>
        装饰器注释的类。主要实现业务逻辑，与平台无关。
        <br />
        新增<strong>ws.gateway.ts</strong>
        文件，端口指定为3002&nbsp;
        <span className={classMap.assist}>
          不能和http端口一样，否则启动会报错
          <code>Error: listen EADDRINUSE: address already in use :::3000</code>
        </span>
        {gateway}
        提供了<code>hello</code>方法，订阅的消息是&quot;Hello&quot;，把它放到
        <code>app.module.ts</code>的<code>providers</code>里。
        <br />
        <br />
        <code>providers: [AppService, EventsGateway]</code>
        <br />
        <br />
        代码还包含了发送消息的方法<code>hello2</code>，参数接收
        <code>@ConnectedSocket() client: WebSocket</code>
        ，client就是与客户端连接的对象，可以用来给客户端发送消息。
        <br />
        <br />
        <strong id="adapter">WebSocketAdapter</strong>
        <br />
        新建文件<strong>ws.adapter.ts</strong>，实现
        <code>WebSocketAdapter</code>
        类。
        {adapter}在<code>bindMessageHandler</code>
        方法中，会将传来的JSON消息解析，然后发送到对应的处理器中，也就是gateway处理。根据
        <code>message.event</code>判断。
        <br />
        最后在<strong>main.ts</strong>使用adapter
        {main}
        <code>npm run start</code>启动项目，开始测试
        <br />
        <br />
        <LazyImage src={WS_TEST} />
        <h2 id="client" className={classMap.articleTitle}>
          客户端实现
        </h2>
        {client}
      </main>
      <ArticleAnchor
        items={[
          {
            title: "WebSocket",
            key: "pre",
            href: "#pre",
            children: [
              {
                title: "自定义协议",
                key: "protocol",
                href: "#protocol"
              }
            ]
          },
          {
            title: "服务端实现",
            key: "server",
            href: "#server",
            children: [
              {
                title: "NestJS",
                key: "nest",
                href: "#nest",
                children: [
                  {
                    title: "Gateway",
                    key: "gateway",
                    href: "#gateway"
                  },
                  {
                    title: "WebSocketAdapter",
                    key: "adapter",
                    href: "#adapter"
                  }
                ]
              }
            ]
          },
          {
            title: "客户端实现",
            key: "client",
            href: "#client"
          }
        ]}
      ></ArticleAnchor>
    </article>
  );
}
