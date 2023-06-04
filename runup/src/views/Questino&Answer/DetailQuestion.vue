<template>
    <v-container class="detailQue-container">
        <v-row>
            <v-card class="cotent-card">
                <v-img :src="titleImg" max-width="350" max-height="60" style="margin-top: 2%; 
                margin-left: 2%; margin-bottom: 3%;"></v-img>
                <v-row>
                    <v-col cols="9">
                        <!-- 제목 -->
                        <v-img src="https://ifh.cc/g/pbdYOy.png" max-width="50" max-height="50"
                            style="margin-left: 1%;"></v-img>
                        <v-card-text class="Question-text-font">
                            {{ questionTitle }}
                        </v-card-text>
                    </v-col>
                    <v-col style="margin-left: 15%; margin-top: 2%;" cols="1" xl="1">
                        <v-btn icon :color="isLike ? 'pink' : 'grey'" @click="likeCount()">
                            <v-icon>mdi-heart</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
                <!-- 카테고리 -->
                <v-img src="https://ifh.cc/g/toQZtR.png" max-width="80" max-height="50" style="margin-left: 1%;"></v-img>
                <v-card-text class="Question-text-font">
                    {{ questionChoice }}
                </v-card-text>

                <!-- 작성자 -->
                <v-img src="https://ifh.cc/g/cTjzFK.png" max-width="80" max-height="50" style="margin-left: 1%;"></v-img>
                <v-card-text class="Question-text-font">
                    {{ questionWriter }}
                </v-card-text>

                <!-- 작성일 -->
                <v-img src="https://ifh.cc/g/tdkw4P.png" max-width="80" max-height="50" style="margin-left: 1%;"></v-img>
                <v-card-text class="Question-text-font">
                    {{ questionDate }}
                </v-card-text>

                <!-- 내용 -->
                <v-img src="https://ifh.cc/g/NHBA4b.png" max-width="50" max-height="50" style="margin-left: 1%;"></v-img>
                <v-card-text class="Question-text-font">
                    {{ questionContent }}
                </v-card-text>
                <v-card-actions class="btn-group" v-if="isConfirmUser">
                    <v-btn class="Que-btn-edit" :rounded="true"
                        @click="editQuestionContent($store.getters.getQuestionNum)">수정</v-btn>
                    <v-btn class="Que-btn-del" :rounded="true" @click="delQuestionContent()">삭제</v-btn>
                </v-card-actions>
                <v-card-text>
                </v-card-text>
            </v-card>
        </v-row>

        <!-- 댓글 코드 -->
        <v-row>
            <v-card class="cotent-card-comment">
                <v-img src="https://ifh.cc/g/Orl2BQ.png" max-width="80" max-height="50"
                    style="margin-left: 2%; margin-top: 2%;"></v-img>
                <v-col cols="9" class="comment-write-control" style="margin-left: 3%;">
                    <v-text-field v-model="writeComment" class="comment-write" label="댓글 입력"></v-text-field>
                </v-col>
                <v-btn :rounded="true" class="comment-write-btn" @click="CommentWrite()">등록</v-btn>

                <v-row v-for="(item, idx) in commentList" :key="idx" @click:row="showOtherUser" v-model="selComment">
                    <v-list-item-avatar class="comment-first">
                        <v-img :src="item.userUrl"></v-img>
                    </v-list-item-avatar>
                    <v-col cols="2">
                        <v-menu bottom offset-y>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn class="OtherUser" v-bind="attrs" v-on="on" plain>
                                    <span class="OtherUser-text">{{ item.qCommentWriter }}</span>
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item v-for="(subItem, i) in items" :key="i" @click="navigateTo(subItem.title, item.userNum)">
                                    <v-list-item-title>{{ subItem.title }}</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                        <!-- <v-card-title>{{ item.qCommentWriter }}</v-card-title> -->
                    </v-col>
                    <v-col cols="4">
                        <v-card-title>{{ qCommentDate }}</v-card-title>
                    </v-col>
                    <v-col cols="3">
                        <v-card-actions class="btn-group" v-if="isCommentUserConfirm">
                            <v-btn class="Que-btn-edit" :rounded="true" @click="editComment(item.qCommentNum)">수정</v-btn>
                            <v-btn class="Que-btn-del" :rounded="true" @click="delComment(item.qCommentNum)">삭제</v-btn>
                        </v-card-actions>
                    </v-col>
                    <v-col cols="8" style="margin-left: 3%;">
                        <v-card-title>{{ item.qCommentContent }}</v-card-title>
                    </v-col>
                </v-row>
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
            isLike: '',

            // 댓글 v-model
            commentList: [],
            writeComment: '',
            userImage: 'https://ifh.cc/g/rqRoJ1.png',
            qCommentDate: '',

            // 회원 여부 확인 후 버튼 존재 유무
            isConfirmUser: false,
            isCommentUserConfirm: false,

            // 타 유저 정보 확인 및 쪽지 보내기
            otherInfoOpen: false,
            selComment: [],
            items: [
                {
                    title: '정보 보기', 
                },
                {
                    title: '쪽지 쓰기',
                },
                {
                    title: '신고 하기',
                },
            ],
            titleImg: '',
        }
    },
    watch: {
        questionChoice(newVal) {
            if (newVal === '도움요청') {
                this.titleImg = 'https://ifh.cc/g/8G3Hz7.png'
            } else if (newVal === '고민상담') {
                this.titleImg = 'https://ifh.cc/g/paXvl4.png'
            }
        }
    },
    computed: {
        isCurrentUserAuthor() {
            const currentUser = this.questionWriter; // 현재 사용자 정보를 가져오는 함수 (예: 로그인 상태, 사용자 ID 등)
            return store.getters.getUserNickname === currentUser;
        },

    },

    mounted() {
        this.fetchcommentList().then(() => {
            this.commentuserConfirm();
        });
        this.detailContent().then(() => {
            this.userconfirm();
        });
        this.fetchLike()
        // this.userconfirm()
    },
    methods: {
        // 작성자 확인
        userconfirm() {
            // console.log(this.questionWriter + '아도뱀야');
            if (this.questionWriter === store.getters.getUserNickname) {
                this.isConfirmUser = true;
            } else {
                // console.log('안보인다');
                this.isConfirmUser = false;
            }
        },

        // 댓글 작성자 확인
        commentuserConfirm() {
            // console.log(this.commentList); // 확인용
            const userNickname = store.getters.getUserNickname;
            this.isCommentUserConfirm = this.commentList.some(comment => comment.qCommentWriter === userNickname);
        },
        showOtherUser(row) {
            const target = row;
            this.selectedElement = target;
            console.log(target);
            this.otherInfoOpen = true;

        },

        // 좋아요 클릭시 (Grey -> Pink or Pink -> Grey)
        likeCount() {
            let tmp = this;
            axios
                .post(tmp._baseUrl + 'question/like', {
                    questionNum: this.questionNum,
                    userNum: store.getters.getUserNum,

                })
                .then((response) => {
                    console.log(response.data);
                    if (response.data === 0) {
                        this.isLike = false;
                        this.fetchLike()
                        console.log('하트에 불이 들어왔습니다.')
                    } else {
                        this.isLike = true;
                        this.fetchLike()
                        console.log('하트에 불이 꺼졌습니다.')
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        },

        // 좋아요 개수 확인
        fetchLike() {
            let tmp = this;
            axios.get(tmp._baseUrl + 'question/like', {
                params: {
                    questionNum: store.getters.getQuestionNum,
                }
            })
                .then((response) => {
                    console.log(response.data);
                    if (response.data === 0) {
                        this.isLike = false;
                    } else {
                        this.isLike = true;
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        },

        // 상세페이지 내용 불러오기
        async detailContent() {
            try {
                const response = await axios.get(this._baseUrl + 'question/content', {
                    params: {
                        questionNum: this.questionNum,
                    },
                });
                console.log(response.data);
                this.questionTitle = response.data.questionTitle;
                this.questionContent = response.data.questionContent;
                this.questionWriter = response.data.questionWriter;
                this.questionCategoryMedium = response.data.questionCategoryMedium;
                this.questionDate = moment(response.data.questionDate).format('YYYY-MM-DD');
                if (response.data.questionChoice === 1) {
                    this.questionChoice = '고민상담';
                } else {
                    this.questionChoice = '도움요청';
                }
            } catch (error) {
                alert(error);
            }
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
                .catch((error) => {
                    console.log(error)
                })
        },
        async fetchcommentList() {
            let tmp = this;
            try {
                const response = await axios.get(tmp._baseUrl + 'question/comment', {
                    params: {
                        questionNum: this.questionNum,
                    }
                });
                console.log(response.data);
                this.commentList = response.data;
                this.userImage = this.commentList.userUrl;
                this.qCommentDate = moment(response.data.qCommentDate).format('YYYY-MM-DD');

            }
            catch (error) {
                console.log(error);
            }
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
                    this.fetchcommentList()
                })
                .catch(error => {
                    console.log(error);
                })
        },
        editComment(qCommentNum) {
            store.dispatch('setVuexCommentNum', qCommentNum);
            this.$router.push('/EditComment/' + qCommentNum);
        },
        delComment(qCommentNum) {
            console.log(qCommentNum);
            let tmp = this;
            axios
                .delete(tmp._baseUrl + 'question/comment', {
                    data: { qCommentNum: qCommentNum, }
                })
                .then((response) => {
                    console.log(response.data);
                    location.reload();
                })
                .catch(error => {
                    console.log(error);
                })
        },
        navigateTo(title, OtherUser) {
            switch (title) {
                case '정보 보기':
                    this.$router.push('/ProfileInfo/'+ OtherUser);
                    break;
                case '쪽지 쓰기':
                    this.$router.push('/MessageWrite/' + OtherUser);
                    break;
                case '신고 하기':
                    this.$router.push('/DoReport/' + OtherUser);
                    break;
                default:
                    break;
            }
        },


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

.OtherUser {
    margin-top: 8%;
}

.OtherUser-text {
    font-size: 20px;
}

.Question-text-font {
    font-size: 18px !important;
}
</style>