<template>
  <section>
    <div class="success" v-if="completePublish">Submitted successfully!</div>
    <FormKit v-model="formDataAvis" type="form" id="formModify" submit-label="Modify" @submit="Modify">
        <FormKit type="text" name="title" label="title" validation="required" />
        <FormKit type="textarea" name="avistext" label="Décrivez votre stage !" validation="required" />
        <FormKit type="range" label="note" min="0" max="10" />
        <FormKit type="select" name="university" label="university" placeholder="Select a company" :options="companies" validation="required" />
    </FormKit>
    
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
        formDataAvis:{"title":"titre importé"},
    }
  },
  methods: {

    Modify() {
        /*
        axios.post('http://localhost:4000/api/createStudent',
        {
            "id":3,
            "email":this.email,
            "firstname":this.firstname,
            "lastname":this.lastname,
            "speciality":this.speciality,
            "university":this.university,
            "password":this.password1
        })
        */
        this.completePublish = true;
        this.$formkit.reset('formPublish');
        //router.push('/test');
    },
  },
  beforeCreate() {
    axios.get('http://localhost:4000/api/company').then(response => this.companies = (response.data))//.then(
        //() => {for (const element of this.companies) {this.stateList.push({label:element.name_company,value:element.id_company})}})
  },


};
</script>

<style scoped>


</style>