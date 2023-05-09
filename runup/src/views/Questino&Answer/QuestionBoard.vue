<template>
    <v-container class="Q-container">
        <v-row>
            <v-card :loading="loading" class="Question-content">
                <template slot="progress">
                    <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
                </template>

                <v-img height="180" :rounded="true" src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>

                <v-card-title>{{ this.$store.getters.getUserNickname }}</v-card-title>

                <v-card-text>

                </v-card-text>
            </v-card>
            <v-card :loading="loading" class="Question-content">
                <template slot="progress">
                    <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
                </template>

                <v-img height="180" :rounded="true" src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>

                <v-card-title>{{ this.$store.getters.getUserNickname }}</v-card-title>

                <v-card-text>

                </v-card-text>
            </v-card>
            <v-card :loading="loading" class="Question-content">
                <template slot="progress">
                    <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
                </template>

                <v-img height="180" :rounded="true" src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>

                <v-card-title>{{ this.$store.getters.getUserNickname }}</v-card-title>

                <v-card-text>

                </v-card-text>
            </v-card>
            <v-card :loading="loading" class="Question-content">
                <template slot="progress">
                    <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
                </template>

                <v-img height="180" :rounded="true" src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>

                <v-card-title>{{ this.$store.getters.getUserNickname }}</v-card-title>

                <v-card-text>

                </v-card-text>
            </v-card>
        </v-row>
    </v-container>
</template>

<style>
.Q-container{
    display: inline-flex;
    justify-content:space-between;
    align-items: center;
    margin-top: 2%;
}
.Question-content {
    display: inline-block;
    width: 30%;
    margin-left: 3%;
    margin-bottom: 3%;
}
</style>