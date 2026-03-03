/**
 * Application Use Case: Content Loader
 * Orchestrates loading and validating site content
 * Implements SRP: Single responsibility = load and validate
 */

import type { IContentProvider } from "../../domain/content/IContentProvider";
import type { IContentValidator } from "../../domain/content/IContentValidator";
import type { SiteContentStructure } from "../../domain/content/ContentSection.types";

export interface ContentLoaderRequest {
  skipValidation?: boolean;
}

export interface ContentLoaderResponse {
  success: boolean;
  content?: SiteContentStructure;
  errors: string[];
  warnings: string[];
  source: string;
}

export class ContentLoader {
  constructor(
    private contentProvider: IContentProvider,
    private contentValidator: IContentValidator,
  ) {}

  /**
   * Load content from provider and validate
   */
  async load(
    request: ContentLoaderRequest = {},
  ): Promise<ContentLoaderResponse> {
    const errors: string[] = [];
    const warnings: string[] = [];

    try {
      // Check provider availability
      const isAvailable = await this.contentProvider.isAvailable();
      if (!isAvailable) {
        errors.push(
          `Content provider unavailable: ${this.contentProvider.getSource()}`,
        );
        return {
          success: false,
          errors,
          warnings,
          source: this.contentProvider.getSource(),
        };
      }

      // Load content
      const content = await this.contentProvider.loadContent();

      // Validate if requested
      if (!request.skipValidation) {
        const validationResult = this.contentValidator.validate(content);
        if (!validationResult.isValid) {
          validationResult.errors.forEach((error) => {
            errors.push(`[${error.section}] ${error.field}: ${error.message}`);
          });
        }
        validationResult.warnings.forEach((warning) => {
          warnings.push(
            `[${warning.section}] ${warning.field}: ${warning.message}`,
          );
        });

        if (errors.length > 0) {
          return {
            success: false,
            errors,
            warnings,
            source: this.contentProvider.getSource(),
          };
        }
      }

      return {
        success: true,
        content,
        errors,
        warnings,
        source: this.contentProvider.getSource(),
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      errors.push(`Failed to load content: ${message}`);
      return {
        success: false,
        errors,
        warnings,
        source: this.contentProvider.getSource(),
      };
    }
  }
}
