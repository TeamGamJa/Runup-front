<template>
	<v-container class="Chat-container pa-1">
		<div class="timer">
			<v-img src="https://ifh.cc/g/G5j3Lw.png" max-width="100" max-height="50"></v-img>
		</div>
		<div style="margin-left: 2%;">
			{{ timeRemaining }}
		</div>
		<v-btn class="MovePage" :rounded="true" @click="PageMove()">채팅종료</v-btn>
		<div class="messages-container">
			<div v-for="(message, index) in messages" :key="index" class="message" :class="{
				'my-message': message.sender == getUserNickname,
				'other-message': message.sender != getUserNickname}">
				<strong>{{ message.sender }}: </strong> {{ message.content }}
			</div>
		</div>

		<div class="message-input-container">
			<input class="text-input" v-model="messageContent" type="text" @keyup.enter.prevent="sendMessage"
				placeholder="메시지를 입력하세요" />
			<v-btn class="sendBtn" @click="sendMessage" :rounded="true">전송</v-btn>
		</div>
		

	</v-container>
</template>

<script>
import { Client } from '@stomp/stompjs'
import SockJS from 'sockjs-client'
import axios from 'axios'
import store from '@/store/store'

export default {
	data() {
		return {
			stompClient: null,
			roomId: store.getters.getChatRoomId, // 채팅방 ID
			messageContent: '',
			messages: [],
			title: store.getters.getChatRoomTitle,
			userNickname:'',
			time: 60 * 60 // 초 단위로 1시간 설정

		}
	},
	computed: {
		getUserNickname() {
			return (this.$store.getters.getUserNickname); // 사용자 닉네임을 반환하는 코드를 여기에 작성합니다.
		},
		timeRemaining() {
			const minutes = Math.floor(this.time / 60);
			const seconds = this.time % 60;
			return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
		}
	},
	created() {
		this.connect()
		this.startTimer();
	},
	beforeDestroy() {
		this.disconnect()
		this.stopTimer();
	},
	methods: {
		connect() {
			axios.get("http://localhost:8080/runup/" + "chat", {
				params: {
					chatRoomId: this.roomId,
				}
			})
				.then(result => {
					console.log(result.data)
					if (result.data.roomId == null) {
						axios.post(this._baseUrl + "chat", {
							roomId: this.roomId,
							title: this.title
						}).then(result => {
							console.log(result.data);
						}).catch(function (e) {
							console.log(e);
						});
					}
				}).catch(function (e) {
					console.log(e);
				});
			console.log("test1");
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
		PageMove() {
			console.log(this.userNickname)
			if (this.time > 30*60) {
				alert("멘토링이 30분이전에 종료되어 평가페이지로 넘어가지 않습니다")
				// this.$router.push('/')
			}
			var mentorNum = this.roomId.substr(0,1) // 멘토넘 뽑기
			if(store.getters.getUserNum == mentorNum) {
				alert("멘토링을 종료합니다 Learner평가를 마친후 포인트가 지급됩니다.")
				this.$router.push('/EvaluatePageRunner')
			}else {
				alert("멘토링을 종료합니다 Runner에대한 평가를 해주세요.")
				store.dispatch("setVuesParticipateNum", mentorNum);
				this.$router.push('/EvaluatePageLearner');
			}
			// 화면이 평가페이지로 전환되어야 한다. (참여자인 경우)
			// 화면이 메인페이지로 이동 ( 멘토 )

		},
		startTimer() {
			this.timer = setInterval(() => {
				if (this.time > 0) {
			this.time--;
				} else {
			this.stopTimer();
			this.disconnect(); // 시간이 다 되면 웹소켓 연결을 종료합니다.
			}
        }, 1000);
		},
		stopTimer() {
			clearInterval(this.timer);
		},

	},
}
</script>

<style scoped>
.Chat-container {
	display: flex;
	flex-direction: column;
	justify-content: center;
	/* align-items: flex-end; */
	height: 90%;
	border: 2px solid rgba(244, 209, 155, 1);
	border-radius: 5.5px;
	background-color: ivory;
	margin-top: 2%;
}

.messages-container {
	/* display: flex; */
	display: inline-block;
	flex-direction: row;
	width: 90%;
	max-height: 80%;
	/* justify-content: center; */
	flex: 1;
	overflow-y: auto;
	margin-top: 3%;
	margin-left: 5%;
	margin-right: 3%;
	/* margin-top: 30px; */
}

.message-input-container {
	/* margin-top: 10px; */
	background-color: white;
	display: inline-flex;
	border: 2px solid rgba(244, 209, 155, 1);
	height: 8%;
	width: 50%;
	margin-left: 25%;

}

.message {
	padding: 5px;
	margin-bottom: 10px;
	background-color: #f0f0f0;
	border-radius: 5px;
}

/* .message--own {
	background-color: #a0d3ff;
	margin-left: 30px;
} */


/* button:hover {
	background-color: #0056b3;
} */

.message {
	display: flex;
	flex-direction: column;
	width: auto;
	max-width: 45%;
	margin-bottom: 10px;
	word-wrap: break-word;
}

/* 내가 채팅한 문자 */
.message.my-message {
	margin-left: auto;
	text-align: right;
	background-color: rgba(251, 231, 200, 1);
	
}

/* 상대방이 채팅한 문자 */
.message.other-message {
	margin-right: auto;
	text-align: left;
	background-color: rgba(237, 247, 255, 1);
	
}


.text-input {
	width: 500px;
	/* height: 30px; */
	margin-left: 100px;
	background-color: white;
	/* margin-top: 30px; */
}


.sendBtn {
	margin-left: 2%;
	margin-top: 1.3%;
	color: black !important;
	background-color: rgba(244, 209, 155, 1) !important;
	justify-content: flex-end;
	border-radius: 200px;

	/* .chat {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
	} */

	/* .chat-container {
		width: 600px;
		border: 1px solid #ccc;
		padding: 20px;
		display: flex;
		flex-direction: column;
	} */
	/* .sender {
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
	} */
}
.MovePage {
	margin-left: 90%;
	width: 10%;	
	background-color: rgba(237, 247, 255, 1) !important;
	
}
</style>