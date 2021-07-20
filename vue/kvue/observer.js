/**
 * Created by Yes.Man on 2021/7/17 23:58.
 * @file: observer
 * 执行数据响应化(分辨数据是对象还是数组)
 */

class Observer {
  constructor (data) {
    this.data = data;
    this.observe(data);
  }

  defineReactive (obj, key, val) {
    this.observe(val);
    Object.defineProperty(obj, key, {
      get: () => {
        console.log('get', key);
        return val;
      },

      set: newVal => {
        if (val !== newVal) {
          console.log('set', key);
          val = newVal;
          this.observe(val);
        }
      }
    });
  }

  observe (data) {
    if (typeof data === 'object' && data !== null) {
      Object.keys(data).forEach(key => this.defineReactive(data, key, data[key]));
    }
  }
}

// const obj = { a: 1 };
// defineReactive(obj, 'a', 1);
// obj.a = 33;
// console.log(obj.a);
