import { createApp } from "vue";
import App from "./App.vue";
import "@fontsource/space-grotesk/latin.css";
import "./style.css";

const sectionPathToHash: Record<string, string> = {
  "/nosotros": "#nosotros",
  "/quienes-somos": "#quienes-somos",
};

const targetHash = sectionPathToHash[window.location.pathname];

if (targetHash) {
  window.history.replaceState({}, "", `/${targetHash}`);
}

createApp(App).mount("#app");

if (targetHash) {
  requestAnimationFrame(() => {
    document.querySelector(targetHash)?.scrollIntoView({ behavior: "smooth" });
  });
}
