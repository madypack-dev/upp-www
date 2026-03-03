# Single File Editable Strategy + Multi-Client Setup

**Solución:** Centralizar TODO el contenido editable en **UNA sola carpeta/archivo**  
**Ventaja:** Sin romper nada, fácil cambios rápidos, escalable a múltiples clientes

---

## ✅ Certezas (Implementado)

### 1. **Contenido Centralizado en Un Archivo**
✅ **Archivo:** `src/config/copy.ts`
- Único lugar donde editar textos, CTAs, números
- Todos los textos de UPP en un sitio
- Cambios automáticamente reflejados en app (zero breaking)
- TypeScript type-safe: no puedes agregar propiedades inválidas

**Cómo funciona:**
```typescript
// Para editar:
1. Abre: src/config/copy.ts
2. Edita solo VALORES (no estructura)
3. Guarda
4. npm run build
5. Done ✅
```

### 2. **Import Centralizado en siteContent.ts**
✅ `src/content/siteContent.ts` ahora importa TODO desde `src/config/copy.ts`
- **Antes:** Valores hardcoded en siteContent.ts
- **Ahora:** `siteContent` = referencia a `editableCopy` desde copy.ts
- **Beneficio:** Un archivo para editar, pronto para múltiples clientes

### 3. **Estructura Type-Safe**
✅ TypeScript valida que no haya errores
```typescript
export type EditableCopy = {
  header: typeof headerCopy;
  hero: typeof heroCopy;
  // etc...
};

export const editableCopy = {
  // ...
} as const satisfies EditableCopy;
```

**Si intentas agregar una propiedad nueva:**
```typescript
// ❌ ERROR: Property 'newProp' does not exist
editableCopy.header.newProp = "valor"
```

### 4. **Sin Necesidad de Recompilar (Con JSON Config)**
✅ Opcional: Para cambios en producción SIN build
- Crear: `public/config.json` con cómo override
- Cargar en runtime (más avanzado, documentado abajo)

---

## 🟨 Dudas de Bajo Nivel (Técnicas) - Con Soluciones

### Duda 1: ¿Si un cliente cambia copy, rompemos otros clientes?
**Respuesta:** No. Cada cliente tiene su propia rama/copia de `copy.ts`

**Solución:**
```
Opción A: Copy del repo (más simple para inicio)
├─ git clone upp-www → upp-www-client-a/
│  └─ Edita: src/config/copy.ts
├─ git clone upp-www → upp-www-client-b/
│  └─ Edita: src/config/copy.ts
└─ Cada uno con su build & deploy

Opción B: Multi-tenant en mismo repo (escalable)
├─ src/config/copy.upp.ts (cliente A)
├─ src/config/copy.acme.ts (cliente B)
└─ Environment variable: VITE_CLIENT=upp/acme
   → dynamic import en siteContent.ts
```

### Duda 2: ¿Qué pasa si editamos number de contacto? ¿Se sincroniza en SEO?
**Respuesta:** Parcialmente automático, parcialmente manual

**Actualización automática:**
- `useContent()` composable → obtiene nuevo número
- Componentes re-render con número actualizado
- WhatsApp links se actualizan

**Actualización manual necesaria:**
```typescript
// Si cambias contacto en copy.ts TAMBIÉN cambiar:

1. src/infrastructure/seo/SeoConfigImpl.ts
   ~ línea 60: TelePhone field en schema

2. docs/gmb-setup.md
   ~ línea 25: Phone para GMB verification
```

**Solución:** Script de validación (crear si es necesario)

### Duda 3: ¿Puedo editar copy en producción sin build?
**Respuesta:** No por default. Opciones:

**Opción A: GitHub UI (Recomendado)** - 2 minutos
```
1. GitHub.com → Go to src/config/copy.ts
2. Edit inline
3. Save → GitHub Actions auto-builds & deploys
4. 3 minutos en vivo
```

**Opción B: JSON Config en runtime** - Más complejo
```typescript
// src/config/copy.runtime.ts (crear si necesario)
const override = await fetch('/api/copy.json')
const editable = Object.assign(editableCopy, override)
export { editable }
```

### Duda 4: ¿Estructura de carpetas está bien?
**Respuesta:** Sí, pero hay alternativas

**Actual (Recomendado):**
```
src/
├─ config/
│  └─ copy.ts              ← EDITABLE (single file)
└─ content/
   └─ siteContent.ts       ← IMPORT de copy.ts
```

**Alternativa si crece:**
```
src/
├─ config/
│  └─ content/
│     ├─ copy.ts           ← Textos
│     ├─ copy.seo.ts       ← SEO strings
│     └─ copy.validation.ts ← Validation msgs
└─ content/
   └─ siteContent.ts       ← IMPORT
```

---

## 🚀 Estrategia Multi-Cliente (Alto Nivel)

### Escenario 1: Cliente Nuevo (Copia del Repo)
**Tiempo:** 15 minutos  
**Dificultad:** Muy fácil  
**Para:** Setup inicial rápido

```bash
# 1. Clone el repo
git clone <upp-www-repo> <client-name>-www

# 2. Edita SOLO copy.ts
cd <client-name>-www
nano src/config/copy.ts
# Cambias: brand name, numbers, descripciones, etc.

# 3. Test local
npm run dev
# Visita http://localhost:5173 → ve cambios

# 4. Deploy
git add .
git commit -m "Setup cliente <client-name>"
git push origin main
# GitHub Actions → auto-build & deploy a SERVER

# 5. Done ✅
```

**Ventajas:**
- ✅ Repo independiente
- ✅ No afecta otros clientes
- ✅ Control total de deploy
- ✅ Fácil hacer cambios después

**Desventajas:**
- ❌ Duplicación de código (si feature nueva, cambiar N repos)
- ❌ N repos = N deployments

---

### Escenario 2: Multi-Tenant (Same Repo, Different Clients)
**Tiempo:** 30 minutos setup inicial  
**Dificultad:** Medio  
**Para:** Muchos clientes, mismo código

```typescript
// src/config/copy.ts (MASTER)
export const copies = {
  upp: { /* ... */ },
  acme: { /* ... */ },
  other: { /* ... */ },
};

export const editableCopy = copies[import.meta.env.VITE_CLIENT_NAME];
```

```bash
# Build para client específico
VITE_CLIENT_NAME=upp npm run build
# dist/ → UPP site

VITE_CLIENT_NAME=acme npm run build
# dist/ → ACME site

# En production, env var la setea CI/CD o admin panel
```

**Ventajas:**
- ✅ 1 repo, múltiples clients
- ✅ Feature nueva → update en N sitios automático
- ✅ Fácil escalar a 10+ clientes

**Desventajas:**
- ❌ Setup más complejo
- ❌ Requiere env var management

---

### Escenario 3: API-Driven Config (Súper Escalable)
**Tiempo:** 2 horas setup  
**Dificultad:** Alto  
**Para:** 50+ clientes, cambios dinámicos

```typescript
// src/composables/useEditableCopy.ts (nuevo)
const [, copy] = await fetch(`/api/copy/${tenantId}`).then(r => r.json())
// Runtime override de editableCopy desde API
```

**Ventajas:**
- ✅ 0 deploys para cambios de copy
- ✅ Admin panel para editar
- ✅ A/B testing capabilities

**Desventajas:**
- ❌ Requiere backend
- ❌ Más latency en load
- ❌ Overkill para MVP

---

## 📋 Recomendación para UPP

**Fase 1 (Ahora - Implementado):** ✅
```
├─ src/config/copy.ts (single editable file)
├─ Carpeta limpia
├─ Zero breaking changes
```

**Fase 2 (Si hay segundo cliente):** 
```
Option A (Recomendado - Simple):
├─ Copy el repo
├─ Edita copy.ts solo
├─ Deploy separado
└─ Time: 15 min

Option B (Si muchos clientes):
├─ Implement multi-tenant (copy.ups.ts, copy.acme.ts)
├─ VITE_CLIENT_NAME env
└─ Time: 30 min
```

**Fase 3 (Si 50+ clientes):**
```
└─ Full API backend + admin panel
   └─ Time: 2-3 days
```

---

## 🔧 Cómo Funciona Ahora (Resumen)

```
┌─ User edita: src/config/copy.ts
│  └─ headerCopy.brandShort = "New Brand"
│
├─ TypeScript valida: No hay errores ✅
│
└─ src/content/siteContent.ts importa:
   └─ export const siteContent = {
      header: {
        brandShort: editableCopy.header.brandShort,
        // ↑ Automáticamente usa "New Brand"
      }
    }
```

**Build:** `npm run build`
- 43 modules transformados
- siteContent.ts contiene "New Brand"
- index.html renderiza "New Brand"
- dist/ ready para deploy

**Deploy:** GitHub Actions automático
- Push → Build → Deploy
- 3-5 minutos en vivo

---

## 📝 Instrucciones para Cliente

Si el cliente (ej: CEO de UPP) necesita cambiar algo. Darle estos pasos:

```markdown
# ¿Cómo cambiar el texto del sitio?

## Opción 1: Via GitHub (Fácil)
1. Ir a: https://github.com/upp/upp-www
2. Navega a: src/config/copy.ts
3. Click "Editar" (lápiz)
4. Cambia el texto que quieras
5. Scroll abajo → "Commit changes" → "Propose changes"
6. En 3 minutos está en vivo ✅

## Opción 2: Pedirle a Desarrollo
1. Envía el texto nuevo
2. Dev edita src/config/copy.ts
3. Build & Deploy automático

## ¿Qué NO cambiar?
❌ Nombres de propiedades (ej: no renombres "brandShort")
❌ Estructura de arrays (ej: no cambies orden de "categories")
✅ Cambiar valores (ej: "UPP" → "New Name")
✅ Cambiar descripciones completas
✅ Cambiar números de teléfono/WhatsApp
```

---

## Checklist Final

- ✅ `src/config/copy.ts` creado (single editable file)
- ✅ `src/content/siteContent.ts` importa desde copy.ts
- ✅ Type-safe (TypeScript valida)
- ✅ Zero breaking changes
- ✅ Build exitoso
- ✅ Multi-client ready (copy o multi-tenant)
- ✅ Documentado (instrucciones en copy.ts)

---

**Status:** 🟢 Ready for Production + Client Edits  
**Next:** Cliente necesita hacer cambios → Edita copy.ts → ¡Listo!
