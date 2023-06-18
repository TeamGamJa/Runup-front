<template>
    <v-app>
        <v-container style="margin-top: 8%;">
            <v-card>
                <v-img src="https://ifh.cc/g/yaN54Y.png" max-width="150" max-height="50"
                       style="margin-bottom: 3%; margin-left: 45%;"></v-img>
                <v-row>
                    <v-col cols="3">
                       <v-img src="https://ifh.cc/g/N3Tbxv.png" max-width="150" max-height="50"
                       style="margin-top: 3%; margin-left: 10%;"></v-img>
                    </v-col>
                    <v-col cols="8">
                        <v-text-field v-model="userNickname" label="신고유저를 작성해 주세요"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="3">
                        <v-img src="https://ifh.cc/g/cdjwlB.png" max-width="100" max-height="50"
                       style="margin-top: 3%; margin-left: 20%;"></v-img>
                    </v-col>
                    <v-col cols="8">
                        <v-text-field label="제목을 작성해 주세요"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="3">
                        <v-img src="https://ifh.cc/g/9artM2.png" max-width="150" max-height="50"
                       style="margin-top: 3%; margin-left: 10%;"></v-img>
                    </v-col>
                    <v-col cols="8">
                        <v-textarea :outlined="true" label="신고사유를 작성해 주세요"></v-textarea>
                    </v-col>
                </v-row>
                <v-btn style="margin-left: 90%; margin-bottom: 3%; background-color: red !important;" :rounded="true" >신고접수</v-btn>
            </v-card>
        </v-container>
    </v-app>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return{
            userNickname:'',
            userUrl:'',
            userPoint:'',
            userColor:'',
            userCategoryMedium:'',
            userInfo:'',
            userAbility:'',
        }
    },
    mounted() {
        this.ReceiveUser(this.$route.params.OtherUser);
    },
    methods:{
        ReceiveUser(OtherUser) {
            console.log(OtherUser);
            axios
            .get(this._baseUrl+'user/userinfo',{
                params:{
                    userNum:OtherUser,
                }
            })
            .then((response) => {
                console.log(response.data);
                this.userNickname = response.data.userNickname;
                this.userUrl = response.data.userUrl;
                this.userPoint = response.data.userPoint;
                this.userColor = response.data.userColor;
                this.userCategoryMedium = response.data.userCategoryMedium;
                this.userInfo = response.data.userInfo;
                this.userAbility = response.data.userAbility;
            }) 
            .catch(error => {
                console.log(error);
            })
        }
    }
}
</script>