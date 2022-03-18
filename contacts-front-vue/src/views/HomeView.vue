<template>
  <div class="home">
    <SearchBar/>
    <section>
      <AvisComponent v-for="avis in data"  :key="avis.id_avis" :id="avis.id_avis" :avis="avis.text_avis"  v-bind:href="urlAvis+avis.id_avis"/>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
const axios = require("axios");
import SearchBar from '@/components/SearchBar.vue'
import AvisComponent from '@/components/AvisComponent.vue'

export default {
  name: 'HomeView',
  components: {
    SearchBar,
    AvisComponent,
  },

  data() {
    return {
      count: 0,
      data:'rien',
      urlAvis:'http://localhost:8081/#/AvisView/',
    }
  },
  beforeMount() {
    axios.get('http://localhost:4000/api/avis').then(response => this.data = (response.data))
  },
}


</script>

<style scoped>
.home {
  display: flex;
  flex-flow: column wrap;
}

section {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
}


</style>
