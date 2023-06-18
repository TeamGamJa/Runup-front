<template>
    <v-container class="UserProfile-container">
        <v-main class="UserProfile-main">
            <v-row>
                <!-- 좌측 -->
                <v-card class="UserProfile-leftcard">

                    <v-img src="https://ifh.cc/g/TlTs2y.png" max-width="220" max-height="50"
                        style="margin-top: 3%;"></v-img>

                    <v-img :src="userUrl" max-width="300" max-height="320"
                        style="margin-left: 14%; margin-top: 3%;"></v-img>
                    <v-card-title class="userNickname">{{ userNickname }}</v-card-title>

                    <v-row style="margin-left: 10%; margin-bottom: 2%;">
                        <v-col cols="2" style="margin-top: 9%;">
                            <v-img src="https://ifh.cc/g/Q3AtJp.png" max-width="45" max-height="45"></v-img>
                        </v-col>
                        <v-col cols="8" style="margin-left: 5%;">
                            <v-progress-linear :value="percent" class="salt-gage-bar" :color="getChipColor" :rounded="true"
                                height="20"></v-progress-linear>
                        </v-col>
                    </v-row>

                    <v-row style="margin-left: 10%; margin-bottom: 2%;">
                        <v-img src="https://ifh.cc/g/848nCH.png" max-width="80" max-height="30"
                            style="margin-top: 3%;"></v-img>
                        <v-card-title>{{ userCategoryMedium }}</v-card-title>
                    </v-row>

                    <v-row style="margin-left: 10%; margin-bottom: 2%;">
                        <v-img src="https://ifh.cc/g/z4jM5K.png" max-width="150" max-height="30"
                            style="margin-top: 3%;"></v-img>
                    </v-row>
                    <v-card-title style="margin-left: 15%;">{{ userInfo }}</v-card-title>




                </v-card>

                <!-- 우측 -->
                <v-card class="UserProfile-rightcard">

                    <v-img src="https://ifh.cc/g/CsXB9O.png" max-width="250" max-height="50"
                        style="margin-top: 3%; margin-bottom: 5%;"></v-img>

                    <v-data-table :headers="headers" :items="runningBlue" :item-key="itemKey" :show-select="true"
                        v-model="selectedItems" class="elevation-0" @click:row="moveToHelp">
                        <!-- eslint-disable-next-line vue/valid-v-slot -->
                        <!-- <template v-slot:item.actions="{ item }">
                          
                        </template> -->
                    </v-data-table>

                    <v-img src="https://ifh.cc/g/4gO3OC.png" max-width="250" max-height="50"
                        style="margin-top: 3%; margin-bottom: 5%;"></v-img>

                    <v-data-table :headers="headers" :items="runningOrange" :item-key="itemKey" :show-select="true"
                        v-model="selectedItems" class="elevation-0" @click:row="moveToHelp">
                        <!-- eslint-disable-next-line vue/valid-v-slot -->
                        <!-- <template v-slot:item.actions="{ item }">
                          
                        </template> -->
                    </v-data-table>
                </v-card>
            </v-row>
        </v-main>
    </v-container>
</template>

<script>
import store from '@/store/store'
import axios from 'axios'
export default {
    data() {
        return {
            percent: 0,

            // 타유저 정보
            OtheruserNum: '',
            userNickname: '',
            userUrl: '',
            userPoint: '',
            userColor: '',
            userCategoryMedium: '',
            userInfo: '',
            userAbility: '',

            runningBlue: [],
            runningOrange: [],
            headers: [
             
                { text: '제목', align: 'center', value: 'runningTitle' },
            ],
            itemKey: "runningNum",
            selectedItems: [],
        };
    },
    computed: {
        getChipColor() {
            const userColor = store.getters.getUserColor;
            const percent = userColor / 10;

            if (percent >= 0 && percent < 10) return 'red';
            else if (percent >= 10 && percent < 20) return 'orange';
            else if (percent >= 20 && percent < 30) return 'yellow';
            else if (percent >= 30 && percent < 40) return 'green';
            else if (percent >= 40 && percent < 50) return 'blue';
            else if (percent >= 50 && percent < 60) return 'indigo';
            else if (percent >= 60 && percent < 70) return 'purple';
            else return 'white';
        },
    },
    methods: {
        increasePercent() {
            const userColor = store.getters.getUserColor;
            const percent = userColor / 10;
            this.$data.percent = percent;
        },
        UserProfile(OtherUser) {
            console.log(OtherUser);
            axios
                .get(this._baseUrl + 'user/userinfo', {
                    params: {
                        userNum: OtherUser,
                    }
                })
                .then((response) => {
                    console.log(response.data);
                    this.runningList = response.data;
                    this.userNickname = response.data.userNickname;
                    this.userUrl = response.data.userUrl;
                    this.userPoint = response.data.userPoint;
                    this.userColor = response.data.userColor;
                    this.userCategoryMedium = response.data.userCategoryMedium;
                    this.userInfo = response.data.userInfo;
                    this.userAbility = response.data.userAbility;
                    this.OtheruserNum = response.data.userNum;
                   
                })
                .catch(error => {
                    console.log(error);
                })
        },
        fetchGiveSchedule() {
            axios.get(this._baseUrl + 'running/allgive', {
                params: {
                    userNum: this.$route.params.OtherUser,
                }
            })
                .then((response) => {
                    this.runningBlue = response.data.runningBlue;
                    this.runningOrange = response.data.runningOrange;
                }).catch(error => {
                    console.log(error)
                })
        },
        moveToHelp() {
            this.$router.push('/FoundRunning')
        }

    },
    mounted() {
        this.increasePercent() // 1초마다 increasePercent 메소드 호출
        this.UserProfile(this.$route.params.OtherUser);
        this.fetchGiveSchedule();
    },
};



</script>

<style>
.UserProfile-container {
    margin-top: 3%;
}

.UserProfile-leftcard {
    width: 40%;
}

.UserProfile-rightcard {
    width: 60%;
}
</style>