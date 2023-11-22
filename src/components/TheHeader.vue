<template>
  <header class="fixed w-full bg-zinc-800 text-3xl p-4 flex justify-between">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink v-if="letterStore.current" :to="`/${letterStore.current.path}`" class="uppercase">{{
      letterStore.current.value }}
    </RouterLink>
  </header>
</template>

<script setup lang="ts">
import { useLetterStore } from '@/stores/letterStore';

const letterStore = useLetterStore()
</script>