<template>
  <v-app>
  <v-main>
      <v-toolbar app color="rgba(249, 243, 223, 100%)" style="position: fixed; top: 0; left: 0; right: 0; z-index: 1;">
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
        <!-- 로그인 여부에 따라 다르게 화면을 나타내야된다 -->
        <v-btn text class="menuBtn-1" :rounded="true" @click="handleButtonClick"><v-icon>mdi-account-circle</v-icon></v-btn>
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
          <v-list-item link @click="goToMyPage">
            <v-list-item-content>
              <v-list-item-title>내 정보</v-list-item-title>
            </v-list-item-content>            
          </v-list-item>
          <v-list-item link @click="goToMyPage">
            <v-list-item-content>
              <v-list-item-title>나의 도움주기</v-list-item-title>
            </v-list-item-content>            
          </v-list-item>
          <v-list-item link @click="goToMyPage">
            <v-list-item-content>
              <v-list-item-title>나의 도움받기</v-list-item-title>
            </v-list-item-content>            
          </v-list-item>
          <v-list-item link @click="goToMyPage">
            <v-list-item-content>
              <v-list-item-title>나의 도움신청</v-list-item-title>
            </v-list-item-content>            
          </v-list-item>
        </v-list>
        <div class="pa-2">
          <v-btn block @click="logout()">
            로그아웃
          </v-btn>
        </div>
      </v-navigation-drawer>
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
      };
    },
    computed: {
      isAuthenticated() {
        return store.getters.isAuthenticated
      },
    },
    methods: {
      handleButtonClick() {
    if (this.isAuthenticated) {
      // drawer 이벤트 발생
      this.drawer = !this.drawer;
    } else {
      // 로그인 페이지로 이동하는 이벤트 발생
      this.$router.push('/SignIn');
    }
    },
    goToMyPage(){
      this.$router.push('/Mypage')
    },
    logout(){
      store.dispatch('logout').then(() => {
      this.$router.push('/')
    })
    }
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