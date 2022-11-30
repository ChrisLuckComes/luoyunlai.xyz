export const INFO_EXPRESS = `express是一个快速、灵活的轻量级Node.js Web应用程序开发框架，github star数量为59k。`;

export const INFO_KOA = `相比express，koa没有绑定任何中间件，更轻量，按需引用中间件。koa2支持async/await，控制执行顺序和异常处理变得更容易。基于它编写中间件也更简单。它的github star数量为33k。`;

export const APP_USE = `\`\`\` js
app.use("/", indexRouter);

app.use(function (req, res, next) {
  console.log("第一个中间件start");
  setTimeout(() => {
    next();
  }, 1000);
  console.log("第一个中间件end");
});
app.use(function (req, res, next) {
  console.log("第二个中间件start");
  setTimeout(() => {
    next();
  }, 1000);
  console.log("第二个中间件end");
});
app.use("/foo", function (req, res, next) {
  console.log("接口逻辑start");
  next();
  console.log("接口逻辑end");
});
\`\`\``;

export const APP_USE_1 = `\`\`\`js
app.use(function (req, res, next) {
    console.log('第一个中间件start');
    next()
    console.log('第一个中间件end');
});
app.use(function (req, res, next) {
    console.log('第二个中间件start');
    next()
    console.log('第二个中间件end');
});
app.use('/foo', function (req, res, next) {
    console.log('接口逻辑start');
    next();
    console.log('接口逻辑end');
});
\`\`\``;

export const PROTO_USE = `\`\`\`js
proto.use = function use(fn) {
  var offset = 0;
  var path = '/';

  var callbacks = flatten(slice.call(arguments, offset));

  for (var i = 0; i < callbacks.length; i++) {
    var fn = callbacks[i];

    var layer = new Layer(path, {
      sensitive: this.caseSensitive,
      strict: false,
      end: false
    }, fn);

    layer.route = undefined;

    this.stack.push(layer); //重点，将layer push到stack中
  }

  return this;
};

function Layer(path, options, fn) {
  if (!(this instanceof Layer)) {
    return new Layer(path, options, fn);
  }

  debug('new %o', path)
  var opts = options || {};

  this.handle = fn; //handle就是fn本身
  this.name = fn.name || '<anonymous>';
  this.params = undefined;
  this.path = undefined;

}
\`\`\``;

export const PROTO_HANDLE = `\`\`\`js
proto.handle = function handle(req, res, out) {
  var self = this;
  var idx = 0;

  // middlewre and routes
  var stack = self.stack;

  next();

  function next(err) {
    var layerError = err === 'route'
      ? null
      : err;


    // find next matching layer
    var layer;
    var match;
    var route;

    // 循环stack，取出layer并执行
    while (match !== true && idx < stack.length) {
      layer = stack[idx++];
      match = matchLayer(layer, path);
      route = layer.route;

      var method = req.method;
      var has_method = route._handles_method(method);


      // Capture one-time layer values
      req.params = self.mergeParams
        ? mergeParams(layer.params, parentParams)
        : layer.params;
      var layerPath = layer.path;
  
      // 执行layer
      self.process_params(layer, paramcalled, req, res, function (err) {
        if (err) {
          next(layerError || err)
        } else if (route) {
          layer.handle_request(req, res, next)
        } else {
          trim_prefix(layer, layerError, layerPath, path)
        }
  
        sync = 0
      });
    }
  }
}
};
\`\`\``;

export const PROCESS_PARAMS = `\`\`\`js
proto.process_params = function process_params(layer, called, req, res, done) {
  var params = this.params;

  // captured parameters from the layer, keys and values
  var keys = layer.keys;

  // fast track
  if (!keys || keys.length === 0) {
    return done();
  }

  var i = 0;
  var name;
  var paramIndex = 0;
  var key;
  var paramVal;
  var paramCallbacks;
  var paramCalled;

  // 按顺序执行，callbacks可能是异步的
  function param(err) {
    if (err) {
      return done(err);
    }

    if (i >= keys.length ) {
      return done();
    }

    paramIndex = 0;
    key = keys[i++];
    name = key.name;
    paramVal = req.params[name];
    paramCallbacks = params[name];
    paramCalled = called[name];

    if (paramVal === undefined || !paramCallbacks) {
      return param();
    }

    // param previously called with same value or error occurred
    if (paramCalled && (paramCalled.match === paramVal
      || (paramCalled.error && paramCalled.error !== 'route'))) {
      // restore value
      req.params[name] = paramCalled.value;

      // next param
      return param(paramCalled.error);
    }

    called[name] = paramCalled = {
      error: null,
      match: paramVal,
      value: paramVal
    };

    paramCallback();
  }

  // single param callbacks
  function paramCallback(err) {
    var fn = paramCallbacks[paramIndex++];

    // store updated value
    paramCalled.value = req.params[key.name];

    if (err) {
      // store error
      paramCalled.error = err;
      param(err);
      return;
    }

    if (!fn) return param();

    try {
      fn(req, res, paramCallback, paramVal, key.name);
    } catch (e) {
      paramCallback(e);
    }
  }

  param();
};
\`\`\``;

export const LAYER = `\`\`\`js
function Layer(path, options, fn) {
  if (!(this instanceof Layer)) {
    return new Layer(path, options, fn);
  }

  debug('new %o', path)
  var opts = options || {};

  this.handle = fn;
  this.name = fn.name || '<anonymous>';
  this.params = undefined;
  this.path = undefined;
  this.regexp = pathRegexp(path, this.keys = [], opts);

  // set fast path flags
  this.regexp.fast_star = path === '*'
  this.regexp.fast_slash = path === '/' && opts.end === false
}
\`\`\``;

export const COMPOSE = `\`\`\`js
function compose (middleware) {
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
  }

  /**
   * @param {Object} context
   * @return {Promise}
   * @api public
   */

  return function (context, next) {
    // last called middleware #
    let index = -1
    // 递归返回一个函数，返回值为promise对象
    return dispatch(0)
    function dispatch (i) {
      // 防止next多次调用
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      let fn = middleware[i]
      // 最后一个中间件
      if (i === middleware.length) fn = next
      if (!fn) return Promise.resolve()
      // Promise封装中间件，递归调用
      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)))
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}
\`\`\``;

export const KOA_USE = `\`\`\`js
use (fn) {
  if (typeof fn !== 'function') throw new TypeError('middleware must be a function!')
  debug('use %s', fn._name || fn.name || '-')
  this.middleware.push(fn)
  return this
}
callback () {
  const fn = this.compose(this.middleware)

  if (!this.listenerCount('error')) this.on('error', this.onerror)

  const handleRequest = (req, res) => {
    const ctx = this.createContext(req, res)
    return this.handleRequest(ctx, fn)
  }

  return handleRequest
}
listen (...args) {
  debug('listen')
  const server = http.createServer(this.callback())
  return server.listen(...args)
}
\`\`\``;
