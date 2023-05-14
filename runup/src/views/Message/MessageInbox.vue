<template>
    <v-container class="pa-1" fluid>
        <div class="Message-container">
                <div class="Message-header">
                    <v-row class="Message-category">
                        <v-col cols="3">
                            <v-btn text to="/MessageSendbox" class="MessageBoxBtn" :rounded="true">보낸 쪽지함</v-btn>
                        </v-col>
                        <v-col cols="3">
                            <v-btn text to="/MessageTrashcan" class="MessageBoxBtn" :rounded="true">휴지통</v-btn>
                        </v-col>
                    </v-row>
                    <v-text-field v-model="search" class="titleSearch" label="제목 검색" single-line hide-details
                        @keyup.enter="titleSearch"></v-text-field>
                </div>
                <v-card-title>
                    <!-- 공백을 남겨놓아야 검색란의 크기가 전체적으로 퍼지지 않는다 -->
                    <v-spacer></v-spacer><v-spacer></v-spacer>
                </v-card-title>
                <v-table>
                    <thead >
                    <tr>
                        <th class="table-head">보낸 사람</th>
                        <th class="table-head">제목</th>
                        <th class="table-head">보낸 날짜</th>
                    </tr>
                    </thead>
                    <tbody>
                        <td>왜 안떠</td>
                    </tbody>
                </v-table>
        </div>
    </v-container>
</template>

<script>
// import store from '@/store/store'

export default {
    name: 'MessageInbox',
    data() {
        return {
            MessageInboxList: [],  // 도움닿기 게시글 리스트 데이터 전송
            choice: '',
            search: '',
            headers: [
                {
                    text: '번호',
                    align: 'center',
                    sortable: false,
                    value: 'runningNum',
                    divider: true
                },
                { text: '보낸 사람', align: 'center', value: 'messageSender' },
                { text: '제목', align: 'center', value: 'messageTitle' },
                { text: '받은 날짜', align: 'center', value: 'messageDate' },
                // {
                //     text: '마감여부',
                //     value: 'runningAble',
                //     align: 'center',
                // },
            ],


            // 다이얼 로그 작업
            dialog: false,
            selectedElement: false,
            selectedOpen: false,
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
    
    created() {
        // this.fetchrunninglistall()
        this.fetchcategoryBig();
        // this.fetchcategoryMedium()
        // this.fetchrunningList()
    },
    mounted() {
        this.fetchrunningList();
    },
    methods: {

        messageSendbox: function() {

        },
        
        updateRunningList(list) {
            // console.log(list);
            this.runningList = list;
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
                for (let i = 0; i < this.runningList.length; i++) {
                    const item = this.runningList[i];
                    item.runningAble = item.runningAble === 0 ? '신청마감' : '신청가능';

                }
            }).catch(error => {
                console.log(error)
            })
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
                for (let i = 0; i < this.runningList.length; i++) {
                    const item = this.runningList[i];
                    item.runningAble = item.runningAble === 0 ? '신청마감' : '신청가능';

                }
            }).catch(error => {
                console.log(error)
            })
        }
    }
}
</script>

<style>
.Message-container {
    display: flex;
    background-color: white;
    flex-direction: column;
    /* height: 400px; */
}

.Message-header {
    display: inline-flex;
    width: 100%;
    height: 50px;
    margin-left: 10px;
    margin-top: 30px;
}

.Message-body {
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

.Message-footer {
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

.MessageBoxBtn {
    margin-left: 2px;
    color: black !important;
    background-color: rgba(244, 209, 155, 1) !important;
    justify-content: flex-end;
    border-radius: 200px;
    margin-top: 8px;
}

.v-data-table-header th {
    background-color: rgba(237, 247, 255, 1);   
}
.table-head {
    margin-left: 20%;
    margin-right: 20%;
}
</style>