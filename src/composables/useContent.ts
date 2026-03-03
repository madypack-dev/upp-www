/**
 * Composable: useContent
 * Simple Vue 3 interface for content layer
 * Abstracts clean architecture complexity from components
 */

import { ref, computed } from "vue";
import type { Ref, ComputedRef } from "vue";
import type { SiteContentStructure, ContentSection } from "../domain/content/ContentSection.types";
import { contentLoader, sectionResolver } from "../config/content";

interface UseContentState {
  content: Ref<SiteContentStructure | null>;
  isLoading: Ref<boolean>;
  error: Ref<string | null>;
  warnings: Ref<string[]>;
}

interface UseContentComposed extends UseContentState {
  isLoaded: ComputedRef<boolean>;
  hasError: ComputedRef<boolean>;
  load: () => Promise<void>;
  getSection: <T extends ContentSection>(section: T) => Promise<SiteContentStructure[T]| null>;
}

/**
 * Cache to avoid loading content multiple times
 */
let cachedContent: SiteContentStructure | null = null;
let loadPromise: Promise<void> | null = null;

/**
 * Main composable for accessing site content
 * Usage:
 *   const { content, isLoaded, load } = useContent();
 *   await load();
 *   console.log(content.value?.header);
 */
export function useContent(): UseContentComposed {
  const content: Ref<SiteContentStructure | null> = ref(cachedContent);
  const isLoading = ref(false);
  const error: Ref<string | null> = ref(null);
  const warnings: Ref<string[]> = ref([]);

  const isLoaded = computed(() => content.value !== null);
  const hasError = computed(() => error.value !== null);

  /**
   * Load content from configured provider
   * Caches result to avoid repeated loads
   */
  const load = async () => {
    // Return cached content if already loaded
    if (cachedContent !== null) {
      content.value = cachedContent;
      return;
    }

    // Return existing promise if already loading
    if (loadPromise !== null) {
      await loadPromise;
      content.value = cachedContent;
      return;
    }

    isLoading.value = true;
    error.value = null;
    warnings.value = [];

    loadPromise = (async () => {
      try {
        const result = await contentLoader.load();

        if (result.success && result.content) {
          cachedContent = result.content;
          content.value = result.content;
          warnings.value = result.warnings;
        } else {
          error.value = result.errors.join("; ");
          warnings.value = result.warnings;
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        error.value = `Failed to load content: ${message}`;
      } finally {
        isLoading.value = false;
        loadPromise = null;
      }
    })();

    await loadPromise;
  };

  /**
   * Load specific content section
   * Useful for lazy loading sections
   */
  const getSection = async <T extends ContentSection>(section: T) => {
    try {
      const result = await sectionResolver.resolve({
        section,
        throwOnMissing: false,
      });

      if (result.success && result.data) {
        return result.data;
      }

      error.value = result.error || null;
      return null;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      error.value = `Failed to load section "${section}": ${message}`;
      return null;
    }
  };

  return {
    // State
    content,
    isLoading,
    error,
    warnings,
    // Computed
    isLoaded,
    hasError,
    // Methods
    load,
    getSection,
  };
}

/**
 * Alternative: Direct function to load content once
 * Usage: const content = await loadContent();
 */
export async function loadContent(): Promise<SiteContentStructure | null> {
  if (cachedContent !== null) {
    return cachedContent;
  }

  const result = await contentLoader.load();
  if (result.success && result.content) {
    cachedContent = result.content;
    return result.content;
  }

  return null;
}
