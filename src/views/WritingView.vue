<template>
  <main :style="{ backgroundImage: `url(/src/assets/background/${letterStore.current?.images.background}.svg)` }"
    class="bg-cover bg-center">
    <h1 class="text-5xl text-center uppercase">Writing {{ letterStore.current?.value }}</h1>
  </main>
</template>

<script setup lang="ts">
import { useLetterStore } from '@/stores/letterStore';

const letterStore = useLetterStore()
</script>
