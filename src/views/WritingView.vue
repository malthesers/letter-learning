<template>
  <main :style="{ backgroundImage: `url(/src/assets/background/${letterStore.current?.images.background}.svg)` }"
    class="h-full px-20 bg-cover bg-center grid grid-cols-[1fr_2fr] gap-4">
    <img :src="`/src/assets/character/${letterStore.current?.images.character}.svg`" :alt="letterStore.current?.name"
      class="max-w-[30rem] h-auto mx-auto mt-auto">
    <div class="w-full h-full mx-auto p-4 bg-slate-700 bg-opacity-70 rounded-3xl">
      <h1 class="text-5xl text-center">Hjælp {{ letterStore.current?.name }} med at skrive {{ letterStore.current?.value
      }}!</h1>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useLetterStore } from '@/stores/letterStore';

const letterStore = useLetterStore()
</script>
