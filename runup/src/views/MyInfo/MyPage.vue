<template>
    <v-container class="MyPage-container">
         <v-main class="MyPage-main">
            <v-row>
                <!-- 좌측 -->
                <v-card :loading="loading" style="height: 642px; width:370px;">
                    <template slot="progress">
                        <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
                    </template>

                    <v-img height="250" :rounded="true" src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>

                    <v-card-title>{{ this.$store.getters.getUserNickname }}</v-card-title>

                    <v-card-text>
                        <v-row align="center" class="mx-0">
                            무지개 보여줄 자리
                        </v-row>

                    </v-card-text>


                    <v-progress-linear :rounded="true" v-model="UserLuxColor" color="rgba(244, 209, 155, 1)" height="25"
                        style="max-width: 300px; margin: 35px;" :clickable="false" striped>

                        <v-img max-width="30px" max-height="30px" position="left" :rounded="true"
                            src="https://ifh.cc/g/Awo9rH.png"></v-img>
                        <!-- <strong>{{ Math.ceil(off) }}</strong> -->

                    </v-progress-linear>

                    <v-card-text>

                        <v-btn text to="/MyRunning" class="MyPage-Btn" :rounded="true">나의 도움신청</v-btn>
                        <v-btn text to="/MyRunning" class="MyPage-Btn" :rounded="true">나의 고민</v-btn>
                        <v-btn text to="/MyRunning" class="MyPage-Btn" :rounded="true">쪽지함</v-btn>
                    </v-card-text>
                </v-card>

                <!-- 우측 -->
                <v-card :loading="loading" style="width:810px; height: 642px;">
                    <template slot="progress">
                        <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
                    </template>

                    <v-img class="top-text-img" src="https://ifh.cc/g/MmKYHK.png"></v-img>

                    <v-card-text style="height: 630px;">
                        <v-row class="edittext">
                            <v-col cols="7">
                                아이디
                                <v-text-field v-model="userId" outlined disabled>
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row class="edittext">
                            <v-col cols="7">
                                비밀번호
                                <v-text-field v-model="userPw" outlined disabled>
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row class="edittext">
                            <v-col cols="7">
                                이름
                                <v-text-field v-model="userPw" outlined disabled>
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row class="edittext">
                            <v-col cols="7">
                                닉네임
                                <v-text-field v-model="userPw" outlined disabled>
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row class="edittext">
                            <v-col cols="7">
                                전화번호
                                <v-text-field v-model="userPw" outlined disabled>
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row class="edittext">
                            <v-col cols="7">
                                주소
                                <v-text-field v-model="userPw" outlined disabled>
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row class="edittext">
                            <v-col cols="7">
                                특기
                                <v-text-field v-model="userPw" outlined disabled>
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <!-- <v-container id="scroll-target" style="max-height: 400px" class="overflow-y-auto">
                            <v-row v-scroll:#scroll-target="onScroll" align="center" justify="center" style="height: 650px">
                            </v-row>
                        </v-container> -->
                    </v-card-text>

                </v-card>
            </v-row>
        </v-main>
    </v-container>
</template>

<script>
import store from '@/store/store'

export default {
    data: () => ({
        offsetTop: 0,
        loading: false,
        selection: 1,
        // UserLuxColor: 20,
    }),

    mounted() {
        this.userInfo()
    },
    methods: {
        onScroll (e) {
        this.offsetTop = e.target.scrollTop
      },
        reserve() {
            this.loading = true

            setTimeout(() => (this.loading = false), 2000)
        },
        userInfo() {
            var serverIP = '127.0.0.1',
                serverPort = 8080,
                pageUrl = 'runup/user/user';
            this.$axios({
                url: `http://${serverIP}:${serverPort}/${pageUrl}`,
                methods: 'GET',
                params: {
                    userId: store.getters.getUserId,
                }
            }).then((response) => {
                console.log(response.data);

            }).catch(error => {
                console.log(error);
            })

        },
    },
}
</script>

<style>
.MyPage-container {
    height: 85%;
    display: flex;
    justify-content: center;
}
.MyPage-main {
    margin-top: 60px;

    /* margin-left: 140px; */
}

.MyPage-Btn {
    width: 240px;
    color: black !important;
    background-color: rgba(244, 209, 155, 1) !important;
    border-radius: 200px;
    margin-top: 20px;
    /* margin-right: 20px; */
    margin-left: 50px;
    margin-right: 10px;
}

.group {
    display: flex;
    flex: 1;
    justify-content: space-around;
}

.top-text-img {
    width: 160px;
    height: 30px;
    margin-left: 300px;
    margin-top: 20px;
}
.edittext {
    height: 80px;
    padding-left: 200px;
    
}
</style>