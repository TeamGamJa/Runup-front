<template>
    <v-container class="Fountain-container">
        <!-- 내가 받은 수업 리스트 불러오기 -->
        <v-row>
            <v-col cols="8" style="margin-left: 15%;">
                <v-text-field v-model="newFountain" label="수분 요청" :outlined="true"></v-text-field>
            </v-col>
            <v-col cols="2">
                <v-btn @click="addFountain" :rounded="true" style="margin-top: 4%;">분수대 생성</v-btn>
            </v-col>
        </v-row>

        <v-row>
            <v-col v-for="(item, index) in fountainData" :key="index" cols="3">
                <v-card class="post-card-item" @click="givePoint(item)">
                    <v-img width="400" height="250" :rounded="true" src="https://ifh.cc/g/xGGgvk.png"></v-img>
                    <v-card-text>
                        <v-img src="https://ifh.cc/g/0WZtoK.png" max-width="170" max-heigtht="50"></v-img>
                        <v-card-text>{{ item.fountainDate }}</v-card-text>
                        <v-card-text>{{ item.fountainWriter }}</v-card-text>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <!-- 포인트 기부  -->
        <v-row>
            <v-dialog v-model="PointDialog" persistent max-width="50%">
                <v-card>
                    <v-row>
                        <v-col>
                            <v-img src="https://ifh.cc/g/0WZtoK.png" max-width="250" max-heigtht="50"
                                style="margin-top: 2%; margin-left: 2%; margin-bottom: 2%;"></v-img>
                            <v-img src="https://ifh.cc/g/7BJdqj.png" max-width="150" max-height="50"
                                style="margin-top: 3%; margin-left: 1%"></v-img>
                            <v-card-text style="font-size: 18px; margin-left: 2%;">
                                {{ selectItem.fountainContent }}
                            </v-card-text>
                            <v-img src="https://ifh.cc/g/gAC9rq.png" max-width="150" max-height="50"
                                style="margin-top: 3%; margin-left: 1%"></v-img>
                            <v-card-text style="font-size: 18px; margin-left: 2%;">
                                {{ selectItem.fountainWriter }}
                            </v-card-text>
                            <v-img src="https://ifh.cc/g/s2L1Cn.png" max-width="150" max-height="50"
                                style="margin-top: 3%; margin-left: 1%"></v-img>
                            <v-card-text style="font-size: 18px; margin-left: 2%;">
                                {{ selectItem.fountainDate }}
                            </v-card-text>
                            <v-row>
                                <v-col cols="3">
                                    <v-img src="https://ifh.cc/g/JkRCFN.png" max-width="150" max-height="50"
                                        style="margin-top: 3%; margin-left: 3%;"></v-img>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field v-model="point" :rules="[rules.point]" label="mL"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-btn-group class="poolbtngroup">
                                <v-btn class="poolBtn" :rounded="true" plain color="blue"
                                    @click="addPoint(selectItem.fountainWriter, selectItem.fountainNum); PointDialog = false">
                                    동전 던지기
                                </v-btn>
                                <v-btn class="poolBtn" :rounded="true" plain color="blue"
                                    @click="PointDialog = false">취소</v-btn>
                            </v-btn-group>
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
            point: '',
            rules: {
                point: v => {
                    if (!v) {
                        return '최대 50mL를 줄 수 있습니다.';
                    }
                    const numberValue = Number(v);
                    if (isNaN(numberValue)) {
                        return '포인트를 입력해주세요';
                    }
                    if (numberValue < 1 || numberValue > 50) {
                        return '1부터 50 사이의 포인트를 입력해주세요';
                    }
                    return true;
                }
            },
            showAlert: false,
            alertMessage: '',
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
        addPoint(Receiver, fountainNum) {
            let tmp = this;
            const parsedPoint = parseFloat(this.point, 10); // 문자열을 숫자로 변환
            if (isNaN(parsedPoint) || parsedPoint < 1 || parsedPoint > 50) {
                this.alertMessage = '1부터 50 사이의 숫자를 입력해주세요';
                this.showAlert = true;
                return;
            }

            axios
                .post(tmp._baseUrl + 'donation', {
                    fountainNum: fountainNum,
                    donationPoint: this.point,
                    donationReceiver: Receiver,
                    donationSender: store.getters.getUserNickname,
                })
                .then(response => {
                    console.log(response.data)
                    this.point = '';
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
    margin-top: 2%;
}

.poolbtngroup {
    margin-left: 72%;
}

.poolBtn {
    /* background-color: white; */
    margin-left: 1%;
}
</style>