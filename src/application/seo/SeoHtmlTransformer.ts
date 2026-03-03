/**
 * Application: SEO HTML Transformation Use Case
 *
 * Orquesta la transformación de HTML inyectando placeholders SEO.
 * Depende de interfaces, no de implementaciones concretas.
 */

import type { ISeoConfig } from "../../domain/seo/ISeoConfig";
import type { ISeoTransformer } from "../../domain/seo/ISeoTransformer";
import type { SeoTransformationResult } from "../../domain/seo/SeoPlaceholder.types";

export interface SeoHtmlTransformationRequest {
  html: string;
  config: ISeoConfig;
  transformer: ISeoTransformer;
}

export interface SeoHtmlTransformationResponse {
  success: boolean;
  html?: string;
  replacedCount?: number;
  error?: string;
}

/**
 * Caso de uso: Transformar HTML con placeholders SEO
 *
 * SOLID - Single Responsibility Principle:
 * - Responsabilidad única: orquestar la transformación
 * - Delega validación a SeoConfigLoader
 * - Delega transformación a ISeoTransformer
 *
 * SOLID - Dependency Inversion Principle:
 * - Depende de ISeoConfig e ISeoTransformer
 * - No conoce implementaciones concretas
 */
export class SeoHtmlTransformationUseCase {
  /**
   * Ejecuta la transformación
   */
  execute(request: SeoHtmlTransformationRequest): SeoHtmlTransformationResponse {
    // 1. Validar configuración
    const validation = request.config.validate();
    if (!validation.valid) {
      return {
        success: false,
        error: `Configuración SEO inválida: ${validation.errors.join(", ")}`,
      };
    }

    // 2. Ejecutar transformación
    const result = request.transformer.transform(request.html);

    if (!result.success) {
      return {
        success: false,
        error: `Error en transformación: ${result.errors?.join(", ")}`,
      };
    }

    // 3. Retornar resultado
    return {
      success: true,
      html: result.html,
      replacedCount: result.replacedCount,
    };
  }
}
