<template>
  <section id="quienes-somos" class="px-4 py-2 md:py-3">
    <div
      class="rounded-2xl border border-primary/20 bg-background-light p-6 text-slate-900 dark:bg-slate-900 dark:text-slate-100 md:p-8"
    >
      <span
        class="mb-3 inline-block rounded-full bg-primary/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary"
      >
        {{ siteContent.about.badge }}
      </span>
      <h3 class="mb-2 text-2xl font-bold md:text-3xl">
        {{ siteContent.about.title }}
      </h3>
      <p
        class="max-w-3xl text-sm leading-relaxed text-slate-700 md:text-base dark:text-slate-300"
      >
        {{ siteContent.about.description }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { siteContent } from "../content/siteContent";
</script>
