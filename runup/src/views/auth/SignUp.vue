<template>
    <v-container>
        <v-form @submit.prevent="submitForm">
            <v-card>
                <v-card-title>회원가입</v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col cols="6">
                            <v-text-field v-model="userId" :rules="[rules.email]" label="아이디" outlined
                                required></v-text-field>
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
                        <v-btn @click="confirmId">중복확인</v-btn>
                    </v-row>

                    <v-row>
                        <v-col cols="6">
                            <v-text-field v-model="userPw" label="비밀번호" type="password" outlined required></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">
                            <v-text-field v-model="userPwCheck" :rules="[rules.pwcheck]" label="비밀번호 확인" type="password" outlined
                                required></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">
                            <v-text-field v-model="userName" label="이름" outlined required></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="6">
                            <v-text-field v-model="userNickname" label="닉네임" outlined required></v-text-field>
                        </v-col>
                        <v-btn @click="confirmNickname">중복확인</v-btn>
                    </v-row>

                    <v-row>
                        <v-col cols="6">
                            <v-text-field v-model="userPhoneNumber" label="전화번호" outlined required></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="6">
                            <v-text-field v-model="userAddress" label="주소" outlined required></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="3">
                            <v-select v-model="choice" label="대분류" :items="categories" @change="fetchcategoryMedium"></v-select>
                        </v-col>
                        <v-col cols="3">
                            <v-select v-model="RunningMcategory" id="Running-Mcategory" label="중분류" :items="categorymMedium"
                                @change="inputSelectVal"></v-select>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="12">
                            <v-radio-group v-model="userSkill" row>
                                <v-radio value="중수" label="중수"></v-radio>
                                <v-radio value="초보" label="초보"></v-radio>
                            </v-radio-group>
                        </v-col>
                    </v-row>
                    <v-btn @click="confirmNickname">회원가입</v-btn>
                </v-card-text>
            </v-card>
        </v-form>
    </v-container>
</template>

<script>
export default {
    name: 'SignUp',
    components: {},
    data() {
        return {
            rules: {
                email: v => !!(v || '').match(/@/) || '이메일 형식으로 입력해주세요',
                pwcheck: v=> v === this.userPw || '입력하신 비밀번호와 다릅니다'
            },
            userId: "",
            userPw: "",
            userPwCheck: "",
            userName: "",
            userNickname: "",
            userPhoneNumber: "",
            userAdress: "",
            userAbility: "",
            userSkill: "",
            count: '',
        }
    },
    computed: {},
    methods: {
        confirmId() {
            var serverIP = '127.0.0.1',
                serverPort = 8080,
                pageUrl = 'runup/user/id'
            this.$axios({
                url: `http://${serverIP}:${serverPort}/${pageUrl}`,
                method: 'GET',
                data: {
                    userId: this.userId
                },

            }).then((result) => {
                console.log(result)
                this.count = parseInt(result.data);

            })
        },
        confirmNickname() {
            var serverIP = '127.0.0.1',
                serverPort = 8080,
                pageUrl = 'runup/user/Nickname'
            this.$axios({
                url: `http://${serverIP}:${serverPort}/${pageUrl}`,
                method: 'GET',
                data: {
                    userNickname: this.userNickName
                },

            }).then((result) => {
                console.log(result)
                this.count = parseInt(result.data);

            })
        }
    }
}
</script>

<style>
.SingupPage-container {
    width: 99%;
    height: 630px;
    background-color: white;
}

.SignupPage-outer-box {
    padding: 100px 200px 100px 200px;
    width: 700px;
    display: inline-block;
}

.SignupPage-middle-box {
    display: inline-block;
    width: 500px;
    height: 500px;
    padding-left: 250px;
}

.SignupPage-box {
    padding-top: 10px;
    width: 550px;
    display: inline-block;
}

.SignupPage-Ability-box {
    padding-top: 10px;
    width: 220px;
    display: inline-block;
}

.SignupPage-Ability-name {
    width: 85px;
    display: inline-block;
}

.SignupPage-Input-name {
    border: none;
    border-radius: 12px;
    background-color: rgba(215, 233, 247, 1);
    width: 20px;
    height: 100px;
    padding: 3px 20px 3px 20px;
}

.SignupPage-Ability-textbox {
    padding-left: 45px;
    display: inline-block;
}

.SignupPage-Input-Text {
    padding: 3px 20px 3px 20px;
    background-color: rgba(217, 217, 217, 0.6);
    border: none;
    border-radius: 73px;
    width: 250px;
    height: 25px;
    text-align: center;
}

.SignupPage-name {
    width: 130px;
    height: 20px;
    display: inline-block;
}

.SignupPage-text {
    display: inline-block;
    width: 300px;
}

.SignupPage-Ability-Text {
    padding: 3px 10px 3px 10px;
    background-color: rgba(217, 217, 217, 0.6);
    border: none;
    border-radius: 73px;
    width: 60px;
    height: 25px;
    text-align: center;
    display: inline-block;
}

.SignupPage-skill-radio {
    display: inline-block;
    padding-left: 10px;
}

.SignupPage-skill-radio input[type=radio] {
    display: none;
}

.SignupPage-skill-radio input[type=radio]+label {
    display: inline-block;
    cursor: pointer;
    width: 50px;
    height: 25px;
    border: 1px solid rgba(217, 217, 217, 0.6);
    text-align: center;
    line-height: 24px;
    font-size: 20px;
    border-radius: 12px;
    background-color: rgba(217, 217, 217, 0.6);
}

.SignupPage-skill-radio input[type=radio]+label {
    background-color: rgba(217, 217, 217, 0.6);
    color: black;
}

.SignupPage-skill-radio input[type=radio]:checked+label {
    background-color: orange;
    color: black;
}

.SignupPage-Id-Btn {
    width: 65px;
    display: inline-block;
    padding-left: 10px;
}

.SignupPage-Signup-Btn {
    padding-top: 30px;
    padding-left: 150px;
}

.ID-Confirm-Btn {
    border: none;
    border-radius: 12px;
    background-color: rgba(244, 209, 155, 1);
    width: 70px;
    height: 25px;
}

.SignUp-Btn {
    background-color: rgba(244, 209, 155, 1);
    border: none;
    border-radius: 12px;
    width: 100px;
    height: 25px;
    font-size: large;
}
</style>

