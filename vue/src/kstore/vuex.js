/**
 * Created by Yes.Man on 2021/7/12 23:44.
 * file: Vuex
 */

let _Vue;

class Store {
  constructor (options) {
    this._mutations = options.mutations;
    this._actions = options.actions;

    const _vm = new _Vue({
      data: {
        $$state: options.state
      }
    });
  }

  commit () {

  }

  dispatch () {

  }
}

function install (Vue) {
  _Vue = Vue;
}

export default { Store, install };
