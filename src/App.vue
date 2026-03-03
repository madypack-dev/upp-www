<template>
  <div
    class="min-h-screen bg-background-light font-display text-slate-900 dark:bg-background-dark dark:text-slate-100"
  >
    <div
      v-if="hasRuntimeError"
      class="border-b border-red-500/40 bg-red-500/10 px-4 py-2 text-center text-xs font-semibold text-red-700 dark:text-red-300"
    >
      {{ appConfig.runtimeErrorMessage }}
    </div>
    <AppHeader v-model="isMenuOpen" />
    <main class="mx-auto w-full max-w-6xl pt-[65px] pb-32 md:pb-36">
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
import { onErrorCaptured, ref } from "vue";
import { useErrorHandler } from "./composables/useErrorHandler";
import { appConfig } from "./config/app";
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

const { hasRuntimeError, reportError } = useErrorHandler();

onErrorCaptured((error, _instance, info) => {
  reportError(error, { source: "App.onErrorCaptured", info });
  return false;
});
</script>
