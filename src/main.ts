import { createApp } from "vue";
import App from "./App.vue";
import "@fontsource/space-grotesk/latin.css";
import "./style.css";
import { resolveSectionHashFromPathname } from "./utils/sectionRouting";

const targetHash = resolveSectionHashFromPathname(window.location.pathname);

if (targetHash) {
  window.history.replaceState({}, "", `/${targetHash}`);
}

createApp(App).mount("#app");

if (targetHash) {
  requestAnimationFrame(() => {
    document.querySelector(targetHash)?.scrollIntoView({ behavior: "smooth" });
  });
}
