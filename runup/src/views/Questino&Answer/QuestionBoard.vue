<template>
    <v-container class="Q-container">
        <v-spacer></v-spacer>
        <v-row justify="end">
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
                                    <v-radio-group row>
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
                <v-card class="post-card-item" @click="GoDetail()">
                    <v-img height="200" :rounded="true" src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>
                    <v-card-text>
                        <div>{{ item.questionCategoryBig }}</div>
                        <div>{{ item.questionCategoryMedium }}</div>
                        <div>{{ item.questionTitle }}</div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script>
// import axios from 'axios';

export default {
    name: 'QuestionBoard',
    data() {
        return {
            questionList: [],
            dialog: false,
            WriteTitle: '',
            WriteContent: '',

            //카테고리
            categories: ['IT', '라이프스타일', '문제풀이', '기타'],
            categoryMedium: [''],
            choice: '',
            RunningMcategory:'',
        };
    },
    mounted() {
        this.fetchQuestionList();
    },
    methods: {
        fetchQuestionList() {
            var serverIP = '127.0.0.1',
                serverPort = 8080,
                pageUrl = 'runup/question/all';
            this.$axios
                .get(`http://${serverIP}:${serverPort}/${pageUrl}`)
                .then((response) => {
                    console.log(response.data);
                    this.questionList = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });
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
        GoDetail() {
            this.$router.push('/DetailQuestion');
        },
    },
};
</script>
  
<style scoped>
.Q-container {
    margin-top: 2%;
}
</style>
  