<template>
  <main>
    <div class="max-w-3xl mx-auto flex flex-wrap justify-center gap-4 p-4">
      <div v-for="letter in letterStore.letters" class="grid place-content-center text-5xl uppercase">
        <RouterLink :to="letter.path"
          class="p-4 border-2 border-white rounded-xl duration-200 hover:bg-white hover:text-zinc-700">
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