/**
 * Created by Yes.Man on 2021/7/17 23:59.
 * @file: watcher
 * 执行更新函数(更新dom)
 */

/* 临时用于保存watcher测试用 */
const watchers = []

class Watcher {
  constructor (vm, key, fn) {
    this.vm = vm;
    this.key = key;
    this.fn = fn;

    // 触发一下get
    Dep.target = this;
    this.vm[this.key];
    Dep.target = null;

    watchers.push(this)
  }

  /**
   * 将来被Dep调用
   */
  update () {
    this.fn.call(this.vm, this.vm[this.key]);
  }
}
