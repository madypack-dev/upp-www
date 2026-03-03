/**
 * SEO Configuration Instance
 *
 * Proporciona la instancia concreta de SeoConfig para la aplicación.
 * Punto de entrada simple que oculta la arquitectura limpia.
 *
 * Puede ser importado como:
 * import { seoConfig } from '@/config/seo'
 *
 * Internamente usa la arquitectura limpia:
 * SeoConfigImpl (Infrastructure) → ISeoConfig (Domain)
 */

export { createSeoConfigImpl as createSeoConfig } from "../infrastructure/seo/SeoConfigImpl";

/**
 * Instancia predeterminada de SeoConfig para UPP
 */
export { createSeoConfigImpl } from "../infrastructure/seo/SeoConfigImpl";

// Para compatibilidad hacia atrás, exportar también la instancia directamente
import { createSeoConfigImpl } from "../infrastructure/seo/SeoConfigImpl";

export const seoConfig = createSeoConfigImpl();
