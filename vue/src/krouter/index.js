/**
 * Created by Yes.Man on 2021/7/12 14:22.
 */
import Vue from 'vue';
import VueRouter from './vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    // children: [
    //   {
    //     path: '/child',
    //     component: { render (h) { return h('div', 'child'); } }
    //   }
    // ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
