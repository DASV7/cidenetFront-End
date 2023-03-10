import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Swal from "sweetalert2";

Vue.config.productionTip = false
Vue.prototype.$Swal = Swal;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
