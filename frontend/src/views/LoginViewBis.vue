<template>
  <section>
    <FormKit v-model="formData" id="formLogin" type="form" submit-label="Login" @submit="login">
      <h2>Login</h2>
      <FormKit name="email" label="Email address" validation="required|email" />
      <FormKit type="password" name="password" label="Password" validation="required" />
      <ul v-if="errorLogin" class="formkit-messages" aria-live="assertive">
        <li class="formkit-message" data-message-type="ui">
          Mot de passe ou adresse email incorrect !
        </li>
      </ul>
    </FormKit>
        
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
      errorLogin:false,
    }
  },
  methods: {
    login() {
        axios.post(this.$store.state.URLAPI+'/login',
        {
            "email":this.formData.email.toString(),
            "password":this.formData.password.toString()
        }
        ).then((response) => {
            sessionStorage.setItem('token',response.data.token);
            sessionStorage.setItem('userId',response.data.userId);
            this.$store.state.ID = response.data.userId;
            this.$store.state.isConnected = "Connecté !";
            router.push('/AccountView');
        }).catch(() => {
          this.errorLogin = true;
        })
    }
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

section #formLogin {
  display: flex;
  align-items: center;
  justify-content: start;
  flex-flow: wrap column;
  width:500px;
  border: solid 1px #dadce0;
  margin-top: 40px;
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

section #formLogin>div {
  padding:0px;
  display: flex;
  justify-content: flex-start;
  flex-flow: column wrap;
  height: 120px;
}

section #formLogin>div:last-child div  {
  display: flex;
  justify-content: center;
}

section #formLogin>div:last-child div div {
  display: flex;
  align-items: center;
}

section #formLogin>div:last-child div div button,section #formside form>div div div button{
  width: 180px;
  margin:0px;
  border: solid 1px #1b46c2;
  background-color:#1b46c2;
  font-weight: 600;
  font-size: 16px;
}


section #formLogin>div>div{
  width: 460px;
  
}




</style>
