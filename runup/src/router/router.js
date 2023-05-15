import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import store from "../store/store"

// Vue Router의 Navigation Guards 중 하나인 beforeEach 함수를 사용해 인증 여부를 체크하는 함수를 정의하는 코드
// isAuth는 함수의 인자로 Boolean 값을 받는다.
// 이 함수는 store.getters["isAuthenticated"]를 사용하여 현재 사용자가 인증되어 있는지 여부를 가져온다. 가져온 것을 isAuthenticated 변수에 저장
// isAuth와 isAuthenticated의 값을 비교해서 값이 일치하면 next() 틀리면 next("/SignIn")를 호출하여 로그인으로 이동
const beforeAuth = isAuth => (to, from, next) => {
    const isAuthenticated = store.state.isAuthenticated
    console.log(isAuthenticated);
    console.log(isAuth);
    if((isAuthenticated == isAuth)) {
        return next()
    } else {
        next("/SignIn")  // 홈 화면으로 이동
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

// 묻고 답하기
import QuestionBoard from '../views/Questino&Answer/QuestionBoard'

// 옹달셈
import SFountain from '../views/SpringPool/SFountain'

// 도움 닫기 
import CreateRunning from '../views/Running/CreateRun/CreateRunning'

// 채팅
import ChatView from '../views/chatting/ChatView.vue'

// 내 정보
import MyPage from '../views/MyInfo/MyPage'
import MyClass from '../views/MyInfo/MyClass'
import MyRecord from '../views/MyInfo/MyRecord'
import MyPoint from '../views/MyInfo/MyPoint'
import MyQuestion from '../views/MyInfo/MyQuestion'
import MyPageEdit from '../views/MyInfo/MyPageEdit'
import MyPageImgEdit from '../views/MyInfo/MyPageImgEdit'

// 쪽지함
import MessageInbox from '../views/Message/MessageInbox'
import MessageSendbox from '../views/Message/MessageSendbox'
import MessageTrashcan from '../views/Message/MessageTrashcan'

// 평가화면
import EvaluatePage from '../views/Evaluation/EvaluatePage'

// 요약 화면

import TestVue from '../views/test/TestVue.vue'

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
        path: "/QuestionBoard",
        name: "QuestionBoard",
        component: QuestionBoard,
    },
    {
        path: "/CreateRunning",
        name: "CreateRunning",
        component: CreateRunning,
        beforeEnter: beforeAuth(true)
    },
    {
        path: "/Chat",
        name: "Chat",
        component: ChatView,
        beforeEnter: beforeAuth(true)
    },
    {
        path: "/MyPage", 
        name: "MyPage",
        component: MyPage,
        beforeEnter: beforeAuth(true)
    },
    {
        path: "/MyClass", 
        name: "MyClass",
        component: MyClass,
        beforeEnter: beforeAuth(true)
    },
    {
        path: "/MyPoint", 
        name: "MyPoint",
        component: MyPoint,
        beforeEnter: beforeAuth(true)
    },
    {
        path: "/MyRecord", 
        name: "MyRecord",
        component: MyRecord,
        beforeEnter: beforeAuth(true)
    },
    {
        path: "/MyQuestion", 
        name: "MyQuestion",
        component: MyQuestion,
        beforeEnter: beforeAuth(true)
    },
    {
        path: "/MyPageEdit", 
        name: "MyPageEdit",
        component: MyPageEdit,
        beforeEnter: beforeAuth(true)
    },
    {
        path: "/MyPageImgEdit", 
        name: "MyPageImgEdit",
        component: MyPageImgEdit,
        beforeEnter: beforeAuth(true)
    },
    {
        path: "/MessageInbox",
        name: "MessageInbox",
        component: MessageInbox,
        beforeEnter: beforeAuth(true)
    },
    {
        path: "/MessageSendbox",
        name: "MessageSendbox",
        component: MessageSendbox,
        beforeEnter: beforeAuth(true)
    },
    {
        path: "/MessageTrashcan",
        name: "MessageTrashcan",
        component: MessageTrashcan,
        beforeEnter: beforeAuth(true)
    },

    {
        path: "/Test",
        name: "Test",
        component: TestVue,
    },
    {
        path: "/SFountain",
        name: "SFountain",
        component: SFountain, 
    },
    {
        path: "/EvaluatePage",
        name: "EvaluatePage",
        component: EvaluatePage,
    }
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
