/**
 * Domain Interface: Content Provider
 * Contract for supplying site content from any source
 * Enables: file-based, API-based, database, test mocks
 */

import type {
  SiteContentStructure,
  ContentSection,
  ContentValue,
} from "./ContentSection.types";

export interface IContentProvider {
  /**
   * Load complete site content structure
   * Throws: ContentNotAvailableError if content cannot be loaded
   */
  loadContent(): Promise<SiteContentStructure>;

  /**
   * Load specific content section
   * Type-safe: Only allows valid section keys
   */
  loadSection<T extends ContentSection>(section: T): Promise<ContentValue<T>>;

  /**
   * Identify source for debugging/auditing
   */
  getSource(): string;

  /**
   * Check if provider is available/healthy
   */
  isAvailable(): Promise<boolean>;
}
