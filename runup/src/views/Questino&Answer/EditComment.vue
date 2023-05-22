<template>
    <v-container class="editComment-container">
        <v-card>
            <v-row>
                <v-col cols="2">
                    <v-card-title>{{ qCommentWriter }}</v-card-title>
                </v-col>
                <v-col cols="8">
                    <v-textarea v-model="qCommentContent" :outlined="true"></v-textarea>
                </v-col>
            </v-row>
            <v-btn @click="EditComment()">수정</v-btn>
        </v-card>
    </v-container>
</template>

<script>
import store from '@/store/store';
import axios from 'axios';

export default {
    name:'EditComment',
    data() {
        return{
            qCommentContent:'',
            qCommentNum: store.getters.getCommentNum,
            qCommentDate:'',
            qCommentWriter:'',
            userUrl:'',
            

        }
    },

    mounted() {
        this.reComment()
    },
    methods:{
        reComment() {
            let tmp = this;
            axios
            .get(tmp._baseUrl +'question/oneComment/', {
                params:{
                    qCommentNum: this.qCommentNum,
                }
            })
            .then((response)=> {
                console.log(response.data);
                this.qCommentWriter= response.data.qCommentWriter;
                this.qCommentContent = response.data.qCommentContent;
                this.qCommentDate = response.data.qCommentDate;
                this.userUrl = response.data.userUrl;

            })
            .catch(error => {
                console.log(error);
            })
        },
        EditComment() {
            let tmp = this;
            axios
            .put(tmp._baseUrl + 'question/comment', {
                qCommentNum: this.qCommentNum,
                qCommentContent: this.qCommentContent,
                questionNum : store.getters.getQuestionNum
            })
            .then((response)=> {
                console.log(response.data);
                this.$router.push('/DetailQuestion/'+store.getters.getQuestionNum);
            })
            .catch(error => {
                console.log(error);
            })
        }
    }
}
</script>

<style>
.editComment-container {
    margin-top: 2%;
}
</style>