<template>
  <v-app-bar app color="rgba(249, 243, 223, 100%)">
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
    <v-menu offset-y v-if="!isAuthenticated">
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
    </v-menu>
    <v-menu offset-y v-else>
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" icon>
          <v-icon>mdi-account-circle</v-icon>
        </v-btn>
      </template>
      <v-list>
        <router-link to="/SignOut" tag="li" style="cursor:pointer">
          <v-list-item-content>
            <v-list-item-title>로그아웃</v-list-item-title>
          </v-list-item-content>
        </router-link>

        <router-link to="/MyPage" tag="li" style="cursor:pointer"></router-link>
        <v-list-item>
          <v-text-field v-model="search" append-icon="mdi-magnify" @keyup.enter="searchList" label="검색" hide-details
            dense></v-text-field>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>
<script>
export default {
  data: () => ({

  }),
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
