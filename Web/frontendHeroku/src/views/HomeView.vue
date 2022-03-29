<template>
  
  <div class="home">
    <h1>Retrouvez tous les avis</h1>
    
    <SearchBar/>
    <section>
      <div>
        <h2>Les mieux notés</h2>
      </div>
      <AvisComponent v-for="avis in dataBestavis" :title="avis.title_avis" :company="avis.name_company" :date="avis.date_avis.substring(0,10).replace('-','/').replace('-','/')" :note="avis.note_avis" :key="avis.id_avis" :id="avis.id_avis" :avis="avis.text_avis.substring(0,300).concat(' ...')"  v-bind:href="urlAvis+avis.id_avis"/>
      <div>
        <h2>Récemment posté</h2>
      </div>
      <AvisComponent v-for="avis in dataRecentavis" :title="avis.title_avis" :company="avis.name_company"  :date="avis.date_avis.substring(0,10).replace('-','/').replace('-','/')" :note="avis.note_avis" :key="avis.id_avis" :id="avis.id_avis" :avis="avis.text_avis.substring(0,300).concat(' ...')"  v-bind:href="urlAvis+avis.id_avis"/>
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
      dataRecentavis:[],
      dataBestavis:[],
      urlAvis:'http://localhost:8081/#/AvisView/',
    }
  },

  beforeMount() {
    axios.get(this.$store.state.URLAPI+'/Recentavis').then(response => this.dataRecentavis = (response.data));
    axios.get(this.$store.state.URLAPI+'/Bestavis').then(response => this.dataBestavis = (response.data));
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
  flex-flow: row wrap;
  justify-content: center;
  background-color: red; /* #f6f8fe;*/
  padding-bottom: 40px;
}
section div {
  width: 100%;
  font-family: 'Montserrat';
  font-weight: 600;
  font-size: 28px;
  height: 80px;
  display: flex;
  align-items: center;
}

section div h2 {
  width: 80%;
  margin-left: 10%;
}

/* ------------------------------------------- media queries ------------------------------------------- */

@media (max-width: 2000px) { 
  section a:nth-child(6n){
    display: none;
  }
}

@media (max-width: 1600px) { 
  section a:nth-child(5), section a:nth-child(11){
    display: none;
  }
}

@media (max-width: 1150px) { 
  section a:nth-child(5), section a:nth-child(11){
    display: flex;
  }
}


</style>
