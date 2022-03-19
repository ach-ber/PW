<template>
  <div>
    <h1>This is Account page</h1>{{ data }}
    <AvisComponent v-for="avis in dataAvis"  :key="avis.id_avis" :id="avis.id_avis" :avis="avis.text_avis"  v-bind:href="urlAvis+avis.id_avis"/>
  </div>
</template>

<script>

const axios = require("axios");
import AvisComponent from '@/components/AvisComponent.vue'

export default {
  name: 'AccountView',
  components: {
    AvisComponent,
  },

  data() {
    return {
      dataAvis:'aucun avis',
    }
  },

  methods: {
  },
  beforeCreate() {
    axios.get('http://localhost:4000/api/student/'+this.$store.state.ID+'/avis').then(response => this.dataAvis = (response.data))
  },

}


</script>

<style scoped>

</style>












