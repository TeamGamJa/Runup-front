import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';

import jwt from "../common/jwt"
import http from "../http/index"

Vue.use(Vuex)

const state = {
  VuexId: "",
  VuexNickname: "",
  VuexNum: "",
  VuexProfileImg:"",
  count: 0,
  token: { // 사용자 인증을 위한 데이터 구조체로 사용자를 구분하는 고유한 식별자나 사용자의 권한 정보 등을 포함
    accessToken: jwt.getToken(),
  },
  isAuthenticated: !!jwt.getToken(), // 사용자가 인증되었는지 여부를 나타내는 Vuex의 상태변수
}

const getters = {
  getUserId: (state) => {
    return state.VuexId;
  },
  getUserNickname: (state) => {
    return state.VuexNickname;
  },

  getAccessToken(state) {
    return state.token.accessToken;
  },
  isAuthenticated(state) {
    // if (localStorage.getItem('accessToken') == null) {
    //   return 0;
    // } else {
    //   return 1;
    // }
    return state.isAuthenticated;
  },
  getUserNum(state) {
    return state.VuexNum;
  },
  getProfileImg(state) {
    return state.VuexProfileImg;
  }
}

const mutations = {
  mutSetVuexId: (state, userId) => {
    state.VuexId = userId;
  },
  mutSetVuexNickname: (state, userNickname) => {
    state.VuexNickname = userNickname;
  },
  mutSetVuexNum: (state, userNum) => {
    state.VuexNum = userNum;
  },
  mutSetVuexProfileImg: (state, userUrl) => {
    state.VuexProfileImg = userUrl;
  },
  logout: function (state = {}) {
    state.token.accessToken = "";
    state.isAuthenticated = false;
    jwt.destroyToken();
  },
  login: function (state, payload = {}) {
    console.log('asdfasdf');
    state.token.accessToken = payload.accessToken;
    state.isAuthenticated = true;
    jwt.saveToken(payload.accessToken);
  },
  setAccessToken(state, token) {
    state.token.accessToken = token;
  },
}

const actions = {
  setVuexId: (context, userId) => {
    context.commit("mutSetVuexId", userId);
  },
  setVuexNickname: (context, userNickname) => {
    context.commit("mutSetVuexNickname", userNickname);
  },
  setVuexNum: (context, userNum) => {
    context.commit("mutSetVuexNum", userNum);
  },
  setVuexProfileImg: (context, userUrl) => {
    context.commit("mutSetVuexProfileImg", userUrl);
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
          const { data } = response;
          context.commit("login", {
            accessToken: data.accessToken,
          });

          // token을 store의 state의 token에 저장
          context.commit("setAccessToken", data.accessToken);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  login: function (context, payload) {
    let params = {
      userId: payload.userId,
      userPw: payload.userPw,
    };
    return new Promise((resolve, reject) => {
      http
        .post("/api/sample/login", params)
        .then((response) => {
          const { data } = response;
          context.commit("login", {
            accessToken: data.accessToken,
          });

          // token을 store의 state의 token에 저장
          context.commit("setAccessToken", data.accessToken);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  plugins: [
    createPersistedState({ // 여기안에 쓸 모듈들을 저장해라.
      getters
    })
  ],
  modules: {},
});
