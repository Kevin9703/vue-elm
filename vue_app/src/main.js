import Vue from 'vue';
import Vant from 'vant';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';
import api from './api/index';
import 'vant/lib/index.css';

Vue.prototype.$api = api;
Vue.prototype.axios = axios;
Vue.config.productionTip = false;
Vue.use(Vant);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
