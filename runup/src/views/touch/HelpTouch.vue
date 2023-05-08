<template>
  <v-container class="MainPage-Screen">
    <v-row class="mt-2">
      <v-col cols="4">
        <div class="text">
          <h3>
            설명을 시작하겠습니다. 여기는 설명란이고요 설명을 길게 쓸것입니다.
            최대한 길게 써서 작성할 것이니 기대 많이 해주시고요 구독 좋아요
            한번씩 부탁드립니다.
          </h3>
        </div>
      </v-col>
      <v-col cols="8">
        <v-img src="https://ifh.cc/g/2bzhca.png" height="600px">
        </v-img>
      </v-col>
    </v-row>
    <v-row class="second-view mt-10">
      <v-col cols="8">
        <v-img src="https://ifh.cc/g/2bzhca.png" height="600px">
          <v-img slot="placeholder" src="https://ifh.cc/g/l6dpmm.png" height="200px" left="50px" top="50px" absolute />
        </v-img>
      </v-col>
      <v-col cols="4">
        <div class="text">
          <h3>
            설명을 시작하겠습니다. 여기는 설명란이고요 설명을 길게 쓸것입니다.
            최대한 길게 써서 작성할 것이니 기대 많이 해주시고요 구독 좋아요
            한번씩 부탁드립니다.
          </h3>
        </div>
      </v-col>
    </v-row>
    <v-row class="mt-10">
      <v-col cols="4">
        <div class="text">
          <h3>
            설명을 시작하겠습니다. 여기는 설명란이고요 설명을 길게 쓸것입니다.
            최대한 길게 써서 작성할 것이니 기대 많이 해주시고요 구독 좋아요
            한번씩 부탁드립니다.
          </h3>
        </div>
      </v-col>
      <v-col cols="8">
        <v-img src="https://ifh.cc/g/2bzhca.png" height="600px">
          <v-img slot="placeholder" src="https://ifh.cc/g/l6dpmm.png" height="200px" left="50px" top="50px" absolute />
        </v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.MainPage-Screen {
 padding-left: 00px;
 padding-right: 200px;
 display: inline-block;
}
/* .first-screen {
  width: 800px;
} */
.second-view {
  background-color: rgba(253, 252, 229, 1);
}
.text {
  margin-top: 16px;
}
</style>
