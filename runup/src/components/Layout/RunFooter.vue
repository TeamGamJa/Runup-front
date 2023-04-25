<template>
    <v-footer color="rgba(249, 243, 223, 100%)" height="40px">
      <v-spacer></v-spacer>
      <div class="footer-left"><h4>(주)도움닿기</h4></div>
      <v-spacer></v-spacer>
      <div class="footer-center"><img src="https://ifh.cc/g/KVr1QN.png" style="width:200px; height: 40px;"></div>
      <v-spacer></v-spacer>
      <div class="footer-right"><h4>기간: 4/10 ~ 5/12</h4></div>
      <v-spacer></v-spacer>
    </v-footer>
  </template>
  
  <script>
  export default {
    name: 'RunFooter'
  }
  </script>
  
  <style scoped>
  .footer-left {
    display: inline-flex;
    margin-left: 120px;
    margin-right: 400px;
  }
  
  .footer-center {
    display: inline-flex;
    justify-content: center;
    margin-right: 340px;
  }
  
  .footer-right {
    display: inline-flex;
    justify-content: flex-end;
    margin-right: 30px;
  }
  </style>
  