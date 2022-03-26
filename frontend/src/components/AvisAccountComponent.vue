<template>
    <div class="AvisAccount" v-if="!avisSup">
        <div id="messagedel" v-if="messagedel"><p>Êtes vous sûr ?</p>
          <button @click="deleteCancel">NON</button>
          <button @click="deleteConfirm">OUI</button>
        </div>
        <a v-bind:href="href">
            <p>{{date}} | {{company}}</p>
            <h2>{{title}}</h2>
            <p>{{ avis }}</p>
            <div>
              <img :src="items[0].icon">
              <img :src="items[1].icon">
              <img :src="items[2].icon">
              <img :src="items[3].icon">
              <img :src="items[4].icon">
            </div>
            <p>Read more</p>
        </a>
        <div>
            <button  @click="modifyAvis">MODIFIER</button>
            <button @click="deleteAvis">SUPPRIMER</button>
        </div>
    </div>
</template>

<script>

import router  from '../router';
const axios = require("axios");

export default {
  props: ['id','avis','vue','note','date','company','title','href'],
  data() {
    return {
      count:0,
      messagedel:false,
      avisSup:false,
      items: [],
    }
  },
  methods: {
    modifyAvis() {
      router.push('/ModifyAvis/'+this.id);
    },
    deleteAvis() {
      this.messagedel = true;
    },
    deleteCancel() {
      this.messagedel = false;
    },
    deleteConfirm() {
      axios.delete(this.$store.state.URLAPI+'/student/'+this.$store.state.ID+'/avis/'+this.id,
      {
        headers: {
          'Authorization': `Basic ${sessionStorage.getItem('token')}` 
        }
      });
      this.avisSup = true;
    }
  },

  beforeMount() {
    for (let i = 1; i < 6; i++) {
      if(this.note - 2*i>=0) {
        this.items.push({ title: 'fullstar',  icon: require('@/assets/starFull.png') });
      }
      else if (this.note - ((2*i)-1)>=0) {
        this.items.push({ title: 'halfstar', icon: require('@/assets/starHalf.png') });
      }
      else {
        this.items.push({ title: 'emptystar', icon: require('@/assets/starEmpty.png') });
      }
    }
    
  },
};
</script>

<style scoped>
.AvisAccount {
  /*border: 1px solid  rgb(218, 218, 218);*/
  width: 260px;
  font-family: Montserrat;
  font-size: 12px;
  border-radius: 4px;
  margin: 20px;
  font-family: 'Montserrat';
  overflow: hidden;
  color:black;
  font-weight: 400;
  line-height: 1.5;
  display: flex;
  align-items: left;
  flex-flow: column wrap;
  text-align: left;
  padding: 20px 20px 0px 20px;
  background-color: white;
}

.AvisAccount #messagedel{
  position: absolute;
  z-index: 3000;
  display: block;
  background-color: white;
  opacity: 0.9;
  width: 260px;
  height: 340px;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
}

.AvisAccount #messagedel p{
  margin: 80px 0px 40px 0px;
}

.AvisAccount #messagedel button {
  height: 40px;
  transition: background-color 200ms, border-color 200ms;
}

.AvisAccount #messagedel button:nth-child(2) {
  border: solid 1px #dadce0;
  border-radius: 4px;
  color: black;
  background-color: white;
  margin-right: 20px;
}

.AvisAccount #messagedel button:nth-child(2):hover {
  cursor: pointer;
  background-color: rgb(241, 241, 241);
}

.AvisAccount #messagedel button:nth-child(3) {
  background-color: #FA3402;
  border: solid 1px #FA3402;
  color: white;
}

.AvisAccount #messagedel button:nth-child(3):hover {
  cursor: pointer;
  background-color: #C72902;
  border: solid 1px #C72902;
}

.AvisAccount a>div:nth-child(4) {
  height: 30px;
  display: flex;
  flex-flow: row nowrap;
  align-items:center;
  justify-content: flex-start;
  margin-bottom: 10px;
}

.AvisAccount a>div:nth-child(4) img {
  height: 30px;
}

.AvisAccount a{
  text-decoration: none;
}

.AvisAccount a>p:nth-child(1) {
  font-size: 14px;
  color: #9da0b8;
  
}

.AvisAccount a h2 {
  font-family: Montserrat;
  font-weight: 600;
  line-height: 1.2;
  color:black;
  font-size: 20px;
  margin:10px 0px 10px 0px;
  
}


.AvisAccount a>p:nth-child(3) {
  font-size: 0.8125rem;
  color: #717488;
  height:180px ;
}

.AvisAccount a>p:nth-child(5) {
  font-size: 0.875rem;
  color: #1b46c2;
  
}

.AvisAccount>div {
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 10px;
  width: 100%;

}

.AvisAccount div button {
  width: 40%;
  height: 60%;
  font-family: Montserrat;
  font-weight: 600;
  border: solid 1px #dadce0;
  border-radius: 4px;
  transition: background-color 200ms, border-color 200ms;
}

.AvisAccount div button:nth-child(1):hover {
  cursor: pointer;
  background-color: rgb(241, 241, 241);
}

.AvisAccount div button:nth-child(1) {
  background-color: white;
}

.AvisAccount div button:nth-child(2) {
  background-color: #FA3402;
  border: solid 1px #FA3402;
  color: white;
}

.AvisAccount div button:nth-child(2):hover {
  cursor: pointer;
  background-color: #C72902;
  border: solid 1px #C72902;
}

.AvisAccount a:hover {
  cursor: pointer;
}

.AvisAccount a:hover h2{
  color:#1b46c2;
}

</style>