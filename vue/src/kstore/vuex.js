/**
 * Created by Yes.Man on 2021/7/12 23:44.
 * @file: Vuex
 */

let _Vue;

class Store {
  constructor (options) {
    this._mutations = options.mutations;
    this._actions = options.actions;
    this._getters = options.getters;

    // getters
    const computed = {};
    this.getters = {};
    Object.keys(this._getters).map(key => {
      // 获取用户定义的getter
      const fn = this._getters[key];

      // 转换成computed无参形式
      computed[key] = () => fn(this.state);

      // 为getter定义只读属性
      Object.defineProperty(this.getters, key, {
        get: () => this._vm[key]
      });
    });

    // 响应式state
    this._vm = new _Vue({
      data: {
        // 添加$$ 或者 _state_，Vue就不会代理
        $$state: options.state,

        // 能通过this._vm.test访问，就可以直接改变这个数据
        test: 'test'
      },
      computed
    });

    // 绑定this
    this.commit = this.commit.bind(this);
    this.dispatch = this.dispatch.bind(this);
  }

  get state () {
    // _data 或者 $data 都是一样的
    // return this._vm._data.$$state;
    return this._vm.$data.$$state;
  }

  set state (v) {
    console.error(`use store.replaceState() to explicit replace store state.`);
  }

  // $store.commit(type, payload)
  commit (type, payload) {
    const entry = this._mutations[type];
    if (entry) {
      entry(this.state, payload);
    } else {
      console.error(`[vuex] mutation type: ${ type }. Silent option has been removed. `);
    }
  }

  // $store.dispatch(type, payload)
  dispatch (type, payload) {
    const entry = this._actions[type];
    if (entry) {
      entry(this, payload);
    } else {
      console.error(`[vuex] unknown action type: ${ type }.`);
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

// 导出Vuex
export default { Store, install };
