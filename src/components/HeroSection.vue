<template>
  <section id="nosotros" class="px-4 py-5 md:py-6">
    <div
      class="relative overflow-hidden rounded-3xl"
      @mouseenter="isHovering = true"
      @mouseleave="isHovering = false"
      @keydown.left="previousSlide"
      @keydown.right="nextSlide"
      @touchstart="onTouchStart"
      @touchend="onTouchEnd"
      tabindex="0"
      role="region"
      :aria-label="siteContent.hero.ariaLabel"
    >
      <!-- Imágenes con Transition Fade -->
      <Transition
        enter-active-class="transition-opacity duration-800"
        leave-active-class="transition-opacity duration-800"
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
      >
        <img
          :key="currentIndex"
          :src="heroImages[currentIndex]"
          :alt="siteContent.hero.imageAlt"
          class="block h-80 w-full object-cover md:h-[28rem] lg:h-[32rem]"
          style="object-position: 65% 50%"
        />
      </Transition>

      <!-- Gradiente overlay responsivo -->
      <div
        class="absolute inset-0 pointer-events-none hidden md:block"
        style="
          background: linear-gradient(
            to right,
            rgba(0, 0, 0, 0.6),
            rgba(0, 0, 0, 0.25) 40%,
            transparent
          );
        "
      />
      <div
        class="absolute inset-0 pointer-events-none md:hidden"
        style="
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.7),
            rgba(0, 0, 0, 0.35) 40%,
            transparent
          );
        "
      />

      <!-- Contenedor de texto overlay -->
      <div
        class="absolute inset-0 z-10 flex flex-col justify-end md:items-center md:justify-center md:pt-0"
      >
        <div
          class="px-6 pb-8 md:px-10 md:pb-0 lg:px-14 md:max-w-[640px] md:w-full md:text-left"
        >
          <span
            class="mb-3 inline-block rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-background-dark drop-shadow-sm"
          >
            {{ siteContent.hero.badge }}
          </span>

          <h2
            class="mb-3 text-3xl font-black leading-tight text-white drop-shadow-sm sm:text-4xl lg:text-5xl"
          >
            {{ siteContent.hero.title }}
          </h2>

          <p
            class="text-sm text-slate-100 opacity-90 drop-shadow-sm sm:text-base md:max-w-lg"
          >
            {{ siteContent.hero.description }}
          </p>
        </div>
      </div>

      <!-- Dots indicadores -->
      <div
        class="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2 md:bottom-6"
      >
        <button
          v-for="(_, index) in heroImages"
          :key="index"
          type="button"
          :class="[
            'rounded-full transition-all duration-300',
            currentIndex === index
              ? 'h-2 w-6 bg-primary'
              : 'h-2 w-2 bg-white/40 hover:bg-white/60',
          ]"
          :aria-label="`${siteContent.hero.goToSlidePrefix} ${index + 1}`"
          @click="currentIndex = index"
        />
      </div>

      <!-- Navegación con flechas (desktop only) -->
      <button
        type="button"
        class="absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white/10 p-2 transition hover:bg-white/20 md:flex"
        :aria-label="siteContent.hero.prevSlideAria"
        @click="previousSlide"
      >
        <svg
          class="size-6 fill-white"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </svg>
      </button>

      <button
        type="button"
        class="absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white/10 p-2 transition hover:bg-white/20 md:flex"
        :aria-label="siteContent.hero.nextSlideAria"
        @click="nextSlide"
      >
        <svg
          class="size-6 fill-white"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
        </svg>
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import heroOndaImage1 from "../assets/images/hero-onda-1.png";
import heroOndaImage2 from "../assets/images/hero-onda-2.png";
import { siteContent } from "../content/siteContent";

const heroImages = [heroOndaImage1, heroOndaImage2];
const currentIndex = ref(0);
const isHovering = ref(false);
const touchStartX = ref(0);
let autoAdvanceInterval: ReturnType<typeof setInterval> | null = null;

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % heroImages.length;
};

const previousSlide = () => {
  currentIndex.value =
    (currentIndex.value - 1 + heroImages.length) % heroImages.length;
};

// Touch handlers para swipe en mobile
const onTouchStart = (e: TouchEvent) => {
  touchStartX.value = e.touches[0].clientX;
};

const onTouchEnd = (e: TouchEvent) => {
  const touchEndX = e.changedTouches[0].clientX;
  const swipeDistance = touchStartX.value - touchEndX;
  const swipeThreshold = 50; // pixels

  if (Math.abs(swipeDistance) > swipeThreshold) {
    if (swipeDistance > 0) {
      // Desliz hacia la izquierda → siguiente slide
      nextSlide();
    } else {
      // Desliz hacia la derecha → slide anterior
      previousSlide();
    }
  }
};

// Auto-advance cada 6 segundos
const startAutoAdvance = () => {
  if (autoAdvanceInterval) clearInterval(autoAdvanceInterval);
  autoAdvanceInterval = setInterval(() => {
    if (!isHovering.value) {
      nextSlide();
    }
  }, 6000);
};

const stopAutoAdvance = () => {
  if (autoAdvanceInterval) {
    clearInterval(autoAdvanceInterval);
    autoAdvanceInterval = null;
  }
};

onMounted(() => {
  startAutoAdvance();
});

onBeforeUnmount(() => {
  stopAutoAdvance();
});

// Reiniciar auto-advance cuando deja de hacer hover
watch(
  () => isHovering.value,
  (newVal) => {
    if (!newVal) {
      stopAutoAdvance();
      startAutoAdvance();
    }
  },
);
</script>
