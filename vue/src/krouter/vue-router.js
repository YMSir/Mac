/**
 * Created by Yes.Man on 2021/7/12 14:23.
 * VueRouter Class
 */
import Link from './link';
import View from './view';

let _Vue;

export default class VueRouter {
  constructor (options) {
    this.options = options;

    // current 响应式数据
    _Vue.util.defineReactive(this, 'current', window.location.hash.slice(1) || '/');

    // 监控url变化
    window.addEventListener('hashchange', () => {
      this.current = window.location.hash.slice(1);
    });
  }

  /**
   * Vue.use
   * @param Vue
   */
  static install (Vue) {
    _Vue = Vue;

    // 通过全局混入注册路由实例
    Vue.mixin({
      // 延迟到组件创建前获取组件实例的初始选项 main.js => new Vue($options)
      beforeCreate () {
        // 当前组件实例的初始化选项 $options
        if (this.$options.router) {
          // Vue.prototype.$router = this.$options.router;
          Object.defineProperty(Vue.prototype, '$router', {
            get: () => {
              return this.$options.router;
            }
          });
        }
      }
    });

    // 注册router-link
    Vue.component('RouterLink', Link);

    // 注册router-view
    Vue.component('RouterView', View);
  }
};
