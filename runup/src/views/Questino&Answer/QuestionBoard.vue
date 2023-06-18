<template>
    <v-container class="Q-container">
        <v-row justify="end">
            <v-row>
                <v-col cols="3">
                    <v-select v-model="questionChoice" label="종류" :items="questionCategory" :outlined="true"></v-select>
                </v-col>
                <v-col cols="2">
                    <v-btn class="QnABtn" :rounded="true" @click="updateQnAList()">검색</v-btn>
                </v-col>
            </v-row>
            <v-dialog v-model="dialog" persistent max-width="600px">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn color="cyan" class="mx-2" fab dark v-bind="attrs" v-on="on">
                        <v-icon dark>
                            mdi-pencil
                        </v-icon>
                    </v-btn>
                </template>
                <v-card>
                    <v-card-title>
                        <span class="text-h5">도움신청</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12" sm="6">
                                    <v-select v-model="choice" label="대분류" :items="categories"
                                        @change="fetchcategoryMedium"></v-select>
                                </v-col>
                                <v-col cols="5">
                                    <v-select v-model="RunningMcategory" id="Running-Mcategory" label="중분류"
                                        :items="categoryMedium" @change="inputSelectVal"></v-select>
                                </v-col>
                                <v-col>
                                    <v-radio-group row v-model="selectOption">
                                        <v-radio label="도움요청" value="Option1">도움요청</v-radio>
                                        <v-radio label="고민상담" value="Option2">고민상담</v-radio>
                                    </v-radio-group>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field label="질문제목" v-model="WriteTitle" required></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-textarea v-model="WriteContent" label="질문내용" hint="질문 혹은 요청하고 싶은 내용을 간략하게 적어주세요"
                                        required :outlined="true"></v-textarea>
                                </v-col>

                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="createQuestion(); dialog = false">
                            등록
                        </v-btn>
                        <v-btn color="blue darken-1" text @click="dialog = false">
                            취소
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
        <v-row>
            <v-col v-for="(item, index) in questionList" :key="index" cols="4">
                <v-card class="post-card-item" @click="GoDetail(item.questionNum)">
                    <v-img width="340" height="340" :rounded="true" :src="getQuestionImage(item.questionChoice)"></v-img>
                    <v-card-text>
                        <v-card-title>{{ item.questionTitle }}</v-card-title>
                        <v-card-text>{{ item.questionWriter }}</v-card-text>
                        <v-card-text>{{ item.questionCategoryMedium }}</v-card-text>
                        <v-card-text>좋아요 {{ item.questionLike }}</v-card-text>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script>
// import { findLast } from 'sockjs-client/lib/transport-list';
import store from '@/store/store'
// import axios from 'axios';

export default {
    name: 'QuestionBoard',
    data() {
        return {
            questionList: [],
            dialog: false,
            WriteTitle: '',
            WriteContent: '',
            selectOption:'',

            questionCategory:['도움요청', '고민상담'],

            //카테고리
            categories: ['IT', '라이프스타일', '문제풀이', '기타'],
            categoryMedium: [''],
            choice: '',
            RunningMcategory: '',
            QuestionImg: 'https://cdn.vuetifyjs.com/images/cards/cooking.png',
            questionChoice: '',
            questionNum:'',

        };
    },
    mounted() {
        this.fetchQuestionList();
    },
    methods: {
        getQuestionImage(questionChoice) {
            if (questionChoice === 1) {
                return 'https://ifh.cc/g/Ycj6SW.png';
            } else if (questionChoice === 0) {
                return 'https://ifh.cc/g/qDl1xx.png';
            }
            // Handle other cases or provide a default image URL if needed
            return 'https://cdn.vuetifyjs.com/images/cards/cooking.png';
        },
        fetchQuestionList() {
            var serverIP = '127.0.0.1',
                serverPort = 8080,
                pageUrl = 'runup/question/all';
            this.$axios
                .get(`http://${serverIP}:${serverPort}/${pageUrl}`)
                .then((response) => {
                    console.log(response.data);
                    this.questionList = response.data;
                    
                    for (let i = 0; i < this.questionList.length; i++) {
                        this.questionNum = this.questionList[i].questionNum;
                        if (this.questionList[i].questionChoice === 1) {
                            this.QuestionImg = 'https://ifh.cc/g/Ycj6SW.png'
                        } else {
                            this.QuestionImg = 'https://ifh.cc/g/qDl1xx.png'
                        }
                        
                        console.log(this.questionChoice);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        updateQnAList() {
            if(this.questionChoice === '도움요청' ) {
                var serverIP = '127.0.0.1',
                serverPort = 8080,
                pageUrl = 'runup/question/request';
                this.$axios
                .get(`http://${serverIP}:${serverPort}/${pageUrl}`,{
                    params:{
                        questionChoice: 0,
                    }
                })
                .then((response) => {
                    console.log(response.data);
                    this.questionList = response.data;
                    for (let i = 0; i < this.questionList.length; i++) {
                        if (this.questionList[i].questionChoice === 1) {
                            this.QuestionImg = 'https://ifh.cc/g/Ycj6SW.png'
                        } else {
                            this.QuestionImg = 'https://ifh.cc/g/qDl1xx.png'
                        }
                        
                        console.log(this.questionChoice);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
            } else{
                var serverIPs = '127.0.0.1',
                serverPorts = 8080,
                pageUrls = 'runup/question/counsel';
                this.$axios
                .get(`http://${serverIPs}:${serverPorts}/${pageUrls}`,{
                    params:{
                        questionChoice: 1,
                    }
                })
                .then((response) => {
                    console.log(response.data);
                    this.questionList = response.data;
                    for (let i = 0; i < this.questionList.length; i++) {
                        if (this.questionList[i].questionChoice === 1) {
                            this.QuestionImg = 'https://ifh.cc/g/Ycj6SW.png'
                        } else {
                            this.QuestionImg = 'https://ifh.cc/g/qDl1xx.png'
                        }
                        
                        console.log(this.questionChoice);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
            }
            },
            inputSelectVal(value) {
            this.questionCategoryMedium = value;
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
        // 새글 작성
        createQuestion() {
            var serverIP = '127.0.0.1',
            serverPort = 8080,
            pageUrl = 'runup/question';
            if(this.selectOption === 'Option1' ){
                        
                this.$axios({
                    url: `http://${serverIP}:${serverPort}/${pageUrl}`,
                    method: "POST",
                    data: {
                        questionChoice: 0, // 도움요청
                        questionTitle:this.WriteTitle,
                        questionContent: this.WriteContent,
                        questionWriter: store.getters.getUserNickname,
                        userNum: store.getters.getUserNum,
                        questionCategoryMedium:this.RunningMcategory,
                        questionCategoryBig: this.choice,
                    }
                }).then(response => {
                    console.log(response)
                    this.fetchQuestionList()
                }).catch(error => {
                    console.log(error)
                })
            }else{
                        
                this.$axios({
                    url: `http://${serverIP}:${serverPort}/${pageUrl}`,
                    method: "POST",
                    data: {
                        questionChoice: 1,  // 고민상담
                        questionTitle:this.WriteTitle,
                        questionContent: this.WriteContent,
                        questionWriter: store.getters.getUserNickname,
                        userNum: store.getters.getUserNum,
                        questionCategoryMedium:this.RunningMcategory,
                        questionCategoryBig: this.choice,
                    }
                }).then(response => {
                    console.log(response)
                    this.fetchQuestionList()
                }).catch(error => {
                    console.log(error)
                })
            }
        },
        GoDetail(questionNum) {
            store.dispatch('setVuexQuestionNum', questionNum);
            this.$router.push('/DetailQuestion/'+questionNum);
        },
    },
};
</script>
  
<style scoped>
.Q-container {
    margin-top: 2%;
}
.QnABtn {
    margin-top: 5%;
}
</style>
  