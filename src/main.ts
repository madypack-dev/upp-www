import { createApp } from "vue";
import App from "./App.vue";
import "@fontsource/space-grotesk/latin.css";
import "./style.css";

const sectionPathToHash: Record<string, string> = {
  "/donde-estamos": "#ubicacion",
  "/dondeestamos": "#ubicacion",
  "/industrias-usos": "#industrias-usos",
  "/industrias": "#industrias-usos",
  "/nosotros": "#nosotros",
  "/productos": "#productos",
  "/quienes": "#quienes-somos",
  "/quienes_somos": "#quienes-somos",
  "/quienes-somos": "#quienes-somos",
  "/sostenibilidad": "#sostenibilidad-calidad",
  "/sostenibilidad-calidad": "#sostenibilidad-calidad",
  "/ubicacion": "#ubicacion",
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
