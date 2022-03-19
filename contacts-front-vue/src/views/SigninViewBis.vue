<template>
  <section>
    <div class="success" v-if="completeSignIn">Submitted successfully!</div>
    <FormKit id="formSignIn" v-model="formData" type="form" submit-label="SignIn" @submit="SignIn" >
      <FormKit name="email" label="Email address" validation="required|email|(500)email_exists" :validation-messages="{ email_exists: 'email déjà utilisé' }" :validation-rules="{ email_exists }" />
      <FormKit type="text" name="firstname" label="firstname" validation="required" />
      <FormKit type="text" name="lastname" label="lastname" validation="required" />
      <FormKit type="select" name="university" label="university" placeholder="Select an university" :options="universities" validation="required" />
      <FormKit type="select" name="speciality" label="speciality" placeholder="Select an speciality" :options="specialities" validation="required" />
      <FormKit type="password" name="password" label="Password" validation="required" validation-visibility="live" />
      <FormKit type="password" name="password_confirm" label="Confirm password" validation="required|confirm" validation-visibility="live" />
    </FormKit>
      <p>{{formData}}</p>
        
  </section>
</template>

<script setup>

const email_exists = async function ({ value }) {
    let rep = [];
    await axios.get('http://localhost:4000/api/studentemail').then((response) => {
      rep = response.data;
    });
    for (let elt of rep) {
      if(value == elt.email) {
        return new Promise((resolve) => { 
      setTimeout(() => resolve(value != elt.email), 10)
      })
      }
    }
    return new Promise((resolve) => { 
      setTimeout(() => resolve(value != ""),10)
    })
    
}
</script>

<script>

import router  from '../router';
const axios = require("axios");

export default {
  name: 'SigninViewBis',
  components: {

  },
  data() {
    return {
        completeSignIn:false,
        specialities : "",
        universities : "",
        formData : [],
    }
  },
  methods: {

    SignIn() {
        //router.push('/test');
        axios.post('http://localhost:4000/api/createStudent',this.formData);
        this.completeSignIn =true;
        this.$formkit.reset('formSignIn');
        router.go();
    }
  },

  beforeCreate() {
    axios.get('http://localhost:4000/api/university').then(response => this.universities = (response.data))
    axios.get('http://localhost:4000/api/speciality').then(response => this.specialities = (response.data))
  },

};
</script>

<style scoped>


</style>
