<template>

  <header>
    <div>
      <img src="@/assets/LogoPolytech.png">
      
      <button v-if="connected" @click="logout">Déconnexion</button>
      <div>{{ $store.state.ID }}</div>
    </div>
    <div>
      <router-link class="routerElement" to="/">Home</router-link>
      <router-link class="routerElement" to="/about">About</router-link>
      <router-link class="routerElement" to="/SigninViewBis">SignIn</router-link>
      <router-link v-if="!connected" class="routerElement" to="/LoginViewBis">Login</router-link>
    </div>
    <div>
      <router-link id="PublishHeader" class="routerElement" to="/PublishView">PUBLISH</router-link>

      <router-link v-if="connected" id="AccountHeader" class="routerElement" to="/AccountView">
        <img src="@/assets/account.png">ACCOUNT
      </router-link>

      <router-link  v-if="!connected" id="AccountHeader" class="routerElement" to="/SigninViewBis">
        <img src="@/assets/account.png">SIGN IN
      </router-link>
    </div>
    
  </header>
  
  <router-view></router-view>
  <FooterComponent/>
</template>

<script>

import router  from './router';
import FooterComponent from '@/components/FooterComponent.vue';



export default {
  name: 'App',
  components: {
    FooterComponent,
  },
  data() {
    return {
      connected:false,
    }
  },
  methods: {
    VERIF_TOKEN() {
      this.$store.commit("VERIF_TOKEN")
    },
    logout() {
      sessionStorage.removeItem('token');
      this.$store.state.ID = 0;
      this.$store.state.isConnected = 'Pas Connecté';
      router.go();
    }
  },

  updated() {
    if (sessionStorage.getItem('token')) {
      this.connected = true;
    }
  },

  Monted() {
    this.VERIF_TOKEN();
  },
}
</script>

<style>


header {
  color: black;
  height: 99px;
  width: 100%;
  background-color:white;
  display:flex;
  align-items: center;
  flex-flow: row nowrap;
  font-size: 20px;
  border-bottom: 1px solid #dadce0;
  font-family: 'Montserrat';
  font-weight: 400;
  justify-content: space-between;
}



header div:nth-child(2) .router-link-active{
  color:#1b46c2;
}

header div {
  display:flex;
  align-items: center;
  flex-flow: row nowrap;
  color: black;
  text-decoration: none;
}

header div:nth-child(1) img{
  height:80px;
  border-radius:4px;
  margin-left: 20px;
}

header div .routerElement {
  display: flex;
  color:  #a7a8b2;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  margin: 0px 20px 0px 20px;
}

header div .routerElement:hover {
  color:#1b46c2;
}

#AccountHeader {
  background-color: #1b46c2;
  border: solid 1px #1b46c2;
  height: 50%;
  font-weight: 600;
  font-size:14px;
  border-radius: 4px;
  line-height: 50px;
  padding: 0px 20px 0px 20px;
  font-size:16px;
  color:white;
  transition: background-color 200ms,color 200ms;
}

#AccountHeader img {
  height: 30px;
  margin-right: 10px;
}

header div #AccountHeader:hover {
  background-color:  #12328a;
  border:solid 1px #12328a;
}


#PublishHeader {
  background-color: white;
  border: solid 1px #1b46c2;
  height: 50%;
  color:#1b46c2;
  font-weight: 600;
  font-size:16px;
  line-height: 50px;
  width: 120px;
  border-radius: 4px;
  letter-spacing: 0px;
  display: flex;
  transition: background-color 200ms,color 200ms;
}

header div #PublishHeader:hover {
  background-color:  #1b46c2;
  color:white;
}

h1 {
  background-color: ;
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

@media (max-width: 900px) { 
  header {
    height: 300px;
    flex-flow: column wrap;
    justify-content: center;
  }
  header div{
    align-items: center;
    justify-content: center;
    margin: 0px;
    height: 100px;
  }
}

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
