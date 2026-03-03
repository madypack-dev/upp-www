export type ProductCategoryId = "onda" | "higiene";

export interface ProductCategory {
  id: ProductCategoryId;
  title: string;
  description: string;
  features: string[];
}

export interface SustainabilityCard {
  title: string;
  description: string;
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
    categories: ProductCategory[];
  };
  industries: {
    title: string;
    items: string[];
  };
  sustainability: {
    title: string;
    cards: SustainabilityCard[];
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
}
