<template>
  <v-container class="ReceiveMessage-container">
    <v-row>
      <v-card
        style="width: 15%; height: 40%; margin-top: 30%, border: 2px solid #e0e0e0; background-color: #f5f5f5; border-radius: 30px;"
        elevation="0">
        <v-card-text>
          <v-btn text to="/MyPageEdit" class="Message-menubar" disabled :rounded="true" elevation="0">Menu</v-btn>

          <v-btn class="MoveToBtn" :rounded="true" text to="/messageSentbox">
            보낸 쪽지함
          </v-btn>

          <v-btn class="MoveToBtn" :rounded="true" text to="/messageTrashcan">
            쪽지 휴지통
          </v-btn>

          <v-btn class="MoveToBtn" :rounded="true" text to="/messageTrashcan">
            쪽지 휴지통
          </v-btn>

          <v-btn class="MoveToBtn" :rounded="true" text to="/messageTrashcan">
            쪽지 휴지통
          </v-btn>
        </v-card-text>
      </v-card>
      <v-card style="width: 80%; margin-left: 3%" elevation="0">
        <v-row style="margin-top: 0.5%; margin-left: 1%">
          <v-btn class="DeleteBtn elevation-0" :rounded="true" @click="trashMessage()">
            <v-icon left>mdi-delete</v-icon>
          </v-btn>
        </v-row>
        <v-data-table :headers="headers" :items="messageInboxList" :item-key="itemKey" :show-select="true"
          v-model="selectedItems" class="elevation-0" style="border: 1px solid #e0e0e0" @click:row="showEvent">
          <!-- eslint-disable-next-line vue/valid-v-slot -->
          <template v-slot:item.actions="{ item }">
            <!-- 작성 -->
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <!-- 삭제 -->
            <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
          </template>
        </v-data-table>

        <v-dialog v-model="dialog" class="Message-dialog">
          <v-card>
            <v-card-title>
              <span class="text-h5">메세지 작성</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row class="sendMessage-row">
                  <v-col cols="12" md="3">
                    <v-card-title class="messageTitle">제목:</v-card-title>
                  </v-col>
                  <v-col cols="12" md="9">
                    <v-text-field label="제목을 작성해주세요." class="sendMessage-input" outlined
                      v-model="messageTitle"></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="sendMessage-row">
                  <v-col cols="12" md="3">
                    <v-card-title class="messageReceiver">받는이:</v-card-title>
                  </v-col>
                  <v-col cols="12" md="9">
                    <v-text-field disabled :label="editedItem.messageSender" outlined></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="sendMessage-row">
                  <v-col cols="12" md="3">
                    <v-card-title class="messageContent">내용:</v-card-title>
                  </v-col>
                  <v-col cols="12" md="9">
                    <v-textarea label="보내실 메세지를 적어주세요." outlined rows="5" v-model="messageContent"></v-textarea>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions class="btn-message-group">
              <v-btn color="blue darken-1" text @click="save()">
                보내기
              </v-btn>
              <v-btn color="blue darken-1" text @click="close"> 취소 </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h8 text-center">선택한 메세지가 휴지통으로 이동합니다.</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">확인</v-btn>
              <v-btn color="blue darken-1" text @click="closeDelete">취소</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-menu v-model="selectedOpen" :close-on-content-click="false" offset-y>
          <v-card class="mx-auto" width="300">
            <v-btn color="blue darken-1" text @click="deleteItemConfirm">확인</v-btn>
            <!-- <v-img class="categoryImage" :src="categoryImg"></v-img> -->

            <!-- <v-card-title class="Schedule-Info">
                        제목: {{ runningTitle }}
                    </v-card-title> -->

            <v-divider class="linepart mx-4"></v-divider>

            <!-- <v-card-text>
                        <v-row class="Schedule-Info1">
                            특기: {{ RunningBcategory }}
                        </v-row>
                        <v-row class="Schedule-Info1">
                            Runner: {{ userNickname }}
                        </v-row>
                        <v-row class="Schedule-Info1">
                            수업시작: {{ runningStartTime }}
                        </v-row>
                        <v-row class="Schedule-Info1">
                            수업종료: {{ runningEndTime }}
                        </v-row>
                        <v-row class="Schedule-Info1">
                            수업내용: {{ runningContent }}
                        </v-row>
                    </v-card-text> -->

            <v-card-actions>
              <!-- <v-btn class="ParticipateBtn" :rounded="true" @click="joinClass">수업신청 </v-btn> -->
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

export default {
  data() {
    return {
      headers: [
        {
          text: "번호",
          align: "center",
          sortable: false,
          value: "messageNum",
        },
        { text: "보낸 사람", align: "center", value: "messageSender" },
        { text: "제목", align: "left", value: "messageTitle" },
        { text: "보낸 날짜", align: "center", value: "messageDate" },
        { text: "", align: "center", value: "checkbox" },
        { text: "답장 / 휴지통", value: "actions", sortable: false },
      ],
      messageInboxList: [],
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
      messageTitle: ""
    };
  },
  created() {
    var serverIP = "127.0.0.1",
      serverPort = 8080,
      pageUrl = "runup/message/inbox";
    this.$axios({
      url: `http://${serverIP}:${serverPort}/${pageUrl}`,
      method: "GET",
      params: {
        receiverNum: store.getters.getUserNum,
      },
    })
      .then((data) => {
        console.log(data.data);
        const messageInboxList = data.data;
        for (let i = 0; i < messageInboxList.length; i++) {
          this.messageNum = messageInboxList[i].messageNum;
        }
        messageInboxList.sort(
          (a, b) => new Date(b.messageDate) - new Date(a.messageDate)
        );

        this.messageInboxList = messageInboxList;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  computed: {
    userNickname() {
      return this.$store.getters.getUserNickname;
    },
  },
  methods: {
    showEvent(row) {
      // nativeEvent : DOM 이벤트 객체를 나타내는 java script객체
      const target = row;
      this.selectedElement = target;
      console.log(target);
      this.selectedOpen = true;
      // this.runningNum = target.runningNum;
      // this.runningTitle = target.runningTitle;
      // this.RunningBcategory = target.runningCategoryBig;
      // this.RunningMcategory = target.runningCategoryMedium;
      // this.userLuxColor = target.userLuxColor;
      // this.userNickname = target.userNickname;
      // this.runningContent = target.runningContent;
      // this.runningStartTime = target.runningStartSmall;
      // this.runningEndTime = target.runningEndSmall;
    },
    editItem(item) {
      this.editedItem = { ...item };
      this.editedIndex = this.messageInboxList.indexOf(item);
      this.formTitle = "Edit Item";
      this.dialog = true;
    },
    save() {
      console.log(store.getters.getuserNickname);
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
          messageTrash: 1
        },
      })
        .then((data) => {
          console.log(data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteItem(item) {
      this.editedItem = { ...item };
      this.editedIndex = this.messageInboxList.indexOf(item);
      this.dialogDelete = true;
    },
    close() {
      this.dialog = false;
      this.resetForm();
    },
    closeDelete() {
      this.dialogDelete = false;
      this.resetForm();
    },
    deleteItemConfirm() {
      this.messageInboxList.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    resetForm() {
      this.editedItem = null;
      this.editedIndex = -1;
      this.formTitle = "";
    },
    trashMessage() {
      const selectedMessageNums = this.selectedItems.map(
        (item) => item.messageNum
      );

      console.log(selectedMessageNums);
      console.log(this.messageNum);
      var serverIP = "127.0.0.1",
        serverPort = 8080,
        pageUrl = "runup/message/trash";
      selectedMessageNums.forEach((messageNum) => {
        this.$axios({
          url: `http://${serverIP}:${serverPort}/${pageUrl}`,
          method: "POST",
          data: {
            messageNum: messageNum,
          },
        })
          .then((data) => {
            console.log(data.data);
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
.ReceiveMessage-container {
  margin-top: 3%;
}

/* .PageBtn-message {
  display: flex;
  justify-content:flex-start;
} */
/* .Message-left {
    width: 10%;
} */
/* .SentboxBtn {
    color: black !important;
    background-color: rgba(244, 209, 155, 1) !important;
    justify-content: flex-end;
    margin-top: 2%;
    margin-bottom: 2%;
    margin-left: 30%;
} */
.Message-menubar {
  margin-top: 10%;
  background-color: #d7e9f7;
  /* margin-bottom: 7%; */
  margin-left: 13%;
  width: 70%;
}

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

/* .TrashcanBtn {
    color: black !important;
    background-color: rgba(244, 209, 155, 1) !important;
    justify-content: flex-end;
    margin-top: 2%;
    margin-bottom: 2%;
    margin-left: 30%;
} */

.DeleteBtn {
  color: black !important;
  background-color: rgba(255, 107, 107, 1) !important;
  justify-content: flex-end;
  margin-top: 5%;
  margin-bottom: 3%;
  margin-left: 100%;
}

.v-dialog {
  width: 70%;
  /* height: 70%; */
}

.sendMessage-text {
  display: inline-block;
}

.btn-message-group {
  display: inline-block;
  margin-left: 80%;
}
</style>