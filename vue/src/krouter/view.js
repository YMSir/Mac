/**
 * Created by Yes.Man on 2021/7/12 14:23.
 * RouterView Component
 */
export default {
  name: 'RouterView',
  render (h) {
    // this.$router => new VueRouter({ options })
    const { current, options: { routes } } = this.$router;
    const route = routes.find(route => route.path === current);

    // Todo 嵌套路由

    return h(route.component);
  }
};
