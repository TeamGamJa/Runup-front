<template>
    <v-data-table :headers="headers" :items="runningList" class="elevation-1">
         <!-- eslint-disable-next-line vue/valid-v-slot --> <!-- v-slot 규칙 비 활성화 하는 구문 !!! ㅅㅂ 이게 찐이네-->
      <template v-slot:item.calories="{ item }">
            <v-chip :color="getColor(item.calories)" dark>
                {{ item.calories }}
            </v-chip>
        </template>
    </v-data-table>
</template>

<script>
// import axios from 'axios';

export default {
    data() {
        return {
            headers: [
                {
                    text: '번호',
                    align: 'center',
                    sortable: false,
                    value: 'runningNum',
                },
                { text: '제목', align: 'center', value: 'runningTitle' },
                { text: 'Runner', align: 'center', value: 'userNickname' },
                { text: '수업 날짜', align: 'center', value: 'runningDate' },
                { text: '특기', align: 'center', value: 'runningCategoryMedium' },
            ],
            runningList: [],
        }
    },
    methods: {
        // reportList() {
        //     axios
        //     .get(baseUrl."")
        // }
    },
}
</script>