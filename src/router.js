import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
const Login = resolve => require(['@/Login'],resolve);
const Index = resolve => require(['@/views/Index'],resolve);
const WorkerBrnch = resolve => require(['@/views/workbench'],resolve);
const CustomerManagement = resolve => require(['@/views/customer/CustomerManagement'],resolve);



const Test =  resolve => require(['@/Test'],resolve)
const NotFour =  resolve => require(['@/views/Error-404'],resolve)
export default new Router({
  mode :'history',
  routes: [
      {
          path: "/",
          name: "login",
          component: Login
      },
      {
          path: "/login",
          name: "login",
          component: Login
      },
    {
      path: "/index",
      name: "index",
      component: Index,
      redirect: '/index/workbrnch',
      children: [
          {
              path:'workbrnch',
              component: WorkerBrnch
          },
          {
              path: 'customerManagement',
              component: CustomerManagement
          }
      ]
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    },
    {
          path: '*',
          name: 'NotFour-404',
          component: NotFour
      }
  ]
});
