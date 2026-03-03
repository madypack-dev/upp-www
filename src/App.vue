<template>
  <div
    class="min-h-screen bg-background-light font-display text-slate-900 dark:bg-background-dark dark:text-slate-100"
  >
    <AppHeader v-model="isMenuOpen" />
    <main class="mx-auto w-full max-w-6xl pb-32 md:pb-36">
      <HeroSection />
      <ProductCategories />
      <IndustriesSection />
      <SustainabilitySection />
      <AboutSection />
      <StatsBar />
      <LocationSection />
    </main>
    <FloatingActions :isMenuOpen="isMenuOpen" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import AboutSection from "./components/AboutSection.vue";
import AppHeader from "./components/AppHeader.vue";
import FloatingActions from "./components/FloatingActions.vue";
import HeroSection from "./components/HeroSection.vue";
import IndustriesSection from "./components/IndustriesSection.vue";
import LocationSection from "./components/LocationSection.vue";
import ProductCategories from "./components/ProductCategories.vue";
import SustainabilitySection from "./components/SustainabilitySection.vue";
import StatsBar from "./components/StatsBar.vue";

const isMenuOpen = ref(false);
</script>
