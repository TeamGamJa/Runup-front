<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <v-btn class="SentboxBtn" :rounded="true" text to="/messageSentbox">
          보낸 쪽지함
        </v-btn>
      </v-col>
      <v-col cols="3">
        <v-btn class="TrashcanBtn" :rounded="true" text to="/messageTrashcan">
          휴지통
        </v-btn>
      </v-col>
      <v-col cols="3">
        <v-btn class="DeleteBtn" :rounded="true" @click="trashMessage()">
          버리기
        </v-btn>
      </v-col>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="messageInboxList"
      :item-key="itemKey"
      :show-select="true"
      :selectes.sync="selectedItems"
      class="elevation-1"
    >
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <!-- v-slot 규칙 비 활성화 하는 구문 !!! ㅅㅂ 이게 찐이네-->
      <!-- <template v-slot:item.calories="{ item }">
        <v-chip :color="getColor(item.calories)" dark>
          {{ item.calories }}
        </v-chip>
      </template> -->
    </v-data-table>
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
        { text: "", align: "center", value: "checkbox" }
      ],
      messageInboxList: [],
      itemKey: "messageNum",
      selectedItems: [],
      messageNum:'',
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
        for(let i=0; i<messageInboxList.length; i++){
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

  methods: {
    trashMessage() {
      console.log(1111);
        var serverIP = '127.0.0.1',
                serverPort = 8080,
                pageUrl = 'runup/message/trash';
            this.$axios({
                url: `http://${serverIP}:${serverPort}/${pageUrl}`,
                method: "POST",
                data: {
                    messageNum:this.messageNum,
                }
            }).then((data) => {
                console.log(data.data);
            }).catch(error => {
                console.log(error)
            })
    }
  },
};
</script>

<style>
.SentboxBtn {
  margin-left: 2px;
  color: black !important;
  background-color: rgba(244, 209, 155, 1) !important;
  justify-content: flex-end;
  border-radius: 200px;
  margin-top: 8px;
}

.TrashcanBtn {
  margin-left: 2px;
  color: black !important;
  background-color: rgba(244, 209, 155, 1) !important;
  justify-content: flex-end;
  border-radius: 200px;
  margin-top: 8px;
}

.DeleteBtn {
  margin-left: 2px;
  color: black !important;
  background-color: rgba(255, 107, 107, 1) !important;
  justify-content: flex-end;
  border-radius: 200px;
  margin-top: 8px;
}
</style>