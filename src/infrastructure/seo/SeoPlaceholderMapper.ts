/**
 * Infrastructure: SEO Placeholder Mapper
 *
 * Responsabilidad única: mapear un HTML con placeholders.
 * Puramente funcional - sin estado, sin dependencias de Vite.
 *
 * SOLID - Single Responsibility Principle:
 * - Responsabilidad única: reemplazar placeholders en HTML
 * - Testeable en aislamiento
 * - Reutilizable en cualquier contexto (Vite, Node.js CLI, etc.)
 */

import type {
  SeoPlaceholderMap,
  SeoTransformationResult,
} from "../../domain/seo/SeoPlaceholder.types";

/**
 * Mapea placeholders en HTML usando valores SEO
 *
 * Ejemplo:
 * input:  <meta name="description" content="%%SEO_DESCRIPTION%%" />
 * output: <meta name="description" content="Unión Papelera..." />
 */
export class SeoPlaceholderMapper {
  /**
   * Reemplaza placeholders en HTML
   *
   * @param html - HTML con placeholders en formato %%KEY%%
   * @param placeholders - Mapa de KEY → valor
   * @returns Resultado con HTML transformado
   */
  static map(
    html: string,
    placeholders: SeoPlaceholderMap,
  ): SeoTransformationResult {
    let transformed = html;
    let replacedCount = 0;
    const errors: string[] = [];

    try {
      // Para cada placeholder, crear regex y reemplazar
      for (const [key, value] of Object.entries(placeholders)) {
        const placeholder = `%%${key}%%`;
        const pattern = new RegExp(placeholder, "g");
        const matches = transformed.match(pattern) || [];

        if (matches.length > 0) {
          transformed = transformed.replace(pattern, value);
          replacedCount += matches.length;
        }
      }

      return {
        success: true,
        html: transformed,
        replacedCount,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      return {
        success: false,
        html: transformed,
        replacedCount,
        errors: [`Error mapping placeholders: ${errorMessage}`],
      };
    }
  }

  /**
   * Valida que no hay placeholders sin reemplazar
   * (útil para QA/testing)
   */
  static validateNoPlaceholders(html: string): {
    valid: boolean;
    unreplaced: string[];
  } {
    const placeholderPattern = /%%[A-Z_]+%%/g;
    const matches = html.match(placeholderPattern) || [];

    return {
      valid: matches.length === 0,
      unreplaced: [...new Set(matches)], // Unique
    };
  }

  /**
   * Cuenta cuántos placeholders hay en el HTML
   */
  static countPlaceholders(html: string): number {
    const placeholderPattern = /%%[A-Z_]+%%/g;
    return (html.match(placeholderPattern) || []).length;
  }
}
