<template>
	<div>
		<div class="messages-container">
		<div v-for="(message, index) in messages" :key="index" class="message">
			<strong>{{ message.sender }}: </strong> {{ message.content }}
		</div>
		</div>

		<div class="message-input-container">
		<input
			v-model="messageContent"
			type="text"
			@keyup.enter="sendMessage"
			placeholder="메시지를 입력하세요..."
		/>
		<button @click="sendMessage">전송</button>
		</div>
	</div>
</template>

<script>
import { Client } from '@stomp/stompjs'
import SockJS from 'sockjs-client'

export default {
  data() {
    return {
      stompClient: null,
      roomId: 'room123', // 채팅방 ID
      messageContent: '',
      messages: []
    }
  },
  created() {
    this.connect()
  },
  beforeDestroy() {
    this.disconnect()
  },
  methods: {
    connect() {
      const socket = new SockJS('http://localhost:8080/runup/websocket-chat')
      this.stompClient = new Client({
        webSocketFactory: () => socket,
		debug: (str) => {
			console.log(str)
		},
		onConnect: (frame) => {
		console.log("Connected to server:", frame)
		this.stompClient.subscribe(`/topic/${this.roomId}`, (message) => {
			// console.log("Received message:", message);
			this.messages.push(JSON.parse(message.body));
		});
		},
		onStompError: (error) => {
			console.log("Stomp error:", error)
		}
      })

    //   this.stompClient.onConnect = () => {
	// 	this.stompClient.subscribe(`/topic/${this.roomId}`, (message) => {
	// 		console.log(message)
	// 		this.messages.push(JSON.parse(message.body))
	// 	})
	// 	}

      this.stompClient.activate()
    },
    disconnect() {
      if (this.stompClient) {
        this.stompClient.deactivate()
      }
    },
    sendMessage() {
		console.log(this.messageContent);
		if (this.stompClient.connected) {
			this.stompClient.publish({
			destination: `/app/chat/${this.roomId}/sendMessage`,
			body: JSON.stringify({
				content: this.messageContent,
				sender: 'USERNAME',
			}),
			})
			console.log("test"),
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
  </style>