<template>
  <section class="p-4 pt-5 md:pt-6">
    <div
      class="relative flex h-80 w-full flex-col justify-end overflow-hidden rounded-xl border border-primary/20 bg-slate-800 p-6 md:h-[30rem] md:p-8"
    >
      <div
        class="absolute inset-0 z-10 bg-gradient-to-t from-background-dark via-background-dark/40 to-transparent"
      />
      <div
        class="absolute inset-0 bg-cover bg-center"
        :style="{ backgroundImage: `url('${heroImage}')` }"
      />
      <div class="relative z-20">
        <span
          class="mb-3 inline-block rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-background-dark"
        >
          Venta Directa de Fábrica
        </span>
        <h2
          class="mb-2 max-w-3xl text-3xl font-bold leading-tight text-white md:text-5xl"
        >
          Bobinas de Papel Onda e Higiene 100% Reciclado
        </h2>
        <p class="max-w-md text-sm text-slate-200 md:text-base">
          Soluciones industriales sostenibles para el mercado B2B y mayorista.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import heroImage from "../assets/images/hero.png";
</script>
