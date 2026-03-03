/**
 * Domain: SEO Configuration Contract
 *
 * Interface que define el contrato para cualquier implementación de configuración SEO.
 * Aplicar DIP: Los casos de uso dependen de esta interfaz, no de la implementación concreta.
 */

import type {
  PostalAddress,
  OpeningHoursSpecification,
  SeoPlaceholderMap,
} from "./SeoPlaceholder.types";

/**
 * Contrato para configuración SEO
 *
 * SOLID - Interface Segregation Principle:
 * - Interface pequeña y específica
 * - Solo métodos que son realmente necesarios
 *
 * SOLID - Dependency Inversion Principle:
 * - Las clases dependen de esta interfaz, no de la implementación concreta
 */
export interface ISeoConfig {
  /**
   * Obtiene todos los placeholders mapeados a sus valores
   */
  getPlaceholderMap(): SeoPlaceholderMap;

  /**
   * Obtiene un placeholder específico por ID
   */
  getPlaceholder(id: string): string | undefined;

  /**
   * Obtiene el dominio del sitio
   */
  getDomain(): string;

  /**
   * Obtiene URL completa del sitio
   */
  getSiteUrl(): string;

  /**
   * Obtiene nombre de la organización
   */
  getOrganizationName(): string;

  /**
   * Obtiene dirección postal
   */
  getAddress(): PostalAddress;

  /**
   * Obtiene horarios de operación
   */
  getOperatingHours(): readonly OpeningHoursSpecification[];

  /**
   * Obtiene teléfono de contacto
   */
  getTelephone(): string;

  /**
   * Valida que la configuración sea válida
   */
  validate(): { valid: boolean; errors: string[] };
}
