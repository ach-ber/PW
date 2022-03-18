<template>
  <div>
    <h1>This is SearchView</h1>
    <p>university : {{ $store.state.UNIVERSITY_SEARCH }}</p>
    <p>speciality : {{ $store.state.SPECIALITY_SEARCH }}</p>
    <p>AvisInfo : {{ AvisInfo }}</p>

  </div>
</template>

<script>
const axios = require("axios");

export default {
    name: 'SearchView',
    components: {
    },
  data() {
    return {
        university:"",
        speciality:"",
        AvisInfo:"rien",
    }
  },
  methods: {
  },
  beforeMount() {
    axios.get('http://localhost:4000/api/avisConditions').then(response => this.AvisInfo = (response.data[0]))
  },
};
</script>

<style scoped>


</style>