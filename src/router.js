import Vue from "vue";
import Router from "vue-router";
// import Index from '@/views/index';
// import Test from '@/views/test';
Vue.use(Router);

export default new Router({
  mode :'history',
  routes: [
    {
      path: "/",
      name: "index",
      component: resolve => require(['@/views/index'],resolve)
    },
    {
      path: '/test',
      name: 'test',
      component: resolve => require(['@/views/test'],resolve)
    }
  ]
});
