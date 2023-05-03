<template>
	<div>
		<div class="messages-container">
		<div
			v-for="(message, index) in messages"
			:key="index"
			class="message"
			:class="{
			'my-message': message.sender == getUserNickname,
			'other-message': message.sender != getUserNickname
			}"
		>
			<strong>{{ message.sender }}: </strong> {{ message.content }}
		</div>
		</div>

		<div class="message-input-container">
		<input
			v-model="messageContent"
			type="text"
			@keyup.enter.prevent="sendMessage"
			placeholder="메시지를 입력하세요..."
		/>
		<button @click="sendMessage">전송</button>
		</div>
	</div>
	</template>

<script>
import { Client } from '@stomp/stompjs'
import SockJS from 'sockjs-client'
import axios from 'axios'
// import store from '@/store/store'

export default {
  data() {
    return {
		stompClient: null,
		roomId: "this7", // 채팅방 ID
		messageContent: '',
		messages: [],
		title: '자바기초강의'
    }
  },
  computed: {
    getUserNickname() {
      return (this.$store.getters.getUserNickname); // 사용자 닉네임을 반환하는 코드를 여기에 작성합니다.
    },
  },
  created() {
    this.connect()
  },
  beforeDestroy() {
    this.disconnect()
  },
  methods: {
    connect() {
		axios.get("http://localhost:8080/runup/" + "chat", {
			params : {
				chatRoomId : this.roomId,
			}
		})
		.then(result=> {
			console.log(result.data)
			if (result.data.roomId == null ) {
				axios.post(this._baseUrl + "chat", {
					roomId : this.roomId,
					title : this.title
				}).then(result => {
					console.log(result.data);
				}).catch(function (e) {
					console.log(e);
				});
			}
		}).catch(function (e) {
			console.log(e);
		});
		const socket = new SockJS('http://localhost:8080/runup/websocket-chat')
			this.stompClient = new Client({
			webSocketFactory: () => socket,
			debug: (str) => {
				console.log(str)
		},
		onConnect: (frame) => {
			console.log("Connected to server:", frame)
			this.stompClient.subscribe(`/topic/${this.roomId}`, (message) => {
				this.messages.push(JSON.parse(message.body));
			});
		},
		onStompError: (error) => {
			console.log("Stomp error:", error)
		}
		})
		this.stompClient.activate()
		},
    disconnect() {
      if (this.stompClient) {
		
        this.stompClient.deactivate()
      }
    },
    sendMessage() {
		if (this.messageContent.trim() === "") {
			return; // 빈 메시지는 보내지 않습니다.
		}
		if (this.stompClient.connected) {
			this.stompClient.publish({
			destination: `/app/chat/${this.roomId}/sendMessage`,
			body: JSON.stringify({
				content: this.messageContent,
				sender: this.$store.getters.getUserNickname,
				roomId: this.roomId,
			}),
			})
			this.messageContent = ''
		}
    },
  },
}
</script>
  
  <style scoped>
  .chat {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
  }
  
  .chat-container {
	width: 600px;
	border: 1px solid #ccc;
	padding: 20px;
	display: flex;
	flex-direction: column;
  }
  
  .messages-container {
	flex: 1;
	overflow-y: auto;
	padding: 10px;
  }
  
  .message {
	padding: 5px;
	margin-bottom: 10px;
	background-color: #f0f0f0;
	border-radius: 5px;
  }
  
  .message--own {
	background-color: #a0d3ff;
	margin-left: 30px;
  }
  
  .sender {
	font-weight: bold;
  }
  
  .input-container {
	display: flex;
	margin-top: 20px;
  }
  
  input {
	flex: 1;
	padding: 5px;
	border: 1px solid #ccc;
	border-radius: 5px;
  }
  
  button {
	background-color: #007bff;
	color: white;
	border: none;
	padding: 5px 10px;
	margin-left: 10px;
	cursor: pointer;
	border-radius: 5px;
  }
  
  button:hover {
	background-color: #0056b3;
  }
  .messages-container {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .message {
    display: flex;
    flex-direction: column;
    max-width: 50%;
    margin-bottom: 10px;
    word-wrap: break-word;
  }

  .message.my-message {
    margin-left: auto;
    text-align: right;
  }

  .message.other-message {
    margin-right: auto;
    text-align: left;
  }
</style>