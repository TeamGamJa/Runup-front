<template>
    <v-main>
        <v-container class="MyPoint-container">
            <v-row>
                <!-- 좌측 -->
                <v-card class="Mypoint-content">

                    <v-card-text>
                        <v-btn text to="/MyPageEdit" class="MyPoint-menubar" disabled :rounded="true">Menu-bar</v-btn>
                        <v-btn text to="/MyPageEdit" class="MyPoint-Btn" :rounded="true">내 정보 수정</v-btn>
                        <v-btn text to="/MyClass" class="MyPoint-Btn" :rounded="true">나의 수업 통계</v-btn>
                        <v-btn text to="/MyPoint" class="MyPoint-Btn" :rounded="true">무지개, 포인트 내역</v-btn>
                        <v-btn text to="/MyLearning" class="MyPoint-Btn" :rounded="true">달리기 기록지</v-btn>
                        <v-btn text to="/MyQustion" class="MyPoint-Btn" :rounded="true">나의 고민</v-btn>
                        <v-btn text to="/MessageInbox" class="MyPoint-Btn" :rounded="true">쪽지함</v-btn>
                    </v-card-text>
                </v-card>
                <v-card v-if="page === 1" style="width:75%; height: 100%" class="chart-box">
                    <v-img class="chart-title" src="https://ifh.cc/g/1gNW16.png"></v-img>
                    <v-card style="width:50%; height: 40%; display: inline-block; ">    
                        <v-card-title>전체 런닝</v-card-title>
                        <div class="my-class">
                            <div ref="chart" class="chart-container"></div>
                        </div>

                    </v-card>
                    <v-card style="width:50%; height: 40%; display: inline-block;">

                        <v-card-title>주간 런닝</v-card-title>
                        <div class="my-class">
                            <div ref="chart2" class="chart-container2"></div>
                        </div>


                    </v-card>
                </v-card>
                <v-card v-else-if="page === 2" style="width:75%; height: 100%" class="chart-box">
                    <v-img class="chart-title" src="https://ifh.cc/g/1gNW16.png"></v-img>
                    
                    <v-card>
                        <v-card-title>내가 신청한 수업</v-card-title>
                        <ve-pie :data="chartData" :settings="chartSettings" />
                    </v-card>
                </v-card>
                <div class="pagination-buttons">
                    <v-btn v-if="page > 1" @click="page--" class="previous-button">이전</v-btn>
                    <v-btn v-if="page < 2" @click="page++" class="next-button">다음</v-btn>
                </div>
            </v-row>
        </v-container>
    </v-main>
</template>

<script>
import store from '@/store/store'
import VePie from 'v-charts/lib/pie'
// import VeLine from 'v-charts/lib/line'
import * as echarts from 'echarts'

export default {
    name: 'MyClass',
    components: {
        VePie,
        // VeLine
    },
    data: () => ({
        //loading: false,
        chartData1: null,
        chartData2: null,
        selection: 1,
        UserLuxColor: 20,
        chartData: {
            columns: ['runningCategoryBig', 'runningValue'],
            rows: [],
        },
        chartDataLine: {
            columns: ['date', 'point', 'color'],
            rows: []
        },
        chartSettings: {
            pie: {
                radius: '50%',
            },
        },
        page: 1,
    }),
    watch: {
        page(newPage) {
            if (newPage === 1) {
                this.fetchChartData1();
                this.fetchChartData2();
            } else if (newPage === 2) {
                this.fetchChartData3();
            }
        }
    },
    created() {
        this.fetchData();
        this.fetchLine();
    },
    mounted() {
        // this.drawChart();
        // this.drawChart2();
    },
    methods: {
        fetchData() {
            if (this.page === 1) {
                this.fetchChartData1();
                this.fetchChartData2();
            } else if (this.page === 2) {
                this.fetchChartData3();
            }
        },
        fetchChartData1() {
            this.$axios({
                url: `http://127.0.0.1:8080/runup/running/allchart`,
                method: 'GET',
                params: {
                    userNum: store.getters.getUserNum
                },
            })
            .then((response) => {
                this.chartData1 = response.data;
                this.drawChart();
            })
            .catch((error) => {
                console.log(error);
            });
        },
        fetchChartData2() {
            this.$axios({
                url: `http://127.0.0.1:8080/runup/running/weekchart`,
                method: 'GET',
                params: {
                    userNum: store.getters.getUserNum
                },
            })
            .then((response) => {
                this.chartData2 = response.data;
                this.drawChart2();
            })
            .catch((error) => {
                console.log(error);
            });
        },
        fetchChartData3() {
            this.$axios({
                url: `http://127.0.0.1:8080/runup/running/pchart`,
                method: 'GET',
                params: {
                    userNum: store.getters.getUserNum,
                },
            })
            .then((response) => {
                this.chartData.rows = response.data.map(item => ({
                    runningCategoryBig: item.runningCategoryBig,
                    runningValue: item.runningValue,
                }));
            })
            .catch((error) => {
                console.error(error);
            });
        },
        fetchLine() {
            this.$axios({
                url: 'http://127.0.0.1:8080/runup/running/lchart',
                method: 'GET',
                params: {
                    userNum: store.getters.getUserNum,
                },
            })
                .then(response => {
                    const data = response.data;
                    const rows = [];
                    for (let i = 0; i < data.length; i++) {
                        const row = data[i];
                        rows.push({
                            date: row.date,
                            point: row.pointMovement,
                            color: row.colorMovement
                        });
                    }
                    this.chartDataLine.rows = rows;
                })
                .catch(error => {
                    console.error(error);
                });
        },
        drawChart() {
            const chartDom = this.$refs.chart;
            const myChart = echarts.init(chartDom);
            const option = {
                xAxis: {
                    type: 'category',
                    data: this.chartData1.map(item => item.userNickname)
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: this.chartData1.map(item => item.falseCount),
                    type: 'bar',
                    barWidth: 40,
                    itemStyle: {
                        color: '#5cadff',
                        borderWidth: 2
                    }
                }]
            };
            myChart.setOption(option);
        },
        drawChart2() {
            const chartDom2 = this.$refs.chart2;
            const myChart2 = echarts.init(chartDom2);
            const option2 = {
                xAxis: {
                    type: 'category',
                    data: this.chartData2.map(item => item.userNickname)
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: this.chartData2.map(item => item.falseCount),
                    type: 'bar',
                    barWidth: 40, // 막대 굵기
                    itemStyle: { // 막대 스타일
                        color: '#32cd32', // 막대 색상
                        borderWidth: 2 // 막대 테두리 굵기
                    }
                }]
            };
            myChart2.setOption(option2);
        }
    }

};
</script>

<style>
.pagination-buttons {
    margin-top: 2%;
    margin-left: 90%;
}
.chart-box {
    display: inline-block;
}

.chart-title {
    width: 15%;
    height: 10%;
    margin-top: 2%;
    margin-bottom: 2%;
}

.Mypoint-content {
    width: 20%;
    height: 80%;
    margin-top: 5%;
    margin-right: 2%;
    position: fixed;
}

.MyPoint-menubar {
    background-color: #D7E9F7;
    margin-bottom: 7%;
    margin-left: 15%;
    width: 60%;

}

.MyPoint-Btn {
    width: 60%;
    background-color: rgba(244, 209, 155, 1) !important;
    margin-bottom: 7%;
    margin-left: 15%;
}

.MyPoint-container {
    margin-top: 5%;
    margin-bottom: 20px;
}

.MyPage-Btn {
    color: black !important;
    background-color: rgba(244, 209, 155, 1) !important;
    border-radius: 200px;
    margin-top: 20px;
    /* margin-right: 20px; */
    margin-left: 10px;
}

.MyPage-Btn1 {
    color: black !important;
    background-color: rgba(244, 209, 155, 1) !important;
    border-radius: 200px;
    margin-top: 20px;
    margin-left: 30px;
}

.MyPage-Btn2 {
    color: black !important;
    background-color: rgba(244, 209, 155, 1) !important;
    border-radius: 200px;
    margin-top: 10px;
    margin-left: 50px;
    padding-left: 50px;
}

.group {
    display: flex;
    flex: 1;
    justify-content: space-around;
}

.chart-container {
    width: 100%;
    height: 400px;
}

.chart-container2 {
    width: 100%;
    height: 400px;

}

/* .Grape-shape {
    margin-top: 20%;
    width: 500px;
    height: 40%;
} */
</style>