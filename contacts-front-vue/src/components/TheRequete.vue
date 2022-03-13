
<script>
const axios = require("axios");
export default {
  data() {
    return {
      count: 0,
      data:'rien',
    }
  },
  methods: {
    updateInfo() {
        axios.get('http://localhost:4000/api/v1/students').then(response => this.data = (response.data[0].firstname_student))
      }
    }
};
</script>

<template>
  <button @click="updateInfo()">
    You clicked me {{ count }} times.
  </button>
  <div>{{ data }}</div>
</template>