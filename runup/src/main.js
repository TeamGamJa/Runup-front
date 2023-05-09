import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import axios from 'axios'
import moment from 'moment' // 날짜와 시간을 더욱 효과적으로 쓰기 위한 라이브러리
import { format } from 'date-fns';
// import VueNativeSock from 'vue-native-websocket'

//vuetify
// import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import vuetify from './plugins/vuetify'
// import { VueNativeSock } from 'vue-native-websocket'

Vue.use(vuetify);
Vue._watchers = Vue.prototype._watchers = []

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken'); // 토큰을 로컬 스토리지에서 가져옵니다.
  if (token) {
    config.headers['jwt-auth-token'] = token; // 토큰이 있다면 요청 헤더에 추가합니다.
  }
  return config;
}, error => {
  return Promise.reject(error);
});

axios.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response.status === 401) { // 인증 실패 시 처리
    console.log('인증 실패');
  }
  return Promise.reject(error);
});

Vue.config.productionTip = false
Vue.prototype.$axios = axios;
Vue.prototype.moment = moment;
Vue.prototype._baseUrl = "http://localhost:8080/runup/";
window.Kakao.init("06f7105ea41620c32847d4b04c882f9b")

new Vue({
  router,
  store,
  format,
  vuetify,
  render: h => h(App)
}).$mount('#app')
