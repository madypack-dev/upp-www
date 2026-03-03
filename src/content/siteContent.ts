/*
Path: src/content/siteContent.ts

CONTENIDO CENTRALIZADO: Este archivo importa de src/config/copy.ts
↓
Para editar textos, ve directamente a: src/config/copy.ts
(Mismo archivo para todos los clientes/cambios de copy)
*/

import type { SiteContent } from "../types/domain";
import { editableCopy } from "../config/copy";

/**
 * Single source of truth para contenido
 * Importado desde src/config/copy.ts
 *
 * Para cambiar algo:
 * 1. Edita src/config/copy.ts
 * 2. npm run build
 * 3. Done ✅
 */
export const siteContent = {
  header: {
    brandShort: editableCopy.header.brandShort,
    brandFull: editableCopy.header.brandFull,
    menuTitle: editableCopy.header.menuTitle,
    menu: editableCopy.header.menu,
    whatsappPrefilledMessage: editableCopy.header.whatsappPrefilledMessage,
  },
  hero: {
    ariaLabel: editableCopy.hero.ariaLabel,
    imageAlt: editableCopy.hero.imageAlt,
    badge: editableCopy.hero.badge,
    title: editableCopy.hero.title,
    description: editableCopy.hero.description,
    prevSlideAria: editableCopy.hero.prevSlideAria,
    nextSlideAria: editableCopy.hero.nextSlideAria,
    goToSlidePrefix: editableCopy.hero.goToSlidePrefix,
  },
  products: {
    sectionTitle: editableCopy.products.sectionTitle,
    seeAllLabel: editableCopy.products.seeAllLabel,
    categories: editableCopy.products.categories,
  },
  industries: {
    title: editableCopy.industries.title,
    items: editableCopy.industries.items,
  },
  sustainability: {
    title: editableCopy.sustainability.title,
    cards: editableCopy.sustainability.cards,
  },
  about: {
    badge: editableCopy.about.badge,
    title: editableCopy.about.title,
    description: editableCopy.about.description,
  },
  location: {
    title: editableCopy.location.title,
    address: editableCopy.location.address,
    mapTitle: editableCopy.location.mapTitle,
  },
  stats: {
    label: editableCopy.stats.label,
    recycledTotal: editableCopy.stats.recycledTotal,
    recycledUnit: editableCopy.stats.recycledUnit,
    growth: editableCopy.stats.growth,
    growthReference: editableCopy.stats.growthReference,
  },
  floatingActions: {
    whatsappLabel: editableCopy.floatingActions.whatsappLabel,
    phoneAriaLabel: editableCopy.floatingActions.phoneAriaLabel,
  },
  contact: {
    whatsappNumber: editableCopy.contact.whatsappNumber,
    phoneNumber: editableCopy.contact.phoneNumber,
  },
} as const satisfies SiteContent;
