/*
Path: src/content/siteContent.ts
*/

import type { SiteContent } from "../types/domain";

export const siteContent = {
  header: {
    brandShort: "UPP",
    brandFull: "Unión Papelera Platense",
    menuTitle: "Menú",
    menu: {
      products: "Productos / Soluciones",
      industries: "Industrias / Usos",
      sustainability: "Sostenibilidad / Calidad",
      about: "¿Quiénes somos?",
      contact: "Contacto",
      locationSubItem: "¿Dónde estamos?",
      quoteCta: "Cotizar Ahora",
    },
    whatsappPrefilledMessage:
      "Hola, quiero consultar sobre sus productos de papel reciclado.",
  },
  hero: {
    ariaLabel: "Carrusel de productos Papel Onda",
    imageAlt: "Papel Onda - Producto",
    badge: "Venta Directa de Fábrica",
    title: "Bobinas de Papel Onda e Higiene 100% Reciclado",
    description:
      "Fabricamos papel reciclado de alta calidad para cartón corrugado e higiene industrial. Soluciones B2B con entrega directa desde Ringuelet, La Plata.",
    prevSlideAria: "Slide anterior",
    nextSlideAria: "Slide siguiente",
    goToSlidePrefix: "Ir a slide",
  },
  products: {
    sectionTitle: "Categorías de Productos",
    seeAllLabel: "Ver todos",
    categories: [
      {
        id: "onda",
        title: "Papel Onda",
        description:
          "Papel para cartón corrugado: se usa como capa ondulada (medium/fluting) para fabricar planchas y cajas de embalaje.",
        features: ["60-120 gr/m²", "Rigidez y amortiguación"],
      },
      {
        id: "higiene",
        title: "Línea Higiene",
        description: "Bobinas jumbo para institucionales y fraccionadores.",
        features: ["Simple Hoja", "100% Celulosa Reciclada"],
      },
    ],
  },
  industries: {
    title: "Industrias / Usos",
    items: ["Alimentos", "Logística", "Retail", "Mayorista e Industria"],
  },
  sustainability: {
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
  },
  about: {
    badge: "¿Quiénes somos?",
    title: "Unión Papelera Platense",
    description:
      "Fabricamos y comercializamos papel reciclado para uso industrial y mayorista, con foco en calidad constante, atención ágil y abastecimiento confiable para operaciones B2B.",
  },
  location: {
    title: "Entregas en Ringuelet",
    address: "Calle 508 e/ 16 y 17, Ringuelet",
    mapTitle: "Mapa de ubicación en Ringuelet",
  },
  stats: {
    label: "Sostenibilidad",
    recycledTotal: "1500+",
    recycledUnit: "Ton. Recicladas",
    growth: "+15%",
    growthReference: "vs año anterior",
  },
  floatingActions: {
    whatsappLabel: "Cotizar x WhatsApp",
    phoneAriaLabel: "Llamar",
  },
  contact: {
    whatsappNumber: "+54 9 11 2693-5682",
    phoneNumber: "+54 9 11 2693-5682",
  },
} as const satisfies SiteContent;
