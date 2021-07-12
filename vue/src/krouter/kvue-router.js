/**
 * Created by Yes.Man on 2021/7/12 14:23.
 */
import Link from './link';
import View from './view';

let _Vue;

export default class VueRouter {
  /**
   * Vue.use
   * @param Vue
   */
  static install (Vue) {
    _Vue = Vue;

    // 注册router-link
    Vue.component('RouterLink', Link);

    // 注册router-view
    Vue.component('RouterView', View);
  }
};
