import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import directives from "@/plugins/directive";
import filters from "@/plugins/filters";
import lazyload from 'vue-lazyload';
// import { Button } from 'element-ui'; //可按需加载组件
// Vue.use(Button);
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(lazyload,{
  preLoad: 1.3,
  error: require('@/assets/images/common/error.jpg'),
  loading: require('@/assets/images/common/loadding.gif')
})
Vue.use(ElementUI);
Vue.use(directives);
Vue.use(filters);


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
