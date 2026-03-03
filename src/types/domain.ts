/*
Path: src/types/domain.ts
*/

export type ProductCategoryId = "onda" | "higiene";

export interface ProductCategory {
  readonly id: ProductCategoryId;
  readonly title: string;
  readonly description: string;
  readonly features: readonly string[];
}

export interface SustainabilityCard {
  readonly title: string;
  readonly description: string;
}

export interface Contact {
  readonly whatsappNumber: string;
  readonly phoneNumber: string;
}

export interface SiteContent {
  header: {
    brandShort: string;
    brandFull: string;
    menuTitle: string;
    menu: {
      products: string;
      industries: string;
      sustainability: string;
      about: string;
      contact: string;
      locationSubItem: string;
      quoteCta: string;
    };
    whatsappPrefilledMessage: string;
  };
  hero: {
    ariaLabel: string;
    imageAlt: string;
    badge: string;
    title: string;
    description: string;
    prevSlideAria: string;
    nextSlideAria: string;
    goToSlidePrefix: string;
  };
  products: {
    sectionTitle: string;
    seeAllLabel: string;
    categories: readonly ProductCategory[];
  };
  industries: {
    title: string;
    items: readonly string[];
  };
  sustainability: {
    title: string;
    cards: readonly SustainabilityCard[];
  };
  about: {
    badge: string;
    title: string;
    description: string;
  };
  location: {
    title: string;
    address: string;
    mapTitle: string;
  };
  stats: {
    label: string;
    recycledTotal: string;
    recycledUnit: string;
    growth: string;
    growthReference: string;
  };
  floatingActions: {
    whatsappLabel: string;
    phoneAriaLabel: string;
  };
  contact: Contact;
}
