<template>
    <v-app>
        <v-container style="margin-top: 2%;">
            <v-card>
                <v-row>
                    <v-col cols="3">
                        <v-card-title >받는사람</v-card-title>
                    </v-col>
                    <v-col cols="8">
                        <v-text-field label="받으실 분을 작성해 주세요">받는사람</v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="3">
                        <v-card-title>제목</v-card-title>
                    </v-col>
                    <v-col cols="8">
                        <v-text-field label="제목을 작성해 주세요">제목</v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="3">
                        <v-card-title>내용</v-card-title>
                    </v-col>
                    <v-col cols="8">
                        <v-textarea :outlined="true" label="보내실 내용을 작성해 주세요">내용</v-textarea>
                    </v-col>
                </v-row>
                <v-btn style="margin-left: 90%; margin-bottom: 3%;" :rounded="true" >보내기</v-btn>
            </v-card>
        </v-container>
    </v-app>
</template>