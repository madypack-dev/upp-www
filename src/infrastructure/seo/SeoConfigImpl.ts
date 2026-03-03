/**
 * Infrastructure: SEO Configuration Implementation
 *
 * Implementación concreta de ISeoConfig.
 * Lee valores SEO desde src/config/copy.ts (single source of truth).
 *
 * SOLID - Single Responsibility Principle:
 * - Responsabilidad única: transformar valores SEO en placeholder map
 * - No almacena valores (vienen de copy.ts)
 * - No contiene lógica de validación
 */

import type { ISeoConfig } from "../../domain/seo/ISeoConfig";
import type {
  PostalAddress,
  OpeningHoursSpecification,
  SeoPlaceholderMap,
} from "../../domain/seo/SeoPlaceholder.types";
import { seoCopy } from "../../config/copy";

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
  operatingHours: readonly OpeningHoursSpecification[];
  businessType: string;
  additionalType: string;
  priceRange: string;
  knowsAbout: readonly string[];
}

/**
 * Implementación de ISeoConfig para UPP
 * Lee valores desde seoCopy (src/config/copy.ts)
 */
export class SeoConfigImpl implements ISeoConfig {
  private readonly data: SeoConfigData;

  // Constructor acepta datos opcionales (para testing), por defecto usa seoCopy
  constructor(data?: Partial<SeoConfigData>) {
    this.data = {
      siteName: data?.siteName ?? seoCopy.siteName,
      siteUrl: data?.siteUrl ?? seoCopy.siteUrl,
      domain: data?.domain ?? seoCopy.domain,
      language: data?.language ?? seoCopy.language,
      organizationName: data?.organizationName ?? seoCopy.organizationName,
      organizationShortName:
        data?.organizationShortName ?? seoCopy.organizationShortName,
      description: data?.description ?? seoCopy.description,
      keywords: data?.keywords ?? seoCopy.keywords,
      author: data?.author ?? seoCopy.author,
      pageTitle: data?.pageTitle ?? seoCopy.pageTitle,
      ogTitle: data?.ogTitle ?? seoCopy.ogTitle,
      ogDescription: data?.ogDescription ?? seoCopy.ogDescription,
      ogImage: data?.ogImage ?? seoCopy.ogImage,
      ogType: data?.ogType ?? seoCopy.ogType,
      twitterCard: data?.twitterCard ?? seoCopy.twitterCard,
      twitterTitle: data?.twitterTitle ?? seoCopy.twitterTitle,
      twitterDescription:
        data?.twitterDescription ?? seoCopy.twitterDescription,
      geoPlaceName: data?.geoPlaceName ?? seoCopy.geoPlaceName,
      geoRegion: data?.geoRegion ?? seoCopy.geoRegion,
      geoLatitude: data?.geoLatitude ?? seoCopy.geoLatitude,
      geoLongitude: data?.geoLongitude ?? seoCopy.geoLongitude,
      address: data?.address ?? seoCopy.address,
      telephone: data?.telephone ?? seoCopy.telephone,
      operatingHours: data?.operatingHours ?? seoCopy.operatingHours,
      businessType: data?.businessType ?? seoCopy.businessType,
      additionalType: data?.additionalType ?? seoCopy.additionalType,
      priceRange: data?.priceRange ?? seoCopy.priceRange,
      knowsAbout: data?.knowsAbout ?? seoCopy.knowsAbout,
    };
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
        })),
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
    if (!this.data.organizationName)
      errors.push("organizationName es requerido");
    if (!this.data.address.country) errors.push("address.country es requerido");
    if (!this.data.telephone) errors.push("telephone es requerido");

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}

/**
 * Factory para crear instancia de SeoConfigImpl
 * Lee valores automáticamente desde seoCopy (src/config/copy.ts)
 * No requiere parámetros - simplemente crea la instancia
 */
export function createSeoConfigImpl(): SeoConfigImpl {
  // Sin parámetros: usa valores de seoCopy automáticamente
  return new SeoConfigImpl();
}
