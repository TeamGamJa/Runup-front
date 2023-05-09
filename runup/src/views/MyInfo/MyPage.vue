<template>
    <v-container class="MyPage-container">
        <v-main class="MyPage-main">
            <v-row>
                <!-- 좌측 -->
                <v-card :loading="loading" class="Mypage-content1">
                    <v-img class="MyPage-Top-img" src="https://ifh.cc/g/MmKYHK.png"></v-img>

                    <router-link to="/MyPageImgEdit"><v-img  class-="imgMain" :rounded="true" :src="$store.getters.getProfileImg"></v-img></router-link>

                    <v-card-title>{{ this.$store.getters.getUserNickname }}</v-card-title>
                    
                    <v-card-text>
                        <v-btn text to="/MyPageEdit" class="MyPage-Btn" :rounded="true">내 정보 수정</v-btn>
                        <v-btn text to="/MyClass" class="MyPage-Btn" :rounded="true">나의 수업 통계</v-btn>
                        <v-btn text to="/MyPoint" class="MyPage-Btn" :rounded="true">무지개, 포인트 내역</v-btn>
                        <v-btn text to="/MyLearning" class="MyPage-Btn" :rounded="true">달리기 기록지</v-btn>
                        <v-btn text to="/MyQustion" class="MyPage-Btn" :rounded="true">나의 고민</v-btn>
                        <v-btn text to="/MessageInbox" class="MyPage-Btn" :rounded="true">쪽지함</v-btn>
                    </v-card-text>
                </v-card>

                <!-- 우측 -->
                <v-card :loading="loading" class="Mypage-content2">

                    <v-img class="MyPage-BingImg" src="https://ifh.cc/g/Q0ModJ.jpg"></v-img>

                   
                </v-card>
            </v-row>
        </v-main>
    </v-container>
</template>

<script>
// import store from '@/store/store'

export default {
   
    data: () => ({
        
       
    })
}
    
</script>

<style>
.MyPage-container {
    width: 100%
}


.MyPage-Btn {
    width: 38%;
    color: black !important;
    background-color: rgba(244, 209, 155, 1) !important;
    margin-right: 5%;
}
.Mypage-content1 {
    width: 32%;
    height: 75%;
}

.Mypage-content2 {
    width: 68%;
    height: 75%;
    overflow-y: auto;
}
.group {
    display: flex;
    flex: 1;
    justify-content: space-around;
}

.MyPage-BingImg {
    width: 70%;
    height: 70%;
    margin-top: 5%;
    margin-left: 15%;
    margin-bottom: 10%;
}

.My-img {
    width: 40%;
    height: 40%;
    margin-left: 30%;
    margin-top: 10%;
    margin-bottom: 10%;
}
.imgForm{
    width: 80%;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    margin-top: 5%;
    margin-bottom: 15%;
}
.MyPage-Top-img {
    width: 40%;
    height: 30%;
    margin-top: 5%;
    margin-left: 5%;
    
}
.imgUpload {
    width: 50%;
    margin-left: 30%;
}

.img_btn {
    background-color: rgba(244, 209, 155, 1) !important;
}

.edittext {
    width: 100%;
    height: 80px;
    padding-left: 30%;
    display: inline-block;

}

.mypage-inputText {
    height: 2%;
}

.MyPageMyImg-btn {
    max-width: 5%;
    max-height: 5%;
}
</style>