<template>
  <section>
    <div class="success" v-if="completePublish">Submitted successfully!</div>
    <div class="success" v-if="completeCompany">Submitted successfully!</div>
    <FormKit v-model="formDataAvis" type="form" id="formPublish" submit-label="Publish" @submit="Publish" v-if="publishside">
        <h2>Publish</h2>
        <FormKit type="text" name="title" label="title" validation="required" />
        <FormKit type="textarea" name="avis" label="Décrivez votre stage !" validation="required" />
        <FormKit type="range"  name="note" label="note" min="0" max="10" />
        <FormKit type="date"  name="date" label="date" validation="required"/>
        <FormKit type="select" name="company" label="Company" placeholder="Select a company" :options="companies" validation="required" />
        <div>
          <div>
            <label class="formkit-label">Don't find yours ?</label>
            <button class="formkit-input" v-on:click="publishside = false, completePublish=false" v-if="publishside">ADD A COMPANY</button>
          </div>
        </div>
        
    </FormKit>
    <div id="formside" v-if="!publishside">
    <FormKit v-model="formDataCompany" type="form" id="formcompany" submit-label="ADD" @submit="Add" v-if="!publishside" >
        <h2>Add a company</h2>
        <FormKit type="text" name="name" label="name" validation="required|(500)company_exists" :validation-messages="{ company_exists: 'company already exists' }" :validation-rules="{ company_exists }" />
    </FormKit>
    <h2>Back to Publish</h2>
    <button v-on:click="publishfunc" >BACK</button>
    </div>
    
    
  </section>
</template>

<script setup>

const company_exists = async function ({ value }) {
    let rep = [];
    await axios.get('http://localhost:4000/api/company').then((response) => {
      rep = response.data;
    });
    for (let elt of rep) {
      if(value == elt.label) {
        return new Promise((resolve) => { 
      setTimeout(() => resolve(value != elt.label), 1)
      })
      }
    }
    return new Promise((resolve) => { 
      setTimeout(() => resolve(value != ""),1)
    })
    
}
</script>

<script>


const axios = require("axios");

export default {
  name: 'PublishView',
  components: {

  },
  data() {
    return {
        publishside:true,
        completePublish:false,
        completeCompany:false,
        companies:[],
        company: [],
        formDataAvis:"test",
    }
  },
  methods: {
    publishfunc() {
        this.publishside = true;
        this.completeCompany=false;
    },

    Publish() {
      
        axios.post(this.$store.state.URLAPI+'/createavis',
        {
            "avis":this.formDataAvis.avis.toString(),
            "date":this.formDataAvis.date.toString(),
            "ids":this.$store.state.ID,
            "idc":this.formDataAvis.company.toString(),
            "note":this.formDataAvis.note,
            "title":this.formDataAvis.title.toString()
        },{
          headers: {
            'Authorization': `Basic ${sessionStorage.getItem('token')}` 
          }
        })
        this.completePublish = true;
        this.$formkit.reset('formPublish');
        //router.push('/test');
    },
    Add() {
        axios.post(this.$store.state.URLAPI+'/createcompany',this.formDataCompany,
        {
          headers: {
            'Authorization': `Basic ${sessionStorage.getItem('token')}` 
          }
        });
        this.completeCompany = true;
        this.$formkit.reset('formcompany');
    }
  },
  updated() {
    axios.get(this.$store.state.URLAPI+'/company').then(response => this.companies = (response.data))
  },


};
</script>


<style>

section #formPublish{
  margin: 20px 0px 40px 0px;
  width: 80%;
  min-width: 800px;
  max-width: 1000px;
  display: flex;
  align-items: center;
  justify-content: start;
  flex-flow: wrap row;
  border: solid 1px #dadce0;
  padding-bottom: 40px;
}

section #formPublish{
  justify-content: center;
}

form>div>div .formkit-label {
  font-family: 'Montserrat';
  font-weight: 600;
  font-size: 22px;
  line-height: 1.2;
  color:black;
}

section #formPublish>div {
  padding:0px;
  display: flex;
  justify-content: flex-start;
  flex-flow: column wrap;
  width: 80%;
  margin:  20px 10% 0px 10%;
  height: 120px;
}



section #formPublish>div:nth-child(3) {
  height: 200px;
}

section #formPublish>div>div {
  width: 100%;
  max-width: 100%;
}

section #formPublish>div:nth-child(4), section #formPublish>div:nth-child(5),section #formPublish>div:nth-child(6),section #formPublish>div:nth-child(7)  {
  width: 30%;
}

section #formPublish>div:nth-child(4) div div input {
  border:none;
}

section #formPublish>div:nth-child(7)>div>button{
 border: solid 1px #1b46c2;
 color:#1b46c2;
}

section #formPublish>div:nth-child(7)>div>button:hover {
  cursor: pointer;
  background-color: #1b46c2;
  color: white;
}

section #formPublish>div:nth-child(7) button{
  background-color: white;
 
}

section #formPublish>div:last-child, section #formside form>div:nth-child(4) {
   height: 60px;
   margin-top: 40px;
}

section #formPublish>div:last-child div  {
  display: flex;
  justify-content: center;
}

section #formPublish>div:last-child div div {
  display: flex;
  align-items: center;
}

section #formPublish>div:last-child div div button,section #formside form>div div div button{
  width: 180px;
  margin:0px;
  border: solid 1px #1b46c2;
  background-color:#1b46c2;
  font-weight: 600;
  font-size: 16px;
}

section #formPublish>div>div{
  margin: 0px;
}

section #formPublish>div>div>div{
  margin: 0px;

}

section #formPublish>div>div>div>input {
  margin: 0px;
  border:solid 1px #dadce0;
}

/* ------------------------------------------- form company ------------------------------------------- */

section #formside {
  display: flex;
  align-items: center;
  justify-content: start;
  flex-flow: wrap column;
  width:500px;
  border: solid 1px #dadce0;
  margin-top: 20px;
  padding-bottom: 40px;
}

section #formside h2{
  font-weight: 600;
  color: #000;
  font-size: 2.25rem;
  margin: 40px 0px 40px 0px;
}

section #formside form>div {
  display: flex;
  justify-content: flex-start;
  flex-flow: column wrap;
  height: 110px;
}

section #formside form>div:last-child {
  height: 60px;
}

section #formside form>div:last-child div div {
  display: flex;
  align-items: center;
  justify-content: center;
}

section #formside>button{
  width: 180px;
  margin:0px;
  border: solid 1px #1b46c2;
  background-color: white;
  font-weight: 600;
  height: 48px;
  font-size: 16px;
  font-family: 'Montserrat';
  color:#1b46c2;
  border-radius:4px;
}

section #formside button:hover {
  background-color: #1b46c2;
  color: white;
  cursor: pointer;
}

</style>
