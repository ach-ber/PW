<template>

  <header id="header">
    <div>
      <img src="@/assets/LogoPolytech.png">
      <p> {{$store.state.ID}} </p>
    </div>
    <div>
      <router-link class="routerElement" to="/">Home</router-link>
      <router-link class="routerElement" to="/about">About</router-link>
      <a href="#footer" v-smooth-scroll>Contact</a>
      <router-link v-if="!connected" class="routerElement" to="/SigninViewBis">SignIn</router-link>
      <router-link v-if="!connected" class="routerElement" to="/LoginViewBis">Login</router-link>
    </div>
    <div>
      <button v-if="connected" @click="logout"><img src="@/assets/LogoutIcon.png"></button>

      <router-link id="PublishHeader" class="routerElement" to="/PublishView">PUBLISH</router-link>

      <router-link v-if="connected" id="AccountHeader" class="routerElement" to="/AccountView">
        <img src="@/assets/account.png">ACCOUNT
      </router-link>

      <router-link  v-if="!connected" id="AccountHeader" class="routerElement" to="/SigninViewBis">
        <img src="@/assets/account.png">SIGN IN
      </router-link>
    </div>
    
  </header>
</template>

<script>

import router  from '../router';

export default {
  name: 'HeaderComponent',
  components: {
    
  },
  data() {
    return {
      connected:false,
      id:0,
    }
  },
  methods: {
    VERIF_TOKEN() {
      this.$store.commit("VERIF_TOKEN")
    },
    logout() {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('userId');
      this.$store.state.ID = 0;
      this.connected = false;
    },
  },

  beforeMount() {
    if (sessionStorage.getItem('userId') && sessionStorage.getItem('token')) {
      this.connected = true;
      this.$store.state.ID = sessionStorage.getItem('userId');
    }
    else {
      this.connected = false;
      router.push('/');
    }
  },

  updated() {
    if (sessionStorage.getItem('userId') && sessionStorage.getItem('token')) {
      this.connected = true;
      this.$store.state.ID = sessionStorage.getItem('userId');
    }
    else {
      this.connected = false;
      router.push('/');
    }
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

header div:nth-child(3) button {
  background-color: #FA3402;
  border: solid 1px #FA3402;
  border-radius: 4px;
  margin: 0px 20px 0px 20px;
}

header div:nth-child(3) button:hover {
  background-color: #C72902;
  border: solid 1px #C72902;
  cursor: pointer;
}

header div:nth-child(3) button img{
  height: 20px;
  padding:10px;
  height: 24px;
  padding: 10px 4px 10px 10px;
  
}

header div:nth-child(2) {
  margin-left: 10%;
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

header div .routerElement, header div a {
  display: flex;
  color:  #a7a8b2;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  margin: 0px 20px 0px 20px;
}

header div .routerElement:hover, header div a:hover {
  color:#1b46c2;
  cursor: pointer;
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
  transition: background-color 200ms, color 200ms;
}

header div #PublishHeader:hover {
  background-color:  #1b46c2;
  color:white;
}

/* ------------------------------------------- media queries ------------------------------------------- */

@media (max-width: 1200px) { 
  header div:nth-child(2) {
    margin-left: 0%;
  }
}

@media (max-width: 1000px) { 
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

</style>
