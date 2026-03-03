# Arquitectura Limpia + SOLID - Refactorización SEO

**Versión:** 2.0  
**Estado:** Implementado  
**Fecha:** 2026-03-03

---

## 📋 Resumen Ejecutivo

Se refactorizó la capa SEO aplicando **Arquitectura Limpia** y **principios SOLID**, organizando el código en 4 capas independientes:

1. **Domain** - Interfaces y tipos puros (sin dependencias)
2. **Application** - Casos de uso (orquestación)
3. **Infrastructure** - Detalles técnicos (Vite, config concreta)
4. **Config** - Punto de entrada único

---

## 🏗️ Estructura de Capas

```
src/
├── domain/seo/                    ← INTERFACES Y TIPOS PUROS
│   ├── ISeoConfig.ts              (Contrato: acceso a config SEO)
│   ├── ISeoTransformer.ts         (Contrato: transformación HTML)
│   └── SeoPlaceholder.types.ts    (Tipos de dominio)
│
├── application/seo/               ← CASOS DE USO (LÓGICA NEGOCIO)
│   ├── SeoConfigLoader.ts         (Caso de uso: cargar y validar config)
│   └── SeoHtmlTransformer.ts      (Caso de uso: transformar HTML)
│
├── application/ports/             ← PUERTOS DE SALIDA (Driven Adapters)
│   └── SeoConfigPort.ts           (Interfaz para acceso a config)
│
├── infrastructure/seo/            ← IMPLEMENTACIONES CONCRETAS
│   ├── SeoConfigImpl.ts            (Implementa ISeoConfig con datos UPP)
│   ├── ViteHtmlPlugin.ts          (Implementa ISeoTransformer para Vite)
│   └── SeoPlaceholderMapper.ts    (Lógica pura de mapeo de placeholders)
│
└── config/seo.ts                  ← PUNTO DE ENTRADA (orquestación final)
```

---

## 🎯 Principios SOLID Aplicados

### 1️⃣ **S - Single Responsibility Principle**

Cada clase tiene UNA responsabilidad:

| Clase | Responsabilidad |
|-------|-----------------|
| `ISeoConfig` | Definir contrato de acceso a config |
| `SeoConfigImpl` | Almacenar valores SEO de UPP |
| `ISeoTransformer` | Definir contrato de transformación |
| `ViteHtmlPlugin` | Transformar HTML para Vite |
| `SeoPlaceholderMapper` | Reemplazar placeholders en strings |
| `SeoConfigLoader` | Validar configuración |
| `SeoHtmlTransformationUseCase` | Orquestar transformación |

**Antes:** `seo.ts` mezclaba datos + tipos + lógica (responsabilidades múltiples)  
**Después:** Cada uno su rol, testeable en aislamiento

---

### 2️⃣ **O - Open/Closed Principle**

El código está abierto a extensión, cerrado a modificación:

**Antes:**
```typescript
// Para agregar otra fuente de config, editar vite.config.ts
if (source === 'json') { ... }
else if (source === 'env') { ... }
// cada nueva fuente = cambiar código existente ❌
```

**Después:**
```typescript
// Nueva fuente de config = nueva clase que implementa ISeoConfig
class AirTableSeoConfig implements ISeoConfig { ... }
class FirebaseSeoConfig implements ISeoConfig { ... }
// Código existente NO cambia ✅
```

---

### 3️⃣ **L - Liskov Substitution Principle**

Cualquier implementación de `ISeoTransformer` es intercambiable:

```typescript
// Vite
const vitePlugin = new ViteHtmlPlugin(config);

// CLI (futura)
class CliSeoTransformer implements ISeoTransformer { ... }
const cliTransformer = new CliSeoTransformer(config);

// Ambas se pueden usar de la misma forma ✅
```

---

### 4️⃣ **I - Interface Segregation Principle**

Las interfaces son pequeñas y específicas:

**Antes:**
```typescript
interface Config {
  // todo: 50+ propiedades mezcladas
}
// Cliente debe conocer todo ❌
```

**Después:**
```typescript
interface ISeoConfig {
  getPlaceholderMap(): SeoPlaceholderMap;
  getDomain(): string;
  validate(): { valid: boolean; errors: string[] };
}
// Cliente solo usa métodos que necesita ✅
```

---

### 5️⃣ **D - Dependency Inversion Principle**

Los módulos de alto nivel no dependen de bajo nivel; ambos dependen de abstracciones:

**Antes:**
```typescript
// vite.config.ts depende directamente de seoConfig concreto ❌
import { seoConfig } from './src/config/seo';
const replaced = seoConfig.description; // acoplado
```

**Después:**
```typescript
// vite.config.ts depende de ISeoConfig (interfaz) ✅
const seoConfig: ISeoConfig = createSeoConfigImpl();
const plugin = new ViteHtmlPlugin(seoConfig); // inyectado
```

---

## 📁 Detalles de Cada Capa

### Domain Layer (Sin dependencias)

```typescript
// src/domain/seo/ISeoConfig.ts
export interface ISeoConfig {
  getPlaceholderMap(): SeoPlaceholderMap;
  validate(): { valid: boolean; errors: string[] };
  // ... métodos puros
}

// src/domain/seo/SeoPlaceholder.types.ts
export type SeoPlaceholderId = "SEO_DESCRIPTION" | "SEO_KEYWORDS" | ...;
export interface SeoTransformationResult { ... }
```

**Características:**
- ✅ Sin imports externos
- ✅ Interfaces puras
- ✅ Tipos TypeScript
- ✅ Testeable sin mocks complejos

---

### Application Layer (Casos de uso)

```typescript
// src/application/seo/SeoConfigLoader.ts
export class SeoConfigLoader {
  load(config: ISeoConfig): SeoConfigLoaderResult {
    const validation = config.validate();
    // ... lógica de negocio pura
  }
}

// src/application/seo/SeoHtmlTransformer.ts
export class SeoHtmlTransformationUseCase {
  execute(request: SeoHtmlTransformationRequest): SeoHtmlTransformationResponse {
    // Orquestra validación + transformación
  }
}
```

**Características:**
- ✅ Lógica de negocio pura
- ✅ Depende de interfaces (Domain)
- ✅ Sin dependencias técnicas (no importa Vite)
- ✅ Testeable con inyección de dependencias

---

### Infrastructure Layer (Detalles técnicos)

```typescript
// src/infrastructure/seo/SeoConfigImpl.ts
export class SeoConfigImpl implements ISeoConfig {
  constructor(data: SeoConfigData) { ... }
  getPlaceholderMap(): SeoPlaceholderMap { ... }
}

// src/infrastructure/seo/ViteHtmlPlugin.ts
export class ViteHtmlPlugin implements ISeoTransformer {
  constructor(private readonly seoConfig: ISeoConfig) {}
  createVitePlugin() { ... }
}

// src/infrastructure/seo/SeoPlaceholderMapper.ts
export class SeoPlaceholderMapper {
  static map(html: string, placeholders: SeoPlaceholderMap): SeoTransformationResult {
    // Lógica pura, reutilizable en CLI, Node.js, etc.
  }
}
```

**Características:**
- ✅ Implementaciones concretas de interfaces
- ✅ Depende de Domain + Application
- ✅ Contiene detalles técnicos (Vite)
- ✅ Código de "glue" que conecta todo

---

### Config Layer (Punto de entrada)

```typescript
// src/config/seo.ts
export { createSeoConfigImpl } from '../infrastructure/seo/SeoConfigImpl';

// Compatibilidad hacia atrás
export const seoConfig = createSeoConfigImpl();
```

**Características:**
- ✅ Orquestación final
- ✅ Punto de entrada único
- ✅ Oculta complejidad de otras capas
- ✅ Exporta lo que componentes necesitan

---

## 🔄 Flujo de Datos

### En build-time (Vite):

```
1. vite.config.ts
   ↓
2. createSeoConfigImpl() [Infrastructure]
   ↓
3. new ViteHtmlPlugin(config) [Infrastructure]
   ↓
4. plugin.createVitePlugin() [Implementa ISeoTransformer]
   ↓
5. Vite.transformIndexHtml()
   ├─ SeoPlaceholderMapper.map() [Infrastructure]
   └─ Reemplaza %%PLACEHOLDER%% con valores reales
   ↓
6. dist/index.html (compilado)
```

### En aplicación (Components):

```
1. Componente importa:
   ├─ import { seoConfig } from '@/config/seo'
   ├─ seoConfig.getOrganizationName() // ISeoConfig
   └─ seoConfig.getTelephone()
   
2. Componente NO conoce:
   ├─ Que es SeoConfigImpl
   ├─ Que es ViteHtmlPlugin
   ├─ Cómo se implementa (detalles infraestructura) ✅
```

---

## 🧪 Testabilidad

### Antes (difícil de testear):

```typescript
// seo.ts mezclaba datos + lógica
const result = seoConfig.description; // ¿Qué testear?
// No hay interfaces, no hay inyección de dependencias
```

### Después (fácil de testear):

```typescript
// Mock de ISeoConfig para testing
class MockSeoConfig implements ISeoConfig {
  getPlaceholderMap() { return { /* mock data */ }; }
  validate() { return { valid: true, errors: [] }; }
}

// Test aislado sin Vite
const mapper = new SeoPlaceholderMapper();
const result = mapper.map("<meta content='%%SEO_DESCRIPTION%%'/>", {
  SEO_DESCRIPTION: "Test Description"
});
expect(result.html).toContain("Test Description"); ✅
```

---

## 🚀 Extensiones Futuras (Fáciles ahora)

### 1. Agregar soporte para CLI

```typescript
// Nuevo archivo: src/infrastructure/seo/CliSeoTransformer.ts
export class CliSeoTransformer implements ISeoTransformer {
  transform(html: string): SeoTransformationResult {
    // Implementación para CLI
  }
}

// Uso:
const cliTransformer = new CliSeoTransformer(seoConfig);
const result = cliTransformer.transform(htmlString);
// Código existente NO cambia ✅
```

### 2. Agregar soporte para Firebase

```typescript
// Nuevo archivo: src/infrastructure/seo/FirebaseSeoConfig.ts
export class FirebaseSeoConfig implements ISeoConfig {
  async loadFromFirebase() { ... }
  getPlaceholderMap() { ... }
}

// Código existente puede usar FirebaseSeoConfig sin cambios ✅
```

### 3. Agregar validación custom

```typescript
// Nuevo archivo: src/application/seo/SeoValidator.ts
export class SeoValidator {
  validateKeywords(keywords: string[]): ValidationResult { ... }
  validateImageUrl(url: string): ValidationResult { ... }
}

// Aplicación crecee sin modificar capas inferiores ✅
```

---

## 📊 Comparativa: Antes vs Después

| Aspecto | Antes | Después |
|---------|-------|---------|
| **Archivos** | 2 (`seo.ts`, `vite.config.ts`) | 9 (organizados en capas) |
| **Responsabilidades** | Múltiples por archivo | 1 por archivo (SRP) |
| **Testabilidad** | Difícil (acoplado a Vite) | Fácil (inyección de deps) |
| **Extensibilidad** | Modificar código existente | Agregar código nuevo (OCP) |
| **Refactor CLI** | Duplicaría lógica | Reutiliza SeoPlaceholderMapper |
| **Type Safety** | Parcial (objeto concreto) | Full (interfaces + generics) |
| **Mantenibilidad** | Media | Alta (cada cosa en su lugar) |

---

## 🎯 Checklist de Validación

- ✅ Compilación exitosa (`npm run build`)
- ✅ Sin placeholders sin reemplazar en dist/index.html
- ✅ Todas las clases respetan SRP
- ✅ Todas las interfaces son segregadas (ISP)
- ✅ Inyección de dependencias funcionando (DIP)
- ✅ Posibilidad de agregar extensiones sin modificar (OCP)

---

## 📖 Referencias Archivos

- **Domain:** `src/domain/seo/`
- **Application:** `src/application/seo/` y `src/application/ports/`
- **Infrastructure:** `src/infrastructure/seo/`
- **Config:** `src/config/seo.ts`
- **Vite:** `vite.config.ts`

---

## 🔗 Próximos Pasos

1. **Tests unitarios** para cada capa:
   - `SeoPlaceholderMapper.test.ts`
   - `SeoConfigLoader.test.ts`
   - `ViteHtmlPlugin.test.ts`

2. **Documentación de API**:
   - JSDoc en cada interfaz pública
   - Ejemplos de uso en README

3. **Integración con componentes**:
   - LocationSection.vue: usa `seoConfig.getAddress()`
   - AppHeader.vue: usa `seoConfig.getTelephone()`

4. **Casos de uso adicionales**:
   - CliSeoTransformer para build estático
   - ServerSideRenderer para SSR futuro

---

## 🎓 Recursos Educativos

- **Arquitectura Limpia:** Robert C. Martin, "Clean Architecture"
- **SOLID:** https://en.wikipedia.org/wiki/SOLID
- **Inyección de Dependencias:** https://www.typescriptlang.org/docs/handbook/2/objects-and-members.html

---

## 📝 Notas

- La capa Domain es completamente independiente y testeable
- La capa Application contiene lógica de negocio sin dependencias técnicas
- La capa Infrastructure maneja todos los detalles técnicos (Vite, etc.)
- La capa Config orquesta todo de manera simple para que los componentes usen facil
