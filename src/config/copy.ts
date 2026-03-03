/**
 * EDITABLE CONTENT - Single Source of Truth
 *
 * ⚠️ IMPORTANTE: Este archivo es la ÚNICA fuente para editar textos y CTAs
 * Sin romper nada. Cambios aquí automáticamente reflejados en toda la app.
 *
 * ESTRUCTURA:
 * - Copy Editorial: Títulos, descripciones, etc.
 * - CTAs: Botones, enlaces, acciones
 * - Metadatos: Palabras clave, descripciones SEO
 *
 * INSTRUCCIONES DE USO:
 * 1. Edita solo DENTRO de las secciones demarcadas
 * 2. NO cambies nombres de propiedades (ej: title → será error)
 * 3. NO cambies estructura (arrays, objetos)
 * 4. Los cambios se reflejan automáticamente en build siguiente
 *
 * PARA MULTI-CLIENTE:
 * - Copiar este archivo a: src/config/copy.{CLIENT}.ts
 * - Reemplazar imports en src/content/siteContent.ts
 * - Listo - sin tocar código de componentes
 */

/**
 * SECCIÓN 1: Header & Navigation
 * Editable: Brand names, menu labels
 */
export const headerCopy = {
  brandShort: "UPP", // ⚠️ Cambiar solo si necesario (affects logo/branding)
  brandFull: "Unión Papelera Platense", // Nombre legal
  menuTitle: "Menú Navigation",
  menu: {
    products: "Productos / Soluciones",
    industries: "Industrias / Usos",
    sustainability: "Sostenibilidad / Calidad",
    about: "¿Quiénes somos?",
    contact: "Contacto",
    locationSubItem: "¿Dónde estamos?",
    quoteCta: "Cotizar Ahora", // CTA principal
  },
  whatsappPrefilledMessage:
    "Hola, quiero consultar sobre sus productos de papel reciclado.",
} as const;

/**
 * SECCIÓN 2: Hero Section
 * ⚠️ CRÍTICO: Esta sección es la primera impresión
 * Editable: Badge, title, description - SIN cambiar estructura
 */
export const heroCopy = {
  ariaLabel: "Carrusel de productos Papel Onda",
  imageAlt: "Papel Onda - Producto disponible en UPP",
  badge: "Venta Directa de Fábrica", // Small tagline
  title: "Bobinas de Papel Onda e Higiene 100% Reciclado", // H1 - crítico para SEO
  description:
    "Fabricamos papel reciclado de alta calidad para cartón corrugado e higiene industrial. Soluciones B2B con entrega directa desde Ringuelet, La Plata.",
  prevSlideAria: "Slide anterior",
  nextSlideAria: "Slide siguiente",
  goToSlidePrefix: "Ir a slide",
} as const;

/**
 * SECCIÓN 3: Product Categories
 * ⚠️ Edible: Nombres, descripciones, features
 * NO editable: Estructura de array (id, title, description, features order)
 */
export const productsCopy = {
  sectionTitle: "Categorías de Productos",
  seeAllLabel: "Ver todos",
  categories: [
    {
      id: "onda", // ⚠️ NO cambiar - used for routing/tracking
      title: "Papel Onda",
      description:
        "Papel para cartón corrugado: se usa como capa ondulada (medium/fluting) para fabricar planchas y cajas de embalaje.",
      features: ["60-120 gr/m²", "Rigidez y amortiguación"],
    },
    {
      id: "higiene", // ⚠️ NO cambiar
      title: "Línea Higiene",
      description: "Bobinas jumbo para institucionales y fraccionadores.",
      features: ["Simple Hoja", "100% Celulosa Reciclada"],
    },
    // Agregar nuevas categorías: copiar estructura arriba
    // {
    //   id: "newCategory",
    //   title: "Nuevo Producto",
    //   description: "Descripción aquí",
    //   features: ["Feature 1", "Feature 2"],
    // }
  ],
} as const;

/**
 * SECCIÓN 4: Industries Section
 * Editable: Nombres de industrias
 */
export const industriesCopy = {
  title: "Industrias / Usos",
  items: ["Alimentos", "Logística", "Retail", "Mayorista e Industria"],
} as const;

/**
 * SECCIÓN 5: Sustainability Claims
 * ⚠️ Crítico para brand positioning
 * Editable: Card titles y descriptions
 */
export const sustainabilityCopy = {
  title: "Sostenibilidad / Calidad",
  cards: [
    {
      title: "Sustentabilidad",
      description: "Papel 100% reciclado",
    },
    {
      title: "Calidad",
      description: "Especificaciones técnicas por producto",
    },
    {
      title: "Trazabilidad",
      description: "Producción con control de lote",
    },
  ],
} as const;

/**
 * SECCIÓN 6: About / Who Are We
 * Editable: Badge, título, descripción larga
 */
export const aboutCopy = {
  badge: "¿Quiénes somos?",
  title: "Unión Papelera Platense",
  description:
    "Fabricamos y comercializamos papel reciclado para uso industrial y mayorista, con foco en calidad constante, atención ágil y abastecimiento confiable para operaciones B2B.",
} as const;

/**
 * SECCIÓN 7: Location
 * ⚠️ NO cambiar dirección sin validar coordenadas en SeoConfigImpl
 * Editable: Textos solamente
 */
export const locationCopy = {
  title: "Entregas en Ringuelet",
  address: "Calle 508 e/ 16 y 17, Ringuelet", // Cambiar solo si cambiar dirección real
  mapTitle: "Mapa de ubicación en Ringuelet",
} as const;

/**
 * SECCIÓN 8: Stats / Social Proof
 * Editable: Números, unidades, mensajes
 */
export const statsCopy = {
  label: "Sostenibilidad",
  recycledTotal: "1500+",
  recycledUnit: "Ton. Recicladas",
  growth: "+15%",
  growthReference: "vs año anterior",
} as const;

/**
 * SECCIÓN 9: Floating Actions
 * ⚠️ CRÍTICO: CTA Principal para conversión (Opción B: WhatsApp/llamada)
 * Editable: Labels solamente
 */
export const floatingActionsCopy = {
  whatsappLabel: "Cotizar x WhatsApp", // Botón principal
  phoneAriaLabel: "Llamar", // Accessibility label
} as const;

/**
 * SECCIÓN 10: Contact Information
 * ⚠️ CRÍTICO: Números deben ser válidos & sincronizados con schema SEO
 * Si cambias aquí, también cambiar en:
 *   - src/infrastructure/seo/SeoConfigImpl.ts (línea ~60)
 *   - docs/gmb-setup.md (para GMB verificación)
 * Editable: Solo valores (no claves)
 */
export const contactCopy = {
  whatsappNumber: "+54 9 11 2693-5682", // Link: wa.me/5492111XXXX
  phoneNumber: "+54 9 11 2693-5682", // Link: tel:+5492111XXXX
  // Para multi-cliente, cambiar los números completos arriba
  // Estructura: +[country] [area] [number]
  // Argentina: +54
} as const;

/**
 * EXPORT: TypeScript type para validación
 * Asegura que no se agreguen props que no existen
 */
export type EditableCopy = {
  header: typeof headerCopy;
  hero: typeof heroCopy;
  products: typeof productsCopy;
  industries: typeof industriesCopy;
  sustainability: typeof sustainabilityCopy;
  about: typeof aboutCopy;
  location: typeof locationCopy;
  stats: typeof statsCopy;
  floatingActions: typeof floatingActionsCopy;
  contact: typeof contactCopy;
  seo: typeof seoCopy;
};

/**
 * SECCIÓN 10: SEO & Metadata
 * Editable: Meta tags, OG tags, geo tags, schema data
 * ⚠️ CRÍTICO: SEO afecta ranking en Google, cambiar con cuidado
 */
export const seoCopy = {
  // Identidad del sitio
  siteName: "UPP | Unión Papelera",
  siteUrl: "https://upp.ar/",
  domain: "upp.ar",
  language: "es_AR",

  // Organización
  organizationName: "Unión Papelera Platense",
  organizationShortName: "UPP",

  // Meta description & keywords (Local SEO)
  description:
    "Unión Papelera Platense: fabricación y comercialización de papel onda e higiene 100% reciclado para industria B2B. Bobinas de calidad, entregas en Ringuelet, La Plata.",
  keywords:
    "papel reciclado, papel onda, papel higiene, bobinas, cartón corrugado, industrial, B2B, Argentina",
  author: "Unión Papelera Platense",

  // Page titles (HTML title + metas)
  pageTitle: "UPP | Unión Papelera - Papel Reciclado Industrial Argentina",

  // Open Graph (Social media sharing)
  ogTitle: "UPP | Unión Papelera - Papel Reciclado Industrial",
  ogDescription:
    "Bobinas de papel onda e higiene 100% reciclado para industria B2B. Soluciones sostenibles con calidad garantizada.",
  ogImage: "https://upp.ar/og-image.jpg",
  ogType: "website",

  // Twitter Card
  twitterCard: "summary_large_image",
  twitterTitle: "UPP | Unión Papelera - Papel Reciclado Industrial",
  twitterDescription:
    "Bobinas de papel onda e higiene 100% reciclado para industria B2B.",

  // Geolocation (Geo-meta tags)
  geoPlaceName: "Ringuelet, La Plata",
  geoRegion: "AR-BA",
  geoLatitude: "-34.8295",
  geoLongitude: "-57.9956",

  // Schema.org: PostalAddress
  address: {
    streetAddress: "Calle 508 e/ 16 y 17",
    locality: "Ringuelet",
    region: "La Plata",
    postalCode: "1900",
    country: "AR",
  },

  // Schema.org: Contact
  telephone: "+54 9 11 2693-5682",

  // Schema.org: Operating hours
  operatingHours: [
    {
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "15:00",
    },
  ],

  // Schema.org: Business type & categories
  businessType: "LocalBusiness",
  additionalType: "ManufacturingBusiness",
  priceRange: "$$",
  knowsAbout: [
    "Papel onda",
    "Papel higiene",
    "Cartón corrugado",
    "Papel reciclado",
  ],
} as const;

/**
 * COMBINED: Todo el contenido editable
 * Exportado para ser usado en siteContent.ts
 */
export const editableCopy = {
  header: headerCopy,
  hero: heroCopy,
  products: productsCopy,
  industries: industriesCopy,
  sustainability: sustainabilityCopy,
  about: aboutCopy,
  location: locationCopy,
  stats: statsCopy,
  floatingActions: floatingActionsCopy,
  contact: contactCopy,
  seo: seoCopy,
} as const satisfies EditableCopy;

/**
 * =============================================================================
 * INSTRUCCIONES PARA MULTI-CLIENTE / COPIA DE REPO
 * =============================================================================
 *
 * SCENARIO 1: Cambio rápido de copy (mismo cliente)
 * ───────────────────────────────────────────────
 * 1. Edita SOLO este archivo (src/config/copy.ts)
 * 2. Guarda cambios
 * 3. Run: npm run build
 * 4. Deploy automático vía GitHub Actions
 * Tiempo: 2 minutos ✅
 *
 * SCENARIO 2: Nuevo cliente (copiar repo)
 * ───────────────────────────────────────
 * 1. git clone <repo>
 * 2. Crear archivo: src/config/copy.{CLIENT_NAME}.ts (copia este)
 * 3. Editar solo valores (mismo formato, diferentes textos)
 * 4. En src/content/siteContent.ts, línea 3:
 *    - Cambiar: import { editableCopy } from "../config/copy"
 *    - A:       import { editableCopy } from "../config/copy.{CLIENT_NAME}"
 * 5. npm run build && npm run deploy
 * Tiempo: 15 minutos ✅
 *
 * SCENARIO 3: Multi-tenant (mismo repo, clientes distintos)
 * ──────────────────────────────────────────────────────────
 * ⚠️ Más complejo pero permite 1 repo para N clientes
 * Requiere:
 *   - API que devuelva copy por dominio/tenant
 *   - O environment variable: process.env.VITE_CLIENT_NAME
 *   - Dynamic import: import(`./copy.${process.env.VITE_CLIENT_NAME}`)
 * Documentado en: docs/multi-client-strategy.md (crear si necesario)
 *
 * =============================================================================
 * SINCRONIZACIÓN: Dónde más cambiar si es necesario
 * =============================================================================
 *
 * Si cambias estos valores, verifica también:
 *
 * ┌─ contactCopy.phoneNumber / contactCopy.whatsappNumber
 * │  ├─ src/infrastructure/seo/SeoConfigImpl.ts (schema telefono)
 * │  └─ docs/gmb-setup.md (para setup manual GMB)
 * │
 * ├─ heroCopy.title
 * │  └─ src/infrastructure/seo/SeoConfigImpl.ts (og:title)
 * │
 * ├─ heroCopy.description
 * │  └─ src/infrastructure/seo/SeoConfigImpl.ts (meta description)
 * │
 * └─ locationCopy.address
 *    └─ src/infrastructure/seo/SeoConfigImpl.ts (schema address)
 *
 * Todos estos SYNC automáticamente si usaste arquitectura limpia ✅
 * (Solo mencionados para awareness)
 *
 * =============================================================================
 */
