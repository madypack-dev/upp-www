export const sectionPathToHash: Record<string, string> = {
  "/donde-estamos": "#ubicacion",
  "/dondeestamos": "#ubicacion",
  "/industrias-usos": "#industrias-usos",
  "/industrias": "#industrias-usos",
  "/nosotros": "#nosotros",
  "/productos": "#productos",
  "/quienes": "#quienes-somos",
  "/quienes_somos": "#quienes-somos",
  "/quienes-somos": "#quienes-somos",
  "/sostenibilidad": "#sostenibilidad-calidad",
  "/sostenibilidad-calidad": "#sostenibilidad-calidad",
  "/ubicacion": "#ubicacion",
};

export const normalizePathname = (pathname: string): string => {
  const normalized = pathname.toLowerCase().replace(/\/+$/, "");
  return normalized === "" ? "/" : normalized;
};

export const resolveSectionHashFromPathname = (
  pathname: string,
): string | undefined => {
  return sectionPathToHash[normalizePathname(pathname)];
};
