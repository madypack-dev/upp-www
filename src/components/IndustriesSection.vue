<template>
  <section id="industrias-usos" class="mb-8 px-4">
    <div
      class="rounded-2xl border border-primary/20 bg-background-light p-6 text-slate-900 dark:bg-slate-900 dark:text-slate-100 md:p-8"
    >
      <h3 class="mb-4 text-xl font-bold tracking-tight md:text-2xl">
        {{ siteContent.industries.title }}
      </h3>
      <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <article
          v-for="item in siteContent.industries.items"
          :key="item"
          class="rounded-xl border border-primary/15 bg-primary/5 p-4 text-sm font-semibold"
        >
          {{ item }}
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { siteContent } from "../content/siteContent";
</script>
