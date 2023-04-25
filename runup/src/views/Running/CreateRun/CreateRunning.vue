<template>
  <div class="pa-5">
          <v-row>
              <v-col cols="12" md="6" class="mb-4">
                <v-row>
                  <v-col cols="6">
                    <v-menu ref="dateOpne" :close-on-content-click="false" :return-value.sync="start" offset-y>
                    <template v-slot:activator="{ on }">
                      <v-text-field v-model="start" dark lable="Start Date" prepend-icon="mdi-calender" dense readonly outlined hide-details v-on="on">
                      </v-text-field>
                    </template>

                    <v-date-picker dark v-model="start" no-title>
                      <v-spacer/>
                      <v-btn text dark color="primary" @click="dateOpen = false">Cancel</v-btn>
                      <v-btn text dark color="primary" @click="$refs.dateOpen.save(start)">OK</v-btn>
                    </v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="6">
                    <v-select v-model="type" :items="typeOptions" label="Type" class="my-auto" dark hide-details outlined dense></v-select>
                  </v-col>
                </v-row>
                  <v-sheet height="300">
                      <v-calendar
                              ref="calendar"
                              :start="start"
                              :type="type"
                              dark
                      ></v-calendar>
                  </v-sheet>
              </v-col>
              <v-col cols="12" md="6" class="mb-4">
        <div class="text-center mb-3 display-1">
          {{ start | moment("YYYY MMMM") }}
        </div>
        <v-sheet height="500">
          <v-calendar ref="calendar" dark></v-calendar>
        </v-sheet>
        </v-col>
        </v-row>
      </div>
</template>

<script>
// import moment from 'moment';
export default {
    data() {
        return {
            dateOpen: false,
            start: '',
            type: 'month',
            typeOptions: [
                {text: 'Day', value: 'day'},
                {text: 'Week', value: 'week'},
                {text: 'Month', value: 'month'},
            ],
        }
    },
}
</script>