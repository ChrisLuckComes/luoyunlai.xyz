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
