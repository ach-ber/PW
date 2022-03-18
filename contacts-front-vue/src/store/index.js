import { createStore } from 'vuex'

export default createStore({
  state: {
    SPECIALITY_SEARCH:"",
    UNIVERSITY_SEARCH:"",
    ID:0,
    count:1,
    isConnected:'Pas Connecté',
    TOKEN:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTY0NzQyNDQ5MywiZXhwIjoxNjQ3NDI4MDkzfQ.71ygQ039R64rL7KP0F86rhJGNvdH4TTJrZPGOhPdCRQ'
  },
  getters: {
    
  },
  mutations: {
    VERIF_TOKEN(state){
      if (sessionStorage.getItem('token')) {
        state.isConnected = 'Connecté !';
      }
    },
  },
  actions: {
    
  },
  modules: {
  }
})
