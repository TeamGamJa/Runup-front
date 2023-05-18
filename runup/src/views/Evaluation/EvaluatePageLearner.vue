<template>
    <v-card>
        <v-card-title>설문 조사(Learner -> Runner)</v-card-title>
        <v-card-text>
            <v-form>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <!-- <h3> 1. 질문</h3> -->
                            <h3>수업의 내용은 만족스러웠습니까?</h3>
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
                            <h3>Runner의 설명은 이해하기 쉬웠습니까?</h3>
                            <v-radio-group v-model="answers.question2">
                                <v-radio label="매우 이해하기 쉬웠음" value="10"></v-radio>
                                <v-radio label="이해하기 쉬웠음" value="8"></v-radio>
                                <v-radio label="보통" value="6"></v-radio>
                                <v-radio label="이해하기 어려웠음" value="4"></v-radio>
                                <v-radio label="매우 이해하기 어려웠음" value="2"></v-radio>
                            </v-radio-group>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="12">
                            <!-- <h3>3. 질문</h3> -->
                            <h3>수업의 난이도는 어땠습니까?</h3>
                            <v-radio-group v-model="answers.question3">
                                <v-radio label="매우 쉬웠음" value="10"></v-radio>
                                <v-radio label="쉬웠음" value="8"></v-radio>
                                <v-radio label="보통" value="6"></v-radio>
                                <v-radio label="어려웠음" value="4"></v-radio>
                                <v-radio label="매우 어려웠음" value="2"></v-radio>
                            </v-radio-group>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="12">
                            <!-- <h3>4. 질문</h3> -->
                            <h3>정해진 시간에 수업이 시작되었습니까?</h3>
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
                            <!-- <h3>5. 질문</h3> -->
                            <h3>대화를 하는데 있어 불쾌함을 느낀적은 없습니까?</h3>
                            <v-radio-group v-model="answers.question5">
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
                question5: '',
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
            totalScore += parseInt(this.answers.question5);

            // 총 점수
            console.log('총 점수' + totalScore);
            
            axios.put("http://localhost:8080/runup/running/finishlearning", {
                    userNum : store.getters.getUserNum,
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