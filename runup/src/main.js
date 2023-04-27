import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import axios from 'axios'
import moment from 'moment' // 날짜와 시간을 더욱 효과적으로 쓰기 위한 라이브러리
import { format } from 'date-fns';

//vuetify
// import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import vuetify from './plugins/vuetify'

Vue.use(vuetify);


Vue.config.productionTip = false
Vue.prototype.$axios = axios;
Vue.prototype.moment = moment;
Vue.prototype._baseUrl = "http://localhost:8080/runup/";
window.Kakao.init("06f7105ea41620c32847d4b04c882f9b")

new Vue({
  router,
  store,
  format,
  // vuetify: new Vuetify(),
  vuetify,
  render: h => h(App)
}).$mount('#app')
