<template>
    <v-container>
        <div class="Running-container">
            <v-card>
                <div class="Running-header">
                    <v-row class="Running-category">
                        <v-col cols="3">
                            <v-select v-model="choice" label="대분류" :items="categories" @change="fetchcategoryMedium"></v-select>
                        </v-col>
                        <v-col cols="3">
                            <v-select v-model="RunningMcategory" id="Running-Mcategory" label="중분류" :items="categorymMedium"
                                @change="inputSelectVal"></v-select>
                        </v-col>
                        <v-col cols="3">
                            <v-btn color="primary" dark @click.prevent="categorySearch()">검색</v-btn>
                        </v-col>
                    </v-row>
                </div>
                <v-card-title>
                    <!-- 공백을 남겨놓아야 검색란의 크기가 전체적으로 퍼지지 않는다 -->
                    <v-spacer></v-spacer>
                    <v-text-field v-model="search" label="검색" single-line hide-details></v-text-field>
                </v-card-title>
                <v-data-table :headers="headers" :items="runningList" :items-per-page="8"
                    :options="{ itemsPerPageOptions: [] }" class="elevation=1">
                    <template v-slot:items="props">
                        <tr @mouseclick="goToDetailPage(props.item)">
                            <td>{{ props.item.RunningNum }}</td>
                            <td class="text-xs-center">{{ props.item.RunningTitle }} </td>
                            <td class="text-xs-center">{{ props.item.userNickname }}</td>
                            <td class="text-xs-center">{{ props.item.runningCategoryMedium }}</td>
                            <td class="text-xs-center">{{ props.item.userLuxColor }}</td>
                            <td class="text-xs-center">{{ props.item.userMentorCnt }}</td>
                            <td class="text-xs-center">{{ props.item.RunningDate }}</td>
                            <td class="text-xs-center">{{ props.item.RunningAble }}</td>
                        </tr>
                    </template>
                </v-data-table>
                <v-sheet id="scroll-threshold-example" class="overflow-y-auto pb-16" max-height="600">
                    <v-responsive height="auto"></v-responsive>
                </v-sheet>
            </v-card>
        </div>
    </v-container>
</template>

<script>
export default {
    name: 'FoundRunning',
    data() {
        return {
            RunningBcatogry: '전체',      // select #Running-Bcategory에 현재 선택되어 있는 값
            RunningMcategory: '전체',     // select #Running-Mcategory에 현재 선택되어 있는 값
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
                    value: 'runningNum'
                },
                { text: '제목', value: 'runningTitle' },
                { text: 'Runner', value: 'userNickname' },
                { text: '특기', value: 'runningCategoryMedium' },
                { text: '무지개', value: 'userLuxColor' },
                { text: 'Runner 횟수', value: 'userMentorCnt' },
                { text: '작성일', value: 'runningDate' },
                { text: '마감여부', value: 'runningAble' },
            ]

        }
    },
    created() {
        // this.fetchrunninglistall()
        this.fetchcategoryBig()
        // this.fetchcategoryMedium()
        // this.fetchrunningList()
    },
    mounted() {
        this.fetchrunningList()
    },
    methods: {
        goToDetailPage(item) {
            this.$router.push(`./DetailRunning/${item.RunningNum}`)
            console.log('나 불렀엉??')
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
            // console.log(list);
            this.runningList = list;
        },
        categorySearch() {
            var serverIP = '127.0.0.1',
                serverPort = 8080;
            // pageUrl ='runup/running/categorymedium';
            if (this.RunningMcategory == '전체') {
                this.$axios({
                    url: `http://${serverIP}:${serverPort}/runup/running/bycategorybig`,
                    method: "GET",
                    params: {
                        categoryBig: this.choice == '전체' ? '%' : this.choice,

                    },
                }).then((result) => {
                    console.log(result);
                    this.updateRunningList(result.data);
                }).catch(error => {
                    console.log(error)
                })
            } else {
                this.$axios({
                    url: `http://${serverIP}:${serverPort}/runup/running/bycategorymedium`,
                    method: "GET",
                    params: {
                        // categoryBig : this.choice == '전체' ? '%' : this.choice,
                        categoryMedium: this.RunningMcategory == '전체' ? '%' : this.RunningMcategory,
                    },
                }).then((result) => {
                    console.log(result);
                    this.updateRunningList(result.data);
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
            console.log("dsafsaf")
            var serverIP = '127.0.0.1',
                serverPort = 8080,
                pageUrl = 'runup/running/all';
            this.$axios({
                url: `http://${serverIP}:${serverPort}/${pageUrl}`,
                method: "GET",
            }).then(response => {
                // console.log(response)
                this.runningList = response.data // axios를 통해 받은 데이터를 run에 담기

            }).catch(error => {
                console.log(error)
            })
        }
    }
}
</script>

<style>
.Running-container {
    display: flex;
    background-color: white;
    flex-direction: column;
    height: 660px;
}

.Running-header {
    display: inline-flex;
    width: 100%;
    height: 50px;
    margin-left: 10px;
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
    justify-content: center;

}

.searchFunc {
    padding-left: 550px;
    justify-content: center;
}
</style>