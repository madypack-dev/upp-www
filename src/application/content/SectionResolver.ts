/**
 * Application Use Case: Section Resolver
 * Resolves specific content sections with fallbacks
 * Implements SRP: Single responsibility = resolve sections
 */

import type { IContentProvider } from "../../domain/content/IContentProvider";
import type {
  ContentSection,
  ContentValue,
} from "../../domain/content/ContentSection.types";

export interface SectionResolverRequest<T extends ContentSection> {
  section: T;
  throwOnMissing?: boolean;
}

export interface SectionResolverResponse<T extends ContentSection> {
  success: boolean;
  data?: ContentValue<T>;
  error?: string;
  source: string;
}

export class SectionResolver {
  constructor(private contentProvider: IContentProvider) {}

  /**
   * Resolve specific content section with type safety
   */
  async resolve<T extends ContentSection>(
    request: SectionResolverRequest<T>,
  ): Promise<SectionResolverResponse<T>> {
    const { section, throwOnMissing = true } = request;

    try {
      const data = await this.contentProvider.loadSection(section);

      return {
        success: true,
        data,
        source: this.contentProvider.getSource(),
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);

      if (throwOnMissing) {
        throw error;
      }

      return {
        success: false,
        error: `Failed to resolve section "${String(section)}": ${message}`,
        source: this.contentProvider.getSource(),
      };
    }
  }

  /**
   * Resolve multiple sections in parallel
   */
  async resolveBatch<T extends ContentSection>(
    sections: T[],
  ): Promise<Record<T, SectionResolverResponse<T>>> {
    const results = await Promise.all(
      sections.map((section) =>
        this.resolve({ section, throwOnMissing: false }).then((response) => ({
          section,
          response,
        })),
      ),
    );

    return Object.fromEntries(
      results.map(({ section, response }) => [section, response]),
    ) as Record<T, SectionResolverResponse<T>>;
  }
}
