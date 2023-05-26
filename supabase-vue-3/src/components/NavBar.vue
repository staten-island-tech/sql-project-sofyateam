<template>
  <div>
    <RouterLink to="/front">Front</RouterLink>
    <RouterLink to="/account">Profile</RouterLink>
    <router-view></router-view>
  </div>
</template>

<script>
import { RouterLink, RouterView } from "vue-router";
export default {};
</script>

<style scoped></style>
