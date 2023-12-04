<template>
  <main :style="{ backgroundImage: `url(/src/assets/background/${letterStore.current?.images.background}.svg)` }"
    class="h-full bg-cover bg-center grid grid-cols-2">
    <img :src="`/src/assets/character/${letterStore.current?.images.character}.svg`" :alt="letterStore.current?.name"
      class="max-w-[30rem] h-auto mx-auto mt-auto">
    <div class="flex flex-col justify-center text-black text-center">
      <p class="text-4xl text-center mb-4">{{ letterStore.current?.name }}</p>
      <nav class="w-60 mx-auto text-2xl flex flex-col gap-4">
        <RouterLink :to="route.params.id + '/writing'">Bogstavhuse</RouterLink>
        <RouterLink :to="route.params.id + '/sorting'">Forbogstav</RouterLink>
        <RouterLink :to="route.params.id + '/canvas'">Tegnetavle</RouterLink>
      </nav>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useLetterStore } from '@/stores/letterStore';

const letterStore = useLetterStore()
const route = useRoute()
</script>
