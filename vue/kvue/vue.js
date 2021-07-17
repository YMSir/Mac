/**
 * Created by Yes.Man on 2021/7/17 12:45.
 * @file: vue.js
 */

class Vue {
  constructor (options) {
    this.$options = options;
    this.$data = options.data;
    this.$el = options.el;

    this.proxy();
  }

  proxy () {
    Object.keys(this.$data).forEach(key => {
      Object.defineProperty(this, key, {
        get: () => this.$data[key],
        set: val => void (this.$data[key] = val)
      });
    });
  }
}
