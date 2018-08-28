import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

const Index = resolve => require(['@/views/index'],resolve)
const Test =  resolve => require(['@/views/test'],resolve)
const NotFour =  resolve => require(['@/views/404'],resolve)
export default new Router({
  mode :'history',
  routes: [
    {
      path: "/",
      name: "index",
      component: Index
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    },
      {
          path: '*',
          name: '404',
          component: NotFour
      }
  ]
});
