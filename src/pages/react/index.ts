export const WORK_LOOP_CONCUNCURRENT = `/** @noinline */
function workLoopConcurrent() {
  // Perform work until Scheduler asks us to yield

  if (workInProgressIsSuspended) {
    // The current work-in-progress was already attempted. We need to unwind
    // it before we continue the normal work loop.
    const thrownValue = workInProgressThrownValue;
    workInProgressIsSuspended = false;
    workInProgressThrownValue = null;
    if (workInProgress !== null) {
      resumeSuspendedUnitOfWork(workInProgress, thrownValue);
    }
  }

  while (workInProgress !== null && !shouldYield()) {
    // $FlowFixMe[incompatible-call] found when upgrading Flow
    performUnitOfWork(workInProgress);
  }
}`;

export const FLAGS = `// You can change the rest (and add more).
export const Placement = /*                    */ 0b00000000000000000000000010;
export const Update = /*                       */ 0b00000000000000000000000100;
export const ChildDeletion = /*                */ 0b00000000000000000000001000;
export const ContentReset = /*                 */ 0b00000000000000000000010000;`;

export const FIBER_NODE = `function FiberNode(
  tag: WorkTag,
  pendingProps: mixed,
  key: null | string,
  mode: TypeOfMode,
) {
  // Instance 静态数据结构属性
  // 组件的类型，FunctionComponent/ClassComponent/HostComponent...
  this.tag = tag;
  this.key = key;
  // 大部分情况跟type一样
  this.elementType = null;
  // 对于FunctionComponent，指函数本身，对于ClassComponent,指class,对于HostComponent，指tagName
  this.type = null;
  // Fiber对应的真实dom节点
  this.stateNode = null;

  // Fiber 用于连接其他Fiber节点形成Fiber树
  // 指向父级fiber节点
  this.return = null;
  // 指向子fiber节点
  this.child = null;
  // 指向右边第一个兄弟fiber节点
  this.sibling = null;
  this.index = 0;

  this.ref = null;

  // 作为动态工作单元的属性
  // 保存本次更新造成的状态改变相关信息
  this.pendingProps = pendingProps;
  this.memoizedProps = null;
  this.updateQueue = null;
  this.memoizedState = null;
  this.dependencies = null;

  this.mode = mode;

  // Effects
  // 保存本次更新会造成的dom操作
  this.flags = NoFlags;
  this.subtreeFlags = NoFlags;
  this.deletions = null;

  // 调度优先级相关
  this.lanes = NoLanes;
  this.childLanes = NoLanes;

  // 指向另一次更新时对应的fiber
  this.alternate = null;

  if (enableProfilerTimer) {
    // Note: The following is done to avoid a v8 performance cliff.
    //
    // Initializing the fields below to smis and later updating them with
    // double values will cause Fibers to end up having separate shapes.
    // This behavior/bug has something to do with Object.preventExtension().
    // Fortunately this only impacts DEV builds.
    // Unfortunately it makes React unusably slow for some applications.
    // To work around this, initialize the fields below with doubles.
    //
    // Learn more about this here:
    // https://github.com/facebook/react/issues/14365
    // https://bugs.chromium.org/p/v8/issues/detail?id=8538
    this.actualDuration = Number.NaN;
    this.actualStartTime = Number.NaN;
    this.selfBaseDuration = Number.NaN;
    this.treeBaseDuration = Number.NaN;

    // It's okay to replace the initial doubles with smis after initialization.
    // This won't trigger the performance cliff mentioned above,
    // and it simplifies other profiler code (including DevTools).
    this.actualDuration = 0;
    this.actualStartTime = -1;
    this.selfBaseDuration = 0;
    this.treeBaseDuration = 0;
  }

  if (__DEV__) {
    // This isn't directly used but is handy for debugging internals:

    this._debugSource = null;
    this._debugOwner = null;
    this._debugNeedsRemount = false;
    this._debugHookTypes = null;
    if (!hasBadMapPolyfill && typeof Object.preventExtensions === 'function') {
      Object.preventExtensions(this);
    }
  }
}`;

export const FIBER_EXAMPLE = `function App() {
  return (
    <div>
      i am
      <span>luoyunlai</span>
    </div>
  )
}`;

export const ALTERNATE = `workInProgress.alternate = current;
current.alternate = workInProgress;`;

export const MOUNT_EXAMPLE = `function App() {
  const [num, add] = useState(0);
  return (
    <p onClick={() => add(num + 1)}>{num}</p>
  )
}

ReactDOM.render(<App/>, document.getElementById('root'));`;

export const ROOT_NODE = `  const root: FiberRoot = (new FiberRootNode(
  containerInfo,
  tag,
  hydrate,
  identifierPrefix,
  onRecoverableError,
): any);
root.current = uninitializedFiber;
uninitializedFiber.stateNode = root;
`;

export const WORK_LOOP = `function workLoopSync() {
  // Perform work without checking if we need to yield between fiber.

  if (workInProgressIsSuspended) {
    // The current work-in-progress was already attempted. We need to unwind
    // it before we continue the normal work loop.
    const thrownValue = workInProgressThrownValue;
    workInProgressIsSuspended = false;
    workInProgressThrownValue = null;
    if (workInProgress !== null) {
      resumeSuspendedUnitOfWork(workInProgress, thrownValue);
    }
  }

  while (workInProgress !== null) {
    performUnitOfWork(workInProgress);
  }
}`;

export const BEGIN_WORK_PARAMS = `function beginWork(
  current: Fiber | null,
  workInProgress: Fiber,
  renderLanes: Lanes,
): Fiber | null {
  // ...省略函数体
}`;

export const BEGIN_WORK = `function beginWork(
  current: Fiber | null,
  workInProgress: Fiber,
  renderLanes: Lanes,
): Fiber | null {
  if (__DEV__) {
    if (workInProgress._debugNeedsRemount && current !== null) {
      // This will restart the begin phase with a new fiber.
      return remountFiber(
        current,
        workInProgress,
        createFiberFromTypeAndProps(
          workInProgress.type,
          workInProgress.key,
          workInProgress.pendingProps,
          workInProgress._debugOwner || null,
          workInProgress.mode,
          workInProgress.lanes,
        ),
      );
    }
  }
  //update时，如果current存在那么有可能被复用
  if (current !== null) {
    const oldProps = current.memoizedProps;
    const newProps = workInProgress.pendingProps;

    if (
      oldProps !== newProps ||
      hasLegacyContextChanged() ||
      // Force a re-render if the implementation changed due to hot reload:
      (__DEV__ ? workInProgress.type !== current.type : false)
    ) {
      // If props or context changed, mark the fiber as having performed work.
      // This may be unset if the props are determined to be equal later (memo).
      didReceiveUpdate = true;
    } else {
      // Neither props nor legacy context changes. Check if there's a pending
      // update or context change.
      const hasScheduledUpdateOrContext = checkScheduledUpdateOrContext(
        current,
        renderLanes,
      );
      if (
        !hasScheduledUpdateOrContext &&
        // If this is the second pass of an error or suspense boundary, there
        // may not be work scheduled on 'current', so we check for this flag.
        (workInProgress.flags & DidCapture) === NoFlags
      ) {
        // No pending updates or context. Bail out now.
        didReceiveUpdate = false;
        return attemptEarlyBailoutIfNoScheduledUpdate(
          current,
          workInProgress,
          renderLanes,
        );
      }
      if ((current.flags & ForceUpdateForLegacySuspense) !== NoFlags) {
        // This is a special case that only exists for legacy mode.
        // See https://github.com/facebook/react/pull/19216.
        didReceiveUpdate = true;
      } else {
        // An update was scheduled on this fiber, but there are no new props
        // nor legacy context. Set this to false. If an update queue or context
        // consumer produces a changed value, it will set this to true. Otherwise,
        // the component will assume the children have not changed and bail out.
        didReceiveUpdate = false;
      }
    }
  } else {
    didReceiveUpdate = false;
  }

  // Before entering the begin phase, clear pending update priority.
  // TODO: This assumes that we're about to evaluate the component and process
  // the update queue. However, there's an exception: SimpleMemoComponent
  // sometimes bails out later in the begin phase. This indicates that we should
  // move this assignment out of the common path and into each branch.
  workInProgress.lanes = NoLanes;
  //mount时，根据tag不同，创建不同的子节点
  switch (workInProgress.tag) {
    case IndeterminateComponent: {
      return mountIndeterminateComponent(
        current,
        workInProgress,
        workInProgress.type,
        renderLanes,
      );
    }
    case LazyComponent: {
      const elementType = workInProgress.elementType;
      return mountLazyComponent(
        current,
        workInProgress,
        elementType,
        renderLanes,
      );
    }
    case FunctionComponent: {
      const Component = workInProgress.type;
      const unresolvedProps = workInProgress.pendingProps;
      const resolvedProps =
        workInProgress.elementType === Component
          ? unresolvedProps
          : resolveDefaultProps(Component, unresolvedProps);
      return updateFunctionComponent(
        current,
        workInProgress,
        Component,
        resolvedProps,
        renderLanes,
      );
    }
    case ClassComponent: {
      const Component = workInProgress.type;
      const unresolvedProps = workInProgress.pendingProps;
      const resolvedProps =
        workInProgress.elementType === Component
          ? unresolvedProps
          : resolveDefaultProps(Component, unresolvedProps);
      return updateClassComponent(
        current,
        workInProgress,
        Component,
        resolvedProps,
        renderLanes,
      );
    }
    case HostRoot:
      return updateHostRoot(current, workInProgress, renderLanes);
    case HostResource:
      if (enableFloat && supportsResources) {
        return updateHostResource(current, workInProgress, renderLanes);
      }
    // eslint-disable-next-line no-fallthrough
    case HostComponent:
      return updateHostComponent(current, workInProgress, renderLanes);
    case HostText:
      return updateHostText(current, workInProgress);
    case SuspenseComponent:
      return updateSuspenseComponent(current, workInProgress, renderLanes);
    case HostPortal:
      return updatePortalComponent(current, workInProgress, renderLanes);
    case ForwardRef: {
      const type = workInProgress.type;
      const unresolvedProps = workInProgress.pendingProps;
      const resolvedProps =
        workInProgress.elementType === type
          ? unresolvedProps
          : resolveDefaultProps(type, unresolvedProps);
      return updateForwardRef(
        current,
        workInProgress,
        type,
        resolvedProps,
        renderLanes,
      );
    }
    case Fragment:
      return updateFragment(current, workInProgress, renderLanes);
    case Mode:
      return updateMode(current, workInProgress, renderLanes);
    case Profiler:
      return updateProfiler(current, workInProgress, renderLanes);
    case ContextProvider:
      return updateContextProvider(current, workInProgress, renderLanes);
    case ContextConsumer:
      return updateContextConsumer(current, workInProgress, renderLanes);
    case MemoComponent: {
      const type = workInProgress.type;
      const unresolvedProps = workInProgress.pendingProps;
      // Resolve outer props first, then resolve inner props.
      let resolvedProps = resolveDefaultProps(type, unresolvedProps);
      if (__DEV__) {
        if (workInProgress.type !== workInProgress.elementType) {
          const outerPropTypes = type.propTypes;
          if (outerPropTypes) {
            checkPropTypes(
              outerPropTypes,
              resolvedProps, // Resolved for outer only
              'prop',
              getComponentNameFromType(type),
            );
          }
        }
      }
      resolvedProps = resolveDefaultProps(type.type, resolvedProps);
      return updateMemoComponent(
        current,
        workInProgress,
        type,
        resolvedProps,
        renderLanes,
      );
    }
    case SimpleMemoComponent: {
      return updateSimpleMemoComponent(
        current,
        workInProgress,
        workInProgress.type,
        workInProgress.pendingProps,
        renderLanes,
      );
    }
    case IncompleteClassComponent: {
      const Component = workInProgress.type;
      const unresolvedProps = workInProgress.pendingProps;
      const resolvedProps =
        workInProgress.elementType === Component
          ? unresolvedProps
          : resolveDefaultProps(Component, unresolvedProps);
      return mountIncompleteClassComponent(
        current,
        workInProgress,
        Component,
        resolvedProps,
        renderLanes,
      );
    }
    case SuspenseListComponent: {
      return updateSuspenseListComponent(current, workInProgress, renderLanes);
    }
    case ScopeComponent: {
      if (enableScopeAPI) {
        return updateScopeComponent(current, workInProgress, renderLanes);
      }
      break;
    }
    case OffscreenComponent: {
      return updateOffscreenComponent(current, workInProgress, renderLanes);
    }
    case LegacyHiddenComponent: {
      if (enableLegacyHidden) {
        return updateLegacyHiddenComponent(
          current,
          workInProgress,
          renderLanes,
        );
      }
      break;
    }
    case CacheComponent: {
      if (enableCache) {
        return updateCacheComponent(current, workInProgress, renderLanes);
      }
      break;
    }
    case TracingMarkerComponent: {
      if (enableTransitionTracing) {
        return updateTracingMarkerComponent(
          current,
          workInProgress,
          renderLanes,
        );
      }
      break;
    }
  }
}`;

export const CHECK_UPDATE = `function checkScheduledUpdateOrContext(
  current: Fiber,
  renderLanes: Lanes,
): boolean {
  // Before performing an early bailout, we must check if there are pending
  // updates or context.
  const updateLanes = current.lanes;
  if (includesSomeLane(updateLanes, renderLanes)) {
    return true;
  }
  // No pending update, but because context is propagated lazily, we need
  // to check for a context change before we bail out.
  if (enableLazyContextPropagation) {
    const dependencies = current.dependencies;
    if (dependencies !== null && checkIfContextChanged(dependencies)) {
      return true;
    }
  }
  return false;
}`;

export const RECONCILER_CHILDREN = `export function reconcileChildren(
  current: Fiber | null,
  workInProgress: Fiber,
  nextChildren: any,
  renderLanes: Lanes,
) {
  if (current === null) {
    // 对于mount的组件
    // If this is a fresh new component that hasn't been rendered yet, we
    // won't update its child set by applying minimal side-effects. Instead,
    // we will add them all to the child before it gets rendered. That means
    // we can optimize this reconciliation pass by not tracking side-effects.
    workInProgress.child = mountChildFibers(
      workInProgress,
      null,
      nextChildren,
      renderLanes,
    );
  } else {
    // 对应update的组件
    // If the current child is the same as the work in progress, it means that
    // we haven't yet started any work on these children. Therefore, we use
    // the clone algorithm to create a copy of all the current children.

    // If we had any progressed work already, that is invalid at this point so
    // let's throw it out.
    workInProgress.child = reconcileChildFibers(
      workInProgress,
      current.child,
      nextChildren,
      renderLanes,
    );
  }
}`;

export const COMPLETE_WORK = `function completeWork(
  current: Fiber | null,
  workInProgress: Fiber,
  renderLanes: Lanes,
): Fiber | null {
  const newProps = workInProgress.pendingProps;

  popTreeContext(workInProgress);
  switch (workInProgress.tag) {
    case IndeterminateComponent:
    case LazyComponent:
    case SimpleMemoComponent:
    case FunctionComponent:
    case ForwardRef:
    case Fragment:
    case Mode:
    case Profiler:
    case ContextConsumer:
    case MemoComponent:
      bubbleProperties(workInProgress);
      return null;
    case ClassComponent: {
      // ...省略
      return null;
    }
    case HostRoot: {
      // ...省略
      bubbleProperties(workInProgress);
      updateHostContainer(workInProgress);
      return null;
    }
    case HostComponent: {
      // ...省略
      return null;
    }`;

export const HOST_COMPONENT = `case HostComponent: {
  popHostContext(workInProgress);
  const rootContainerInstance = getRootHostContainer();
  const type = workInProgress.type;

  if (current !== null && workInProgress.stateNode != null) {
    // update的情况
    // ...省略
  } else {
    // mount的情况
    // ...省略
  }
  return null;
}`;

export const HOST_UPDATE = `if (current !== null && workInProgress.stateNode != null) {
  // update的情况
  updateHostComponent(
    current,
    workInProgress,
    type,
    newProps,
    rootContainerInstance,
  );
}`;

export const UPDATE_COMPONENT = `updateHostComponent = function(
  current: Fiber,
  workInProgress: Fiber,
  type: Type,
  newProps: Props,
) {
  // If we have an alternate, that means this is an update and we need to
  // schedule a side-effect to do the updates.
  const oldProps = current.memoizedProps;
  if (oldProps === newProps) {
    // In mutation mode, this is sufficient for a bailout because
    // we won't touch this node even if children changed.
    return;
  }

  // If we get updated because one of our children updated, we don't
  // have newProps so we'll have to reuse them.
  // TODO: Split the update API as separate for the props vs. children.
  // Even better would be if children weren't special cased at all tho.
  const instance: Instance = workInProgress.stateNode;
  const currentHostContext = getHostContext();
  // TODO: Experiencing an error where oldProps is null. Suggests a host
  // component is hitting the resume path. Figure out why. Possibly
  // related to 'hidden'.
  const updatePayload = prepareUpdate(
    instance,
    type,
    oldProps,
    newProps,
    currentHostContext,
  );
  // TODO: Type this specific to this type of component.
  workInProgress.updateQueue = (updatePayload: any);
  // If the update payload indicates that there is a change or if there
  // is a new ref we mark this as an update. All the work is done in commitWork.
  if (updatePayload) {
    markUpdate(workInProgress);
  }
};`;

export const MOUNT_COMPONENT = `// ...省略服务端渲染相关逻辑

const currentHostContext = getHostContext();
// 为fiber创建对应DOM节点
const instance = createInstance(
    type,
    newProps,
    rootContainerInstance,
    currentHostContext,
    workInProgress,
  );
// 将子孙DOM节点插入刚生成的DOM节点中
appendAllChildren(instance, workInProgress, false, false);
// DOM节点赋值给fiber.stateNode
workInProgress.stateNode = instance;

// 与update逻辑中的updateHostComponent类似的处理props的过程
if (
  finalizeInitialChildren(
    instance,
    type,
    newProps,
    rootContainerInstance,
    currentHostContext,
  )
) {
  markUpdate(workInProgress);
}`;

export const DIFF_PROP = `(updatePayload = updatePayload || []).push(propKey, nextProp);`;

export const EFFECT_LIST = `                       nextEffect         nextEffect
rootFiber.firstEffect -----------> fiber -----------> fiber`;

export const BEFORE_MUTATION_BEFORE = `\`\`\`js
do {
  // 触发useEffect回调与其他同步任务。这些任务可能触发新的渲染，所以这里需要循环执行到没有任务。
  flushPassiveEffects();
} while (rootWithPendingPassiveEffects !== null);
flushRenderPhaseStrictModeWarningsInDEV();

if ((executionContext & (RenderContext | CommitContext)) !== NoContext) {
  throw new Error('Should not already be working.');
}

const finishedWork = root.finishedWork;
const lanes = root.finishedLanes;

if (__DEV__) {
  if (enableDebugTracing) {
    logCommitStarted(lanes);
  }
}

if (enableSchedulingProfiler) {
  markCommitStarted(lanes);
}

if (finishedWork === null) {
  if (__DEV__) {
    if (enableDebugTracing) {
      logCommitStopped();
    }
  }

  if (enableSchedulingProfiler) {
    markCommitStopped();
  }

  return null;
} else {
  if (__DEV__) {
    if (lanes === NoLanes) {
      console.error(
        'root.finishedLanes should not be empty during a commit. This is a ' +
          'bug in React.',
      );
    }
  }
}
root.finishedWork = null;
root.finishedLanes = NoLanes;

if (finishedWork === root.current) {
  throw new Error(
    'Cannot commit the same tree as before. This error is likely caused by ' +
      'a bug in React. Please file an issue.',
  );
}

// commitRoot never returns a continuation; it always finishes synchronously.
// So we can clear these now to allow a new callback to be scheduled.
root.callbackNode = null;
root.callbackPriority = NoLane;

// Check which lanes no longer have any work scheduled on them, and mark
// those as finished.
let remainingLanes = mergeLanes(finishedWork.lanes, finishedWork.childLanes);

// Make sure to account for lanes that were updated by a concurrent event
// during the render phase; don't mark them as finished.
const concurrentlyUpdatedLanes = getConcurrentlyUpdatedLanes();
remainingLanes = mergeLanes(remainingLanes, concurrentlyUpdatedLanes);

//重置优先级相关变量
markRootFinished(root, remainingLanes);

//重置全局变量
if (root === workInProgressRoot) {
  // We can reset these now that they are finished.
  workInProgressRoot = null;
  workInProgress = null;
  workInProgressRootRenderLanes = NoLanes;
} else {
  // This indicates that the last root we worked on is not the same one that
  // we're committing now. This most commonly happens when a suspended root
  // times out.
}
}\`\`\``;

export const LAYOUT_AFTER = `\`\`\`js
const rootDidHavePassiveEffects = rootDoesHavePassiveEffects;
// useEffect相关
if (rootDoesHavePassiveEffects) {
  // This commit has passive effects. Stash a reference to them. But don't
  // schedule a callback until after flushing layout work.
  rootDoesHavePassiveEffects = false;
  rootWithPendingPassiveEffects = root;
  pendingPassiveEffectsLanes = lanes;
} else {
  // There were no passive effects, so we can immediately release the cache
  // pool for this render.
  releaseRootPooledCache(root, remainingLanes);
  if (__DEV__) {
    nestedPassiveUpdateCount = 0;
    rootWithPassiveNestedUpdates = null;
  }
}

// Read this again, since an effect might have updated it
remainingLanes = root.pendingLanes;

// Check if there's remaining work on this root
// TODO: This is part of the 'componentDidCatch' implementation. Its purpose
// is to detect whether something might have called setState inside
// 'componentDidCatch'. The mechanism is known to be flawed because 'setState'
// inside 'componentDidCatch' is itself flawed — that's why we recommend
// 'getDerivedStateFromError' instead. However, it could be improved by
// checking if remainingLanes includes Sync work, instead of whether there's
// any work remaining at all (which would also include stuff like Suspense
// retries or transitions). It's been like this for a while, though, so fixing
// it probably isn't that urgent.
// 性能优化相关
if (remainingLanes === NoLanes) {
  // If there's no remaining work, we can clear the set of already failed
  // error boundaries.
  legacyErrorBoundariesThatAlreadyFailed = null;
}

if (__DEV__) {
  if (!rootDidHavePassiveEffects) {
    commitDoubleInvokeEffectsInDEV(root, false);
  }
}

onCommitRootDevTools(finishedWork.stateNode, renderPriorityLevel);

//性能优化相关
if (enableUpdaterTracking) {
  if (isDevToolsPresent) {
    root.memoizedUpdaters.clear();
  }
}

if (__DEV__) {
  onCommitRootTestSelector();
}

// Always call this before exiting 'commitRoot', to ensure that any
// additional work on this root is scheduled.
// 触发一次新的调度，确保附加的任务被调度
ensureRootIsScheduled(root, now());

if (recoverableErrors !== null) {
  // There were errors during this render, but recovered from them without
  // needing to surface it to the UI. We log them here.
  const onRecoverableError = root.onRecoverableError;
  for (let i = 0; i < recoverableErrors.length; i++) {
    const recoverableError = recoverableErrors[i];
    const errorInfo = makeErrorInfo(
      recoverableError.digest,
      recoverableError.stack,
    );
    onRecoverableError(recoverableError.value, errorInfo);
  }
}

if (hasUncaughtError) {
  hasUncaughtError = false;
  const error = firstUncaughtError;
  firstUncaughtError = null;
  throw error;
}

// If the passive effects are the result of a discrete render, flush them
// synchronously at the end of the current task so that the result is
// immediately observable. Otherwise, we assume that they are not
// order-dependent and do not need to be observed by external systems, so we
// can wait until after paint.
// TODO: We can optimize this by not scheduling the callback earlier. Since we
// currently schedule the callback in multiple places, will wait until those
// are consolidated.
if (
  includesSomeLane(pendingPassiveEffectsLanes, SyncLane) &&
  root.tag !== LegacyRoot
) {
  flushPassiveEffects();
}

// Read this again, since a passive effect might have updated it
remainingLanes = root.pendingLanes;
if (includesSomeLane(remainingLanes, (SyncLane: Lane))) {
  if (enableProfilerTimer && enableProfilerNestedUpdatePhase) {
    markNestedUpdateScheduled();
  }

  // Count the number of times the root synchronously re-renders without
  // finishing. If there are too many, it indicates an infinite update loop.
  if (root === rootWithNestedUpdates) {
    nestedUpdateCount++;
  } else {
    nestedUpdateCount = 0;
    rootWithNestedUpdates = root;
  }
} else {
  nestedUpdateCount = 0;
}

// If layout work was scheduled, flush it now.
// 执行同步任务，例如useLayoutEffect
flushSyncCallbacks();
\`\`\``;

export const BEFORE_MUTATION = `\`\`\`js
const prevTransition = ReactCurrentBatchConfig.transition;
ReactCurrentBatchConfig.transition = null;
// 保存之前的优先级，以同步优先级执行，执行完毕后恢复之前优先级
const previousPriority = getCurrentUpdatePriority();
setCurrentUpdatePriority(DiscreteEventPriority);

// 将当前上下文标记为CommitContext，作为commit阶段的标志
const prevExecutionContext = executionContext;
executionContext |= CommitContext;

// Reset this to null before calling lifecycles
ReactCurrentOwner.current = null;

// The commit phase is broken into several sub-phases. We do a separate pass
// of the effect list for each phase: all mutation effects come before all
// layout effects, and so on.

// The first phase a "before mutation" phase. We use this phase to read the
// state of the host tree right before we mutate it. This is where
// getSnapshotBeforeUpdate is called.
// beforeMutation阶段的主函数
const shouldFireAfterActiveInstanceBlur = commitBeforeMutationEffects(
  root,
  finishedWork,
)
\`\`\`
`;

export const COMMIT_BEFORE_MUTATION_EFFECTS = `\`\`\`js
let focusedInstanceHandle: null | Fiber = null;
let shouldFireAfterActiveInstanceBlur: boolean = false;

export function commitBeforeMutationEffects(
  root: FiberRoot,
  firstChild: Fiber,
): boolean {
  // 处理focus状态
  focusedInstanceHandle = prepareForCommit(root.containerInfo);

  nextEffect = firstChild;
  commitBeforeMutationEffects_begin();

  // We no longer need to track the active instance fiber
  const shouldFire = shouldFireAfterActiveInstanceBlur;
  shouldFireAfterActiveInstanceBlur = false;
  
  focusedInstanceHandle = null;

  return shouldFire;
}

function commitBeforeMutationEffects_begin() {
  while (nextEffect !== null) {
    const fiber = nextEffect;

    // This phase is only used for beforeActiveInstanceBlur.
    // Let's skip the whole loop if it's off.
    if (enableCreateEventHandleAPI) {
      // TODO: Should wrap this in flags check, too, as optimization
      const deletions = fiber.deletions;
      if (deletions !== null) {
        for (let i = 0; i < deletions.length; i++) {
          const deletion = deletions[i];
          commitBeforeMutationEffectsDeletion(deletion);
        }
      }
    }

    const child = fiber.child;
    if (
      (fiber.subtreeFlags & BeforeMutationMask) !== NoFlags &&
      child !== null
    ) {
      child.return = fiber;
      nextEffect = child;
    } else {
      commitBeforeMutationEffects_complete();
    }
  }
}

function commitBeforeMutationEffects_complete() {
  while (nextEffect !== null) {
    const fiber = nextEffect;
    setCurrentDebugFiberInDEV(fiber);
    try {
      // 根据fiber类型处理
      commitBeforeMutationEffectsOnFiber(fiber);
    } catch (error) {
      captureCommitPhaseError(fiber, fiber.return, error);
    }
    resetCurrentDebugFiberInDEV();

    const sibling = fiber.sibling;
    if (sibling !== null) {
      sibling.return = fiber.return;
      nextEffect = sibling;
      return;
    }

    nextEffect = fiber.return;
  }
}
\`\`\``;

export const FUNCTION_COMPONENT = `\`\`\`\js
case FunctionComponent: {
  if (enableUseEventHook) {
    if ((flags & Update) !== NoFlags) {
      // 调度useEffect
      commitUseEventMount(finishedWork);
    }
  }
  break;
}

function commitUseEventMount(finishedWork: Fiber) {
  const updateQueue: FunctionComponentUpdateQueue | null = (finishedWork.updateQueue: any);
  const eventPayloads = updateQueue !== null ? updateQueue.events : null;
  if (eventPayloads !== null) {
    for (let ii = 0; ii < eventPayloads.length; ii++) {
      //将nextImpl即回调函数赋值给ref.impl
      const {ref, nextImpl} = eventPayloads[ii];
      ref.impl = nextImpl;
    }
  }
}
\`\`\``;

export const CLASS_COMPONENT = `\`\`\`\js
case ClassComponent: {
  if ((flags & Snapshot) !== NoFlags) {
    if (current !== null) {
      const prevProps = current.memoizedProps;
      const prevState = current.memoizedState;
      const instance = finishedWork.stateNode;
      // ...省略
      // 调用getSnapshotBeforeUpdate
      const snapshot = instance.getSnapshotBeforeUpdate(
        finishedWork.elementType === finishedWork.type
          ? prevProps
          : resolveDefaultProps(finishedWork.type, prevProps),
        prevState,
      );
      // ...省略
      instance.__reactInternalSnapshotBeforeUpdate = snapshot;
    }
  }
  break;
}
\`\`\``;

export const COMMIT_MUTATION_EFFECTS = `\`\`\`js
export function commitMutationEffects(
  root: FiberRoot,
  finishedWork: Fiber,
  committedLanes: Lanes,
) {
  inProgressLanes = committedLanes;
  inProgressRoot = root;

  setCurrentDebugFiberInDEV(finishedWork);
  commitMutationEffectsOnFiber(finishedWork, root, committedLanes);
  setCurrentDebugFiberInDEV(finishedWork);

  inProgressLanes = null;
  inProgressRoot = null;
}

function recursivelyTraverseMutationEffects(
  root: FiberRoot,
  parentFiber: Fiber,
  lanes: Lanes,
) {
  // Deletions effects can be scheduled on any fiber type. They need to happen
  // before the children effects hae fired.
  const deletions = parentFiber.deletions;
  if (deletions !== null) {
    for (let i = 0; i < deletions.length; i++) {
      const childToDelete = deletions[i];
      try {
        commitDeletionEffects(root, parentFiber, childToDelete);
      } catch (error) {
        captureCommitPhaseError(childToDelete, parentFiber, error);
      }
    }
  }

  const prevDebugFiber = getCurrentDebugFiberInDEV();
  if (parentFiber.subtreeFlags & MutationMask) {
    let child = parentFiber.child;
    while (child !== null) {
      setCurrentDebugFiberInDEV(child);
      commitMutationEffectsOnFiber(child, root, lanes);
      child = child.sibling;
    }
  }
  setCurrentDebugFiberInDEV(prevDebugFiber);
}

function commitReconciliationEffects(finishedWork: Fiber) {
  // Placement effects (insertions, reorders) can be scheduled on any fiber
  // type. They needs to happen after the children effects have fired, but
  // before the effects on this fiber have fired.
  const flags = finishedWork.flags;
  // 如果flag包含Placement，说明有DOM节点需要插入
  if (flags & Placement) {
    try {
      commitPlacement(finishedWork);
    } catch (error) {
      captureCommitPhaseError(finishedWork, finishedWork.return, error);
    }
    // Clear the "placement" from effect tag so that we know that this is
    // inserted, before any life-cycles like componentDidMount gets called.
    // TODO: findDOMNode doesn't rely on this any more but isMounted does
    // and isMounted is deprecated anyway so we should be able to kill this.
    finishedWork.flags &= ~Placement;
  }
  if (flags & Hydrating) {
    finishedWork.flags &= ~Hydrating;
  }
}

function commitMutationEffectsOnFiber(
  finishedWork: Fiber,
  root: FiberRoot,
  lanes: Lanes,
) {
  const current = finishedWork.alternate;
  const flags = finishedWork.flags;

  // The effect flag should be checked *after* we refine the type of fiber,
  // because the fiber tag is more specific. An exception is any flag related
  // to reconciliation, because those can be set on all fiber types.
  switch (finishedWork.tag) {
    case FunctionComponent:
    case ForwardRef:
    case MemoComponent:
    case SimpleMemoComponent: {
      // 递归执行commitMutationEffectsOnFiber
      recursivelyTraverseMutationEffects(root, finishedWork, lanes);
      // 如果flag包含Placement，说明有DOM节点需要插入
      commitReconciliationEffects(finishedWork);

      if (flags & Update) {
        try {
          commitHookEffectListUnmount(
            HookInsertion | HookHasEffect,
            finishedWork,
            finishedWork.return,
          );
          commitHookEffectListMount(
            HookInsertion | HookHasEffect,
            finishedWork,
          );
        } catch (error) {
          captureCommitPhaseError(finishedWork, finishedWork.return, error);
        }
        // Layout effects are destroyed during the mutation phase so that all
        // destroy functions for all fibers are called before any create functions.
        // This prevents sibling component effects from interfering with each other,
        // e.g. a destroy function in one component should never override a ref set
        // by a create function in another component during the same commit.
        if (shouldProfile(finishedWork)) {
          try {
            startLayoutEffectTimer();
            commitHookEffectListUnmount(
              HookLayout | HookHasEffect,
              finishedWork,
              finishedWork.return,
            );
          } catch (error) {
            captureCommitPhaseError(finishedWork, finishedWork.return, error);
          }
          recordLayoutEffectDuration(finishedWork);
        } else {
          try {
            commitHookEffectListUnmount(
              HookLayout | HookHasEffect,
              finishedWork,
              finishedWork.return,
            );
          } catch (error) {
            captureCommitPhaseError(finishedWork, finishedWork.return, error);
          }
        }
      }
      return;
    }
    // ...省略其他case
  }
\`\`\`
`;

export const PARENT_FIBER = `\`\`\`js
const parentFiber = getHostParentFiber(finishedWork);
// 父级DOM节点
const parentStateNode = parentFiber.stateNode;
\`\`\`
`

export const SIBILING = `\`\`\`js
const before = getHostSibling(finishedWork);
\`\`\`
`

export const INSERT = `\`\`\`js
const {tag} = node;
const isHost = tag === HostComponent || tag === HostText;
if (isHost) {
  const stateNode = node.stateNode;
  // 如果兄弟节点存在，就调用insertBefore
  if (before) {
    insertBefore(parent, stateNode, before);
  } else {
    appendChild(parent, stateNode);
  }
}
\`\`\`
`