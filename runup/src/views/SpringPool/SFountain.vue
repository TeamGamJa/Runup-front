<template>
    <v-container class="Fountain-container">
        <!-- 내가 받은 수업 리스트 불러오기
        <v-text-field v-model="newFountain" label="글 작성" @keyup.enter="addFountain"></v-text-field>
        <v-data-table :headers="headers" :items="fountainData" class="elevation-1" :items-per-page="9"
            @click:row="clickEvent">
            <template v-slot="{ item }">
    <td>{{ formattedFountainPoints[item.fountainNum - 1] }}</td>
  </template>
        </v-data-table> -->
        <v-card>
            <v-text-field v-model="newFountain" label="글 작성" @keyup.enter="addFountain"></v-text-field>
            <div v-for="(fountainData, index) in fountainData" :key="index" class="Data"></div>
            <div class="chat-item">
      <strong>{{ fountainNum }}:</strong> {{ fountainContent }}
    </div>
        </v-card>
        

    </v-container>
</template>

<script>
import store from '@/store/store';
import axios from 'axios'

// import axios from 'axios';

export default {
    name: 'SFountain',
    data() {
        return {
            benched: 1,
            headers: [
                {
                    text: '번호',
                    align: 'center',
                    sortable: false,
                    value: 'fountainNum',
                },
                { text: '내용', align: 'center', value: 'fountainContent' },
                { text: 'Writer', align: 'center', value: 'fountainWriter' },
                { text: '포인트', align: 'center', value: 'fountainPoint' },
                { text: '작성 날짜', align: 'center', value: 'fountainDate' },
            ],
            
            fountainData: [], // 변경된 변수 이름
           

            dialog: false,
            selectedElement: false,
            selectedOpen: false,
            fountainContent: '',
            fountainNum:'',
            fountainWriter: '',
            fountainDate: '',
            newFountain: ''
        }
    },
    computed: {
      items () {
        return Array.from({ length: this.length }, (k, v) => v + 1)
      },
      length () {
        return 1
      },
     
  formattedFountainPoints() {
    return this.fountainData.map(item => `${item.fountainPoint}/50`);
  }

    },
    mounted() {
        //this.fountainList()
        this.fetchFountainList(); // 수정된 메서드 이름
    },
    methods: {
        addFountain() {
            //let cmd = this;
            axios.post('http://127.0.0.1:8080/runup/fountain/', 
            { fountainContent : this.newFountain,
              fountainWriter : store.getters.getUserNickname,
              userNum: store.getters.getUserNum
             })
        .then(response => {
      
      console.log(response.data)
      this.fetchFountainList()
      this.newFountain = ''; // 입력 필드 초기화
     })
        .catch(error => {
      // 글 작성에 실패한 경우
         console.error(error);
      // 실패에 대한 적절한 처리를 수행합니다.
     });
        },
        fetchFountainList() {
            console.log(11);
            let tmp = this;
            axios.get(tmp._baseUrl + "fountain/all", {
                    params: {
                        participateNum: store.getters.getUserNum,
                    }
                })
                .then((response) => {
                    console.log(response.data);
                    tmp.fountainData = response.data;
                })
        }
    },
}
</script>

<style>
.Fountain-container {
    margin-top: 5%;
}

</style>