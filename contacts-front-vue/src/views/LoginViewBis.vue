<template>
  <section>
    <FormKit v-model="formData" id="formLogin" type="form" submit-label="Login" @submit="login">
      <FormKit name="email" label="Email address" validation="required|email" />
      <FormKit type="password" name="password" label="Password" validation="required" />
    </FormKit>
    <p>{{email}}</p><br><p>{{password}}</p>
        
  </section>
</template>

<script>

import router  from '../router';
const axios = require("axios");

export default {
  name: 'LoginViewbis',
  components: {

  },
  data() {
    return {
      email:'pierre.martin@gmail.com',
      password:'erhgherghergerh',
      envoie:"pas envoyé",
      formData:"",
      valuetest:"jazfjzaf@gmail.com",
    }
  },
  methods: {
    login() {
        axios.post('http://localhost:4000/api/login',
        {
            "email":this.formData.email,
            "password":this.formData.password
        }
        ).then((response) => {
            sessionStorage.setItem('token',response.data.token);
            this.$store.state.ID = response.data.userId;
            this.$store.state.isConnected = "Connecté !";
            router.push('/AccountVue');
        })
    }
  },
};
</script>

<style>

[data-invalid] input {
  border-color: red;
  box-shadow: 0 0 0 1px red;
}

.formkit-messages li {
    color:red;
}

</style>
