/**
 * Created by Yes.Man on 2021/7/12 23:44.
 * file: Vuex
 */

let _Vue;

class Store {
  constructor (options) {
    this._mutations = options.mutations;
    this._actions = options.actions;

    this._vm = new _Vue({
      data: {
        // 添加$$，Vue就不会代理
        $$state: options.state,

        // new Store()能通过this.state访问，就可以直接改变这个数据
        state: 'test'
      }
    });

    console.log(this.state);
  }

  get state () {
    // return this._vm._data.$$state;
    return this._vm.$data.$$state;
  }

  commit (type, payload) {
    console.log(type, payload);
    const entry = this._mutations[type];
    if (entry) {
      entry(this.state, payload);
    }
  }

  dispatch (type, payload) {
    const entry = this._actions[type];
    if (entry) {

    }
  }
}

function install (Vue) {
  _Vue = Vue;

  Vue.mixin({
    beforeCreate () {
      if (this.$options.store) {
        // Vue.prototype.$store = this.$options.store;
        Object.defineProperty(Vue.prototype, '$store', {
          get: () => {
            return this.$options.store;
          }
        });
      }
    }
  });
}

export default { Store, install };
