<template>
    <v-container class="UserProfile-container">
        <v-main class="UserProfile-main">
            <v-row>
                <!-- 좌측 -->
                <v-card class="UserProfile-content1">

                    <v-card-title class="userNickname">{{ this.$store.getters.getUserNickname }}</v-card-title>

                    <v-card-text class="myPage-Btn-Group">
                        <v-container class="width-unification" style="display: flex; flex-wrap: nowrap;">

                            <!-- 등급 -->
                            <!-- <v-row> -->
                            <v-col cols="2">
                                <v-img class="MyPage-waterImg" src="https://ifh.cc/g/WNALrw.png"></v-img>
                            </v-col>
                            <v-col cols="2">
                                <v-chip :class="getChipColor" class="luxcolor">
                                    나의 색
                                </v-chip>
                            </v-col>
                            <!-- </v-row> -->

                            <!-- 게이지바 -->
                            <!-- <v-row> -->
                            <v-col cols="2">
                                <v-img class="MyPage-waterImg" src="https://ifh.cc/g/TY25V8.png"></v-img>
                            </v-col>
                            <v-col cols="2">
                                <v-progress-linear :value="percent" class="salt-gage-bar" :color="getChipColor"
                                    :rounded="true" height="20"></v-progress-linear>
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

                <!-- 우측 -->
                <v-card class="Mypage-content2">


                    <v-card-text class="tatal-function">
                        <v-container class="width-unification" style="display: flex; flex-wrap: nowrap;">

                            <!-- 등급 -->
                            <!-- <v-row> -->
                            <v-col cols="2">
                                <v-img class="MyPage-waterImg" src="https://ifh.cc/g/WNALrw.png"></v-img>
                            </v-col>
                            <v-col cols="2">
                                <v-chip :class="getChipColor" class="luxcolor">
                                    나의 색
                                </v-chip>
                            </v-col>
                            <!-- </v-row> -->

                            <!-- 게이지바 -->
                            <!-- <v-row> -->
                            <v-col cols="2">
                                <v-img class="MyPage-waterImg" src="https://ifh.cc/g/TY25V8.png"></v-img>
                            </v-col>
                            <v-col cols="2">
                                <v-progress-linear :value="percent" class="salt-gage-bar" :color="getChipColor"
                                    :rounded="true" height="20"></v-progress-linear>
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

<style></style>