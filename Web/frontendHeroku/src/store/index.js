import { createStore } from 'vuex'

export default createStore({
  state: {
    SPECIALITY_SEARCH:"",
    UNIVERSITY_SEARCH:"",
    ID:0,
    count:1,
    isConnected:'Pas Connecté',
    URLAPI:"https://projetwebapi.herokuapp.com/api",
  },
  getters: {
    
  },
  mutations: {
    VERIF_TOKEN(state){
      if (sessionStorage.getItem('token')) {
        state.isConnected = 'Connecté !';
        return (true);
      }
    },
  },
  actions: {
    
  },
  modules: {
  },

  
})
