import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import store from "../store/store"

const beforeAuth = isAuth => (to, from, next) => {
    const isAuthenticated = store.getters["isAuthenticated"]
    if((isAuthenticated && isAuth) || (!isAuthenticated && !isAuth)) {
        return next()
    } else {
        next("/")  // 홈 화면으로 이동
    }
}


// 도움 닿기 Main Page
import HelpTouch from '../views/touch/HelpTouch.vue'

// 도움 닿기 종합 검색
import TatalSearch from '../views/tatal/TatalSearch'

// 로그인
import SignIn from '../views/auth/SignIn'

// 회원가입
import SignUp from '../views/auth/SignUp'
 
// 도움 닿기 메인 페이지
import FoundRunning from '../views/Running/FoundRunning'

// 도움 닿기 상세 페이지
import DetailRunning from '../views/Running/DetailRunning'

// 도움 닫기 
import CreateRunning from '../views/Running/CreateRun/CreateRunning'


const routes = [
    {
        path: "/",
        name: "HelpTouch",
        component: HelpTouch,
        
    },
    {
        path:"/TatalSearch",
        name: "TatalSearch",
        component: TatalSearch,
    },
    {
        path: "/FoundRunning",
        name: "FoundRunning",
        component: FoundRunning,
       
    },
    {
        path: "/SignIn",
        name: "SignIn",
        component: SignIn,
    },
    {
        path: "/SignUp",
        name: "SignUp",
        component: SignUp,
    },
    {
        path: "/DetailRunning/:id",
        name: "DetailRunning",
        component: DetailRunning,
    },
    {
        path: "/CreateRunning",
        name: "CreateRunning",
        component: CreateRunning,
        beforeEnter: beforeAuth(false)
    },
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
