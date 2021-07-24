/**
 * Created by Yes.Man on 2021/7/17 12:45.
 * @file: vue
 * 框架构造函数
 */

class Vue {
  constructor (options) {
    this.$options = options;
    this.$data = options.data;

    // 对数据做响应式拦截
    new Observer(this.$data);

    // 代理
    this.proxy();

    // 编译
    new Compile(options.el, this);

    // mounted
    options.mounted.call(this);
  }

  /**
   * 代理data中数据到Vue实例上
   */
  proxy () {
    Object.keys(this.$data).forEach(key => {
      Object.defineProperty(this, key, {
        get: () => this.$data[key],
        set: val => void (this.$data[key] = val)
      });
    });
  }
}
