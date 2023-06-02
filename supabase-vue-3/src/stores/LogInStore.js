import { defineStore } from "pinia";
import session from "Account"
export const useLogInStore = defineStore({
  id: 'LogIn',
  state()=> ({
    user: null,
  }),
})