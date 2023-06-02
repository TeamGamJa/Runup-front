<template>
    <v-main>
        <v-container class="MyPage-container">
            <v-row>
                <!-- 좌측 -->
                <!-- <v-card :loading="loading" max-width="374" style="height: 650px;">
                    
                </v-card> -->
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
                <v-card style="width:35%; ">
                    <v-img class="chart-title2" src="https://ifh.cc/g/1gNW16.png"></v-img>
                    <!-- <template slot="progress">
                        <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
                    </template> -->
                    <v-card-title>전체 런닝 Top 5</v-card-title>
                    <div class="my-class">
                        <div ref="chart" class="chart-container"></div>
                    </div>

                    <v-card-title>주간 런닝 Top 5</v-card-title>
                    <div ref="chart2" class="chart-container2"></div>

                    
                </v-card>
                
                <!-- 우측 -->
                <v-card class="Grape-shape">
                    <v-card-title>내가 신청한 수업</v-card-title>
                    <ve-pie :data="chartData" :settings="chartSettings" />
                    <v-card-title>내가 신청한 수업</v-card-title>
                    <ve-pie :data="chartData" :settings="chartSettings" />
                </v-card>
                
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
        }
    }),
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
                })

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
                })


            this.$axios({
                url: `http://127.0.0.1:8080/runup/running/pchart`,
                method: 'GET',
                params: {
                    userNum: store.getters.getUserNum,
                },
            })
                .then((response) => {
                    console.log(response.data);
                    const item = response.data;
                    // console.log(item);
                    for (let i = 0; i < item.length; i++) {
                        this.row = item[i];
                        this.chartData.rows.push({
                            runningCategoryBig: this.row.runningCategoryBig,
                            runningValue: this.row.runningValue,
                        });
                    }
                })
                .catch((error) => {
                    console.error(error);
                })

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
.MyPage-container {
    margin-top: 20px;
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



.Grape-shape {
    width: 35%;
    height: 40%;
    margin-top: 7%;
}
.chart-title2 {
    width: 60%;
    height: 8%;
}
</style>