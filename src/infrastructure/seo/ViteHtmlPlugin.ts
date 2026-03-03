/**
 * Infrastructure: Vite HTML Plugin - Inyectable
 *
 * Implementación del plugin Vite que inyecta valores SEO en HTML.
 * Depende de interfaces (ISeoConfig, ISeoTransformer), no de concretos.
 *
 * SOLID - Dependency Inversion Principle:
 * - Depende de ISeoConfig e ISeoTransformer
 * - Las dependencias se inyectan en el constructor
 * - Testeable con mocks
 */

import type { ISeoConfig } from "../../domain/seo/ISeoConfig";
import type { ISeoTransformer } from "../../domain/seo/ISeoTransformer";
import type { SeoTransformationResult } from "../../domain/seo/SeoPlaceholder.types";
import { SeoPlaceholderMapper } from "./SeoPlaceholderMapper";

/**
 * Implementación de ISeoTransformer para uso en Vite
 */
export class ViteHtmlPlugin implements ISeoTransformer {
  constructor(private readonly seoConfig: ISeoConfig) {}

  transform(html: string): SeoTransformationResult {
    const placeholders = this.seoConfig.getPlaceholderMap();
    return SeoPlaceholderMapper.map(html, placeholders);
  }

  getName(): string {
    return "ViteHtmlPlugin";
  }

  /**
   * Crea un plugin de Vite que usa este transformador
   * Retorna el plugin en el formato que Vite espera
   */
  createVitePlugin() {
    return {
      name: "html-seo-injection",
      transformIndexHtml: (html: string) => {
        const result = this.transform(html);
        if (!result.success) {
          console.error("SEO transformation failed:", result.errors);
          return html;
        }
        return result.html;
      },
    };
  }
}
