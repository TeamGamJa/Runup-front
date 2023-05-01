<template>
    <v-main>
        <v-container class="MyPage-container">
            <v-row>
                <!-- 좌측 -->
                <v-card :loading="loading" max-width="374" style="height: 650px;">
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
                   
                        <v-img max-width="30px" max-height="30px" position="left" :rounded="true" src="https://ifh.cc/g/Awo9rH.png"></v-img>
                            <!-- <strong>{{ Math.ceil(off) }}</strong> -->
                        
                    </v-progress-linear>

                    <v-card-text>
                        <v-btn text to="/MyRunning" class="MyPage-Btn " :rounded="true">나의 도움주기</v-btn>
                        <v-btn text to="/MyRunning" class="MyPage-Btn1" :rounded="true">나의 도움받기</v-btn>
                        <v-btn text to="/MyRunning" class="MyPage-Btn" :rounded="true">나의 묻고답하기</v-btn>
                        <v-btn text to="/MyRunning" class="MyPage-Btn1" :rounded="true">나의 옹달샘</v-btn>
                        <v-btn text to="/MyRunning" class="MyPage-Btn" :rounded="true">받은 쪽지함</v-btn>
                        <v-btn text to="/MyRunning" class="MyPage-Btn2" :rounded="true">보낸 쪽지함</v-btn>
                    </v-card-text>
                </v-card>

                <!-- 우측 -->
                <v-card :loading="loading" style="width:800px;">
                    <template slot="progress">
                        <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
                    </template>

                    <v-img height="250" src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>

                    <v-card-title>{{ this.$store.getters.getUserNickname }}</v-card-title>

                    <v-card-text>
                        <v-row align="center" class="mx-0">
                            무지개 보여줄 자리
                        </v-row>

                    </v-card-text>

                    <v-card-title>소금 보여줄 자리</v-card-title>

                    <v-card-text>
                        <v-btn text to="/MyRunning" class="MyPage-Btn " :rounded="true">나의 도움주기</v-btn>
                        <v-btn text to="/MyRunning" class="MyPage-Btn1" :rounded="true">나의 도움받기</v-btn>
                        <v-btn text to="/MyRunning" class="MyPage-Btn" :rounded="true">나의 묻고답하기</v-btn>
                        <v-btn text to="/MyRunning" class="MyPage-Btn1" :rounded="true">나의 옹달샘</v-btn>
                        <v-btn text to="/MyRunning" class="MyPage-Btn" :rounded="true">받은 쪽지함</v-btn>
                        <v-btn text to="/MyRunning" class="MyPage-Btn2" :rounded="true">보낸 쪽지함</v-btn>
                    </v-card-text>
                </v-card>
            </v-row>
        </v-container>
    </v-main>
</template>

<script>
// import store from '@/store/store'

export default {
    data: () => ({
        loading: false,
        selection: 1,
        // UserLuxColor: 20,
    }),

    methods: {
        reserve() {
            this.loading = true

            setTimeout(() => (this.loading = false), 2000)
        },
    },
}
</script>

<style>
.MyPage-container {
    margin-top: 20px;
    margin-bottom: 20px;
}

.MyPage-Btn {
    color: black !important;
    background-color: rgba(244, 209, 155, 1) !important;
    border-radius: 200px;
    margin-top: 20px;
    /* margin-right: 20px; */
    margin-left: 10px;
}

.MyPage-Btn1 {
    color: black !important;
    background-color: rgba(244, 209, 155, 1) !important;
    border-radius: 200px;
    margin-top: 20px;
    margin-left: 30px;
}

.MyPage-Btn2 {
    color: black !important;
    background-color: rgba(244, 209, 155, 1) !important;
    border-radius: 200px;
    margin-top: 10px;
    margin-left: 50px;
    padding-left: 50px;
}
.group {
  display: flex;
  flex: 1;
  justify-content: space-around;
}
</style>