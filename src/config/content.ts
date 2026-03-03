/**
 * Configuration: Content Layer Orchestration
 * Entry point that hides clean architecture complexity
 * Simple interface for consumers: useContent() composable
 */

import type { IContentPort } from "../application/ports/ContentPort";
import { ContentLoader } from "../application/content/ContentLoader";
import { SectionResolver } from "../application/content/SectionResolver";
import {
  StaticContentProvider,
  createStaticContentProvider,
} from "../infrastructure/content/StaticContentProvider";
import {
  ContentValidator,
  createContentValidator,
} from "../infrastructure/content/ContentValidator";
import type { SiteContentStructure } from "../domain/content/ContentSection.types";

/**
 * Configuration of content infrastructure
 * Dependency Injection container for content layer
 */
class ContentPortImplementation implements IContentPort {
  private provider: StaticContentProvider;
  private validator: ContentValidator;

  constructor() {
    this.provider = createStaticContentProvider();
    this.validator = createContentValidator();
  }

  getProvider() {
    return this.provider;
  }

  getName(): string {
    return "ContentPort (Static Bundled Content)";
  }

  /**
   * Get loader use case with injected dependencies
   */
  getLoader(): ContentLoader {
    return new ContentLoader(this.provider, this.validator);
  }

  /**
   * Get section resolver with injected provider
   */
  getResolver() {
    return new SectionResolver(this.provider);
  }
}

/**
 * Singleton instance of content port
 */
const contentPort = new ContentPortImplementation();

/**
 * Export for direct access
 * Usage: const loader = contentLoader; await loader.load();
 */
export const contentLoader = contentPort.getLoader();
export const sectionResolver = contentPort.getResolver();

/**
 * Factory for creating content port (allows testing)
 */
export function createContentPort(): IContentPort {
  return contentPort;
}

/**
 * Direct access to static content (backward compatible)
 * Usage: const header = siteContent.header;
 */
export async function getContent(): Promise<SiteContentStructure> {
  const result = await contentLoader.load();
  if (!result.success) {
    throw new Error(`Failed to load content: ${result.errors.join(", ")}`);
  }
  return result.content!;
}

export { type IContentPort } from "../application/ports/ContentPort";
export type {
  ContentSection,
  SiteContentStructure,
} from "../domain/content/ContentSection.types";
