export const INIT_DATA = `\`\`\`js
function initData (vm: Component) {
    let data = vm.$options.data
    data = vm._data = typeof data === 'function'
      ? getData(data, vm)
      : data || {}

    // 以下省略添加响应式的过程 
  }

export function getData (data: Function, vm: Component): any {
    try {
        //使用call传入vm，这样对于每个vm都创建了一份数据
        return data.call(vm, vm)
    } catch (e) {
        handleError(e, vm, data())
        return {}
    } finally {
        popTarget()
    }
}
\`\`\``;
