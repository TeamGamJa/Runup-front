<template>
    <v-container class="Record-container">
        <v-row>
            <v-card class="Mypoint-content">
                <v-card-text>
                    <v-btn text to="/MyPageEdit" class="MyPoint-menubar" disabled :rounded="true">Menu-bar</v-btn>
                    <v-btn text to="/MyPageEdit" class="MyPoint-Btn" :rounded="true">내 정보 수정</v-btn>
                    <v-btn text to="/MyClass" class="MyPoint-Btn" :rounded="true">나의 수업 통계</v-btn>
                    <!-- <v-btn text to="/MyPoint" class="MyPoint-Btn" :rounded="true">무지개, 포인트 내역</v-btn> -->
                    <v-btn text to="/MyRecord" class="MyPoint-Btn" :rounded="true">달리기 기록지</v-btn>
                    <!-- <v-btn text to="/MyQustion" class="MyPoint-Btn" :rounded="true">나의 고민</v-btn> -->
                    <v-btn text to="/MessageInbox" class="MyPoint-Btn" :rounded="true">쪽지함</v-btn>
                </v-card-text>
            </v-card>
            <!-- 내가 받은 수업 리스트 불러오기 -->
            <v-card style="width: 75%;">
                <v-data-table :headers="headers" :items="runningList" class="elevation-1" :items-per-page="9"
                    @click:row="showEvent">
                </v-data-table>

                <v-menu v-model="selectedOpen" :close-on-content-click="false" class="screen-record" offset-y>
                    <v-card class="dialog-Record">


                        <v-img src="https://ifh.cc/g/OVllzF.png" max-width="200" max-height="50"
                            style="margin-left: 25%;"></v-img>

                        <v-img src="https://ifh.cc/g/aAnHj3.png" max-width="70" max-height="50"
                            style="margin-top: 4%; margin-left: 2%;"></v-img>
                        <v-card-text style="font-size: 18px !important; margin-left: 4%;">
                            {{ runningTitle }}
                        </v-card-text>

                        <v-img src="https://ifh.cc/g/p4SSnJ.png" max-width="100" max-height="50"
                            style="margin-top: 4%; margin-left: 2%;"></v-img>
                        <v-card-text style="font-size: 18px !important; margin-left: 5%;">
                            {{ userNickname }}
                        </v-card-text>

                        <v-divider class="mx-4"></v-divider>
                        <v-img src="https://ifh.cc/g/yLdj7y.png" max-width="100" max-height="50"
                            style="margin-top: 4%; margin-left: 38%; margin-bottom: 3%;"></v-img>
                        <v-divider class="mx-4"></v-divider>

                        <v-sheet :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`" class="pa-3">
                            <v-skeleton-loader class="mx-auto" max-width="300" type="text" :loading="isLoading">
                                <v-virtual-scroll :bench="benched" :items="loading ? skeletonData : items" height="300"
                                    item-height="2000">
                                </v-virtual-scroll>
                            </v-skeleton-loader>
                        </v-sheet>
                        <p ref="content">아도뱀야 치커리 티와와</p>

                        <v-card-title>
                            <!-- <v-row > -->
                            <!-- </v-row> -->
                        </v-card-title>
                    </v-card>
                </v-menu>
            </v-card>
        </v-row>
    </v-container>
</template>

<script>
import store from '@/store/store';
import axios from 'axios'

// import axios from 'axios';

export default {
    inject: {
        theme: {
            default: { isDark: false },
        },
    },
    data() {
        return {
            benched: 1,
            headers: [
                {
                    text: '번호',
                    align: 'center',
                    sortable: false,
                    value: 'runningNum',
                },
                { text: '제목', align: 'center', value: 'runningTitle' },
                { text: 'Runner', align: 'center', value: 'userNickname' },
                { text: '특기', align: 'center', value: 'runningCategoryMedium' },
                { text: '수업 날짜', align: 'center', value: 'runningDate' },
            ],
            runningList: [],
            runningNum: [],

            dialog: false,
            selectedElement: false,
            selectedOpen: false,
            runningTitle: '',
            RunningMcategory: '',
            userLuxColor: '',
            userNickname: '',
            runningDate: '',
            text: '',
            question: '',
            questionLine: [],
            questionRequest: null,
            answer: '',
            USE_MODEL: true, // true: use 'model', false: use 'engine'
            url: 'https://api.openai.com/v1/completions',
            answerLine: '',

            isLoading: true,
        }
    },
    computed: {
        items() {
            return Array.from({ length: this.length }, (k, v) => v + 1)
        },
        length() {
            return 1
        },
    },
    mounted() {
        this.recordList()
    },
    methods: {
        showEvent(row) { // nativeEvent : DOM 이벤트 객체를 나타내는 java script객체
            const target = row;
            this.selectedElement = target;
            console.log(target)
            this.selectedOpen = true;
            this.runningNum = target.runningNum;
            this.runningTitle = target.runningTitle;
            // this.RunningBcategory = target.runningCategoryBig;
            this.RunningMcategory = target.runningCategoryMedium;
            // this.userLuxColor = target.userLuxColor;
            this.userNickname = target.userNickname;
            // this.runningContent = target.runningContent;
            // this.runningStartTime = target.runningStartSmall;
            // this.runningEndTime = target.runningEndSmall;
            let tmp = this;
            axios.get(tmp._baseUrl + "chat", {
                params: {
                    chatRoomId: 'test0'
                },
            })
                .then((result) => {
                    this.questionLine = (result.data.content).split('\n');
                    tmp.questionRequest = new Array(tmp.questionLine.length).fill('');

                    let i = 0;

                    for (let j = 0; j < tmp.questionLine.length; j++) {

                        tmp.questionRequest[i] += tmp.questionLine[j];
                        if (tmp.questionRequest[i].length > 250) {
                            console.log(tmp.questionRequest[i].length);
                            this.askChatGPT(tmp.questionRequest[i]);
                            i++;
                        }
                    }
                })
                .catch((error) => {
                    console.log("오류발생");
                    console.log(error);
                });
        },
        async askChatGPT(question) {
            const apiKey = '';
            // const model = 'text-davinci-002';
            const maxTokens = 4097; // 이 모델의 최대 컨텍스트 길이
            const prompt = "대화흐름을 대화주제에 대한 정보정달위주로 한글로 100자 내외로 요약해주세요. 화자는 구분하지않아도 됩니다\n" + question;
            function getTokenCount(text) {
                return encodeURIComponent(text).split(/(%[A-Fa-f0-9]{2})|./).length / 2;
            }
            const promptTokenCount = getTokenCount(prompt);
            const completionTokenCount = Math.floor(maxTokens - promptTokenCount);
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`,
            };

            const requestData = {
                prompt,
                max_tokens: completionTokenCount,
                n: 1,
                stop: null,
                temperature: 0.7
            };
            if (this.USE_MODEL) {
                requestData.model = "text-davinci-003";
            } else {
                requestData.engine = "davinci-codex";
            }
            try {
                console.log(question);
                const response = await axios.post(this.url, requestData, { headers });
                this.text += response.data.choices[0].text;
                console.log(response.data.choices[0].text)
            } catch (error) {
                console.error('Error while calling OpenAI API:', error.response);
            }
        },
        recordList() {
            console.log(11);
            let tmp = this;
            axios
                .get(tmp._baseUrl + "running/finishlist", {
                    params: {
                        participateNum: store.getters.getUserNum,
                    }
                })
                .then((response) => {
                    console.log(response.data);
                    this.runningList = response.data;
                    this.runningNum = []; // 게시글 번호를 저장할 배열 초기화
                    let num = this.runningList.length;
                    this.runningList.forEach((item) => {
                        item.runningNum = num--; // 역순으로 게시글 번호 할당
                        this.runningNum.push(item.runningNum); // runningNum 배열에 번호 추가
                    });
                })
        }
    },
}
</script>

<style>
.Record-container {
    margin-top: 5%;
}

.screen-record {
    width: 50%;
}

.dialog-Record {
    width: 500px;
    height: 50%;
}

.test1 {
    margin-left: 37%;
}
</style>