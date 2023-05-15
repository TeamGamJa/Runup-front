<template>
	<div>
	<h1>Ask ChatGPT</h1>
		<div>
			<label for="question">Your question:</label>
			<input id="question" v-model="question" type="text" />
			<button @click="askChatGPT">Ask</button>
			<button @click="getMessage">데이터가져오기</button>
		</div>
			<h2>Answer:</h2>
			<p>{{ answerLine }}</p>
	</div>
</template>
  
<script>
import axios from 'axios';

export default {
data() {
	return {
	question: '',
	questionLine: [],
	questionRequest: null,
	answer: '',
	USE_MODEL : true, // true: use 'model', false: use 'engine'
	url : 'https://api.openai.com/v1/completions',
	answerLine : '',
	};
},
// created() {
// 	this.questionRequest = []; // 이 부분을 추가하세요.
// },
methods: {
	getMessage() {
		let tmp = this;
		axios.get(tmp._baseUrl + "chat", {
			params: {
			chatRoomId: 'test0' 
			},
		})
		.then((result) => {
			this.questionLine = (result.data.content).split('\n');
			tmp.questionRequest = new Array(tmp.questionLine.length).fill('');
			// console.log(tmp.questionRequest);
			let i = 0;
			
			for (let j = 0; j < tmp.questionLine.length; j++) {
				
				tmp.questionRequest[i] += tmp.questionLine[j];
				if (tmp.questionRequest[i].length > 250) {
					console.log(tmp.questionRequest[i].length);
					this.askChatGPT(tmp.questionRequest[i]);
					i++;
				}
			}
			// console.log(tmp.questionRequest[0]);
			// this.askChatGPT(tmp.questionRequest[0]);
		})
		.catch((error) => {
			console.log("오류발생");
			console.log(error);
		});
	},
	async askChatGPT(question) {
		const apiKey = '';
		// const model = 'text-davinci-002';
		const maxTokens = 4097; // 이 모델의 최대 컨텍스트 길이
		const prompt = "대화흐름을 대화주제에 대한 정보정달위주로 한글로 100자 내외로 요약해주세요. 화자는 구분하지않아도 됩니다\n" + question;

		function getTokenCount(text) {
			return encodeURIComponent(text).split(/(%[A-Fa-f0-9]{2})|./).length / 2;
		}

		const promptTokenCount = getTokenCount(prompt);

		const completionTokenCount = Math.floor(maxTokens - promptTokenCount);

		const headers = {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${apiKey}`,
		};

		const requestData = {
			prompt,
			max_tokens: completionTokenCount,
			n: 1,
			stop: null,
			temperature: 0.7
		};

		if (this.USE_MODEL) {
			requestData.model = "text-davinci-003";
		} else {
			requestData.engine = "davinci-codex";
		}

		try {
			console.log(question);
			const response = await axios.post(this.url, requestData, { headers });
			this.answerLine += response.data.choices[0].text;
			console.log(response.data.choices[0].text)
		} catch (error) {
			console.error('Error while calling OpenAI API:', error.response.data);
		}
	},

}
};
</script>
