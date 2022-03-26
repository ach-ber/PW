<template>
  <main>
    <HeaderComponent/>
    <router-view></router-view>
    <FooterComponent/>
  </main>
</template>

<script>

import FooterComponent from '@/components/FooterComponent.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';



export default {
  name: 'App',
  components: {
    FooterComponent,
    HeaderComponent,
  },
  data() {
    return {
    }
  },
  methods: {
  },
}
</script>

<style>

h1 {
  height: 140px;
  font-family: 'Montserrat';
  font-weight: 600;
  font-size: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.5px;
}

nav {
  margin: 0px 0px 30px 0px;
}

section {
  min-height: 600px;
  padding-bottom: 40px;
}

/* ------------------------------------------- media queries ------------------------------------------- */


@media (max-width: 600px) { 
  div {
    font-size: 12px;
  }
  h1 {
    font-size: 30px;
    margin-left: 0px;
  }
  form[data-v-0eca37cb], form[data-v-0eca37cb]>select{
    font-size: 12px;
  }

  div>section>#formSignIn, div>section>#formLogin,div>section>#formPublish{
    width: 260px;
    flex-flow: column wrap;
    min-width: 260px;
  }

  div>section>#formSignIn>div>div, div>section>#formLogin>div>div, div>section>#formPublish>div>div{
    width: 240px;
  }
}


</style>
