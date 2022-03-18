<template>
  <a href='http://localhost:8081/#/AvisView/1'>
    <h3>Avis # {{ id }}</h3>
    <p>Contenu de l'avis {{ avis }}</p>
    <p>note {{  }}</p>
    <p>date {{  }}</p>
    <p>company {{  }}</p>
    <p>student {{  }}</p>
  </a>
</template>

<script>
export default {
  props: ['id','avis']
};
</script>

<style scoped>
a {
  border: 1px solid  rgb(218, 218, 218);
  width: 200px;
  height: 200px;
  font-size: 12px;
  border-radius: 4px;
  margin: 20px;
}

a:hover {
  cursor: pointer;
}
</style>