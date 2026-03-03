# TODO - Auditoría Técnica v1.0 y Plan de Mejoras

## Fase Actual
Ejecución de auditoría de seguridad, arquitectura, código y DevOps. Implementación de cambios de alta certeza.

---

## P0 - Seguridad / Critical (Blocker)

- [x] **[P0] [CRITICAL] [S]** Sanitizar `.env.example` de credenciales/IPs
  - **Archivos:** `.env.example`
  - **Riesgo:** Infraestructura expuesta en versionado público
  - **Criterio Aceptación:** `.env.example` solo con estructura (sin IPs, usuarios, ports hardcodeados)
  - **Verificación:** Visual check + grep de IPs

- [x] **[P0] [HIGH] [S]** Integrar `npm audit` en CI/CD
  - **Archivos:** `.github/workflows/ci-quality.yml`
  - **Riesgo:** Dependencias vulnerables sin detección
  - **Criterio Aceptación:** Paso de audit en CI, falla en críticas/altas
  - **Verificación:** `npm run build` ejecuta audit internamente

- [x] **[P0] [HIGH] [S]** Pinear todas las GitHub Actions a commit SHA
  - **Archivos:** `.github/workflows/ci-quality.yml`, `.github/workflows/ci-cd-ssh.yml`
  - **Riesgo:** Supply-chain attack por acciones comprometidas
  - **Criterio Aceptación:** Todas las `uses:` tienen commit SHA (no @vX)
  - **Verificación:** Grep de `@11bd...` en workflows

---

## P1 - Calidad / High Priority

- [x] **[P1] [HIGH] [M]** Instalar eslint + prettier + config base
  - **Archivos:** Nueva config ESLint/Prettier, actualizar `package.json` scripts
  - **Riesgo:** Inconsistencias de código, deuda técnica
  - **Criterio Aceptación:** `npm run lint` y `npm run format` sin errores
  - **Verificación:** Scripts en `package.json` + config files creados

- [x] **[P1] [HIGH] [S]** Integrar linting en CI/CD
  - **Archivos:** `.github/workflows/ci-quality.yml`
  - **Riesgo:** Código inconsistente mergeado a main
  - **Criterio Aceptación:** Step de lint en CI, falla si detect errores
  - **Verificación:** Ver step ejecutándose en workflow

- [x] **[P1] [HIGH] [S]** Crear composable `usePhoneFormatter`
  - **Archivos:** Crear `src/composables/usePhoneFormatter.ts`
  - **Riesgo:** Lógica duplicada, cambios dispersos
  - **Criterio Aceptación:** Composable usado en `FloatingActions.vue`
  - **Verificación:** `FloatingActions` importa desde composable

- [ ] **[P1] [HIGH] [S]** Implementar error handling centralizado
  - **Archivos:** Crear `src/composables/useErrorHandler.ts`, actualizar `App.vue`
  - **Riesgo:** Errores silenciosos, difícil debugging en prod
  - **Criterio Aceptación:** Error boundary en App, logging centralizado
  - **Verificación:** Simular error en consola, ver logs

---

## P2 - Arquitectura / Medium Priority

- [ ] **[P2] [MEDIUM] [S]** Crear tipos centralizados en `src/types/domain.ts`
  - **Archivos:** Crear `src/types/domain.ts` con `Category`, `ContactInfo`, etc.
  - **Riesgo:** Magic types, duplicación de interfaces
  - **Criterio Aceptación:** Tipos exportados y usados en componentes
  - **Verificación:** `ProductCategories.vue` importa `Category` desde types

- [ ] **[P2] [MEDIUM] [S]** Expandir `src/config/` con `ui.ts` y `app.ts`
  - **Archivos:** Crear `src/config/ui.ts`, actualizar `src/config/app.ts`
  - **Riesgo:** Magic values dispersos en código
  - **Criterio Aceptación:** Constantes centralizadas, tipadas, importadas en componentes
  - **Verificación:** No hay magic strings en componentes

- [x] **[P2] [MEDIUM] [S]** Mejorar `src/env.d.ts` con tipos específicos
  - **Archivos:** `src/env.d.ts`
  - **Riesgo:** Generic `any` reduce type-safety
  - **Criterio Aceptación:** Tipos sin `any`, específicos para Vue
  - **Verificación:** TypeScript check pasa en stricto

- [ ] **[P2] [MEDIUM] [S]** Refactor de inline styles en ProductCategories/HeroSection
  - **Archivos:** `src/components/ProductCategories.vue`, `src/components/HeroSection.vue`
  - **Riesgo:** Estilos hardcoded, difícil de mantener
  - **Criterio Aceptación:** No hay `style="{ backgroundImage:"` inline
  - **Verificación:** Componentes usan CSS variables o props de clases

---

## P3 - Tests / Low Priority for MVP

- [ ] **[P3] [MEDIUM] [L]** Instalar vitest + configurar para componentes Vue
  - **Archivos:** Crear `vitest.config.ts`, instalar deps
  - **Riesgo:** Sin red de seguridad para refactorings
  - **Criterio Aceptación:** Vitest setup funcional, primer test ejecuta
  - **Verificación:** `npm run test` pasa

- [ ] **[P3] [MEDIUM] [L]** Escribir tests para `MaterialSymbolIcon.vue` y `FloatingActions.vue`
  - **Archivos:** Crear `src/__tests__/` con test suites
  - **Riesgo:** Sin cobertura, bugs silenciosos
  - **Criterio Aceptación:** 2 test suites, >50% coverage
  - **Verificación:** `npm run test` pasa y muestra coverage

- [ ] **[P3] [MEDIUM] [S]** Documentar política de rotación SSH keys
  - **Archivos:** Actualizar `README.md` con nueva sección
  - **Riesgo:** Claves comprometidas sin plan de renovación
  - **Criterio Aceptación:** README tiene checklist de rotación
  - **Verificación:** Sección visible y clara en README

- [ ] **[P3] [MEDIUM] [S]** Validación de integridad de artifacts en deploy
  - **Archivos:** `.github/workflows/ci-cd-ssh.yml`
  - **Riesgo:** Corrupción silenciosa de assets
  - **Criterio Aceptación:** Hash de `dist/` validado pre/post deploy
  - **Verificación:** Workflow log muestra hash check

---

## Certezas Previas (Completadas en v0)

- [x] El proyecto se implementará con Vue + TypeScript + Tailwind.
- [x] La referencia funcional/visual inicial ya fue migrada a componentes Vue.
- [x] El contenido de la v1 será estático en código (sin CMS/API).
- [x] Branding temporal de la v1: mantener paleta/estética/assets de la referencia inicial migrada.
- [x] Las imágenes de hero y categorías se versionan localmente en `src/assets/images`.
- [x] Deploy v1: SSH + `rsync` desde GitHub Actions.
- [x] Deploy automático: solo `main` hacia producción.
- [x] El workflow `CD / SSH` requiere `environment` `production` y variables/secrets de deploy SSH documentados en `README.md`.
- [x] Se incorporó `.env.example` con variables de deploy SSH y `.env` local ignorado por git para configuración operativa.
- [x] El vhost `unionpapeleraplatense.com.ar` publica desde `/home/papelera/public_html`.
- [x] Hardening frontend definido: tipografía e íconos se sirven localmente sin dependencias CDN.
- [x] Hardening frontend implementado: se removieron enlaces CDN de Google Fonts/Material Symbols en `index.html`.
- [x] Tipografía `Space Grotesk` local por `@fontsource` y set de íconos migrado a SVG local por componente.
- [x] La landing base implementada con componentes modulares: Header, Hero, StatsBar, ProductCategories, LocationSection, FloatingActions
- [x] Tokens visuales definidos y en uso: colores (primary, background), tipografía, efectos (glass-effect)
- [x] En la sección de ubicación se removió la mención de “logística propia” y se incorporó un mapa embebido de Google Maps para Ringuelet.
- [x] Se agregó compatibilidad de navegación para `#nosotros`/`#quienes-somos` y aliases por pathname `/nosotros`/`/quienes-somos` en el arranque de la SPA.
- [x] Menú mobile reordenado: `Productos / Soluciones` → `¿Quiénes somos?` → `Contacto`, con `¿Dónde estamos?` como sub-item de contacto y CTA `Cotizar ahora` fijo al final.
- [x] Secciones nuevas implementadas con anchors: `Industrias / Usos` (`#industrias-usos`) y `Sostenibilidad / Calidad` (`#sostenibilidad-calidad`), y menú actualizado al orden final solicitado.
- [x] Aliases de pathname agregados para navegación directa: `/industrias-usos` y `/sostenibilidad-calidad` (redirigen a sus hashes en la SPA).
- [x] Aliases adicionales agregados para navegación homogénea: `/productos` y `/ubicacion` (redirigen a `#productos` y `#ubicacion`).
- [x] Se agregaron aliases alternativos de URL para robustez (`/donde-estamos`, `/dondeestamos`, `/industrias`, `/quienes`, `/quienes_somos`, `/sostenibilidad`).

---

## Links Relacionados

- **Hallazgos Detallados:** [`docs/audit.md`](./audit.md)
- **Decisiones Arquitectónicas Previas:** [`docs/dudas-arquitectura.md`](./dudas-arquitectura.md)
- **Workflow de Agentes:** [`AGENTS.md`](../AGENTS.md)
