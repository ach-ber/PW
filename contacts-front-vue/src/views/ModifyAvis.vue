<template>
  <section>
    <div class="success" v-if="completeModify">Submitted successfully!</div>
    <div class="success" v-if="notcompleteModify">not submit</div>
    <FormKit v-model="formDataAvis" type="form" id="formModify" submit-label="Modifier" @submit="Modify">
        <h2>Modifiez votre Avis</h2>
        <FormKit type="text" name="title" label="title" validation="required" />
        <FormKit type="textarea" name="avistext" label="Décrivez votre stage !" validation="required" />
        <FormKit type="range" name="note" label="note" min="0" max="10" />
        <FormKit type="date"  name="date" label="date" validation="required"/>
    </FormKit>
    
  </section>
</template>

<script>

import router  from '../router';
const axios = require("axios");

export default {
  name: 'ModifyAvis',
  components: {

  },
  data() {
    return {
        companies:[],
        company: [],
        formDataAvis:[{}],
        test:"",
        actual:0,
        id:"id",
    }
  },
  methods: {

    Modify() {
        axios.put(this.$store.state.URLAPI+'/student/'+this.$store.state.ID+'/avis/'+this.$route.params.id,
        {
            "text":this.formDataAvis.avistext.toString(),
            "title":this.formDataAvis.title.toString(),
            "note":this.formDataAvis.note,
            "date":this.formDataAvis.date,
        },
        {
          headers: {
            'Authorization': `Basic ${sessionStorage.getItem('token')}` 
          }
        }).then(
          ()=> {
            //axios.get('http://localhost:4000/api/student/'+this.$store.state.ID+'/avis/'+this.$route.params.id).then(response => this.test = (response.data[0]));
            this.completeModify = true;
            router.push('/AccountView');
          }
        ).catch(() => {
          this.notcompleteModify = true;
        })
        //router.push('/test');
    },
  },


  beforeCreate() {
    axios.get(this.$store.state.URLAPI+'/company').then(response => this.companies = (response.data));
    
        //() => {for (const element of this.companies) {this.stateList.push({label:element.name_company,value:element.id_company})}})
  },
  created() {
    axios.get(this.$store.state.URLAPI+'/student/2/avis/'+this.$route.params.id).then(response => 
    {this.test = (response.data[0]);
    this.formDataAvis.title = this.test.title;
    this.formDataAvis.note = this.test.note;
    this.formDataAvis.avistext = this.test.avistext;
    this.formDataAvis.date = this.test.date.substring(0,10);
    })
  },
  mounted() {
  }

};
</script>

<style>



section #formModify{
  margin: 40px 0px 40px 0px;
  width: 80%;
  min-width: 800px;
  max-width: 1000px;
  display: flex;
  align-items: center;
  justify-content: start;
  flex-flow: wrap row;
  border: solid 1px #dadce0;
  padding-bottom: 40px;
}

section #formModify{
  justify-content: center;
}

form>div>div .formkit-label {
  font-family: 'Montserrat';
  font-weight: 600;
  font-size: 22px;
  line-height: 1.2;
  color:black;
}

section #formModify>div {
  padding:0px;
  display: flex;
  justify-content: flex-start;
  flex-flow: column wrap;
  width: 80%;
  margin:  20px 10% 0px 10%;
  height: 120px;
}

section #formModify>div:nth-child(3) {
  height: 200px;
}

section #formModify>div>div {
  width: 100%;
  max-width: 100%;
}

section #formModify>div:nth-child(4), section #formModify>div:nth-child(5),section #formModify>div:nth-child(6),section #formModify>div:nth-child(7)  {
  width: 30%;
}

section #formModify>div:nth-child(4) div div input {
  border:none;
}

section #formModify>div:nth-child(6) {
   height: 60px;
   margin-top: 40px;
}

section #formModify>div:nth-child(6) div  {
  display: flex;
  justify-content: center;
}

section #formModify>div:nth-child(6) div div {
  display: flex;
  align-items: center;
}

section #formModify>div:nth-child(6) div div button{
  width: 180px;
  margin:0px;
  border: solid 1px #1b46c2;
  background-color:#1b46c2;
  font-weight: 600;
  font-size: 16px;
}



</style>