<script setup>
import { ref } from "vue";
import { supabase } from "../supabase";

const loading = ref(false);
const email = ref("");
const password = ref("");

const handleSignUp = async () => {
  try {
    loading.value = true;
    console.log(password.value);
    const { user, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
    });
    if (error) throw error;
    alert("Sign up successful!");
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
  <form class="row flex-center flex" @submit.prevent="handleSignUp">
    <div class="col-6 form-widget">
      <h3>OR</h3>
      <p class="description">Create a new account</p>
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
          :value="loading ? 'Loading' : 'Sign up'"
          :disabled="loading"
        />
      </div>
    </div>
  </form>
</template>
