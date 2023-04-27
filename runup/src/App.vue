<template>
  <v-app>
    <v-main style="overflow-y: auto;">
      <RunHeader/>
      <div>
      <router-view />
    </div>
  </v-main>
  <v-footer style="height: 60px;" color="rgba(249, 243, 223, 100%)">
    <!-- <v-container fluid> -->
      <RunFooter/>
    <!-- </v-container> -->
  </v-footer>
  </v-app>
</template>

<script>
import RunHeader from './components/Layout/RunHeader.vue';
import RunFooter from './components/Layout/RunFooter.vue';

export default {
  name: 'App',

  components: {
    RunHeader,
    RunFooter

  },
};
</script>
