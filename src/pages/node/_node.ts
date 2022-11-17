export const HELLO_NODE = `\`\`\`ts
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log("'Server running at http://' + hostname + ':' + port");
});

\`\`\``;

export const EVENT_LOOP = `\`\`\`sql
   ┌───────────────────────────┐
┌─>           timers          
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       
│  └─────────────┬─────────────┘      ┌───────────────┐
│  ┌─────────────┴─────────────┐      │   incoming:   │
│  │           poll                                        <───┤  connections, │
│  └─────────────┬─────────────┘      │   data, etc.  │
│  ┌─────────────┴─────────────┐      └───────────────┘
│  │           check           
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└─      close callbacks      
    └───────────────────────────┘
\`\`\``;

export const TIMER = `\`\`\`ts
const fs = require('fs');

function someAsyncOperation(callback) {
  // 假设读取文件需要95ms
  fs.readFile('/path/to/file', callback);
}

const timeoutScheduled = Date.now();

setTimeout(() => {
  const delay = Date.now() - timeoutScheduled;

  console.log(delay + 'ms have passed since I was scheduled');
}, 100);

// 执行函数
someAsyncOperation(() => {
  const startCallback = Date.now();

  // 空过，耗时10ms
  while (Date.now() - startCallback < 10) {

  }
});
\`\`\``;
