<template>
  <header>
    <div>{{ $store.state.isConnected }} | {{ $store.state.ID }}</div>
    <router-link class="routerElement" to="/">Home</router-link>
    <router-link class="routerElement" to="/about">About</router-link>
    <router-link class="routerElement" to="/TheRequete">requete</router-link>
    <router-link class="routerElement" to="/LoginView">Login</router-link>
    <router-link class="routerElement" to="/AccountView">Account</router-link>
    <router-link class="routerElement" to="/SigninView">Signin</router-link>
    <router-link class="routerElement" to="/LoginViewBis">Loginbis</router-link>
    <router-link class="routerElement" to="/PublishView">PublishView</router-link>
    <router-link class="routerElement" to="/ModifyAvis">ModifyAvis</router-link>
  </header>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App',
  components: {

  },
  data() {
    return {
    }
  },
  methods: {
    VERIF_TOKEN() {
      this.$store.commit("VERIF_TOKEN")
    }
  },
  Monted() {
    this.VERIF_TOKEN();
  },
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

header {
  color: black;
  height: 99px;
  width: 100%;
  background-color:white;
  display:flex;
  justify-content: center;
  flex-flow: row nowrap;
  font-size: 20px;
  border-bottom: 1px solid #dadce0;
}

.routerElement {
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  margin: 0px 20px 0px 20px;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
