<template>
  <div>id: {{ idAvis }}</div>
  <AvisComponent  :id="idAvis" :avis="AvisInfo[0].text_avis" />
</template>

<script>


const axios = require("axios");
import AvisComponent from '@/components/AvisComponent.vue'

export default {
  name: 'AvisView',
  components: {
    AvisComponent,
  },

  data() {
    return {
      idAvis:'',  
      AvisData:'rien',
      Avistext:"sjdbjebjebebj",
      AvisInfo:'',
    }
  },

  created() {
    this.idAvis=this.$route.params.id;
    axios.get('http://localhost:4000/api/avis/'+this.idAvis).then(response => this.AvisInfo = (response.data))
  },
}


</script>