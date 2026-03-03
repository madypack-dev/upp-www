<template>
  <section id="ubicacion" class="mb-4 px-4">
    <div
      class="relative overflow-hidden rounded-xl bg-primary p-6 text-background-dark md:p-8"
    >
      <div class="absolute -bottom-10 -right-10 rotate-12 opacity-20">
        <MaterialSymbolIcon name="local_shipping" class="size-[120px]" />
      </div>
      <div class="relative z-10">
        <h4 class="mb-2 text-xl font-bold">Entregas en Ringuelet</h4>
        <p class="mb-4 font-medium text-background-dark/80">
          Logística propia para La Plata y GBA. Consulta por envíos al interior.
        </p>
        <div class="flex items-center gap-2">
          <MaterialSymbolIcon name="location_on" class="size-6" />
          <span class="font-bold underline"
            >Calle 508 e/ 16 y 17, Ringuelet</span
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import MaterialSymbolIcon from "./icons/MaterialSymbolIcon.vue";
</script>
