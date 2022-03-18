<template>
  <section>
      <FormKit v-model="formData" type="form" id="formSignIn"
            submit-label="SignIn"
            @submit="SignIn"
        >
            <FormKit
            name="email"
            label="Email address"
            validation="required|email"
            validation-visibility="live"
            />
            <FormKit
            type="text"
            name="firstname"
            label="firstname"
            validation="required"
            />
            <FormKit
            type="text"
            name="lastname"
            label="lastname"
            validation="required"
            />
            <FormKit
      type="select"
      name="university"
      label="university"
      placeholder="Select an university"
      :options="['Audi', 'BMW', 'Mercedes', 'Volkswagen']"
      validation="required"
    />
            <FormKit
      type="select"
      name="speciality"
      label="speciality"
      placeholder="Select a speciality"
      :options="['Audi', 'BMW', 'Mercedes', 'Volkswagen']"
      validation="required"

    />
            <FormKit
        type="password"
        name="password"
        label="Password"
        validation="required|length:6|matches:/[^a-zA-Z]/"
        :validation-messages="{
          matches: 'Please include at least one symbol',
        }"
        placeholder="Your password"
    
      />
      <FormKit
        type="password"
        name="password_confirm"
        label="Confirm password"
        placeholder="Confirm password"
        validation="required|confirm"
      />
        </FormKit>
        
  </section>
</template>

<script>

// import router  from '../router';
// const axios = require("axios");

export default {
  name: 'SigninViewBis',
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

    SignIn() {
        //router.push('/test');
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
        this.$formkit.reset('formSignIn');
    }
  },
};
</script>

<style scoped>


</style>
