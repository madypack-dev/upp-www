/**
 * Tests: Content Loader
 * Caso de uso: cargar contenido con validación automática
 */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { describe, it, expect, beforeEach, vi } from "vitest";
import { ContentLoader } from "../../application/content/ContentLoader";
import type { IContentProvider } from "../../domain/content/IContentProvider";
import type { IContentValidator } from "../../domain/content/IContentValidator";
import type { SiteContentStructure } from "../../domain/content/ContentSection.types";

/**
 * Mock de IContentProvider para testing
 */
function createMockProvider(
  overrides?: Partial<IContentProvider>,
): IContentProvider {
  const mockContent: SiteContentStructure = {
    header: {
      brandShort: "UPP",
      brandFull: "Unión Papelera Platense",
      menuTitle: "Menú",
      menu: {
        products: "Productos",
        industries: "Industrias",
        sustainability: "Sostenibilidad",
        about: "¿Quiénes somos?",
        contact: "Contacto",
        locationSubItem: "¿Dónde estamos?",
        quoteCta: "Cotizar Ahora",
      },
      whatsappPrefilledMessage: "Hola",
    },
    hero: {
      ariaLabel: "Carrusel",
      imageAlt: "Imagen",
      badge: "Badge",
      title: "Título",
      description: "Descripción",
      prevSlideAria: "Anterior",
      nextSlideAria: "Siguiente",
      goToSlidePrefix: "Ir a",
    },
    products: {
      sectionTitle: "Categorías",
      seeAllLabel: "Ver todos",
      categories: [],
    },
    industries: {
      title: "Industrias",
      items: [],
    },
    sustainability: {
      title: "Sostenibilidad",
      cards: [],
    },
    about: {
      badge: "¿Quiénes somos?",
      title: "UPP",
      description: "Fabricamos papel",
    },
    location: {
      title: "Entregas",
      address: "Calle 508",
      mapTitle: "Mapa",
    },
    stats: {
      label: "Sostenibilidad",
      recycledTotal: "1500+",
      recycledUnit: "Ton",
      growth: "+15%",
      growthReference: "vs año anterior",
    },
    floatingActions: {
      whatsappLabel: "WhatsApp",
      phoneAriaLabel: "Llamar",
    },
    contact: {
      whatsappNumber: "+54 9 11 2693-5682",
      phoneNumber: "+54 9 11 2693-5682",
    },
  };

  return {
    loadContent: async () => mockContent,
    loadSection: async (section) => mockContent[section],
    isAvailable: async () => true,
    getSource: () => "MockProvider",
    ...overrides,
  };
}

/**
 * Mock de IContentValidator para testing
 */
function createMockValidator(
  overrides?: Partial<IContentValidator>,
): IContentValidator {
  return {
    validate: () => ({ isValid: true, errors: [], warnings: [] }),
    validateSection: () => ({ isValid: true, errors: [], warnings: [] }),
    validateRequired: () => ({ isValid: true, errors: [], warnings: [] }),
    validateTypes: () => ({ isValid: true, errors: [], warnings: [] }),
    getName: () => "MockValidator",
    ...overrides,
  };
}

describe("ContentLoader", () => {
  let provider: IContentProvider;
  let validator: IContentValidator;
  let loader: ContentLoader;

  beforeEach(() => {
    provider = createMockProvider();
    validator = createMockValidator();
    loader = new ContentLoader(provider, validator);
  });

  describe("load()", () => {
    it("debe cargar contenido exitosamente", async () => {
      const result = await loader.load();

      expect(result.success).toBe(true);
      expect(result.content).toBeDefined();
      expect(result.content?.header).toBeDefined();
      expect(result.errors).toHaveLength(0);
    });

    it("debe validar contenido por defecto", async () => {
      const mockValidator = createMockValidator({
        validate: () => ({
          isValid: true,
          errors: [],
          warnings: [
            {
              section: "header",
              field: "brandShort",
              message: "test warning",
              severity: "warning",
            },
          ],
        }),
      });

      loader = new ContentLoader(provider, mockValidator);

      const result = await loader.load();

      expect(result.success).toBe(true);
      expect(result.warnings).toHaveLength(1);
    });

    it("debe saltar validación si se solicita", async () => {
      const mockValidator = vi.fn() as any;

      loader = new ContentLoader(provider, mockValidator);

      await loader.load({ skipValidation: true });

      expect(mockValidator.validate).not.toHaveBeenCalled();
    });

    it("debe reportar errores de validación", async () => {
      const mockValidator = createMockValidator({
        validate: () => ({
          isValid: false,
          errors: [
            {
              section: "header",
              field: "brandShort",
              message: "Brand short es obligatorio",
              severity: "error",
            },
          ],
          warnings: [],
        }),
      });

      loader = new ContentLoader(provider, mockValidator);

      const result = await loader.load();

      expect(result.success).toBe(false);
      expect(result.errors).toContain(
        "[header] brandShort: Brand short es obligatorio",
      );
    });

    it("debe reportar cuando el proveedor no está disponible", async () => {
      const unavailableProvider = createMockProvider({
        isAvailable: async () => false,
      });

      loader = new ContentLoader(unavailableProvider, validator);

      const result = await loader.load();

      expect(result.success).toBe(false);
      expect(result.errors[0]).toContain("unavailable");
    });

    it("debe capturar excepciones del proveedor", async () => {
      const errorProvider = createMockProvider({
        loadContent: async () => {
          throw new Error("Network error");
        },
      });

      loader = new ContentLoader(errorProvider, validator);

      const result = await loader.load();

      expect(result.success).toBe(false);
      expect(result.errors[0]).toContain("Network error");
    });

    it("debe incluir nombre del proveedor en respuesta", async () => {
      const namedProvider = createMockProvider({
        getSource: () => "ApiContentProvider",
      });

      loader = new ContentLoader(namedProvider, validator);

      const result = await loader.load();

      expect(result.source).toBe("ApiContentProvider");
    });
  });

  describe("integración con validador", () => {
    it("debe combinar errores y warnings", async () => {
      const mockValidator = createMockValidator({
        validate: () => ({
          isValid: false,
          errors: [
            {
              section: "header",
              field: "brandShort",
              message: "error message",
              severity: "error",
            },
          ],
          warnings: [
            {
              section: "hero",
              field: "description",
              message: "warning message",
              severity: "warning",
            },
          ],
        }),
      });

      loader = new ContentLoader(provider, mockValidator);

      const result = await loader.load();

      expect(result.success).toBe(false);
      expect(result.errors).toHaveLength(1);
      expect(result.warnings).toHaveLength(1);
    });

    it("debe fallar si hay errores incluso con warnings", async () => {
      const mockValidator = createMockValidator({
        validate: () => ({
          isValid: false,
          errors: [
            {
              section: "contact",
              field: "phoneNumber",
              message: "Phone number invalid",
              severity: "error",
            },
          ],
          warnings: [
            {
              section: "about",
              field: "description",
              message: "Description too short",
              severity: "warning",
            },
          ],
        }),
      });

      loader = new ContentLoader(provider, mockValidator);

      const result = await loader.load();

      expect(result.success).toBe(false);
      expect(result.content).toBeUndefined();
    });
  });
});
