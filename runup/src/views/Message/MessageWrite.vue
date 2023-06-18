<template>
    <v-app>
        <v-container style="margin-top: 8%;">
            <v-card>
                <v-img src="https://ifh.cc/g/X2ONxY.png" max-width="200" max-height="50"
                       style="margin-left: 40%; margin-bottom: 3%;"></v-img>
                <v-row>
                    <v-col cols="3">
                        <v-img src="https://ifh.cc/g/Sd4wSX.png" max-width="150" max-height="50"
                       style="margin-top: 3%; margin-left: 10%;"></v-img>
                    </v-col>
                    <v-col cols="8">
                        <v-text-field v-model="userNickname" label="받으실 분을 작성해 주세요"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="3">
                        <v-img src="https://ifh.cc/g/j6YxKT.png" max-width="100" max-height="50"
                       style="margin-top: 3%; margin-left: 20%;"></v-img>
                    </v-col>
                    <v-col cols="8">
                        <v-text-field v-model="messageTitle" label="제목을 작성해 주세요">제목</v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="3">
                        <v-img src="https://ifh.cc/g/FsqtWO.png" max-width="100" max-height="50"
                       style="margin-top: 3%; margin-left: 20%;"></v-img>
                    </v-col>
                    <v-col cols="8">
                        <v-textarea v-model="sendMessageContent" :outlined="true" label="보내실 내용을 작성해 주세요"></v-textarea>
                    </v-col>
                </v-row>
                <v-btn style="margin-left: 90%; margin-bottom: 3%;" :rounded="true" @click="sendMessage()" >보내기</v-btn>
            </v-card>
        </v-container>
    </v-app>
</template>

<script>
import store from '@/store/store';
import axios from 'axios';

export default {
    data() {
        return{
            userNum:'',
            userNickname:'',
            userUrl:'',
            userPoint:'',
            userColor:'',
            userCategoryMedium:'',
            userInfo:'',
            userAbility:'',
            sendMessageContent:'',
            messageTitle:'',
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
                this.userNum = response.data.userNum;
            }) 
            .catch(error => {
                console.log(error);
            })
        },
        sendMessage() {
            axios
            .post(this._baseUrl+'message',{
                receiverNum: this.userNum,
                messageReceiver:this.userNickname,
                senderNum: store.getters.getUserNum,
                messageSender: store.getters.getUserNickname,
                messageContent: this.sendMessageContent,
                messageTitle: this.messageTitle,
                messageOpenStatus: 1,
                messageTrash:1,

            })
            .then((response) => {
                console.log(response.data);
                this.messageTitle='';
                this.sendMessageContent = '';
            })
            .catch(error => {
                console.log(error);
            })
        },
    }
}
</script>