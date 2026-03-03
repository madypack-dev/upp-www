/**
 * Tests: Content Validator
 * Validar estructura, tipos y campos requeridos de contenido
 */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { describe, it, expect, beforeEach } from "vitest";
import { ContentValidator } from "../../infrastructure/content/ContentValidator";
import type { SiteContentStructure } from "../../domain/content/ContentSection.types";

describe("ContentValidator", () => {
  let validator: ContentValidator;

  beforeEach(() => {
    validator = new ContentValidator();
  });

  describe("validate()", () => {
    it("debe validar contenido completo válido", () => {
      const content: SiteContentStructure = {
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
          categories: [
            {
              id: "test",
              title: "Producto",
              description: "Descripción",
              features: ["Feature 1"],
            },
          ],
        },
        industries: {
          title: "Industrias",
          items: ["Alimentos"],
        },
        sustainability: {
          title: "Sostenibilidad",
          cards: [
            {
              title: "Sustentabilidad",
              description: "100% reciclado",
            },
          ],
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

      const result = validator.validate(content);

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it("debe reportar errores de validación múltiples", () => {
      const invalidContent = {
        header: { brandShort: "UPP" },
        // falta: hero, products, industries, sustainability, about, location, stats, floatingActions, contact
      };

      const result = validator.validate(invalidContent as any);

      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });

  describe("validateRequired()", () => {
    it("debe detectar secciones faltantes", () => {
      const incomplete = {
        header: {},
        hero: {},
        // faltan: products, industries, sustainability, about, location, stats, floatingActions, contact
      };

      const result = validator.validateRequired(incomplete as any);

      expect(result.isValid).toBe(false);
      expect(result.errors.some((e) => e.field === "products")).toBe(true);
    });

    it("debe pasar cuando todas las secciones requeridas están presentes", () => {
      const content: SiteContentStructure = {
        header: {} as any,
        hero: {} as any,
        products: {} as any,
        industries: {} as any,
        sustainability: {} as any,
        about: {} as any,
        location: {} as any,
        stats: {} as any,
        floatingActions: {} as any,
        contact: {} as any,
      };

      const result = validator.validateRequired(content);

      expect(result.isValid).toBe(true);
    });
  });

  describe("validateTypes()", () => {
    it("debe detectar tipo incorrecto en header.brandShort", () => {
      const content: any = {
        header: { brandShort: 123 }, // debe ser string
      };

      const result = validator.validateTypes(content);

      expect(result.isValid).toBe(false);
      expect(result.errors.some((e) => e.field === "brandShort")).toBe(true);
    });

    it("debe detectar tipo incorrecto en products.categories", () => {
      const content: any = {
        products: { categories: "no-es-array" }, // debe ser array
      };

      const result = validator.validateTypes(content);

      expect(result.isValid).toBe(false);
      expect(result.errors.some((e) => e.field === "categories")).toBe(true);
    });

    it("debe detectar tipo incorrecto en contact.phoneNumber", () => {
      const content: any = {
        contact: { phoneNumber: null }, // debe ser string
      };

      const result = validator.validateTypes(content);

      expect(result.isValid).toBe(false);
      expect(result.errors.some((e) => e.field === "phoneNumber")).toBe(true);
    });
  });

  describe("validateSection()", () => {
    it("debe validar sección específica", () => {
      const heroData = {
        title: "Mi título",
        description: "Mi descripción",
      };

      const result = validator.validateSection("hero", heroData);

      expect(result.isValid).toBe(true);
    });

    it("debe rechazar null en sección", () => {
      const result = validator.validateSection("hero", null);

      expect(result.isValid).toBe(false);
      expect(result.errors[0].message).toContain("required");
    });

    it("debe rechazar tipo no-objeto en sección", () => {
      const result = validator.validateSection("hero", "string-invalid");

      expect(result.isValid).toBe(false);
      expect(result.errors[0].message).toContain("Expected object");
    });
  });

  describe("getName()", () => {
    it("debe devolver nombre identificador", () => {
      expect(validator.getName()).toBe("ContentValidator");
    });
  });
});
