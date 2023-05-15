<template>
  <div class="d-flex align-center justify-center" style="height: 680px;">
    <v-container> <!-- fluid:화면전체를 채우도록 하는 코드 , fill-height: 높이를 최대한 활용하도록 설정-->
      <v-layout align-center justify-center style="height: 600px;">
        <!-- align-center: 화면의 수직방향의 중앙에 위치 ,justify-content: 수평방향 중앙에 설정 -->
        <v-flex xs12 sm8 md6 align-self-center>
          <v-form ref="form" v-model="form" class="pa-4 pt-6" style="border:2px solid rgba(244, 209, 155, 1); border-radius: 5.5px; height: 360px;
          box-shadow: 0px 0px 5px 1px rgba(244, 209, 155, 1); margin-left: 40px;">
            <v-text-field v-model="userId" :rules="[rules.email]" filled color="deep-purple" label="아이디" type="email"
              style="width: 500px;" justify-center></v-text-field>
            <v-text-field v-model="userPw" filled color="deep-purple" label="비밀번호" style="min-height: 96px; width: 500px;"
              :type="show1 ? 'text' : 'password'" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show1 = !show1" justify-center></v-text-field>
            <v-layout justify-center>
              <v-flex xs12 sm8 md6>
                <v-btn class="signin-btn" @click="login()" style="width: 100px; font-size: larger;">로그인</v-btn>
                <v-btn class="signin-btn"><router-link to="/SignUp" class="signin-btn"
                    style="width: 50px;">회원가입</router-link></v-btn>
              </v-flex>
            </v-layout>
            <v-layout justify-center>
              <v-btn class="kakao-btn" @click="kakaoLogin()" text max-width="300">
                <span class="kakao-span">
                  <img class="kakao-img" src="../../assets/kakao_login_medium_narrow.png">
                </span>
              </v-btn>
            </v-layout>
          </v-form>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>


<script>
import axios from 'axios'
import jwt from "@/common/jwt" // jwt 모듈 import 추가
import store from '@/store/store'

export default {
  data: () => ({
    show1: false,
    agreement: false,
    dialog: false,
    email: undefined,
    form: false,
    isLoading: false,
    password: undefined,
    rules: {
      email: v => !!(v || '').match(/@/) || '이메일 형식이 아닙니다',
      required: v => !!v || 'This field is required',
    },
    userId: '',
    userPw: ''
  }),
  methods: {
    login() {
      let tmp = this;
      axios
        .get(tmp._baseUrl + "jwt/login", {
          params: {
            userId: tmp.userId,
            userPw: tmp.userPw,
          },
        })
        .then((result) => {
          // console.log("axios 성공");
          console.log(result);
          if (result.data == "") {
            alert("로그인 실패");
          } else {
            // alert("로그인 성공");
            jwt.saveToken(result.data.token);
            store.commit("login", { accessToken: result.data.token });
            store.dispatch("setVuexId", result.data.userId);
            store.dispatch("setVuexNickname", result.data.userNickname);
            store.dispatch("setVuexNum", result.data.userNum);
            store.dispatch("setVuexProfileImg", result.data.userUrl);
            store.dispatch("setVuexUserPoint", result.data.userPoint);
            store.dispatch("setVuexUserLuxColor", result.data.userLuxColor);
            store.dispatch("setVuexUserColor", result.data.userColor);
            this.$router.push('/')
            // this.$router.go(-1)
            // location.reload()
          }
        })
        .catch((error) => {
          console.log("오류발생");
          console.log(error);
        });
    },
    logout() {
      this.$store.dispatch("logout"); // store의 logout action 호출
      jwt.destroyToken(); // 토큰 제거
    },
    kakaoLogin(){
      
      console.log(window.Kakao)
      window.Kakao.Auth.login({
          scope:'profile_nickname,account_email',
          success:this.getKakaoAccount,
      });
    },
    getKakaoAccount(){
      window.Kakao.API.request({
        url:'/v2/user/me',
        success:res=>{
          const kakao_account=res.kakao_account;
          const userNickname=res.properties.nickname;
          const userId=kakao_account.email;
          axios.get(this._baseUrl + "user/kakao", {
              params : {
                userNickname : userNickname,
                userId : userId
              }
            })
              .then(result=> {
                console.log(result.data);
                if (result.data.userNickname == null) {
                  console.log("회원가입페이지로 보내기")
                  store.dispatch("setVuexId", this.userId);
                  this.$router.push("/SignUp")
                } else {
                  console.log("로그인성공")
                }
              })
              .catch(function (e) {
                console.log(e);
              });
          
        },
        fail : error=>{
          console.log(error);
        }
      })
    }
  }
}

</script>

<style>
.signin-btn {
  background-color: rgba(244, 209, 155, 1) !important;
  color: gray !important;
  margin-right: 20px;
  justify-content: center;
  border-radius: 200px;
  text-decoration: none;
  font-size: larger;

}

.kakao-btn {
  width: fit-content;
  height: fit-content;
  padding: 0;
  margin-top: 50px;
}

.kakao-span {
  display: flex;
  justify-content: center;
  align-items: center;
}

.kakao-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
