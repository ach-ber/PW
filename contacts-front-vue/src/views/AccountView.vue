<template>
  <section>
    <article>
      <h1>Mon Compte</h1>
      <div>
        <h2>Mes informations</h2>
      </div>
      <div>
        <div>
          <label>adresse email</label>
          <div>{{dataStudent.email_student}}</div>
        </div>
        <div>
          <label>Prénom</label>
          <div>{{dataStudent.firstname_student}}</div>
        </div>
        <div>
          <label>Nom </label>
          <div>{{dataStudent.lastname_student}}</div>
        </div>
      </div>
      
      <div>
        <h2>Mes Avis</h2>
      </div>
      <div v-if="!vide">
        <AvisAccountComponent v-for="avis in dataAvis" :date="avis.date_avis.substring(0,10).replace('-','/').replace('-','/')" :title="avis.title_avis.substring(0,20).concat(' ...')" :company="avis.name_company"  :key="avis.id_avis" :note="avis.note_avis" :id="avis.id_avis" :avis="avis.text_avis.substring(0,300).concat(' ...')"   :href="urlAvis+avis.id_avis" />
      </div>
      <div v-if="vide">
        <label>Aucun avis déposé</label>
      </div>
      
    </article>
  </section>
</template>

<script>

const axios = require("axios");
import AvisAccountComponent from '@/components/AvisAccountComponent.vue'

export default {
  name: 'AccountView',
  components: {
    AvisAccountComponent,
    
  },

  data() {
    return {
      dataAvis:[],
      urlAvis:'http://localhost:8081/#/AvisView/',
      dataStudent:'',
      vide:false,
    }
  },

  methods: {
  },

  beforeMount() {
    axios.get(this.$store.state.URLAPI+'/student/'+this.$store.state.ID).then(response => this.dataStudent = (response.data[0]));
    axios.get(this.$store.state.URLAPI+'/student/'+this.$store.state.ID+'/avis').then((response) => {this.dataAvis = (response.data);})
    .catch(() => {this.vide = true;})
  },

  updated() {
    
  },


}


</script>

<style scoped>

section {
  display: flex;
  justify-content: center;
}

article {
  max-width: 80%;
  border: solid 1px #dadce0;
  margin-top: 40px;
  min-width: 800px;
  
}

article>div {
  font-family: 'Montserrat';
  font-weight: 600;
  font-size: 28px;
  min-height: 80px;
  display: flex;
  align-items: center;
}

section article>div:nth-child(3) {
  display:flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-flow:  row wrap;
}

section article>div:nth-child(3)>div {
  width: 35%;
  margin: 20px 60px 20px 60px;
}

section article>div:nth-child(3)>div:nth-child(1) {
  width: 100%;
  margin: 20px 60px 20px 60px;
}

section article>div:nth-child(3)>div>div {
  height: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 20px;
  border:solid 1px  #dadce0;
  border-radius: 4px;
  margin-top: 20px;
}

section article div:nth-child(3) label, section article div:last-child label {
  font-weight: 500;
  font-size: 20px;
}

section article div:nth-child(3)>div {
  font-weight: 400;
  font-size: 18px;
}

article>div h2 {
  width: 80%;
  margin-left: 10%;
}

article>div:last-child {
  display: flex;
  justify-content: space-evenly;
  flex-flow: row wrap;
}

article div .AvisAccount {
  border:solid 1px  #dadce0;
}

</style>












