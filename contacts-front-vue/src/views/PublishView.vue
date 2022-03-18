<template>
  <section>
    <div class="success" v-if="completePublish">Submitted successfully!</div>
    <div class="success" v-if="completeCompany">Submitted successfully!</div>
    <FormKit v-model="formDataAvis" type="form" id="formPublish" submit-label="Publish" @submit="Publish" v-if="publishside">
        <FormKit type="text" name="title" label="title" validation="required" />
        <FormKit type="textarea" name="avistext" label="Décrivez votre stage !" validation="required" />
        <FormKit type="range" label="note" min="0" max="10" />
        <FormKit type="select" name="university" label="university" placeholder="Select a company" :options="companies" validation="required" />
    </FormKit>
    <FormKit v-model="formDataCompany" type="form" id="formcompany" submit-label="ADD" @submit="Add" v-else >
        <FormKit type="text" name="name" label="name" validation="required" />
        <FormKit type="number" name="id" label="id" validation="required" />
    </FormKit>
    <button v-on:click="publishside = false,completePublish=false" v-if="publishside">add a company</button>
    <button v-on:click="publishfunc" v-if="!publishside">Publish</button>
  </section>
</template>

<script>

import router  from '../router';
const axios = require("axios");

export default {
  name: 'PublishView',
  components: {

  },
  data() {
    return {
        publishside:true,
        completePublish:false,
        completeCompany:false,
        companies:[],
        company: [],
    }
  },
  methods: {
    publishfunc() {
        this.publishside = true;
        this.completeCompany=false;
        router.go();
    },

    Publish() {
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
    Add() {
        axios.post('http://localhost:4000/api/createcompany',this.formDataCompany)
        this.completeCompany = true;
        this.$formkit.reset('formcompany');
        
    }
  },
  beforeCreate() {
    axios.get('http://localhost:4000/api/company').then(response => this.companies = (response.data))//.then(
        //() => {for (const element of this.companies) {this.stateList.push({label:element.name_company,value:element.id_company})}})
  },


};
</script>

<style scoped>


</style>
