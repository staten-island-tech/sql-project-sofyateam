<template>
  <div>
    <RouterLink to="/front">Front </RouterLink>
    <RouterLink to="/account">SignUp </RouterLink>
    <RouterLink to="/home">LogIn</RouterLink>
    <router-view></router-view>
  </div>
</template>

<script>
import { RouterLink, RouterView } from "vue-router";
export default {};
</script>

<style scoped></style>
