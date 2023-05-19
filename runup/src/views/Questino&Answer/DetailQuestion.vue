<template>
    <v-container class="detailQue-container">
        <v-row>
            <v-card class="cotent-card">
                <v-card-title>
                    질문 제목: 금 캐는 방법에 대해 수업을 열어주셨으면 좋겠습니다.
                </v-card-title>
                <v-card-title>
                    작성자: 맹구
                </v-card-title>
                <v-card-title>
                    질문일: 2077-11-12
                </v-card-title>
                <v-card-title>
                    질문 내용: 우리나라에서 금을 캐거나 사금을 채취할 수 있는 곳에 대해 알려주시고 도움을 주는 수업이 생기면 좋겠습니다!
                </v-card-title>
                <v-card-actions class="btn-group">
                    <v-btn class="Que-btn-edit" :rounded="true" text to="/editQuestion"
                        @click="editQuestionContent()">수정</v-btn>
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
                <v-row >
                    <v-list-item-avatar class="comment-first">
                        <v-img :src="$store.getters.getProfileImg"></v-img>
                    </v-list-item-avatar>
                    <v-col cols="2" >
                        유리
                    </v-col>
                    <v-col cols="3">
                        2099-11-11
                    </v-col>
                    <v-col cols="8" class="comment-first">
                        유리가 깨지면 와장창
                    </v-col>
                    <v-card-actions class="btn-group">
                        <v-btn class="Que-btn-edit" :rounded="true" text to="/editQuestion"
                            @click="editQuestionContent()">수정</v-btn>
                        <v-btn class="Que-btn-del" :rounded="true" @click="delQuestionContent()">삭제</v-btn>
                    </v-card-actions>
                </v-row>
                <v-col cols="10" class="comment-write-control">
                    <v-text-field class="comment-write" label="댓글 입력"></v-text-field>
                </v-col>
                <v-btn :rounded="true" class="comment-write-btn">등록</v-btn>
                <v-container>
                </v-container>
            </v-card>
        </v-row>
    </v-container>
</template>

<script>
export default{
    name:'DetailQuestion',
    data() {
        return {

        }
    },
    methods:{
        editQuestionContent() {
            alert("미완성")
        },
        delQuestionContent() {
            alert("미완성")
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
    background-color: red !important;
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