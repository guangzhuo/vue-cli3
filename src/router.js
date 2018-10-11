import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

/*现在*/
const Login = resolve => require(['@/Login'], resolve);
const Index = resolve => require(['@/views/Index'], resolve);
const WorkerBrnch = resolve => require(['@/views/workbench'], resolve);
const CabinetMangement = resolve => require(['@/views/operation/cabinet-management'], resolve);
const OrderMangement = resolve => require(['@/views/operation/order-management'], resolve);
const OrderDetails = resolve => require(['@/views/operation/order-management/OrderDetails'], resolve);
const ReplenishmentMangement = resolve => require(['@/views/operation/replenishment-management'], resolve);
const ReplenishmentDetails = resolve => require(['@/views/operation/replenishment-management/ReplenishmentDetails'], resolve);
const ActivityMangement = resolve => require(['@/views/operation/activity-management'], resolve);
const AddActivity = resolve => require(['@/views/operation/activity-management/AddActivity'], resolve);
const UserMangement = resolve => require(['@/views/user/UserMangement'], resolve);
const AddUser = resolve => require(['@/views/user/AddUser'], resolve);
const ModifyUser = resolve => require(['@/views/user/ModifyUser'], resolve);


const Contract = resolve => require(['@/views/customer/Contract'], resolve);
const AddContract = resolve => require(['@/views/customer/AddContract'], resolve);

const Test = resolve => require(['@/Test'], resolve)
const NotFour = resolve => require(['@/views/Error-404'], resolve)
const router = new Router({
    mode: 'history',
    routes: [{
            path: "/",
            name: "login",
            component: Login
        },
        {
            path: "/login",
            component: Login
        },
        {
            path: "/index",
            name: "index",
            component: Index,
            redirect: '/index/workbrnch',
            children: [{
                    path: 'workbrnch',
                    name: 'workbrnch',
                    component: WorkerBrnch
                },
                /*现在 news
                 * */
                {
                    path: 'CabinetMangement',
                    name: 'CabinetMangement',
                    component: CabinetMangement
                },
                {
                    path: 'OrderMangement',
                    name: 'OrderMangement',
                    component: OrderMangement
                },
                {
                    path: 'OrderDetails',
                    name: 'OrderDetails',
                    component: OrderDetails
                },
                {
                    path: 'ReplenishmentMangement',
                    name: 'ReplenishmentMangement',
                    component: ReplenishmentMangement
                },
                {
                    path: 'ReplenishmentDetails',
                    name: 'ReplenishmentDetails',
                    component: ReplenishmentDetails
                },
                {
                    path: 'ActivityMangement',
                    name: 'ActivityMangement',
                    component: ActivityMangement
                },
                {
                    path: 'AddActivity',
                    name: 'AddActivity',
                    component: AddActivity
                },
                {
                    path: 'UserMangement',
                    name: 'UserMangement',
                    component: UserMangement
                },
                {
                    path: 'AddUser',
                    name: 'AddUser',
                    component: AddUser
                },
                {
                    path: 'ModifyUser',
                    name: 'ModifyUser',
                    component: ModifyUser
                },
                {
                    path: 'contract',
                    name: 'contract',
                    component: Contract
                },
                {
                    path: 'addcontract',
                    name: 'addcontract',
                    component: AddContract
                },

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
router.beforeEach((to, from, next) => {
    // ...
    /*var userInfo = window.localStorage.getItem('token');//获取浏览器缓存的用户信息
    if(userInfo){ //如果有就直接到首页咯
      next();
    } else {
      if(to.path=='/login'){ //如果是登录页面路径，就直接next()
        next();
      } else { //不然就跳转到登录；
        next('/login');
      }
    }*/
    next()


})
export default router