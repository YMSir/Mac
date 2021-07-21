/**
 * Created by Yes.Man on 2021/7/17 23:59.
 * @file: watcher
 * 执行更新函数(更新dom)
 */

class Watcher {
  constructor (vm, key, updater) {
    this.vm = vm;
    this.key = key;
    this.updater = updater;

    // 触发一下get
    Dep.target = this;
    // this.vm[this.key];
    Dep.target = null;
  }

  /**
   * 将来被Dep调用
   */
  update () {
    this.updater.call(this.vm, this.vm[this.key]);
  }
}
