<template>
    <v-container class="MyPage-container">
        <v-main class="MyPage-main">
            <v-row>
                <!-- 좌측 -->
                <v-card class="Mypage-content1">
                    <v-img class="MyPage-Top-img" src="https://ifh.cc/g/MmKYHK.png"></v-img>

                    <router-link to="/MyPageImgEdit"><v-img class-="imgMain" :rounded="true"
                            :src="$store.getters.getProfileImg"></v-img></router-link>

                    <v-card-title class="userNickname">{{ this.$store.getters.getUserNickname }}</v-card-title>

                    <v-card-text class="myPage-Btn-Group">
                        <v-btn text to="/MyPageEdit" class="MyPage-Btn" :rounded="true">내 정보 수정</v-btn>
                        <v-btn text to="/MyClass" class="MyPage-Btn" :rounded="true">나의 수업 통계</v-btn>
                        <!-- <v-btn text to="/MyPoint" class="MyPage-Btn" :rounded="true">무지개, 포인트 내역</v-btn> -->
                        <v-btn text to="/MyRecord" class="MyPage-Btn" :rounded="true">달리기 기록지</v-btn>
                        <!-- <v-btn text to="/MyQustion" class="MyPage-Btn" :rounded="true">나의 고민</v-btn> -->
                        <v-btn text to="/MessageInbox" class="MyPage-Btn" :rounded="true">쪽지함</v-btn>
                    </v-card-text>
                </v-card>

                <!-- 우측 -->
                <v-card class="Mypage-content2">

                    <v-img class="MyPage-BingImg" src="https://ifh.cc/g/Q0ModJ.jpg"></v-img>

                    <v-card-text class="tatal-function">
                        <v-container class="width-unification" style="display: flex; flex-wrap: nowrap;">

                            <!-- 등급 -->
                            <!-- <v-row> -->
                            <v-col cols="2">
                                <v-img class="MyPage-waterImg" src="https://ifh.cc/g/WNALrw.png"></v-img>
                            </v-col>
                            <v-col cols="2">
                                <v-chip :class="getChipColor" class="luxcolor">
                                    
                                </v-chip>
                            </v-col>
                            <!-- </v-row> -->

                            <!-- 게이지바 -->
                            <!-- <v-row> -->
                            <v-col cols="2">
                                <v-img class="MyPage-waterImg" src="https://ifh.cc/g/TY25V8.png"></v-img>
                            </v-col>
                            <v-col cols="2">
                                <v-progress-linear :value="percent" class="salt-gage-bar" :color="getChipColor" :rounded="true" height="20"></v-progress-linear>
                            </v-col>
                            <!-- </v-row> -->

                            <!-- 포인트  -->
                            <!-- <v-row> -->

                            <v-col cols="2">
                                <v-img class="MyPage-waterImg" src="https://ifh.cc/g/0nQRpd.png"></v-img>
                            </v-col>
                            <v-col cols="2">
                                <div class="water-point"> {{ $store.getters.getUserPoint }}mL </div>
                            </v-col>

                            <!-- </v-row> -->

                        </v-container>
                    </v-card-text>


                </v-card>
            </v-row>
        </v-main>
    </v-container>
</template>

<script>
import store from '@/store/store'
export default {
    data() {
        return {
            percent: 0,
        };
    },
    computed: {
        getChipColor() {
            const userColor = store.getters.getUserColor;
            const percent = userColor / 10;

            if (percent >= 0 && percent < 10) return 'red';
            else if (percent >= 10 && percent < 20) return 'orange';
            else if (percent >= 20 && percent < 30) return 'yellow';
            else if (percent >= 30 && percent < 40) return 'green';
            else if (percent >= 40 && percent < 50) return 'blue';
            else if (percent >= 50 && percent < 60) return 'indigo';
            else if (percent >= 60 && percent < 70) return 'purple';
            else return 'white';
        },
    },
    methods: {
        increasePercent() {
            const userColor = store.getters.getUserColor;
            const percent = userColor / 10;
            this.$data.percent = percent;
        },
    },
    mounted() {
        this.increasePercent() // 1초마다 increasePercent 메소드 호출
  },
};



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
    width: 25%;
    height: 100%;
    margin-top: 5%;
    margin-right: 2%;
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
    /* margin-bottom: 10%; */
}

.My-img {
    width: 40%;
    height: 40%;
    margin-left: 30%;
    margin-top: 10%;
    margin-bottom: 10%;
}

.imgForm {
    width: 80%;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    margin-top: 5%;
    margin-bottom: 15%;
}

.MyPage-Top-img {
    width: 30%;
    height: 20%;
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

.tatal-function {
    /* display: flex;
    justify-content: space-between; */
}

.width-unification {
    width: 100%;
    height: 50%;
    display: inline-block;
}

.luxcolor {
    margin-top: 10%;
    margin-left: 20%;
    width: 100%;
}

.salt-gage-bar {
    /* cols로 크기를 정해놨기 때문에 width랑 height를 해도 적용 안됨 */
    /* background-color: whitesmoke !important; */
    margin-top: 20%;
}


.water-point-box {
    display: flex;
    align-items: center;

}

.MyPage-waterImg {
    width: 50%;
    height: 100%;
    margin-left: 50%;
}

.water-point {
    font-size: large;
    margin-top: 15%;
}
.userNickname {
    margin-left: 38%;
}
.myPage-Btn-Group {
    margin-left: 3%;
}
</style>