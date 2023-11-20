<template>
  <main>
    <div class="max-w-3xl mx-auto flex flex-wrap justify-center gap-4 p-4">
      <div v-for="letter in letters" class="grid place-content-center text-5xl uppercase">
        <RouterLink :to="letter.path"
          class="p-4 border-2 border-white rounded-xl duration-200 hover:bg-white hover:text-zinc-700">
          {{ letter.value }}
        </RouterLink>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import type { Letter } from '@/interfaces/Home';

const letters = ref<Letter[]>([
  { value: 'a', path: 'a' },
  { value: 'b', path: 'b' },
  { value: 'c', path: 'c' },
  { value: 'd', path: 'd' },
  { value: 'e', path: 'e' },
  { value: 'f', path: 'f' },
  { value: 'g', path: 'g' },
  { value: 'h', path: 'h' },
  { value: 'i', path: 'i' },
  { value: 'j', path: 'j' },
  { value: 'k', path: 'k' },
  { value: 'l', path: 'l' },
  { value: 'm', path: 'm' },
  { value: 'n', path: 'n' },
  { value: 'o', path: 'o' },
  { value: 'p', path: 'p' },
  { value: 'q', path: 'q' },
  { value: 'r', path: 'r' },
  { value: 's', path: 's' },
  { value: 't', path: 't' },
  { value: 'u', path: 'u' },
  { value: 'v', path: 'v' },
  { value: 'w', path: 'w' },
  { value: 'x', path: 'x' },
  { value: 'y', path: 'y' },
  { value: 'z', path: 'z' },
  { value: 'æ', path: 'ae' },
  { value: 'ø', path: 'oe' },
  { value: 'å', path: 'aa' }
]
)
</script>