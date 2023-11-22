<template>
  <main>
    <h1 class="text-5xl text-center uppercase">{{ letterStore.current?.value }}</h1>
    <nav class="text-2xl flex justify-center gap-2">
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
