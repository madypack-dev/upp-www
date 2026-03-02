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
  - Pros: configuración muy estable para migrar rápidamente desde el `tailwind.config` de `index.html`.
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

- Opción A: mantener URLs remotas de `index.html`.
  - Pros: cero trabajo inicial.
  - Contras: riesgo de rotura por dependencia externa/hotlinking.
- Opción B: descargar y versionar imágenes en el repo.
  - Pros: control total del contenido y estabilidad.
  - Contras: mayor peso del repositorio.

Recomendación final:

- Descargar y versionar imágenes utilizadas en producción para evitar dependencia externa.

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

## Dudas de alto nivel (requieren definición)

1. ¿El alcance inicial es solo una landing estática o también catálogo navegable/filtros?
2. ¿Se requiere SSR/SEO avanzado desde la primera versión o SPA alcanza?
3. ¿Cuáles son los datos reales de contacto (número de WhatsApp y teléfono)?
4. ¿El contenido será estático en código o vendrá de un CMS/API?
5. ¿Hay lineamientos de marca adicionales (logo oficial, paleta definitiva, imágenes propias)?
