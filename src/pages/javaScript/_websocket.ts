export const GATEWAY = `\`\`\`ts
import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket
  } from "@nestjs/websockets";
  
  import * as WebSocket from "ws";
  
  @WebSocketGateway(3002)
  export class EventsGateway {
    @SubscribeMessage("hello")
    hello(@MessageBody() data: any): any {
      console.log(data);
      return {
        event: "hello",
        data: \`data: \${data}\`,
        msg: "localhost"
      };
    }
  
    @SubscribeMessage("hello2")
    hello2(@MessageBody() data: any, @ConnectedSocket() client: WebSocket): any {
      console.log(\`收到消息：\${data}\`);
  
      client.send(JSON.stringify({ event: "temp", data: "临时消息" }));
  
      return { event: "hello2", data: data };
    }
  }
  
\`\`\``;

export const ADAPTER = `\`\`\`ts
import { INestApplicationContext, WebSocketAdapter } from "@nestjs/common";
import { MessageMappingProperties } from "@nestjs/websockets";
import { Observable, fromEvent, EMPTY } from "rxjs";
import { mergeMap, filter } from "rxjs/operators";
import * as WebSocket from "ws";

export class WsAdapter implements WebSocketAdapter {
  constructor(app: INestApplicationContext) {}
  create(port: number, options?: any) {
    console.log("ws create");
    return new WebSocket.Server({ port, ...options });
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  bindClientConnect(server: any, callback: Function) {
    console.log(\`ws bindClientConnect: \${server}\`);
    server.on("connection", callback);
  }

  bindMessageHandlers(
    client: WebSocket,
    handlers: MessageMappingProperties[],
    process: (data: any) => Observable<any>
  ) {
    console.log("[waAdapter]有新的连接进来");
    fromEvent(client, "message")
      .pipe(
        mergeMap((data) =>
          this.bindMessageHandler(client, data, handlers, process)
        ),
        filter((result) => result)
      )
      .subscribe((response) => client.send(JSON.stringify(response)));
  }

  bindMessageHandler(
    client: WebSocket,
    buffer,
    handlers: MessageMappingProperties[],
    process: (data: any) => Observable<any>
  ): Observable<any> {
    let message = null;
    try {
      message = JSON.parse(buffer.data);
    } catch (error) {
      console.log("ws解析json出错", error);
      return EMPTY;
    }

    const messageHandler = handlers.find(
      (handler) => handler.message === message.event
    );
    if (!messageHandler) {
      return EMPTY;
    }
    return process(messageHandler.callback(message.data));
  }

  close(server) {
    console.log("ws server close");
    server.close();
  }
}
\`\`\``;

export const MAIN = `\`\`\`ts
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { WsAdapter } from "./adapters/ws.adapter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new WsAdapter(app));
  await app.listen(3000);
}
bootstrap();

\`\`\``;

export const CLIENT = `\`\`\`ts
let socket = new WebSocket("ws://localhost:3002");

socket.onopen = () => {
  console.log("opened");
  socket.send(JSON.stringify({ event: "hello", data: "test" }));
};

socket.onmessage = (event) => {
  console.log(event.data);
};

return () => {
  socket.close();
};
\`\`\``;
