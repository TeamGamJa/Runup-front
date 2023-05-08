<template>
  <v-container class="footer-container pa-0" fluid>  <!-- class에 pa-0 이라는 속성은 v-container에 자동으로 생기는 padding을 안생기게 하는 것이다.-->
    <v-row>
       <v-footer class="Footer-all" color="white">
        <v-spacer></v-spacer>
        <div class="footer-left">
          <v-img src="https://ifh.cc/g/wHAhgX.png" width="130" height="40" contain></v-img>
        </div>
        <v-spacer></v-spacer>
        <div class="footer-center"><img src="https://ifh.cc/g/Tt5gj3.png" style="width:200px; height: 40px;"></div>
        <v-spacer></v-spacer>
        <div class="footer-right">
          <h4> 누구든 멘토가 될 수 있다! </h4>
        </div>
        <v-spacer></v-spacer>
      </v-footer>
    </v-row>
  </v-container>
</template>
  
<script>
export default {
  name: 'RunFooter'
}
</script>
  
<style scoped>
.footer-container {
  display: inline-block;
  width: 100%;
 }
.Footer-all {
  flex-direction: row;
  display: flex;
  justify-content: space-around;
  width: 100%;

}

.footer-left {
  display: inline-flex;

  /* margin-left: 120px;
    margin-right: 400px; */
}

.footer-center {
  display: inline-flex;
  /* justify-content: center;
    margin-right: 340px; */
}

.footer-right {
  display: inline-flex;
  /* justify-content: flex-end;
    margin-right: 30px; */
}

.sample {
  width: 100%;
  max-height: 2px;
  background-color: black;
}</style>
  