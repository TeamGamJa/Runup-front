<template>
  <div>
    <h1>Available Models</h1>
    <button @click="getAvailableModels">Get Models</button>
    <ul v-if="models">
      <li v-for="model in models" :key="model.id">{{ model.id }}</li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      models: null,
    };
  },
  methods: {
    async getAvailableModels() {
      const apiKey = "";
      const headers = {
        Authorization: `Bearer ${apiKey}`,
      };

      try {
        const response = await axios.get("https://api.openai.com/v1/models", {
          headers,
        });
        this.models = response.data.data;
      } catch (error) {
        console.error("Error while calling OpenAI API:", error.response.data);
      }
    },
  },
};
</script>