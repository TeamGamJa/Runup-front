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
                        <!-- <v-btn text to="/MyPoint" class="MyPage-Btn" :rounded="true">무지개, 포인트 내역</v-btn> -->
                        <v-btn text to="/MyRecord" class="MyPage-Btn" :rounded="true">달리기 기록지</v-btn>
                        <!-- <v-btn text to="/MyQustion" class="MyPage-Btn" :rounded="true">나의 고민</v-btn> -->
                        <v-btn text to="/MessageInbox" class="MyPage-Btn" :rounded="true">쪽지함</v-btn>
                    </v-card-text>
                </v-card>

                <!-- 우측 -->
                <v-card :loading="loading" class="Mypage-content2">
                    <template slot="progress">
                        <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
                    </template>

                    <v-card-text class="right-content">
                        <v-row class="edittext">
                            <v-col cols="7" class="mypage-inputText">
                                아이디
                                <v-text-field v-model="userId" outlined disabled>
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row class="edittext">
                            <v-col cols="7" class="mypage-inputText">
                                비밀번호
                                <v-text-field v-model="userPw" outlined :type="show1 ? 'text' : 'password'"
                                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" @click:append="show1 = !show1">
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row class="edittext">
                            <v-col cols="7" class="mypage-inputText">
                                이름
                                <v-text-field v-model="userName" outlined disabled>
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row class="edittext">
                            <v-col cols="7" class="mypage-inputText">
                                닉네임
                                <v-text-field v-model="userNickname" outlined>
                                </v-text-field>
                            </v-col>
                            <v-btn @click="confirmNickname" class="confirmNickBtn" :rounded="true">중복확인</v-btn>
                        </v-row>
                        <v-row class="edittext">
                            <v-col cols="7">
                                전화번호
                                <v-text-field v-model="userPhone" outlined>
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row class="edittext">
                            <v-col cols="7" class="mypage-inputText">
                                주소
                                <v-text-field v-model="userAddr" outlined>
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row class="edittext">
                            <v-col cols="3">
                                <v-select v-model="choice" label="대분류" :items="categories"
                                    @change="fetchcategoryMedium"></v-select>
                            </v-col>
                            <v-col cols="3">
                                <v-select v-model="RunningMcategory" id="Running-Mcategory" label="중분류"
                                    :items="categoryMedium" @change="inputSelectVal"></v-select>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-btn class="Mypage-infoBtn1" :rounded="true" @click="userAbilityEdit">특기수정</v-btn>
                    <v-btn class="Mypage-infoBtn" :rounded="true" @click="userInfoEdit">정보수정</v-btn>
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
        userId: '',
        userPw: '',
        userName: '',
        userNickname: '',
        userPhone: '',
        userAddr: '',
        userAbility: '',
        UserLuxColor: '',
        choice: '',
        categories: ['IT', '라이프스타일', '문제풀이', '기타'],
        categoryMedium: [''],
        RunningMcategory: undefined,
        show1: false,
    }),

    mounted() {
        this.userInfo()
    },
    methods: {
        onScroll(e) {
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
                this.userId = response.data.userId,
                    this.userPw = response.data.userPw,
                    this.userName = response.data.userName,
                    this.userNickname = response.data.userNickname,
                    this.userPhone = response.data.userPhone,
                    this.userAddr = response.data.userAddr,
                    this.userAbility = response.data.userAbility
                // this.choice = response.data.userCategoryBig,
                // this.RunningMcategory =response.data.userCategoryMedium

            }).catch(error => {
                console.log(error);
            })

        },
        inputSelectVal(value) {
            this.RunningMcategory = value;
        },
        fetchcategoryMedium() {
            // console.log(this.choice)
            var serverIP = '127.0.0.1',
                serverPort = 8080,
                pageUrl = 'runup/running/categorymedium';
            this.$axios({
                url: `http://${serverIP}:${serverPort}/${pageUrl}`,
                method: "GET",
                params: {
                    categoryBig: this.choice
                }
            }).then(response => {
                console.log(response)
                const categoryMediumData = response.data.categoryMedium;
                this.categoryMedium = ['전체'].concat(Object.values(categoryMediumData));
            }).catch(error => {
                console.log(error)
            })
        },
        confirmNickname() {
            // var serverIP = '127.0.0.1',
            //     serverPort = 8080,
            //     pageUrl = 'runup/user/nickname';
            this.$axios({
                url: this._baseUrl + "user/nickname",
                method: 'GET',
                params: {
                    userNickname:this.userNickname,
                }
            })
            .then((response)=> {
                console.log(response.data);
                if(response.data.result === '1') {
                    alert('사용되고 있는 닉네임 입니다.')
                } else {
                    store.dispatch("setVuexNickname", response.data.userNickname);
                    alert('사용가능한 닉네임 입니다.')
                }
            })
            .catch(error => {
                console.log(error);
            })
        },
        userInfoEdit() {
            // var serverIP = '127.0.0.1',
            //     serverPort = 8080,
            //     pageUrl = 'runup/user';
            this.$axios({
                url: this._baseUrl + 'user',
                method: 'PUT',
                data: {
                    userNum: store.getters.getUserNum,
                    userPw: this.userPw,
                    userNickname:this.userNickname,
                    userPhone: this.userPhone,
                    userAddr: this.userAddr,
                }
            })
            .then((response)=> {
                console.log(response.data);
                if(response.data === 1){
                    alert('정보가 수정되었습니다.')
                }else{
                    alert('변경 실패 관리자에게 문의바랍니다.')
                }
            })
            .catch(error => {
                console.log(error);
            })
        },
        userAbilityEdit() {
            // var serverIP = '127.0.0.1',
            //     serverPort = 8080,
            //     pageUrl = 'runup/user/ability';
            this.$axios({
                url: this._baseUrl + 'user/ability',
                method: 'PUT',
                data: {
                    userCategoryBig: this.choice,
                    userCategoryMedium: this.RunningMcategory,
                    userNum: store.getters.getUserNum
                }
            })
            .then((response)=> {
                console.log(response.data);
                alert('변경되셨습니다.')
            })
            .catch(error => {
                console.log(error);
            }) 
        }
    },
}
</script>

<style>
.MyPage-container {
    width: 100%;
    /* height: 85%; */
    /* display: inline-block; */
    /* justify-content: center; */
    /* align-items: center; */
}

.MyPage-main {
    margin-top: 2%;


}

/* .Mypage-content1 {
    width: 32%;
    height: 75%;
}

.Mypage-content2 {
    width: 68%;
    height: 75%;
    overflow-y: auto;
} */

.right-content {
    height: 60%;
    margin-top: 5%;
    margin-bottom: 2%;
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
    width: 100%;
    height: 80px;
    padding-left: 30%;
    display: inline-block;

}

.mypage-inputText {
    height: 2%;
}

.confirmNickBtn {
    /* display: inline-block; */
    margin-top: 8%;
    background-color: rgba(244, 209, 155, 1) !important;
}

.Mypage-infoBtn1 {
    margin-left: 33%;
    color: black !important;
    background-color: rgba(244, 209, 155, 1) !important;
    margin-bottom: 1.5%;
}
.Mypage-infoBtn {
    margin-left: 5%;
    color: black !important;
    background-color: rgba(244, 209, 155, 1) !important;
    margin-bottom: 1.5%;
}
</style>