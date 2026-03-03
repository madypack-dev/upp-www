# TODO - Pendientes

Este archivo mantiene únicamente tareas pendientes.
Las tareas realizadas fueron movidas a `docs/todo.done.md`.

---

## P1 - Calidad

- [ ] **[P1] [HIGH] [S]** Implementar error handling centralizado
  - **Archivos:** Crear `src/composables/useErrorHandler.ts`, actualizar `App.vue`
  - **Riesgo:** Errores silenciosos, difícil debugging en prod
  - **Criterio Aceptación:** Error boundary en App, logging centralizado
  - **Verificación:** Simular error en consola, ver logs

## P2 - Arquitectura

- [ ] **[P2] [MEDIUM] [S]** Expandir `src/config/` con `ui.ts` y `app.ts`
  - **Archivos:** Crear `src/config/ui.ts`, actualizar `src/config/app.ts`
  - **Riesgo:** Magic values dispersos en código
  - **Criterio Aceptación:** Constantes centralizadas, tipadas, importadas en componentes
  - **Verificación:** No hay magic strings en componentes

- [ ] **[P2] [MEDIUM] [S]** Refactor de inline styles en ProductCategories/HeroSection
  - **Archivos:** `src/components/ProductCategories.vue`, `src/components/HeroSection.vue`
  - **Riesgo:** Estilos hardcoded, difícil de mantener
  - **Criterio Aceptación:** No hay `style="{ backgroundImage:"` inline
  - **Verificación:** Componentes usan CSS variables o props de clases

## P3 - Tests / DevOps

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

## Referencias

- **Completadas:** [`docs/todo.done.md`](./todo.done.md)
- **Hallazgos:** [`docs/audit.md`](./audit.md)
- **Dudas de arquitectura:** [`docs/dudas-arquitectura.md`](./dudas-arquitectura.md)
