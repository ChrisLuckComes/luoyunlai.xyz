interface RequestOptions extends RequestInit {
  timeout: number;
  retry: number;
  retryDelay: number;
}

// 创建一个 AbortController 实例，用于控制请求的取消
const controller = new AbortController();
// 设置默认的配置，例如方法、头部、超时、重试次数、重试间隔等
const defaultOptions: RequestOptions = {
  method: "GET",
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 10000,
  retry: 3,
  retryDelay: 1000
};

// 封装 fetch 的函数，接受一个 url 和一个可选的配置对象作为参数
export async function request(
  url: string,
  options: Partial<RequestOptions> = {}
) {
  // 合并默认的配置和用户传入的配置
  const finalOptions = { ...defaultOptions, ...options };
  finalOptions.signal = controller.signal;

  // 返回一个对象，包含一个 Promise 对象和一个 cancel 方法
  return new Promise(async (resolve, reject) => {
    // 定义一个重试的函数，接受一个剩余重试次数作为参数
    const retryFetch = async (remainingRetry: number) => {
      try {
        // 创建一个定时器，用于处理超时情况
        const timer = setTimeout(() => {
          // 取消请求
          controller.abort();
          // 抛出一个错误对象，表示请求超时
          throw new Error("Request timeout");
        }, finalOptions.timeout);
        // 调用原生的 fetch 函数，传入 url 和 finalOptions，并等待响应
        const response = await fetch(url, finalOptions);
        // 清除定时器
        clearTimeout(timer);
        // 检查响应的状态码，如果是 2xx，表示成功，否则表示失败
        if (response.ok) {
          // 根据响应的内容类型，解析响应体为相应的格式，例如 json、text、blob 等
          const contentType = response.headers.get("Content-Type") ?? "";
          if (contentType.includes("application/json")) {
            const data = await response.json();
            resolve(data);
          } else if (contentType.includes("text/plain")) {
            const data = await response.text();
            resolve(data);
          } else if (contentType.includes("image/")) {
            const data = await response.blob();
            resolve(data);
          } else {
            // 其他类型的响应体，可以根据需要添加
            resolve(response);
          }
        } else {
          // 如果响应状态码不是 2xx，抛出一个错误对象，包含状态码和状态文本
          throw new Error(`${response.status} ${response.statusText}`);
        }
      } catch (error) {
        // 如果发生任何错误，判断是否需要重试
        let err = error as Error;
        if (remainingRetry > 0 && err.name !== "AbortError") {
          // 如果剩余重试次数大于0，并且错误不是由取消请求引起的，则进行重试
          // 使用 setTimeout 延迟一段时间后再调用 retryFetch 函数，并将剩余重试次数减一
          setTimeout(() => {
            retryFetch(remainingRetry - 1);
          }, finalOptions.retryDelay);
        } else {
          // 如果不需要重试或者达到最大重试次数，则将错误对象作为结果传递给 Promise 的 reject 函数
          reject(err);
        }
      }
    };
    // 调用重试函数，传入初始的重试次数
    await retryFetch(finalOptions.retry);
  });
}

// 取消请求的函数
export function cancel() {
  controller.abort();
}
