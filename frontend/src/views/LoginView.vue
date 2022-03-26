<template>
  <section>
      <form action="http://localhost:4000/api/AccountView" method="post">
            email<input type="email" v-model="email" name ="email" ><br>
            password<input type="text" name="password"  v-model="password"><br>{{ email }}<br>{{ password }}<br>
            <button type="button" @click="signInButtonPressed" >bouton</button>
      </form>
  </section>
</template>

<script>

// import router  from '../router';
const axios = require("axios");


export default {
  name: 'LoginView',
  components: {

  },
  data() {
    return {
      email:'pierre.martin@gmail.com',
      password:'erhgherghergerh',
    }
  },
  methods: {

    signInButtonPressed() {

        //router.push('/test');
        axios.post('http://localhost:4000/api/login',
        {
            "email":this.email,
            "password":this.password
        }
        ).then((response) => {
            sessionStorage.setItem('token',response.data.token);
            this.$store.state.isConnected = "Connecté !";
        })
    }
  },
};
</script>

<style scoped>


</style>
