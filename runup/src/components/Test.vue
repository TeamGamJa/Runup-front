<template>
    <v-app>
      <v-main style="overflow-y: auto;">
        <v-toolbar>
          <v-toolbar-title>
            <router-link to="/">
              <v-img src="https://ifh.cc/g/nqOcCY.png" height="48" contain></v-img>
            </router-link>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn text to="/FoundRunning" class="menuBtn" :rounded="true">도움받기</v-btn>
          <v-btn text to="/CreateRunning" class="menuBtn" :rounded="true">도움주기</v-btn>
          <v-btn text to="/QA" class="menuBtn" :rounded="true">묻고 답하기</v-btn>
          <v-btn text to="/pool" class="menuBtn" :rounded="true">옹달셈</v-btn>
          
          <!-- 로그인, 회원가입 -->
          <v-btn text class="menuBtn" :rounded="true" @click="drawer = !drawer">메뉴</v-btn>
        </v-toolbar>
          
          <v-navigation-drawer v-model="drawer" absolute temporary right>
            <v-list-item>
              <v-list-item-avatar>
                <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
              </v-list-item-avatar>
              
              <v-list-item-content>
                <v-list-item-title>John Leider</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            
            <v-divider></v-divider>
            
            <v-list dense>
              <v-list-item v-for="item in beforelogin" :key="item.title" link>
                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-navigation-drawer>
          
          <!-- <v-menu offset-y v-if="!isAuthenticated">
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" icon>
                <v-icon>mdi-account-circle</v-icon>
              </v-btn>
            </template>
            <v-list>
              <router-link to="/SignIn" tag="li" style="cursor:pointer">
                <v-list-item-content>
                  <v-list-item-title>로그인</v-list-item-title>
                </v-list-item-content>
              </router-link>
              <router-link to="/SignUp" tag="li" style="cursor:pointer">
                <v-list-item-content>
                  <v-list-item-title>회원가입</v-list-item-title>
                </v-list-item-content>
              </router-link>
              <v-list-item>
                <v-text-field v-model="search" append-icon="mdi-magnify" @keyup.enter="searchList" label="검색" hide-details
                dense></v-text-field>
              </v-list-item>
            </v-list>
          </v-menu> -->
          <!-- 로그아웃, 마이페이지 -->
          <!-- <v-menu offset-y v-else>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" icon>
                <v-icon>mdi-account-circle</v-icon>
              </v-btn>
            </template>
            <v-list>
              <router-link to="/" tag="li" style="cursor:pointer">
                <v-list-item-content>
                  <v-list-item-title>로그아웃</v-list-item-title>
                </v-list-item-content>
              </router-link>
              
              <router-link to="/MyPage" tag="li" style="cursor:pointer">
                
                <v-list-item-title>마아페이지</v-list-item-title>
              </router-link>
              <v-list-item>
                <v-text-field v-model="search" append-icon="mdi-magnify" @keyup.enter="searchList" label="검색" hide-details
                dense></v-text-field>
              </v-list-item>
            </v-list>
          </v-menu> -->
      </v-main>
    </v-app>
  </template>
  
  <script>
  import store from '@/store/store'
  
  export default {
    name: 'RunHeader',
    data() {
      return {
        drawer: false,
        beforelogin: [
          { title: '로그인' },
        ],
        afterlogin:[
          { title: '마이페이지' },
          { title: '로그아웃' },
        ]
      };
    },
    computed: {
      isAuthenticated() {
        return store.getters.isAuthenticated
      },
    },
    methods: {
  
    }
  }
  </script>
  
  <style>
  .menuBtn {
    color: gray !important;
    background-color: rgba(253, 252, 229, 1);
    justify-content: flex-end;
    border-radius: 200px;
    margin-right: 10px;
  
  }
  </style>
  