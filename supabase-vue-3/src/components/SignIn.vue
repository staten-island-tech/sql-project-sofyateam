<script setup>
import { ref } from "vue";
import { supabase } from "../supabase";
import { useLogStore } from "../stores/LogInStore";
import router from "../router";
import { storeToRefs } from "pinia";

const loading = ref(false);
const email = ref("");
const password = ref("");
const logStore = useLogStore();
const { logged } = storeToRefs(logStore);

const handleSignIn = async () => {
  try {
    loading.value = true;
    const { data: user, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });
    if (error) {
      console.log(error.message);
    } else {
      alert("Sign in successful!");
      console.log(user);
      logStore.logged = true;
      router.push("/account");
    }
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    }
  } finally {
    loading.value = false;
  }
};
const clearInputs = () => {
  email.value = "";
  password.value = "";
};
</script>

<template>
  <form class="row flex-center flex" @submit.prevent="handleSignIn">
    <div class="col-6 form-widget">
      <h1 class="header">Budget App</h1>
      <p class="description">Sign in to your account</p>
      <div>
        <input
          class="inputField"
          required
          type="email"
          placeholder="Your email"
          v-model="email"
        />
      </div>
      <div>
        <input
          class="inputField"
          required
          type="password"
          placeholder="Your password"
          v-model="password"
        />
      </div>
      <div>
        <input
          type="submit"
          class="button block"
          :value="loading ? 'Loading' : 'Sign in'"
          :disabled="loading"
        />
      </div>
    </div>
  </form>
</template>
