<template>
  <div>
    <h1 v-if="!vide">Résultats de votre recherche</h1>
    <h1 v-if="vide" >Aucun Avis trouvé !</h1>
    <p v-if="vide" >Modifier les paramètres de votre recherche afin de trouver des avis</p>
    <div v-if="!vide" id="triSearch">
      <div>Trier Par</div><button @click="triNote" v-bind:class="{ active:isTriNote }">Note</button><button  @click="triDate" v-bind:class="{ active: !isTriNote }" >Date</button>
    </div>
    <section v-bind:class="{ sectionEmpty:vide }">
      <div v-if="!vide">
        <h2 >Avis correspondant aux critères</h2>
      </div>
      <AvisComponent v-for="avis in AvisInfo" :note="avis.note_avis" :title="avis.title_avis"  :key="avis.id_avis" :company="avis.name_company"  :date="avis.date_avis.substring(0,10).replace('-','/').replace('-','/')" :id="avis.id_avis" :avis="avis.text_avis.substring(0,300).concat(' ...')"   v-bind:href="urlAvis+avis.id_avis"/>
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
        isTriNote:true,
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
      });
      this.isTriNote = true;
    },
    triDate() {
      this.AvisInfo.sort(function compare(a, b) {
      if (a.date_avis > b.date_avis)
        return -1;
      if (a.date_avis < b.date_avis )
        return 1;
      return 0; 
      });
      this.isTriNote = false;
    }
  },
  beforeCreate() {
    axios.get(this.$store.state.URLAPI+'/avis/'+this.$store.state.SPECIALITY_SEARCH+'/'+this.$store.state.UNIVERSITY_SEARCH).then((response) => 
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
  justify-content: flex-start;
  align-items: flex-start;
  background-color: #f6f8fe;
  padding:0px 40px 40px 40px;
  min-height: 400px;
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
  margin-left: 6%;
}

#triSearch{
  background-color: white;
  width: 240px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-flow: row nowrap;
  font-family: 'Montserrat';
  font-weight: 600;
  font-size: 18px;
  border-radius: 4px;
  border:solid 1px  #dadce0;
  height: 40px;
  margin: 20px;

}

#triSearch .active {
  background-color:  #dadce0;
}

#triSearch button {
  border:none;
  font-family: 'Montserrat';
  font-weight: 600;
  font-size: 18px;
  background-color: white;
  height: 100%;
  padding: 0px 10px 0px 10px;
}

#triSearch button:hover {
  cursor: pointer;
}

#triSearch button:nth-child(2) {
  margin-left: 14px;
  border-left: 1px solid #dadce0;
}

p {
  font-family: 'Montserrat';
  font-weight: 400;
  font-size: 22px;
  display: flex;
  justify-content: center;
}

</style>