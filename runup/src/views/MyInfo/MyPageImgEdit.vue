<template>
    <v-container class="MyPage-container">
        <v-main class="MyPage-main">
            <v-row>
                <!-- 좌측 -->
                <v-card :loading="loading" class="Mypage-content1">
                    <v-img class="MyPage-Top-img" src="https://ifh.cc/g/MmKYHK.png"></v-img>

                    <router-link to="/MyPageImgEdit"><v-img  class-="imgMain" :rounded="true" :src="$store.getters.getProfileImg"></v-img></router-link>

                    <v-card-title>{{ this.$store.getters.getUserNickname }}</v-card-title>



                    <!-- <v-progress-linear :rounded="true" v-model="UserLuxColor" color="rgba(244, 209, 155, 1)" height="25"
                        style="max-width: 300px; margin: 35px;" :clickable="false" striped>

                        <v-img max-width="30px" max-height="30px" position="left" :rounded="true"
                            src="https://ifh.cc/g/Awo9rH.png"></v-img>
                        

                    </v-progress-linear> -->
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

                    <v-img class="My-img" :src="$store.getters.getProfileImg"></v-img>

                   
                        <!-- 파일 선택 폼 -->
                        <v-form @submit.prevent class="imgForm" >
                            <v-file-input v-model="selectedFile" label="파일 선택" hint="최대 2MB까지 업로드 가능합니다." prepend-icon="mdi-camera"
                                accept="image/png, image/jpeg, image/bmp" :rules="[selectedFileRules]" class="imgUpload"
                                clearable></v-file-input>

                            <!-- 파일 업로드 버튼 -->
                            <v-btn :disabled="!selectedFile" :rounded="true" class-="img_btn" @click="submitFile">
                                {{ submitButtonText }}
                            </v-btn>
                        </v-form>
    
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
        selectedFile: null,
        selectedFileRules: [
            v => !!v || "이미지 파일을 선택해주세요.",
            v => v && v.size < 2097152 || "파일 크기가 2MB를 초과합니다. (선택한 파일 크기: " + (v && (v.size / 1024 / 1024).toFixed(2) || 0) + "MB)"
        ],
        submitButtonText: "파일 업로드",
        profileImg:'',
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
                    userNickname: this.userNickname,
                }
            })
                .then((response) => {
                    console.log(response.data);
                    if (response.data === 1) {
                        alert('사용되고 있는 닉네임 입니다.')
                    } else {
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
                    userNickname: this.userNickname,
                    userPhone: this.userPhone,
                    userAddr: this.userAddr,
                }
            })
                .then((response) => {
                    console.log(response.data);
                    if (response.data === 1) {
                        alert('정보가 수정되었습니다.')
                    } else {
                        alert('관리자에게 문의바랍니다.')
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
                .then((response) => {
                    console.log(response.data);
                    alert('변경되셨습니다.')


                })
                .catch(error => {
                    console.log(error);
                })
        },
        submitFile() {
            const formData = new FormData();
            formData.append('file',this.selectedFile);
            formData.append('userNum',store.getters.getUserNum)
            var serverIP='127.0.0.1',
                serverPort= 8080,
                pageUrl= 'runup/user/profile'
            this.$axios({
                url: `http://${serverIP}:${serverPort}/${pageUrl}`,
                method:'POST',
                headers: {
                    'Content-Type':'multipart/form-data'
                },
                data:formData,
            })
            .then((response) => {
                console.log(response.data);
                this.profileImg = response.data;
                store.dispatch("setVuexProfileImg", response.data);
            })
            .catch(error => {
                console.log(error);
            })
        },
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
}

.group {
    display: flex;
    flex: 1;
    justify-content: space-around;
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
.imgMain {
    max-width: 1% !important;
    max-height: 1% !important;
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