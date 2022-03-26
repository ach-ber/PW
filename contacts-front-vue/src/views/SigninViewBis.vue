<template>
  <section>
    
    <div class="success" v-if="completeSignIn">Submitted successfully!</div>
    <FormKit id="formSignIn" v-model="formData" type="form" submit-label="SignIn" @submit="SignIn" >
      <h2>Sign In</h2>
      <FormKit name="email" label="Email address" validation="required|email|(500)email_exists" :validation-messages="{ email_exists: 'email adresse already used' }" :validation-rules="{ email_exists }" />
      <FormKit type="text" name="firstname" label="firstname" validation="required" />
      <FormKit type="text" name="lastname" label="lastname" validation="required" />
      <FormKit type="select" name="university" label="university" placeholder="Select an university" :options="universities" validation="required" />
      <FormKit type="select" name="speciality" label="speciality" placeholder="Select an speciality" :options="specialities" validation="required" />
      <FormKit type="password" name="password" label="Password" validation="required" validation-visibility="live" />
      <FormKit type="password" name="password_confirm" label="Confirm password" validation="required|confirm" validation-visibility="live" />
    </FormKit>
        
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
        axios.post(this.$store.state.URLAPI+'/createStudent',this.formData);
        this.completeSignIn =true;
        this.$formkit.reset('formSignIn');
        router.go();
    }
  },

  beforeCreate() {
    axios.get(this.$store.state.URLAPI+'/university').then(response => this.universities = (response.data))
    axios.get(this.$store.state.URLAPI+'/speciality').then(response => this.specialities = (response.data))
  },

};
</script>

<style>

section {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column wrap;
  font-family: 'Montserrat';

}

section #formSignIn {
  display: flex;
  align-items: center;
  justify-content: start;
  flex-flow: wrap column;
  width:500px;
  border: solid 1px #dadce0;
  margin: 40px 0px 40px 0px;
}

section form h2{
  font-weight: 600;
  color: #000;
  font-size: 2.25rem;
  margin: 40px 0px 40px 0px;
}

form>div>div .formkit-label {
  font-family: 'Montserrat';
  font-weight: 600;
  font-size: 22px;
  line-height: 1.2;
  color:black;
}

section #formSignIn>div {
  padding:0px;
  display: flex;
  justify-content: flex-start;
  flex-flow: column wrap;
  height: 120px;
}


section #formSignIn>div:last-child{
  height:100px;
}

section #formSignIn>div:last-child div  {
  display: flex;
  justify-content: center;
}

section #formSignIn>div:last-child div div {
  display: flex;
  align-items: center;
}

section #formSignIn>div:last-child div div button {
  width: 180px;
  margin:0px;
  border: solid 1px #1b46c2;
  background-color:#1b46c2;
  font-weight: 600;
  font-size: 16px;
}

section #formSignIn>div>div{
  width: 460px;
  margin: 0px;
}

section #formSignIn>div>div>div{
  
  margin: 0px;

}

section #formSignIn>div>div>div>input{
  width: 100%;
  margin: 0px;
  border:solid 1px #dadce0;
}

</style>
