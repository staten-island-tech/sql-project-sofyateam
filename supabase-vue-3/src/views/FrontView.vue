<template>
  <div>
    <RouterLink to="/budget">Budget </RouterLink>
    <RouterLink to="/account">Account </RouterLink>
  </div>
  <div></div>
  <router-view></router-view>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
import BudgetEnter from "../components/BudgetEnter.vue";
import { onMounted, ref, toRef } from "vue";
import { supabase } from "../supabase";
import Account from "../components/Account.vue";

const session = ref();
const user = ref();

const sessionRef = toRef(session, "value");
onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session;
  });

  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session;
  });
});
</script>

<style scoped></style>
