<template>
  <div>
    <h1 class="text-5xl text-center uppercase">Writing {{ letter.value }}</h1>
  </div>
</template>

<script setup lang="ts">
import type { Letter, LetterPath } from '@/interfaces/Home';
import { useLetterStore } from '@/stores/letterStore';

const letterStore = useLetterStore()
const router = useRouter()
const route = useRoute()

const letter: Letter = letterStore.getLetterFromPath(route.params.id as LetterPath)
</script>
