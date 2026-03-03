/**
 * Domain Types for Content Structure
 * Pure type definitions without technical dependencies
 * Each section corresponds to a distinct UI domain
 */

export interface MenuItem {
  products: string;
  industries: string;
  sustainability: string;
  about: string;
  contact: string;
  locationSubItem: string;
  quoteCta: string;
}

export interface HeaderContent {
  brandShort: string;
  brandFull: string;
  menuTitle: string;
  menu: MenuItem;
  whatsappPrefilledMessage: string;
}

export interface HeroContent {
  ariaLabel: string;
  imageAlt: string;
  badge: string;
  title: string;
  description: string;
  prevSlideAria: string;
  nextSlideAria: string;
  goToSlidePrefix: string;
}

export interface ProductCategory {
  id: string;
  title: string;
  description: string;
  features: string[];
}

export interface ProductsContent {
  sectionTitle: string;
  seeAllLabel: string;
  categories: ProductCategory[];
}

export interface IndustriesContent {
  title: string;
  items: string[];
}

export interface SustainabilityCard {
  title: string;
  description: string;
}

export interface SustainabilityContent {
  title: string;
  cards: SustainabilityCard[];
}

export interface AboutContent {
  badge: string;
  title: string;
  description: string;
}

export interface LocationContent {
  title: string;
  address: string;
  mapTitle: string;
}

export interface StatsContent {
  label: string;
  recycledTotal: string;
  recycledUnit: string;
  growth: string;
  growthReference: string;
}

export interface FloatingActionsContent {
  whatsappLabel: string;
  phoneAriaLabel: string;
}

export interface ContactContent {
  whatsappNumber: string;
  phoneNumber: string;
}

/**
 * Complete site content structure
 * All sections combined into unified interface
 */
export interface SiteContentStructure {
  header: HeaderContent;
  hero: HeroContent;
  products: ProductsContent;
  industries: IndustriesContent;
  sustainability: SustainabilityContent;
  about: AboutContent;
  location: LocationContent;
  stats: StatsContent;
  floatingActions: FloatingActionsContent;
  contact: ContactContent;
}

/**
 * Segment of content for section-specific operations
 */
export type ContentSection = keyof SiteContentStructure;

/**
 * Type-safe accessor for any content section
 */
export type ContentValue<T extends ContentSection> = SiteContentStructure[T];
