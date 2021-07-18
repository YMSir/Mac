/**
 * Created by Yes.Man on 2021/7/17 12:45.
 * @file: vue
 */

class Vue {
  constructor (options) {
    this.$options = options;
    this.$data = options.data;

    // 代理
    this.proxy();

    // 编译
    new Compile(options.el, this);

    console.log('Vue', this);
    console.log(this.$el);
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

function defineReactive (obj, key, val) {
  Object.defineProperty(obj, key, {
    get: () => {
      console.log('get', key);
      return val;
    },

    set: newVal => {
      if (val !== newVal) {
        console.log('set', key);
        val = newVal;
      }
    }
  });
}

// const obj = { a: 1 };
// defineReactive(obj, 'a', 1);
// obj.a = 33;
// console.log(obj.a);
