<template>
  <div
    class="min-h-screen bg-background-light font-display text-slate-900 dark:bg-background-dark dark:text-slate-100"
  >
    <AppHeader />
    <main class="mx-auto w-full max-w-6xl pb-32 md:pb-36">
      <HeroSection />
      <StatsBar />
      <ProductCategories />
      <LocationSection />
    </main>
    <FloatingActions />
  </div>
</template>

<script setup lang="ts">
import AppHeader from "./components/AppHeader.vue";
import FloatingActions from "./components/FloatingActions.vue";
import HeroSection from "./components/HeroSection.vue";
import LocationSection from "./components/LocationSection.vue";
import ProductCategories from "./components/ProductCategories.vue";
import StatsBar from "./components/StatsBar.vue";
</script>
