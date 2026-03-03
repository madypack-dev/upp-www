# Migration Guide: useContent() Composable

**Guía de migración gradual de componentes a la arquitectura limpia de contenido.**

## 🎯 Objetivo

Migrar gradualmente los componentes existentes que importan `siteContent` directamente a usar el composable `useContent()`, obteniendo beneficios de testabilidad y extensibilidad.

## ✅ Estado Actual

### Uso Antiguo (Aún funciona)
```typescript
import { siteContent } from "@/content/siteContent"

export default {
  setup() {
    return { siteContent }
  }
}

<template>
  <header>{{ siteContent.header.brandFull }}</header>
</template>
```

### Uso Nuevo (Recomendado)
```typescript
import { useContent } from "@/composables/useContent"

export default {
  setup() {
    const { content, load, isLoaded, error } = useContent()
    
    onMounted(() => load())
    
    return { content, isLoaded, error }
  }
}

<template>
  <header v-if="isLoaded && content?.header">
    {{ content.header.brandFull }}
  </header>
  <div v-else-if="error" class="error">{{ error }}</div>
</template>
```

## 📋 Componentes a Migrar

### Por orden de prioritad:

1. **AppHeader.vue** ← Usa `content.header`
   - Import actual: ninguno (usa siteContent directamente? revisar)
   - Nueva forma: `useContent()` → `content.header`
   - Prioridad: Alta (headerVisible en múltiples páginas)

2. **HeroSection.vue** ← Usa `content.hero` + `content.contact`
   - Prioridad: Alta (hero es sección principal)
   - Accede: hero, products categories

3. **ProductCategories.vue** ← Usa `content.products`
   - Prioridad: Media
   - Tipo: Lazy load solo sección "products"

4. **IndustriesSection.vue** ← Usa `content.industries`
   - Prioridad: Media

5. **SustainabilitySection.vue** ← Usa `content.sustainability`
   - Prioridad: Media

6. **AboutSection.vue** ← Usa `content.about`
   - Prioridad: Media

7. **LocationSection.vue** ← Usa `content.location`
   - Prioridad: Media

8. **StatsBar.vue** ← Usa `content.stats`
   - Prioridad: Baja (decorativo)

9. **FloatingActions.vue** ← Usa `content.floatingActions` + `content.contact`
   - Prioridad: Media

## 🚀 Proceso de Migración

### Paso 1: Migrar un componente simple

**Antes:**
```typescript
// ProductCategories.vue
import { siteContent } from "@/content/siteContent"

export default {
  setup() {
    return { siteContent }
  }
}
```

**Después:**
```typescript
// ProductCategories.vue
import { useContent } from "@/composables/useContent"
import { onMounted } from "vue"

export default {
  setup() {
    const { content, load, isLoaded } = useContent()
    
    onMounted(() => load())
    
    return { content, isLoaded }
  }
}
```

**Template cambios:**
```typescript
// Antes
<div>{{ siteContent.products.sectionTitle }}</div>

// Después
<div v-if="isLoaded">{{ content?.products.sectionTitle }}</div>
```

### Paso 2: Lazy-load sección específica

Para componentes que no necesitan todas las secciones:

```typescript
// ProductCategories.vue (optimized)
import { useContent } from "@/composables/useContent"
import { ref } from "vue"

export default {
  setup() {
    const products = ref(null)
    const isLoading = ref(false)
    
    const loadProducts = async () => {
      isLoading.value = true
      const { getSection } = useContent()
      products.value = await getSection('products')
      isLoading.value = false
    }
    
    onMounted(() => loadProducts())
    
    return { products, isLoading }
  }
}
```

### Paso 3: Migrar componentes que dependen de HeroSection

HeroSection consume header, hero, products, contact → necesita cargar todo:

```typescript
// HeroSection.vue
import { useContent } from "@/composables/useContent"
import { onMounted } from "vue"

export default {
  setup() {
    const { content, load, isLoaded, error } = useContent()
    
    onMounted(async () => {
      if (!isLoaded.value) {
        await load()
      }
    })
    
    return { content, isLoaded, error }
  }
}
```

### Paso 4: Migrar FloatingActions (acceso a contact)

```typescript
// FloatingActions.vue
import { useContent } from "@/composables/useContent"

export default {
  setup() {
    const { content, load } = useContent()
    
    onMounted(() => load())
    
    return { content }
  }
}

<template>
  <button v-if="content?.contact?.whatsappNumber">
    {{ content.contact.whatsappNumber }}
  </button>
</template>
```

## 📊 Checklist de Migración

```
[ ] AppHeader.vue
[ ] HeroSection.vue
[ ] ProductCategories.vue
[ ] IndustriesSection.vue
[ ] SustainabilitySection.vue
[ ] AboutSection.vue
[ ] LocationSection.vue
[ ] StatsBar.vue
[ ] FloatingActions.vue
```

## 🧪 Testing Migraciones

### Antes de migrar - Backup
```bash
# Crear branch para migración
git checkout -b feature/migrate-to-useContent
```

### Test cada componente después de migrar
```typescript
describe("ProductCategories.vue migrated", () => {
  it("should load products on mount", async () => {
    const wrapper = mount(ProductCategories)
    
    // Wait for load
    await flushPromises()
    
    // Assert content loaded
    expect(wrapper.text()).toContain("Categorías de Productos")
  })
})
```

### Validación rápida
```bash
npm run build    # Debe compilar sin errores
npm run lint     # Debe pasar linting
npm run test     # Si hay tests unitarios
```

## ⚡ Beneficios Después de Migración

### Para Desarrollo
- ✅ Más fácil hacer tests unitarios
- ✅ Componentes más independientes
- ✅ Fácil moclear contenido en tests
- ✅ Separación clara de concerns

### Para Operaciones Futuras
- ✅ Cambiar a ApiContentProvider sin tocar componentes
- ✅ Agregar caching sin cambios de código
- ✅ Validación de contenido explícita

### Para Mantenimiento
- ✅ Errores de contenido detectados en useContent
- ✅ Loading states claros
- ✅ Type-safe (TypeScript valida todo)

## 🔄 Rollback (Si algo falla)

Si una migración causa problemas:

```bash
# Revert el componente específico
git checkout src/components/ProductCategories.vue

# O revert todo el branch
git reset --hard origin/main
git branch -D feature/migrate-to-useContent
```

## 📝 Consideraciones Especiales

### 1. Componentes dentro de componentes

Si ProductCategories es usado dentro de HeroSection:
- HeroSection carga todo con `useContent()`
- ProductCategories puede recibir `content` como prop
- O ProductCategories puede usar `useContent()` y inyectará lo necesario

```typescript
// HeroSection.vue
<ProductCategories v-if="isLoaded" :content="content" />

// ProductCategories.vue
export default {
  props: {
    content: Object
  },
  setup(props) {
    // Usa props.content sin recargar
    return { products: props.content?.products }
  }
}
```

### 2. Loading states

Mostrar skeleton/placeholder mientras carga:

```typescript
<template>
  <div v-if="isLoading" class="skeleton">
    <div class="skeleton-line"></div>
  </div>
  <div v-else-if="isLoaded" class="content">
    {{ content?.header.brandFull }}
  </div>
  <div v-else-if="error" class="error">
    {{ error }}
  </div>
</template>
```

### 3. Error handling

Mostrar error amigable al usuario:

```typescript
const { content, error, load } = useContent()

const handleError = () => {
  if (error.value) {
    console.error("Content loading failed:", error.value)
    // Mostrar toast o snackbar
  }
}

watch(() => error.value, handleError)
```

## 🎓 Recursos

- [docs/clean-architecture-content.md](./clean-architecture-content.md) - Arquitectura completa
- [src/composables/useContent.ts](../src/composables/useContent.ts) - Implementación
- [src/config/content.ts](../src/config/content.ts) - Configuración DI

## 📅 Timeline Sugerido

- **Semana 1:** AppHeader + HeroSection (más visibles)
- **Semana 2:** Resto de componentes
- **Semana 3:** Tests unitarios para cada uno
- **Semana 4:** Validación y QA

---

**Nota:** La migración es completamente opcional. El sistema antiguo seguirá funcionando sin cambios. Esta es una mejora gradual para mejor arquitectura a largo plazo.
