/*
Path: src/config/copy-example.ts
*/

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
  brandShort: "MARCA",
  brandFull: "Nombre de Empresa Ejemplo",
  menuTitle: "Menú",
  menu: {
    products: "Productos",
    industries: "Industrias",
    sustainability: "Sostenibilidad",
    about: "Nosotros",
    contact: "Contacto",
    locationSubItem: "Ubicación",
    quoteCta: "Solicitar cotización",
  },
  whatsappPrefilledMessage: "Hola, quiero más información sobre sus productos.",
} as const;

/**
 * SECCIÓN 2: Hero Section
 * ⚠️ CRÍTICO: Esta sección es la primera impresión
 * Editable: Badge, title, description - SIN cambiar estructura
 */
export const heroCopy = {
  ariaLabel: "Carrusel de productos ejemplo",
  imageAlt: "Imagen de producto ejemplo",
  badge: "Etiqueta ejemplo",
  title: "Título principal de ejemplo",
  description:
    "Descripción principal de ejemplo para explicar propuesta de valor del cliente.",
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
  sectionTitle: "Categorías de productos",
  seeAllLabel: "Ver todos",
  categories: [
    {
      id: "onda",
      title: "Producto ejemplo A",
      description: "Descripción de ejemplo para el producto A.",
      features: ["Característica ejemplo 1", "Característica ejemplo 2"],
    },
    {
      id: "higiene",
      title: "Producto ejemplo B",
      description: "Descripción de ejemplo para el producto B.",
      features: ["Característica ejemplo 3", "Característica ejemplo 4"],
    },
  ],
} as const;

/**
 * SECCIÓN 4: Industries Section
 * Editable: Nombres de industrias
 */
export const industriesCopy = {
  title: "Industrias / usos",
  items: ["Industria A", "Industria B", "Industria C", "Industria D"],
} as const;

/**
 * SECCIÓN 5: Sustainability Claims
 * ⚠️ Crítico para brand positioning
 * Editable: Card titles y descriptions
 */
export const sustainabilityCopy = {
  title: "Sostenibilidad / calidad",
  cards: [
    {
      title: "Pilar ejemplo 1",
      description: "Descripción de ejemplo del pilar 1.",
    },
    {
      title: "Pilar ejemplo 2",
      description: "Descripción de ejemplo del pilar 2.",
    },
    {
      title: "Pilar ejemplo 3",
      description: "Descripción de ejemplo del pilar 3.",
    },
  ],
} as const;

/**
 * SECCIÓN 6: About / Who Are We
 * Editable: Badge, título, descripción larga
 */
export const aboutCopy = {
  badge: "Nosotros",
  title: "Nombre de empresa ejemplo",
  description:
    "Descripción institucional de ejemplo para presentar a la empresa.",
} as const;

/**
 * SECCIÓN 7: Location
 * ⚠️ NO cambiar dirección sin validar coordenadas en SeoConfigImpl
 * Editable: Textos solamente
 */
export const locationCopy = {
  title: "Cobertura y entregas",
  address: "Dirección ejemplo 123, Ciudad",
  mapTitle: "Mapa de ubicación ejemplo",
} as const;

/**
 * SECCIÓN 8: Stats / Social Proof
 * Editable: Números, unidades, mensajes
 */
export const statsCopy = {
  label: "Indicador",
  recycledTotal: "1000+",
  recycledUnit: "Unidades",
  growth: "+10%",
  growthReference: "vs periodo anterior",
} as const;

/**
 * SECCIÓN 9: Floating Actions
 * ⚠️ CRÍTICO: CTA Principal para conversión (Opción B: WhatsApp/llamada)
 * Editable: Labels solamente
 */
export const floatingActionsCopy = {
  whatsappLabel: "Cotizar por WhatsApp",
  phoneAriaLabel: "Llamar por teléfono",
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
  whatsappNumber: "+54 9 11 0000-0000",
  phoneNumber: "+54 9 11 0000-0000",
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
  siteName: "Marca Ejemplo | Sitio Web",
  siteUrl: "https://example.com/",
  domain: "example.com",
  language: "es_AR",

  organizationName: "Empresa Ejemplo S.A.",
  organizationShortName: "EJEMPLO",

  description:
    "Descripción SEO de ejemplo para reemplazar por texto real del cliente.",
  keywords: "keyword-ejemplo-1, keyword-ejemplo-2, keyword-ejemplo-3",
  author: "Empresa Ejemplo S.A.",

  pageTitle: "Título SEO de ejemplo",

  ogTitle: "Título OG de ejemplo",
  ogDescription: "Descripción OG de ejemplo para redes sociales.",
  ogImage: "https://example.com/og-image.jpg",
  ogType: "website",

  twitterCard: "summary_large_image",
  twitterTitle: "Título Twitter de ejemplo",
  twitterDescription: "Descripción Twitter de ejemplo.",

  geoPlaceName: "Ciudad ejemplo",
  geoRegion: "AR-C",
  geoLatitude: "-34.6037",
  geoLongitude: "-58.3816",

  address: {
    streetAddress: "Calle Ejemplo 123",
    locality: "Localidad Ejemplo",
    region: "Provincia Ejemplo",
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
  knowsAbout: ["Tema ejemplo 1", "Tema ejemplo 2", "Tema ejemplo 3"],
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
