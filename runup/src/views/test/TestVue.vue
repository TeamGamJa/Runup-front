<template>
	<div>
	<h1>Ask ChatGPT</h1>
		<div>
<<<<<<< Updated upstream
			<label for="question">Your question:</label>
			<input id="question" v-model="question" type="text" />
			<button @click="askChatGPT">Ask</button>
			<button @click="getMessage">데이터가져오기</button>
=======
		<label for="question">Your question:</label>
		<input id="question" v-model="question" type="text" />
		<button @click="askChatGPT">Ask</button>
		<button @click="getMessage">데이터가져오기</button>
		</div>
		<div v-if="answerLines.length > 0">
		<h2>Answer:</h2>
		<ul>
			<li v-for="(line, index) in answerLines" :key="index">{{ line }}</li>
		</ul>
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
<<<<<<< Updated upstream
	question: '',
	questionLine: [],
	questionRequest: null,
=======
	question: '다음의 대화를 300자 내외로 한글로 오약해주세요',
	questionLine:  [],
	questionRequest: [],
>>>>>>> Stashed changes
=======
	question: '다음의 대화를 300자 내외로 한글로 오약해주세요',
	questionLine:  [],
	questionRequest: [],
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
<<<<<<< Updated upstream
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
		const prompt = "두사람의 대화내용을 한글로 간략하게 대화의 흐름을 요약해주세요\n" + question;
=======
=======
>>>>>>> Stashed changes
      axios
        .get(tmp._baseUrl + "chat", {
          params: {
            chatRoomId: 'test0' 
          },
        })
        .then((result) => {
			this.questionLine = (this.question + (result.data.content)).split('\n');
			console.log(this.questionLine)
			let i = 0;
			while(this.questionLine[i].length < 400) {
				this.questionLine[i] = this.question
			}
        })
        .catch((error) => {
          console.log("오류발생");
          console.log(error);
        });
	},
	async askChatGPT() {
		const apiKey = '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';
		// 'your_openai_api_key';
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes

		function getTokenCount(text) {
			return encodeURIComponent(text).split(/(%[A-Fa-f0-9]{2})|./).length / 2;
		}

<<<<<<< Updated upstream
<<<<<<< Updated upstream
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
=======
		const headers = {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${apiKey}`,
		};

		const requestData = {
			prompt: this.question,
			max_tokens: 4000,
			n: 1,
			stop: null,
			temperature: 0.7
		};

		if (this.USE_MODEL) {
			requestData.model = "text-davinci-002";
>>>>>>> Stashed changes
=======
		const headers = {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${apiKey}`,
		};

		const requestData = {
			prompt: this.question,
			max_tokens: 4000,
			n: 1,
			stop: null,
			temperature: 0.7
		};

		if (this.USE_MODEL) {
			requestData.model = "text-davinci-002";
>>>>>>> Stashed changes
		} else {
			requestData.engine = "davinci-codex";
		}

		try {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
			console.log(question);
			const response = await axios.post(this.url, requestData, { headers });
			this.answerLine += response.data.choices[0].text;
=======
			const response = await axios.post(this.url, requestData, { headers });
			this.answerLines = response.data.choices[0].text.trim().split('\n');
>>>>>>> Stashed changes
=======
			const response = await axios.post(this.url, requestData, { headers });
			this.answerLines = response.data.choices[0].text.trim().split('\n');
>>>>>>> Stashed changes
			console.log(response.data.choices[0].text)
		} catch (error) {
			console.error('Error while calling OpenAI API:', error.response.data);
		}
	},

}
};
</script>