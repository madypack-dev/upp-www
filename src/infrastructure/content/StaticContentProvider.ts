/**
 * Infrastructure: Static Content Provider
 * Implementation of IContentProvider for static content from siteContent.ts
 * Suitable for: Client-side bundled applications, no external dependencies
 */

import type { IContentProvider } from "../../domain/content/IContentProvider";
import type {
  SiteContentStructure,
  ContentSection,
  ContentValue,
} from "../../domain/content/ContentSection.types";
import { siteContent } from "../../content/siteContent";

export class StaticContentProvider implements IContentProvider {
  private content: SiteContentStructure;
  private isHealthy: boolean = true;

  // Accept both readonly and mutable content structures
  // Allow any object matching the structure (including readonly variants)
  constructor(content?: any) {
    // Deep copy ensures we have a fully mutable working copy
    // This handles both readonly and mutable inputs safely
    this.content = JSON.parse(JSON.stringify(content || siteContent)) as SiteContentStructure;
  }

  /**
   * Load complete content structure
   * No network/async operations - returns immediately
   */
  async loadContent(): Promise<SiteContentStructure> {
    if (!this.isHealthy) {
      throw new Error("StaticContentProvider is unhealthy");
    }
    return this.content;
  }

  /**
   * Load specific section with type safety
   */
  async loadSection<T extends ContentSection>(
    section: T
  ): Promise<ContentValue<T>> {
    if (!this.isHealthy) {
      throw new Error("StaticContentProvider is unhealthy");
    }

    if (!(section in this.content)) {
      throw new Error(`Section "${String(section)}" not found in static content`);
    }

    return this.content[section] as ContentValue<T>;
  }

  /**
   * Always available for static content
   */
  async isAvailable(): Promise<boolean> {
    return this.isHealthy;
  }

  /**
   * Identify source
   */
  getSource(): string {
    return "StaticContentProvider (src/content/siteContent.ts)";
  }

  /**
   * For testing: simulate provider failure
   */
  setHealthy(healthy: boolean): void {
    this.isHealthy = healthy;
  }
}

/**
 * Factory for creating StaticContentProvider
 * Enables dependency injection and testing
 * Accepts any object matching SiteContentStructure shape (including readonly variants)
 */
export function createStaticContentProvider(content?: any): StaticContentProvider {
  return new StaticContentProvider(content);
}
