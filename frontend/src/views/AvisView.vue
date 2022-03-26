<template>
  <section>

    <FullAvisComponent  :date="dataAvis.date_avis" :title="dataAvis.title_avis" :avis="dataAvis.text_avis" :note="dataAvis.note_avis" :company="dataAvis.name_company" :speciality="dataAvis.name_speciality"  :university="dataAvis.name_university" :email="dataAvis.email_student" />
    
  </section>
  
</template>

<script>

const axios = require("axios");
import FullAvisComponent from '@/components/FullAvisComponent.vue'

export default {
  name: 'AvisView',
  components: {
    FullAvisComponent,
  },

  data() {
    return {
      dataAvis:[],  
    }
  },

  beforeCreate() {
    axios.get(this.$store.state.URLAPI+'/avis/'+this.$route.params.id).then(response => this.dataAvis = (response.data[0]));
  },
}


</script>