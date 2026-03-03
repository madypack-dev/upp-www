/**
 * Infrastructure: Content Validator
 * Implementation of IContentValidator for UPP site content
 * Validates structure, types, and required fields
 */

import type {
  IContentValidator,
  ValidationResult,
  ValidationError,
} from "../../domain/content/IContentValidator";
import type {
  SiteContentStructure,
  ContentSection,
} from "../../domain/content/ContentSection.types";

export class ContentValidator implements IContentValidator {
  /**
   * Validate complete content structure
   * Performs all validation checks
   */
  validate(content: SiteContentStructure): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationError[] = [];

    // Run all validators
    const requiredValidation = this.validateRequired(content);
    const typeValidation = this.validateTypes(content);

    errors.push(...requiredValidation.errors);
    warnings.push(...requiredValidation.warnings);
    errors.push(...typeValidation.errors);
    warnings.push(...typeValidation.warnings);

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Validate specific section
   * Type-safe validation for individual sections
   */
  validateSection<T extends ContentSection>(
    section: T,
    data: unknown,
  ): ValidationResult {
    const errors: ValidationError[] = [];

    if (data === null || data === undefined) {
      errors.push({
        section,
        field: section,
        message: "Content section is required",
        severity: "error",
      });
    } else if (typeof data !== "object") {
      errors.push({
        section,
        field: section,
        message: `Expected object, got ${typeof data}`,
        severity: "error",
      });
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings: [],
    };
  }

  /**
   * Validate all required sections exist
   */
  validateRequired(content: SiteContentStructure): ValidationResult {
    const errors: ValidationError[] = [];
    const requiredSections: ContentSection[] = [
      "header",
      "hero",
      "products",
      "industries",
      "sustainability",
      "about",
      "location",
      "stats",
      "floatingActions",
      "contact",
    ];

    requiredSections.forEach((section) => {
      if (!(section in content)) {
        errors.push({
          section: "root",
          field: section,
          message: `Required section "${section}" is missing`,
          severity: "error",
        });
      }
    });

    return {
      isValid: errors.length === 0,
      errors,
      warnings: [],
    };
  }

  /**
   * Validate field types match expected schema
   */
  validateTypes(content: SiteContentStructure): ValidationResult {
    const errors: ValidationError[] = [];

    // Check header
    if (content.header) {
      if (typeof content.header.brandShort !== "string") {
        errors.push({
          section: "header",
          field: "brandShort",
          message: "Must be a string",
          severity: "error",
        });
      }
    }

    // Check hero
    if (content.hero) {
      if (typeof content.hero.title !== "string") {
        errors.push({
          section: "hero",
          field: "title",
          message: "Must be a string",
          severity: "error",
        });
      }
    }

    // Check products
    if (content.products) {
      if (!Array.isArray(content.products.categories)) {
        errors.push({
          section: "products",
          field: "categories",
          message: "Must be an array",
          severity: "error",
        });
      }
    }

    // Check contact
    if (content.contact) {
      if (typeof content.contact.phoneNumber !== "string") {
        errors.push({
          section: "contact",
          field: "phoneNumber",
          message: "Must be a string",
          severity: "error",
        });
      }
      if (typeof content.contact.whatsappNumber !== "string") {
        errors.push({
          section: "contact",
          field: "whatsappNumber",
          message: "Must be a string",
          severity: "error",
        });
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings: [],
    };
  }

  /**
   * Validator identifier
   */
  getName(): string {
    return "ContentValidator";
  }
}

/**
 * Factory for creating ContentValidator
 */
export function createContentValidator(): ContentValidator {
  return new ContentValidator();
}
