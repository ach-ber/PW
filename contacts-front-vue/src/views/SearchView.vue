<template>
  <div>
    <h1 v-if="!vide">Résultats de votre recherche</h1>
    <h1 v-if="vide" >Aucun Avis trouvé !</h1>
    <p v-if="vide" >Modifier les paramètres de votre recherche afin de trouver des avis</p>
    <div v-if="!vide">
      <div>Trier Par</div><button @click="triNote" >NOTE</button><button  @click="triDATE" >DATE</button>
    </div>
    <section>
      <AvisComponent v-for="avis in AvisInfo" :note="avis.note_avis"  :key="avis.id_avis" :id="avis.id_avis" :avis="avis.text_avis"  v-bind:href="urlAvis+avis.id_avis"/>
    </section>
    

  </div>
</template>

<script>
const axios = require("axios");
import AvisComponent from '@/components/AvisComponent.vue'

export default {
    name: 'SearchView',
    components: {
      AvisComponent,
    },
  data() {
    return {
        university:"",
        speciality:"",
        AvisInfo:[],
        vide:false,
        urlAvis:'http://localhost:8081/#/AvisView/',
        test:'',
    }
  },
  methods: {
    triNote() {
      this.AvisInfo.sort(function compare(a, b) {
      if (a.note_avis > b.note_avis)
        return -1;
      if (a.note_avis < b.note_avis )
        return 1;
      return 0; 
      })
    }
  },
  beforeCreate() {
    axios.get('http://localhost:4000/api/avis/'+this.$store.state.SPECIALITY_SEARCH+'/'+this.$store.state.UNIVERSITY_SEARCH).then((response) => 
      {
        this.AvisInfo = (response.data);
        if(response.data[0] === undefined) {
          this.vide = true;
        }
        
    })
  },
};
</script>

<style scoped>

h1 {
  height: 200px;
}

section {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  background-color: #f6f8fe;
}

p {
  font-family: 'Montserrat';
  font-weight: 400;
  font-size: 22px;
  display: flex;
  justify-content: center;
}

</style>