<template>
    <v-container class="Record-container">
        <!-- 내가 받은 수업 리스트 불러오기 -->
        <v-data-table :headers="headers" :items="runningList" class="elevation-1" :items-per-page="9"
            @click:row="showEvent">
        </v-data-table>

        <v-menu v-model="selectedOpen" :close-on-content-click="false" class="screen-record" offset-y>
            <v-card class="dialog-Record">

                <!-- 여기에 요약본이라고 나타낼 이미지가 필요 -->
                <!-- <v-img class="categoryImage" :src="categoryImg"></v-img> -->

                <v-card-title class="Schedule-Info">
                    제목: {{ runningTitle }}
                </v-card-title>

                <!-- <v-divider class="linepart mx-4"></v-divider> -->

                <v-card-text>
                    <!-- <v-row class="Schedule-Info1">
                        특기: {{ RunningMcategory }}
                    </v-row> -->
                    <v-row class="Schedule-Info1">
                        Runner: {{ userNickname }}
                    </v-row>
                </v-card-text>
                <v-divider class="mx-4"></v-divider>
                <v-card-title class="test1">
                    수업요약
                </v-card-title>
                <v-divider class="mx-4"></v-divider>
                <v-card-title>
                    <!-- <v-row > -->
                        <v-virtual-scroll :bench="benched" :items="items" height="300" item-height="2000">

                            <p ref="content">안녕들하신가~ 요약본 테스트 용이라네. 어디까지 늘어나는지 확인을 하고, 또한 성공적으로 나타내는지 확인을 할려고 쓰는 글이라네
                                이걸 본다면 못본 척 딴 곳을 눌러주시게나... 어디까지 작성되는지 확인을 시작하겠네~ ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ
                                ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ
                                ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ
                                ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ
                                ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ
                                ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ
                                ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ
                                ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ
                                ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ
                                ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ
                                ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ
                                ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ
                                ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ
                                ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ
                                ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ
                                ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ
                                ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ
                            </p>
                        </v-virtual-scroll>
                    <!-- </v-row> -->
                </v-card-title>
            </v-card>
        </v-menu>

    </v-container>
</template>

<script>
import store from '@/store/store';
import axios from 'axios'

// import axios from 'axios';

export default {
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
        }
    },
    computed: {
      items () {
        return Array.from({ length: this.length }, (k, v) => v + 1)
      },
      length () {
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

            // let tmp = this;
            // axios
            // .get
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
.screen-record{
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