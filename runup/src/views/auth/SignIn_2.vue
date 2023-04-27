<template>
	<div class="home">
		<br><br>
		아이디 : <input type="text" v-model="userId">
		비밀번호 : <input type="text" v-model="userPw">
		<input type="button" @click="login" value="로그인">
		<div class="kakaologin">
			<a class="kakaoa" @click="kakaoLogin()">
			<img class="kakaoimg" src="../../assets/kakao_login_medium_narrow.png" style="max-width: 30%; height: auto;">
			</a>
		</div>
	</div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
	name: 'LoginInput',
	data() {
		return {
			userId : '',
			userPw : ''
		}
	},
	methods: {
		login() {
			let tmp = this;
			axios.get(tmp._baseUrl + "jwt/login" , {
				params : {
					userId : tmp.userId,
					userPw : tmp.userPw
				}
			})
			.then ((result)=> {
            console.log("axios 성공");
            console.log(result)
            if (result.data == "") {
              alert("로그인 실패")
            }else{
              alert("로그인 성공")
              localStorage.setItem("jwt",result.data);
              alert(result.data)
              this.setVuexId(result.data.userId);
              this.setVuexNickName(result.data.userNickName);
              this.$moveTo("/")
            }
        })
        .catch((error)=>{
            console.log("오류발생")
            console.log(error);
        })
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
				console.log("1")
                console.log(result.data);
                if (result.data.userNickname == null) {
                  console.log("회원가입페이지로 보내기")
                } else {
                  console.log("로그인성공")
                }
              })
              .catch(function (e) {
				console.log("Test")
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
  