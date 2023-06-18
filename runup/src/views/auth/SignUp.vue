<template>
    <v-container class="d-flex justify-center"
        style="width:100%; padding-left;: 100px; padding-right;: 100px; padding-bottom;: 100px;">
        <v-form @submit.prevent="submitForm">
            <v-card class="mx-auto" style="width:800px; padding: 80px">
                <v-card-title class="d-flex justify-center" style="padding-bottom: 80px;">
                    <v-img src="https://ifh.cc/g/wHAhgX.png" height="80" contain></v-img>
                </v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col cols="10">
                            <v-text-field v-model="userId" :rules="[rules.email]" label="아이디" outlined required
                                class="text-field" background-color="rgba(249, 243, 223, 100%)"></v-text-field>
                            <v-alert v-if="count === 2" type="warning" transition="scale-transition" outlined>
                                중복확인을 해주세요.
                            </v-alert>
                            <v-alert v-if="count === 1" type="error" transition="scale-transition" outlined>
                                가입된 아이디가 존재합니다.
                            </v-alert>
                            <v-alert v-if="count === 0" type="success" transition="scale-transition" outlined>
                                사용 가능한 아이디입니다.
                            </v-alert>
                        </v-col>
                        <v-btn @click="confirmId" class="confirmBtn" :rounded="true">중복확인</v-btn>
                    </v-row>

                    <v-row>
                        <v-col cols="10">
                            <v-text-field v-model="userPw" label="비밀번호" outlined required
                                :type="show1 ? 'text' : 'password'" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                @click:append="show1 = !show1" class="text-field"
                                background-color="rgba(249, 243, 223, 100%)"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="10">
                            <v-text-field v-model="userPwCheck" :rules="[rules.pwcheck]" label="비밀번호 확인"
                                :type="show2 ? 'text' : 'password'" :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                                @click:append="show2 = !show2" outlined required class="text-field"
                                background-color="rgba(249, 243, 223, 100%)"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="10">
                            <v-text-field v-model="userName" label="이름" outlined required
                                background-color="rgba(249, 243, 223, 100%)"></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="10">
                            <v-text-field v-model="userNickname" label="닉네임" outlined required
                                background-color="rgba(249, 243, 223, 100%)"></v-text-field>
                        </v-col>
                        <v-btn @click="confirmNickname" class="confirmBtn" :rounded="true">중복확인</v-btn>
                    </v-row>

                    <v-row>
                        <v-col cols="10">
                            <v-text-field v-model="userPhoneNumber" :rules="[rules.telephone]" label="전화번호" outlined
                                required background-color="rgba(249, 243, 223, 100%)"></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="5">
                            <v-text-field v-model="userAddress" label="주소(시, 도)" outlined required
                                background-color="rgba(249, 243, 223, 100%)"></v-text-field>
                        </v-col>
                        <v-col cols="5">
                            <v-text-field v-model="userAddress2" label="주소(군, 구)" outlined required
                                background-color="rgba(249, 243, 223, 100%)"></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="3">
                            <v-select v-model="choice" label="대분류" :items="categories"
                                @change="fetchcategoryMedium"></v-select>
                        </v-col>
                        <v-col cols="3">
                            <v-select v-model="RunningMcategory" id="Running-Mcategory" label="중분류" :items="categoryMedium"
                                @change="inputSelectVal"></v-select>
                        </v-col>
                        <v-col cols="5">
                            <v-radio-group v-model="userSkill" row @change="inputAbility">
                                <v-radio value="중수" label="중수"></v-radio>
                                <v-radio value="초보" label="초보"></v-radio>
                            </v-radio-group>
                        </v-col>
                    </v-row>

                    <v-row>
                    </v-row>
                    <v-btn @click="SignUp()" class="SignupBtn" :rounded="true">회원가입</v-btn>
                </v-card-text>
            </v-card>
        </v-form>
    </v-container>
</template>

<script>
// import store from '@/store/store'
import axios from 'axios'

export default {
    name: 'SignUp',
    components: {},
    data() {
        return {
            rules: {
                email: v => !!(v || '').match(/@/) || '이메일 형식으로 입력해주세요',
                pwcheck: v => v === this.userPw || '입력하신 비밀번호와 다릅니다',
                telephone: v => {
                    if (!v) {
                        return '전화번호를 입력해주세요';
                    }
                    if (!/^\d{11}$/.test(v)) {
                        return '전화번호 형식과 다릅니다.';
                    }
                    return true;
                }
            },
            userId: '',
            userPw: '',
            userPwCheck: '',
            userName: '',
            userNickname: '',
            userPhoneNumber: '',
            userAddress: '',
            userAddress2:'',
            userAbility: '',
            userSkill: '',
            count: '',
            choice: '',
            checkId: '',
            checkNickname: '',
            categories: ['IT', '라이프스타일', '문제풀이', '기타'],
            categoryMedium: [''],
            RunningMcategory: '',
            show1: false,
            show2: false,
        }
    },
    computed: {},
    methods: {
        confirmId() {
            this.$axios({
                url: this._baseUrl + "user/id",
                method: 'GET',
                params: {
                    userId: this.userId,
                }
            })
                .then((response) => {
                    console.log(response.data);
                    if (response.data === 1) {
                        alert('사용되고 있는 ID 입니다.')
                    } else {
                        alert('사용가능한 ID 입니다.')
                        this.checkId = 1;
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        },
        confirmNickname() {
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
                        this.checkNickname = 1;
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        },
        inputSelectVal(value) {
            this.RunningMcategory = value;
        },
        inputAbility() {
            console.log(this.userSkill);
            if (this.userSkill == '중수') {
                this.userAbility = 1;
            }
            if (this.userSkill == '하수') {
                this.userAbility = 0;
            }
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
        SignUp() {
            if (this.checkId != 1) {
                alert("ID 중복확인을 해주세요")
                return
            }
            if (this.checkNickname != 1) {
                alert("닉네임 중복확인을 해주세요")
                return
            }
            if (this.userId == '' ||
                this.userPw == '' ||
                this.userName == '' ||
                this.userPhoneNumber == '' ||
                this.userAddress == '' ||
                this.choice == '' ||
                this.userAbility == '' ||
                this.RunningMcategory == '') {
                alert("모든값을 입력 후 회원가입을 해주세요")
                return
            }
                axios
                .post(this._baseUrl+'user/regist', {
                    userId: this.userId,
                    userPw: this.userPw,
                    userName: this.userName,
                    userNickname: this.userNickname,
                    userAbility: this.userAbility,
                    userAddr: this.userAddress +' '+this.userAddress2,
                    userPhone: this.userPhoneNumber,
                    userCategoryBig: this.choice,
                    userCategoryMedium: this.RunningMcategory
                })
                
            .then((response) => {
                console.log(response)
                this.userId = '';
                if (response.data == 1) {
                    alert('회원가입을 완료했습니다')
                    this.$router.push('/')
                } else {
                    alert('이미 가입된 정보가 있습니다.')
                }
            })
        }
    }
}
</script>

<style>
.confirmBtn {
    color: black !important;
    background-color: rgba(244, 209, 155, 1) !important;
    justify-content: flex-end;
    border-radius: 200px;
    margin-top: 20px;

}

.SignupBtn {
    color: black !important;
    background-color: rgba(244, 209, 155, 1) !important;
    justify-content: flex-end;
    border-radius: 200px;
    margin-top: 20px;
    width: 300px;
    margin-left: 140px;
}</style>

