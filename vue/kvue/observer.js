/**
 * Created by Yes.Man on 2021/7/17 23:58.
 * @file: observer
 * 执行数据响应化(分辨数据是对象还是数组)
 */

// 数组响应式拦截
const arrayProto = Array.prototype;
const _arrayProto = Object.create(arrayProto);
[ 'push', 'pop', 'shift', 'unshift', 'splice' ].forEach(fn => {
  _arrayProto[fn] = function () {
    console.log('array', fn);
    arrayProto[fn].apply(this, arguments);
  };
});

class Observer {
  constructor (data) {
    this.data = data;
    this.observe(data);

  }

  defineReactive (obj, key, val) {
    this.observe(val);

    // 创建Dep实例
    const dep = new Dep();

    Object.defineProperty(obj, key, {
      get: () => {
        console.log('get', key);
        Dep.target && dep.addDep(Dep.target);
        return val;
      },

      set: newVal => {
        if (val !== newVal) {
          console.log('set', key);
          val = newVal;
          this.observe(val);
          dep.notify();
        }
      }
    });
  }

  observe (data) {
    if (typeof data === 'object' && data !== null) {

      if (Array.isArray(data)) {
        // 覆盖原型
        data.__proto__ = _arrayProto;

        // 对数内部元素执行响应式
        Object.keys(data).forEach(key => this.observe(data[key]));
      } else {
        Object.keys(data).forEach(key => this.defineReactive(data, key, data[key]));
      }
    }
  }
}

// const obj = { a: 1 };
// defineReactive(obj, 'a', 1);
// obj.a = 33;
// console.log(obj.a);
