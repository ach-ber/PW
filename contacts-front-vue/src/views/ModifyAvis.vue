<template>
  <section>
    <div class="success" v-if="completeModify">Submitted successfully!</div>
    <FormKit v-model="formDataAvis" type="form" id="formModify" submit-label="Modify" @submit="Modify">
        <FormKit type="text" name="title" label="title" validation="required" />
        <FormKit type="textarea" name="avistext" label="Décrivez votre stage !" validation="required" />
        <FormKit type="range" name="note" label="note" min="0" max="10" />
        <FormKit type="select" name="company" label="company" placeholder="Select a company" :options="companies" validation="required" />
    </FormKit>
    <p>{{formDataAvis}}</p><br><p>{{test}}</p>
    
  </section>
</template>

<script>

// import router  from '../router';
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
    }
  },
  methods: {

    Modify() {
        axios.put('http://localhost:4000/api/student/1/avis/2',
        {
            "text":this.formDataAvis.avistext,
            "title":this.formDataAvis.title,
            "note":this.formDataAvis.note,
        }).then(
          ()=> {
            axios.get('http://localhost:4000/api/student/1/avis/1').then(response => this.test = (response.data[0]));
            this.completeModify = true;
          }
        )
        //router.push('/test');
    },
  },


  beforeCreate() {
    axios.get('http://localhost:4000/api/company').then(response => this.companies = (response.data))
        //() => {for (const element of this.companies) {this.stateList.push({label:element.name_company,value:element.id_company})}})
  },
  created() {
    axios.get('http://localhost:4000/api/student/1/avis/1').then(response => 
    {this.test = (response.data[0]);
    this.formDataAvis.title = this.test.title;
    this.formDataAvis.note = this.test.note;
    this.formDataAvis.avistext = this.test.avistext;
    this.formDataAvis.company = this.test.value;
    })
  },

};
</script>

<style scoped>


</style>