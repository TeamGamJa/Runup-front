<template>
  <v-container>
    <v-row class="fill-height">
      <v-col>

        <!-- 상단 달력 위에 설정 툴바 -->
        <v-sheet height="64">
          <v-toolbar flat>
            <!-- <v-menu>
              <template v-slot:activator="{ on, attrs }">
                <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                  <span>{{ typeToLabel[type] }}</span>
                  <v-icon right>
                    mdi-menu-down
                  </v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="type = 'month'">
                  <v-list-item-title>월별</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'day'">
                  <v-list-item-title>일별</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu> -->
            <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
              오늘
            </v-btn>
            <!-- <v-btn fab text small color="grey darken-2" @click="prev">
              <v-icon small>
                mdi-chevron-left
              </v-icon>
            </v-btn>
            <v-btn fab text small color="grey darken-2" @click="next">
              <v-icon small>
                mdi-chevron-right
              </v-icon>
            </v-btn> -->
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
                    <span class="text-h5">Runner</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field label="제목" v-model="runningTitle" required></v-text-field>
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
                          <v-text-field v-model="runningStartTime" label="시작시간" type="time" step="3600" value="08:00"
                            hint="시간단위로 설정됩니다." required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="runningEndTime" label="종료시간" type="time" step="3600" value="08:00"
                            hint="시간단위로 설정됩니다." required></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field v-model="runningContent" label="강의내용" hint="Learner에게 강의할 내용을 간략하게 적어주세요"
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
                    <v-btn color="blue darken-1" text @click="createRunning">
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
            :type="type" @click:event="showEvent" @change="updateRange"></v-calendar>
          <!-- @click:more="viewDay" @click:date="viewDay" 일별로 날짜 보는 기능(지금은 안써서 주석) -->

          <!-- 달력안의 일정을 클릭 시 일정 상세-->
          <v-menu v-model="selectedOpen" :close-on-content-click="false" :activator="selectedElement" offset-x>
            <v-card :loading="loading" class="mx-auto my-12 pa-0" max-width="374">
              <!-- <template slot="progress">
                <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
              </template> -->

              <v-img height="250" :src="categoryImg"></v-img>

              <v-card-title class="Schedule-Info mb-0">
                제목: {{ runningTitle }}
              </v-card-title>

              <v-divider class="mx-4"></v-divider>

              <v-card-text>
                <v-row class="Schedule-Info mb-0">
                  특기: {{ RunningBcategory }}
                </v-row>

                <v-row class="Schedule-Info mb-0">
                  Runner: {{ userNickname }}
                </v-row>
                <v-row class="Schedule-Info mb-0">
                  수업시작: {{ runningStartTime }}
                </v-row>
                <v-row class="Schedule-Info mb-0">
                  수업종료: {{ runningEndTime }}
                </v-row>
                <v-row class="Schedule-Info mb-0">
                  수업내용: {{ runningContent }}
                </v-row>
              </v-card-text>

              <v-card-actions>
                <v-btn class="ChatBtn" :rounded="true" text to="/Chat">수업시작 </v-btn>
                <v-btn class="ChatBtn" :rounded="true">수업취소 </v-btn>
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
    categories: ['IT', '라이프스타일', '문제풀이', '기타'],
    categoryMedium: [''],
    choice: '',
    RunningBcategory: '',
    RunningMcategory: '',
    DateMenu: '',
    selectDate: '',
    runningTitle: '',
    runningContent: '',
    runningStartTime: '',
    runningEndTime: '',

    // 도움관리 - 내가 만든 멘토
    runningBlue: {},
    runningBlue2: [],

    // 도움관리 - 내가 받을 멘토
    runningGreen: {},
    runningGreen2: [],
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
  },
  methods: {
    inputSelectVal(value) {
      this.RunningMcategory = value;
    },
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

        console.log(selectedDateStr);
        // 내가 만든 수업
        this.runningBlue2.forEach((item) => {
          // console.log("Iterating: ");
          // console.log(item);
          if (item.runningDate === selectedDateStr) {
            console.log(item);
            // console.log(item.runningTitle);
            this.runningTitle = item.runningTitle;
            this.runningContent = item.runningContent;
            this.runningStartTime = item.runningStartSmall;
            this.runningEndTime = item.runningEndSmall;
            this.RunningMcategory = item.runningCategoryMedium;
            this.userNickname = item.userNickname;
            this.RunningBcategory = item.runningCategoryBig;
          }
        });
        // 내가 받는 수업
        this.runningGreen2.forEach((item) => {
          // console.log("Iterating: ");
          // console.log(item);
          if (item.runningDate === selectedDateStr) {
            // console.log(item);
            // console.log(item.runningTitle);
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
    createRunning() {
      var serverIP = '127.0.0.1',
        serverPort = 8080,
        pageUrl = 'runup/running';
      this.$axios({
        url: `http://${serverIP}:${serverPort}/${pageUrl}`,
        method: "POST",
        data: {
          runningDate: this.selectDate,
          runningTitle: this.runningTitle,
          runningContent: this.runningContent,
          runningStartSmall: this.runningStartTime,
          runningEndSmall: this.runningEndTime,
          runningCategoryMedium: this.RunningMcategory,
          runningCategoryBig: this.choice,
          runningStartBig: 1,
          runningEndBig: 1,
          runningKeep: false,
          userNum: store.getters.getUserNum,
        }
      }).then(response => {
        console.log(response)
        console.log(this.runningStartTime)
        // 새로운 이벤트를 생성하여 events 배열에 추가합니다.
        const newEvent = {
          name: this.runningTitle,
          details: this.runningContent,
          start: new Date(this.selectDate + ' ' + this.runningStartTime),
          end: new Date(this.selectDate + ' ' + this.runningEndTime),
          color: 'blue',
        };
        this.events.push(newEvent);

        // 변경 사항이 반영되도록 v-model을 이용하여 달력을 업데이트합니다.
        this.$refs.calendar.update;
        this.dialog = false;
      }).catch(error => {
        console.log(error)
      })

    },
    addEvent() {
      this.selectedEvent = {};
      this.selectedOpen = true;
      this.selectedElement = event.target;
    },
    saveEvent() {

    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },

    // 내가 만든 수업
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
          this.runningBlue2 = response.data.runningBlue;
          console.log(this.runningBlue2);
          // // 반복문을 통한 runningBlue 리스트 하나씩 꺼내기
          for (let i = 0; i < this.runningBlue.length; i++) {
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

    // 내가 받는 수업
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
          this.runningGreen = response.data;
          this.runningGreen2 = this.runningGreen;
          console.log(this.runningGreen2);
          // // 반복문을 통한 runningBlue 리스트 하나씩 꺼내기
          for (let i = 0; i < this.runningGreen.length; i++) {
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
  },
}
</script>

<style>
.ChatBtn {
  margin-left: 100px;
  color: black !important;
  background-color: rgba(244, 209, 155, 1) !important;
  justify-content: flex-end;
  border-radius: 200px;
  margin-top: 20px;

}

.Schedule-Info {
  margin-bottom: 10px;
}
</style>
