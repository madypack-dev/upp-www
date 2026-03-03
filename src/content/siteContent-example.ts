/*
Path: src/content/siteContent.example.ts

Archivo de ejemplo con texto GENÉRICO para mostrar la estructura de siteContent.
Puedes copiar este objeto como base y reemplazar cada string con contenido real.
*/

import type { SiteContent } from "../types/domain";

export const siteContentExample = {
  header: {
    brandShort: "Marca",
    brandFull: "Nombre Completo de la Marca",
    menuTitle: "Menú",
    menu: {
      products: "Sección Productos",
      industries: "Sección Industrias",
      sustainability: "Sección Sostenibilidad",
      about: "Sección Sobre Nosotros",
      contact: "Sección Contacto",
      locationSubItem: "Subitem Ubicación",
      quoteCta: "CTA Principal",
    },
    whatsappPrefilledMessage: "Mensaje genérico para iniciar conversación.",
  },

  hero: {
    ariaLabel: "Carrusel principal",
    imageAlt: "Imagen destacada",
    badge: "Texto de badge",
    title: "Título principal genérico",
    description: "Descripción breve genérica para la propuesta de valor.",
    prevSlideAria: "Slide anterior",
    nextSlideAria: "Slide siguiente",
    goToSlidePrefix: "Ir a slide",
  },

  products: {
    sectionTitle: "Título de la sección productos",
    seeAllLabel: "Ver todos",
    categories: [
      {
        id: "onda",
        title: "Categoría 1",
        description: "Descripción genérica de la categoría 1.",
        features: ["Feature 1", "Feature 2"],
      },
      {
        id: "higiene",
        title: "Categoría 2",
        description: "Descripción genérica de la categoría 2.",
        features: ["Feature A", "Feature B"],
      },
    ],
  },

  industries: {
    title: "Título de industrias",
    items: ["Industria 1", "Industria 2", "Industria 3", "Industria 4"],
  },

  sustainability: {
    title: "Título de sostenibilidad",
    cards: [
      {
        title: "Valor 1",
        description: "Descripción genérica del valor 1.",
      },
      {
        title: "Valor 2",
        description: "Descripción genérica del valor 2.",
      },
      {
        title: "Valor 3",
        description: "Descripción genérica del valor 3.",
      },
    ],
  },

  about: {
    badge: "Etiqueta sección",
    title: "Título sobre nosotros",
    description: "Descripción institucional genérica.",
  },

  location: {
    title: "Título de ubicación",
    address: "Dirección genérica",
    mapTitle: "Título del mapa",
  },

  stats: {
    label: "Etiqueta métrica",
    recycledTotal: "0000+",
    recycledUnit: "Unidad",
    growth: "+00%",
    growthReference: "Referencia temporal",
  },

  floatingActions: {
    whatsappLabel: "CTA WhatsApp",
    phoneAriaLabel: "Llamar",
  },
} as const satisfies SiteContent;
