<template>
  <header
    class="glass-effect sticky top-0 z-50 border-b border-primary/10 px-4 py-3"
  >
    <div class="mx-auto flex w-full max-w-6xl items-center justify-between">
      <div class="flex items-center gap-3">
        <img
          :src="logoImage"
          alt="Unión Papelera Logo"
          class="h-10 w-10 rounded object-cover"
        />
        <div>
          <h1 class="text-lg font-bold leading-none tracking-tight">UPP</h1>
          <p
            class="text-[10px] font-semibold uppercase tracking-widest text-primary"
          >
            Unión Papelera
          </p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button
          type="button"
          class="rounded-full p-2 text-slate-100 transition hover:bg-white/10"
          aria-label="Abrir menú"
        >
          <MaterialSymbolIcon name="menu" class="size-6" />
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import logoImage from "../assets/images/logo.jpg";
import MaterialSymbolIcon from "./icons/MaterialSymbolIcon.vue";
</script>
