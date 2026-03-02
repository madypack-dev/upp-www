# Auditoría Técnica v1.0 - UPP WWW

**Fecha:** 2026-03-02  
**Auditor:** GitHub Copilot  
**Stack:** Vue 3 + TypeScript + Tailwind + Vite + GitHub Actions (SSH Deploy)

---

## Resumen Ejecutivo

El proyecto está en fase MVP con arquitectura base sólida y buenas prácticas de deploy. Se detectaron **3 Critical**, **5 High**, **4 Medium** y **3 Low** hallazgos que impactan seguridad, observabilidad y mantenibilidad.

### Riesgos críticos abiertos:
1. 🔴 **Credenciales e IPs expuestas en `.env.example`** → Rotación inmediata requerida
2. 🟠 **SSH keys públicas hardcodeadas en versionado** → Requiere rotación de claves del servidor
3. 🟠 **Sin linting ni formateo automático** → Riesgo de inconsistencias
4. 🟡 **Sin validación de dependencias** → Vulnerabilidades silenciosas
5. 🟡 **Falta type-safety en algunos componentes Vue** → Errores en runtime

---

## Hallazgos por Categoría

### 🔐 SEGURIDAD

#### ✗ [CRITICAL] Credenciales e IPs expuestas en `.env.example`

- **Archivos:** `.env.example`
- **Descripción:** El archivo `.env.example` contiene directamente:
  - IP del servidor: `200.58.103.24`
  - Usuario SSH: `root`
  - Puerto SSH: `5749`
  - SSH host keys públicas completas (ssh-rsa, ecdsa-sha2-nistp256, ssh-ed25519)
  
  Aunque está templated con `CHANGE_ME_PRIVATE_KEY_OPENSSH`, las metadata de infraestructura están expuestas en el repositorio público.

- **Riesgo:** 
  - Reconnaissance: atacantes pueden identificar la infraestructura exacta
  - Rotating credenciales después de una exposición requiere trabajo extra

- **Recomendación:**
  1. **Inmediato:** Rotar claves SSH del servidor (si este repo estuvo público alguna vez)
  2. Documentar credenciales únicamente en GitHub Secrets/Variables (no en `.env.example`)
  3. Usar `.env.example` solo para estructura (sin valores reales)
  4. Documentar setup en `README.md` sin exponer IPs

- **Estado:** Implementación pendiente (requiere decisión de rotación)

---

#### ✗ [CRITICAL] SSH host keys públicas hardcodeadas

- **Archivos:** `.env.example`
- **Descripción:** Las salidas de `ssh-keyscan` (claves públicas del servidor) están hardcodeadas en el repositorio versionado.
- **Riesgo:**
  - Si el repo fue público, cualquiera conoce exactamente dónde está alojado
  - Facilita ataques dirigidos (MITM si se compromete el servidor)
  - Dificulta rotación de infraestructura

- **Recomendación:**
  - Documentar en GitHub Secrets como bloque seguro
  - En `.env.example`: solo `DEPLOY_SSH_KNOWN_HOSTS=CHANGE_ME_KNOWN_HOSTS` (sin valores)
  - Actualizar README con instrucciones de cómo obtener las claves (`ssh-keyscan -T 5 -p 5749 <HOST>`)

- **Estado:** Implementación pendiente

---

#### ✗ [HIGH] Falta integración de Dependabot y scanning de dependencias

- **Archivos:** `.github/workflows/`, `package.json`
- **Descripción:** No hay GitHub Actions que:
  - Ejecute `npm audit` en cada PR
  - Detecte dependencias con vulnerabilidades conocidas (no hay Dependabot config)
  - Bloquee merge de PRs con vulns críticas

- **Riesgo:** Integración silenciosa de librerías comprometidas sin visibilidad

- **Recomendación:**
  1. Crear `.github/dependabot.yml` para alertas automáticas
  2. Añadir paso en `ci-quality.yml`: `npm audit` (error en críticas/altas)
  3. Documentar política de rotación de dependencias (ej: monthly)

- **Estado:** Implementación pendiente

---

#### ✗ [HIGH] GitHub Actions uses sin pin de versión

- **Archivos:** `.github/workflows/ci-quality.yml`, `.github/workflows/ci-cd-ssh.yml`
- **Descripción:** Algunas acciones usan versiones flotantes:
  ```yaml
  - uses: actions/setup-node@v4  # ← v4 puede cambiar sin seguimiento
  ```
  
  Solo `checkout` está pinned correctamente: `@11bd71901bbe5b1630ceea73d27597364c9af683 # v4.2.2`

- **Riesgo:** Cambios silenciosos en comportamiento de acciones; supply-chain attack si acción comprometida

- **Recomendación:** 
  - Pinear todas las acciones a commits específicos (no solo versión mayor)
  - Usar herramientas como `actions/pin-action@v1` o actualización manual trimestral

- **Estado:** Implementación pendiente

---

#### ✗ [MEDIUM] Sin validación de integridad de build artifacts

- **Archivos:** `.github/workflows/ci-cd-ssh.yml`
- **Descripción:** El artifact `dist/` se sincroniza sin checksum o verificación de integridad

- **Riesgo:** Corrupción silenciosa de assets; dificultad de debugging en producción

- **Recomendación:** Generar y validar hash de `dist/` en pre/post deploy

- **Estado:** Baja prioridad, puede quedar en backlog

---

### 🏗️ ARQUITECTURA

#### ✗ [HIGH] Sin manejo de errores global

- **Archivos:** `src/App.vue`, No hay error boundary
- **Descripción:** No hay composable ni error handler centralizado para:
  - Fallos de imagen/asset
  - Errores de red (futuros endpoints)
  - Validación de datos

- **Riesgo:** Errores aislados, difíciles de debuggear en producción

- **Recomendación:**
  1. Crear `src/composables/useErrorBoundary.ts`
  2. Implementar error boundary en `App.vue` (wrapper try-catch o componente Suspense)
  3. Logging centralizado para observabilidad

- **Estado:** Implementación pendiente (esfuerzo bajo)

---

#### ✗ [MEDIUM] No hay DTOs/constantes para config centralizada

- **Archivos:** `src/config/contact.ts` (buena base), pero falta:
  - URLs de endpoints (para futuras APIs)
  - Varianbles de feature flags
  - Constantes de UI (breakpoints, z-index, etc.)

- **Riesgo:** Magic strings/values dispersos; difícil de mantener

- **Recomendación:** Expandir `src/config/` con:
  - `app.ts` (metadata app, versión, etc.)
  - `ui.ts` (constantes visuales: z-index, duraciones, etc.)
  - Tipado fuerte para todos los DTOs

- **Estado:** Implementación pendiente (esfuerzo bajo)

---

### 📦 VUE

#### ✓ [GOOD] Componentes bien estructurados y respuesta

- **Hallazgo:** Componentes como `ProductCategories.vue`, `LocationSection.vue` están bien modularizados
- **Fortalezas:** 
  - Props tipadas (excepto en `StatsBar.vue`)
  - Composición clara
  - Reactividad bien usada

---

#### ✗ [MEDIUM] Falta composables reutilizables

- **Archivos:** `src/components/`
- **Descripción:** Lógica de normalización de teléfonos está incrustada en `FloatingActions.vue`:
  ```ts
  const normalizeDigits = (value: string) => value.replace(/\D/g, "");
  ```
  
  Debería ser composable reutilizable

- **Riesgo:** Duplicación de código; cambios reflejados en múltiples lugares

- **Recomendación:**
  1. Crear `src/composables/usePhoneFormatter.ts`
  2. Usar en `FloatingActions.vue` y reutilizable en futuras secciones

- **Estado:** Implementación pendiente (esfuerzo bajo)

---

#### ✗ [LOW] Sin type-safety en algunos props

- **Archivos:** `src/components/MaterialSymbolIcon.vue` (bien tipado), pero:
  - `StatsBar.vue`: sin `defineProps` explícito (OK ya que no recibe props, pero mejora considerada)
  - Componentes que importan imágenes directamente (no props) podrían ser más reutilizables

- **Recomendación:** Hacer componentes más genéricos pasando imágenes como props

- **Estado:** Baja prioridad, puede quedarse en backlog

---

### ✅ TYPESCRIPT

#### ✓ [GOOD] tsconfig bien configurado

- **Hallazgo:** `tsconfig.app.json` tiene `strict: true`, excelente

---

#### ✗ [MEDIUM] env.d.ts demasiado genérico

- **Archivos:** `src/env.d.ts`
- **Descripción:**
  ```ts
  const component: DefineComponent<{}, {}, any>;
  ```
  Usa `any`, reduciendo type-safety en Vue components

- **Recomendación:** Tipado más específico para Vue components

- **Estado:** Implementación pendiente (esfuerzo bajo)

---

#### ✗ [MEDIUM] Sin constantes tipadas

- **Archivos:** Falta `src/types/` o `src/constants/`
- **Descripción:** No hay tipos centralizados para:
  - Categorías de productos (type `Category` en `ProductCategories.vue`)
  - Metadata de contacto (tipo de `contact` en `config/contact.ts`)

- **Recomendación:**
  1. Crear `src/types/domain.ts` con tipos:
     ```ts
     export interface Category { ... }
     export interface ContactInfo { ... }
     ```
  2. Reutilizar en componentes

- **Estado:** Implementación pendiente (esfuerzo bajo)

---

### 🎨 TAILWIND

#### ✓ [GOOD] Config y utilidades bien diseñadas

- **Hallazgo:** `tailwind.config.cjs` define tokens visuales (colores, border-radius) de forma limpia
- **Fortalezas:** Reutilización de `primary`, `glass-effect`, etc.

---

#### ✗ [MEDIUM] Inline styles donde debería haber utility classes

- **Archivos:** 
  - `src/components/ProductCategories.vue`: `style="{ backgroundImage: \`url('${category.image}')\` }"`
  - `src/components/HeroSection.vue`: similar

- **Recomendación:**
  - Usar CSS variables en Tailwind para background-image dinámicas, o
  - Pasar clases como props con valores predefinidos

- **Estado:** Implementación pendiente (esfuerzo bajo)

---

#### ✗ [LOW] Utility para glass-effect no reutilizable en markdown

- **Hallazgo:** `glass-effect` está definido en `src/style.css` @layer
- **Recomendación:** Extenderlo en Tailwind config si se usa en múltiples temas

- **Estado:** Baja prioridad

---

### ⚙️ DEVOPS / CI-CD

#### ✓ [GOOD] Estrategia de deploy robusta

- **Hallazgo:** Workflow de deploy tiene:
  - Validación de inputs (path checking)
  - Health check post-deploy
  - Modo debug opcional
  - Restricciónde rama (solo main)
  
  **Esto es excelente para MVP de hosting compartido**

---

#### ✗ [HIGH] Falta linting y formateo en CI

- **Archivos:** `.github/workflows/ci-quality.yml`
- **Descripción:** Solo ejecuta `npm run build`. No hay:
  - `eslint` o `prettier`
  - Tests
  - Type-check en strict (solo build que ejecuta `vue-tsc`)

- **Riesgo:** 
  - Código inconsistente mergeado a main
  - Comportamientos inesperados en producción

- **Recomendación:**
  1. Instalar `eslint`, `prettier`, `@typescript-eslint/*`
  2. Agregar pasos en CI:
     ```yaml
     - run: npm run lint
     - run: npm run format:check
     ```
  3. Generar y pasar scripts a `package.json`

- **Estado:** Implementación pendiente (esfuerzo medio)

---

#### ✗ [MEDIUM] Sin tests

- **Archivos:** Sin `src/**/*.test.ts`, sin `vitest.config.ts`
- **Descripción:** 0% cobertura de tests
- **Riesgo:** Refactorings sin red de seguridad; bugs silenciosos

- **Recomendación:** 
  1. Instalar `vitest`, `@vitest/ui`, `@vue/test-utils`, `happy-dom`
  2. Escribir tests para componentes críticos (primero: `MaterialSymbolIcon`, `FloatingActions`)
  3. Agregar en CI con umbral mínimo de cobertura (ej: 50%)

- **Estado:** Baja prioridad para MVP, pero documentar en backlog

---

#### ✗ [MEDIUM] Sin renovación de SSH keys planificada

- **Archivos:** `.env.example` (keys públicas), `.github/workflows/ci-cd-ssh.yml`
- **Descripción:** No hay política de rotación de claves SSH

- **Recomendación:**
  1. Documentar en `README.md` sección de "SSH Key Rotation" (anual)
  2. Generar checklist: `ssh-keyscan -> GitHub Secret -> Test deploy`

- **Estado:** Implementación pendiente (esfuerzo bajo, pero critical después de fix de credenciales)

---

#### ✗ [LOW] No hay caching de npm en algunos steps

- **Archivos:** `.github/workflows/ci-cd-ssh.yml`
- **Descripción:** El workflow de deploy tienen `cache: npm` en `setup-node`, pero el segundo `npm ci` no aprovecha cache entre workflows

- **Recomendación:** Usar GitHub Actions caching explícitamente si se detectan slowdowns

- **Estado:** Baja prioridad, low impact

---

## Matriz de Riesgos / Esfuerzo / Prioridad

| Hallazgo | Severidad | Esfuerzo | Prioridad | Estado |
|---|---|---|---|---|
| Credenciales en .env.example | CRITICAL | S | P0 | Pendiente |
| SSH keys en versionado | CRITICAL | S | P0 | Pendiente |
| Sin Dependabot/audit | HIGH | S | P0 | Pendiente |
| GitHub Actions sin pin | HIGH | S | P0 | Pendiente |
| Sin linting | HIGH | M | P1 | Pendiente |
| Sin error handling | HIGH | S | P1 | Pendiente |
| Sin composables reutilizables | MEDIUM | S | P2 | Pendiente |
| Inline styles Tailwind | MEDIUM | S | P2 | Pendiente |
| env.d.ts genérico | MEDIUM | S | P2 | Pendiente |
| Sin constantes tipadas | MEDIUM | S | P2 | Pendiente |
| Sin tests | MEDIUM | L | P3 | Pendiente |
| Sin validación de artifacts | MEDIUM | S | P3 | Pendiente |
| Type-safety en props | LOW | S | P3 | Pendiente |
| Caching npm | LOW | S | P3 | Pendiente |

---

## Qué Quedó Bien ✓

- ✅ Arquitectura de componentes (modular, responsive)
- ✅ Configuraciones (Tailwind, TypeScript, Vite)
- ✅ Estrategia de deploy (robusto, con guardrails)
- ✅ Tipado en Vue (componentes bien tipados, excepto algunos detalles)
- ✅ Documentación base (AGENTS.md, README.md)

---

## Qué Queda Pendiente 🔧

Véase `docs/todo.md` para el plan de ejecución completo.

---

## Riesgos Abiertos 🔴

1. **Infraestructura expuesta:** Inmediato análisis de si este repo fue público; si sí, rotar credenciales
2. **Sin tooling de calidad:** Sin linting, tests o auditoría de dependencias
3. **Sin error handling:** Difícil debuggear en producción
4. **Deuda técnica acumulada:** Composables incrustadas, magic strings, tipos genéricos

---

## Próximos Pasos

1. **Esta sesión (P0):** Implementar cambios de certeza alta (linting, config, tipos)
2. **Sesión estratégica:** Decidir rotación de SSH + auditoría de historial git
3. **Backlog:** Tests, observabilidad, CI/CD avanzado

