<template>
  <main :style="{ backgroundImage: `url(/src/assets/background/${letterStore.current?.images.background}.svg)` }"
    class="h-full px-20 bg-cover bg-center grid grid-cols-2">
    <img :src="`/src/assets/character/${letterStore.current?.images.character}.svg`" :alt="letterStore.current?.name"
      class=" w-80 mx-auto mt-auto">
    <nav class="text-2xl flex flex-col justify-center text-black text-center gap-2">
      <RouterLink :to="route.params.id + '/writing'">Writing</RouterLink>
      <RouterLink :to="route.params.id + '/sorting'">Sorting</RouterLink>
      <RouterLink :to="route.params.id + '/canvas'">Canvas</RouterLink>
    </nav>
  </main>
</template>

<script setup lang="ts">
import { useLetterStore } from '@/stores/letterStore';

const letterStore = useLetterStore()
const route = useRoute()
</script>
