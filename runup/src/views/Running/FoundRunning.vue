<template>
    <v-container class="Rcontainer pa-1" fluid>
        <div class="Running-container">
            <v-card>
                <div class="Running-header">
                    <v-row class="Running-category">
                        <v-col cols="3">
                            <v-select v-model="choice" label="대분류" :items="categories" @change="fetchcategoryMedium"
                                outlined></v-select>
                        </v-col>
                        <v-col cols="3">
                            <v-select v-model="RunningMcategory" id="Running-Mcategory" label="중분류" :items="categorymMedium"
                                @change="inputSelectVal" outlined></v-select>
                        </v-col>
                        <v-col cols="3">
                            <v-btn class="categoryBtn" :rounded="true" @click.prevent="categorySearch()">검색</v-btn>
                        </v-col>
                    </v-row>
                    <v-text-field v-model="search" class="titleSearch" label="제목 검색" single-line hide-details
                        @keyup.enter="titleSearch"></v-text-field>
                </div>
                <v-card-title>
                    <!-- 공백을 남겨놓아야 검색란의 크기가 전체적으로 퍼지지 않는다 -->
                    <v-spacer></v-spacer><v-spacer></v-spacer>
                </v-card-title>
                <v-data-table :headers="headers" :items="runningList" :items-per-page="9"
                    :options="{ itemsPerPageOptions: [] }" @click:row="showEvent" height="480">
                    <!-- eslint-disable-next-line vue/valid-v-slot -->
                    <template v-slot:item.userLuxColor="{ item }">
                        <v-chip class="Luxcolor-found text-center" :color="getColor(item.userLuxColor)"
                            style="border:2px solid rgba(244, 209, 155, 1); width: 100%;">
                            <!-- {{ item.userLuxColor }} -->
                        </v-chip>
                    </template>
                </v-data-table>
                <v-menu v-model="selectedOpen" :close-on-content-click="false" offset-y>
                    <v-card class="mx-auto" width="300">

                        <v-img class="categoryImage" :src="categoryImg"></v-img>

                        <v-card-title class="Schedule-Info">
                            <v-img src="https://ifh.cc/g/512Qw6.png" max-width="70" max-height="50"></v-img>
                            {{ runningTitle }}
                        </v-card-title>

                        <!-- <v-divider class="linepart mx-4"></v-divider> -->

                        <v-card-title>
                            <v-row class="Schedule-Info1">
                                <v-img src="https://ifh.cc/g/JFJZ6v.png" max-width="60" max-height="50"></v-img>
                                {{ RunningBcategory }}
                            </v-row>
                        </v-card-title>
                        <v-card-title>
                            <v-row class="Schedule-Info1">
                                <v-img src="https://ifh.cc/g/Qf5RwW.png" max-width="90" max-height="50"
                                    style="margin-left: 2%;"></v-img>
                                {{ userNickname }}
                            </v-row>
                        </v-card-title>
                        <v-card-title>
                            <v-row class="Schedule-Info1">
                                <v-img src="https://ifh.cc/g/tf3Aky.png" max-width="85" max-height="50"
                                    style="margin-left: 5%;"></v-img>
                                {{ runningStartTime }}
                            </v-row>
                            <v-card-title>
                            </v-card-title>
                            <v-row class="Schedule-Info1">
                                <v-img src="https://ifh.cc/g/kP35jL.png" max-width="80" max-height="50"></v-img>
                                {{ runningEndTime }}
                            </v-row>
                        </v-card-title>
                        <v-card-title>
                            <v-row class="Schedule-Info1">
                                <v-img src="https://ifh.cc/g/VAF5Lq.png" max-width="100" max-height="50"></v-img>
                                {{ runningContent }}
                            </v-row>
                        </v-card-title>


                        <v-card-actions>
                            <v-btn class="ParticipateBtn" :rounded="true" @click="joinClass">수업신청 </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-menu>
                <!-- <v-sheet id="scroll-threshold-example" class="overflow-y-auto pb-16" max-height="600">
                    <v-responsive height="auto"></v-responsive>
                </v-sheet> -->
            </v-card>
        </div>
    </v-container>
</template>

<script>
import store from '@/store/store'
import axios from 'axios'

export default {
    name: 'FoundRunning',
    data() {
        return {
            RunningBcategory: '',      // select #Running-Bcategory에 현재 선택되어 있는 값
            RunningMcategory: '',     // select #Running-Mcategory에 현재 선택되어 있는 값
            categories: ['IT', '라이프스타일', '문제풀이', '기타'], // select #Running-Bcategory안에 나열할 option 요소들의 리스트
            categorymMedium: [''],          // select #Running-Mcategory안에 나열할 option 요소들의 리스트
            runningList: [],  // 도움닿기 게시글 리스트 데이터 전송
            choice: '',
            search: '',
            headers: [
                {
                    text: '번호',
                    align: 'center',
                    sortable: false,
                    value: 'RunningNum',
                    divider: true
                },
                { text: '제목', align: 'center', value: 'runningTitle' },
                { text: 'Runner', align: 'center', value: 'userNickname' },
                { text: '특기', align: 'center', value: 'runningCategoryMedium' },
                { text: '무지개', align: 'center', value: 'userLuxColor' },
                { text: '수업 횟수', align: 'center', value: 'userMentorCnt' },
                { text: '수업 하는날', align: 'center', value: 'runningDate' },
                {
                    text: '마감여부',
                    value: 'runningAble',
                    align: 'center',
                },
            ],

            RunningNum: [],

            // 다이얼 로그 작업
            dialog: false,
            selectedElement: false,
            selectedOpen: false,
            loading: false,
            runningTitle: '',
            runningContent: '',
            runningStartTime: '',
            runningEndTime: '',
            runningNum: '',
            runningMcategory: '',
            userLuxColor: '',
            userNickname: '',
            userMentorCnt: '',
            runningDate: '',
            runningAble: '',   // 카테고리 이미지
            categoryImg: 'https://cdn.vuetifyjs.com/images/cards/cooking.png',
            LuxColorImg: '',


        }
    },
    watch: {
        RunningBcategory(newVal) {
            if (newVal === 'IT') {
                this.categoryImg = 'https://ifh.cc/g/OHjgvF.png'
            } else if (newVal === '라이프스타일') {
                this.categoryImg = 'https://ifh.cc/g/0PfTRa.png'
            } else if (newVal === '문제풀이') {
                this.categoryImg = 'https://ifh.cc/g/C3lb3C.png'
            } else if (newVal === '기타') {
                this.categoryImg = 'https://ifh.cc/g/YvzaWZ.png'
            }
        },
        userLuxColor(newJin) {
            if (newJin === 'red') {
                this.LuxColorImg = 'https://ifh.cc/g/RAXAxb.png'
            } else if (newJin === 'orange') {
                this.LuxColorImg = 'https://ifh.cc/g/fzZpQn.png'
            } else if (newJin === 'yello') {
                this.LuxColorImg = 'https://ifh.cc/g/rtobXp.png'
            } else if (newJin === 'green') {
                this.LuxColorImg = 'https://ifh.cc/g/AJGHHa.png'
            } else if (newJin === 'blue') {
                this.LuxColorImg = 'https://ifh.cc/g/hBVVFB.png'
            } else if (newJin === 'indigo') {
                this.LuxColorImg = 'https://ifh.cc/g/xpcdfb.png'
            } else if (newJin === 'violet') {
                this.LuxColorImg = 'https://ifh.cc/g/QTDW2n.png'
            } else if (newJin === 'white') {
                this.LuxColorImg = 'https://ifh.cc/g/lvmD7v.png'
            }
        }

    },
    created() {
        // this.fetchrunninglistall()
        this.fetchcategoryBig();
        // this.fetchcategoryMedium()
        // this.fetchrunningList()
    },
    computed: {
        isAuthenticated() {
            return store.getters.isAuthenticated;
        },
    },
    mounted() {
        this.fetchrunningList();
    },
    methods: {
        showEvent(row) { // nativeEvent : DOM 이벤트 객체를 나타내는 java script객체
            const target = row;
            this.selectedElement = target;
            console.log(target)
            this.selectedOpen = true;
            this.runningNum = target.runningNum;
            this.runningTitle = target.runningTitle;
            this.RunningBcategory = target.runningCategoryBig;
            this.RunningMcategory = target.runningCategoryMedium;
            this.userLuxColor = target.userLuxColor;
            this.userNickname = target.userNickname;
            this.runningContent = target.runningContent;
            this.runningStartTime = target.runningStartSmall;
            this.runningEndTime = target.runningEndSmall;

        },
        inputSelectVal(value) {
            this.RunningMcategory = value;
        },
        updateOptionList(type, list) {
            const arr = ['전체'];
            switch (type) {
                case 'Mcategory':
                    this.categorymMedium = [arr.concat(list)];
                    break;
            }
        },
        updateRunningList(list) {
            console.log('ㅅㅂ' + list);
            this.runningList = list;
        },
        categorySearch() {
            if (this.RunningMcategory == '전체') {
                axios
                    .get(this._baseUrl + 'running/bycategorybig', {
                        params: {
                            categoryBig: this.choice == '전체' ? '%' : this.choice,

                        },

                    }).then((response) => {
                        console.log(response.data);
                        this.updateRunningList(response.data);
                        this.runningList = response.data // axios를 통해 받은 데이터를 run에 담기
                        this.RunningNum = []; // 게시글 번호를 저장할 배열 초기화
                        let num = this.runningList.length;

                        this.runningList.forEach((item, index) => {
                            item.RunningNum = num - index; // 역순으로 게시글 번호 할당
                            this.RunningNum.push(item.RunningNum); // runningNum 배열에 번호 추가
                        });
                        for (let i = 0; i < this.runningList.length; i++) {
                            const item = this.runningList[i];
                            item.runningAble = item.runningAble === 0 ? '신청마감' : '신청가능';

                        }
                    }).catch(error => {
                        console.log(error)
                    })
            } else {
                axios
                    .get(this._baseUrl + 'running/bycategorymedium', {
                        params: {
                            categoryBig: this.choice == '전체' ? '%' : this.choice,
                            categoryMedium: this.RunningMcategory == '전체' ? '%' : this.RunningMcategory,
                        },

                    }).then((response) => {
                        console.log(response.data);
                        this.updateRunningList(response.data);
                        this.RunningNum = []; // 게시글 번호를 저장할 배열 초기화
                        this.runningList = response.data // axios를 통해 받은 데이터를 run에 담기
                        let num = this.runningList.length;

                        this.runningList.forEach((item, index) => {
                            item.RunningNum = num - index; // 역순으로 게시글 번호 할당
                            this.RunningNum.push(item.RunningNum); // runningNum 배열에 번호 추가
                        });
                        for (let i = 0; i < this.runningList.length; i++) {
                            const item = this.runningList[i];
                            item.runningAble = item.runningAble === 0 ? '신청마감' : '신청가능';

                        }
                    }).catch(error => {
                        console.log(error)
                    })
            }

        },
        fetchcategoryBig() {
            console.log('g21')
            var serverIP = '127.0.0.1',
                serverPort = 8080,
                pageUrl = 'runup/running/categorybig';
            this.$axios({
                url: `http://${serverIP}:${serverPort}/${pageUrl}`,
                method: "GET",
            }).then(response => {
                const categoryBigData = response.data.categoryBig;// axios를 통해 받은 데이터를 categorybig에 담기
                this.categoryBig = Object.values(categoryBigData);
            }).catch(error => {
                console.log(error)
            })

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
                // console.log(response)
                const categoryMediumData = response.data.categoryMedium;
                this.categorymMedium = ['전체'].concat(Object.values(categoryMediumData));
            }).catch(error => {
                console.log(error)
            })
        },

        fetchrunningList() {
            // console.log("dsafsaf")
            var serverIP = '127.0.0.1',
                serverPort = 8080,
                pageUrl = 'runup/running/all';
            this.$axios({
                url: `http://${serverIP}:${serverPort}/${pageUrl}`,
                method: "GET",
            }).then(response => {
                console.log(response.data)
                this.runningList = response.data // axios를 통해 받은 데이터를 run에 담기
                this.RunningNum = []; // 게시글 번호를 저장할 배열 초기화
                let num = this.runningList.length;

                this.runningList.forEach((item, index) => {
                    item.RunningNum = num - index; // 역순으로 게시글 번호 할당
                    this.RunningNum.push(item.RunningNum); // runningNum 배열에 번호 추가
                });

                for (let i = 0; i < this.runningList.length; i++) {
                    const item = this.runningList[i];
                    item.runningAble = item.runningAble === 0 ? '신청마감' : '신청가능';

                }
            }).catch(error => {
                console.log(error)
            })
        },
        joinClass() {
            if (this.isAuthenticated) {
                if (this.userNickname !== store.getters.getUserNickname) {

                    var serverIP = '127.0.0.1',
                        serverPort = 8080,
                        pageUrl = 'runup/running/participation';
                    this.$axios({
                        url: `http://${serverIP}:${serverPort}/${pageUrl}`,
                        method: "PUT",
                        data: {
                            participateNum: store.getters.getUserNum,
                            runningNum: this.runningNum,
                        }
                    }).then(response => {
                        console.log(response)
                        // 성공시 마감여부 변경
                        this.fetchrunningList()

                    }).catch(error => {
                        console.log(error)
                    })
                } else {
                    alert("내가 만든 수업은 신청이 앙되요~")
                }
            } else {
                this.$router.push('/SignIn');
            }
        },
        titleSearch() {
            var serverIP = '127.0.0.1',
                serverPort = 8080,
                pageUrl = 'runup/running/searchbar';
            this.$axios({
                url: `http://${serverIP}:${serverPort}/${pageUrl}`,
                method: "GET",
                params: {
                    runningTitle: this.search,
                }
            }).then(response => {
                console.log(response.data);
                this.runningList = response.data // axios를 통해 받은 데이터를 run에 담기
                this.RunningNum = []; // 게시글 번호를 저장할 배열 초기화
                let num = this.runningList.length;

                this.runningList.forEach((item, index) => {
                    item.RunningNum = num - index; // 역순으로 게시글 번호 할당
                    this.RunningNum.push(item.RunningNum); // runningNum 배열에 번호 추가
                });
                for (let i = 0; i < this.runningList.length; i++) {
                    const item = this.runningList[i];
                    item.runningAble = item.runningAble === 0 ? '신청마감' : '신청가능';

                }
            }).catch(error => {
                console.log(error)
            })
        },
        getColor(userLuxColor) {
            if (userLuxColor === 'red') return 'red'
            else if (userLuxColor === 'orange') return 'orange'
            else if (userLuxColor === 'yellow') return 'yellow'
            else if (userLuxColor === 'green') return 'green'
            else if (userLuxColor === 'blue') return 'blue'
            else if (userLuxColor === 'indigo') return 'indigo'
            else if (userLuxColor === 'purple') return 'purple'
            else if (userLuxColor === 'white') return 'white'
        },
    }
}
</script>

<style>
.Running-container {
    display: flex;
    background-color: white;
    flex-direction: column;
    margin-top: 3%;
    /* height: 400px; */
}

.Running-header {
    display: inline-flex;
    width: 100%;
    height: 50px;
    margin-left: 10px;
    margin-top: 30px;
}

.Running-body {
    flex-direction: column;
    width: 100%;
    height: 420px;
}

table {
    width: 100%;
    text-align: center;
}

table th {
    padding: 12px;
    border-bottom: 2px solid darkgray;
}

table td {
    padding: 12px;
}

.Running-footer {
    width: 100%;
    height: 30px;


}

.titleSearch {
    width: 200px;
    margin-right: 10px;
}

.searchFunc {
    padding-left: 550px;
    justify-content: center;
}

.categoryImage {
    height: 50%;
    display: center;
}

.linepart {
    margin-bottom: 8%;
}

.categoryBtn {
    margin-left: 2px;
    color: black !important;
    background-color: rgba(244, 209, 155, 1) !important;
    justify-content: flex-end;
    border-radius: 200px;
    margin-top: 8px;
}

.Schedule-Info1 {
    display: inline-block;
    font-size: large;
    margin-bottom: 8%;
}

.v-data-table-header th {
    background-color: rgba(237, 247, 255, 1);
}

.ParticipateBtn {
    background-color: rgba(244, 209, 155, 1) !important;
    margin-left: 75%;
}

.Luxcolor-found {
    width: 90%;
    /* text-align: center; */
}

.v-chip__content {
    text-align: center;
    margin-left: 22%;
}
</style>