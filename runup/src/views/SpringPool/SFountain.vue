<template>
    <v-container class="Fountain-container">
        <!-- 내가 받은 수업 리스트 불러오기
        <v-text-field v-model="newFountain" label="글 작성" @keyup.enter="addFountain"></v-text-field>
        <v-data-table :headers="headers" :items="fountainData" class="elevation-1" :items-per-page="9"
            @click:row="clickEvent">
            <template v-slot="{ item }">
    <td>{{ formattedFountainPoints[item.fountainNum - 1] }}</td>
  </template>
        </v-data-table> -->
        <v-row>
            <v-col v-for="(item, index) in fountainData" :key="index" cols="4">
                <v-card class="post-card-item" @click="givePoint(item)">
                    <v-img width="400" height="200" :rounded="true"
                        src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>
                    <v-card-text>
                        <v-card-title>{{ item.fountainContent }}</v-card-title>
                        <v-card-text>{{ item.fountainDate }}</v-card-text>
                        <v-card-text>{{ item.fountainWriter }}</v-card-text>
                        <!-- <v-card-text>{{ item.fountainContent }}</v-card-text> -->
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <!-- 포인트 기부  -->
        <v-row>
            <v-dialog v-model="PointDialog" persistent max-width="70%">
                <v-card>
                    <v-row>
                        <v-col>
                            <v-card-title>
                                기부 내용: {{ selectItem.fountainContent }}
                            </v-card-title>
                            <v-card-title>
                                기부 요청자: {{ selectItem.fountainWriter }}
                            </v-card-title>
                            <v-card-text>
                                기부 요청날: {{ selectItem.fountainDate }}
                            </v-card-text>
                            <v-row>
                                <v-col cols="2">
                                    <v-card-title>기부금액:</v-card-title>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field v-model="point"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-btn @click="addPoint(selectItem.fountainWriter,selectItem.fountainNum); PointDialog = false">
                                닫아라
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card>
            </v-dialog>
        </v-row>
    </v-container>
</template>

<script>
import store from '@/store/store';
import axios from 'axios'

// import axios from 'axios';

export default {
    name: 'SFountain',
    data() {
        return {
            benched: 1,
            headers: [
                {
                    text: '번호',
                    align: 'center',
                    sortable: false,
                    value: 'fountainNum',
                },
                { text: '내용', align: 'center', value: 'fountainContent' },
                { text: 'Writer', align: 'center', value: 'fountainWriter' },
                { text: '포인트', align: 'center', value: 'fountainPoint' },
                { text: '작성 날짜', align: 'center', value: 'fountainDate' },
            ],

            fountainData: [], // 변경된 변수 이름

            selectedElement: false,
            fountainContent: '',
            fountainNum: '',
            fountainWriter: '',
            fountainDate: '',
            newFountain: '',

            PointDialog: false,
            selectItem: {}, // 선택된 게시글 정보
            point:'',
        }
    },
    computed: {
        items() {
            return Array.from({ length: this.length }, (k, v) => v + 1)
        },
        length() {
            return 1
        },

        formattedFountainPoints() {
            return this.fountainData.map(item => `${item.fountainPoint}/50`);
        }

    },
    mounted() {
        //this.fountainList()
        this.fetchFountainList(); // 수정된 메서드 이름
    },
    methods: {
        addFountain() {
            let tmp = this;
            axios
            .post(tmp._baseUrl + 'fountain', {
                fountainContent: this.newFountain,
                fountainWriter: store.getters.getUserNickname,
                userNum: store.getters.getUserNum
            })
                .then(response => {

                    console.log(response.data)
                    this.fetchFountainList()
                    this.newFountain = ''; // 입력 필드 초기화
                })
                .catch(error => {
                    // 글 작성에 실패한 경우
                    console.error(error);
                    // 실패에 대한 적절한 처리를 수행합니다.
                });
        },
        fetchFountainList() {
            console.log(11);
            let tmp = this;
            axios.get(tmp._baseUrl + "fountain/all", {
                params: {
                    participateNum: store.getters.getUserNum,
                }
            })
                .then((response) => {
                    console.log(response.data);
                    tmp.fountainData = response.data;
                })
        },
        givePoint(item) {
            this.selectItem = item;
            this.PointDialog = true;
        },
        addPoint(Receiver,fountainNum) {
            let tmp = this;
            axios
            .post(tmp._baseUrl + 'donation', {
                fountainNum: fountainNum,
                donationPoint: this.point,
                donationReceiver: Receiver,
                donationSender: store.getters.getUserNickname,
            })
                .then(response => {
                    console.log(response.data)
                })
                .catch(error => {
          
                    console.error(error);
            
                });
        },
    },
}
</script>

<style>
.Fountain-container {
    margin-top: 5%;
}
</style>