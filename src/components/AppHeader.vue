<template>
  <header
    class="glass-effect fixed left-0 right-0 top-0 w-full z-[9999] border-b border-primary/10 px-4 py-3"
  >
    <div class="mx-auto flex w-full max-w-6xl items-center justify-between">
      <button
        type="button"
        @click="scrollToTop"
        class="flex items-center gap-3 transition hover:opacity-80"
        aria-label="Ir al inicio"
      >
        <img
          :src="logoImage"
          alt="Unión Papelera Logo"
          class="h-10 w-10 rounded object-cover"
        />
        <div class="text-left">
          <h1 class="text-lg font-bold leading-none tracking-tight">
            {{ siteContent.header.brandShort }}
          </h1>
          <p
            class="text-[10px] font-semibold uppercase tracking-widest text-primary"
          >
            {{ siteContent.header.brandFull }}
          </p>
        </div>
      </button>
      <div class="flex items-center gap-2">
        <button
          type="button"
          class="rounded-full p-2 text-slate-100 transition hover:bg-white/10"
          aria-label="Abrir menú"
          @click="isMenuOpen = true"
        >
          <MaterialSymbolIcon name="menu" class="size-6" />
        </button>
      </div>
    </div>

    <!-- Menu Overlay -->
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isMenuOpen"
        class="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md"
        @click="isMenuOpen = false"
      ></div>
    </Transition>

    <!-- Menu Panel -->
    <Transition
      enter-active-class="transition-transform duration-300"
      enter-from-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition-transform duration-200"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <div
        v-if="isMenuOpen"
        class="fixed right-0 top-0 z-[101] h-screen w-full max-w-sm shadow-2xl"
        style="background-color: #0f172a; opacity: 1"
        @click.stop
      >
        <!-- Header del menú -->
        <div
          class="flex items-center justify-between border-b border-white/10 p-6"
        >
          <span class="text-lg font-bold text-white">{{
            siteContent.header.menuTitle
          }}</span>
          <button
            type="button"
            class="rounded-full p-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
            aria-label="Cerrar menú"
            @click="isMenuOpen = false"
          >
            <MaterialSymbolIcon name="close" class="size-6" />
          </button>
        </div>

        <!-- Items del menú -->
        <nav class="flex flex-col gap-2 p-6">
          <a
            href="#productos"
            class="rounded-lg px-4 py-3 text-lg font-semibold text-slate-200 transition hover:bg-white/10 hover:text-primary"
            @click="isMenuOpen = false"
          >
            {{ siteContent.header.menu.products }}
          </a>
          <a
            href="#industrias-usos"
            class="rounded-lg px-4 py-3 text-lg font-semibold text-slate-200 transition hover:bg-white/10 hover:text-primary"
            @click="isMenuOpen = false"
          >
            {{ siteContent.header.menu.industries }}
          </a>
          <a
            href="#sostenibilidad-calidad"
            class="rounded-lg px-4 py-3 text-lg font-semibold text-slate-200 transition hover:bg-white/10 hover:text-primary"
            @click="isMenuOpen = false"
          >
            {{ siteContent.header.menu.sustainability }}
          </a>
          <a
            href="#quienes-somos"
            class="rounded-lg px-4 py-3 text-lg font-semibold text-slate-200 transition hover:bg-white/10 hover:text-primary"
            @click="isMenuOpen = false"
          >
            {{ siteContent.header.menu.about }}
          </a>
          <a
            :href="whatsappHref"
            class="rounded-lg px-4 py-3 text-lg font-semibold text-slate-200 transition hover:bg-white/10 hover:text-primary"
            @click="isMenuOpen = false"
          >
            {{ siteContent.header.menu.contact }}
          </a>
          <a
            href="#ubicacion"
            class="-mt-1 ml-4 rounded-lg px-4 py-2 text-base font-medium text-slate-300 transition hover:bg-white/10 hover:text-primary"
            @click="isMenuOpen = false"
          >
            {{ siteContent.header.menu.locationSubItem }}
          </a>

          <!-- CTA destacado -->
          <a
            :href="whatsappHref"
            class="mt-6 flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-lg font-bold text-forest-green shadow-lg transition hover:bg-primary-dark"
          >
            <svg
              class="size-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
              />
            </svg>
            {{ siteContent.header.menu.quoteCta }}
          </a>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, watch } from "vue";
import logoImage from "../assets/images/logo.jpg";
import { siteContent } from "../content/siteContent";
import { contact } from "../config/contact";
import MaterialSymbolIcon from "./icons/MaterialSymbolIcon.vue";

const isMenuOpen = defineModel<boolean>();

const scrollToTop = () => {
  isMenuOpen.value = false;
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const whatsappHref = computed(() => {
  const phone = contact.whatsappNumber.replace(/\D/g, "");
  const message = encodeURIComponent(
    siteContent.header.whatsappPrefilledMessage,
  );
  return `https://wa.me/${phone}?text=${message}`;
});

const setMenuScrollLock = (open: boolean) => {
  document.documentElement.style.overflowX = "hidden";
  document.body.style.overflowX = "hidden";

  if (open) {
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
    return;
  }

  document.body.style.overflow = "";
  document.body.style.touchAction = "";
};

watch(
  () => Boolean(isMenuOpen.value),
  (open) => {
    setMenuScrollLock(open);
  },
  { immediate: true },
);

onBeforeUnmount(() => {
  setMenuScrollLock(false);
});
</script>
