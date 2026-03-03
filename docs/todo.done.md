# TODO DONE - Auditoría y Mejoras Completadas

**Resumen:** Registro de tareas completadas durante la auditoría técnica v1.0

## Consolidación (2026-03-02)

- [x] Se movieron de `docs/todo.md` todas las tareas completadas (`[x]`) para mantener `todo.md` sólo con pendientes.
- [x] `docs/todo.md` quedó reducido al backlog activo (P1/P2/P3 pendientes).
- [x] Se conservaron en este archivo los avances recientes de arquitectura/UX (rutas alias, centralización de contenido, tipado y tests).

## Completadas (2026-03-02 · sesión actual)

- [x] Implementado error handling centralizado: `src/composables/useErrorHandler.ts`, integración en `src/main.ts` y captura en `src/App.vue`.
- [x] Expandido `src/config/` con `src/config/ui.ts` y `src/config/app.ts`.
- [x] Refactor de inline styles en `HeroSection.vue` y `ProductCategories.vue` (sin `style` inline para gradientes/background image).
- [x] Tests agregados para `MaterialSymbolIcon.vue` y `FloatingActions.vue` con Vitest + Vue Test Utils.
- [x] Documentada política de rotación de claves SSH en `README.md`.
- [x] Agregada validación de integridad de artifacts en `.github/workflows/ci-cd-ssh.yml`.

---

## P0 - Seguridad (Completadas)

- [x] **2026-03-02 | [CRITICAL]** Sanitizar `.env.example` de credenciales/IPs
  - **Removidas:** IPs (200.58.103.24), usuarios (root), ports (5749), SSH keys públicas
  - **Archivos:** `.env.example`
  - **Verificación:** Solo placeholders CHANGE_ME_* permanecen ✓

- [x] **2026-03-02 | [HIGH]** Pinear GitHub Actions a commit SHA
  - **Cambio:** `setup-node@v4` → `@b39b52d1213e96004bfcb1c61a8a6fa8ab84f3e8`
  - **Archivos:** `.github/workflows/ci-quality.yml`, `.github/workflows/ci-cd-ssh.yml`
  - **Verificación:** SHAs pinned en ambos workflows ✓

- [x] **2026-03-02 | [HIGH]** Integrar `npm audit` en CI/CD
  - **Cambio:** Agregado step "Check vulnerabilities"
  - **Archivos:** `.github/workflows/ci-quality.yml`
  - **Verificación:** Step ejecuta `npm audit --audit-level=moderate` ✓

- [x] **2026-03-02 | [HIGH]** Resolver vulnerabilidades de dependencias (esbuild + vite)
  - **Cambio:** Actualizado vite 5.4.8 → 7.3.1, @vitejs/plugin-vue 5.2.4 (compatible)
  - **Archivos:** `package.json`, `package-lock.json`
  - **Riesgo Resuelto:** esbuild <=0.24.2 (GHSA-67mh-4wv8-2f99) SSRF vulnerability
  - **Verificación:** 
    - `npm audit --audit-level=moderate` → 0 vulnerabilities ✓
    - `npm run build` → Success (vite 7.3.1) ✓
    - `npm run lint` → 0 errors ✓

---

## P1 - Calidad (Completadas)

- [x] **2026-03-02 | [HIGH] [M]** Instalar eslint + prettier
  - **Instalados:** eslint, prettier, @typescript-eslint/*, eslint-plugin-vue
  - **Archivos:** `eslint.config.js`, `prettier.config.json`, `.prettierignore`
  - **Verificación:** `npm run lint` y `npm run format:check` pasan ✓

- [x] **2026-03-02 | [HIGH]** Integrar linting en CI/CD
  - **Cambios:** Agregados steps de lint, format:check, type-check
  - **Archivos:** `.github/workflows/ci-quality.yml`
  - **Verificación:** Workflow ejecuta 3 quality checks ✓

- [x] **2026-03-02 | [HIGH]** Crear composable `usePhoneFormatter`
  - **Creado:** `src/composables/usePhoneFormatter.ts`
  - **Refactorizado:** `FloatingActions.vue` usa composable
  - **Verificación:** Lógica reutilizable, tests puede extenderse ✓

- [x] **2026-03-02 | [MEDIUM]** Mejorar `src/env.d.ts`
  - **Cambio:** Removido `any`, usados `Record<string, unknown>`
  - **Archivos:** `src/env.d.ts`
  - **Verificación:** Type-safety mejorado, lint pasa ✓

- [x] **2026-03-02 | [MEDIUM]** Agregar scripts en package.json
  - **Agregados:** `lint`, `lint:fix`, `format`, `format:check`
  - **Archivos:** `package.json`
  - **Verificación:** Todos los scripts funcionan ✓

---

## P2 - Arquitectura

- [x] Tipos centralizados en `src/types/domain.ts`.
- [x] Configuración centralizada en `src/config/ui.ts` y `src/config/app.ts`.
- [x] Refactor de inline styles críticos en `HeroSection.vue` y `ProductCategories.vue`.

---

## P3 - Tests / Observabilidad

- [x] Setup Vitest operativo.
- [x] Error handling centralizado implementado.
- [x] Tests de componentes críticos (`MaterialSymbolIcon`, `FloatingActions`).

---

## Documentación Creada

- [x] **2026-03-02** — Creado `docs/audit.md` con hallazgos completos por categoría (seguridad, arquitectura, Vue, TS, Tailwind, DevOps)
- [x] **2026-03-02** — Actualizado `docs/todo.md` con plan de ejecución (P0-P3, prioridades, esfuerzo, criterios)
- [x] **2026-03-02** — Creado `docs/todo.done.md` para tracking de completaciones

---

## Próxima Sesión

Iniciar con tareas P0 (Seguridad):
1. Sanitizar `.env.example`
2. Integrar `npm audit` en CI/CD
3. Pinear GitHub Actions

→ Ver `docs/todo.md` para detalles completos
