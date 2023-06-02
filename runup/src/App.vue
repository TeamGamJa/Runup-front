<template>
  <v-app>
    <!-- RunHeader 상단바 시작 -->
    <v-main class="Main-All" >
      <div class="toolbar-wrapper">
        <v-toolbar app color="rgba(249, 243, 223, 100%)" style="position: fixed; top: 0; left: 0; right: 0; z-index: 1;">
          <v-toolbar-title>
            <router-link to="/">
              <v-img src="https://ifh.cc/g/nqOcCY.png" height="48" contain></v-img>
            </router-link>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn text to="/FoundRunning" class="menuBtn" :rounded="true">도움받기</v-btn>
          <v-btn text to="/CreateRunning" class="menuBtn" :rounded="true">도움관리</v-btn>
          <v-btn text to="/QuestionBoard" class="menuBtn" :rounded="true">묻고 답하기</v-btn>
          <v-btn text to="/SFountain" class="menuBtn" :rounded="true">옹달샘</v-btn>
          <!-- 로그인 여부에 따라 다르게 화면을 나타내야된다 -->
          <v-btn text class="menuBtn-1" :rounded="true"
          @click="handleButtonClick"><v-icon>mdi-account-circle</v-icon></v-btn>
        </v-toolbar>
      </div>
      
      <v-navigation-drawer v-model="drawer" absolute temporary right style="position: fixed;" >
        <v-list-item>
          <v-list-item-avatar>
            <v-img :src="$store.getters.getProfileImg"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ this.$store.getters.getUserNickname }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list nav dense>
          <v-list-item link @click="goToMyPage">
            <v-list-item-content>
              <v-list-item-title>내 정보</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link @click="goToMyRecord">
            <v-list-item-content>
              <v-list-item-title>달리기 기록지</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link @click="goToMyClass">
            <v-list-item-content>
              <v-list-item-title>나의 수업 통계</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link @click="goToMessageBox">
            <v-list-item-content>
              <v-list-item-title>쪽지함</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <div class="pa-2">
          <v-btn block @click="logout()">
            로그아웃
          </v-btn>
        </div>
      </v-navigation-drawer>
      <!-- RunHeader 상단바 끝 -->

      <!-- 화면의 몸통부분 -->
      <v-container class="Main-Body">
        <router-view />
      </v-container>

      <!-- 화면의 footer -->
      <!-- <v-footer class="Main-Footer" color="rgba(249, 243, 223, 100%)"> -->
        <v-container class="Main-Footer" fluid>
          <RunFooter/>
        </v-container>
        <!-- </v-footer> -->
      </v-main>
  </v-app>
</template>

<script>
import store from '@/store/store'
import RunFooter from './components/Layout/RunFooter.vue';

export default {
  name: 'App',

  components: {
    RunFooter

  },
  data() {
    return {
      drawer: false,
      previousRoute: "", // 이전경로

    };
  },
  computed: {
    isAuthenticated() {
      return store.getters.isAuthenticated;
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
    goToMyPage() {
      this.$router.push('/MyPage')
    },
    goToMessageBox() {
      this.$router.push('/MessageInbox')
    },
    goToMyRecord() {
      this.$router.push('/MyRecord')
    },
    goToMyClass() {
      this.$router.push('/MyClass')
    },  
    logout() {
      store.dispatch('logout').then(() => {
        location.reload();
      })
    }
  }
}
</script>


<style>
.Main-All {
  display: flex;
  flex-direction: column;
  display: inline-block;
  
}
.Main-Body {
  margin-left: 1%;
  margin-right: 1%;
  max-width: 100%;
  height: 95%;
  margin-top: 50px;
}
.Main-Footer {
  /* display:inline-flex; */
  /* position: center; */
  /* width: 100%;  */
  /* max-height: 8%; */
  /* z-index: 1; */
  border-top: 2px solid rgba(244, 209, 155, 1) ;
}
.menuBtn {
  color: gray !important;
  background-color: rgba(253, 252, 229, 1);
  justify-content: flex-end;
  border-radius: 200px;
  margin-right: 10px;

}
</style>
