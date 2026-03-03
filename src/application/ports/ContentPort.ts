/**
 * Application Port: Content Configuration Port
 * Driven adapter for content provisioning
 * Allows swapping different content sources without changing application code
 */

import type { IContentProvider } from "../../domain/content/IContentProvider";

/**
 * Port defines how application requests content via abstraction
 * Implementation could be: static file, API, database, etc.
 */
export interface IContentPort {
  /**
   * Get configured content provider
   */
  getProvider(): IContentProvider;

  /**
   * Identify port implementation
   */
  getName(): string;
}
