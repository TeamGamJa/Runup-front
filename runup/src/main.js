import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import axios from 'axios'
import moment from 'moment' // 날짜와 시간을 더욱 효과적으로 쓰기 위한 라이브러리

//vuetify
// import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import vuetify from './plugins/vuetify'

Vue.use(vuetify);


Vue.config.productionTip = false
Vue.prototype.$axios = axios;
Vue.prototype.moment = moment;

new Vue({
  router,
  store,
  // vuetify: new Vuetify(),
  vuetify,
  render: h => h(App)
}).$mount('#app')
