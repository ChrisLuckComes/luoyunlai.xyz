type HandleFunc = (value: unknown) => any;

type Func = (value: unknown) => void;

type Executor = (resolve: Func, reject: Func) => void;

type Status = 'fulfilled' | 'rejected' | 'pending';

export class MyPromise {
  status: Status;
  value: unknown;
  reason: unknown;
  onResolvedCallbacks: Function[] = [];
  onRejectedCallbacks: Function[] = [];

  constructor(executor: Executor) {
    this.status = 'pending';
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];
    let resolve: Func = value => {
      if (this.status === 'pending') {
        this.value = value;
        this.status = 'fulfilled';
        this.onResolvedCallbacks.forEach(func => func());
      }
    };

    let reject: Func = reason => {
      if (this.status === 'pending') {
        this.reason = reason;
        this.status = 'rejected';
        this.onRejectedCallbacks.forEach(func => func());
      }
    };

    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then(onFullfilled?: HandleFunc, onRejected?: HandleFunc) {
    onFullfilled = typeof onFullfilled === 'function' ? onFullfilled : y => y;
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : err => {
            throw err;
          };

    let promise2: MyPromise | null = null;
    if (this.status === 'fulfilled') {
      promise2 = new MyPromise((resolve, reject) => {
        setTimeout(() => {
          try {
            let x = onFullfilled?.(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      });
    }

    if (this.status === 'rejected') {
      promise2 = new MyPromise((resolve, reject) => {
        setTimeout(() => {
          try {
            let reason = onRejected?.(this.reason);
            resolvePromise(promise2, reason, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      });
    }

    if (this.status === 'pending') {
      promise2 = new MyPromise((resolve, reject) => {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFullfilled?.(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0);
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let reason = onRejected?.(this.reason);
              resolvePromise(promise2, reason, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0);
        });
      });
    }

    return promise2;
  }

  all(promiseArr: MyPromise[]) {
    return new MyPromise((resolve, reject) => {
      let arr: any[] = [],
        i = 0;

      function processData(data: any, index: number) {
        arr[index] = data;
        if (++i === arr.length) {
          resolve(arr);
        }
      }

      for (let j = 0; j < promiseArr.length; j++) {
        promiseArr[j].then(data => processData(data, j));
      }
    });
  }
}

function resolvePromise(promise2: MyPromise | null, x: any, resolve: Func, reject: Func) {
  if (promise2 === x) {
    // 防止循环引用
    reject(new TypeError());
  }
  let called = false; //标记是否调用过resolve或者reject
  if (x !== null && (typeof x === 'function' || typeof x === 'object')) {
    try {
      let then = x.then;
      if (typeof then === 'function') {
        then.call(
          x,
          (y: unknown) => {
            if (called) {
              return;
            }
            called = true;
            //递归调用自身，支持链式调用
            resolvePromise(promise2, y, resolve, reject);
          },
          (reason: unknown) => {
            if (called) {
              return;
            }
            called = true;
            reject(reason);
          }
        );
      } else {
        // then只是普通对象
        resolve(x);
      }
    } catch (error) {
      if (called) {
        return;
      }
      called = true;
      reject(error);
    }
  } else {
    if (called) {
      return;
    }
    called = true;
    resolve(x);
  }
}

export const PROMISE_STATUS = `\`\`\`ts
type Status = 'fulfilled' | 'rejected' | 'pending';
type HandleFunc = (value: unknown) => any;
type Func = (value: unknown) => void;
type Executor = (resolve: Func, reject: Func) => MyPromise;

class MyPromise {
  status:Status;
  constructor() {
    this.status = 'pending';
  }
}
\`\`\``;

export const PROMISE_THEN = `\`\`\`ts
type Status = 'fulfilled' | 'rejected' | 'pending';

class MyPromise {
  status:Status;
  value: unknown;
  reason: unknown;
  onResolvedCallbacks: Function[] = [];
  onRejectedCallbacks: Function[] = [];
  
  constructor() {
    this.status = 'pending';
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];
    let resolve: Func = value => {
      if (this.status === 'pending') {
        this.value = value;
        this.status = 'fulfilled';
        this.onResolvedCallbacks.forEach(func => func());
      }
    };

    let reject: Func = reason => {
      if (this.status === 'pending') {
        this.reason = reason;
        this.status = 'rejected';
        this.onRejectedCallbacks.forEach(func => func());
      }
    };

    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then(onFullfilled?: HandleFunc, onRejected?: HandleFunc) {
    onFullfilled = typeof onFullfilled === 'function' ? onFullfilled : y => y;
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : err => {
            throw err;
          };

    let promise2;
    if (this.status === 'fulfilled') {
      promise2 = new MyPromise((resolve, reject) => {
        setTimeout(() => {
          try {
            let x = onFullfilled?.(this.value);
          } catch (error) {
            reject(error);
          }
        }, 0);
      });
    }

    if (this.status === 'rejected') {
      promise2 = new MyPromise((resolve, reject) => {
        setTimeout(() => {
          try {
            let reason = onRejected?.(this.reason);
          } catch (error) {
            reject(error);
          }
        }, 0);
      });
    }

    if (this.status === 'pending') {
      promise2 = new MyPromise((resolve, reject) => {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFullfilled?.(this.value);
            } catch (error) {
              reject(error);
            }
          }, 0);
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let reason = onRejected?.(this.reason);
            } catch (error) {
              reject(error);
            }
          }, 0);
        });
      });
    }

    return promise2;
  }
}
\`\`\``;

export const PROMISE_STRUCT = `\`\`\`ts
type HandleFunc = (value: unknown) => any;

type Func = (value: unknown) => void;

type Executor = (resolve: Func, reject: Func) => void;

type Status = 'fulfilled' | 'rejected' | 'pending';

class MyPromise {
  status: Status;
  value: unknown;
  reason: unknown;
  onResolvedCallbacks: Function[] = [];
  onRejectedCallbacks: Function[] = [];

  constructor(executor: Executor) {
    this.status = 'pending';
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];
    let resolve: Func = value => {
      if (this.status === 'pending') {
        this.value = value;
        this.status = 'fulfilled';
        this.onResolvedCallbacks.forEach(func => func());
      }
    };

    let reject: Func = reason => {
      if (this.status === 'pending') {
        this.reason = reason;
        this.status = 'rejected';
        this.onRejectedCallbacks.forEach(func => func());
      }
    };

    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then(onFullfilled?: HandleFunc, onRejected?: HandleFunc) {
    onFullfilled = typeof onFullfilled === 'function' ? onFullfilled : y => y;
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : err => {
            throw err;
          };

    let promise2: MyPromise | null = null;
    if (this.status === 'fulfilled') {
      promise2 = new MyPromise((resolve, reject) => {
        setTimeout(() => {
          try {
            let x = onFullfilled?.(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      });
    }

    if (this.status === 'rejected') {
      promise2 = new MyPromise((resolve, reject) => {
        setTimeout(() => {
          try {
            let reason = onRejected?.(this.reason);
            resolvePromise(promise2, reason, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      });
    }

    if (this.status === 'pending') {
      promise2 = new MyPromise((resolve, reject) => {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFullfilled?.(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0);
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let reason = onRejected?.(this.reason);
              resolvePromise(promise2, reason, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0);
        });
      });
    }

    return promise2;
  }
}

function resolvePromise(promise2: MyPromise | null, x: any, resolve: Func, reject: Func) {
  if (promise2 === x) {
    // 防止循环引用
    reject(new TypeError());
  }
  let called = false; //标记是否调用过resolve或者reject
  if (x !== null && (typeof x === 'function' || typeof x === 'object')) {
    try {
      let then = x.then;
      if (typeof then === 'function') {
        then.call(
          x,
          (y: unknown) => {
            if (called) {
              return;
            }
            called = true;
            //递归调用自身，支持链式调用
            resolvePromise(promise2, y, resolve, reject);
          },
          (reason: unknown) => {
            if (called) {
              return;
            }
            called = true;
            reject(reason);
          }
        );
      } else {
        // then只是普通对象
        resolve(x);
      }
    } catch (error) {
      if (called) {
        return;
      }
      called = true;
      reject(error);
    }
  } else {
    if (called) {
      return;
    }
    called = true;
    resolve(x);
  }
}
\`\`\``;
