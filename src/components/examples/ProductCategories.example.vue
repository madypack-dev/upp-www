/** * Ejemplo: ProductCategories.vue con useContent() * * Muestra cómo migrar un
componente existente de importar siteContent * a usar el composable useContent()
de la arquitectura limpia. * * Beneficios de migración: * - Testeable sin
necesidad de mocker el archivo * - Fácil cambiar a API/DB sin editar componente
* - Loading states y manejo de errores integrado * - Type-safe con TypeScript
completo */

<template>
  <section>
    <!-- Loading skeleton -->
    <div v-if="isLoading" class="space-y-4 animate-pulse">
      <div class="h-8 bg-gray-300 rounded w-1/2"></div>
      <div class="grid grid-cols-2 gap-4">
        <div class="h-40 bg-gray-300 rounded"></div>
        <div class="h-40 bg-gray-300 rounded"></div>
      </div>
    </div>

    <!-- Error state -->
    <div
      v-else-if="hasError"
      class="bg-red-50 border border-red-200 rounded p-4"
    >
      <p class="text-red-800 font-semibold">Error cargando productos</p>
      <p class="text-red-700 text-sm mt-2">{{ error }}</p>
      <button
        @click="retryLoad"
        class="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Reintentar
      </button>
    </div>

    <!-- Content loaded successfully -->
    <div v-else-if="isLoaded && content?.products" class="space-y-8">
      <!-- Section title -->
      <div class="space-y-2">
        <h2 class="text-3xl font-bold text-gray-900">
          {{ content.products.sectionTitle }}
        </h2>
      </div>

      <!-- Product categories grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="category in content.products.categories"
          :key="category.id"
          class="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition"
        >
          <!-- Category header -->
          <h3 class="text-xl font-bold text-gray-900 mb-2">
            {{ category.title }}
          </h3>

          <!-- Category description -->
          <p class="text-gray-700 mb-4">{{ category.description }}</p>

          <!-- Features list -->
          <ul class="space-y-2 mb-4">
            <li
              v-for="(feature, idx) in category.features"
              :key="idx"
              class="flex items-start"
            >
              <span class="text-green-500 mr-2">✓</span>
              <span class="text-gray-700">{{ feature }}</span>
            </li>
          </ul>

          <!-- CTA button -->
          <button
            class="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            {{ content.floatingActions.whatsappLabel }}
          </button>
        </div>
      </div>

      <!-- See all button -->
      <div class="text-center">
        <button
          class="px-6 py-2 border-2 border-blue-600 text-blue-600 rounded hover:bg-blue-50"
        >
          {{ content.products.seeAllLabel }}
        </button>
      </div>

      <!-- Warnings (if any) -->
      <div
        v-if="warnings.length > 0"
        class="bg-yellow-50 border border-yellow-200 rounded p-4"
      >
        <p class="text-yellow-800 text-sm">
          ⚠️ Se encontraron warnings de contenido:
        </p>
        <ul class="mt-2 text-yellow-700 text-xs space-y-1">
          <li v-for="(warning, idx) in warnings" :key="idx">• {{ warning }}</li>
        </ul>
      </div>
    </div>

    <!-- Fallback empty state (shouldn't happen with useContent) -->
    <div v-else class="text-center py-12 text-gray-500">
      No hay contenido disponible
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
// NOTE: This is an EXAMPLE file. For real usage, see content-migration-guide.md
// Import from: import { useContent } from "@/composables/useContent"
// This file is documentation only (not built into dist)

export default defineComponent({
  name: "ProductCategories",
  setup() {
    // In real app: const { content, isLoading, error, isLoaded, hasError, warnings, load } = useContent();

    // Mock data types for example (shows structure)
    const content = ref<any>(null);
    const isLoading = ref(false);
    const error = ref<string | null>(null);
    const isLoaded = computed(() => content.value !== null);
    const hasError = computed(() => error.value !== null);
    const warnings = ref<string[]>([]);

    // In real app:
    // onMounted(() => { load() })
    // const retryLoad = async () => { await load() }
    const retryLoad = () => {
      // In real usage: await load()
    };

    return {
      content,
      isLoading,
      error,
      isLoaded,
      hasError,
      warnings,
      retryLoad,
    };
  },
  // Alternative: using composition API with <script setup>
  // NOTE: Uncomment below and remove script above if preferred
});
</script>

<style scoped>
/* 
  Estilos específicos del componente
  Pueden ser ajustados según necesidad visual
*/
</style>

<!--
=== VERSIÓN CON <script setup> (Vue 3.4+) ===

<script setup lang="ts">
import { useContent } from '@/composables/useContent'
import { onMounted } from 'vue'

const { content, isLoading, error, isLoaded, hasError, warnings, load } = useContent()

onMounted(() => {
  load()
})

const retryLoad = async () => {
  await load()
}
</script>

=== MIGRACIÓN DESDE VERSIÓN ANTERIOR ===

Cambios necesarios:

ANTES (siteContent importado directo):
```
import { siteContent } from "@/content/siteContent"

export default {
  setup() {
    return { siteContent }
  }
}

<h2>{{ siteContent.products.sectionTitle }}</h2>
```

DESPUÉS (useContent composable):
```
import { useContent } from "@/composables/useContent"

export default {
  setup() {
    const { content, load, isLoaded } = useContent()
    onMounted(() => load())
    return { content, isLoaded }
  }
}

<h2 v-if="isLoaded">{{ content?.products.sectionTitle }}</h2>
```

=== TESTING ESTE COMPONENTE ===

import { mount, flushPromises } from '@vue/test-utils'
import ProductCategories from './ProductCategories.vue'
import * as useContentModule from '@/composables/useContent'

describe('ProductCategories.vue', () => {
  it('debería mostrar productos cuando load() devuelve contenido', async () => {
    const mockContent = {
      products: {
        sectionTitle: 'Categorías',
        categories: [
          { id: '1', title: 'Onda', description: 'Para cartón', features: ['60 gr/m²'] }
        ]
      },
      floatingActions: { whatsappLabel: 'WhatsApp' }
    }

    vi.spyOn(useContentModule, 'useContent').mockReturnValue({
      content: ref(mockContent),
      isLoading: ref(false),
      error: ref(null),
      isLoaded: ref(true),
      hasError: ref(false),
      warnings: ref([]),
      load: vi.fn(),
      getSection: vi.fn()
    })

    const wrapper = mount(ProductCategories)
    await flushPromises()

    expect(wrapper.text()).toContain('Categorías')
    expect(wrapper.text()).toContain('Onda')
  })

  it('debería mostrar skeleton mientras carga', async () => {
    vi.spyOn(useContentModule, 'useContent').mockReturnValue({
      content: ref(null),
      isLoading: ref(true),
      error: ref(null),
      isLoaded: ref(false),
      hasError: ref(false),
      warnings: ref([]),
      load: vi.fn(),
      getSection: vi.fn()
    })

    const wrapper = mount(ProductCategories)

    expect(wrapper.find('.animate-pulse').exists()).toBe(true)
  })

  it('debería mostrar error y permitir reintentar', async () => {
    const mockLoad = vi.fn()

    vi.spyOn(useContentModule, 'useContent').mockReturnValue({
      content: ref(null),
      isLoading: ref(false),
      error: ref('Network error'),
      isLoaded: ref(false),
      hasError: ref(true),
      warnings: ref([]),
      load: mockLoad,
      getSection: vi.fn()
    })

    const wrapper = mount(ProductCategories)
    await flushPromises()

    expect(wrapper.text()).toContain('Error cargando productos')
    
    await wrapper.find('button').trigger('click')
    
    expect(mockLoad).toHaveBeenCalled()
  })
})
-->
