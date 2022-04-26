<template>
  <nav class="navbar navbar-light bg-light">
    <div>
      <span class="navbar-brand mb-0 h1">My Contacts</span>
      <span class="techno">with Vue {{ version }}</span>
    </div>
  </nav>
</template>
<script>
import packageJson from "../../package.json";
export default {
  data() {
    return {
      version: packageJson.dependencies.vue.substring(1),
    };
  },
};
</script>
<style scoped>
.navbar.navbar-light.bg-light {
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>