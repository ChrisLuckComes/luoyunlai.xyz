export const DEFINE_PROPERTY = `const obj = {}
Object.defineProperty(obj, "a", {
  value : 1,
  writable : false, // 是否可写 
  configurable : false, // 是否可配置
  enumerable : false // 是否可枚举
})
// 上面给了三个false, 下面的相关操作就很容易理解了
obj.a = 2 // 无效
delete obj.a // 无效
for(key in obj){
  console.log(key) // 无效 
}
`;

export const VUE2_2WAY_BIND = `Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      // ...
      if (Dep.target) {
        // 收集依赖
        dep.depend()
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      // ...
      // 通知视图更新
      dep.notify()
    }
  })
`;

export const VUE_SET = `function set (target: Array<any> | Object, key: any, val: any): any {
    // ....
    if (!ob) {
      target[key] = val
      return val
    }
    defineReactive(ob.value, key, val)
    ob.dep.notify()
    return val
}
`;

export const VUE_ARRAY_METHODS_TO_PATCH = `const methodsToPatch = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
  ]
  
  methodsToPatch.forEach(function (method) {
    // 缓存原生数组
    const original = arrayProto[method]
    // def使用Object.defineProperty重新定义属性
    def(arrayMethods, method, function mutator (...args) {
      const result = original.apply(this, args) // 调用原生数组的方法
  
      const ob = this.__ob__  // ob就是observe实例observe才能响应式
      let inserted
      switch (method) {
        // push和unshift方法会增加数组的索引，但是新增的索引位需要手动observe的
        case 'push':
        case 'unshift':
          inserted = args
          break
        // 同理，splice的第三个参数，为新增的值，也需要手动observe
        case 'splice':
          inserted = args.slice(2)
          break
      }
      // 其余的方法都是在原有的索引上更新，初始化的时候已经observe过了
      if (inserted) ob.observeArray(inserted)
      // dep通知所有的订阅者触发回调
      ob.dep.notify()
      return result
    })})
`;

export const CREATE_APP = `export const createApp = ((...args) => {
      const app = ensureRenderer().createApp(...args)
    
      if (__DEV__) {
        injectNativeTagCheck(app)
        injectCompilerOptionsCheck(app)
      }
      const { mount } = app
      app.mount = (containerOrSelector: Element | ShadowRoot | string): any => {
        const container = normalizeContainer(containerOrSelector)
        if (!container) return
        const component = app._component
        if (!isFunction(component) && !component.render && !component.template) {
          // __UNSAFE__
          // Reason: potential execution of JS expressions in in-DOM template.
          // The user must make sure the in-DOM template is trusted. If it's
          // rendered by the server, the template should not contain any user data.
          component.template = container.innerHTML
          // 2.x compat check
          if (__COMPAT__ && __DEV__) {
            for (let i = 0; i < container.attributes.length; i++) {
              const attr = container.attributes[i]
              if (attr.name !== 'v-cloak' && /^(v-|:|@)/.test(attr.name)) {
                compatUtils.warnDeprecation(
                  DeprecationTypes.GLOBAL_MOUNT_CONTAINER,
                  null
                )
                break
              }
            }
          }
        }
        // clear content before mounting
        container.innerHTML = ''
        const proxy = mount(container, false, container instanceof SVGElement)
        if (container instanceof Element) {
          container.removeAttribute('v-cloak')
          container.setAttribute('data-v-app', '')
        }
        return proxy
      }
      return app
    }) as CreateAppFunction<Element>
`;

export const ENSURE_RENDERER = `const rendererOptions = /*#__PURE__*/ extend({ patchProp }, nodeOps)

// lazy create the renderer - this makes core renderer logic tree-shakable
// in case the user only imports reactivity utilities from Vue.
let renderer: Renderer<Element | ShadowRoot> | HydrationRenderer
let enabledHydration = false
function ensureRenderer() {
  return (
    renderer ||
    (renderer = createRenderer<Node, Element | ShadowRoot>(rendererOptions))
  )
}`;

export const CREATE_RENDERER = `export function createRenderer<
  HostNode = RendererNode,
  HostElement = RendererElement
>(options: RendererOptions<HostNode, HostElement>) {
  return baseCreateRenderer<HostNode, HostElement>(options)
}`;

export const BASE_CREATE_RENDERER = `function baseCreateRenderer(
      options: RendererOptions,
      createHydrationFns?: typeof createHydrationFunctions
    ): any {
      // compile-time feature flags check
      if (__ESM_BUNDLER__ && !__TEST__) {
        initFeatureFlags()
      }
    
      const target = getGlobalThis()
      target.__VUE__ = true
      if (__DEV__ || __FEATURE_PROD_DEVTOOLS__) {
        setDevtoolsHook(target.__VUE_DEVTOOLS_GLOBAL_HOOK__, target)
      }
      const {
        insert: hostInsert,
        remove: hostRemove,
        patchProp: hostPatchProp,
        createElement: hostCreateElement,
        createText: hostCreateText,
        createComment: hostCreateComment,
        setText: hostSetText,
        setElementText: hostSetElementText,
        parentNode: hostParentNode,
        nextSibling: hostNextSibling,
        setScopeId: hostSetScopeId = NOOP,
        insertStaticContent: hostInsertStaticContent
      } = options
      //此处省略两千行
      return {
        render,
        hydrate,
        createApp: createAppAPI(render, hydrate)
      }`;

export const CREATE_APP_API = `export function createAppAPI<HostElement>(
      render: RootRenderFunction<HostElement>,
      hydrate?: RootHydrateFunction
    ): CreateAppFunction<HostElement> {
      return function createApp(rootComponent, rootProps = null) {
        if (!isFunction(rootComponent)) {
          rootComponent = { ...rootComponent }
        }
    
        if (rootProps != null && !isObject(rootProps)) {
          __DEV__ && warn('root props passed to app.mount() must be an object.')
          rootProps = null
        }
        const context = createAppContext()
        const installedPlugins = new Set()
        let isMounted = false
        const app: App = (context.app = {
          _uid: uid++,
          _component: rootComponent as ConcreteComponent,
          _props: rootProps,
          _container: null,
          _context: context,
          _instance: null,
          version,
          get config() {
            return context.config
          },
          set config(v) {
            if (__DEV__) {
              warn(
                'app.config cannot be replaced. Modify individual options instead.'
              )
            }
          },
          use(plugin: Plugin, ...options: any[]) {},
          mixin(mixin: ComponentOptions) {},
          component(name: string, component?: Component): any {},
          directive(name: string, directive?: Directive) {},
          mount(
            rootContainer: HostElement,
            isHydrate?: boolean,
            isSVG?: boolean
          ): any {},
          unmount() {},
          provide(key, value) {}
        if (__COMPAT__) {
          installAppCompatProperties(app, context, render)
        }
        return app
      }
    }`;

export const CREATE_APP_CONTEXT = `export function createAppContext(): AppContext {
      return {
        app: null as any,
        config: {
          isNativeTag: NO,
          performance: false,
          globalProperties: {},
          optionMergeStrategies: {},
          errorHandler: undefined,
          warnHandler: undefined,
          compilerOptions: {}
        },
        mixins: [],
        components: {},
        directives: {},
        provides: Object.create(null),
        optionsCache: new WeakMap(),
        propsCache: new WeakMap(),
        emitsCache: new WeakMap()
      }
    }`;

export const DEFINE_COMPONENT = `// implementation, close to no-op
export function defineComponent(options: unknown) {
  return isFunction(options) ? { setup: options, name: options.name } : options
}`;

export const H = `/ Actual implementation
export function h(type: any, propsOrChildren?: any, children?: any): VNode {
  const l = arguments.length
  if (l === 2) {
    if (isObject(propsOrChildren) && !isArray(propsOrChildren)) {
      // single vnode without props
      if (isVNode(propsOrChildren)) {
        return createVNode(type, null, [propsOrChildren])
      }
      // props without children
      return createVNode(type, propsOrChildren)
    } else {
      // omit props
      return createVNode(type, null, propsOrChildren)
    }
  } else {
    if (l > 3) {
      children = Array.prototype.slice.call(arguments, 2)
    } else if (l === 3 && isVNode(children)) {
      children = [children]
    }
    return createVNode(type, propsOrChildren, children)
  }
}`;

export const CREATE_VNODE = `export const createVNode = (
      __DEV__ ? createVNodeWithArgsTransform : _createVNode
    ) as typeof _createVNode
    
    function _createVNode(
      type: VNodeTypes | ClassComponent | typeof NULL_DYNAMIC_COMPONENT,
      props: (Data & VNodeProps) | null = null,
      children: unknown = null,
      patchFlag: number = 0,
      dynamicProps: string[] | null = null,
      isBlockNode = false
    ): VNode {
      if (!type || type === NULL_DYNAMIC_COMPONENT) {
        if (__DEV__ && !type) {
          warn('Invalid vnode type when creating vnode: ' + type)
        }
        type = Comment
      }
      if (isVNode(type)) {
        // createVNode receiving an existing vnode. This happens in cases like
        // <component :is="vnode"/>
        // #2078 make sure to merge refs during the clone instead of overwriting it
        const cloned = cloneVNode(type, props, true /* mergeRef: true */)
        if (children) {
          normalizeChildren(cloned, children)
        }
        if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
          if (cloned.shapeFlag & ShapeFlags.COMPONENT) {
            currentBlock[currentBlock.indexOf(type)] = cloned
          } else {
            currentBlock.push(cloned)
          }
        }
        cloned.patchFlag |= PatchFlags.BAIL
        return cloned
      }
      // class component normalization.
      if (isClassComponent(type)) {
        type = type.__vccOpts
      }
      // 2.x async/functional component compat
      if (__COMPAT__) {
        type = convertLegacyComponent(type, currentRenderingInstance)
      }
      // class & style normalization.
      if (props) {
        // for reactive or proxy objects, we need to clone it to enable mutation.
        props = guardReactiveProps(props)!
        let { class: klass, style } = props
        if (klass && !isString(klass)) {
          props.class = normalizeClass(klass)
        }
        if (isObject(style)) {
          // reactive state objects need to be cloned since they are likely to be
          // mutated
          if (isProxy(style) && !isArray(style)) {
            style = extend({}, style)
          }
          props.style = normalizeStyle(style)
        }
      }
      // encode the vnode type information into a bitmap
      const shapeFlag = isString(type)
        ? ShapeFlags.ELEMENT
        : __FEATURE_SUSPENSE__ && isSuspense(type)
        ? ShapeFlags.SUSPENSE
        : isTeleport(type)
        ? ShapeFlags.TELEPORT
        : isObject(type)
        ? ShapeFlags.STATEFUL_COMPONENT
        : isFunction(type)
        ? ShapeFlags.FUNCTIONAL_COMPONENT
        : 0
      if (__DEV__ && shapeFlag & ShapeFlags.STATEFUL_COMPONENT && isProxy(type)) {
        type = toRaw(type)
        warn(
          'Vue received a Component which was made a reactive object. This can ' +
            'lead to unnecessary performance overhead, and should be avoided by ' +
            'marking the component with \'markRaw\' or using \'shallowRef\' ' +
            'instead of \'ref\'.',
          '\nComponent that was made reactive: ',
          type
        )
      }
      return createBaseVNode(
        type,
        props,
        children,
        patchFlag,
        dynamicProps,
        shapeFlag,
        isBlockNode,
        true
      )
    }`;

export const CREATE_BASE_VNODE = `function createBaseVNode(
      type: VNodeTypes | ClassComponent | typeof NULL_DYNAMIC_COMPONENT,
      props: (Data & VNodeProps) | null = null,
      children: unknown = null,
      patchFlag = 0,
      dynamicProps: string[] | null = null,
      shapeFlag = type === Fragment ? 0 : ShapeFlags.ELEMENT,
      isBlockNode = false,
      needFullChildrenNormalization = false
    ) {
      const vnode = {
        __v_isVNode: true,
        __v_skip: true,
        type,
        props,
        key: props && normalizeKey(props),
        ref: props && normalizeRef(props),
        scopeId: currentScopeId,
        slotScopeIds: null,
        children,
        component: null,
        suspense: null,
        ssContent: null,
        ssFallback: null,
        dirs: null,
        transition: null,
        el: null,
        anchor: null,
        target: null,
        targetAnchor: null,
        staticCount: 0,
        shapeFlag,
        patchFlag,
        dynamicProps,
        dynamicChildren: null,
        appContext: null
      } as VNode
    
      if (needFullChildrenNormalization) {
        normalizeChildren(vnode, children)
        // normalize suspense children
        if (__FEATURE_SUSPENSE__ && shapeFlag & ShapeFlags.SUSPENSE) {
          ;(type as typeof SuspenseImpl).normalize(vnode)
        }
      } else if (children) {
        // compiled element vnode - if children is passed, only possible types are
        // string or Array.
        vnode.shapeFlag |= isString(children)
          ? ShapeFlags.TEXT_CHILDREN
          : ShapeFlags.ARRAY_CHILDREN
      }
      // validate key
      if (__DEV__ && vnode.key !== vnode.key) {
        warn('VNode created with invalid key (NaN). VNode type:', vnode.type)
      }
      // track vnode for block tree
      if (
        isBlockTreeEnabled > 0 &&
        // avoid a block node from tracking itself
        !isBlockNode &&
        // has current parent block
        currentBlock &&
        // presence of a patch flag indicates this node needs patching on updates.
        // component nodes also should always be patched, because even if the
        // component doesn't need to update, it needs to persist the instance on to
        // the next vnode so that it can be properly unmounted later.
        // patchFlag的存在表示节点需要更新，组件节点一直存在patchFlag，因为即使不需要更新，它需要继续保存实例到下一个VNode后续可以正确卸载它
        (vnode.patchFlag > 0 || shapeFlag & ShapeFlags.COMPONENT) &&
        // the EVENTS flag is only for hydration and if it is the only flag, the
        // vnode should not be considered dynamic due to handler caching.
        vnode.patchFlag !== PatchFlags.HYDRATE_EVENTS
      ) {
        currentBlock.push(vnode)
      }
      if (__COMPAT__) {
        convertLegacyVModelProps(vnode)
        defineLegacyVNodeProperties(vnode)
      }
      return vnode
    }`;

export const NEXTTICK = `export function nextTick<T = void>(
      this: T,
      fn?: (this: T) => void
    ): Promise<void> {
      const p = currentFlushPromise || resolvedPromise
      return fn ? p.then(this ? fn.bind(this) : fn) : p
    }`;

export const QUEUE_JOB = `export function queueJob(job: SchedulerJob) {
          // the dedupe search uses the startIndex argument of Array.includes()
          // by default the search index includes the current job that is being run
          // so it cannot recursively trigger itself again.
          // if the job is a watch() callback, the search will start with a +1 index to
          // allow it recursively trigger itself - it is the user's responsibility to
          // ensure it doesn't end up in an infinite loop.
          if (
            !queue.length ||
            !queue.includes(
              job,
              isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex
            )
          ) {
            if (job.id == null) {
              queue.push(job)
            } else {
              queue.splice(findInsertionIndex(job.id), 0, job)
            }
            queueFlush()
          }
        }
        export function queuePostFlushCb(cb: SchedulerJobs) {
          if (!isArray(cb)) {
            if (
              !activePostFlushCbs ||
              !activePostFlushCbs.includes(
                cb,
                cb.allowRecurse ? postFlushIndex + 1 : postFlushIndex
              )
            ) {
              pendingPostFlushCbs.push(cb)
            }
          } else {
            // if cb is an array, it is a component lifecycle hook which can only be
            // triggered by a job, which is already deduped in the main queue, so
            // we can skip duplicate check here to improve perf
            pendingPostFlushCbs.push(...cb)
          }
          queueFlush()
        }`;

export const QUEUE_FLUSH = `function queueFlush() {
              if (!isFlushing && !isFlushPending) {
                isFlushPending = true
                currentFlushPromise = resolvedPromise.then(flushJobs)
              }
            }`;

export const FLUSH_JOBS = `function flushJobs(seen?: CountMap) {
      isFlushPending = false
      isFlushing = true
      if (__DEV__) {
        seen = seen || new Map()
      }
    
      // Sort queue before flush.
      // This ensures that:
      // 1. Components are updated from parent to child. (because parent is always
      //    created before the child so its render effect will have smaller
      //    priority number)
      // 2. If a component is unmounted during a parent component's update,
      //    its update can be skipped.
      queue.sort(comparator)
      // conditional usage of checkRecursiveUpdate must be determined out of
      // try ... catch block since Rollup by default de-optimizes treeshaking
      // inside try-catch. This can leave all warning code unshaked. Although
      // they would get eventually shaken by a minifier like terser, some minifiers
      // would fail to do that (e.g. https://github.com/evanw/esbuild/issues/1610)
      const check = __DEV__
        ? (job: SchedulerJob) => checkRecursiveUpdates(seen!, job)
        : NOOP
      try {
        for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
          const job = queue[flushIndex]
          if (job && job.active !== false) {
            if (__DEV__ && check(job)) {
              continue
            }
            // console.log('running:', job.id)
            callWithErrorHandling(job, null, ErrorCodes.SCHEDULER)
          }
        }
      } finally {
        flushIndex = 0
        queue.length = 0
        flushPostFlushCbs(seen)
        isFlushing = false
        currentFlushPromise = null
        // some postFlushCb queued jobs!
        // keep flushing until it drains.
        if (queue.length || pendingPostFlushCbs.length) {
          flushJobs(seen)
        }
      }
    }`;

export const EFFECT = `    // create reactive effect for rendering
    const effect = (instance.effect = new ReactiveEffect(
      componentUpdateFn,
      () => queueJob(update),
      instance.scope // track it in component's effect scope
    ))`;

export const REACTIVE_EFFECT = `export class ReactiveEffect<T = any> {
    constructor(
        public fn: () => T,
        public scheduler: EffectScheduler | null = null,
        scope?: EffectScope
      ) {
        recordEffectScope(this, scope)
      }
    }
`;

export const TRIGGER_EFFECT = `export function triggerEffects(
    dep: Dep | ReactiveEffect[],
    debuggerEventExtraInfo?: DebuggerEventExtraInfo
  ) {
    // spread into array for stabilization
    const effects = isArray(dep) ? dep : [...dep]
    for (const effect of effects) {
      if (effect.computed) {
        triggerEffect(effect, debuggerEventExtraInfo)
      }
    }
    for (const effect of effects) {
      if (!effect.computed) {
        triggerEffect(effect, debuggerEventExtraInfo)
      }
    }
  }
  
  function triggerEffect(
    effect: ReactiveEffect,
    debuggerEventExtraInfo?: DebuggerEventExtraInfo
  ) {
    if (effect !== activeEffect || effect.allowRecurse) {
      if (__DEV__ && effect.onTrigger) {
        effect.onTrigger(extend({ effect }, debuggerEventExtraInfo))
      }
      if (effect.scheduler) {
        effect.scheduler()
      } else {
        effect.run()
      }
    }
  }`;

export const REACTIVE = `export function reactive<T extends object>(target: T): UnwrapNestedRefs<T>
export function reactive(target: object) {
  // if trying to observe a readonly proxy, return the readonly version.
  if (isReadonly(target)) {
    return target
  }
  return createReactiveObject(
    target,
    false,
    mutableHandlers,
    mutableCollectionHandlers,
    reactiveMap
  )
}`;

export const CREATE_REACTIVE_OBJECT = `function createReactiveObject(
      target: Target,
      isReadonly: boolean,
      baseHandlers: ProxyHandler<any>,
      collectionHandlers: ProxyHandler<any>,
      proxyMap: WeakMap<Target, any>
    ) {
      if (!isObject(target)) {
        if (__DEV__) {
          console.warn('value cannot be made reactive:'+String(target))
        }
        return target
      }
      // target is already a Proxy, return it.
      // exception: calling readonly() on a reactive object
      if (
        target[ReactiveFlags.RAW] &&
        !(isReadonly && target[ReactiveFlags.IS_REACTIVE])
      ) {
        return target
      }
      // target already has corresponding Proxy
      const existingProxy = proxyMap.get(target)
      if (existingProxy) {
        return existingProxy
      }
      // only specific value types can be observed.
      const targetType = getTargetType(target)
      if (targetType === TargetType.INVALID) {
        return target
      }
      const proxy = new Proxy(
        target,
        targetType === TargetType.COLLECTION ? collectionHandlers : baseHandlers
      )
      proxyMap.set(target, proxy)
      return proxy
    }`;

export const TARGET_TYPE_MAP = `function targetTypeMap(rawType: string) {
          switch (rawType) {
            case 'Object':
            case 'Array':
              return TargetType.COMMON
            case 'Map':
            case 'Set':
            case 'WeakMap':
            case 'WeakSet':
              return TargetType.COLLECTION
            default:
              return TargetType.INVALID
          }
        }
        
        function getTargetType(value: Target) {
          return value[ReactiveFlags.SKIP] || !Object.isExtensible(value)
            ? TargetType.INVALID
            : targetTypeMap(toRawType(value))
}`;

export const REF = `export function ref<T extends object>(
  value: T
): [T] extends [Ref] ? T : Ref<UnwrapRef<T>>
export function ref<T>(value: T): Ref<UnwrapRef<T>>
export function ref<T = any>(): Ref<T | undefined>
export function ref(value?: unknown) {
  return createRef(value, false)
}`;

export const CREATE_REF = `function createRef(rawValue: unknown, shallow: boolean) {
  if (isRef(rawValue)) {//如果是ref类型直接返回
    return rawValue
  }
  return new RefImpl(rawValue, shallow)
}

class RefImpl<T> {
  private _value: T //当前值
  private _rawValue: T //原始值

  public dep?: Dep = undefined
  public readonly __v_isRef = true

  //如果shallow为true，就直接观察
  constructor(value: T, public readonly __v_isShallow: boolean) {
    this._rawValue = __v_isShallow ? value : toRaw(value)
    this._value = __v_isShallow ? value : toReactive(value) //如果是对象直接使用reactive
  }

  get value() {
    trackRefValue(this) //依赖收集
    return this._value
  }

  set value(newVal) {
    const useDirectValue =
      this.__v_isShallow || isShallow(newVal) || isReadonly(newVal)
    newVal = useDirectValue ? newVal : toRaw(newVal)
    if (hasChanged(newVal, this._rawValue)) { //如果值发生了变化，触发响应式修改
      this._rawValue = newVal
      this._value = useDirectValue ? newVal : toReactive(newVal) //如果是对象直接使用reactive
      triggerRefValue(this, newVal) 
    }
  }
}`;

export const MUTABLE_HANDLERS = `export const mutableHandlers: ProxyHandler<object> = {
  get, //拦截属性读取操作
  set, //拦截属性写操作
  deleteProperty, //拦截属性删除操作
  has, //检查是否拥有某个属性
  ownKeys // 针对 getOwnPropertyNames,  getOwnPropertySymbols, keys 的代理方法
}`;

export const MUTABLE_GET = `const get = /*#__PURE__*/ createGetter()

function createGetter(isReadonly = false, shallow = false) {
  /**
   * @param {target} 目标对象
   * @param {key} 目标key值
   * @param {receiver} this设置为recevier
   */
  return function get(target: Target, key: string | symbol, receiver: object) {
    // ReactiveFlags是reactive内部的枚举值，如果key是枚举值直接返回对应的布尔值
    if (key === ReactiveFlags.IS_REACTIVE) {
      return !isReadonly
    } else if (key === ReactiveFlags.IS_READONLY) {
      return isReadonly
    } else if (key === ReactiveFlags.IS_SHALLOW) {
      return shallow
    } else if ( //如果key是raw，直接返回目标对象
      key === ReactiveFlags.RAW &&
      receiver ===
        (isReadonly
          ? shallow
            ? shallowReadonlyMap
            : readonlyMap
          : shallow
          ? shallowReactiveMap
          : reactiveMap
        ).get(target)
    ) {
      return target
    }

    const targetIsArray = isArray(target)

    //触发的是['includes', 'indexOf', 'lastIndexOf']三个数组操作之一
    if (!isReadonly && targetIsArray && hasOwn(arrayInstrumentations, key)) {
      return Reflect.get(arrayInstrumentations, key, receiver)
    }

    const res = Reflect.get(target, key, receiver)
    //key是symbol，直接返回结果
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res
    }

    if (!isReadonly) {
      track(target, TrackOpTypes.GET, key)
    }
    //如果是潜观察，返回结果
    if (shallow) {
      return res
    }

    if (isRef(res)) {
      // ref unwrapping - skip unwrap for Array + integer key.
      return targetIsArray && isIntegerKey(key) ? res : res.value
    }
    //proxy只能代理一层，如果res是对象，就继续代理
    if (isObject(res)) {
      // Convert returned value into a proxy as well. we do the isObject check
      // here to avoid invalid value warning. Also need to lazy access readonly
      // and reactive here to avoid circular dependency.
      return isReadonly ? readonly(res) : reactive(res)
    }

    return res
  }
}

const arrayInstrumentations = /*#__PURE__*/ createArrayInstrumentations()

function createArrayInstrumentations() {
  const instrumentations: Record<string, Function> = {}
  // instrument identity-sensitive Array methods to account for possible reactive
  // values
  ;(['includes', 'indexOf', 'lastIndexOf'] as const).forEach(key => {
    instrumentations[key] = function (this: unknown[], ...args: unknown[]) {
      const arr = toRaw(this) as any
      for (let i = 0, l = this.length; i < l; i++) {
        track(arr, TrackOpTypes.GET, i + '')
      }
      // we run the method using the original args first (which may be reactive)
      const res = arr[key](...args)
      if (res === -1 || res === false) {
        // if that didn't work, run it again using raw values.
        return arr[key](...args.map(toRaw))
      } else {
        return res
      }
    }
  })
  // instrument length-altering mutation methods to avoid length being tracked
  // which leads to infinite loops in some cases (#2137)
  ;(['push', 'pop', 'shift', 'unshift', 'splice'] as const).forEach(key => {
    instrumentations[key] = function (this: unknown[], ...args: unknown[]) {
      pauseTracking()
      const res = (toRaw(this) as any)[key].apply(this, args)
      resetTracking()
      return res
    }
  })
  return instrumentations
}
`;
export const MUTABLE_SET = `const set = /*#__PURE__*/ createSetter()
const shallowSet = /*#__PURE__*/ createSetter(true)

function createSetter(shallow = false) {
  /**
   * @param {target} 目标对象
   * @param {key} 属性名
   * @param {value} 属性值
   * @param {receiver} this 
   */
  return function set(
    target: object,
    key: string | symbol,
    value: unknown,
    receiver: object
  ): boolean {
    let oldValue = (target as any)[key]
    // 如果是只读属性且旧值是ref新值不是，不能修改
    if (isReadonly(oldValue) && isRef(oldValue) && !isRef(value)) {
      return false
    }
    if (!shallow) {
      if (!isShallow(value) && !isReadonly(value)) {
        oldValue = toRaw(oldValue)
        value = toRaw(value)
      }
      if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
        oldValue.value = value
        return true
      }
    } else {
      // in shallow mode, objects are set as-is regardless of reactive or not
    }
    //检查target是否有这个key
    const hadKey =
      isArray(target) && isIntegerKey(key)
        ? Number(key) < target.length
        : hasOwn(target, key)
    //赋值
    const result = Reflect.set(target, key, value, receiver)
    // don't trigger if target is something up in the prototype chain of original
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        //如果不存在就trigger ADD
        trigger(target, TriggerOpTypes.ADD, key, value)
      } else if (hasChanged(value, oldValue)) {
        //存在就trigger SET
        trigger(target, TriggerOpTypes.SET, key, value, oldValue)
      }
    }
    return result
  }
}`;
export const MUTABLE_OTHER = `function deleteProperty(target: object, key: string | symbol): boolean {
  const hadKey = hasOwn(target, key)
  const oldValue = (target as any)[key]
  const result = Reflect.deleteProperty(target, key)
  //如果key存在且删除成功，则调用trigger
  if (result && hadKey) {
    trigger(target, TriggerOpTypes.DELETE, key, undefined, oldValue)
  }
  return result
}

function has(target: object, key: string | symbol): boolean {
  const result = Reflect.has(target, key)
  if (!isSymbol(key) || !builtInSymbols.has(key)) {
    track(target, TrackOpTypes.HAS, key)
  }
  return result
}

function ownKeys(target: object): (string | symbol)[] {
  track(target, TrackOpTypes.ITERATE, isArray(target) ? 'length' : ITERATE_KEY)
  return Reflect.ownKeys(target)
}`;
