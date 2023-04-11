export const EXAMPLE = `\`\`\`js
let promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve(1);
    }, 1000);
  });
  
  async function a() {
    let a = await promise;
    console.log(a);
  }
  
  a();
\`\`\``;

export const ASYNC_OUTPUT = `\`\`\`js
(function (modules) {
    // …… 省略模块化相关辅助函数
})({
    "./app.js": function (module, exports) {
      function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }
        if (info.done) {
          resolve(value);
        } else {
          Promise.resolve(value).then(_next, _throw);
        }
      }
      function _asyncToGenerator(fn) {
        return function () {
          var self = this,
            args = arguments;
          return new Promise(function (resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
              asyncGeneratorStep(
                gen,
                resolve,
                reject,
                _next,
                _throw,
                "next",
                value
              );
            }
            function _throw(err) {
              asyncGeneratorStep(
                gen,
                resolve,
                reject,
                _next,
                _throw,
                "throw",
                err
              );
            }
            _next(undefined);
          });
        };
      }
      var promise = new Promise(function (resolve) {
        setTimeout(function () {
          resolve(1);
        }, 1000);
      });
      function a() {
        return _a.apply(this, arguments);
      }
      function _a() {
        _a = _asyncToGenerator(
          /*#__PURE__*/ regeneratorRuntime.mark(function _callee() {
            var a;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch ((_context.prev = _context.next)) {
                  case 0:
                    _context.next = 2;
                    return promise;
                  case 2:
                    a = _context.sent;
                    console.log(a);
                  case 4:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          })
        );
        return _a.apply(this, arguments);
      }
      a();
    },
  });
  //# sourceMappingURL=bundle.js.map  
\`\`\``;

export const MARK = `\`\`\`js
exports.mark = function (genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype); // 该prototype上拥有["next", "throw", "return"]这些属性用于执行
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };
\`\`\``;

export const WRAP = `\`\`\`js
function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator =
      outerFn && outerFn.prototype instanceof Generator
        ? outerFn
        : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
\`\`\``;

export const MAKE_INVOKE_METHOD = `\`\`\`js
function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
}

function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;
        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);
        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          // 如果record.arg===ContinueSentinel，继续执行循环，直到状态变化。
          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done,
          };
        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }
\`\`\``;

export const GENERATOR_AWAIT = `\`\`\`js
function sleep(seconds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let sec = seconds / 1000;
      console.log(sec);
      resolve(sec);
    }, seconds);
  });
}

function* a() {
  yield sleep(1000);
  yield sleep(2000);
}

function asyncAutomation(genFn) {
  const generator = genFn();

  const _automation = (result) => {
    let nextData = generator.next(result);
    if (nextData.done) {
      return;
    }
    Promise.resolve(nextData.value).then((res) => _automation(res)); //防止yield非promise
  };

  _automation();
}

asyncAutomation(a);
\`\`\``;

export const AWRAP = `\`\`\`js
exports.awrap = function(arg) {
  return { __await: arg };
};
\`\`\``;

export const ASYNC = `\`\`\`js
exports.async = function(innerFn, outerFn, self, tryLocsList) {
  var iter = new AsyncIterator(
    wrap(innerFn, outerFn, self, tryLocsList)
  );

  return exports.isGeneratorFunction(outerFn)
    ? iter // If outerFn is a generator, return the full iterator.
    : iter.next().then(function(result) {
        return result.done ? result.value : iter.next();
      });
};
\`\`\``;

export const INVOKE = `\`\`\`js
function AsyncIterator(generator) {
  function invoke(method, arg, resolve, reject) {
    var record = tryCatch(generator[method], generator, arg);
    if (record.type === "throw") {
      reject(record.arg);
    } else {
      var result = record.arg;
      var value = result.value;
      if (value &&
          typeof value === "object" &&
          hasOwn.call(value, "__await")) {
        return Promise.resolve(value.__await).then(function(value) {
          invoke("next", value, resolve, reject);
        }, function(err) {
          invoke("throw", err, resolve, reject);
        });
      }

      return Promise.resolve(value).then(function(unwrapped) {
        // When a yielded Promise is resolved, its final value becomes
        // the .value of the Promise<{value,done}> result for the
        // current iteration.
        result.value = unwrapped;
        resolve(result);
      }, function(error) {
        // If a rejected Promise was yielded, throw the rejection back
        // into the async generator function so it can be handled there.
        return invoke("throw", error, resolve, reject);
      });
    }
  }

  var previousPromise;

  function enqueue(method, arg) {
    function callInvokeWithMethodAndArg() {
      return new Promise(function(resolve, reject) {
        invoke(method, arg, resolve, reject);
      });
    }

    return previousPromise =
      // If enqueue has been called before, then we want to wait until
      // all previous Promises have been resolved before calling invoke,
      // so that results are always delivered in the correct order. If
      // enqueue has not been called before, then it is important to
      // call invoke immediately, without waiting on a callback to fire,
      // so that the async generator function has the opportunity to do
      // any necessary setup in a predictable way. This predictability
      // is why the Promise constructor synchronously invokes its
      // executor callback, and why async functions synchronously
      // execute code before the first await. Since we implement simple
      // async functions in terms of async generators, it is especially
      // important to get this right, even though it requires care.
      previousPromise ? previousPromise.then(
        callInvokeWithMethodAndArg,
        // Avoid propagating failures to Promises returned by later
        // invocations of the iterator.
        callInvokeWithMethodAndArg
      ) : callInvokeWithMethodAndArg();
  }

  // Define the unified helper method that is used to implement .next,
  // .throw, and .return (see defineIteratorMethods).
  this._invoke = enqueue;
}
\`\`\``;
