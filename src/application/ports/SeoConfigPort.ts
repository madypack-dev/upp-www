/**
 * Application: SEO Config Port (Driven Adapter Pattern)
 *
 * Puerto que define cómo la aplicación accede a la configuración SEO.
 * Los adaptadores en Infrastructure implementan este puerto.
 */

import type { ISeoConfig } from "../../domain/seo/ISeoConfig";

/**
 * Puerto de salida: Acceso a configuración SEO
 *
 * Patrón: Driven Adapter (puertos salientes)
 * - La aplicación depende de este puerto
 * - La infraestructura proporciona la implementación
 *
 * Ventaja: Podemos cambiar de donde viene la config (archivo, BD, API, etc.)
 * sin tocar la lógica de aplicación
 */
export interface ISeoConfigPort {
  /**
   * Carga la configuración SEO
   */
  loadConfig(): Promise<ISeoConfig>;

  /**
   * Retorna información sobre la fuente de configuración (para debugging)
   */
  getSource(): string;
}
