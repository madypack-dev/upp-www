/**
 * Domain: SEO HTML Transformer Contract
 *
 * Interface que define cómo se transforma HTML inyectando placeholders SEO.
 * Permite múltiples implementaciones (Vite plugin, CLI, Node.js, etc.)
 */

import type { SeoTransformationResult } from "./SeoPlaceholder.types";

/**
 * Contrato para transformadores SEO
 *
 * SOLID - Open/Closed Principle:
 * - Gracias a esta interfaz, podemos agregar nuevas implementaciones
 *   sin modificar el código existente
 *   Ej: CliSeoTransformer, ServerSideRenderer, etc.
 *
 * SOLID - Dependeny Inversion Principle:
 * - Los clientes dependen de esta interfaz, no de la implementación concreta
 */
export interface ISeoTransformer {
  /**
   * Transforma HTML reemplazando placeholders SEO
   *
   * @param html - HTML con placeholders (%%PLACEHOLDER%%)
   * @returns Resultado de la transformación
   */
  transform(html: string): SeoTransformationResult;

  /**
   * Retorna el nombre del transformador (para debugging)
   */
  getName(): string;
}
