import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router/router.js';
import store from './store/store.js';
import './plugins/axios.js';

Vue.config.productionTip = false


new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
