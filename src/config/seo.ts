/**
 * SEO Configuration
 * Centralized configuration for meta tags, Open Graph, Twitter, and JSON-LD schema
 * Used by Vite plugin to dynamically inject values into index.html
 */

export const seoConfig = {
  // Site Identity
  siteName: "UPP | Unión Papelera",
  siteUrl: "https://upp.ar/",
  domain: "upp.ar",
  language: "es_AR",
  
  // Organization
  organizationName: "Unión Papelera Platense",
  organizationShortName: "UPP",
  
  // Meta Description & Keywords
  description: "Unión Papelera Platense: fabricación y comercialización de papel onda e higiene 100% reciclado para industria B2B. Bobinas de calidad, entregas en Ringuelet, La Plata.",
  keywords: "papel reciclado, papel onda, papel higiene, bobinas, cartón corrugado, industrial, B2B, Argentina",
  author: "Unión Papelera Platense",
  
  // Page Title
  pageTitle: "UPP | Unión Papelera - Papel Reciclado Industrial Argentina",
  
  // Open Graph
  ogTitle: "UPP | Unión Papelera - Papel Reciclado Industrial",
  ogDescription: "Bobinas de papel onda e higiene 100% reciclado para industria B2B. Soluciones sostenibles con calidad garantizada.",
  ogImage: "https://upp.ar/og-image.jpg",
  ogType: "website",
  
  // Twitter
  twitterCard: "summary_large_image",
  twitterTitle: "UPP | Unión Papelera - Papel Reciclado Industrial",
  twitterDescription: "Bobinas de papel onda e higiene 100% reciclado para industria B2B.",
  
  // Geolocation
  geoPlaceName: "Ringuelet, La Plata",
  geoRegion: "AR-BA",
  geoLatitude: "-34.8295",
  geoLongitude: "-57.9956",
  
  // Contact & Location
  address: {
    streetAddress: "Calle 508 e/ 16 y 17",
    locality: "Ringuelet",
    region: "La Plata",
    postalCode: "1900",
    country: "AR",
  },
  telephone: "+54 9 11 2693-5682",
  
  // Operating Hours
  operatingHours: [
    {
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "15:00",
    },
  ],
  
  // Business Details
  businessType: "LocalBusiness",
  additionalType: "ManufacturingBusiness",
  priceRange: "$$",
  
  // Products/Services
  knowsAbout: [
    "Papel onda",
    "Papel higiene",
    "Cartón corrugado",
    "Papel reciclado",
  ],
} as const;

/**
 * Helper function to generate complete address string
 */
export function getFullAddress(): string {
  const { streetAddress, locality, region, postalCode, country } = seoConfig.address;
  return `${streetAddress}, ${locality}, ${region}, ${postalCode}, ${country}`;
}

/**
 * Helper function to generate geo coordinates string
 */
export function getGeoCoordinates(): string {
  return `${seoConfig.geoLatitude}, ${seoConfig.geoLongitude}`;
}

/**
 * Helper function to generate geo position (semicolon separated)
 */
export function getGeoPosition(): string {
  return `${seoConfig.geoLatitude};${seoConfig.geoLongitude}`;
}
