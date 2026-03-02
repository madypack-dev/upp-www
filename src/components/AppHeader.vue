<template>
  <header class="glass-effect sticky top-0 z-50 border-b border-primary/10 px-4 py-3">
    <div class="mx-auto flex w-full max-w-6xl items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="flex size-10 items-center justify-center rounded border border-primary/30 bg-primary/20">
          <span class="material-symbols-outlined text-2xl text-primary">recycling</span>
        </div>
        <div>
          <h1 class="text-lg font-bold leading-none tracking-tight">UPP</h1>
          <p class="text-[10px] font-semibold uppercase tracking-widest text-primary">Unión Papelera</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button
          type="button"
          class="rounded-full p-2 text-slate-100 transition hover:bg-white/10"
          aria-label="Buscar"
        >
          <span class="material-symbols-outlined">search</span>
        </button>
        <button
          type="button"
          class="rounded-full p-2 text-slate-100 transition hover:bg-white/10"
          aria-label="Abrir menú"
        >
          <span class="material-symbols-outlined">menu</span>
        </button>
      </div>
    </div>
  </header>
</template>
