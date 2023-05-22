<template>
    <v-container class="detailQue-container">
        <v-row>
            <v-card class="cotent-card">
                <v-card-title>
                    제목: {{ questionTitle }}
                </v-card-title>
                <v-card-title>
                    카테고리: {{ questionChoice }}
                </v-card-title>
                <v-card-title>
                    작성자: {{ questionWriter }}
                </v-card-title>
                <v-card-title>
                    작성일: {{ questionDate }}
                </v-card-title>
                <v-card-title>
                    내용: {{ questionContent }}
                </v-card-title>
                <v-card-actions class="btn-group">
                    <v-btn class="Que-btn-edit" :rounded="true"
                        @click="editQuestionContent($store.getters.getQuestionNum)">수정</v-btn>
                    <v-btn class="Que-btn-del" :rounded="true" @click="delQuestionContent()">삭제</v-btn>
                </v-card-actions>
                <v-card-text>

                </v-card-text>
            </v-card>
        </v-row>
        <v-row>
            <v-card class="cotent-card-comment">
                <v-card-title>
                    댓글
                </v-card-title>
                <v-row>
                    <v-list-item-avatar class="comment-first">
                        <v-img :src="$store.getters.getProfileImg"></v-img>
                    </v-list-item-avatar>
                    <v-col cols="2">
                        유리
                    </v-col>
                    <v-col cols="3">
                        2099-11-11
                    </v-col>
                    <v-col cols="8" class="comment-first">
                        유리가 깨지면 와장창
                    </v-col>
                    <v-card-actions class="btn-group">
                        <v-btn v-if="isCurrentUserAuthor" class="Que-btn-edit" :rounded="true"
                            @click="editQuestionContent()">수정</v-btn>
                        <v-btn v-if="isCurrentUserAuthor" class="Que-btn-del" :rounded="true"
                            @click="delQuestionContent()">삭제</v-btn>
                    </v-card-actions>
                </v-row>
                <v-col cols="10" class="comment-write-control">
                    <v-text-field v-model="writeComment" class="comment-write" label="댓글 입력"></v-text-field>
                </v-col>
                <v-btn :rounded="true" class="comment-write-btn" @click="CommentWrite()">등록</v-btn>
                <v-container>
                </v-container>
            </v-card>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios'
import store from '@/store/store'
import moment from 'moment';  // 날짜 형식 변환해주는 라이브러리

export default {
    name: 'DetailQuestion',
    data() {
        return {
            questionNum: store.getters.getQuestionNum,
            questionTitle: '',
            questionWriter: '',
            questionContent: '',
            questionCategoryMedium: '',
            questionDate: '',
            questionChoice: '',

            // 댓글 v-model
            writeComment:'',

        }
    },
    computed: {
        isCurrentUserAuthor() {
            const currentUser = this.questionWriter; // 현재 사용자 정보를 가져오는 함수 (예: 로그인 상태, 사용자 ID 등)
            console.log(store.getters.getUserNickname)
            console.log(currentUser);
            return store.getters.getUserNickname === currentUser;
        }
    },
    mounted() {

        this.detailContent()
    },
    methods: {
        detailContent() {
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
        editQuestionContent(questionNum) {
            console.log(questionNum);
            this.$router.push({
                name: 'EditQuestion',
                params: {
                    questionNum: questionNum
                }
            });
        },
        delQuestionContent() {
            let tmp = this;
            axios
                .delete(tmp._baseUrl + 'question', {
                    params: {
                        questionNum: this.questionNum,
                    }
                })
                .then((response) => {
                    console.log(response);
                    alert('게시글이 삭제되었습니다.')
                    this.$router.push('/QuestionBoard')
                })
                .catch(error => {
                    console.log(error)
                })
        },
        commentList() {
            let tmp = this;
            axios
            .get(tmp._baseUrl + 'question/')
        },
        CommentWrite() {
            let tmp = this;
            axios
            .post(tmp._baseUrl + 'question/comment', {
                qCommentContent: this.writeComment,
                questionNum: this.questionNum,
                qCommentWriter: store.getters.getUserNickname,
            })
            .then((response) => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            })
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
}</style>