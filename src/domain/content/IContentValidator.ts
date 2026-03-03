/**
 * Domain Interface: Content Validator
 * Contract for validating content structure and data integrity
 */

import type { SiteContentStructure, ContentSection } from "./ContentSection.types";

export interface ValidationError {
  section: ContentSection | "root";
  field: string;
  message: string;
  severity: "error" | "warning";
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationError[];
}

export interface IContentValidator {
  /**
   * Validate complete content structure
   * Returns detailed errors and warnings
   */
  validate(content: SiteContentStructure): ValidationResult;

  /**
   * Validate specific section
   */
  validateSection<T extends ContentSection>(
    section: T,
    data: unknown
  ): ValidationResult;

  /**
   * Check required fields are present
   */
  validateRequired(content: SiteContentStructure): ValidationResult;

  /**
   * Check field types match expected schema
   */
  validateTypes(content: SiteContentStructure): ValidationResult;

  /**
   * Validator name/type for logging
   */
  getName(): string;
}
