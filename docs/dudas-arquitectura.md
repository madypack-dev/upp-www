# Dudas de Arquitectura

## Dudas de bajo nivel (con evaluación)

### 1) Tooling base para Vue + TypeScript

Opciones:

- Opción A: Vite + Vue.
  - Pros: setup rápido, mínimo overhead, ideal para SPA/landing.
  - Contras: no trae SSR por defecto.
- Opción B: Nuxt.
  - Pros: SSR/SSG integrado y más capacidades out-of-the-box.
  - Contras: mayor complejidad para una primera iteración de landing.

Recomendación final:

- Empezar con Vite + Vue. Si luego se confirma necesidad fuerte de SSR/SEO avanzado, evaluar migración a Nuxt.

### 2) Versión de Tailwind a usar

Opciones:

- Opción A: Tailwind v4.
  - Pros: versión actual con mejoras de performance.
  - Contras: cambios de configuración respecto a v3 que pueden agregar fricción en arranque.
- Opción B: Tailwind v3.4.x.
  - Pros: configuración muy estable para migrar rápidamente desde el `tailwind.config` de la referencia HTML inicial.
  - Contras: no parte de la versión más nueva.

Recomendación final:

- Arrancar con Tailwind v3.4.x para reducir riesgo de integración inicial y acelerar paridad visual.

### 3) Íconos y tipografías (CDN vs local)

Opciones:

- Opción A: Google Fonts + Material Symbols por CDN.
  - Pros: implementación inmediata.
  - Contras: dependencia externa y menor control de performance.
- Opción B: empaquetar recursos localmente (npm/assets).
  - Pros: mayor control, mejor consistencia entre entornos.
  - Contras: setup inicial un poco mayor.

Recomendación final:

- Usar CDN en la primera entrega para velocidad; mover a recursos locales en una iteración de hardening.

### 4) Gestión de imágenes de la referencia

Opciones:

- Opción A: mantener URLs remotas de la referencia HTML inicial.
  - Pros: cero trabajo inicial.
  - Contras: riesgo de rotura por dependencia externa/hotlinking.
- Opción B: descargar y versionar imágenes en el repo.
  - Pros: control total del contenido y estabilidad.
  - Contras: mayor peso del repositorio.

Recomendación final:

- Descargar y versionar imágenes utilizadas en producción para evitar dependencia externa.
- Estado actual: implementado con assets locales en `src/assets/images`.

### 5) Estructura de componentes

Opciones:

- Opción A: un único componente grande.
  - Pros: arranque rápido.
  - Contras: baja mantenibilidad.
- Opción B: componentes por sección (`Header`, `Hero`, `StatsBar`, etc.).
  - Pros: claridad, escalabilidad y facilidad de testeo.
  - Contras: algo más de trabajo inicial.

Recomendación final:

- Componentizar por secciones desde el inicio.

### 6) Protocolo de deploy

Opciones:

- Opción A: FTPS.
  - Pros: compatible con hosting clásico.
  - Contras: más fricción operativa y pipeline legacy incompatible con el repo actual.
- Opción B: SSH + `rsync`.
  - Pros: más simple, robusto y auditable para un sitio estático.
  - Contras: requiere gestión de `known_hosts` y llave privada.

Recomendación final:

- Usar SSH + `rsync` para la v1.
- Estado actual: implementado en `.github/workflows/ci-cd-ssh.yml` (workflow `CD / SSH`).

### 7) Tipografía local (sin CDN)

Opciones:

- Opción A: `@fontsource/space-grotesk`.
  - Pros: integración simple con Vite, versionado por npm, sin gestionar archivos manuales.
  - Contras: agrega dependencia.
- Opción B: descargar y versionar archivos `.woff2` manualmente en `src/assets/fonts`.
  - Pros: control total de archivos y pesos cargados.
  - Contras: más trabajo operativo y mantenimiento manual.

Recomendación final:

- Usar `@fontsource/space-grotesk` para hardening rápido con bajo riesgo.
- Estado actual: implementado con import local en `src/main.ts`.

### 8) Iconografía local (sin CDN)

Opciones:

- Opción A: usar fuente de íconos completa (Material Symbols font local).
  - Pros: cambio mínimo de markup y paridad visual inmediata.
  - Contras: peso alto de bundle para una landing (se observó ~3.8 MB solo en la fuente de íconos).
- Opción B: usar SVG local por ícono (subset de íconos realmente usados).
  - Pros: reduce significativamente payload y mantiene independencia de CDN.
  - Contras: requiere refactor de componentes para reemplazar `span` por `svg`.

Recomendación final:

- Usar SVG local por ícono para mantener performance y control de assets.
- Estado actual: implementado con componente `src/components/icons/MaterialSymbolIcon.vue` y reemplazo en secciones de la landing.

## Dudas de alto nivel (requieren definición)

- Resuelta: el alcance inicial es landing estática institucional.
- Resuelta: para v1 se implementa MVP SPA.
- Resuelta: contacto publicado = +54 9 11 2693-5682.
- Resuelta: el contenido de v1 será estático en código.
- Resuelta: se mantienen temporalmente branding, paleta e imágenes de la referencia inicial migrada.
- Resuelta: deploy automático por SSH solo desde `main` a producción (single target).
- Resuelta: política de despliegue v1 = `DocumentRoot` directo (`/home/papelera/public_html`) con `rsync --delete`.
- Resuelta: el `DocumentRoot` de UPP queda gestionado por CI/CD; no dejar archivos manuales persistentes fuera de `dist/` en ese directorio.
- Resuelta: hardening del workflow con guardrails explícitos de producción (`DEPLOY_REMOTE_DIR` y `DEPLOY_HEALTHCHECK_URL`) y depuración opcional (`DEPLOY_DEBUG`).
- Resuelta: domain .ar = Argentina-exclusivo (implementado en title, og:locale, geo tags y schema LocalBusiness areaServed).

### SEO - Decisiones implementadas

- ✅ Meta description (160 chars con keywords B2B)
- ✅ Open Graph tags completos (og:title, og:description, og:image, og:locale)
- ✅ Canonical tag (https://upp.ar/)
- ✅ robots.txt y sitemap.xml en `public/`
- ✅ H1 en Hero (jerarquía semántica: h1 → h3)
- ✅ Geolocation meta tags (geo.placename, geo.region AR-BA, geo.position)
- ✅ Schema JSON-LD LocalBusiness con descripción, dirección, teléfono, coordenadas

### GEO - Decisiones implementadas

- ✅ Coordenadas exactas de planta: -34.8295, -57.9956
- ✅ Horarios de operación: lunes a viernes 07:00 a 15:00 (schema openingHoursSpecification)
- ✅ Postal code (1900) en schema
- ✅ Address completo: Calle 508 e/ 16 y 17, Ringuelet, La Plata, 1900, AR
- ✅ Integración de contact info en siteContent.ts (eliminado contact.ts)
- ✅ Google My Business (GMB): Evaluación completada
  - Schema mejorado con `contactPoint` y `priceRange`
  - Guía de setup: [docs/gmb-setup.md](./gmb-setup.md)
  - Status actual: **Pendiente creación manual del perfil GMB**
  - NAP consistency: documentado y listo para sincronizar
