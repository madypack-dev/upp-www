# Clean Architecture + SOLID: Content Layer

**Aplicado a:** `src/content/siteContent.ts`  
**Fecha:** Marzo 3, 2026  
**Estado:** ✅ Implementado

## 📋 Objetivo

Aplicar arquitectura limpia y principios SOLID a la capa de contenido, transformando un objeto estático `siteContent` en una estructura extensible, testeable y mantenible que permite múltiples fuentes de contenido sin modificar código existente.

## 🏗️ Estructura de Capas

```
┌─────────────────────────────────────────┐
│         Vue Components (Consumer)        │
│         useContent() composable          │
└────────────────────┬────────────────────┘
                     │
┌────────────────────▼────────────────────┐
│        Configuration Layer               │
│        src/config/content.ts             │
│        (DI Container)                   │
└────────────────────┬────────────────────┘
                     │
┌────────────────────▼────────────────────┐
│      Application Layer (Use Cases)       │
│  ContentLoader   │  SectionResolver     │
│      + Ports     │  (Orchestration)     │
└────────────────────┬────────────────────┘
                     │
┌────────────────────▼────────────────────┐
│    Infrastructure Layer (Implementations)│
│  StaticContentProvider                  │
│  ContentValidator                       │
│  (Technical Details)                    │
└────────────────────┬────────────────────┘
                     │
┌────────────────────▼────────────────────┐
│        Domain Layer (Pure Logic)         │
│   IContentProvider  │ ContentSection     │
│   IContentValidator │ SiteContentStruct  │
│   (Zero Framework)  │ Types              │
└─────────────────────────────────────────┘
```

### Capas Explicadas

#### **Domain Layer** (`src/domain/content/`)
- **Responsabilidad:** Definir qué es contenido, cómo se valida, cómo se entrega
- **Características:** Sin dependencias externas, puro TypeScript
- **Archivos:**
  - `ContentSection.types.ts` (200 líneas): Tipos para cada sección de UI
  - `IContentProvider.ts` (30 líneas): Contrato de proveedores
  - `IContentValidator.ts` (40 líneas): Contrato de validadores

#### **Application Layer** (`src/application/content/`)
- **Responsabilidad:** Orquestar casos de uso, aplicar lógica de negocio
- **Características:** No sabe de Vue, Vite, o APIs específicos
- **Archivos:**
  - `ContentLoader.ts` (60 líneas): Caso uso = cargar + validar
  - `SectionResolver.ts` (80 líneas): Caso uso = resolver secciones

#### **Application Ports** (`src/application/ports/`)
- **Responsabilidad:** Definir cómo la aplicación accede a recursos
- **Características:** Driven adapter pattern (inversión de dependencias)
- **Archivos:**
  - `ContentPort.ts` (20 líneas): Puerto para acceso a contenido

#### **Infrastructure Layer** (`src/infrastructure/content/`)
- **Responsabilidad:** Implementar interfaces, detalles técnicos
- **Características:** Framework-specific, reemplazable
- **Archivos:**
  - `StaticContentProvider.ts` (80 líneas): Lee de siteContent.ts
  - `ContentValidator.ts` (120 líneas): Valida estructura

#### **Configuration Layer** (`src/config/content.ts`)
- **Responsabilidad:** Inyectar dependencias, orquestar startup
- **Características:** DI Container, entry point único
- **Características:** 40 líneas, re-exports simples

#### **Consumer Layer** - Vue Components
- **Responsabilidad:** Usar contenido sin conocer arquitectura
- **Interface:** `useContent()` composable (simple)

## 🟢 SOLID Principles Implemented

### 1. Single Responsibility Principle (SRP)

**Antes:**
```typescript
// content.ts contiene:
// - estructura de datos
// - definición de tipos
// - acceso (estático)
// - validación (implícita)
// No se puede:
// - Cargar de API sin editar
// - Validar explícitamente
// - Testear sin componentes Vue
```

**Después:**
```typescript
// Cada clase una responsabilidad:
ContentLoader.load()        // Cargar + validar
SectionResolver.resolve()   // Resolver secciones
StaticContentProvider       // Obtener contenido
ContentValidator            // Validar
useContent()               // Vue binding
```

**Beneficio:** Cada clase tiene razón única para cambiar.

### 2. Open/Closed Principle (OCP)

**Antes:**
```typescript
// Para agregar fuente API:
// - Modificar siteContent.ts
// - Editar cada componente que lo importa
// - Cambiar lógica de App.vue
```

**Después:**
```typescript
// Para agregar fuente API:
export class ApiContentProvider implements IContentProvider {
  async loadContent() { /* fetch from API */ }
  async loadSection(section) { /* fetch section */ }
  async isAvailable() { /* check health */ }
  getSource() { return "API"; }
}

// En config/content.ts:
const provider = process.env.USE_API
  ? new ApiContentProvider()
  : new StaticContentProvider();

// Los componentes NO cambian - interfaces iguales
```

**Beneficio:** Extensible sin modificar código existente.

### 3. Liskov Substitution Principle (LSP)

```typescript
// IContentProvider contrato:
interface IContentProvider {
  loadContent(): Promise<SiteContentStructure>
  loadSection<T>(section: T): Promise<SiteContentStructure[T]>
  isAvailable(): Promise<boolean>
}

// Todas estas implementaciones son sustituibles:
new StaticContentProvider()  // ✅
new ApiContentProvider()     // ✅
new FirebaseContentProvider()// ✅
new LocalStorageContentProvider() // ✅

// ContentLoader funciona con cualquiera:
const loader = new ContentLoader(provider, validator)
// No necesita cambios
```

**Beneficio:** Subclases reemplazan padres sin sorpresas.

### 4. Interface Segregation Principle (ISP)

**Antes:**
```typescript
// Un objeto monolítico que hace todo
const siteContent = {
  header, hero, products, industries, ...
  // Si necesitas solo header, cargas todo
}
```

**Después:**
```typescript
// Interfaces pequeñas y focalizadas:
interface IContentProvider {
  loadContent(): Promise<SiteContentStructure>
  loadSection<T>(section: T): Promise<SiteContentStructure[T]>
  isAvailable(): Promise<boolean>
  getSource(): string
}

interface IContentValidator {
  validate(content): ValidationResult
  validateSection(section, data): ValidationResult
  validateRequired(content): ValidationResult
  validateTypes(content): ValidationResult
  getName(): string
}

interface IContentPort {
  getProvider(): IContentProvider
  getName(): string
}

// Consumidor inyecta solo lo que necesita:
constructor(provider: IContentProvider) { /* usa provider */ }
// No sabe de validador ni puerto
```

**Beneficio:** Interfaces especializadas, bajo acoplamiento.

### 5. Dependency Inversion Principle (DIP)

**Antes:**
```typescript
// App.vue importa directamente:
import { siteContent } from "@/content/siteContent"

// Tight coupling:
// - Cambiar fuente = editar todos los imports
// - Testear = necesita archivo real
// - Mockear = no es fácil
```

**Después:**
```typescript
// Componentes dependen de abstracciones:
import { useContent } from "@/composables/useContent"

// Composable inyecta dependencias:
const { content, load } = useContent()

// config/content.ts maneja inyección:
const provider = createStaticContentProvider()
const validator = createContentValidator()
const loader = new ContentLoader(provider, validator)

// Beneficios:
// - Cambiar proveedor: 1 lugar (config/content.ts)
// - Testear: mockear IContentProvider fácil
// - Desacoplar: componentes NO importan detalles
```

**Beneficio:** Depender de abstracciones, no de concretos.

## 📂 Árbol de Archivos Creados

```
src/
├── domain/content/
│   ├── ContentSection.types.ts     (200 líneas) ← Tipos puros
│   ├── IContentProvider.ts         (30 líneas)  ← Interfaz
│   └── IContentValidator.ts        (40 líneas)  ← Interfaz
│
├── application/content/
│   ├── ContentLoader.ts            (60 líneas)  ← Caso uso
│   └── SectionResolver.ts          (80 líneas)  ← Caso uso
│
├── application/ports/
│   └── ContentPort.ts              (20 líneas)  ← Puerto
│
├── infrastructure/content/
│   ├── StaticContentProvider.ts    (80 líneas)  ← Impl.
│   └── ContentValidator.ts         (120 líneas) ← Impl.
│
├── composables/
│   └── useContent.ts               (150 líneas) ← Vue binding
│
└── config/
    └── content.ts                  (40 líneas)  ← DI Container
```

**Total nuevos archivos:** 9  
**Total líneas:** ~820  
**Líneas modificadas:** src/types/domain.ts (ya tenía contact)

## 🧪 Testing Strategy

### Unit Tests (Puro dominio)

```typescript
describe("ContentValidator", () => {
  it("debe validar estructura requerida", () => {
    const validator = new ContentValidator()
    const content = { /* ... */ }
    const result = validator.validate(content)
    
    expect(result.isValid).toBe(true)
    expect(result.errors).toHaveLength(0)
  })

  it("debe detectar secciones faltantes", () => {
    const content = { header: {}, /* falta hero */ }
    const result = validator.validateRequired(content)
    
    expect(result.isValid).toBe(false)
    expect(result.errors[0].field).toBe("hero")
  })
})

describe("ContentLoader", () => {
  it("debe cargar y validar contenido", async () => {
    const mockProvider = {
      loadContent: async () => ({ /* mock */ }),
      isAvailable: async () => true,
      getSource: () => "Mock",
      loadSection: async () => ({}),
    }
    const validator = new ContentValidator()
    const loader = new ContentLoader(mockProvider, validator)
    
    const result = await loader.load()
    expect(result.success).toBe(true)
  })

  it("debe reportar errores de validación", async () => {
    const mockProvider = {
      loadContent: async () => ({}), // vacío = inválido
      isAvailable: async () => true,
      // ...
    }
    const loader = new ContentLoader(mockProvider, validator)
    const result = await loader.load()
    
    expect(result.success).toBe(false)
    expect(result.errors.length).toBeGreaterThan(0)
  })
})

describe("SectionResolver", () => {
  it("debe resolver sección específica", async () => {
    const mockProvider = {
      loadSection: async (section) => ({ /* mock */ }),
      // ...
    }
    const resolver = new SectionResolver(mockProvider)
    
    const result = await resolver.resolve({
      section: "header",
      throwOnMissing: false,
    })
    
    expect(result.success).toBe(true)
  })
})
```

### Integration Tests (Con Vue)

```typescript
describe("useContent composable", () => {
  it("debe cargar contenido", async () => {
    const { content, load, isLoaded } = useContent()
    
    expect(isLoaded.value).toBe(false)
    
    await load()
    
    expect(isLoaded.value).toBe(true)
    expect(content.value).toBeDefined()
    expect(content.value?.header).toBeDefined()
  })

  it("debe cachear contenido", async () => {
    const { load } = useContent()
    
    await load()
    await load() // Segunda llamada
    
    // No debería recargar (verificar con spies)
  })

  it("debe resolver secciones", async () => {
    const { getSection } = useContent()
    const hero = await getSection("hero")
    
    expect(hero).toBeDefined()
    expect(hero.title).toBeDefined()
  })
})
```

## 🔄 Migration Path (Opcional)

### Componentes pueden usar de dos formas:

**Forma 1: Composable (Recomendado)**
```typescript
// AppHeader.vue
import { useContent } from "@/composables/useContent"

export default {
  setup() {
    const { content, load } = useContent()
    
    onMounted(() => load())
    
    return { content }
  }
}

<template>
  <header v-if="content?.header">
    <h1>{{ content.header.brandFull }}</h1>
  </header>
</template>
```

**Forma 2: Import directo (Backward compatible)**
```typescript
// App.vue - Sin cambios necesarios
import { siteContent } from "@/content/siteContent"

export default {
  setup() {
    return { siteContent }
  }
}
```

Ambas funcionan. Gradualmente migrar a composable para testabilidad.

## 🚀 Extensiones Futuras (Fáciles ahora)

### 1. Content desde API (5 minutos)
```typescript
export class ApiContentProvider implements IContentProvider {
  async loadContent() {
    const response = await fetch('/api/content')
    return response.json()
  }
  
  async loadSection<T extends ContentSection>(section: T) {
    const response = await fetch(`/api/content/${section}`)
    return response.json()
  }
  
  async isAvailable() {
    try {
      const response = await fetch('/api/health')
      return response.ok
    } catch {
      return false
    }
  }
  
  getSource() { return "API" }
}

// En config/content.ts:
const provider = process.env.VITE_CONTENT_SOURCE === 'api'
  ? new ApiContentProvider()
  : new StaticContentProvider()
```

### 2. Content desde Base de Datos (10 minutos)
```typescript
export class DatabaseContentProvider implements IContentProvider {
  constructor(private db: Database) {}
  
  async loadContent() {
    return this.db.collection('content').doc('main').get()
  }
  
  async loadSection<T extends ContentSection>(section: T) {
    return this.db.collection('content').doc(section).get()
  }
  
  async isAvailable() {
    return this.db.isConnected()
  }
  
  getSource() { return "Database" }
}
```

### 3. Cache con Service Worker (15 minutos)
```typescript
export class CachedContentProvider implements IContentProvider {
  constructor(private baseProvider: IContentProvider) {}
  
  async loadContent() {
    const cached = await this.getFromCache()
    if (cached) return cached
    
    const content = await this.baseProvider.loadContent()
    await this.saveToCache(content)
    return content
  }
  
  private async getFromCache() {
    const cache = await caches.open('content-v1')
    const response = await cache.match('/content.json')
    return response?.json()
  }
  
  private async saveToCache(content: SiteContentStructure) {
    const cache = await caches.open('content-v1')
    const response = new Response(JSON.stringify(content))
    await cache.put('/content.json', response)
  }
  
  // ... rest of interface
}
```

### 4. Fallback Provider (Chain of Responsibility)
```typescript
export class FallbackContentProvider implements IContentProvider {
  constructor(
    private primary: IContentProvider,
    private fallback: IContentProvider
  ) {}
  
  async loadContent() {
    try {
      return await this.primary.loadContent()
    } catch (error) {
      console.warn(`Primary provider failed, using fallback`)
      return this.fallback.loadContent()
    }
  }
  
  // ... rest of interface
}

// Uso:
const provider = new FallbackContentProvider(
  new ApiContentProvider(),
  new StaticContentProvider()
)
```

## 📊 Comparativa Antes/Después

| Aspecto | Antes | Después |
|---------|-------|---------|
| **Acoplamiento** | Directo a siteContent.ts | Interfaces (DIP) |
| **Extensión** | Modificar archivo existente (OCP ✗) | New class implementing interface (OCP ✓) |
| **Testing** | Necesita componentes Vue | Pure functions testables (SRP ✓) |
| **Validación** | Implícita | Explícita y auditable |
| **múltiples fuentes** | No es posible | Proveedores intercambiables (LSP ✓) |
| **Mockeo** | Difícil | DI facilita mocks |
| **Responsabilidades** | Mezcladas | Segregadas (ISP ✓) |
| **Mantenibilidad** | Difícil (big monolith) | Fácil (layers claros) |

## 🎯 Checklist de Beneficios

- ✅ **SRP:** Cada clase una responsabilidad única
- ✅ **OCP:** Extensible sin modificar existente
- ✅ **LSP:** Proveedores intercambiables
- ✅ **ISP:** Interfaces segregadas y focalizadas
- ✅ **DIP:** Inversión de dependencias completa
- ✅ **Testeable:** Clases puras sin Vue
- ✅ **Escalable:** Fácil agregar nuevas fuentes
- ✅ **Documentado:** Arquitectura clara
- ✅ **Backward compatible:** siteContent aún accesible
- ✅ **Type-safe:** TypeScript strict mode completo

## 🔗 Archivos Relacionados

- [docs/clean-architecture-seo.md](./clean-architecture-seo.md) - Arquitectura SEO (patrón similar aplicado a otra capa)
- [src/config/content.ts](../src/config/content.ts) - Entry point DI
- [src/composables/useContent.ts](../src/composables/useContent.ts) - Vue binding
- [src/types/domain.ts](../src/types/domain.ts) - Tipos globales

## 📝 Próximos Pasos (Opcional)

1. **Migrar gradualmente componentes a `useContent()`** - Mejor testabilidad
2. **Agregar tests unitarios** - Cobertura para cada capa
3. **Implementar ApiContentProvider** - Si futura fuente remota es necesaria
4. **Documentar casos de uso específicos** - Ejemplos por sección
5. **Performance monitoring** - Medir impacto de lazy-loading secciones

---

**Autor:** GitHub Copilot  
**Patrón:** Clean Architecture + SOLID Principles  
**Lenguaje:** TypeScript + Vue 3
