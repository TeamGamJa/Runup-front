<template>
  <v-container fluid class="CreateRunning-container pa-1">
    <v-row class="fill-height">
      <v-col>

        <!-- 상단 달력 위에 설정 툴바 -->
        <v-sheet height="64">
          <v-toolbar flat>
            <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
              오늘
            </v-btn>
            <v-spacer></v-spacer>
            <v-toolbar-title v-if="$refs.calendar">
              {{ $refs.calendar.title }}
            </v-toolbar-title>

            <!-- Runner 생성 -->
            <v-row justify="end">
              <v-dialog v-model="dialog" persistent max-width="600px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="cyan" class="mx-2" fab dark v-bind="attrs" v-on="on">
                    <v-icon dark>
                      mdi-pencil
                    </v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <v-img src="https://ifh.cc/g/hmAhPX.png" max-width="150" max-height="50"></v-img>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field label="제목" v-model="WriteTitle" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-menu ref="DateMenu" v-model="DateMenu" :close-on-content-click="false" :nudge-right="40"
                            transition="scale-transition" offset-y max-width="290px" min-width="290px">
                            <template v-slot:activator="{ on }">
                              <v-text-field label="날짜" v-model="selectDate" prepend-icon="mdi-calendar" readonly
                                v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="selectDate" no-title scrollable style="height: 420px;">
                              <v-spacer></v-spacer>
                              <v-btn text color="primary" @click="$refs.DateMenu.save(selectDate)">저장</v-btn>
                              <v-btn text color="primary" @click="DateMenu = false">취소</v-btn>
                            </v-date-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="WriteStartTime" label="시작시간" type="time" step="3600" value="08:00"
                            hint="시간단위로 설정됩니다." required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="WriteEndTime" label="종료시간" type="time" step="3600" value="08:00"
                            hint="시간단위로 설정됩니다." required></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field v-model="WriteContent" label="강의내용" hint="Learner에게 강의할 내용을 간략하게 적어주세요"
                            required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-select v-model="choice" label="특기-대분류" :items="categories"
                            @change="fetchcategoryMedium"></v-select>
                        </v-col>
                        <v-col cols="3">
                          <v-select v-model="RunningMcategory" id="Running-Mcategory" label="특기-중분류"
                            :items="categoryMedium" @change="inputSelectVal"></v-select>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="createRunning(); dialog = false">
                      저장
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="dialog = false">
                      취소
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-row>
          </v-toolbar>
        </v-sheet>

        <!-- 달력 생성  -->
        <v-sheet height="600">
          <v-calendar ref="calendar" v-model="focus" color="primary" :events="events" :event-color="getEventColor"
            :type="type" @click:event="showEvent" @change="updateRange" class="calender-css"></v-calendar>
          <!-- @click:more="viewDay" @click:date="viewDay" 일별로 날짜 보는 기능(지금은 안써서 주석) -->

          <!-- 달력안의 일정을 클릭 시 일정 상세-->
          <v-menu v-model="selectedOpen" :close-on-content-click="false" :activator="selectedElement" offset-x>
            <v-card class=" pa-0" max-width="374">

              <v-img height="250" :src="categoryImg"></v-img>

              <v-card-title class="Schedule-Info mb-0">
                <v-img src="https://ifh.cc/g/512Qw6.png" max-width="70" max-height="50"></v-img>
                {{ runningTitle }}
              </v-card-title>

              <v-divider class="mx-5"></v-divider>
              <v-card-title>
                <v-row class="Schedule-Info mb-0">
                  <v-img src="https://ifh.cc/g/JFJZ6v.png" max-width="60" max-height="50"></v-img>
                  {{ RunningBcategory }}
                </v-row>
              </v-card-title>
              <v-card-title>
                <v-row class="Schedule-Info mb-0">
                  <v-img src="https://ifh.cc/g/Qf5RwW.png" max-width="90" max-height="50"
                    style="margin-left: 2%;"></v-img>
                  {{ userNickname }}
                </v-row>
              </v-card-title>
              <v-card-title>
                <v-row class="Schedule-Info mb-0">
                  <v-img src="https://ifh.cc/g/tf3Aky.png" max-width="85" max-height="50"
                    style="margin-left: 5%;"></v-img>
                  {{ runningStartTime }}
                </v-row>
                <v-card-title>
                </v-card-title>
                <v-row class="Schedule-Info mb-0">
                  <v-img src="https://ifh.cc/g/kP35jL.png" max-width="80" max-height="50"></v-img>
                  {{ runningEndTime }}
                </v-row>
              </v-card-title>
              <v-card-title>
                <v-row class="Schedule-Info mb-0">
                  <v-img src="https://ifh.cc/g/VAF5Lq.png" max-width="100" max-height="50"></v-img>
                  {{ runningContent }}
                </v-row>
              </v-card-title>

              <v-card-actions>
                <v-btn class="ChatBtn" :rounded="true" text to="/Chat" @click="contactChat()">수업시작 </v-btn>
                <v-btn class="ChatBtn" :rounded="true" @click="CancleClass()">수업취소 </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import store from '@/store/store'
import axios from 'axios'

export default {
  data: () => ({
    focus: '',
    type: 'month',
    typeToLabel: {
      month: '월별',
      // week: 'Week',
      day: '일별',
      // '4day': '4 Days',
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
    event,
    dialog: false,

    // 새글 작성 후 초기값
    WriteTitle: '',
    WriteContent: '',
    WriteStartTime: '08:00',
    WriteEndTime: '09:00',

    categories: ['IT', '라이프스타일', '문제풀이', '기타'],
    categoryMedium: [''],
    choice: '',
    RunningBcategory: '',
    RunningMcategory: '',
    DateMenu: '',
    selectDate: '',
    runningNum: '',
    runningTitle: '',
    runningContent: '',
    runningStartTime: '08:00',
    runningEndTime: '08:00',
    runningshow: '',
    participateNum: '',

    // 도움관리 - 내가 만든 멘토
    runningBlue: [],

    // 도움관리 - 내가 만든거에 참여자 생김
    runningOrange: [],

    // 도움관리 - 내가 받을 멘토
    runningGreen: [],

    // 도움관리 - 지난 날짜: 내가 받은 멘토 
    runningGray: [],

    // 테스트용
    runningStartBig: 1,
    runningEndBig: 1,
    runningKeep: false,
    userNum: '',
    loading: false,
    chatRoomId: '',
    userNickname: '',

    // 카테고리 이미지
    categoryImg: 'https://cdn.vuetifyjs.com/images/cards/cooking.png',
  }),
  watch: {
    RunningBcategory(newVal) {
      if (newVal === 'IT') {
        this.categoryImg = 'https://ifh.cc/g/OHjgvF.png'
      } else if (newVal === '라이프스타일') {
        this.categoryImg = 'https://ifh.cc/g/0PfTRa.png'
      } else if (newVal === '문제풀이') {
        this.categoryImg = 'https://ifh.cc/g/C3lb3C.png'
      } else if (newVal === '기타') {
        this.categoryImg = 'https://ifh.cc/g/YvzaWZ.png'
      }
    }
  },
  mounted() {
    this.$refs.calendar.checkChange(),
      // 캘린더를 계속 업데이트 하는거 
      this.$nextTick(() => {
        this.$refs.calendar.update;
      });
    this.fetchGiveSchedule()
    this.fetchTakeSchedule()
    this.fetchPassDataSchedule()
    this.fetchPullJoinSchedule()
  },
  methods: {

    // 대분류에 따른 중뷴류 불러오기
    inputSelectVal(value) {
      this.RunningMcategory = value;
    },

    // 새로운 스케줄을 등록 시 카텤고리 등록
    fetchcategoryMedium() {
      // console.log(this.choice)
      var serverIP = '127.0.0.1',
        serverPort = 8080,
        pageUrl = 'runup/running/categorymedium';
      this.$axios({
        url: `http://${serverIP}:${serverPort}/${pageUrl}`,
        method: "GET",
        params: {
          categoryBig: this.choice
        }
      }).then(response => {
        console.log(response)
        const categoryMediumData = response.data.categoryMedium;
        this.categoryMedium = ['전체'].concat(Object.values(categoryMediumData));
      }).catch(error => {
        console.log(error)
      })
    },
    // viewDay({ date }) {
    //   this.focus = date
    //   this.type = 'day'
    // },
    getEventColor(event) {
      return event.color
    },
    setToday() {
      this.focus = ''
    },
    prev() {
      this.$refs.calendar.prev()
    },
    next() {
      this.$refs.calendar.next()
    },
    showEvent({ nativeEvent, event }) { // nativeEvent : DOM 이벤트 객체를 나타내는 java script객체
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))

        // console.log(event);
        // 클릭 시 날짜별 데이터 변경
        const selectedDate = event.start;
        const selectDateYear = selectedDate.getFullYear();
        const selectDateMonth = String(selectedDate.getMonth() + 1).padStart(2, "0");
        const selectDateDay = String(selectedDate.getDate()).padStart(2, "0");

        const selectedDateStr = `${selectDateYear}-${selectDateMonth}-${selectDateDay}`;

        // console.log(selectedDateStr);
        // 내가 만든 수업
        this.runningBlue.forEach((item) => {
          if (item.runningDate === selectedDateStr) {
            // console.log(item);
            // console.log(item.runningTitle);
            this.runningNum = item.runningNum;
            this.runningTitle = item.runningTitle;
            store.dispatch("setVuexChatRoomTitle", item.runningTitle);
            this.runningContent = item.runningContent;
            this.runningStartTime = item.runningStartSmall;
            this.runningEndTime = item.runningEndSmall;
            this.RunningMcategory = item.runningCategoryMedium;
            this.userNickname = item.userNickname;
            this.RunningBcategory = item.runningCategoryBig;
            this.chatRoomId = item.chatRoomId;
            store.dispatch("setVuexChatRoomId", item.chatRoomId);
          }
        });
        // 내가 만든거에 참여자 생긴 경우
        this.runningOrange.forEach((item) => {
          if (item.runningDate === selectedDateStr) {
            // console.log(item);
            // console.log(item.runningTitle);
            this.runningNum = item.runningNum;
            this.runningTitle = item.runningTitle;
            store.dispatch("setVuexChatRoomTitle", item.runningTitle);
            this.runningContent = item.runningContent;
            this.runningStartTime = item.runningStartSmall;
            this.runningEndTime = item.runningEndSmall;
            this.RunningMcategory = item.runningCategoryMedium;
            this.userNickname = item.userNickname;
            this.RunningBcategory = item.runningCategoryBig;
            this.chatRoomId = item.chatRoomId;
            this.participateNum = item.participateNum;
            store.dispatch("setVuesParticipateNum", item.participateNum);
            store.dispatch("setVuexChatRoomId", item.chatRoomId);
          }
        });
        // 내가 받는 수업
        this.runningGreen.forEach((item) => {
          // console.log("Iterating: ");
          // console.log(item);
          if (item.runningDate === selectedDateStr) {
            this.runningNum = item.runningNum;
            this.runningTitle = item.runningTitle;
            store.dispatch("setVuexChatRoomTitle", item.runningTitle);
            this.runningContent = item.runningContent;
            this.runningStartTime = item.runningStartSmall;
            this.runningEndTime = item.runningEndSmall;
            this.RunningMcategory = item.runningCategoryMedium;
            this.userNickname = item.userNickname;
            this.RunningBcategory = item.runningCategoryBig;
            this.chatRoomId = item.chatRoomId;
            store.dispatch("setVuexChatRoomId", item.chatRoomId);
          }
        });

        //날짜 지난 내가 받은 수업
        this.runningGray.forEach((item) => {
          // console.log("Iterating: ");
          // console.log("zzz"+item);
          if (item.runningDate === selectedDateStr) {
            // console.log(item);
            // console.log(item.runningTitle);
            this.runningNum = item.runningNum;
            this.runningTitle = item.runningTitle;
            this.runningContent = item.runningContent;
            this.runningStartTime = item.runningStartSmall;
            this.runningEndTime = item.runningEndSmall;
            this.RunningMcategory = item.runningCategoryMedium;
            this.userNickname = item.userNickname;
            this.RunningBcategory = item.runningCategoryBig;
          }
        });
      }


      if (this.selectedOpen) {
        this.selectedOpen = false
        requestAnimationFrame(() => requestAnimationFrame(() => open()))
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    }, updateRange({ start, end }) {
      const events = [];

      // start와 end 객체에서 날짜 정보를 추출
      const min = new Date(`${start.date}T10:00:00`); // 오전 10시로 설정
      const max = new Date(`${end.date}T17:00:00`); // 오후 5시로 설정

      const allDay = false;
      let timestamp = min.getTime(); // 시작 시간으로 timestamp를 설정
      while (timestamp < max.getTime()) { // 종료 시간까지 이벤트를 생성
        const first = new Date(timestamp); // 첫 번째 이벤트 시작 시간
        const second = new Date(timestamp + (60 * 60 * 1000)); // 두 번째 이벤트 시작 시간 (1시간 이후)

        events.push({
          // name: this.names[this.rnd(0, this.names.length - 1)],
          start: first,
          end: second,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          timed: !allDay,
        });

        timestamp += (60 * 60 * 1000); // timestamp를 1시간 이후로 설정
      }

      return events;
    },
    // 게시글 만들기
    createRunning() {
      var serverIP = '127.0.0.1',
        serverPort = 8080,
        pageUrl = 'runup/running';
      this.$axios({
        url: `http://${serverIP}:${serverPort}/${pageUrl}`,
        method: "POST",
        data: {
          runningDate: this.selectDate,
          runningTitle: this.WriteTitle,
          runningContent: this.WriteContent,
          runningStartSmall: this.WriteStartTime,
          runningEndSmall: this.WriteEndTime,
          runningCategoryMedium: this.RunningMcategory,
          runningCategoryBig: this.choice,
          runningStartBig: 1,
          runningEndBig: 1,
          runningKeep: false,
          userNum: store.getters.getUserNum,
        }
      }).then(response => {
        console.log(response);

        const newEvent = {
          name: this.WriteTitle,
          details: this.WriteContent,
          start: new Date(this.selectDate + ' ' + this.WriteStartTime),
          end: new Date(this.selectDate + ' ' + this.WriteEndTime),
          color: 'blue',
        };
        this.events.push(newEvent);

        // 변경 사항이 반영되도록 v-model을 이용하여 달력을 업데이트합니다.
        this.$refs.calendar.update;
        this.dialog = false;
        location.reload();
      }).catch(error => {
        console.log(error)
      })

    },
    addEvent() {
      this.selectedEvent = {};
      this.selectedOpen = true;
      this.selectedElement = event.target;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },

    // 내가 만든 수업 (Blue)
    fetchGiveSchedule() {
      var serverIP = '127.0.0.1',
        serverPort = 8080,
        pageUrl = '/runup/running/allgive';
      this.$axios({
        url: `http://${serverIP}:${serverPort}/${pageUrl}`,
        method: 'GET',
        params: {
          userNum: store.getters.getUserNum
        }
      })
        .then((response) => {
          this.runningBlue = response.data.runningBlue;
          // this.runningBlue2 = response.data.runningBlue;
          console.log(response.data);
          // // 반복문을 통한 runningBlue 리스트 하나씩 꺼내기
          for (let i = 0; i < this.runningBlue.length; i++) {
            this.runningNUm = this.runningBlue[i].runningNum;
            this.runningTitle = this.runningBlue[i].runningTitle;
            this.runningCategoryMedium = this.runningBlue[i].runningCategoryMedium;
            this.runningDate = this.runningBlue[i].runningDate;
            this.runningStartTime = this.runningBlue[i].runningStartSmall;
            this.runningEndTime = this.runningBlue[i].runningEndSmall;
            this.runningContent = this.runningBlue[i].runningContent;
            this.chatRoomId = this.runningBlue[i].chatRoomId;
            this.RunningBcategory = this.runningBlue[i].runningCategoryBig;
            const newEvent = {
              name: this.runningTitle,
              details: this.runningContent,
              start: new Date(this.runningDate + ' ' + this.runningStartTime),
              end: new Date(this.runningDate + ' ' + this.runningEndTime),
              color: 'blue',
            };
            this.events.push(newEvent);
          }
          // 변경 사항이 반영되도록 v-model을 이용하여 달력을 업데이트합니다.
          this.$refs.calendar.update;
          this.dialog = false;
        }).catch(error => {
          console.log(error)
        })
    },

    // 내가 만들고 참여자 생긴 수업(Orange)
    fetchPullJoinSchedule() {
      var serverIP = '127.0.0.1',
        serverPort = 8080,
        pageUrl = '/runup/running/allgive';
      this.$axios({
        url: `http://${serverIP}:${serverPort}/${pageUrl}`,
        method: 'GET',
        params: {
          userNum: store.getters.getUserNum
        }
      })
        .then((response) => {
          console.log('test');
          console.log(response.data.runningOrange);
          this.runningOrange = response.data.runningOrange;

          // // 반복문을 통한 runningBlue 리스트 하나씩 꺼내기

          for (let i = 0; i < this.runningOrange.length; i++) {
            this.runningNUm = this.runningOrange[i].runningNum;
            this.runningTitle = this.runningOrange[i].runningTitle;
            this.runningCategoryMedium = this.runningOrange[i].runningCategoryMedium;
            this.runningDate = this.runningOrange[i].runningDate;
            this.runningStartTime = this.runningOrange[i].runningStartSmall;
            this.runningEndTime = this.runningOrange[i].runningEndSmall;
            this.runningContent = this.runningOrange[i].runningContent;
            this.chatRoomId = this.runningOrange[i].chatRoomId;
            this.RunningBcategory = this.runningOrange[i].runningCategoryBig;
            this.participateNum = this.runningOrange[i].participateNum
            const newEvent = {
              name: this.runningTitle,
              details: this.runningContent,
              start: new Date(this.runningDate + ' ' + this.runningStartTime),
              end: new Date(this.runningDate + ' ' + this.runningEndTime),
              color: 'orange',
            };
            this.events.push(newEvent);
          }
          // 변경 사항이 반영되도록 v-model을 이용하여 달력을 업데이트합니다.
          this.$refs.calendar.update;
          this.dialog = false;
        }).catch(error => {
          console.log(error)
        })
    },

    // 내가 받는 수업 (Green)
    fetchTakeSchedule() {
      var serverIP = '127.0.0.1',
        serverPort = 8080,
        pageUrl = '/runup/running/alltake';
      this.$axios({
        url: `http://${serverIP}:${serverPort}/${pageUrl}`,
        method: 'GET',
        params: {
          participateNum: store.getters.getUserNum
        }
      })
        .then((response) => {
          console.log(response.data);
          // console.log(response.data);
          this.runningGreen = response.data.runningGreen;
          // // 반복문을 통한 runningBlue 리스트 하나씩 꺼내기
          for (let i = 0; i < this.runningGreen.length; i++) {
            this.runningNUm = this.runningGreen[i].runningNum;
            this.runningTitle = this.runningGreen[i].runningTitle;
            this.runningCategoryMedium = this.runningGreen[i].runningCategoryMedium;
            this.runningDate = this.runningGreen[i].runningDate;
            this.runningStartTime = this.runningGreen[i].runningStartSmall;
            this.runningEndTime = this.runningGreen[i].runningEndSmall;
            this.runningContent = this.runningGreen[i].runningContent;
            this.userNickname = this.runningGreen[i].userNickname;
            this.chatRoomId = this.runningGreen[i].chatRoomId;
            this.RunningBcategory = this.runningGreen[i].runningCategoryBig;
            const newEvent = {
              name: this.runningTitle,
              details: this.runningContent,
              start: new Date(this.runningDate + ' ' + this.runningStartTime),
              end: new Date(this.runningDate + ' ' + this.runningEndTime),
              color: 'green',
            };
            this.events.push(newEvent);
          }
          // 변경 사항이 반영되도록 v-model을 이용하여 달력을 업데이트합니다.
          this.$refs.calendar.update;
          this.dialog = false;
        }).catch(error => {
          console.log(error)
        })
    },

    // 날짜 지난 내가 받았던 수업 (Gray)
    fetchPassDataSchedule() {
      var serverIP = '127.0.0.1',
        serverPort = 8080,
        pageUrl = '/runup/running/alltake';
      this.$axios({
        url: `http://${serverIP}:${serverPort}/${pageUrl}`,
        method: 'GET',
        params: {
          participateNum: store.getters.getUserNum
        }
      })
        .then((response) => {
          this.runningGray = response.data.runningGray;
          // console.log(response.data.runningGray);
          // // 반복문을 통한 runningGray 리스트 하나씩 꺼내기
          for (let i = 0; i < this.runningGray.length; i++) {
            this.runningNUm = this.runningGray[i].runningNum;
            this.runningTitle = this.runningGray[i].runningTitle;
            this.runningCategoryMedium = this.runningGray[i].runningCategoryMedium;
            this.runningDate = this.runningGray[i].runningDate;
            this.runningStartTime = this.runningGray[i].runningStartSmall;
            this.runningEndTime = this.runningGray[i].runningEndSmall;
            this.runningContent = this.runningGray[i].runningContent;
            this.chatRoomId = this.runningGray[i].chatRoomId;
            this.RunningBcategory = this.runningGray[i].runningCategoryBig;
            const newEvent = {
              name: this.runningTitle,
              details: this.runningContent,
              start: new Date(this.runningDate + ' ' + this.runningStartTime),
              end: new Date(this.runningDate + ' ' + this.runningEndTime),
              color: 'grey darken-1',
            };
            this.events.push(newEvent);
          }
          // 변경 사항이 반영되도록 v-model을 이용하여 달력을 업데이트합니다.
          this.$refs.calendar.update;
          this.dialog = false;
        }).catch(error => {
          console.log(error)
        })
    },

    // 수업 취소
    CancleClass() {
      console.log(11);
      // 내가 내 수업을 취소할 경우(삭제)
      if (this.userNickname === store.getters.getUserNickname) {
        axios
          .delete(this.baseUrl + "running", {
            data: {
              runningNum: this.runningNum,
            }
          })
          .then((response) => {
            console.log(response.data);
            location.reload();
          })
          .catch(error => {
            console.log(error);
          })

      } else {
        // 내가 참여한 수업을 취소할 경우(수업취소)
        if (this.runningshow === 1) {
          var serverIP = '127.0.0.1',
            serverPort = 8080,
            pageUrl = 'runup/running/cancellearning';
          this.$axios({
            url: `http://${serverIP}:${serverPort}/${pageUrl}`,
            method: 'PUT',
            data: {
              participateNum: store.getters.getUserNum,
              runningNum: this.runningNum
            }
          })
            .then((response) => {
              console.log(response.data);
              location.reload();
            })
            .catch(error => {
              console.log(error);
            })
        } else {
          alert('지난 수업입니다. 변경이 불가합니다.');
        }
      }
    },
    contactChat() {

    }
  },
}
</script>

<style>
.CreateRunning-container {
  height: 85%;
  width: 70%;
}

.calender-css {
  width: 400px;
}

.ChatBtn {
  margin-left: 50%;
  color: black !important;
  background-color: rgba(244, 209, 155, 1) !important;
  justify-content: flex-end;
  margin-top: 5%;

}


.Schedule-Info {
  margin-bottom: 10px;
  /* font-family: 'dohyeon'; */
}

.detail-content {
  color: aliceblue;
}

/* @font-face {
  font-family: 'jua';
  src: url('../../../../public/fonts/BMJUA_ttf.ttf');
}

@font-face {
  font-family: 'dohyeon';
  src: url('../../../../public/fonts/BMDOHYEON_ttf.ttf');
} */
</style>
