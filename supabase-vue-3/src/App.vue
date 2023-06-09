<script setup>
import HomeView from "./views/HomeView.vue";
import FrontView from "./views/FrontView.vue";
import { onMounted, ref } from "vue";
import { supabase } from "./supabase";
import { useLogStore } from "./stores/LogInStore";
import AccountVIew from "./views/AccountVIew.vue";

const session = ref();
async function checkLog() {
  const { data, error } = await supabase.auth.getSession();
  if (data && data.session == null) {
    useLogStore().logged = false;
  } else {
    useLogStore().logged = true;
    session.value = data;
  }

  console.log(data);
  if (error) throw error;
}

onMounted(() => {
  checkLog();
});
</script>

<template>
  <FrontView></FrontView>
</template>
