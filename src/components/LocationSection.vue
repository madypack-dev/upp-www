<template>
  <section id="ubicacion" class="mb-4 px-4">
    <div
      class="relative overflow-hidden rounded-xl border border-primary/20 bg-background-light p-6 text-slate-900 md:p-8 dark:bg-slate-900 dark:text-slate-100"
    >
      <div class="relative z-10">
        <h4 class="mb-2 text-xl font-bold">{{ siteContent.location.title }}</h4>
        <div class="flex items-center gap-2">
          <MaterialSymbolIcon name="location_on" class="size-6" />
          <span class="font-bold underline">{{
            siteContent.location.address
          }}</span>
        </div>
        <div
          class="mt-4 overflow-hidden rounded-lg border border-background-dark/20"
        >
          <iframe
            :title="siteContent.location.mapTitle"
            src="https://www.google.com/maps?q=Calle+508+e%2F+16+y+17,+Ringuelet,+La+Plata&output=embed"
            class="h-56 w-full md:h-72"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { siteContent } from "../content/siteContent";
import MaterialSymbolIcon from "./icons/MaterialSymbolIcon.vue";
</script>
