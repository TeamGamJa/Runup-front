<template>
	<div>
		<h1>Ask ChatGPT</h1>
		<div>
		<label for="question">Your question:</label>
		<input id="question" v-model="question" type="text" />
		<button @click="askChatGPT">Ask</button>
		</div>
		<div v-if="answerLines.length > 0">
		<h2>Answer:</h2>
		<ul>
			<li v-for="(line, index) in answerLines" :key="index">{{ line }}</li>
		</ul>
		</div>
	</div>
</template>
  
<script>
import axios from 'axios';

export default {
data() {
	return {
	question: '',
	answer: '',
	USE_MODEL : true, // true: use 'model', false: use 'engine'
	url : 'https://api.openai.com/v1/completions',
	answerLines: [],
	};
},
methods: {
	async askChatGPT() {
	const apiKey = '';
	// 'your_openai_api_key';


	const headers = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${apiKey}`,
	};

	const requestData = {
		prompt: this.question,
		max_tokens: 1000,
		n: 1,
		stop: null,
		temperature: 0.7
	};

	if (this.USE_MODEL) {
		requestData.model = "text-davinci-002";
	} else {
		requestData.engine = "davinci-codex";
	}

	try {
		const response = await axios.post(this.url, requestData, { headers });
		this.answerLines = response.data.choices[0].text.trim().split('\n');
		console.log(response.data.choices[0].text)
	} catch (error) {
		console.error('Error while calling OpenAI API:', error.response.data);
	}
},
}
};
</script>