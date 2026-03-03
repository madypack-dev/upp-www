<template>
  <section class="mb-8 px-4">
    <div
      class="flex flex-col gap-4 rounded-xl border border-primary/20 bg-primary/10 p-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <div class="flex items-center gap-3">
        <div
          class="flex size-10 items-center justify-center rounded-full bg-primary/20"
        >
          <MaterialSymbolIcon name="eco" class="size-6 text-primary" />
        </div>
        <div>
          <p
            class="text-[10px] font-bold uppercase leading-none tracking-wider text-slate-400"
          >
            {{ siteContent.stats.label }}
          </p>
          <p class="text-xl font-bold text-slate-100">
            {{ siteContent.stats.recycledTotal }}
            <span class="text-sm font-medium text-primary">{{
              siteContent.stats.recycledUnit
            }}</span>
          </p>
        </div>
      </div>
      <div class="text-left sm:text-right">
        <p
          class="flex items-center gap-1 text-sm font-bold text-primary sm:justify-end"
        >
          <MaterialSymbolIcon name="trending_up" class="size-4" />
          {{ siteContent.stats.growth }}
        </p>
        <p class="text-[10px] text-slate-400">
          {{ siteContent.stats.growthReference }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { siteContent } from "../content/siteContent";
import MaterialSymbolIcon from "./icons/MaterialSymbolIcon.vue";
</script>
