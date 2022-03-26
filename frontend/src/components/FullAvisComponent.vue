<template>
  <article>
    <p>{{date.substring(0,10).replace('-','/').replace('-','/')}} | {{company}}</p>
    <h2>{{title}}</h2>
    <div><img src="@/assets/LocationIcon.png">{{ university }}<img src="@/assets/SpecialityIcon.png">{{ speciality }}</div>
    <p>{{avis}}</p>
    <div>
      <img :src="items[0].icon">
      <img :src="items[1].icon">
      <img :src="items[2].icon">
      <img :src="items[3].icon">
      <img :src="items[4].icon">
    </div>
    <a :href="lienmail" ><img src="@/assets/EmailIcon.png">Contacter</a>
  </article>
</template>

<script>


export default {
  name: 'FullAvisComponent',
  props: ['id','avis','note','date','speciality','university','company','title','email'],
  data() {
    return {
       items: [],
       lienmail:"mailto:"+this.email,
    }
  },
  methods: {
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
  }
};
</script>

<style scoped>

article {
  width: 260px;
  font-family: Montserrat;
  margin: 20px 0px 40px 0px;
  width: 40%;
  min-width: 600px;
  max-width: 1000px;
  display: flex;
  align-items: flex-start;
  justify-content: start;
  flex-flow: wrap column;
  border: solid 1px #dadce0;
  padding: 60px;
}

article p {
    text-align: left;
}

article>p:nth-child(1) {
  font-size: 18px;
  color: #9da0b8;
  
}

article>div:nth-child(3) {
  font-size: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 10px;
}

article>div:nth-child(3) img{
  height: 40px;
  margin: 0px 20px 0px 20px;
}

article p:nth-child(4) {
    color: #717488;
    font-size: 18px;
    line-height: 1.3em;
    margin: 20px 0px 20px 0px;
}

article div:nth-child(5) img{
    height: 40px;
}

article h2 {
  font-family: Montserrat;
  font-weight: 600;
  line-height: 1.2;
  color:black;
  font-size: 28px;
  margin:10px 0px 10px 0px;
}

article a {
  background-color: #1b46c2;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color:white;
  font-weight: 600;
  font-size:16px;
  border-radius: 4px;
  line-height: 50px;
  padding: 0px 20px 0px 10px;
  margin-top: 30px;
  transition: background-color 200ms;
}

article a img {
  height: 20px;
  margin: 0px 10px 0px 10px;
}

article a:hover {
  background-color:  #12328a;
}

</style>