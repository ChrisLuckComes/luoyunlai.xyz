export const INIT_STATE = `\`\`\`js
export function initState (vm: Component) {
    vm._watchers = []
    const opts = vm.$options
    if (opts.props) initProps(vm, opts.props)
    if (opts.methods) initMethods(vm, opts.methods)
    if (opts.data) {
      initData(vm)
    } else {
      observe(vm._data = {}, true /* asRootData */)
    }
    if (opts.computed) initComputed(vm, opts.computed)
    if (opts.watch && opts.watch !== nativeWatch) {
      initWatch(vm, opts.watch)
    }
  }
\`\`\``;

export const INIT_COMPUTED = `\`\`\`js
const computedWatcherOptions = { lazy: true }

function initComputed (vm: Component, computed: Object) {
    // $flow-disable-line
    const watchers = vm._computedWatchers = Object.create(null)
    // computed properties are just getters during SSR
    const isSSR = isServerRendering()
  
    for (const key in computed) {
      const userDef = computed[key]
      const getter = typeof userDef === 'function' ? userDef : userDef.get
  
      if (!isSSR) {
        // create internal watcher for the computed property.
        watchers[key] = new Watcher(
          vm,
          getter || noop,
          noop,
          computedWatcherOptions //{lazy: true} 缓存标记
        )
      }
  
      if (!(key in vm)) {
        defineComputed(vm, key, userDef)
      }
    }
  }
\`\`\``;

export const DEFINE_COMPUTED = `\`\`\`js
export function defineComputed (
    target: any,
    key: string,
    userDef: Object | Function
  ) {
    const shouldCache = !isServerRendering()
    if (typeof userDef === 'function') {
      sharedPropertyDefinition.get = shouldCache
        ? createComputedGetter(key)
        : createGetterInvoker(userDef)
      sharedPropertyDefinition.set = noop
    } else {
      sharedPropertyDefinition.get = userDef.get
        ? shouldCache && userDef.cache !== false
          ? createComputedGetter(key)
          : createGetterInvoker(userDef.get)
        : noop
      sharedPropertyDefinition.set = userDef.set || noop
    }

    Object.defineProperty(target, key, sharedPropertyDefinition)
  }

  function createComputedGetter (key) {
    return function computedGetter () {
      const watcher = this._computedWatchers && this._computedWatchers[key]
      if (watcher) {
        if (watcher.dirty) {
          watcher.evaluate()
        }
        if (Dep.target) {
          watcher.depend()
        }
        return watcher.value
      }
    }
  }
  
  function createGetterInvoker(fn) {
    return function computedGetter () {
      return fn.call(this, this)
    }
  }
\`\`\``;

export const SHARED_PROPERTY_DEFENITION = `\`\`\`js
const sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
}

export function proxy (target: Object, sourceKey: string, key: string) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  }
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val
  }
  Object.defineProperty(target, key, sharedPropertyDefinition)
}
\`\`\``;

export const INIT_WATCH = `\`\`\`js
function initWatch (vm: Component, watch: Object) {
  for (const key in watch) {
    const handler = watch[key]
    if (Array.isArray(handler)) {
      for (let i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i])
      }
    } else {
      createWatcher(vm, key, handler)
    }
  }
}
\`\`\``;

export const CREATE_WATCHER = `\`\`\`js
function createWatcher (
  vm: Component,
  expOrFn: string | Function,
  handler: any,
  options?: Object
) {
  if (isPlainObject(handler)) {
    options = handler
    handler = handler.handler
  }
  if (typeof handler === 'string') {
    handler = vm[handler]
  }
  return vm.$watch(expOrFn, handler, options)
}
\`\`\``;

export const VUE_WATCH = `\`\`\`js
Vue.prototype.$watch = function (
  expOrFn: string | Function,
  cb: any,
  options?: Object
): Function {
  const vm: Component = this
  if (isPlainObject(cb)) {
    return createWatcher(vm, expOrFn, cb, options)
  }
  options = options || {}
  options.user = true
  const watcher = new Watcher(vm, expOrFn, cb, options)
  if (options.immediate) {
    try {
      cb.call(vm, watcher.value)
    } catch (error) {
      handleError(error, vm, 'callback for immediate watcher ' + watcher.expression)
    }
  }
  return function unwatchFn () {
    watcher.teardown()
  }
}
\`\`\``;

export const GET = `\`\`\`js
/**
 * Evaluate the getter, and re-collect dependencies.
 */
get () {
  pushTarget(this)
  let value
  const vm = this.vm
  try {
    value = this.getter.call(vm, vm)
  } catch (e) {
    if (this.user) {
      handleError(e, vm, 'getter for watcher ' + this.expression)
    } else {
      throw e
    }
  } finally {
    // 如果deep为true，遍历对象，将每一个属性都添加监听
    if (this.deep) {
      traverse(value)
    }
    popTarget()
    this.cleanupDeps()
  }
  return value
}
\`\`\``;

export const RUN = `\`\`\`js
/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
run () {
  if (this.active) {
    const value = this.get()
    if (
      value !== this.value ||
      // 当watch的目标是对象或数组时或者deep为true时，即使触发get获取到的值和this.value一样也会执行回调函数
      isObject(value) ||
      this.deep
    ) {
      // set new value
      const oldValue = this.value
      this.value = value
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue)
        } catch (e) {
          handleError(e, this.vm, 'callback for watcher ' + this.expression)
        }
      } else {
        this.cb.call(this.vm, value, oldValue)
      }
    }
  }
}
\`\`\``;
