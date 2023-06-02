import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);
const pinia = createPinia();
app.use(router);
app.use(pinia);
router.beforeEach((to) => {
  const main = useMainStore(pinia);

  if (to.meta.requiresAuth && !main.isLoggedIn) return "/login";
});
app.mount("#app");
