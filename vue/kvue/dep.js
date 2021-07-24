/**
 * Created by Yes.Man on 2021/7/21 06:40.
 * @file: dep
 * 管理多个Watcher，批量更新
 */

class Dep {
  constructor () {
    this.deps = [];
  }

  /**
   * 添加依赖
   * @param dep Watch实例
   */
  addDep (dep) {
    this.deps.push(dep);
  }

  /**
   *
   */
  notify () {
    this.deps.forEach(dep => dep.update());
  }
}
