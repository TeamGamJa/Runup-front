<template>
    <div class="SingupPage-container">
        <div class="SignupPage-outer-box">
                <div class="SignupPage-middle-box">
                    <div class="SignupPage-inner-box">
                           <div class="SignupPage-box">
                               <div class="SignupPage-name">
                                   <span class="SignupPage-Input-name">아이디</span>
                                </div>
                                <div class="SignupPage-text">
                                    <input type="text" id="email" class="SignupPage-Input-Text" v-model="userId">
                                </div>
                                <div class="SignupPage-Id-Btn">
                                    <button type="button" @click="confirmId()" class="ID-Confirm-Btn">중복확인</button>
                                </div>
                                <span v-if="count === 2"></span>
                                <span v-else-if="count === 1 "> 가입된 아이디가 존재합니다</span>
                                <span v-else-if="count === 0 "> 사용 가능한 아이디입니다</span>
                            </div>
                            <div class="SignupPage-box">
                                <div class="SignupPage-name">
                                    <span class="SignupPage-Input-name">비밀번호</span>
                                </div>
                                <div class="SignupPage-text">
                                    <input type="password" id="password" class="SignupPage-Input-Text" v-model="userPw">
                                </div>
                            </div>
                            <div class="SignupPage-box">
                                <div class="SignupPage-name">
                                    <span class="SignupPage-Input-name">비밀번호확인</span>
                                </div>
                                <div class="SignupPage-text">
                                    <input type="password" class="SignupPage-Input-Text" v-model="userPwCheck">
                                </div>
                            </div>
                        <div class="SignupPage-box">
                            <div class="SignupPage-name">
                                <span class="SignupPage-Input-name">이름</span>
                            </div>
                            <div class="SignupPage-text">
                                <input type="text" rules="" class="SignupPage-Input-Text" v-model="userName">
                            </div>
                        </div>
                        <div class="SignupPage-box">
                            <div class="SignupPage-name">
                                <span class="SignupPage-Input-name">닉네임</span>
                            </div>
                            <div class="SignupPage-text">
                                <input type="text" class="SignupPage-Input-Text" v-model="userNickname">
                            </div>
                        </div>
                        <div class="SignupPage-box">
                            <div class="SignupPage-name">
                                <span class="SignupPage-Input-name">전화번호</span>
                            </div>
                            <div class="SignupPage-text">
                                <input type="text" class="SignupPage-Input-Text" v-model="userphoneNumber">
                            </div>
                        </div>
                        <div class="SignupPage-box">
                            <div class="SignupPage-name">
                                <span class="SignupPage-Input-name">주소</span>
                            </div>
                            <div class="SignupPage-text">
                                <input type="text" class="SignupPage-Input-Text" v-model="userAdress">
                            </div>
                        </div>
                        <div class="SignupPage-Ability-box">
                            <div class="SignupPage-Ability-name">
                                <span class="SignupPage-Input-name">특기</span>
                            </div>
                            <div class="SignupPage-Ability-textbox">
                                <input type="text" class="SignupPage-Ability-Text" v-model="userAbility">
                            </div>
                        </div>
                        <div class="SignupPage-Ability-box">
                            <div class="SignupPage-Ability-name">
                                <span class="SignupPage-Input-name">숙련도</span>
                            </div>
                            <div class="SignupPage-skill-radio">
                                <input type="radio" id="first-skill" name="skill" v-model="userSkill">
                                <label for="first-skill">중수</label>
                                <input type="radio" id="second-skill" name="skill" v-model="userSkill">
                                <label for="second-skill">초보</label>
                            </div>
                        </div>
                    </div>
                    <div class="SignupPage-Signup-Btn">
                        <button type="submit" class="SignUp-Btn">회원가입</button>
                    </div>
                </div>
            </div>
        </div>
    </template>

<script>
export default {
  name: 'SignUp',
  components: {},
  data() {
    return {
        userId:"",
        userPw:"",
        userPwCheck:"",
        userName:"",
        userNickname:"",
        userPhoneNumber:"",
        userAdress:"",
        userAbility:"",
        userSkill:"",
        count : '',
    }
  },
  computed: {},
  methods:{
    confirmId(){
        var serverIP='127.0.0.1',
            serverPort = 8080,
            pageUrl='runup/user/id'
        this.$axios({
            url: `http://${serverIP}:${serverPort}/${pageUrl}`,
            method: 'GET',
            params: {
                userId : this.userId
            },

        }).then((result)=> {
            console.log(result)
            this.count = parseInt(result.data);
            
        })


    },
    async formSubmit() {
        const refUserId = await this.$refs.refUserId.validate()
        if(!refUserId.validate) {
            alert(refUserId.error[0])
            return false
        }
        const refPassword = await this.$refs.refPassword.validate()
        if(!refPassword.validate) {
            alert(refPassword.error[0])
            return false
        }
        const refPasswordChk = await this.$refs.refPasswordChk.validate()
        if(!refPasswordChk.validate) {
            alert(refPasswordChk.error[0])
            return false
        }

        this.$store
        .dispatch("signup", {
            userId: this.userId,
            userPw:this.userPw,
            userPwCheck:this.userPwCheck,
        })
        .then(response => {
            if(response.status == 200) {
                this.$router.push({
                    name: "HelpTouch",
                })
            }
        })
        .catch(({message}) => alert(message))

        return true
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
    display:inline-block;
}
.SignupPage-middle-box {
    display: inline-block;
    width:500px;
    height: 500px;
    padding-left: 250px;
}
.SignupPage-box {
    padding-top: 10px;
    width: 550px;
    display:inline-block;
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
    width: 20px ;
    height: 100px;
    padding: 3px 20px 3px 20px;
}
.SignupPage-Ability-textbox {
    padding-left: 45px;
    display: inline-block;
}
.SignupPage-Input-Text {
    padding: 3px 20px 3px 20px;
    background-color:rgba(217, 217, 217, 0.6);
    border: none; 
    border-radius: 73px; 
    width: 250px;
    height: 25px;
    text-align: center;
}
.SignupPage-name {
    width: 130px;
    height: 20px;
    display:inline-block;
}
.SignupPage-text {
    display:inline-block;
    width: 300px;
}
.SignupPage-Ability-Text {
    padding: 3px 10px 3px 10px;
    background-color:rgba(217, 217, 217, 0.6);
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
.SignupPage-skill-radio input[type=radio]{
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
    display:inline-block;
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

