<template>
  <main class="h-full px-20 grid place-content-center bg-cover bg-center bg-[url(@/assets/background/placeholder.svg)]">
    <div class="max-w-3xl mx-auto flex flex-wrap justify-center gap-4 p-4">
      <div v-for="letter in letterStore.letters" :key="letter.path" class="grid place-content-center text-5xl uppercase">
        <RouterLink :to="letter.path"
          class="text-center p-4 bg-opacity-70 border-2 border-white rounded-xl duration-200 hover:bg-opacity-100">
          {{ letter.value }}
        </RouterLink>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useLetterStore } from '@/stores/letterStore';

const letterStore = useLetterStore()
</script>