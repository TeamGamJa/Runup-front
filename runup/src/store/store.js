import Vue from 'vue'
import Vuex from 'vuex'

import jwt from "../common/jwt"
import http from "../http/index"

Vue.use(Vuex)

export default new Vuex.Store({
    // count state 속성 추가
    state: { // [변수들의 집합]
        // 글로벌로 관리될 상태 값
        VuexId:"",
        VuexNickName:"",
        
        count:0,
        token: {
            accessToken: jwt.getToken(),
        },
        isAuthenticated: !!jwt.getToken(),
    },
    getters: { //[state의 변수들을 get 호출]
        // 데이터에 변화를 줄 순 없다.
        getuserId: (state) => {
            return state.VuexId;
        },
        getuserNickName: (state) => {
            return state.VuexNickName;
        },

        getAccessToken(state) {
            return state.token.accessToken;
        },
        isAuthenticated(state) {
            return state.isAuthenticated;
        },
    },
    mutations: { // [변수들을 조작하는 함수들]
        // 실제 데이터 변화가 일어나는 곳
        mutSetVuexId: (state,userId) => {
            state.VuexId = userId;
        },
        mutSetVuexNickName: (state, userNickName) => {
            state.VuexNickName = userNickName;
        },

        logout: function (state ={}) {
            state.token.accessToken = "";
            state.isAuthenticated = false;
            jwt.destroyToken();
        },
        login: function ( state, payload = {}) {
            state.token.accessToken = payload.accessToken;
            state.isAuthenticated = true;
            jwt.saveToken(payload.accessToken);
        },
    },
    actions: { // [비동기 처리를 하는 함수들]
        // mutaion을 일을키위한 행동, 컴포넌트에서는 actions을 사용한다
        setVuexId: (contect , userId) => {
            contect.commit("mutSetVuexId",userId);
        },
        setVuexNickName: (contect,userNickName) => {
            contect.commit("mutSetVuexNickName",userNickName);
        },

        logout: function (context, payload) {
            return new Promise((resolve) => {
                setTimeout(function () {
                    context.commit("logout", payload);
                    resolve({});
                }, 1000);
            });
        },
        register: function (context, payload) {
            let params = {
                userId: payload.userId,
                userPw: payload.userPw,
                name: payload.name,
            }; 
            return new Promise((resolve, reject) => {
                http
                .post("/api/sample/register", params)
                .then((response) => {
                    const {data} = response;
                    context.commit("login", {
                        accessToken: data.accessToken,
                    });

                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
            });
        },
        login: function (context,payload) {
            let params = {
                userId: payload.userId,
                userPw: payload.userPw,
            };
            return new Promise((resolve, reject) => {
                http.post("/api/sample/login", params)
                .then((response) => {
                    const { data } = response;
                    context.commit("login", {
                        accessToken: data.accessToken,
                    });

                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
            });
        },
    },
    modules: {},
})


