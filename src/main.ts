import { createApp } from "vue";
import App from "./App.vue";
import "@fontsource/space-grotesk/latin.css";
import "./style.css";
import { resolveSectionHashFromPathname } from "./utils/sectionRouting";
import { setupGlobalErrorHandling } from "./composables/useErrorHandler";

const targetHash = resolveSectionHashFromPathname(window.location.pathname);

if (targetHash) {
  window.history.replaceState({}, "", `/${targetHash}`);
}

const app = createApp(App);

setupGlobalErrorHandling(app);

app.mount("#app");

if (targetHash) {
  requestAnimationFrame(() => {
    document.querySelector(targetHash)?.scrollIntoView({ behavior: "smooth" });
  });
}
