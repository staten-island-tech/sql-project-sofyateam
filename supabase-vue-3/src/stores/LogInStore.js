import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useLogStore = defineStore("logging", {
  state: () => ({
    logged: false,
  }),
  actions: {
    async logOut() {
      this.logged = false;
      const { error } = await supabase.auth.signOut();
    },
  },
  persist: true,
});
