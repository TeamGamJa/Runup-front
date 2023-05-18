<template>
    <v-card>
        <v-card-title>설문 조사(Runner -> Learner)</v-card-title>
        <v-card-text>
            <v-form>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <!-- <h3> 1. 질문</h3> -->
                            <h3>Learner의 수업태도는 만족스러웠습니까?</h3>
                            <v-radio-group v-model="answers.question1">
                                <v-radio label="매우 만족" value="10"></v-radio>
                                <v-radio label="만족" value="8"></v-radio>
                                <v-radio label="보통" value="6"></v-radio>
                                <v-radio label="불만족" value="4"></v-radio>
                                <v-radio label="매우 불만족" value="2"></v-radio>
                            </v-radio-group>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="12">
                            <!-- <h3>2. 질문</h3> -->
                            <h3>Learner의 수업적극성은 좋았습니까??</h3>
                            <v-radio-group v-model="answers.question2">
                                <v-radio label="매우 적극적" value="10"></v-radio>
                                <v-radio label="적극적" value="8"></v-radio>
                                <v-radio label="보통" value="6"></v-radio>
                                <v-radio label="좋지 않았음" value="4"></v-radio>
                                <v-radio label="매우 좋지 않았음" value="2"></v-radio>
                            </v-radio-group>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="12">
                            <!-- <h3>4. 질문</h3> -->
                            <h3>Learner는 수업시간에 잘맞춰 왔습니까??</h3>
                            <v-radio-group v-model="answers.question3">
                                <v-radio label="매우 정확하게 옴" value="10"></v-radio>
                                <v-radio label="정확하게 옴" value="8"></v-radio>
                                <v-radio label="보통" value="6"></v-radio>
                                <v-radio label="조금 늦음" value="4"></v-radio>
                                <v-radio label="많이 늦음" value="2"></v-radio>
                            </v-radio-group>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="12">
                            <!-- <h3>5. 질문</h3> -->
                            <h3>대화를 하는데 있어 불쾌함을 느낀적은 없습니까?</h3>
                            <v-radio-group v-model="answers.question4">
                                <v-radio label="매우 만족" value="10"></v-radio>
                                <v-radio label="만족" value="8"></v-radio>
                                <v-radio label="보통" value="6"></v-radio>
                                <v-radio label="불만족" value="4"></v-radio>
                                <v-radio label="매우 불만족" value="2"></v-radio>
                            </v-radio-group>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="12">
                            <!-- <h3>6. 질문</h3> -->
                            <h3>추가 의견을 자유롭게 작성해주세요.
                            </h3>
                            <v-textarea v-model="answers.question6" rows="3" placeholder="의견을 입력해주세요"></v-textarea>
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-btn color="primary" @click="submitSurvey">제출</v-btn>
        </v-card-actions>
    </v-card>
</template>


<script>
import axios from 'axios'
import store from '@/store/store'

export default {
    data() {
        return {
            answers: {
                question1: '',
                question2: '',
                question3: '',
                question4: '',
                question6: '',
            }
        }
    },
    methods: {
        submitSurvey() {
            // 설문조사 결과를 서버로 전송하는 로직 작성
            let totalScore = 0; // totalScore 초기화 

            // 점수 합산
            totalScore += parseInt(this.answers.question1);
            totalScore += parseInt(this.answers.question2);
            totalScore += parseInt(this.answers.question3);
            totalScore += parseInt(this.answers.question4);

            // 총 점수
            console.log('총 점수' + totalScore);
            
            axios.put("http://localhost:8080/runup/running/finishrunning", {
                    userNum : store.getters.getParticipateNum,
                    userPoint : store.getters.getUserNum,
                    userColor : totalScore
			}).then(result => {
                console.log(result.data)
                alert("평가가 완료되었습니다.\n 참여해주셔서 감사합니다")
            }).catch(function (e) {
                console.log(e);
            });
        }
    }
}
</script>