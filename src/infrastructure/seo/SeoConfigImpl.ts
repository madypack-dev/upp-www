/**
 * Infrastructure: SEO Configuration Implementation
 *
 * Implementación concreta de ISeoConfig.
 * Contiene la definición de valores SEO para UPP.
 *
 * SOLID - Single Responsibility Principle:
 * - Responsabilidad única: almacenar valores SEO
 * - No contiene lógica de transformación o validación
 * - Los casos de uso pueden testear sin esta clase
 */

import type { ISeoConfig } from "../../domain/seo/ISeoConfig";
import type {
  PostalAddress,
  OpeningHoursSpecification,
  SeoPlaceholderMap,
} from "../../domain/seo/SeoPlaceholder.types";

interface SeoConfigData {
  siteName: string;
  siteUrl: string;
  domain: string;
  language: string;
  organizationName: string;
  organizationShortName: string;
  description: string;
  keywords: string;
  author: string;
  pageTitle: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogType: string;
  twitterCard: string;
  twitterTitle: string;
  twitterDescription: string;
  geoPlaceName: string;
  geoRegion: string;
  geoLatitude: string;
  geoLongitude: string;
  address: PostalAddress;
  telephone: string;
  operatingHours: OpeningHoursSpecification[];
  businessType: string;
  additionalType: string;
  priceRange: string;
  knowsAbout: string[];
}

/**
 * Implementación de ISeoConfig para UPP
 */
export class SeoConfigImpl implements ISeoConfig {
  private readonly data: SeoConfigData;

  constructor(data: SeoConfigData) {
    this.data = data;
  }

  getPlaceholderMap(): SeoPlaceholderMap {
    return {
      SEO_DESCRIPTION: this.data.description,
      SEO_KEYWORDS: this.data.keywords,
      SEO_AUTHOR: this.data.author,
      SEO_PAGE_TITLE: this.data.pageTitle,
      OG_URL: this.data.siteUrl,
      OG_TITLE: this.data.ogTitle,
      OG_DESCRIPTION: this.data.ogDescription,
      OG_IMAGE: this.data.ogImage,
      OG_TYPE: this.data.ogType,
      OG_LOCALE: this.data.language,
      TWITTER_TITLE: this.data.twitterTitle,
      TWITTER_DESCRIPTION: this.data.twitterDescription,
      TWITTER_CARD: this.data.twitterCard,
      CANONICAL_URL: this.data.siteUrl,
      GEO_PLACENAME: this.data.geoPlaceName,
      GEO_REGION: this.data.geoRegion,
      GEO_POSITION: `${this.data.geoLatitude};${this.data.geoLongitude}`,
      GEO_COORDINATES: `${this.data.geoLatitude}, ${this.data.geoLongitude}`,
      ORG_NAME: this.data.organizationName,
      ORG_ADDRESS_STREET: this.data.address.streetAddress,
      ORG_ADDRESS_LOCALITY: this.data.address.locality,
      ORG_ADDRESS_REGION: this.data.address.region,
      ORG_ADDRESS_POSTAL: this.data.address.postalCode,
      ORG_ADDRESS_COUNTRY: this.data.address.country,
      ORG_TELEPHONE: this.data.telephone,
      ORG_GEO_LAT: this.data.geoLatitude,
      ORG_GEO_LON: this.data.geoLongitude,
      BUSINESS_TYPE: this.data.businessType,
      ADDITIONAL_TYPE: this.data.additionalType,
      PRICE_RANGE: this.data.priceRange,
      KNOWS_ABOUT: JSON.stringify(this.data.knowsAbout),
      OPENING_HOURS_JSON: JSON.stringify(
        this.data.operatingHours.map((h) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: h.dayOfWeek,
          opens: h.opens,
          closes: h.closes,
        }))
      ),
    };
  }

  getPlaceholder(id: string): string | undefined {
    const map = this.getPlaceholderMap();
    return map[id as keyof SeoPlaceholderMap];
  }

  getDomain(): string {
    return this.data.domain;
  }

  getSiteUrl(): string {
    return this.data.siteUrl;
  }

  getOrganizationName(): string {
    return this.data.organizationName;
  }

  getAddress(): PostalAddress {
    return this.data.address;
  }

  getOperatingHours(): OpeningHoursSpecification[] {
    return this.data.operatingHours;
  }

  getTelephone(): string {
    return this.data.telephone;
  }

  validate(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!this.data.domain) errors.push("domain es requerido");
    if (!this.data.siteUrl) errors.push("siteUrl es requerido");
    if (!this.data.organizationName) errors.push("organizationName es requerido");
    if (!this.data.address.country) errors.push("address.country es requerido");
    if (!this.data.telephone) errors.push("telephone es requerido");

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}

/**
 * Factory para crear instancia de SeoConfigImpl de UPP
 */
export function createSeoConfigImpl(): SeoConfigImpl {
  return new SeoConfigImpl({
    siteName: "UPP | Unión Papelera",
    siteUrl: "https://upp.ar/",
    domain: "upp.ar",
    language: "es_AR",
    organizationName: "Unión Papelera Platense",
    organizationShortName: "UPP",
    description:
      "Unión Papelera Platense: fabricación y comercialización de papel onda e higiene 100% reciclado para industria B2B. Bobinas de calidad, entregas en Ringuelet, La Plata.",
    keywords:
      "papel reciclado, papel onda, papel higiene, bobinas, cartón corrugado, industrial, B2B, Argentina",
    author: "Unión Papelera Platense",
    pageTitle: "UPP | Unión Papelera - Papel Reciclado Industrial Argentina",
    ogTitle: "UPP | Unión Papelera - Papel Reciclado Industrial",
    ogDescription: "Bobinas de papel onda e higiene 100% reciclado para industria B2B. Soluciones sostenibles con calidad garantizada.",
    ogImage: "https://upp.ar/og-image.jpg",
    ogType: "website",
    twitterCard: "summary_large_image",
    twitterTitle: "UPP | Unión Papelera - Papel Reciclado Industrial",
    twitterDescription: "Bobinas de papel onda e higiene 100% reciclado para industria B2B.",
    geoPlaceName: "Ringuelet, La Plata",
    geoRegion: "AR-BA",
    geoLatitude: "-34.8295",
    geoLongitude: "-57.9956",
    address: {
      streetAddress: "Calle 508 e/ 16 y 17",
      locality: "Ringuelet",
      region: "La Plata",
      postalCode: "1900",
      country: "AR",
    },
    telephone: "+54 9 11 2693-5682",
    operatingHours: [
      {
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "15:00",
      },
    ],
    businessType: "LocalBusiness",
    additionalType: "ManufacturingBusiness",
    priceRange: "$$",
    knowsAbout: ["Papel onda", "Papel higiene", "Cartón corrugado", "Papel reciclado"],
  });
}
