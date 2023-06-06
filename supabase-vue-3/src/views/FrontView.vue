<template>
  <div>
    <BudgetEnter v-if="session" :session="session"></BudgetEnter>
    <div v-else>Log in</div>
  </div>
</template>

<script setup>
import BudgetEnter from "../components/BudgetEnter.vue";
import { onMounted, ref } from "vue";
import { supabase } from "../supabase";

const session = ref();

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
