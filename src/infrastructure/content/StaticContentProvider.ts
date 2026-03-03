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

  constructor(content: SiteContentStructure = siteContent) {
    this.content = content;
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
 */
export function createStaticContentProvider(
  content?: SiteContentStructure
): StaticContentProvider {
  return new StaticContentProvider(content);
}
