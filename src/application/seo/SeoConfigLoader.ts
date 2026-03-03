/**
 * Application: SEO Configuration Loader
 *
 * Caso de uso que carga y valida la configuración SEO.
 * - No depende de detalles técnicos (Vite, etc.)
 * - Depende de interfaces de dominio
 * - Puede ser testeado sin dependencias externas
 */

import type { ISeoConfig } from "../../domain/seo/ISeoConfig";

export interface SeoConfigLoaderResult {
  success: boolean;
  config?: ISeoConfig;
  errors: string[];
}

/**
 * Caso de uso: Cargar y validar configuración SEO
 *
 * SOLID - Single Responsibility Principle:
 * - Responsabilidad única: validar y cargar config
 * - No sabe cómo se implementa ISeoConfig
 * - No sabe cómo se transforma el HTML
 */
export class SeoConfigLoader {
  /**
   * Carga la configuración SEO proporcionada
   */
  load(config: ISeoConfig): SeoConfigLoaderResult {
    const validation = config.validate();

    if (!validation.valid) {
      return {
        success: false,
        errors: validation.errors,
      };
    }

    return {
      success: true,
      config,
      errors: [],
    };
  }

  /**
   * Valida que la configuración sea completa
   */
  validate(config: ISeoConfig): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Validaciones básicas
    if (!config.getDomain()) {
      errors.push("Domain es requerido");
    }

    if (!config.getSiteUrl()) {
      errors.push("Site URL es requerida");
    }

    if (!config.getOrganizationName()) {
      errors.push("Organization name es requerido");
    }

    const address = config.getAddress();
    if (!address.country) {
      errors.push("Country en address es requerido");
    }

    if (!config.getTelephone()) {
      errors.push("Telephone es requerido");
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}
