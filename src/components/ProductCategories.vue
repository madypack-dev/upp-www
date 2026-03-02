<template>
  <section class="mb-8 px-4">
    <div class="mb-4 flex items-center justify-between gap-4">
      <h3 class="text-xl font-bold tracking-tight">Categorías de Productos</h3>
      <button type="button" class="flex items-center gap-1 text-sm font-semibold text-primary">
        Ver todos <MaterialSymbolIcon name="arrow_forward" class="size-4" />
      </button>
    </div>

    <div class="grid grid-cols-1 gap-4 xl:grid-cols-2">
      <article
        v-for="category in categories"
        :key="category.title"
        class="flex h-40 overflow-hidden rounded-xl border border-primary/10 bg-slate-900 md:h-44"
      >
        <div class="w-1/3 bg-cover bg-center" :style="{ backgroundImage: `url('${category.image}')` }" />
        <div class="flex w-2/3 flex-col justify-between p-4">
          <div>
            <h4 class="mb-1 text-lg font-bold text-white">{{ category.title }}</h4>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="feature in category.features"
                :key="feature"
                class="rounded border border-primary/20 bg-primary/10 px-2 py-0.5 text-[10px] text-primary"
              >
                {{ feature }}
              </span>
            </div>
          </div>
          <p class="text-xs text-slate-400">
            {{ category.description }}
          </p>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import MaterialSymbolIcon from "./icons/MaterialSymbolIcon.vue";
import higieneImage from "../assets/images/higiene.png";
import kraftImage from "../assets/images/kraft.png";

type Category = {
  title: string;
  description: string;
  image: string;
  features: string[];
};

const categories: Category[] = [
  {
    title: "Papel Kraft",
    description: "Ideal para embalaje industrial, bolsas y protección de mercadería.",
    image: kraftImage,
    features: ["60-120 gr/m²", "Alta Resistencia"],
  },
  {
    title: "Línea Higiene",
    description: "Bobinas jumbo para institucionales y fraccionadores.",
    image: higieneImage,
    features: ["Doble Hoja", "100% Celulosa Reciclada"],
  },
];
</script>
