import Vue from 'vue'
import Vuex from 'vuex'

import jwt from "../common/jwt"
import http from "../http/index"

Vue.use(Vuex)

const state = {
  VuexId: "",
  VuexNickname: "",
  count: 0,
  token: {
    accessToken: jwt.getToken(),
  },
  isAuthenticated: !!jwt.getToken(),
}

const getters = {
  getuserId: (state) => {
    return state.VuexId;
  },
  getuserNickname: (state) => {
    return state.VuexNickname;
  },

  getAccessToken(state) {
    return state.token.accessToken;
  },
  isAuthenticated() {
    if (localStorage.getItem('accessToken') == null) {
      return 0;
    } else {
      return 1;
    }
  },
}

const mutations = {
  mutSetVuexId: (state, userId) => {
    state.VuexId = userId;
  },
  mutSetVuexNickname: (state, userNickname) => {
    state.VuexNickname = userNickname;
  },

  logout: function (state = {}) {
    state.token.accessToken = "";
    state.isAuthenticated = false;
    jwt.destroyToken();
  },
  login: function (state, payload = {}) {
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
  modules: {},
});
