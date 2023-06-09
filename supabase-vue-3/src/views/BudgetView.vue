<template>
  <div>
    <BudgetEnter v-if="session" :session="session"></BudgetEnter>
    <div v-else>
      Please Log In or Sign Up on the other view to see your information
    </div>
  </div>
</template>

<script setup>
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
