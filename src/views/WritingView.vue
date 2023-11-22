<template>
  <main>
    <h1 class="text-5xl text-center uppercase">Writing {{ letterStore.current }}</h1>
  </main>
</template>

<script setup lang="ts">
import { useLetterStore } from '@/stores/letterStore';

const letterStore = useLetterStore()
</script>
