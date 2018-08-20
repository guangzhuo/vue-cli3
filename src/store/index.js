import Vue from "vue";
import Vuex from "vuex";
import LoginStore from './modules/login';
import createLogger from '@/plugins/logger'
Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    LoginStore
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
});
