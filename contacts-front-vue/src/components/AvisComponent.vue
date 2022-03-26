<template>
  <a href=''>
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
</template>

<script>
export default {
  name: 'AvisAccountComponent',
  props: ['id','avis','vue','note','date','company','title'],
  data() {
    return {
       items: [
      ],
    }
  },
  methods: {
    modifyAvis() {
      this.count +=1;
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
a {
  /*border: 1px solid  rgb(218, 218, 218);*/
  width: 260px;
  font-family: Montserrat;
  font-size: 12px;
  border-radius: 4px;
  margin: 20px 40px 20px 40px;
  font-family: 'Montserrat';
  overflow: hidden;
  text-decoration: none;
  color:black;
  font-weight: 400;
  line-height: 1.5;
  display: flex;
  align-items: left;
  flex-flow: column wrap;
  text-align: left;
  padding: 20px 20px 20px 20px;
  background-color: white;
}

a>p:nth-child(1) {
  font-size: 14px;
  color: #9da0b8;
  
}

a h2 {
  font-family: Montserrat;
  font-weight: 600;
  line-height: 1.2;
  color:black;
  font-size: 20px;
  margin:10px 0px 10px 0px;
}


a>p:nth-child(3) {
  font-size: 0.8125rem;
  color: #717488;
  height:180px ;
}

a>p:last-child {
  font-size: 0.875rem;
  color: #1b46c2;
}

a>div {
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 10px;

}

a>div:nth-child(4) {
  height: 30px;
  display: flex;
  flex-flow: row nowrap;
  align-items:center;
  justify-content: flex-start;
  margin-bottom: 10px;
}

a>div:nth-child(4) img {
  height: 30px;
}

a>div button {
  width: 40%;
  height: 60%;
  font-family: Montserrat;
  font-weight: 600;
  border: solid 1px #dadce0;
  border-radius: 4px;
}

a>div button:nth-child(1) {
  background-color: white;
}

a>div button:nth-child(2) {
  background-color: red;
  border: solid 1px red;
  color: white;
}

a:hover {
  cursor: pointer;
}

a:hover h2 {
  color:#1b46c2;
}

</style>