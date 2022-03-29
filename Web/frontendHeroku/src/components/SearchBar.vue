<template>
  <nav>
    <form action="http://localhost:4000/api/AccountView" method="post">
      university
      <select v-model="formuniversity">
        <option v-for="university in universities" v-bind:value="university.value" :key="university.value" >{{ university.label }}</option>
      </select><br>
            speciality
      <select v-model="formspeciality">
        <option v-for="speciality in specialities" v-bind:value="speciality.value" :key="speciality.value" >{{speciality.label}}</option>
      </select><br>
      <button type="button" @click="SearchButton" ></button>
      </form>
  </nav>
  
</template>
<script>

import router  from '../router';
const axios = require("axios");

// import packageJson from "../../package.json";
export default {
  data() {
    return {
      url:"val de base",
      speciality:"",
      year:"",
      university:"",
      universities:[{}],
      specialities:"",
      formuniversity:2,
      formspeciality:1,
      // version: packageJson.dependencies.vue.substring(1),
    };
  },
    beforeCreate() {
   
    axios.get(this.$store.state.URLAPI+'/university').then(response => this.universities = (response.data))
    axios.get(this.$store.state.URLAPI+'/speciality').then(response => this.specialities = (response.data))
  },


  // resolved.href
  methods: {
    SearchButton() {
      this.$store.state.SPECIALITY_SEARCH = this.formspeciality;
      this.$store.state.UNIVERSITY_SEARCH = this.formuniversity;
      router.push('/SearchView');
    }
  }
};
</script>
<style scoped>
nav {
  height: 100px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
}

form {
  height: 80px;
  border:solid 1px #cdcfd1 ;
  border-radius: 4px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  font-family: 'Montserrat';
  font-weight: 600;
  padding: 0px 20px 0px 20px;
  font-size: 18px;
}

form select {
  height: 60%;
  background-color: white;
  border: solid 1px #cdcfd1 ;
  font-family: Montserrat;
  border-radius: 4px;
  margin: 0px 20px 0px 20px;
  font-size: 18px;
  padding-left: 10px;
}

nav form select option {
  font-family: 'Montserrat';
  font-size: 18px;
}

nav form button {
  background-image: url("@/assets/loupe.png");
  background-size: 60%;
  background-repeat: no-repeat;
  background-position: center;
  width: 50px;
  height: 60%;
  background-color: white;
  border: solid 1px #cdcfd1 ;
  border-radius: 4px;
  transition: background-color 200ms;
}

nav form button:hover, select:hover {
  background-color: rgb(241, 241, 241);
  cursor: pointer;
}

</style>