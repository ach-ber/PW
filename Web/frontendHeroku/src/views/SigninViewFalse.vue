<template>
  <section>
      <form action="http://localhost:4000/api/" method="post">

            email<input type="email" v-model="email" name ="email" ><br>
            firstname<input type="text" v-model="firstname" name ="firstname" ><br>
            lastname<input type="text" v-model="lastname" name ="lastname" ><br>
            university<select v-model="university">
                <option value="1"> university 1</option>
                </select><br>
            speciality<select v-model="speciality">
                <option value="1">specilaity 1</option>
                </select><br>
            password<input type="password" v-model="password1" name ="password1" ><br>
            confirm password<input type="password" v-model="password2" name ="password2" ><br>
            
            <button type="button" @click="signInButton" >bouton</button>
      </form>
  </section>
</template>

<script>

// import router  from '../router';
const axios = require("axios");

export default {
  name: 'SigninView',
  components: {

  },
  data() {
    return {
        email: "",
        firstname: "",
        lastname : "",
        speciality : "",
        university : "",
        password1 : ""
    }
  },
  methods: {

    signInButton() {
        //router.push('/test');
        axios.post('http://localhost:4000/api/createStudent',
        {
            "id":3,
            "email":this.email,
            "firstname":this.firstname,
            "lastname":this.lastname,
            "speciality":this.speciality,
            "university":this.university,
            "password":this.password1
        }
    )}
  },
};
</script>

<style scoped>


</style>
