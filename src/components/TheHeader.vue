<template>
  <header class="fixed w-full bg-zinc-800 text-3xl p-4 flex justify-between">
    <RouterLink to="/">Home</RouterLink>
    <div class="uppercase">{{ route.params.id === undefined ? '' : letter.value }}</div>
  </header>
</template>

<script setup lang="ts">
import type { Letter, LetterPath } from '@/interfaces/Home';
import { useLetterStore } from '@/stores/letterStore';

const letterStore = useLetterStore()
const router = useRouter()
const route = useRoute()

console.log(route.params.id)

const letter = computed<Letter>(() => letterStore.getLetterFromPath(route.params.id as LetterPath)) 
</script>