export const TIMING = `\`\`\`js
{
    "connectStart": 1667977895145, // http请求向服务器发送链接请求时的时间戳。如果使用了持久连接，和fetchStart相同
    "navigationStart": 1667977895137, // 同一个浏览器上下文中，上一个文档结束时的时间戳。如果没有上一个文档，和fetchStart相同。
    "secureConnectionStart": 0, // 浏览器和服务器开始安全链接握手时的时间戳。如果当前网页不要求安全链接，返回0
    "fetchStart": 1667977895145, // 浏览器准备好使用http请求来获取文档的时间戳。这个时间点会在检查任何缓存之前。
    "domContentLoadedEventStart": 1667977896318, // DomContentLoaded事件触发时的时间戳，所有需要执行的脚本执行完毕。
    "responseStart": 1667977895541, // 浏览器从服务器接受到第一个字节时的时间戳
    "domInteractive": 1667977896149, // dom解析结束，开始加载内嵌资源的时间戳，document.readyState的状态为interactive
    "domainLookupEnd": 1667977895145, // 域名查询结束的时间戳。如果使用了持久链接或本地有缓存，和fetchStart相同
    "responseEnd": 1667977895599, // 浏览器从服务器接受到最后一个字节时的时间戳
    "redirectStart": 0, // 表示第一个http重定向开始时的时间戳。如果没有重定向或者有非同源的重定向，为0
    "requestStart": 1667977895161, // 浏览器向服务器发起http请求或者读取本地缓存时的时间戳，即获取html文档
    "unloadEventEnd": 0, // 上一个文档unload事件结束时的时间戳。如果没有上一个文档，为0
    "unloadEventStart": 0, // 上一个文档unload事件开始时的时间戳。如果没有上一个文档，为0
    "domLoading": 1667977895567, // dom开始解析的时间戳，document.readyState的值为loading
    "domComplete": 1667977897362, // dom解析完成的时间戳，document.readyState的值为complete
    "domainLookupStart": 1667977895145, // 域名查询开始时的时间戳。如果使用了持久连接或本地有缓存，与fetchStart相同
    "loadEventStart": 1667977897362, // load事件触发时的时间戳
    "domContentLoadedEventEnd": 1667977896320, // DOMContentLoaded 事件结束时的时间戳
    "loadEventEnd": 1667977897363, // load事件结束时间戳
    "redirectEnd": 0, // 最后一个http重定向结束时的时间戳。如果没有重定向或者有一个非同源的重定向，为0
    "connectEnd": 1667977895145 // 浏览器和服务器建立连接结束时的时间戳，所有握手和认证过程全部结束。如果使用了持久连接，这个值会和fetchStart相同
}
\`\`\``;
