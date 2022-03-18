<template>
  <nav>
    <form action="http://localhost:4000/api/AccountView" method="post">
      university
      <select v-model="university">
        <option value="1"> university 1</option>
      </select><br>
            speciality
      <select v-model="speciality">
        <option value="1">specilaity 1</option>
      </select><br>
            <button type="button" @click="SearchButton" >bouton</button>
      </form>
      <a v-bind:href="url">{{url}}</a>
  </nav>
  
</template>
<script>

import router  from '../router';

// import packageJson from "../../package.json";
export default {
  data() {
    return {
      url:"val de base",
      speciality:"",
      year:"",
      university:"",
      // version: packageJson.dependencies.vue.substring(1),
    };
  },

  // resolved.href
  methods: {
    SearchButton() {
      this.$store.state.SPECIALITY_SEARCH = this.speciality;
      this.$store.state.UNIVERSITY_SEARCH = this.university;
      router.push('/SearchView');
    }
  }
};
</script>
<style scoped>
nav {
  height: 60px;
  background-color: rgb(218, 218, 218);
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
}
</style>