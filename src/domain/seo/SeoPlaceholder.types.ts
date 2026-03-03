/**
 * Domain: SEO Placeholders
 *
 * Tipos puros del dominio para placeholders SEO.
 * Sin dependencias de Vite, sin efectos secundarios.
 */

/**
 * Representa un placeholder SEO que será reemplazado en tiempo de build
 */
export type SeoPlaceholderId =
  | "SEO_DESCRIPTION"
  | "SEO_KEYWORDS"
  | "SEO_AUTHOR"
  | "SEO_PAGE_TITLE"
  | "OG_URL"
  | "OG_TITLE"
  | "OG_DESCRIPTION"
  | "OG_IMAGE"
  | "OG_TYPE"
  | "OG_LOCALE"
  | "TWITTER_TITLE"
  | "TWITTER_DESCRIPTION"
  | "TWITTER_CARD"
  | "CANONICAL_URL"
  | "GEO_PLACENAME"
  | "GEO_REGION"
  | "GEO_POSITION"
  | "GEO_COORDINATES"
  | "ORG_NAME"
  | "ORG_ADDRESS_STREET"
  | "ORG_ADDRESS_LOCALITY"
  | "ORG_ADDRESS_REGION"
  | "ORG_ADDRESS_POSTAL"
  | "ORG_ADDRESS_COUNTRY"
  | "ORG_TELEPHONE"
  | "ORG_GEO_LAT"
  | "ORG_GEO_LON"
  | "BUSINESS_TYPE"
  | "ADDITIONAL_TYPE"
  | "PRICE_RANGE"
  | "KNOWS_ABOUT"
  | "OPENING_HOURS_JSON";

/**
 * Mapeo de placeholder → valor
 * Ej: "%%SEO_DESCRIPTION%%" → "Unión Papelera..."
 */
export type SeoPlaceholderMap = Record<SeoPlaceholderId, string>;

/**
 * Resultado de una transformación SEO
 */
export interface SeoTransformationResult {
  success: boolean;
  html: string;
  replacedCount: number;
  errors?: string[];
}

/**
 * Información sobre dirección postal
 */
export interface PostalAddress {
  streetAddress: string;
  locality: string;
  region: string;
  postalCode: string;
  country: string;
}

/**
 * Especificación de horarios de operación
 */
export interface OpeningHoursSpecification {
  dayOfWeek: readonly (
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday"
  )[];
  opens: string; // formato HH:mm, ej: "07:00"
  closes: string; // formato HH:mm, ej: "15:00"
}
