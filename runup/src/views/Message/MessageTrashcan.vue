<template>
  <v-container class="ReceiveMessage-container">
    <v-row>
      <!-- 좌측 메뉴바 -->
      <v-card style="width: 15%; height: 40%; margin-top: 10%; background-color: #f5f5f5; border-radius: 30px;"
        elevation="0">
        <v-card-text>
          <v-btn text to="/fdsfas" class="Message-sidemenubar" disabled :rounded="true" elevation="0">Menu</v-btn>

          <v-btn class="MoveToBtn" :rounded="true" text to="/messageInbox">
            받은 쪽지함
          </v-btn>
          <v-btn class="MoveToBtn" :rounded="true" text to="/messageSentbox">
            보낸 쪽지함
          </v-btn>

          <v-btn class="MoveToBtn" :rounded="true" text to="/messageTrashcan">
            쪽지 휴지통
          </v-btn>

          <v-btn class="MoveToBtn" :rounded="true" text to="/MyPage">
            마이페이지
          </v-btn>

        </v-card-text>
      </v-card>

      <!-- 우측 쪽지함 -->
      <v-card style="width: 80%; margin-left: 3%" elevation="0">
        <v-row style="margin-top: 0.5%;">
          <v-btn class="DeleteBtn elevation-0" :rounded="true" @click="seldelMessage()">
            <v-icon size="26">mdi-delete</v-icon>
          </v-btn>
          <v-img src="https://ifh.cc/g/HlCQmz.png" max-width="200" max-height="40"
            style="margin-left: 70%; margin-top:4% ;"></v-img>
        </v-row>
        <v-data-table :headers="headers" :items="messageTrashcanList" :item-key="itemKey" :show-select="true"
          v-model="selectedItems" class="elevation-0" @click:row="showEvent">
          <!-- eslint-disable-next-line vue/valid-v-slot -->
          <template v-slot:item.actions="{ item }">
            <!-- 작성 -->
            <!-- 삭제 -->
            <v-icon size="22" @click.stop="deleteItem(item)"> mdi-delete </v-icon>
          </template>
        </v-data-table>

        <!-- row 안의 휴지통 아이콘 클릭 시 다이얼로그 작동  -->
        <v-dialog v-model="dialogDelete" width="800">
          <v-card>
            <v-img src="https://ifh.cc/g/tGJJDd.png" width="700" max-height="400"
              style="margin-bottom: 2%; margin-left: 5%; margin-right: 5%;"></v-img>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="deletemessage">확인</v-btn>
              <v-btn color="blue darken-1" text @click="dialogDelete = false">취소</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- 메세지 상세보기 (row 클릭시 이벤트 동작해서 내용 다이얼로그로 뜸) -->
        <v-menu v-model="selectedOpen" :close-on-content-click="false" offset-y>
          <v-card width="800">
            <v-card-title>
              <v-img src="https://ifh.cc/g/XyTLjf.png" max-width="150" max-height="50" style="margin-top: 3%; "></v-img>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row class="receiveMessage-row">
                  <v-col cols="2">
                    <v-img src="https://ifh.cc/g/nQPWmh.png" max-width="60" max-height="50"
                      style="margin-top: 5%;"></v-img>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field class="receiveMessageTitle" disabled v-model="receiveMessageTitle"></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="receiveMessage-row">
                  <v-col cols="2">
                    <v-img src="https://ifh.cc/g/DXPckA.png" max-width="80" max-height="50"
                      style="margin-top: 5%; "></v-img>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field disabled v-model="receiveMessageSender"></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="receiveMessage-row">
                  <v-col cols="2">
                    <v-img src="https://ifh.cc/g/Kx7lFD.png" max-width="60" max-height="50"
                      style="margin-top: 3%; margin-left: 3%;"></v-img>
                  </v-col>
                  <v-col cols="8">
                    <v-textarea rows="3" disabled v-model="receiveMessageContent" :outlined="true"></v-textarea>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>


            <v-card-actions class="btn-message-group">
              <v-btn color="blue darken-1" text @click="selectedOpen = false"> 확인 </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-card>
    </v-row>
  </v-container>
</template>
  
<script>
// import axios from 'axios';
import store from "@/store/store";
import moment from 'moment';
import axios from 'axios'

export default {
  data() {
    return {
      headers: [

        { text: "보낸 사람", align: "center", value: "messageSender" },
        { text: "제목", align: "left", value: "messageTitle" },
        { text: "보낸 날짜", align: "center", value: "messageDate" },
        { text: "", align: "center", value: "checkbox" },
        { text: "휴지통", value: "actions", sortable: false },
      ],
      MessageNum: [],
      messageTrashcanList: [],
      itemKey: "messageNum",
      selectedItems: [],
      // messageNum:'',
      dialog: false,
      dialogDelete: false,
      editedItem: {},
      editedIndex: -1,
      formTitle: "",
      selectedOpen: false,
      messageContent: "",
      messageTitle: "",
      messageSender: "",
      messageNum: '',

      // 상세페이지용
      receiveMessageTitle: '',
      receiveMessageSender: '',
      receiveMessageContent: '',
    };
  },
  created() {
    this.trashList()
  },
  computed: {
    userNickname() {
      return this.$store.getters.getUserNickname;
    },
  },
  methods: {
    trashList() {
      axios
        .get(this._baseUrl + 'message/trashcan', {
          params: {
            userNum: store.getters.getUserNum,
          },
        })
        .then((data) => {
          console.log(data.data);
          const messageTrashcanList = data.data;
          this.MessageNum = []; // 게시글 번호를 저장할 배열 초기화
          let num = messageTrashcanList.length;

          messageTrashcanList.forEach((item, index) => {
            item.MessageNum = num - index; // 역순으로 게시글 번호 할당
            this.MessageNum.push(item.MessageNum); // MessageNum 배열에 번호 추가
          });

          // 게시글 번호를 기준으로 역순으로 정렬
          messageTrashcanList.sort((a, b) => a.MessageNum - b.MessageNum);

          for (let i = 0; i < messageTrashcanList.length; i++) {
            this.messageNum = messageTrashcanList[i].messageNum;
            messageTrashcanList[i].messageDate = moment(messageTrashcanList[i].messageDate).format('YYYY-MM-DD');
          }

          this.messageTrashcanList = messageTrashcanList;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    showEvent(row) {
      // nativeEvent : DOM 이벤트 객체를 나타내는 java script객체
      const target = row;
      this.selectedElement = target;
      console.log(target);
      this.selectedOpen = true;
      this.receiveMessageTitle = target.messageTitle;
      this.receiveMessageSender = target.messageSender;
      this.receiveMessageContent = target.messageContent;
    },
    editItem(item) {
      this.editedItem = { ...item };
      this.editedIndex = this.messageInboxList.indexOf(item);
      this.formTitle = "Edit Item";
      this.dialog = true;
    },
    save() {
      console.log(store.getters.getUserNickname);
      var serverIP = "127.0.0.1",
        serverPort = 8080,
        pageUrl = "runup/message";

      this.$axios({
        url: `http://${serverIP}:${serverPort}/${pageUrl}`,
        method: "POST",
        data: {
          messageNum: 1,
          messageSender: this.editedItem.messageReceiver,
          senderNum: store.getters.getUserNum,
          messageReceiver: this.editedItem.messageSender,
          receiverNum: this.editedItem.senderNum,
          messageOpenStatus: 1,
          messageTitle: this.messageTitle,
          messageContent: this.messageContent,
          messageDate: 1,
          messageTrash: 1,
        },
      })
        .then((data) => {
          console.log(data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteItem() {
      this.dialogDelete = true;
    },

    closeDelete() {
      this.dialogDelete = false;
      this.resetForm();
    },
    // 메세지 삭제
    deletemessage() {
      console.log(this.messageNum);
      let tmp = this;
      axios.delete(tmp._baseUrl + 'message', {
        data: { messageNum: this.messageNum, }
      })
        .then((res) => {
          console.log(res.data);
          this.closeDelete()
          this.trashList()
        })
        .catch((error) => {
          console.log(error);
        });
      this.closeDelete();

    },

    resetForm() {
      // this.messageSender = '';
      this.editedItem = null;
      this.editedIndex = -1;
      this.formTitle = "";
    },

    // 휴지통으로 이동
    seldelMessage() {
      const selectedMessageNums = this.selectedItems.map(
        (item) => item.messageNum
      );

      console.log(selectedMessageNums);
      console.log(this.messageNum);
      let tmp = this;

      selectedMessageNums.forEach((messageNum) => {
        axios.delete(tmp._baseUrl + 'message', {
          data: { messageNum: messageNum, }
        })
          .then((res) => {
            console.log(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },
  },
};
</script>
  
<style>
/* .ReceiveMessage-container {
  margin-top: 3%;
} */

.MoveToBtn {
  margin-top: 5%;
  margin-left: 8%;
  margin-right: 5%;
  margin-bottom: 5%;
  width: 90%;
  background-color: rgba(244, 209, 155, 1) !important;
}

.TrashBtn {
  margin-top: 5%;
  margin-left: 8%;
  margin-right: 5%;
  margin-bottom: 5%;
  width: 80%;
  background-color: rgba(244, 209, 155, 1) !important;
}

.DeleteBtn {
  color: black !important;
  background-color: rgba(255, 107, 107, 1) !important;
  justify-content: flex-end;
  margin-top: 5%;
  margin-bottom: 3%;
}

.v-dialog {
  width: 70%;
}

.sendMessage-text {
  display: inline-block;
}

.btn-message-group {
  display: inline-block;
  margin-left: 80%;
}
</style>