import { describe, expect, it } from "vitest";
import {
  normalizePathname,
  resolveSectionHashFromPathname,
} from "./sectionRouting";

describe("normalizePathname", () => {
  it("normaliza mayúsculas y trailing slash", () => {
    expect(normalizePathname("/Quienes-Somos/")).toBe("/quienes-somos");
  });

  it("mantiene raíz cuando queda vacío", () => {
    expect(normalizePathname("/")).toBe("/");
    expect(normalizePathname("")).toBe("/");
  });
});

describe("resolveSectionHashFromPathname", () => {
  it("resuelve aliases principales", () => {
    expect(resolveSectionHashFromPathname("/productos")).toBe("#productos");
    expect(resolveSectionHashFromPathname("/nosotros")).toBe("#nosotros");
    expect(resolveSectionHashFromPathname("/quienes-somos")).toBe(
      "#quienes-somos",
    );
  });

  it("resuelve aliases alternativos", () => {
    expect(resolveSectionHashFromPathname("/quienes_somos")).toBe(
      "#quienes-somos",
    );
    expect(resolveSectionHashFromPathname("/dondeestamos")).toBe("#ubicacion");
    expect(resolveSectionHashFromPathname("/sostenibilidad")).toBe(
      "#sostenibilidad-calidad",
    );
  });

  it("resuelve con normalización", () => {
    expect(resolveSectionHashFromPathname("/INDUSTRIAS-USOS/")).toBe(
      "#industrias-usos",
    );
  });

  it("devuelve undefined para rutas no mapeadas", () => {
    expect(resolveSectionHashFromPathname("/no-existe")).toBeUndefined();
  });
});
