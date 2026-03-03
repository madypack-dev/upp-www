import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { createSeoConfigImpl } from "./src/infrastructure/seo/SeoConfigImpl";
import { ViteHtmlPlugin } from "./src/infrastructure/seo/ViteHtmlPlugin";

/**
 * Vite Configuration
 *
 * Arquitectura Limpia + SOLID:
 * - Instancia SeoConfig (Infrastructure)
 * - Crea ViteHtmlPlugin inyectando SeoConfig (Dependency Injection)
 * - Plugin expone el interfaz que Vite espera
 *
 * Separación de capas:
 * - Infrastructure: declara cómo se implementan cosas
 * - Application: orquesta (no usado en vite.config, pero disponible)
 * - Domain: interfaces y tipos puros
 */

export default defineConfig({
  plugins: [
    vue(),
    (() => {
      // 1. Crear configuración SEO (Infrastructure)
      const seoConfig = createSeoConfigImpl();

      // 2. Crear plugin Vite inyectando config (Dependency Injection)
      const seoPlugin = new ViteHtmlPlugin(seoConfig);

      // 3. Retornar plugin en formato que Vite espera
      return seoPlugin.createVitePlugin();
    })(),
  ],
});
