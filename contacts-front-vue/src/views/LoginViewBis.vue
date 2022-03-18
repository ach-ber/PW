<template>
  <section>
       <FormKit v-model="formData"
            type="form"
            submit-label="Login"
            @submit="login"
        >
            <FormKit
            name="email"
            label="Email address"
            validation="required|email"
            />
            <FormKit
            type="password"
            name="password"
            label="Password"
            validation="required"
            />
        </FormKit>
        <p>{{envoie}}</p><p>{{formData.email}}</p><br><p>{{email}}</p><br><p>{{password}}</p>
        
  </section>
</template>

<script>

// import router  from '../router';
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
    }
  },
  methods: {
    login() {

        //router.push('/test');
        axios.post('http://localhost:4000/api/login',
        {
            "email":this.formData.email,
            "password":this.formData.password
        }
        ).then((response) => {
            sessionStorage.setItem('token',response.data.token);
            this.$store.state.ID = response.data.userId;
            this.$store.state.isConnected = "Connecté !";
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
