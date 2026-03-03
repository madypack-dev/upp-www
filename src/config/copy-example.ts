/*
Path: src/config/copy-example.ts
*/

import type { EditableCopy } from "./copy";

/**
 * Template genérico para nuevos clientes.
 *
 * Uso recomendado:
 * 1) Copiar este archivo a `copy.{CLIENT}.ts`
 * 2) Reemplazar valores (sin cambiar claves/estructura)
 * 3) Importarlo desde `siteContent.ts` si aplica
 */

export const headerCopyExample = {
  brandShort: "ACME",
  brandFull: "ACME Industrial Solutions",
  menuTitle: "Navegación",
  menu: {
    products: "Productos",
    industries: "Industrias",
    sustainability: "Sostenibilidad",
    about: "Nosotros",
    contact: "Contacto",
    locationSubItem: "Ubicación",
    quoteCta: "Solicitar Cotización",
  },
  whatsappPrefilledMessage: "Hola, me interesa conocer sus productos.",
} as const;

export const heroCopyExample = {
  ariaLabel: "Carrusel de productos",
  imageAlt: "Producto destacado",
  badge: "Venta Directa",
  title: "Soluciones Industriales de Alta Calidad",
  description:
    "Fabricamos y comercializamos productos para operaciones B2B, con foco en calidad, entrega confiable y soporte técnico.",
  prevSlideAria: "Slide anterior",
  nextSlideAria: "Slide siguiente",
  goToSlidePrefix: "Ir a slide",
} as const;

export const productsCopyExample = {
  sectionTitle: "Categorías de Productos",
  seeAllLabel: "Ver todos",
  categories: [
    {
      id: "onda",
      title: "Producto A",
      description:
        "Descripción genérica del Producto A para reemplazar según cliente.",
      features: ["Especificación 1", "Especificación 2"],
    },
    {
      id: "higiene",
      title: "Producto B",
      description:
        "Descripción genérica del Producto B para reemplazar según cliente.",
      features: ["Especificación 3", "Especificación 4"],
    },
  ],
} as const;

export const industriesCopyExample = {
  title: "Industrias / Usos",
  items: ["Alimentos", "Logística", "Retail", "Industria"],
} as const;

export const sustainabilityCopyExample = {
  title: "Sostenibilidad / Calidad",
  cards: [
    {
      title: "Sustentabilidad",
      description: "Procesos y materiales con menor impacto ambiental.",
    },
    {
      title: "Calidad",
      description: "Control de calidad constante en cada lote.",
    },
    {
      title: "Trazabilidad",
      description: "Seguimiento de producción de punta a punta.",
    },
  ],
} as const;

export const aboutCopyExample = {
  badge: "¿Quiénes somos?",
  title: "Nombre de la Empresa",
  description:
    "Somos una empresa orientada al mercado B2B, enfocada en eficiencia operativa, calidad y servicio al cliente.",
} as const;

export const locationCopyExample = {
  title: "Cobertura y Entregas",
  address: "Dirección Comercial 123, Ciudad",
  mapTitle: "Mapa de ubicación",
} as const;

export const statsCopyExample = {
  label: "Indicadores",
  recycledTotal: "1000+",
  recycledUnit: "Unidades entregadas",
  growth: "+10%",
  growthReference: "vs año anterior",
} as const;

export const floatingActionsCopyExample = {
  whatsappLabel: "Cotizar por WhatsApp",
  phoneAriaLabel: "Llamar por teléfono",
} as const;

export const contactCopyExample = {
  whatsappNumber: "+54 9 11 0000-0000",
  phoneNumber: "+54 9 11 0000-0000",
} as const;

export const seoCopyExample = {
  siteName: "ACME | Soluciones Industriales",
  siteUrl: "https://example.com/",
  domain: "example.com",
  language: "es_AR",

  organizationName: "ACME Industrial Solutions",
  organizationShortName: "ACME",

  description:
    "Empresa B2B especializada en soluciones industriales, con foco en calidad, entregas confiables y soporte técnico.",
  keywords: "soluciones industriales, B2B, producción, logística, calidad",
  author: "ACME Industrial Solutions",

  pageTitle: "ACME | Soluciones Industriales B2B",

  ogTitle: "ACME | Soluciones Industriales",
  ogDescription:
    "Productos y servicios para operaciones B2B con calidad y respaldo.",
  ogImage: "https://example.com/og-image.jpg",
  ogType: "website",

  twitterCard: "summary_large_image",
  twitterTitle: "ACME | Soluciones Industriales",
  twitterDescription: "Soluciones B2B para industria y logística.",

  geoPlaceName: "Ciudad, Provincia",
  geoRegion: "AR-B",
  geoLatitude: "-34.6037",
  geoLongitude: "-58.3816",

  address: {
    streetAddress: "Calle Ejemplo 123",
    locality: "Ciudad",
    region: "Provincia",
    postalCode: "1000",
    country: "AR",
  },

  telephone: "+54 9 11 0000-0000",

  operatingHours: [
    {
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],

  businessType: "LocalBusiness",
  additionalType: "ManufacturingBusiness",
  priceRange: "$$",
  knowsAbout: ["Industria", "Logística", "Calidad", "Producción"],
} as const;

export const editableCopyExample = {
  header: headerCopyExample,
  hero: heroCopyExample,
  products: productsCopyExample,
  industries: industriesCopyExample,
  sustainability: sustainabilityCopyExample,
  about: aboutCopyExample,
  location: locationCopyExample,
  stats: statsCopyExample,
  floatingActions: floatingActionsCopyExample,
  contact: contactCopyExample,
  seo: seoCopyExample,
} as const satisfies EditableCopy;
