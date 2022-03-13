<template>
  <div class="home">
    <SearchBar/>
    <div>{{ data }}</div>
  </div>
</template>

<script>
// @ is an alias to /src
const axios = require("axios");
import SearchBar from '@/components/SearchBar.vue'

export default {
  name: 'HomeView',
  components: {
    SearchBar
  },

  data() {
    return {
      count: 0,
      data:'rien',
    }
  },
  beforeMount() {
    axios.get('http://localhost:4000/api/v1/students').then(response => this.data = (response.data[0].firstname_student))
  },
}


</script>
