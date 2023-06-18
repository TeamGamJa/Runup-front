// jwt.js

const ACCESS_TOKEN_KEY = "accessToken"; // "id-token"에서 "accessToken"으로 변경

export default {
  getToken() {        // localstorage에서 액세스 토큰을 검색
    // console.log('getToken 불림당했다')
    return localStorage.getItem(ACCESS_TOKEN_KEY); // 
  },
  saveToken(token) {  // localStorage에서 액세스 토큰을 저장
    // console.log('토큰호출'+token)
    localStorage.setItem(ACCESS_TOKEN_KEY, token); // "id-token"에서 "ACCESS_TOKEN_KEY"로 변경
  },
  destroyToken() {    // localStorage에서 액세스 토큰을 삭제
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem("vuex") // "id-token"에서 "ACCESS_TOKEN_KEY"로 변경
  },
}
