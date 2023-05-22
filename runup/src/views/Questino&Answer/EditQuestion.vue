<template>
    <v-container class="detailQue-container">
        <v-row>
            <v-card class="cotent-card">
                <v-row>
                    <v-col cols="1">
                        <v-card-title>제목:</v-card-title>
                    </v-col>
                    <v-col cols="10">
                        <v-text-field v-model="questionTitle" class="EditTitle">
                            제목: {{ questionTitle }}
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-card-title>
                    카테고리: {{ questionChoice }}
                </v-card-title>
                <v-card-title>
                    작성자: {{ questionWriter }}
                </v-card-title>
                <v-card-title>
                    작성일: {{ questionDate }}
                </v-card-title>
                <v-row>
                    <v-col cols="1">
                        <v-card-title>내용:</v-card-title>
                    </v-col>
                    <v-col cols="10">
                        <v-textarea v-model="questionContent" :outlined="true" class="qusetionContent">
                            내용: {{ questionContent }}
                        </v-textarea>
                    </v-col>
                </v-row>
                <v-card-actions class="btn-group">
                    <v-btn class="Que-btn-edit" :rounded="true" @click="EditContent()">수정</v-btn>
                </v-card-actions>
            </v-card>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios'
import store from '@/store/store'
import moment from 'moment';  // 날짜 형식 변환해주는 라이브러리

export default {
    name: 'EditQuestion',
    data() {
        return {
            questionNum: store.getters.getQuestionNum,
            questionTitle: '',
            questionWriter: '',
            questionContent: '',
            questionCategoryMedium: '',
            questionDate: '',
            questionChoice: '',
            userNum: '',
        }
    },
    mounted() {
        this.EditQuestion()
    },
    methods: {
        EditQuestion() {
            console.log(this.questionChoice);
            let tmp = this;
            axios
                .get(tmp._baseUrl + 'question/content', {
                    params: {
                        questionNum: this.questionNum,
                    }
                })
                .then((response) => {
                    console.log(response.data);
                    this.questionTitle = response.data.questionTitle;
                    this.questionContent = response.data.questionContent;
                    this.questionWriter = response.data.questionWriter;
                    this.questionCategoryMedium = response.data.questionCategoryMedium;
                    this.userNum = response.data.userNum;
                    this.questionDate = moment(response.data.questionDate).format('YYYY-MM-DD');
                    if (response.data.questionChoice === 1) {
                        this.questionChoice = '고민상담'
                    } else {
                        this.questionChoice = '도움요청'
                    }
                })
                .catch(error => {
                    alert(error)
                })
        },
        EditContent() {
            if (this.questionChoice === '도움요청') {
                console.log(this.questionTitle);
                console.log();
                console.log();
                console.log();
                let tmp = this;
                axios
                    .put(tmp._baseUrl + 'question', {

                        questionChoice: 0,
                        questionTitle: this.questionTitle,
                        questionContent: this.questionContent,
                        userNum: this.userNum,
                        questionNum: this.questionNum,
                    })
                    .then((response) => {
                        console.log(response.data);
                        // this.$router.go(-1)
                        console.log(this.questionNum);
                        this.$router.push({
                            path: '/DetailQuestion/:questionNum',
                            params: {
                                questionNum: this.questionNum
                            }
                        });
                    })
                    .catch(error => {
                        console.log(error);
                    })
            } else {
                let tmp = this;
                axios
                    .put(tmp._baseUrl + 'question', {
                        data: {
                            questionChoice: 1,
                            questionTitle: this.questionTitle,
                            questionContent: this.questionContent,
                            userNum: this.userNum,
                            questionNum: this.questionNum,
                        }
                    })
                    .then((response) => {
                        console.log(response.data);
                        console.log(this.questionNum);
                        // this.$router.go(-1);
                        this.$router.push({
                            path: '/DetailQuestion/:questionNum',
                            params: {
                                questionNum: this.questionNum
                            }
                        });
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
        }

    },
}
</script>

<style>
.detailQue-container {
    margin-top: 2%;
}

.cotent-card {
    width: 100%;
}

.btn-group {
    margin-left: 85%;
}

.Que-btn-edit {
    background-color: wheat;
}

.Que-btn-del {
    background-color: rgba(255, 107, 107, 1) !important;
}

/* 댓글 모음 */
.cotent-card-comment {
    margin-top: 2%;
    width: 90%;
    margin-left: 5%;
}

.cotent-card-comment {
    max-width: 70%;
}

.comment-write-control {
    display: inline-block;
}

.comment-write-btn {
    background-color: cornsilk !important;
    width: 10%;
    margin-left: 3%;
}

.comment-first {
    margin-left: 5%;
}

.EditTitle {
    width: 60%;
}

.qusetionContent {
    width: 90%;
}
</style>