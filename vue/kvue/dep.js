/**
 * Created by Yes.Man on 2021/7/21 06:40.
 * @file: dep
 * 管理多个Watcher，批量更新
 */

class Dep {
  constructor () {
    this.deps = [];
  }

  addDep (dep) {
    this.deps.push(dep);
  }

  notify () {
    this.deps.forEach(dep => dep.update());
  }
}
