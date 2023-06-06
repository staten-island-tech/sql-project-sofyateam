import { defineStore } from "pinia";
import { supabase } from "../supabase.js";

export const userStore = defineStore("user", {
  state: () => ({
    user: null,
    booking: {},
  }),
  actions: {
    getUser() {
      this.user = supabase.auth.getUser();
    },
  },
});
