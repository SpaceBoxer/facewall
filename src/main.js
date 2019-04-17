import Vue from 'vue';
import App from './App.vue';
import router from '.';
import store from './store/store';

import showToast from './components/toast';
import dialog from './components/dialog/dialog';
import axiosInstance from './utils/axios-instance';

window.Promise = Promise;

Vue.prototype.$toast = showToast;
Vue.prototype.$http = axiosInstance;

const isDebugMode = process.env.NODE_ENV !== 'production';

Vue.config.debug = isDebugMode;
Vue.config.devtools = isDebugMode;
Vue.config.productionTip = false;

// 全局注册公共组件，打包到 app.js 里面，优化体积
Vue.component('spacebox-dialog', dialog);

new Vue({  // eslint-disable-line
  router,
  store,
  render: h => h(App)
}).$mount('#facewall_app');
