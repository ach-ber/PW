<template>
  <div>
    <h1>This is Account page</h1>{{ data }}<br>{{ $store.state.TOKEN }}
    <button type="button" @click="requete" >requete</button>
  </div>
</template>

<script>
// @ is an alias to /src

const axios = require("axios");

export default {
  name: 'AccountView',
  components: {
    
  },

  data() {
    return {
      count: 0,
      data:'rien',
      token:""
    }
  },

  methods: {
    requete() {
        axios.get('http://localhost:4000/api/user/avis',{
  headers: {
    'Authorization': 'Basic '+sessionStorage.getItem('token')}
  }).then(response => this.data = (response.data))}
  },
}


</script>

<style scoped>

</style>












